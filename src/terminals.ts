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
// (e.g. `import { TerminalsClient, StaxApiCredentials } from
// '@blockchyp/staxpayments-ts/terminals'`).
export {StaxApiCredentials, StaxPaymentsCredentials}

// TerminalsClient exposes the Terminal Management Endpoints for the Stax Payments
// API. It is constructed by the root StaxPaymentsClient with a shared transport
// (StaxPaymentsBaseClient), so every namespace shares one transient-credential
// cache rather than exchanging credentials per namespace.
export class TerminalsClient {
  constructor(private base: StaxPaymentsBaseClient) {}
  /**
   * Tests connectivity with a payment terminal.
   */
  async ping(request: Models.PingRequest): Promise<AxiosResponse<Models.PingResponse>> {
    return this.base.routeTransaction('post', request, '/api/test', '/api/terminal-test');
  }
  /**
   * Returns routing and location data for a payment terminal.
   */
  locate(request: Models.LocateRequest): Promise<AxiosResponse<Models.LocateResponse>> {
    return this.base._gatewayRequest('post', '/api/terminal-locate', request);
  }
  /**
   * Clears the line item display and any in progress transaction.
   */
  async clear(request: Models.ClearTerminalRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base.routeTransaction('post', request, '/api/clear', '/api/terminal-clear');
  }
  /**
   * Returns the current status of a terminal.
   */
  async terminalStatus(request: Models.TerminalStatusRequest): Promise<AxiosResponse<Models.TerminalStatusResponse>> {
    return this.base.routeTransaction('post', request, '/api/terminal-status', '/api/terminal-status');
  }
  /**
   * Captures and returns a signature.
   */
  async captureSignature(request: Models.CaptureSignatureRequest): Promise<AxiosResponse<Models.CaptureSignatureResponse>> {
    return this.base.routeTransaction('post', request, '/api/capture-signature', '/api/capture-signature');
  }
  /**
   * Displays a new transaction on the terminal.
   */
  async newTransactionDisplay(request: Models.TransactionDisplayRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base.routeTransaction('post', request, '/api/txdisplay', '/api/terminal-txdisplay');
  }
  /**
   * Appends items to an existing transaction display. Subtotal, Tax, and Total are
   * overwritten by the request. Items with the same description are combined into
   * groups.
   */
  async updateTransactionDisplay(request: Models.TransactionDisplayRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base.routeTransaction('put', request, '/api/txdisplay', '/api/terminal-txdisplay');
  }
  /**
   * Displays a short message on the terminal.
   */
  async message(request: Models.MessageRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base.routeTransaction('post', request, '/api/message', '/api/message');
  }
  /**
   * Asks the consumer a yes/no question.
   */
  async booleanPrompt(request: Models.BooleanPromptRequest): Promise<AxiosResponse<Models.BooleanPromptResponse>> {
    return this.base.routeTransaction('post', request, '/api/boolean-prompt', '/api/boolean-prompt');
  }
  /**
   * Asks the consumer a text based question.
   */
  async textPrompt(request: Models.TextPromptRequest): Promise<AxiosResponse<Models.TextPromptResponse>> {
    return this.base.routeTransaction('post', request, '/api/text-prompt', '/api/text-prompt');
  }
  /**
   * Returns all terminals associated with the merchant account.
   */
  terminals(request: Models.TerminalProfileRequest): Promise<AxiosResponse<Models.TerminalProfileResponse>> {
    return this.base._dashboardRequest('get', '/api/terminals', request);
  }
  /**
   * Deactivates a terminal.
   */
  deactivateTerminal(request: Models.TerminalDeactivationRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base._dashboardRequest('delete', '/api/terminal/' + request.terminalId, request);
  }
  /**
   * Activates a terminal.
   */
  async activateTerminal(request: Models.TerminalActivationRequestV2): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base._coreRequest('post', '/terminals', request);
  }
  /**
   * Reboot a payment terminal.
   */
  async reboot(request: Models.PingRequest): Promise<AxiosResponse<Models.Acknowledgement>> {
    return this.base.routeTransaction('post', request, '/api/reboot', '/api/terminal-reboot');
  }
}
