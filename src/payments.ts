/**
 * Copyright 2019-2026 BlockChyp, Inc. All rights reserved. Use of this code is governed
 * by a license that can be found in the LICENSE file.
 *
 * This file was generated automatically by the BlockChyp SDK Generator. Changes to this
 * file will be lost every time the code is regenerated.
 */
import {AxiosResponse} from 'axios'
import * as Models from './models'
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
  async charge(request: Models.AuthorizationRequest): Promise<AxiosResponse<Models.AuthorizationResponse>> {
    return this.base.routeTransaction('post', request, '/api/charge', '/api/charge');
  }
  /**
   * Executes a preauthorization intended to be captured later.
   */
  async preauth(request: Models.AuthorizationRequest): Promise<AxiosResponse<Models.AuthorizationResponse>> {
    return this.base.routeTransaction('post', request, '/api/preauth', '/api/preauth');
  }
}
