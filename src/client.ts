/**
 * Copyright 2019-2026 BlockChyp, Inc. All rights reserved. Use of this code is governed
 * by a license that can be found in the LICENSE file.
 *
 * This file was generated automatically by the BlockChyp SDK Generator. Changes to this
 * file will be lost every time the code is regenerated.
 */
import axios, {AxiosRequestConfig, AxiosResponse}  from 'axios'
import CryptoUtils from './cryptoutils'
import * as nodeHttps from 'https'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as crypto from 'crypto'

/* eslint-disable no-unused-vars */
export const CardType = Object.freeze({
  CREDIT: 0,
  DEBIT: 1,
  EBT: 2,
  BLOCKCHAIN_GIFT: 3,
  HEALTHCARE: 4,
})

export const SignatureFormat = Object.freeze({
  NONE: '',
  PNG: 'png',
  JPG: 'jpg',
  GIF: 'gif',
})

export const RoundingMode = Object.freeze({
  UP: 'up',
  NEAREST: 'nearest',
  DOWN: 'down',
})

export const PromptType = Object.freeze({
  AMOUNT: 'amount',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone',
  CUSTOMER_NUMBER: 'customer-number',
  REWARDS_NUMBER: 'rewards-number',
  FIRST_NAME: 'first-name',
  LAST_NAME: 'last-name',
})

export const AVSResponse = Object.freeze({
  NOT_APPLICABLE: '',
  NOT_SUPPORTED: 'not_supported',
  RETRY: 'retry',
  NO_MATCH: 'no_match',
  ADDRESS_MATCH: 'address_match',
  POSTAL_CODE_MATCH: 'zip_match',
  ADDRESS_AND_POSTAL_CODE_MATCH: 'match',
})

export const CVMType = Object.freeze({
  SIGNATURE: 'Signature',
  OFFLINE_PIN: 'Offline PIN',
  ONLINE_PIN: 'Online PIN',
  CDCVM: 'CDCVM',
  NO_CVM: 'No CVM',
})

export const HealthcareType = Object.freeze({
  HEALTHCARE: 'healthcare',
  PRESCRIPTION: 'prescription',
  VISION: 'vision',
  CLINIC: 'clinic',
  DENTAL: 'dental',
})
/* eslint-enable no-unused-vars */
// TODO: Fix this to use the version from package.json
const VERSION: string = "v1.0.0";
const USER_AGENT: string = `StaxPayments-TypeScript/${VERSION}`;
// Some browsers do not allow setting the user-agent header, so we set
// an alternative if running from a browser.
const AGENT_HEADER: string = (typeof window === 'undefined') ? 'User-Agent' : 'X-Requested-With';

// DEFAULT_CORE_HOST is the default Stax core API host used when none is supplied.
const DEFAULT_CORE_HOST: string = 'https://apiprod.fattlabs.com';

// TRANSIENT_CREDENTIALS_PATH is the core API path that exchanges a Stax bearer
// token for short-lived Stax Payments transient credentials. This is an
// internal mechanism of the SDK and is never exposed as a public method.
const TRANSIENT_CREDENTIALS_PATH: string = '/terminals/transient-credentials';

// EXPIRY_SKEW_MS refreshes transient credentials this many milliseconds before
// their stated expiry to avoid a credential lapsing mid-request (clock-skew
// buffer).
const EXPIRY_SKEW_MS: number = 30 * 1000;

// EXPIRY_FALLBACK_MS is how long transient credentials are assumed to live when
// the core API does not state an expiry. The core endpoint does not populate
// expiresAt yet, so in practice this is the credential lifetime.
const EXPIRY_FALLBACK_MS: number = 8 * 60 * 60 * 1000;

// OFFLINE_FIXED_KEY is the static half of the offline route cache key. It is
// hashed together with the current signing key, so a cache file is readable
// only by a client holding the same credentials. It matches the constant used
// by the other Stax Payments SDKs, so the cache format is portable between
// them.
const OFFLINE_FIXED_KEY: string = 'cb22789c9d5c344a10e0474f134db39e25eb3bbf5a1b1a5e89b507f15ea9519c';

// OFFLINE_ROUTE_CACHE_FILE is where terminal routes are persisted so a terminal
// remains reachable when the gateway is not.
const OFFLINE_ROUTE_CACHE_FILE: string = path.join(os.tmpdir(), '.staxpayments_routes');

interface OfflineRouteCacheEntry {
  TTL: string;
  Route: TerminalRoute;
}

interface OfflineRouteCache {
  routes: { [key: string]: OfflineRouteCacheEntry };
}

interface TransientCredentials {
  apiKey: string;
  bearerToken: string;
  signingKey: string;
  // expiresAt is supplied by the Stax core API. It is assumed here and will be
  // populated once the core endpoint is implemented.
  expiresAt?: string;
}

interface TerminalRoute {
  success?: boolean;
  exists?: boolean;
  terminalName: string;
  ipAddress: string;
  transientCredentials: {
    apiKey: string;
    bearerToken: string;
    signingKey: string;
  };
  cloudRelayEnabled: boolean;
  https?: boolean;
}

interface RouteCacheEntry {
  ttl: number;
  route: TerminalRoute;
}

// StaxPaymentsBaseClient holds the shared transport: host configuration,
// transient-credential exchange, and the gateway/dashboard/terminal/core
// request plumbing. Each API namespace ships a client that extends this base
// and adds only the endpoint methods for that namespace (e.g. PaymentsClient).
export class StaxPaymentsBaseClient {
  private gatewayHost: string;
  private testGatewayHost: string;
  private dashboardHost: string;
  private coreHost: string;
  private bearerToken: string;
  // bcCredentials holds the short-lived BlockChyp transient credentials obtained
  // by exchanging the Stax bearer token. It is SDK-managed and never set by the
  // integrator.
  private bcCredentials: StaxPaymentsCredentials | undefined;
  private bcCredentialsExpiresAtMs: number;
  // Single-flight guard: concurrent callers share one in-flight exchange.
  private bcCredentialsInFlight: Promise<void> | undefined;
  private https: boolean;
  private cloudRelay: boolean;
  private routeCacheTTL: number;
  private gatewayTimeout: number;
  private terminalTimeout: number;
  private _routeCache: { [key: string]: RouteCacheEntry };

  // Construct a client with your Stax bearer token. Terminal transactions
  // (charge, refund, preauth) transparently exchange it for short-lived
  // transient credentials.
  constructor(
    creds: StaxApiCredentials,
    opts: { coreHost?: string; gatewayHost?: string } = {}
  ) {
    this.gatewayHost = opts.gatewayHost ?? 'https://api.blockchyp.com';
    this.testGatewayHost = 'https://test.blockchyp.com';
    this.dashboardHost = 'https://dashboard.blockchyp.com';
    this.coreHost = opts.coreHost ?? DEFAULT_CORE_HOST;
    this.bearerToken = creds.bearerToken;
    this.bcCredentialsExpiresAtMs = 0;
    this.https = true;
    this.cloudRelay = false;
    this.routeCacheTTL = 60;
    this.gatewayTimeout = 20;
    this.terminalTimeout = 120;
    this._routeCache = {};
  }

  getGatewayHost(): string {
    return this.gatewayHost;
  }

  getDashboardHost(): string {
    return this.dashboardHost;
  }

  setGatewayHost(host: string): void {
    this.gatewayHost = host;
  }

  setDashboardHost(host: string): void {
    this.dashboardHost = host;
  }

  setTestGatewayHost(host: string): void {
    this.testGatewayHost = host;
  }

  // setCoreHost overrides the Stax core API host used to exchange the bearer
  // token for transient credentials and to serve core-routed endpoints. An empty
  // host resets it to the default. Cached credentials remain valid; subsequent
  // exchanges and core-routed calls use the new host.
  setCoreHost(host: string): void {
    this.coreHost = host || DEFAULT_CORE_HOST;
  }

  heartbeat() {
    return this._gatewayRequest('get', '/api/heartbeat');
  }

  // routeTransaction runs a transaction end to end, dispatching based on whether
  // a terminal is named: to the terminal (card-present), directly or via cloud
  // relay, when a terminal name is supplied, or to the gateway (card-not-present)
  // otherwise.
  async routeTransaction(method: any, request: any, terminalPath: string, cloudPath: string): Promise<any> {
    await this.ensure();
    await this._populateSignatureOptions(request);

    let response: any;
    if (this.isTerminalRouted(request)) {
      // A terminal that cannot be routed is an error, not a reason to send the
      // transaction somewhere else: _resolveTerminalRoute throws.
      const route = await this._resolveTerminalRoute(request.terminalName);
      response = route.cloudRelayEnabled
        ? await this._relayRequest(method, cloudPath, request)
        : await this._terminalRequest(method, route, terminalPath, request);
    } else {
      response = await this._gatewayRequest(method, cloudPath, request);
    }

    // routeTransaction resolves to the AxiosResponse; the signature lives on
    // the payload.
    await this._handleSignature(request, response ? response.data : undefined);

    return response;
  }

  async routeTransactionPost(request: any, terminalPath: string, cloudPath: string): Promise<any> {
    return this.routeTransaction('post', request, terminalPath, cloudPath);
  }

  returnValidationError(desc: string): any {
    const result: any = {
      data: {
        approved: false,
        success: false,
        error: desc
      }
    };
    return result;
  }

  validateRequest(request: any): boolean {
    if (!this.validateCurrency(request.amount)) {
      return false;
    }
    return true;
  }

  validateCurrency(val: string): boolean {
    const amt: number = parseFloat(val);
    if (amt && !isNaN(amt)) {
      const decMatch: RegExpMatchArray | null = val.match(/\./g);
      if (decMatch && decMatch.length > 1) {
        return false;
      }
      return true;
    }
    return false;
  }

  // isTerminalRouted reports whether a request names a terminal. Whether that
  // terminal is reached directly or over cloud relay is a property of its
  // route, resolved per terminal, not a client-wide setting.
  isTerminalRouted(request: any): boolean {
    return Boolean(request && request.terminalName);
  }

  // ensure guarantees the client holds valid merchant-scoped transient
  // credentials, exchanging the Stax bearer token via the core API when the
  // cache is empty or near expiry. Concurrent callers share one in-flight
  // exchange (single-flight). Terminal calls invoke this before routing.
  private async ensure(): Promise<void> {
    if (this.bcCredentials && Date.now() + EXPIRY_SKEW_MS < this.bcCredentialsExpiresAtMs) {
      return;
    }
    if (this.bcCredentialsInFlight) {
      await this.bcCredentialsInFlight;
      return;
    }
    this.bcCredentialsInFlight = this._exchange();
    try {
      await this.bcCredentialsInFlight;
    } finally {
      this.bcCredentialsInFlight = undefined;
    }
  }

  private async _exchange(): Promise<void> {
    // The cached credentials are left in place until the exchange succeeds. A
    // failed refresh should not discard credentials that may still be usable,
    // and it must not leave the client unauthenticated.
    const response = await this._coreRequest('get', TRANSIENT_CREDENTIALS_PATH);
    const data = response.data as TransientCredentials;
    this.bcCredentials = new StaxPaymentsCredentials(data.apiKey, data.bearerToken, data.signingKey);
    this.bcCredentialsExpiresAtMs = data.expiresAt ? Date.parse(data.expiresAt) : Date.now() + EXPIRY_FALLBACK_MS;
  }

  _relayRequest(method: any, path: string, request: any): Promise<any> {
    return this._gatewayRequest(method, path, request, true);
  }

  async _uploadRequest(path: string, request: any, content: any): Promise<any> {
    await this.ensure();
    const config: AxiosRequestConfig = {
      method: 'post',
      url: this._assembleDashboardUrl(path),
      timeout: this._getTimeout(request, this.gatewayTimeout) * 1000,
      headers: {
        [AGENT_HEADER]: USER_AGENT,
      },
    };

    config.data = content;

    if (this.bcCredentials && this.bcCredentials.apiKey) {
      config.headers = Object.assign(config.headers, CryptoUtils.generateGatewayHeaders(this.bcCredentials));
    }
    if (request.fileSize) {
      config.headers['X-File-Size'] = request.fileSize.toFixed();
    }
    if (request.fileName) {
      config.headers['X-Upload-File-Name'] = request.fileName;
    }
    if (request.uploadId) {
      config.headers['X-Upload-ID'] = request.uploadId;
    }

    return axios(config);
  }

  async _dashboardRequest(method: any, path: string, request: any): Promise<any> {
    await this.ensure();
    const config: AxiosRequestConfig = {
      method: method,
      url: this._assembleDashboardUrl(path),
      timeout: this._getTimeout(request, this.gatewayTimeout) * 1000,
      headers: {
        [AGENT_HEADER]: USER_AGENT,
        'Content-Type': 'application/json',
      },
    };

    if (method !== 'get') {
      config.data = request;
    }

    if (this.bcCredentials && this.bcCredentials.apiKey) {
      config.headers = Object.assign(config.headers, CryptoUtils.generateGatewayHeaders(this.bcCredentials));
    }
    return axios(config);
  }

  async _gatewayRequest(method: any, path: string, request?: any, relay?: boolean): Promise<any> {
    await this.ensure();
    const config: AxiosRequestConfig = {
      method: method,
      url: this._assembleGatewayUrl(path, request),
      timeout: this._getTimeout(request, relay ? this.terminalTimeout : this.gatewayTimeout) * 1000,
      headers: {
        [AGENT_HEADER]: USER_AGENT,
        'Content-Type': 'application/json',
      },
    };

    if (method !== 'get') {
      config.data = request;
    }

    if (this.bcCredentials && this.bcCredentials.apiKey) {
      config.headers = Object.assign(config.headers, CryptoUtils.generateGatewayHeaders(this.bcCredentials));
    }

    return axios(config);
  }

  // _coreRequest sends a request to the Stax core API authenticated with the
  // Stax bearer token. It mirrors _gatewayRequest/_dashboardRequest, differing
  // only in host (coreHost) and auth (the Stax bearer token rather than HMAC
  // credentials). Used by core-routed endpoints and the internal
  // transient-credential exchange.
  _coreRequest(method: any, path: string, request?: any): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method: method,
      url: this._assembleCoreUrl(path),
      timeout: this._getTimeout(request, this.gatewayTimeout) * 1000,
      headers: {
        [AGENT_HEADER]: USER_AGENT,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.bearerToken}`,
      },
    };

    if (method !== 'get') {
      config.data = request;
    }

    return axios(config);
  }

  _getTimeout(request: any, defaultTimeout: number): number {
    if (request && 'timeout' in request) {
      return request['timeout'];
    }

    return defaultTimeout;
  }

  _assembleDashboardUrl(path: string): string {
    return this.dashboardHost + path;
  }

  _assembleCoreUrl(path: string): string {
    return this.coreHost + path;
  }

  _assembleGatewayUrl(path: string, payload?: any): string {
    let result: string = '';
    if (payload && payload.test) {
      result = result + this.testGatewayHost;
    } else {
      result = result + this.gatewayHost;
    }
    result = result + path;
    return result;
  }

  async _terminalRequest(method: any, route: TerminalRoute, path: string, request: any): Promise<any> {
    const url: string = await this._assembleTerminalUrl(route, path);

    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        [AGENT_HEADER]: USER_AGENT,
        'Content-Type': 'application/json',
      },
      timeout: this._getTimeout(request, this.terminalTimeout) * 1000,
    };
    if (typeof window === 'undefined') {
      if (this.https) {
        config.httpsAgent = new nodeHttps.Agent({
          rejectUnauthorized: false
        });
      }
    } else {
      config.httpsAgent = {
        protocol: 'https:',
        rejectUnauthorized: false
      };
    }

    if (request) {
      config.data = {
        apiKey: route.transientCredentials.apiKey,
        bearerToken: route.transientCredentials.bearerToken,
        signingKey: route.transientCredentials.signingKey,
        request: request,
      };
    }

    return axios(config);
  }

  async _assembleTerminalUrl(route: TerminalRoute, path: string): Promise<string> {
    let result: string = 'http';
    if (this.https) {
      result = result + 's';
    }
    result = result + '://';
    result = result + route.ipAddress;
    if (this.https) {
      result = result + ':8443';
    } else {
      result = result + ':8080';
    }
    result = result + path;
    return result;
  }

  // _populateSignatureOptions infers the signature image format from the
  // requested file extension when the caller did not state one, and rejects a
  // format the terminal cannot produce before the transaction is sent.
  private async _populateSignatureOptions(request: any): Promise<void> {
    if (!request || !request.sigFile) {
      return;
    }

    if (!request.sigFormat) {
      const parts = String(request.sigFile).split('.');
      request.sigFormat = parts[parts.length - 1].toLowerCase();
    }

    const valid: string[] = [
      SignatureFormat.NONE, SignatureFormat.PNG, SignatureFormat.JPG, SignatureFormat.GIF,
    ];

    if (valid.indexOf(request.sigFormat) < 0) {
      throw new Error('invalid signature format: ' + request.sigFormat);
    }
  }

  // _handleSignature writes the captured signature image to the file the caller
  // asked for and clears it from the response, so the hex payload is not left
  // in a struct the caller is likely to log.
  private async _handleSignature(request: any, response: any): Promise<void> {
    if (!request || !request.sigFile || !response || !response.sigFile) {
      return;
    }

    const content = Buffer.from(response.sigFile, 'hex');
    response.sigFile = '';

    fs.writeFileSync(request.sigFile, content, { mode: 0o600 });
  }

  // _routeCacheKey scopes a cached route to the credentials that resolved it, so
  // rotating credentials cannot serve a route resolved under the previous set.
  private _routeCacheKey(terminalName: string): string {
    const apiKey = this.bcCredentials ? this.bcCredentials.apiKey : '';
    return apiKey + terminalName;
  }

  // _deriveOfflineKey hashes the fixed key together with the current signing
  // key. The cache is therefore readable only while the same credentials are
  // held, and unreadable to anything else that finds the file.
  private _deriveOfflineKey(): Buffer {
    const hash = crypto.createHash('sha256');
    hash.update(Buffer.from(OFFLINE_FIXED_KEY, 'hex'));
    hash.update(Buffer.from(this.bcCredentials ? this.bcCredentials.signingKey : '', 'hex'));
    return hash.digest();
  }

  // AES/CBC/PKCS7 over the first 16 bytes of the derived key, hex encoded with
  // the IV prefixed. The scheme is shared with the other Stax Payments SDKs.
  private _encrypt(value: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-cbc', this._deriveOfflineKey().subarray(0, 16), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    return Buffer.concat([iv, encrypted]).toString('hex');
  }

  private _decrypt(value: string): string {
    const raw = Buffer.from(value, 'hex');
    const decipher = crypto.createDecipheriv('aes-128-cbc', this._deriveOfflineKey().subarray(0, 16), raw.subarray(0, 16));
    return Buffer.concat([decipher.update(raw.subarray(16)), decipher.final()]).toString('utf8');
  }

  private _readOfflineCache(): OfflineRouteCache | undefined {
    try {
      if (!fs.existsSync(OFFLINE_ROUTE_CACHE_FILE)) {
        return undefined;
      }
      return JSON.parse(fs.readFileSync(OFFLINE_ROUTE_CACHE_FILE, 'utf8')) as OfflineRouteCache;
    } catch (e) {
      // An unreadable or corrupt cache is a missing cache, never a failed
      // transaction.
      return undefined;
    }
  }

  // _readFromOfflineCache returns a persisted route. Credentials are decrypted
  // on the way out. When stale is false an expired entry is ignored; when true
  // it is served anyway, which is what keeps a terminal reachable while the
  // gateway is not.
  private _readFromOfflineCache(terminalName: string, stale: boolean): TerminalRoute | undefined {
    const cache = this._readOfflineCache();
    if (!cache || !cache.routes) {
      return undefined;
    }

    const entry = cache.routes[this._routeCacheKey(terminalName)];
    if (!entry) {
      return undefined;
    }

    if (!stale && Date.parse(entry.TTL) <= Date.now()) {
      return undefined;
    }

    try {
      const route = entry.Route;
      route.transientCredentials = {
        apiKey: this._decrypt(route.transientCredentials.apiKey),
        bearerToken: this._decrypt(route.transientCredentials.bearerToken),
        signingKey: this._decrypt(route.transientCredentials.signingKey),
      };
      return route;
    } catch (e) {
      // Written under different credentials, so it cannot be decrypted now.
      return undefined;
    }
  }

  private _updateOfflineCache(route: TerminalRoute, ttlMs: number): void {
    try {
      const cache: OfflineRouteCache = this._readOfflineCache() ?? { routes: {} };
      if (!cache.routes) {
        cache.routes = {};
      }

      cache.routes[this._routeCacheKey(route.terminalName)] = {
        TTL: new Date(ttlMs).toISOString(),
        Route: {
          ...route,
          transientCredentials: {
            apiKey: this._encrypt(route.transientCredentials.apiKey),
            bearerToken: this._encrypt(route.transientCredentials.bearerToken),
            signingKey: this._encrypt(route.transientCredentials.signingKey),
          },
        },
      };

      fs.writeFileSync(OFFLINE_ROUTE_CACHE_FILE, JSON.stringify(cache), { mode: 0o600 });
    } catch (e) {
      // Persisting is an optimization; the in-memory cache still stands.
    }
  }

  // _requestRouteFromGateway resolves a route and rejects anything that is not
  // a usable one, so a failed lookup is never cached or routed on.
  private async _requestRouteFromGateway(terminalName: string): Promise<TerminalRoute> {
    const routeResponse: any = await this._gatewayRequest(
      'get', '/api/terminal-route?terminal=' + encodeURIComponent(terminalName));
    const route: TerminalRoute = routeResponse.data;

    if (!route || route.success === false || !route.ipAddress) {
      throw new Error('unknown terminal: ' + terminalName);
    }

    route.exists = true;
    route.https = true;

    return route;
  }

  async _resolveTerminalRoute(terminalName: string): Promise<TerminalRoute> {
    const key = this._routeCacheKey(terminalName);
    const cacheEntry: RouteCacheEntry | undefined = this._routeCache[key];

    if (cacheEntry && cacheEntry.ttl >= new Date().getTime()) {
      return cacheEntry.route;
    }

    // An IP address addresses a terminal directly and needs no lookup.
    if ((terminalName.match(/\./g) || []).length === 3) {
      return {
        terminalName: terminalName,
        ipAddress: terminalName,
        cloudRelayEnabled: false,
        exists: true,
        https: false,
        transientCredentials: { apiKey: '', bearerToken: '', signingKey: '' },
      };
    }

    const offline = this._readFromOfflineCache(terminalName, false);
    if (offline) {
      return offline;
    }

    let route: TerminalRoute;
    try {
      route = await this._requestRouteFromGateway(terminalName);
    } catch (e) {
      // The gateway is unreachable or does not know the terminal. A stale
      // persisted route is better than no transaction.
      const stale = this._readFromOfflineCache(terminalName, true);
      if (stale) {
        return stale;
      }
      throw e;
    }

    const ttl = new Date().getTime() + (this.routeCacheTTL * 60000);
    this._routeCache[key] = { ttl: ttl, route: route };
    this._updateOfflineCache(route, ttl);

    return route;
  }
}

// StaxApiCredentials is the Stax bearer token used to construct a client. It is
// the only credential an integrator supplies; the BlockChyp gateway credentials
// are obtained and managed internally by the SDK.
export class StaxApiCredentials {
  constructor(public bearerToken: string) {
    this.bearerToken = bearerToken
  }
}

// StaxPaymentsCredentials models the BlockChyp gateway credentials the SDK
// obtains by exchanging the bearer token. It is internal to the SDK.
export class StaxPaymentsCredentials {
  constructor(public apiKey: string, public bearerToken: string, public signingKey: string) {
    this.apiKey = apiKey
    this.bearerToken = bearerToken
    this.signingKey = signingKey
  }
}
