/**
 * Copyright 2019-2026 BlockChyp, Inc. All rights reserved. Use of this code is governed
 * by a license that can be found in the LICENSE file.
 *
 * This file was generated automatically by the BlockChyp SDK Generator. Changes to this
 * file will be lost every time the code is regenerated.
 */
import {AxiosResponse} from 'axios'
import * as Models from './models'
import * as Mappers from './mappers'
import {StaxPaymentsBaseClient, StaxApiCredentials, StaxPaymentsCredentials} from './client'

// Re-exported so this namespace can be consumed directly via its subpath
// (e.g. `import { PaymentsClient, StaxApiCredentials } from
// '@blockchyp/staxpayments-ts/payments'`).
export {StaxApiCredentials, StaxPaymentsCredentials}

// PaymentsClient exposes the Payment Endpoints for the Stax Payments
// API. It is constructed by the root StaxPaymentsClient with a shared transport
// (StaxPaymentsBaseClient), so every namespace shares one transient-credential
// cache rather than exchanging credentials per namespace.
export class PaymentsClient {
  constructor(private base: StaxPaymentsBaseClient) {}
  /**
   * Executes a standard direct preauth and capture.
   */
  // Takes and returns the Stax Payments models. The BlockChyp wire models are
  // an implementation detail: the request is mapped on the way out and the
  // reply on the way back, so the AxiosResponse wrapper is not returned — its
  // data would no longer be what the transport received.
  async charge(request: Models.AuthRequest): Promise<Models.AuthResponse> {
    const response = await this.base.routeTransaction('post', Mappers.authRequestMapper(request), '/api/charge', '/api/charge');

    return Mappers.authResponseMapper(response.data);
  }
  /**
   * Executes a preauthorization intended to be captured later.
   */
  // Takes and returns the Stax Payments models. The BlockChyp wire models are
  // an implementation detail: the request is mapped on the way out and the
  // reply on the way back, so the AxiosResponse wrapper is not returned — its
  // data would no longer be what the transport received.
  async preauth(request: Models.AuthRequest): Promise<Models.AuthResponse> {
    const response = await this.base.routeTransaction('post', Mappers.authRequestMapper(request), '/api/preauth', '/api/preauth');

    return Mappers.authResponseMapper(response.data);
  }
}
