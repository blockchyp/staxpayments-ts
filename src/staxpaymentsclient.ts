/**
 * Copyright 2019-2026 BlockChyp, Inc. All rights reserved. Use of this code is governed
 * by a license that can be found in the LICENSE file.
 *
 * This file was generated automatically by the BlockChyp SDK Generator. Changes to this
 * file will be lost every time the code is regenerated.
 */
import {StaxPaymentsBaseClient, StaxApiCredentials} from './client'
import {PaymentsClient} from './payments'
import {TerminalsClient} from './terminals'

// StaxPaymentsClient is the root Stax Payments client. It builds the shared
// transport (StaxPaymentsBaseClient) once and exposes each API namespace
// (e.g. payments, terminals) as a property, so a single set of transient
// credentials is fetched, cached, and refreshed across every namespace rather
// than per namespace.
export class StaxPaymentsClient {
  private base: StaxPaymentsBaseClient;
  readonly payments: PaymentsClient;
  readonly terminals: TerminalsClient;

  constructor(creds: StaxApiCredentials, opts: { coreHost?: string; gatewayHost?: string } = {}) {
    this.base = new StaxPaymentsBaseClient(creds, opts);
    this.payments = new PaymentsClient(this.base);
    this.terminals = new TerminalsClient(this.base);
  }

  // heartbeat checks connectivity with the Stax Payments gateway.
  heartbeat(): Promise<any> {
    return this.base.heartbeat();
  }

  // Host configuration is shared across every namespace.
  setGatewayHost(host: string): void {
    this.base.setGatewayHost(host);
  }

  setTestGatewayHost(host: string): void {
    this.base.setTestGatewayHost(host);
  }

  setDashboardHost(host: string): void {
    this.base.setDashboardHost(host);
  }

  setCoreHost(host: string): void {
    this.base.setCoreHost(host);
  }

  getGatewayHost(): string {
    return this.base.getGatewayHost();
  }

  getDashboardHost(): string {
    return this.base.getDashboardHost();
  }
}
