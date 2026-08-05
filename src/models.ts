/**
 * Copyright 2019-2026 BlockChyp, Inc. All rights reserved. Use of this code is governed
 * by a license that can be found in the LICENSE file.
 *
 * This file was generated automatically by the BlockChyp SDK Generator. Changes to this
 * file will be lost every time the code is regenerated.
 */

// APICredentials models gateway credentials.
interface APICredentials {
  apiKey: string;
  bearerToken: string;
  signingKey: string;
}

// CardType is used to differentiate credit, debit, and EBT.
enum CardType {
  Credit,
  Debit,
  EBT,
  BlockchainGift,
  Healthcare
}

// SignatureFormat is used to specify the output format for customer signature images.
type SignatureFormat = "" | "png" | "jpg" | "gif";

// CVMType designates a customer verification method.
type CVMType = 'Signature' | 'Offline PIN' | 'Online PIN' | 'CDCVM' | 'No CVM';

// PromptType is used to specify the type of text input data being requested from a customer.
type PromptType = 'amount' | 'email' | 'phone' | 'customer-number' | 'rewards-number' | 'first-name' | 'last-name';

// AVSResponse indicates the result of address verification.
type AVSResponse = '' | 'not_supported' | 'retry' | 'no_match' | 'address_match' | 'zip_match' | 'match';

// HealthcareType is a category of healthcare.
type HealthcareType = 'healthcare' | 'prescription' | 'vision' | 'clinic' | 'dental';

// RoundingMode indicates how partial penny rounding operations should work.
type RoundingMode = 'up' | 'nearest' | 'down';


  /**
   * EMV fields we recommend developers put on their receipts.
   */
export class ReceiptSuggestions {

  /**
   * The EMV Application Identifier.
   */
    aid?: string;

  /**
   * The EMV Application Request Cryptogram.
   */
    arqc?: string;

  /**
   * The EMV Issuer Application Data.
   */
    iad?: string;

  /**
   * The EMV Authorization Response Code.
   */
    arc?: string;

  /**
   * The EMV Transaction Certificate.
   */
    tc?: string;

  /**
   * The EMV Terminal Verification Response.
   */
    tvr?: string;

  /**
   * The EMV Transaction Status Indicator.
   */
    tsi?: string;

  /**
   * The ID of the payment terminal.
   */
    terminalId?: string;

  /**
   * The name of the merchant's business.
   */
    merchantName?: string;

  /**
   * The ID of the merchant.
   */
    merchantId?: string;

  /**
   * The partially masked merchant key required on EMV receipts.
   */
    merchantKey?: string;

  /**
   * A description of the selected AID.
   */
    applicationLabel?: string;

  /**
   * That the receipt should contain a signature line.
   */
    requestSignature: boolean | null = null;

  /**
   * The masked primary account number of the payment card, as required.
   */
    maskedPan?: string;

  /**
   * The amount authorized by the payment network. Could be less than the requested amount
   * for partial auth.
   */
    authorizedAmount: string | null = null;

  /**
   * The type of transaction performed (CHARGE, PREAUTH, REFUND, etc).
   */
    transactionType: string | null = null;

  /**
   * The method by which the payment card was entered (MSR, CHIP, KEYED, etc.).
   */
    entryMethod?: string;

  /**
   * That PIN verification was performed.
   */
    pinVerified?: boolean;

  /**
   * The customer verification method used for the transaction.
   */
    cvmUsed?: CVMType;

  /**
   * That a chip read failure caused the transaction to fall back to the magstripe.
   */
    fallback?: boolean;

  /**
   * The sequence of the transaction in the batch.
   */
    batchSequence?: number;

  /**
   * The amount of cash back that was approved.
   */
    cashBackAmount?: string;

  /**
   * The amount added to the transaction to cover eligible credit card fees.
   */
    surcharge?: string;

  /**
   * The discount applied to the transaction for payment methods ineligible for
   * surcharges.
   */
    cashDiscount?: string;

    // Constructor with default values for optional fields
    constructor(
        aid: string | undefined = undefined,
        arqc: string | undefined = undefined,
        iad: string | undefined = undefined,
        arc: string | undefined = undefined,
        tc: string | undefined = undefined,
        tvr: string | undefined = undefined,
        tsi: string | undefined = undefined,
        terminalId: string | undefined = undefined,
        merchantName: string | undefined = undefined,
        merchantId: string | undefined = undefined,
        merchantKey: string | undefined = undefined,
        applicationLabel: string | undefined = undefined,
        requestSignature: boolean | null = null,
        maskedPan: string | undefined = undefined,
        authorizedAmount: string | null = null,
        transactionType: string | null = null,
        entryMethod: string | undefined = undefined,
        pinVerified: boolean = false,
        cvmUsed: CVMType | undefined = undefined,
        fallback: boolean = false,
        batchSequence: number = 0,
        cashBackAmount: string | undefined = undefined,
        surcharge: string | undefined = undefined,
        cashDiscount: string | undefined = undefined,
        ) {
        this.aid = aid;
        this.arqc = arqc;
        this.iad = iad;
        this.arc = arc;
        this.tc = tc;
        this.tvr = tvr;
        this.tsi = tsi;
        this.terminalId = terminalId;
        this.merchantName = merchantName;
        this.merchantId = merchantId;
        this.merchantKey = merchantKey;
        this.applicationLabel = applicationLabel;
        this.requestSignature = requestSignature;
        this.maskedPan = maskedPan;
        this.authorizedAmount = authorizedAmount;
        this.transactionType = transactionType;
        this.entryMethod = entryMethod;
        this.pinVerified = pinVerified;
        this.cvmUsed = cvmUsed;
        this.fallback = fallback;
        this.batchSequence = batchSequence;
        this.cashBackAmount = cashBackAmount;
        this.surcharge = surcharge;
        this.cashDiscount = cashDiscount;
        }
}

  /**
   * A basic api acknowledgement.
   */
export class Acknowledgement {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        }
}

  /**
   * A request for customer signature data.
   */
export class CaptureSignatureRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * A location on the filesystem which a customer signature should be written to.
   */
    sigFile?: string;

  /**
   * The image format to be used for returning signatures.
   */
    sigFormat?: SignatureFormat;

  /**
   * The width that the signature image should be scaled to, preserving the aspect ratio.
   * If not provided, the signature is returned in the terminal's max resolution.
   */
    sigWidth?: number;

  /**
   * Whether or not signature prompt should be skipped on the terminal. The terminal will
   * indicate whether or not a signature is required by the card in the receipt suggestions
   * response.
   */
    disableSignature?: boolean;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        sigFile: string | undefined = undefined,
        sigFormat: SignatureFormat | undefined = undefined,
        sigWidth: number = 0,
        disableSignature: boolean = false,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.sigFile = sigFile;
        this.sigFormat = sigFormat;
        this.sigWidth = sigWidth;
        this.disableSignature = disableSignature;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * Customer signature data.
   */
export class CaptureSignatureResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The hex encoded signature data.
   */
    sigFile?: string;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        sigFile: string | undefined = undefined,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.sigFile = sigFile;
        }
}

  /**
   * Information needed to test connectivity with a terminal.
   */
export class PingRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * The response to a ping request.
   */
export class PingResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The ID assigned to the transaction.
   */
    transactionId: string | null = null;

  /**
   * The ID assigned to the batch.
   */
    batchId?: string;

  /**
   * The transaction reference string assigned to the transaction request. If no
   * transaction ref was assiged on the request, then the gateway will randomly generate
   * one.
   */
    transactionRef?: string;

  /**
   * The type of transaction.
   */
    transactionType: string | null = null;

  /**
   * The timestamp of the transaction.
   */
    timestamp: string | null = null;

  /**
   * The hash of the last tick block.
   */
    tickBlock: string | null = null;

  /**
   * That the transaction was processed on the test gateway.
   */
    test: boolean | null = null;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * The ECC signature of the response. Can be used to ensure that it was signed by the
   * terminal and detect man-in-the middle attacks.
   */
    sig?: string;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        transactionId: string | null = null,
        batchId: string | undefined = undefined,
        transactionRef: string | undefined = undefined,
        transactionType: string | null = null,
        timestamp: string | null = null,
        tickBlock: string | null = null,
        test: boolean | null = null,
        destinationAccount: string | undefined = undefined,
        sig: string | undefined = undefined,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.transactionId = transactionId;
        this.batchId = batchId;
        this.transactionRef = transactionRef;
        this.transactionType = transactionType;
        this.timestamp = timestamp;
        this.tickBlock = tickBlock;
        this.test = test;
        this.destinationAccount = destinationAccount;
        this.sig = sig;
        }
}

  /**
   * Information needed to retrieve location information for a terminal.
   */
export class LocateRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * The response to a locate request.
   */
export class LocateResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The ID assigned to the transaction.
   */
    transactionId: string | null = null;

  /**
   * The ID assigned to the batch.
   */
    batchId?: string;

  /**
   * The transaction reference string assigned to the transaction request. If no
   * transaction ref was assiged on the request, then the gateway will randomly generate
   * one.
   */
    transactionRef?: string;

  /**
   * The type of transaction.
   */
    transactionType: string | null = null;

  /**
   * The timestamp of the transaction.
   */
    timestamp: string | null = null;

  /**
   * The hash of the last tick block.
   */
    tickBlock: string | null = null;

  /**
   * That the transaction was processed on the test gateway.
   */
    test: boolean | null = null;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * The ECC signature of the response. Can be used to ensure that it was signed by the
   * terminal and detect man-in-the middle attacks.
   */
    sig?: string;

  /**
   * The name assigned to the terminal at activation.
   */
    terminalName: string | null = null;

  /**
   * The local IP address of the terminal.
   */
    ipAddress: string | null = null;

  /**
   * Whether or not the terminal is running in cloud relay mode.
   */
    cloudRelay: boolean | null = null;

  /**
   * The terminal's public key.
   */
    publicKey: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        transactionId: string | null = null,
        batchId: string | undefined = undefined,
        transactionRef: string | undefined = undefined,
        transactionType: string | null = null,
        timestamp: string | null = null,
        tickBlock: string | null = null,
        test: boolean | null = null,
        destinationAccount: string | undefined = undefined,
        sig: string | undefined = undefined,
        terminalName: string | null = null,
        ipAddress: string | null = null,
        cloudRelay: boolean | null = null,
        publicKey: string | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.transactionId = transactionId;
        this.batchId = batchId;
        this.transactionRef = transactionRef;
        this.transactionType = transactionType;
        this.timestamp = timestamp;
        this.tickBlock = tickBlock;
        this.test = test;
        this.destinationAccount = destinationAccount;
        this.sig = sig;
        this.terminalName = terminalName;
        this.ipAddress = ipAddress;
        this.cloudRelay = cloudRelay;
        this.publicKey = publicKey;
        }
}

  /**
   * A message to be displayed on the terminal screen.
   */
export class MessageRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * The message to be displayed on the terminal.
   */
    message: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        message: string | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.message = message;
        }
}

  /**
   * A simple yes no prompt request.
   */
export class BooleanPromptRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * The preferred caption for the 'yes' button.
   */
    yesCaption: string | null = null;

  /**
   * The preferred caption for the 'no' button.
   */
    noCaption: string | null = null;

  /**
   * The text to be displayed on the terminal.
   */
    prompt: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        yesCaption: string | null = null,
        noCaption: string | null = null,
        prompt: string | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.yesCaption = yesCaption;
        this.noCaption = noCaption;
        this.prompt = prompt;
        }
}

  /**
   * A text prompt request.
   */
export class TextPromptRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * The prompt type (email, phone, etc).
   */
    promptType: PromptType | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        promptType: PromptType | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.promptType = promptType;
        }
}

  /**
   * Models a customer record.
   */
export class Customer {

  /**
   * BlockChyp assigned customer id.
   */
    id: string | null = null;

  /**
   * Optional customer ref that can be used for the client's system's customer id.
   */
    customerRef: string | null = null;

  /**
   * Customer's first name.
   */
    firstName: string | null = null;

  /**
   * Customer's last name.
   */
    lastName: string | null = null;

  /**
   * Customer's company name.
   */
    companyName: string | null = null;

  /**
   * Customer's email address.
   */
    emailAddress: string | null = null;

  /**
   * Customer's SMS or mobile number.
   */
    smsNumber: string | null = null;

  /**
   * Model saved payment methods associated with a customer.
   */
    paymentMethods: CustomerToken[] | null = null;

    // Constructor with default values for optional fields
    constructor(
        id: string | null = null,
        customerRef: string | null = null,
        firstName: string | null = null,
        lastName: string | null = null,
        companyName: string | null = null,
        emailAddress: string | null = null,
        smsNumber: string | null = null,
        paymentMethods: CustomerToken[] | null = null,
        ) {
        this.id = id;
        this.customerRef = customerRef;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.emailAddress = emailAddress;
        this.smsNumber = smsNumber;
        this.paymentMethods = paymentMethods;
        }
}

  /**
   * Models a customer token.
   */
export class CustomerToken {

  /**
   * BlockChyp assigned customer id.
   */
    token: string | null = null;

  /**
   * Masked primary account number.
   */
    maskedPan: string | null = null;

  /**
   * Expiration month.
   */
    expiryMonth: string | null = null;

  /**
   * Expiration month.
   */
    expiryYear: string | null = null;

  /**
   * Payment type.
   */
    paymentType: string | null = null;

  /**
   * Bank account type (checking, saving).
   */
    accountType: string | null = null;

  /**
   * Bank account holder type (personal, business).
   */
    accountHolderType: string | null = null;

  /**
   * Bank name.
   */
    bankName: string | null = null;

  /**
   * Routing number.
   */
    routingNumber: string | null = null;

  /**
   * Token hash (generated with a static salt, Merchant ID, Registration Date and PAN.
   */
    tokenHash: string | null = null;

  /**
   * Card bin.
   */
    bin: string | null = null;

  /**
   * The card postal code.
   */
    postalCode?: string;

  /**
   * The card address.
   */
    address?: string;

  /**
   * The card country.
   */
    country?: string;

  /**
   * The card holder name.
   */
    cardHolderName?: string;

  /**
   * Whether the token was enrolled with a CVV value present.
   */
    hasCvv: boolean | null = null;

  /**
   * Models customer records associated with a payment token.
   */
    customers: Customer[] | null = null;

    // Constructor with default values for optional fields
    constructor(
        token: string | null = null,
        maskedPan: string | null = null,
        expiryMonth: string | null = null,
        expiryYear: string | null = null,
        paymentType: string | null = null,
        accountType: string | null = null,
        accountHolderType: string | null = null,
        bankName: string | null = null,
        routingNumber: string | null = null,
        tokenHash: string | null = null,
        bin: string | null = null,
        postalCode: string | undefined = undefined,
        address: string | undefined = undefined,
        country: string | undefined = undefined,
        cardHolderName: string | undefined = undefined,
        hasCvv: boolean | null = null,
        customers: Customer[] | null = null,
        ) {
        this.token = token;
        this.maskedPan = maskedPan;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.paymentType = paymentType;
        this.accountType = accountType;
        this.accountHolderType = accountHolderType;
        this.bankName = bankName;
        this.routingNumber = routingNumber;
        this.tokenHash = tokenHash;
        this.bin = bin;
        this.postalCode = postalCode;
        this.address = address;
        this.country = country;
        this.cardHolderName = cardHolderName;
        this.hasCvv = hasCvv;
        this.customers = customers;
        }
}

  /**
   * The response to a text prompt request.
   */
export class TextPromptResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The text prompt response.
   */
    response: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        response: string | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.response = response;
        }
}

  /**
   * The response to a boolean prompt request.
   */
export class BooleanPromptResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The boolean prompt response.
   */
    response: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        response: boolean | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.response = response;
        }
}

  /**
   * Shows details about a white listed card.
   */
export class WhiteListedCard {

  /**
   * The card BIN.
   */
    bin: string | null = null;

  /**
   * The track 1 data from the card.
   */
    track1: string | null = null;

  /**
   * The track 2 data from the card.
   */
    track2: string | null = null;

  /**
   * The card primary account number.
   */
    pan: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        bin: string | null = null,
        track1: string | null = null,
        track2: string | null = null,
        pan: string | null = null,
        ) {
        this.bin = bin;
        this.track1 = track1;
        this.track2 = track2;
        this.pan = pan;
        }
}

  /**
   * An authorization request for a charge, preauth, or reverse transaction.
   */
export class AuthorizationRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The payment token to be used for this transaction. This should be used for recurring
   * transactions. The /enroll endpoint ignores this field.
   */
    token?: string;

  /**
   * Track 1 magnetic stripe data.
   */
    track1?: string;

  /**
   * Track 2 magnetic stripe data.
   */
    track2?: string;

  /**
   * The primary account number. We recommend using the terminal or e-commerce
   * tokenization libraries instead of passing account numbers in directly, as this
   * would put your application in PCI scope.
   */
    pan?: string;

  /**
   * The ACH routing number for ACH transactions.
   */
    routingNumber?: string;

  /**
   * The cardholder name. Only required if the request includes a primary account number
   * or track data.
   */
    cardholderName?: string;

  /**
   * The card expiration month for use with PAN based transactions.
   */
    expMonth?: string;

  /**
   * The card expiration year for use with PAN based transactions.
   */
    expYear?: string;

  /**
   * The card CVV for use with PAN based transactions.
   */
    cvv?: string;

  /**
   * The cardholder address for use with address verification.
   */
    address?: string;

  /**
   * The cardholder postal code for use with address verification.
   */
    postalCode?: string;

  /**
   * The cardholder country.
   */
    country?: string;

  /**
   * That the payment entry method is a manual keyed transaction. If this is true, no other
   * payment method will be accepted.
   */
    manualEntry?: boolean;

  /**
   * The key serial number used for DUKPT encryption.
   */
    ksn?: string;

  /**
   * The encrypted pin block.
   */
    pinBlock?: string;

  /**
   * Designates categories of cards: credit, debit, EBT.
   */
    cardType?: CardType;

  /**
   * Designates brands of payment methods: Visa, Discover, etc.
   */
    paymentType?: string;

  /**
   * The transaction currency code.
   */
    currencyCode: string | null = null;

  /**
   * The requested amount.
   */
    amount: string | null = null;

  /**
   * That the request is tax exempt. Only required for tax exempt level 2 processing.
   */
    taxExempt: boolean | null = null;

  /**
   * A flag to add a surcharge to the transaction to cover credit card fees, if permitted.
   */
    surcharge: boolean | null = null;

  /**
   * A flag that applies a discount to negate the surcharge for debit transactions or other
   * surcharge ineligible payment methods.
   */
    cashDiscount: boolean | null = null;

  /**
   * A location on the filesystem which a customer signature should be written to.
   */
    sigFile?: string;

  /**
   * The image format to be used for returning signatures.
   */
    sigFormat?: SignatureFormat;

  /**
   * The width that the signature image should be scaled to, preserving the aspect ratio.
   * If not provided, the signature is returned in the terminal's max resolution.
   */
    sigWidth?: number;

  /**
   * Whether or not signature prompt should be skipped on the terminal. The terminal will
   * indicate whether or not a signature is required by the card in the receipt suggestions
   * response.
   */
    disableSignature?: boolean;

  /**
   * The tip amount.
   */
    tipAmount?: string;

  /**
   * The tax amount.
   */
    taxAmount?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * Can be used to update a pre-auth to a new amount, sometimes called incremental auth.
   */
    transactionId?: string;

  /**
   * Used to validate online gift card authorizations.
   */
    onlineAuthCode?: string;

  /**
   * That the payment method should be added to the token vault alongside the
   * authorization.
   */
    enroll?: boolean;

  /**
   * Duplicate detection should be bypassed.
   */
    bypassDupeFilter?: boolean;

  /**
   * A narrative description of the transaction.
   */
    description?: string;

  /**
   * That the terminal should request a tip from the user before starting the transaction.
   */
    promptForTip?: boolean;

  /**
   * That cash back should be enabled for supported cards.
   */
    cashBackEnabled?: boolean;

  /**
   * That this transaction should be treated as MOTO with a card on file.
   */
    cardOnFile?: boolean;

  /**
   * That this transaction should be treated as a recurring transaction.
   */
    recurring?: boolean;

  /**
   * Manually sets the CIT (Customer Initiated Transaction) flag.
   */
    cit?: boolean;

  /**
   * Manually sets the MIT (Merchant Initiated Transaction) flag.
   */
    mit?: boolean;

  /**
   * That this transaction should be treated as a subscription recurring transaction.
   */
    subscription?: boolean;

  /**
   * The purchase order number, if known.
   */
    purchaseOrderNumber?: string;

  /**
   * The supplier reference number, if known.
   */
    supplierReferenceNumber?: string;

  /**
   * An item to display. Can be overwritten or appended, based on the request type.
   */
    lineItems: TransactionDisplayItem[] | null = null;

  /**
   * A map of alternate currencies and the price in each currency. Use only if you want to set
   * your own exchange rate for a crypto transaction.
   */
    altPrices?: {[key: string]: string};

  /**
   * Customer information.
   */
    customer?: Customer;

  /**
   * How partial pennies should be rounded for calculated values like surcharges.
   * Rounding up is the default behavior.
   */
    roundingMode?: RoundingMode;

  /**
   * Details for HSA/FSA transactions.
   */
    healthcareMetadata?: HealthcareMetadata;

  /**
   * That the transaction should be a cryptocurrency transaction. Value should be a
   * crypto currency code (ETH, BTC) or ANY to prompt the user to choose from supported
   * cryptocurrencies.
   */
    cryptocurrency?: string;

  /**
   * An optional parameter that can be used to force a crypto transaction onto a level one or
   * level two network. Valid values are L1 and L2. Defaults to L1.
   */
    cryptoNetwork?: string;

  /**
   * Can be used to specify a specific receive address for a crypto transaction. Disabled
   * by default. This should only be used by sophisticated users with access to properly
   * configured hot wallets.
   */
    cryptoReceiveAddress?: string;

  /**
   * Can optionally add a label to the payment request if the target cryptocurrency
   * supports labels. Defaults to the merchant's DBA Name.
   */
    paymentRequestLabel?: string;

  /**
   * Can optionally add a message to the payment request if the target cryptocurrency
   * supports labels. Defaults to empty.
   */
    paymentRequestMessage?: string;

  /**
   * Instructs the terminal to simulate a post auth chip rejection that would trigger an
   * automatic reversal.
   */
    simulateChipRejection?: boolean;

  /**
   * Instructs the terminal to simulate an out of order automatic reversal.
   */
    simulateOutOfOrderReversal?: boolean;

  /**
   * Causes auto-reversals on the terminal to be executed asyncronously. Use with
   * caution and in conjunction with the transaction status API.
   */
    asyncReversals?: boolean;

  /**
   * A passthrough surcharge amount. This surcharge amount will be passed directly to the
   * gateway and is not directly calculated.
   */
    passthroughSurcharge?: string;

  /**
   * Marks a transaction as HSA/FSA.
   */
    healthcare?: boolean;

  /**
   * The total amount to process as healthcare.
   */
    healthcareTotal?: string;

  /**
   * The total amount to process as ebt.
   */
    ebtTotal?: string;

  /**
   * That this transaction will include a card metadata lookup.
   */
    cardMetadataLookup?: boolean;

  /**
   * The total discount amount for the transaction, and will overide additive logic for
   * line item discounts.
   */
    totalDiscountAmount?: string;

  /**
   * The shipping cost associated with the transaction.
   */
    shippingAmount?: string;

  /**
   * The duty amount associated with the transaction.
   */
    dutyAmount?: string;

  /**
   * The processor ID associated with the transaction.
   */
    processorId?: string;

  /**
   * The external customer ID associated with the transaction.
   */
    externalCustomerId?: string;

  /**
   * Three character, numeric, ship-to country code. Defaults to '840' (USA) if not
   * specified.
   */
    destinationCountryCode?: string;

  /**
   * Nine character postal code for shipping origin addresses. For US addresses, this is a
   * 5+4 ZIP or five digit ZIP.
   */
    shipFromPostalCode?: string;

  /**
   * Nine character postal code for shipping destination addresses. For US addresses,
   * this is a 5+4 ZIP or five digit ZIP.
   */
    shipToPostalCode?: string;

  /**
   * The purchase order date.
   */
    orderDate?: Date;

  /**
   * The number of shipments the original authorization will be broken into.
   */
    shipmentCount: number | null = null;

  /**
   * Which shipment this particular capture is for.
   */
    shipmentNumber: number | null = null;

  /**
   * An optional field that can be used to pass through data to external partners.
   */
    externalPartnerMetadata?: string;

  /**
   * The external customer's email address.
   */
    externalCustomerEmail?: string;

  /**
   * The external customer's phone number.
   */
    externalCustomerPhone?: string;

  /**
   * The external customer's company name.
   */
    externalCustomerCompany?: string;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        token: string | undefined = undefined,
        track1: string | undefined = undefined,
        track2: string | undefined = undefined,
        pan: string | undefined = undefined,
        routingNumber: string | undefined = undefined,
        cardholderName: string | undefined = undefined,
        expMonth: string | undefined = undefined,
        expYear: string | undefined = undefined,
        cvv: string | undefined = undefined,
        address: string | undefined = undefined,
        postalCode: string | undefined = undefined,
        country: string | undefined = undefined,
        manualEntry: boolean = false,
        ksn: string | undefined = undefined,
        pinBlock: string | undefined = undefined,
        cardType: CardType | undefined = undefined,
        paymentType: string | undefined = undefined,
        currencyCode: string | null = null,
        amount: string | null = null,
        taxExempt: boolean | null = null,
        surcharge: boolean | null = null,
        cashDiscount: boolean | null = null,
        sigFile: string | undefined = undefined,
        sigFormat: SignatureFormat | undefined = undefined,
        sigWidth: number = 0,
        disableSignature: boolean = false,
        tipAmount: string | undefined = undefined,
        taxAmount: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        transactionId: string | undefined = undefined,
        onlineAuthCode: string | undefined = undefined,
        enroll: boolean = false,
        bypassDupeFilter: boolean = false,
        description: string | undefined = undefined,
        promptForTip: boolean = false,
        cashBackEnabled: boolean = false,
        cardOnFile: boolean = false,
        recurring: boolean = false,
        cit: boolean = false,
        mit: boolean = false,
        subscription: boolean = false,
        purchaseOrderNumber: string | undefined = undefined,
        supplierReferenceNumber: string | undefined = undefined,
        lineItems: TransactionDisplayItem[] | null = null,
        altPrices: {[key: string]: string} | undefined = undefined,
        customer: Customer | undefined = undefined,
        roundingMode: RoundingMode | undefined = undefined,
        healthcareMetadata: HealthcareMetadata | undefined = undefined,
        cryptocurrency: string | undefined = undefined,
        cryptoNetwork: string | undefined = undefined,
        cryptoReceiveAddress: string | undefined = undefined,
        paymentRequestLabel: string | undefined = undefined,
        paymentRequestMessage: string | undefined = undefined,
        simulateChipRejection: boolean = false,
        simulateOutOfOrderReversal: boolean = false,
        asyncReversals: boolean = false,
        passthroughSurcharge: string | undefined = undefined,
        healthcare: boolean = false,
        healthcareTotal: string | undefined = undefined,
        ebtTotal: string | undefined = undefined,
        cardMetadataLookup: boolean = false,
        totalDiscountAmount: string | undefined = undefined,
        shippingAmount: string | undefined = undefined,
        dutyAmount: string | undefined = undefined,
        processorId: string | undefined = undefined,
        externalCustomerId: string | undefined = undefined,
        destinationCountryCode: string | undefined = undefined,
        shipFromPostalCode: string | undefined = undefined,
        shipToPostalCode: string | undefined = undefined,
        orderDate: Date | undefined = undefined,
        shipmentCount: number | null = null,
        shipmentNumber: number | null = null,
        externalPartnerMetadata: string | undefined = undefined,
        externalCustomerEmail: string | undefined = undefined,
        externalCustomerPhone: string | undefined = undefined,
        externalCustomerCompany: string | undefined = undefined,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.token = token;
        this.track1 = track1;
        this.track2 = track2;
        this.pan = pan;
        this.routingNumber = routingNumber;
        this.cardholderName = cardholderName;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.cvv = cvv;
        this.address = address;
        this.postalCode = postalCode;
        this.country = country;
        this.manualEntry = manualEntry;
        this.ksn = ksn;
        this.pinBlock = pinBlock;
        this.cardType = cardType;
        this.paymentType = paymentType;
        this.currencyCode = currencyCode;
        this.amount = amount;
        this.taxExempt = taxExempt;
        this.surcharge = surcharge;
        this.cashDiscount = cashDiscount;
        this.sigFile = sigFile;
        this.sigFormat = sigFormat;
        this.sigWidth = sigWidth;
        this.disableSignature = disableSignature;
        this.tipAmount = tipAmount;
        this.taxAmount = taxAmount;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.transactionId = transactionId;
        this.onlineAuthCode = onlineAuthCode;
        this.enroll = enroll;
        this.bypassDupeFilter = bypassDupeFilter;
        this.description = description;
        this.promptForTip = promptForTip;
        this.cashBackEnabled = cashBackEnabled;
        this.cardOnFile = cardOnFile;
        this.recurring = recurring;
        this.cit = cit;
        this.mit = mit;
        this.subscription = subscription;
        this.purchaseOrderNumber = purchaseOrderNumber;
        this.supplierReferenceNumber = supplierReferenceNumber;
        this.lineItems = lineItems;
        this.altPrices = altPrices;
        this.customer = customer;
        this.roundingMode = roundingMode;
        this.healthcareMetadata = healthcareMetadata;
        this.cryptocurrency = cryptocurrency;
        this.cryptoNetwork = cryptoNetwork;
        this.cryptoReceiveAddress = cryptoReceiveAddress;
        this.paymentRequestLabel = paymentRequestLabel;
        this.paymentRequestMessage = paymentRequestMessage;
        this.simulateChipRejection = simulateChipRejection;
        this.simulateOutOfOrderReversal = simulateOutOfOrderReversal;
        this.asyncReversals = asyncReversals;
        this.passthroughSurcharge = passthroughSurcharge;
        this.healthcare = healthcare;
        this.healthcareTotal = healthcareTotal;
        this.ebtTotal = ebtTotal;
        this.cardMetadataLookup = cardMetadataLookup;
        this.totalDiscountAmount = totalDiscountAmount;
        this.shippingAmount = shippingAmount;
        this.dutyAmount = dutyAmount;
        this.processorId = processorId;
        this.externalCustomerId = externalCustomerId;
        this.destinationCountryCode = destinationCountryCode;
        this.shipFromPostalCode = shipFromPostalCode;
        this.shipToPostalCode = shipToPostalCode;
        this.orderDate = orderDate;
        this.shipmentCount = shipmentCount;
        this.shipmentNumber = shipmentNumber;
        this.externalPartnerMetadata = externalPartnerMetadata;
        this.externalCustomerEmail = externalCustomerEmail;
        this.externalCustomerPhone = externalCustomerPhone;
        this.externalCustomerCompany = externalCustomerCompany;
        }
}

  /**
   * Essential information about a payment card derived from its BIN/IIN.
   */
export class CardMetadata {

  /**
   * The brand or network of the card (e.g., Visa, Mastercard, Amex).
   */
    cardBrand: string | null = null;

  /**
   * The name of the financial institution that issued the card.
   */
    issuerName: string | null = null;

  /**
   * Whether the card supports Level 3 processing for detailed transaction data.
   */
    l3: boolean | null = null;

  /**
   * Whether the card supports Level 2 processing for additional transaction data.
   */
    l2: boolean | null = null;

  /**
   * The general category or type of the card product.
   */
    productType: string | null = null;

  /**
   * The specific name or designation of the card product.
   */
    productName: string | null = null;

  /**
   * Whether the card is an Electronic Benefit Transfer (EBT) card.
   */
    ebt: boolean | null = null;

  /**
   * Whether the card is a debit card.
   */
    debit: boolean | null = null;

  /**
   * Whether the card is a healthcare-specific payment card.
   */
    healthcare: boolean | null = null;

  /**
   * Whether the card is a prepaid card.
   */
    prepaid: boolean | null = null;

  /**
   * The geographical region associated with the card's issuer.
   */
    region: string | null = null;

  /**
   * The country associated with the card's issuer.
   */
    country: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        cardBrand: string | null = null,
        issuerName: string | null = null,
        l3: boolean | null = null,
        l2: boolean | null = null,
        productType: string | null = null,
        productName: string | null = null,
        ebt: boolean | null = null,
        debit: boolean | null = null,
        healthcare: boolean | null = null,
        prepaid: boolean | null = null,
        region: string | null = null,
        country: string | null = null,
        ) {
        this.cardBrand = cardBrand;
        this.issuerName = issuerName;
        this.l3 = l3;
        this.l2 = l2;
        this.productType = productType;
        this.productName = productName;
        this.ebt = ebt;
        this.debit = debit;
        this.healthcare = healthcare;
        this.prepaid = prepaid;
        this.region = region;
        this.country = country;
        }
}

  /**
   * A refund request.
   */
export class RefundRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The payment token to be used for this transaction. This should be used for recurring
   * transactions. The /enroll endpoint ignores this field.
   */
    token?: string;

  /**
   * Track 1 magnetic stripe data.
   */
    track1?: string;

  /**
   * Track 2 magnetic stripe data.
   */
    track2?: string;

  /**
   * The primary account number. We recommend using the terminal or e-commerce
   * tokenization libraries instead of passing account numbers in directly, as this
   * would put your application in PCI scope.
   */
    pan?: string;

  /**
   * The ACH routing number for ACH transactions.
   */
    routingNumber?: string;

  /**
   * The cardholder name. Only required if the request includes a primary account number
   * or track data.
   */
    cardholderName?: string;

  /**
   * The card expiration month for use with PAN based transactions.
   */
    expMonth?: string;

  /**
   * The card expiration year for use with PAN based transactions.
   */
    expYear?: string;

  /**
   * The card CVV for use with PAN based transactions.
   */
    cvv?: string;

  /**
   * The cardholder address for use with address verification.
   */
    address?: string;

  /**
   * The cardholder postal code for use with address verification.
   */
    postalCode?: string;

  /**
   * The cardholder country.
   */
    country?: string;

  /**
   * That the payment entry method is a manual keyed transaction. If this is true, no other
   * payment method will be accepted.
   */
    manualEntry?: boolean;

  /**
   * The key serial number used for DUKPT encryption.
   */
    ksn?: string;

  /**
   * The encrypted pin block.
   */
    pinBlock?: string;

  /**
   * Designates categories of cards: credit, debit, EBT.
   */
    cardType?: CardType;

  /**
   * Designates brands of payment methods: Visa, Discover, etc.
   */
    paymentType?: string;

  /**
   * The ID of the previous transaction being referenced.
   */
    transactionId: string | null = null;

  /**
   * The transaction currency code.
   */
    currencyCode: string | null = null;

  /**
   * The requested amount.
   */
    amount: string | null = null;

  /**
   * That the request is tax exempt. Only required for tax exempt level 2 processing.
   */
    taxExempt: boolean | null = null;

  /**
   * A flag to add a surcharge to the transaction to cover credit card fees, if permitted.
   */
    surcharge: boolean | null = null;

  /**
   * A flag that applies a discount to negate the surcharge for debit transactions or other
   * surcharge ineligible payment methods.
   */
    cashDiscount: boolean | null = null;

  /**
   * A location on the filesystem which a customer signature should be written to.
   */
    sigFile?: string;

  /**
   * The image format to be used for returning signatures.
   */
    sigFormat?: SignatureFormat;

  /**
   * The width that the signature image should be scaled to, preserving the aspect ratio.
   * If not provided, the signature is returned in the terminal's max resolution.
   */
    sigWidth?: number;

  /**
   * Whether or not signature prompt should be skipped on the terminal. The terminal will
   * indicate whether or not a signature is required by the card in the receipt suggestions
   * response.
   */
    disableSignature?: boolean;

  /**
   * The tip amount.
   */
    tipAmount?: string;

  /**
   * The tax amount.
   */
    taxAmount?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * Details for HSA/FSA transactions.
   */
    healthcareMetadata?: HealthcareMetadata;

  /**
   * Instructs the terminal to simulate a post auth chip rejection that would trigger an
   * automatic reversal.
   */
    simulateChipRejection?: boolean;

  /**
   * Instructs the terminal to simulate an out of order automatic reversal.
   */
    simulateOutOfOrderReversal?: boolean;

  /**
   * Causes auto-reversals on the terminal to be executed asyncronously. Use with
   * caution and in conjunction with the transaction status API.
   */
    asyncReversals?: boolean;

  /**
   * Manually sets the CIT (Customer Initiated Transaction) flag.
   */
    cit?: boolean;

  /**
   * Manually sets the MIT (Merchant Initiated Transaction) flag.
   */
    mit?: boolean;

  /**
   * That this transaction will include a card metadata lookup.
   */
    cardMetadataLookup?: boolean;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        token: string | undefined = undefined,
        track1: string | undefined = undefined,
        track2: string | undefined = undefined,
        pan: string | undefined = undefined,
        routingNumber: string | undefined = undefined,
        cardholderName: string | undefined = undefined,
        expMonth: string | undefined = undefined,
        expYear: string | undefined = undefined,
        cvv: string | undefined = undefined,
        address: string | undefined = undefined,
        postalCode: string | undefined = undefined,
        country: string | undefined = undefined,
        manualEntry: boolean = false,
        ksn: string | undefined = undefined,
        pinBlock: string | undefined = undefined,
        cardType: CardType | undefined = undefined,
        paymentType: string | undefined = undefined,
        transactionId: string | null = null,
        currencyCode: string | null = null,
        amount: string | null = null,
        taxExempt: boolean | null = null,
        surcharge: boolean | null = null,
        cashDiscount: boolean | null = null,
        sigFile: string | undefined = undefined,
        sigFormat: SignatureFormat | undefined = undefined,
        sigWidth: number = 0,
        disableSignature: boolean = false,
        tipAmount: string | undefined = undefined,
        taxAmount: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        healthcareMetadata: HealthcareMetadata | undefined = undefined,
        simulateChipRejection: boolean = false,
        simulateOutOfOrderReversal: boolean = false,
        asyncReversals: boolean = false,
        cit: boolean = false,
        mit: boolean = false,
        cardMetadataLookup: boolean = false,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.token = token;
        this.track1 = track1;
        this.track2 = track2;
        this.pan = pan;
        this.routingNumber = routingNumber;
        this.cardholderName = cardholderName;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.cvv = cvv;
        this.address = address;
        this.postalCode = postalCode;
        this.country = country;
        this.manualEntry = manualEntry;
        this.ksn = ksn;
        this.pinBlock = pinBlock;
        this.cardType = cardType;
        this.paymentType = paymentType;
        this.transactionId = transactionId;
        this.currencyCode = currencyCode;
        this.amount = amount;
        this.taxExempt = taxExempt;
        this.surcharge = surcharge;
        this.cashDiscount = cashDiscount;
        this.sigFile = sigFile;
        this.sigFormat = sigFormat;
        this.sigWidth = sigWidth;
        this.disableSignature = disableSignature;
        this.tipAmount = tipAmount;
        this.taxAmount = taxAmount;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.healthcareMetadata = healthcareMetadata;
        this.simulateChipRejection = simulateChipRejection;
        this.simulateOutOfOrderReversal = simulateOutOfOrderReversal;
        this.asyncReversals = asyncReversals;
        this.cit = cit;
        this.mit = mit;
        this.cardMetadataLookup = cardMetadataLookup;
        }
}

  /**
   * The information needed to enroll a new payment method in the token vault.
   */
export class ClearTerminalRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * The response to an authorization request.
   */
export class AuthorizationResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * That the transaction was approved.
   */
    approved: boolean | null = null;

  /**
   * The auth code from the payment network.
   */
    authCode?: string;

  /**
   * The code returned by the terminal or the card issuer to indicate the disposition of the
   * message.
   */
    authResponseCode?: string;

  /**
   * The ID assigned to the transaction.
   */
    transactionId: string | null = null;

  /**
   * The ID assigned to the batch.
   */
    batchId?: string;

  /**
   * The transaction reference string assigned to the transaction request. If no
   * transaction ref was assiged on the request, then the gateway will randomly generate
   * one.
   */
    transactionRef?: string;

  /**
   * The type of transaction.
   */
    transactionType: string | null = null;

  /**
   * The timestamp of the transaction.
   */
    timestamp: string | null = null;

  /**
   * The hash of the last tick block.
   */
    tickBlock: string | null = null;

  /**
   * That the transaction was processed on the test gateway.
   */
    test: boolean | null = null;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * The ECC signature of the response. Can be used to ensure that it was signed by the
   * terminal and detect man-in-the middle attacks.
   */
    sig?: string;

  /**
   * Whether or not the transaction was approved for a partial amount.
   */
    partialAuth: boolean | null = null;

  /**
   * Whether or not an alternate currency was used.
   */
    altCurrency: boolean | null = null;

  /**
   * Whether or not a request was settled on an FSA card.
   */
    fsaAuth: boolean | null = null;

  /**
   * The currency code used for the transaction.
   */
    currencyCode: string | null = null;

  /**
   * The requested amount.
   */
    requestedAmount: string | null = null;

  /**
   * The authorized amount. May not match the requested amount in the event of a partial
   * auth.
   */
    authorizedAmount: string | null = null;

  /**
   * The remaining balance on the payment method.
   */
    remainingBalance: string | null = null;

  /**
   * The tip amount.
   */
    tipAmount: string | null = null;

  /**
   * The tax amount.
   */
    taxAmount: string | null = null;

  /**
   * The cash back amount the customer requested during the transaction.
   */
    requestedCashBackAmount: string | null = null;

  /**
   * The amount of cash back authorized by the gateway. This amount will be the entire
   * amount requested, or zero.
   */
    authorizedCashBackAmount: string | null = null;

  /**
   * That the transaction has met the standard criteria for confirmation on the network.
   * (For example, 6 confirmations for level one bitcoin.)
   */
    confirmed: boolean | null = null;

  /**
   * The amount submitted to the blockchain.
   */
    cryptoAuthorizedAmount: string | null = null;

  /**
   * The network level fee assessed for the transaction denominated in cryptocurrency.
   * This fee goes to channel operators and crypto miners, not BlockChyp.
   */
    cryptoNetworkFee: string | null = null;

  /**
   * The three letter cryptocurrency code used for the transactions.
   */
    cryptocurrency: string | null = null;

  /**
   * Whether or not the transaction was processed on the level one or level two network.
   */
    cryptoNetwork: string | null = null;

  /**
   * The address on the crypto network the transaction was sent to.
   */
    cryptoReceiveAddress: string | null = null;

  /**
   * Hash or other identifier that identifies the block on the cryptocurrency network, if
   * available or relevant.
   */
    cryptoBlock: string | null = null;

  /**
   * Hash or other transaction identifier that identifies the transaction on the
   * cryptocurrency network, if available or relevant.
   */
    cryptoTransactionId: string | null = null;

  /**
   * The payment request URI used for the transaction, if available.
   */
    cryptoPaymentRequest: string | null = null;

  /**
   * Used for additional status information related to crypto transactions.
   */
    cryptoStatus: string | null = null;

  /**
   * The payment token, if the payment was enrolled in the vault.
   */
    token?: string;

  /**
   * The entry method for the transaction (CHIP, MSR, KEYED, etc).
   */
    entryMethod?: string;

  /**
   * The card brand (VISA, MC, AMEX, DEBIT, etc).
   */
    paymentType?: string;

  /**
   * Provides network level detail on how a transaction was routed, especially for debit
   * transactions.
   */
    network?: string;

  /**
   * Identifies the card association based on bin number. Used primarily used to indicate
   * the major logo on a card, even when debit transactions are routed on a different
   * network.
   */
    logo?: string;

  /**
   * The masked primary account number.
   */
    maskedPan?: string;

  /**
   * The BlockChyp public key if the user presented a BlockChyp payment card.
   */
    publicKey?: string;

  /**
   * That the transaction did something that would put the system in PCI scope.
   */
    ScopeAlert?: boolean;

  /**
   * The cardholder name.
   */
    cardHolder?: string;

  /**
   * The card expiration month in MM format.
   */
    expMonth?: string;

  /**
   * The card expiration year in YY format.
   */
    expYear?: string;

  /**
   * The card postal code.
   */
    postalCode?: string;

  /**
   * The card address.
   */
    address?: string;

  /**
   * The card country.
   */
    country?: string;

  /**
   * Address verification results if address information was submitted.
   */
    avsResponse: AVSResponse | null = null;

  /**
   * The CVV verification result if CVV was submitted.
   */
    cvvResponse?: string;

  /**
   * Suggested receipt fields.
   */
    receiptSuggestions: ReceiptSuggestions | null = null;

  /**
   * Customer data, if any. Preserved for reverse compatibility.
   */
    customer?: Customer;

  /**
   * Customer data, if any.
   */
    customers: Customer[] | null = null;

  /**
   * The hex encoded signature data.
   */
    sigFile?: string;

  /**
   * Card BIN ranges can be whitelisted so that they are read instead of being processed
   * directly. This is useful for integration with legacy gift card systems.
   */
    whiteListedCard?: WhiteListedCard;

  /**
   * That the transaction was flagged for store and forward due to network problems.
   */
    storeAndForward: boolean | null = null;

  /**
   * The current status of a transaction.
   */
    status: string | null = null;

  /**
   * Details about a payment card derived from its BIN/IIN.
   */
    cardMetadata?: CardMetadata;

  /**
   * Whether enhanced data was passed for the transaction.
   */
    enhancedDataPassed?: boolean;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        approved: boolean | null = null,
        authCode: string | undefined = undefined,
        authResponseCode: string | undefined = undefined,
        transactionId: string | null = null,
        batchId: string | undefined = undefined,
        transactionRef: string | undefined = undefined,
        transactionType: string | null = null,
        timestamp: string | null = null,
        tickBlock: string | null = null,
        test: boolean | null = null,
        destinationAccount: string | undefined = undefined,
        sig: string | undefined = undefined,
        partialAuth: boolean | null = null,
        altCurrency: boolean | null = null,
        fsaAuth: boolean | null = null,
        currencyCode: string | null = null,
        requestedAmount: string | null = null,
        authorizedAmount: string | null = null,
        remainingBalance: string | null = null,
        tipAmount: string | null = null,
        taxAmount: string | null = null,
        requestedCashBackAmount: string | null = null,
        authorizedCashBackAmount: string | null = null,
        confirmed: boolean | null = null,
        cryptoAuthorizedAmount: string | null = null,
        cryptoNetworkFee: string | null = null,
        cryptocurrency: string | null = null,
        cryptoNetwork: string | null = null,
        cryptoReceiveAddress: string | null = null,
        cryptoBlock: string | null = null,
        cryptoTransactionId: string | null = null,
        cryptoPaymentRequest: string | null = null,
        cryptoStatus: string | null = null,
        token: string | undefined = undefined,
        entryMethod: string | undefined = undefined,
        paymentType: string | undefined = undefined,
        network: string | undefined = undefined,
        logo: string | undefined = undefined,
        maskedPan: string | undefined = undefined,
        publicKey: string | undefined = undefined,
        ScopeAlert: boolean = false,
        cardHolder: string | undefined = undefined,
        expMonth: string | undefined = undefined,
        expYear: string | undefined = undefined,
        postalCode: string | undefined = undefined,
        address: string | undefined = undefined,
        country: string | undefined = undefined,
        avsResponse: AVSResponse | null = null,
        cvvResponse: string | undefined = undefined,
        receiptSuggestions: ReceiptSuggestions | null = null,
        customer: Customer | undefined = undefined,
        customers: Customer[] | null = null,
        sigFile: string | undefined = undefined,
        whiteListedCard: WhiteListedCard | undefined = undefined,
        storeAndForward: boolean | null = null,
        status: string | null = null,
        cardMetadata: CardMetadata | undefined = undefined,
        enhancedDataPassed: boolean = false,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.approved = approved;
        this.authCode = authCode;
        this.authResponseCode = authResponseCode;
        this.transactionId = transactionId;
        this.batchId = batchId;
        this.transactionRef = transactionRef;
        this.transactionType = transactionType;
        this.timestamp = timestamp;
        this.tickBlock = tickBlock;
        this.test = test;
        this.destinationAccount = destinationAccount;
        this.sig = sig;
        this.partialAuth = partialAuth;
        this.altCurrency = altCurrency;
        this.fsaAuth = fsaAuth;
        this.currencyCode = currencyCode;
        this.requestedAmount = requestedAmount;
        this.authorizedAmount = authorizedAmount;
        this.remainingBalance = remainingBalance;
        this.tipAmount = tipAmount;
        this.taxAmount = taxAmount;
        this.requestedCashBackAmount = requestedCashBackAmount;
        this.authorizedCashBackAmount = authorizedCashBackAmount;
        this.confirmed = confirmed;
        this.cryptoAuthorizedAmount = cryptoAuthorizedAmount;
        this.cryptoNetworkFee = cryptoNetworkFee;
        this.cryptocurrency = cryptocurrency;
        this.cryptoNetwork = cryptoNetwork;
        this.cryptoReceiveAddress = cryptoReceiveAddress;
        this.cryptoBlock = cryptoBlock;
        this.cryptoTransactionId = cryptoTransactionId;
        this.cryptoPaymentRequest = cryptoPaymentRequest;
        this.cryptoStatus = cryptoStatus;
        this.token = token;
        this.entryMethod = entryMethod;
        this.paymentType = paymentType;
        this.network = network;
        this.logo = logo;
        this.maskedPan = maskedPan;
        this.publicKey = publicKey;
        this.ScopeAlert = ScopeAlert;
        this.cardHolder = cardHolder;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.postalCode = postalCode;
        this.address = address;
        this.country = country;
        this.avsResponse = avsResponse;
        this.cvvResponse = cvvResponse;
        this.receiptSuggestions = receiptSuggestions;
        this.customer = customer;
        this.customers = customers;
        this.sigFile = sigFile;
        this.whiteListedCard = whiteListedCard;
        this.storeAndForward = storeAndForward;
        this.status = status;
        this.cardMetadata = cardMetadata;
        this.enhancedDataPassed = enhancedDataPassed;
        }
}

  /**
   * An item level discount for transaction display. Discounts never combine.
   */
export class TransactionDisplayDiscount {

  /**
   * The discount description.
   */
    description: string | null = null;

  /**
   * The amount of the discount.
   */
    amount: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        description: string | null = null,
        amount: string | null = null,
        ) {
        this.description = description;
        this.amount = amount;
        }
}

  /**
   * An item category in a transaction display. Groups combine if their descriptions
   * match. Calculated subtotal amounts are rounded to two decimal places of precision.
   * Quantity is a floating point number that is not rounded at all.
   */
export class TransactionDisplayItem {

  /**
   * A unique value identifying the item. This is not required, but recommended since it is
   * required to update or delete line items.
   */
    id: string | null = null;

  /**
   * A description of the line item.
   */
    description: string | null = null;

  /**
   * The price of the line item.
   */
    price: string | null = null;

  /**
   * The quantity of the line item.
   */
    quantity: number | null = null;

  /**
   * An item category in a transaction display. Groups combine if their descriptions
   * match. Calculated subtotal amounts are rounded to two decimal places of precision.
   * Quantity is a floating point number that is not rounded at all.
   */
    extended: string | null = null;

  /**
   * An alphanumeric code for units of measurement as used in international trade.
   */
    unitCode: string | null = null;

  /**
   * An international description code of the item.
   */
    commodityCode: string | null = null;

  /**
   * A merchant-defined description code of the item.
   */
    productCode: string | null = null;

  /**
   * Are displayed under their corresponding item.
   */
    discounts: TransactionDisplayDiscount[] | null = null;

  /**
   * The amount of any value added taxes which apply to the item.
   */
    taxAmount?: string;

  /**
   * The tax rate as a percentage. Example: '8.5' for 8.5% tax rate.
   */
    taxRate?: string;

  /**
   * How tax was applied to discounted items. '0' = no discount, '1' = tax calculated after
   * discount, '2' = taxcalculated before discount.
   */
    discountCode?: string;

    // Constructor with default values for optional fields
    constructor(
        id: string | null = null,
        description: string | null = null,
        price: string | null = null,
        quantity: number | null = null,
        extended: string | null = null,
        unitCode: string | null = null,
        commodityCode: string | null = null,
        productCode: string | null = null,
        discounts: TransactionDisplayDiscount[] | null = null,
        taxAmount: string | undefined = undefined,
        taxRate: string | undefined = undefined,
        discountCode: string | undefined = undefined,
        ) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.extended = extended;
        this.unitCode = unitCode;
        this.commodityCode = commodityCode;
        this.productCode = productCode;
        this.discounts = discounts;
        this.taxAmount = taxAmount;
        this.taxRate = taxRate;
        this.discountCode = discountCode;
        }
}

  /**
   * The items to display on a terminal.
   */
export class TransactionDisplayTransaction {

  /**
   * The subtotal to display.
   */
    subtotal: string | null = null;

  /**
   * The tax to display.
   */
    tax: string | null = null;

  /**
   * The total to display.
   */
    total: string | null = null;

  /**
   * An item to display. Can be overwritten or appended, based on the request type.
   */
    items: TransactionDisplayItem[] | null = null;

    // Constructor with default values for optional fields
    constructor(
        subtotal: string | null = null,
        tax: string | null = null,
        total: string | null = null,
        items: TransactionDisplayItem[] | null = null,
        ) {
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
        this.items = items;
        }
}

  /**
   * Used to start or update a transaction line item display on a terminal.
   */
export class TransactionDisplayRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

  /**
   * Transaction to display on the terminal.
   */
    transaction?: TransactionDisplayTransaction;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        transaction: TransactionDisplayTransaction | undefined = undefined,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        this.transaction = transaction;
        }
}

  /**
   * The response to a basic API health check. If the security context permits it, the
   * response may also include the public key of the current merchant.
   */
export class HeartbeatResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * The timestamp of the heartbeat.
   */
    timestamp: Date | null = null;

  /**
   * The public key of the clockchain. This is blockchain stuff that you don't really need
   * to worry about. It is a base 58 encoded and compressed eliptic curve public key. For the
   * production clockchain, this will always be:
   * '3cuhsckVUd9HzMjbdUSW17aY5kCcm1d6YAphJMUwmtXRj7WLyU'.
   */
    clockchain: string | null = null;

  /**
   * The hash of the last tick block.
   */
    latestTick: string | null = null;

  /**
   * The public key for the merchant's blockchain.
   */
    merchantPublicKey: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        timestamp: Date | null = null,
        clockchain: string | null = null,
        latestTick: string | null = null,
        merchantPublicKey: string | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.timestamp = timestamp;
        this.clockchain = clockchain;
        this.latestTick = latestTick;
        this.merchantPublicKey = merchantPublicKey;
        }
}

  /**
   * A request for the status of a terminal.
   */
export class TerminalStatusRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * The current status of a terminal.
   */
export class TerminalStatusResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * That the terminal is idle.
   */
    idle: boolean | null = null;

  /**
   * Whether or not a card is currently in the card slot.
   */
    cardInSlot: boolean | null = null;

  /**
   * The operation that the terminal is performing.
   */
    status: string | null = null;

  /**
   * The transaction reference for an ongoing transaction, if one was specified at
   * request time.
   */
    transactionRef: string | null = null;

  /**
   * The timestamp of the last status change.
   */
    since: Date | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        idle: boolean | null = null,
        cardInSlot: boolean | null = null,
        status: string | null = null,
        transactionRef: string | null = null,
        since: Date | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.idle = idle;
        this.cardInSlot = cardInSlot;
        this.status = status;
        this.transactionRef = transactionRef;
        this.since = since;
        }
}

  /**
   * Fields for HSA/FSA transactions.
   */
export class HealthcareMetadata {

  /**
   * A list of healthcare categories in the transaction.
   */
    types: HealthcareGroup[] | null = null;

  /**
   * That the purchased items were verified against an Inventory Information Approval
   * System (IIAS).
   */
    iiasVerified: boolean | null = null;

  /**
   * That the transaction is exempt from IIAS verification.
   */
    iiasExempt: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        types: HealthcareGroup[] | null = null,
        iiasVerified: boolean | null = null,
        iiasExempt: boolean | null = null,
        ) {
        this.types = types;
        this.iiasVerified = iiasVerified;
        this.iiasExempt = iiasExempt;
        }
}

  /**
   * A group of fields for a specific type of healthcare.
   */
export class HealthcareGroup {

  /**
   * The type of healthcare cost.
   */
    type: HealthcareType | null = null;

  /**
   * The amount of this type.
   */
    amount: string | null = null;

  /**
   * The provider ID used for Mastercard and Discover IIAS requests.
   */
    providerId: string | null = null;

  /**
   * The service type code used for Mastercard and Discover IIAS requests.
   */
    serviceTypeCode: string | null = null;

  /**
   * Thr payer ID/carrier ID used for Mastercard and Discover IIAS requests.
   */
    payerOrCarrierId: string | null = null;

  /**
   * The approval or reject reason code used for Mastercard and Discover IIAS requests.
   */
    approvalRejectReasonCode: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        type: HealthcareType | null = null,
        amount: string | null = null,
        providerId: string | null = null,
        serviceTypeCode: string | null = null,
        payerOrCarrierId: string | null = null,
        approvalRejectReasonCode: string | null = null,
        ) {
        this.type = type;
        this.amount = amount;
        this.providerId = providerId;
        this.serviceTypeCode = serviceTypeCode;
        this.payerOrCarrierId = payerOrCarrierId;
        this.approvalRejectReasonCode = approvalRejectReasonCode;
        }
}

  /**
   * Models a terminal profile request.
   */
export class TerminalProfileRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        }
}

  /**
   * Models a terminal profile response.
   */
export class TerminalProfileResponse {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

  /**
   * Enumerates all terminal profiles in the response.
   */
    results: TerminalProfile[] | null = null;

    // Constructor with default values for optional fields
    constructor(
        success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        results: TerminalProfile[] | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        this.results = results;
        }
}

  /**
   * Models a terminal deactivation request.
   */
export class TerminalDeactivationRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * The terminal name assigned to the terminal.
   */
    terminalName: string | null = null;

  /**
   * The id assigned by BlockChyp to the terminal.
   */
    terminalId: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        terminalName: string | null = null,
        terminalId: string | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.terminalName = terminalName;
        this.terminalId = terminalId;
        }
}

  /**
   * Models a terminal activation request. The merchant is derived from the Stax bearer
   * token, so no merchant id is accepted.
   */
export class TerminalActivationRequestV2 {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * The name to be assigned to the terminal. Must be unique for the merchant account.
   */
    terminalName: string | null = null;

  /**
   * The terminal activation code displayed on the terminal.
   */
    activationCode: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        terminalName: string | null = null,
        activationCode: string | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.terminalName = terminalName;
        this.activationCode = activationCode;
        }
}

  /**
   * Details about a merchant board platform configuration.
   */
export class TerminalProfile {

  /**
   * Primary identifier for a given terminal.
   */
    id: string | null = null;

  /**
   * The terminal's local IP address.
   */
    ipAddress: string | null = null;

  /**
   * The name assigned to the terminal during activation.
   */
    terminalName: string | null = null;

  /**
   * The terminal type.
   */
    terminalType: string | null = null;

  /**
   * The terminal type display string.
   */
    terminalTypeDisplayString: string | null = null;

  /**
   * The current firmware version deployed on the terminal.
   */
    blockChypFirmwareVersion: string | null = null;

  /**
   * Whether or not the terminal is configured for cloud relay.
   */
    cloudBased: boolean | null = null;

  /**
   * The terminal's elliptic curve public key.
   */
    publicKey: string | null = null;

  /**
   * The manufacturer's serial number.
   */
    serialNumber: string | null = null;

  /**
   * Whether or not the terminal is currently online.
   */
    online: boolean | null = null;

  /**
   * The date and time the terminal was first brought online.
   */
    since: string | null = null;

  /**
   * The total memory on the terminal.
   */
    totalMemory: number | null = null;

  /**
   * The storage on the terminal.
   */
    totalStorage: number | null = null;

  /**
   * The available (unused) memory on the terminal.
   */
    availableMemory: number | null = null;

  /**
   * The available (unused) storage on the terminal.
   */
    availableStorage: number | null = null;

  /**
   * The memory currently in use on the terminal.
   */
    usedMemory: number | null = null;

  /**
   * The storage currently in use on the terminal.
   */
    usedStorage: number | null = null;

  /**
   * The branding asset currently displayed on the terminal.
   */
    brandingPreview: string | null = null;

  /**
   * The id of the terminal group to which the terminal belongs, if any.
   */
    groupId: string | null = null;

  /**
   * The name of the terminal group to which the terminal belongs, if any.
   */
    groupName: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        id: string | null = null,
        ipAddress: string | null = null,
        terminalName: string | null = null,
        terminalType: string | null = null,
        terminalTypeDisplayString: string | null = null,
        blockChypFirmwareVersion: string | null = null,
        cloudBased: boolean | null = null,
        publicKey: string | null = null,
        serialNumber: string | null = null,
        online: boolean | null = null,
        since: string | null = null,
        totalMemory: number | null = null,
        totalStorage: number | null = null,
        availableMemory: number | null = null,
        availableStorage: number | null = null,
        usedMemory: number | null = null,
        usedStorage: number | null = null,
        brandingPreview: string | null = null,
        groupId: string | null = null,
        groupName: string | null = null,
        ) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.terminalName = terminalName;
        this.terminalType = terminalType;
        this.terminalTypeDisplayString = terminalTypeDisplayString;
        this.blockChypFirmwareVersion = blockChypFirmwareVersion;
        this.cloudBased = cloudBased;
        this.publicKey = publicKey;
        this.serialNumber = serialNumber;
        this.online = online;
        this.since = since;
        this.totalMemory = totalMemory;
        this.totalStorage = totalStorage;
        this.availableMemory = availableMemory;
        this.availableStorage = availableStorage;
        this.usedMemory = usedMemory;
        this.usedStorage = usedStorage;
        this.brandingPreview = brandingPreview;
        this.groupId = groupId;
        this.groupName = groupName;
        }
}

  /**
   * Models information needed to process a file upload.
   */
export class UploadMetadata {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

  /**
   * Optional id used to track status and progress of an upload while in progress.
   */
    uploadId: string | null = null;

  /**
   * The size of the file to be uploaded in bytes.
   */
    fileSize: number | null = null;

  /**
   * The name of file to be uploaded.
   */
    fileName: string | null = null;

    // Constructor with default values for optional fields
    constructor(
        timeout: number | null = null,
        test: boolean | null = null,
        uploadId: string | null = null,
        fileSize: number | null = null,
        fileName: string | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        this.uploadId = uploadId;
        this.fileSize = fileSize;
        this.fileName = fileName;
        }
}




  /**
   * A request for customer signature data.
   */
export class TerminalCaptureSignatureRequest {
    APICredentials: APICredentials;
    request: CaptureSignatureRequest;

    constructor(APICredentials: APICredentials, request: CaptureSignatureRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * Information needed to test connectivity with a terminal.
   */
export class TerminalPingRequest {
    APICredentials: APICredentials;
    request: PingRequest;

    constructor(APICredentials: APICredentials, request: PingRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * Information needed to retrieve location information for a terminal.
   */
export class TerminalLocateRequest {
    APICredentials: APICredentials;
    request: LocateRequest;

    constructor(APICredentials: APICredentials, request: LocateRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * A message to be displayed on the terminal screen.
   */
export class TerminalMessageRequest {
    APICredentials: APICredentials;
    request: MessageRequest;

    constructor(APICredentials: APICredentials, request: MessageRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * A simple yes no prompt request.
   */
export class TerminalBooleanPromptRequest {
    APICredentials: APICredentials;
    request: BooleanPromptRequest;

    constructor(APICredentials: APICredentials, request: BooleanPromptRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * A text prompt request.
   */
export class TerminalTextPromptRequest {
    APICredentials: APICredentials;
    request: TextPromptRequest;

    constructor(APICredentials: APICredentials, request: TextPromptRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * An authorization request for a charge, preauth, or reverse transaction.
   */
export class TerminalAuthorizationRequest {
    APICredentials: APICredentials;
    request: AuthorizationRequest;

    constructor(APICredentials: APICredentials, request: AuthorizationRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * A refund request.
   */
export class TerminalRefundRequest {
    APICredentials: APICredentials;
    request: RefundRequest;

    constructor(APICredentials: APICredentials, request: RefundRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * The information needed to enroll a new payment method in the token vault.
   */
export class TerminalClearTerminalRequest {
    APICredentials: APICredentials;
    request: ClearTerminalRequest;

    constructor(APICredentials: APICredentials, request: ClearTerminalRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * Used to start or update a transaction line item display on a terminal.
   */
export class TerminalTransactionDisplayRequest {
    APICredentials: APICredentials;
    request: TransactionDisplayRequest;

    constructor(APICredentials: APICredentials, request: TransactionDisplayRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}


  /**
   * A request for the status of a terminal.
   */
export class TerminalTerminalStatusRequest {
    APICredentials: APICredentials;
    request: TerminalStatusRequest;

    constructor(APICredentials: APICredentials, request: TerminalStatusRequest) {
        this.APICredentials = APICredentials;
        this.request = request;
    }
}



  /**
   * Fields which should be returned with standard requests.
   */
export class AbstractAcknowledgement {

  /**
   * Whether or not the request succeeded.
   */
    success: boolean | null = null;

  /**
   * The error, if an error occurred.
   */
    error: string | null = null;

  /**
   * A narrative description of the transaction result.
   */
    responseDescription: string | null = null;

    // Constructor with default values for optional fields
    constructor(success: boolean | null = null,
        error: string | null = null,
        responseDescription: string | null = null,
        ) {
        this.success = success;
        this.error = error;
        this.responseDescription = responseDescription;
        }
}

  /**
   * A reference to a terminal name.
   */
export class TerminalReference {

  /**
   * The name of the target payment terminal.
   */
    terminalName?: string;

  /**
   * Forces the terminal cloud connection to be reset while a transactions is in flight.
   * This is a diagnostic settings that can be used only for test transactions.
   */
    resetConnection: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(terminalName: string | undefined = undefined,
        resetConnection: boolean | null = null,
        ) {
        this.terminalName = terminalName;
        this.resetConnection = resetConnection;
        }
}

  /**
   * Customer signature data.
   */
export class SignatureResponse {

  /**
   * The hex encoded signature data.
   */
    sigFile?: string;

    // Constructor with default values for optional fields
    constructor(sigFile: string | undefined = undefined,
        ) {
        this.sigFile = sigFile;
        }
}

  /**
   * A request for customer signature data.
   */
export class SignatureRequest {

  /**
   * A location on the filesystem which a customer signature should be written to.
   */
    sigFile?: string;

  /**
   * The image format to be used for returning signatures.
   */
    sigFormat?: SignatureFormat;

  /**
   * The width that the signature image should be scaled to, preserving the aspect ratio.
   * If not provided, the signature is returned in the terminal's max resolution.
   */
    sigWidth?: number;

  /**
   * Whether or not signature prompt should be skipped on the terminal. The terminal will
   * indicate whether or not a signature is required by the card in the receipt suggestions
   * response.
   */
    disableSignature?: boolean;

    // Constructor with default values for optional fields
    constructor(sigFile: string | undefined = undefined,
        sigFormat: SignatureFormat | undefined = undefined,
        sigWidth: number = 0,
        disableSignature: boolean = false,
        ) {
        this.sigFile = sigFile;
        this.sigFormat = sigFormat;
        this.sigWidth = sigWidth;
        this.disableSignature = disableSignature;
        }
}

  /**
   * Response fields for an approved transaction.
   */
export class ApprovalResponse {

  /**
   * That the transaction was approved.
   */
    approved: boolean | null = null;

  /**
   * The auth code from the payment network.
   */
    authCode?: string;

  /**
   * The code returned by the terminal or the card issuer to indicate the disposition of the
   * message.
   */
    authResponseCode?: string;

    // Constructor with default values for optional fields
    constructor(approved: boolean | null = null,
        authCode: string | undefined = undefined,
        authResponseCode: string | undefined = undefined,
        ) {
        this.approved = approved;
        this.authCode = authCode;
        this.authResponseCode = authResponseCode;
        }
}

  /**
   * Models a low level request with a timeout and test flag.
   */
export class TimeoutRequest {

  /**
   * The request timeout in seconds.
   */
    timeout: number | null = null;

  /**
   * Whether or not to route transaction to the test gateway.
   */
    test: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(timeout: number | null = null,
        test: boolean | null = null,
        ) {
        this.timeout = timeout;
        this.test = test;
        }
}

  /**
   * Core request fields for a transaction.
   */
export class CoreRequest {

  /**
   * A user-assigned reference that can be used to recall or reverse transactions.
   */
    transactionRef?: string;

  /**
   * That the transaction reference was autogenerated and should be ignored for the
   * purposes of duplicate detection.
   */
    autogeneratedRef: boolean | null = null;

  /**
   * Defers the response to the transaction and returns immediately. Callers should
   * retrive the transaction result using the Transaction Status API.
   */
    async: boolean | null = null;

  /**
   * Adds the transaction to the queue and returns immediately. Callers should retrive
   * the transaction result using the Transaction Status API.
   */
    queue: boolean | null = null;

  /**
   * Whether or not the request should block until all cards have been removed from the card
   * reader.
   */
    waitForRemovedCard?: boolean;

  /**
   * Override any in-progress transactions.
   */
    force?: boolean;

  /**
   * An identifier from an external point of sale system.
   */
    orderRef?: string;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * Can include a code used to trigger simulated conditions for the purposes of testing
   * and certification. Valid for test merchant accounts only.
   */
    testCase?: string;

    // Constructor with default values for optional fields
    constructor(transactionRef: string | undefined = undefined,
        autogeneratedRef: boolean | null = null,
        async: boolean | null = null,
        queue: boolean | null = null,
        waitForRemovedCard: boolean = false,
        force: boolean = false,
        orderRef: string | undefined = undefined,
        destinationAccount: string | undefined = undefined,
        testCase: string | undefined = undefined,
        ) {
        this.transactionRef = transactionRef;
        this.autogeneratedRef = autogeneratedRef;
        this.async = async;
        this.queue = queue;
        this.waitForRemovedCard = waitForRemovedCard;
        this.force = force;
        this.orderRef = orderRef;
        this.destinationAccount = destinationAccount;
        this.testCase = testCase;
        }
}

  /**
   * Response details about a payment method.
   */
export class PaymentMethodResponse {

  /**
   * The payment token, if the payment was enrolled in the vault.
   */
    token?: string;

  /**
   * The entry method for the transaction (CHIP, MSR, KEYED, etc).
   */
    entryMethod?: string;

  /**
   * The card brand (VISA, MC, AMEX, DEBIT, etc).
   */
    paymentType?: string;

  /**
   * Provides network level detail on how a transaction was routed, especially for debit
   * transactions.
   */
    network?: string;

  /**
   * Identifies the card association based on bin number. Used primarily used to indicate
   * the major logo on a card, even when debit transactions are routed on a different
   * network.
   */
    logo?: string;

  /**
   * The masked primary account number.
   */
    maskedPan?: string;

  /**
   * The BlockChyp public key if the user presented a BlockChyp payment card.
   */
    publicKey?: string;

  /**
   * That the transaction did something that would put the system in PCI scope.
   */
    ScopeAlert?: boolean;

  /**
   * The cardholder name.
   */
    cardHolder?: string;

  /**
   * The card expiration month in MM format.
   */
    expMonth?: string;

  /**
   * The card expiration year in YY format.
   */
    expYear?: string;

  /**
   * The card postal code.
   */
    postalCode?: string;

  /**
   * The card address.
   */
    address?: string;

  /**
   * The card country.
   */
    country?: string;

  /**
   * Address verification results if address information was submitted.
   */
    avsResponse: AVSResponse | null = null;

  /**
   * The CVV verification result if CVV was submitted.
   */
    cvvResponse?: string;

  /**
   * Suggested receipt fields.
   */
    receiptSuggestions: ReceiptSuggestions | null = null;

  /**
   * Customer data, if any. Preserved for reverse compatibility.
   */
    customer?: Customer;

  /**
   * Customer data, if any.
   */
    customers: Customer[] | null = null;

    // Constructor with default values for optional fields
    constructor(token: string | undefined = undefined,
        entryMethod: string | undefined = undefined,
        paymentType: string | undefined = undefined,
        network: string | undefined = undefined,
        logo: string | undefined = undefined,
        maskedPan: string | undefined = undefined,
        publicKey: string | undefined = undefined,
        ScopeAlert: boolean = false,
        cardHolder: string | undefined = undefined,
        expMonth: string | undefined = undefined,
        expYear: string | undefined = undefined,
        postalCode: string | undefined = undefined,
        address: string | undefined = undefined,
        country: string | undefined = undefined,
        avsResponse: AVSResponse | null = null,
        cvvResponse: string | undefined = undefined,
        receiptSuggestions: ReceiptSuggestions | null = null,
        customer: Customer | undefined = undefined,
        customers: Customer[] | null = null,
        ) {
        this.token = token;
        this.entryMethod = entryMethod;
        this.paymentType = paymentType;
        this.network = network;
        this.logo = logo;
        this.maskedPan = maskedPan;
        this.publicKey = publicKey;
        this.ScopeAlert = ScopeAlert;
        this.cardHolder = cardHolder;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.postalCode = postalCode;
        this.address = address;
        this.country = country;
        this.avsResponse = avsResponse;
        this.cvvResponse = cvvResponse;
        this.receiptSuggestions = receiptSuggestions;
        this.customer = customer;
        this.customers = customers;
        }
}

  /**
   * Response details for a cryptocurrency transaction.
   */
export class CryptocurrencyResponse {

  /**
   * That the transaction has met the standard criteria for confirmation on the network.
   * (For example, 6 confirmations for level one bitcoin.)
   */
    confirmed: boolean | null = null;

  /**
   * The amount submitted to the blockchain.
   */
    cryptoAuthorizedAmount: string | null = null;

  /**
   * The network level fee assessed for the transaction denominated in cryptocurrency.
   * This fee goes to channel operators and crypto miners, not BlockChyp.
   */
    cryptoNetworkFee: string | null = null;

  /**
   * The three letter cryptocurrency code used for the transactions.
   */
    cryptocurrency: string | null = null;

  /**
   * Whether or not the transaction was processed on the level one or level two network.
   */
    cryptoNetwork: string | null = null;

  /**
   * The address on the crypto network the transaction was sent to.
   */
    cryptoReceiveAddress: string | null = null;

  /**
   * Hash or other identifier that identifies the block on the cryptocurrency network, if
   * available or relevant.
   */
    cryptoBlock: string | null = null;

  /**
   * Hash or other transaction identifier that identifies the transaction on the
   * cryptocurrency network, if available or relevant.
   */
    cryptoTransactionId: string | null = null;

  /**
   * The payment request URI used for the transaction, if available.
   */
    cryptoPaymentRequest: string | null = null;

  /**
   * Used for additional status information related to crypto transactions.
   */
    cryptoStatus: string | null = null;

    // Constructor with default values for optional fields
    constructor(confirmed: boolean | null = null,
        cryptoAuthorizedAmount: string | null = null,
        cryptoNetworkFee: string | null = null,
        cryptocurrency: string | null = null,
        cryptoNetwork: string | null = null,
        cryptoReceiveAddress: string | null = null,
        cryptoBlock: string | null = null,
        cryptoTransactionId: string | null = null,
        cryptoPaymentRequest: string | null = null,
        cryptoStatus: string | null = null,
        ) {
        this.confirmed = confirmed;
        this.cryptoAuthorizedAmount = cryptoAuthorizedAmount;
        this.cryptoNetworkFee = cryptoNetworkFee;
        this.cryptocurrency = cryptocurrency;
        this.cryptoNetwork = cryptoNetwork;
        this.cryptoReceiveAddress = cryptoReceiveAddress;
        this.cryptoBlock = cryptoBlock;
        this.cryptoTransactionId = cryptoTransactionId;
        this.cryptoPaymentRequest = cryptoPaymentRequest;
        this.cryptoStatus = cryptoStatus;
        }
}

  /**
   * Response details about tender amounts.
   */
export class PaymentAmounts {

  /**
   * Whether or not the transaction was approved for a partial amount.
   */
    partialAuth: boolean | null = null;

  /**
   * Whether or not an alternate currency was used.
   */
    altCurrency: boolean | null = null;

  /**
   * Whether or not a request was settled on an FSA card.
   */
    fsaAuth: boolean | null = null;

  /**
   * The currency code used for the transaction.
   */
    currencyCode: string | null = null;

  /**
   * The requested amount.
   */
    requestedAmount: string | null = null;

  /**
   * The authorized amount. May not match the requested amount in the event of a partial
   * auth.
   */
    authorizedAmount: string | null = null;

  /**
   * The remaining balance on the payment method.
   */
    remainingBalance: string | null = null;

  /**
   * The tip amount.
   */
    tipAmount: string | null = null;

  /**
   * The tax amount.
   */
    taxAmount: string | null = null;

  /**
   * The cash back amount the customer requested during the transaction.
   */
    requestedCashBackAmount: string | null = null;

  /**
   * The amount of cash back authorized by the gateway. This amount will be the entire
   * amount requested, or zero.
   */
    authorizedCashBackAmount: string | null = null;

    // Constructor with default values for optional fields
    constructor(partialAuth: boolean | null = null,
        altCurrency: boolean | null = null,
        fsaAuth: boolean | null = null,
        currencyCode: string | null = null,
        requestedAmount: string | null = null,
        authorizedAmount: string | null = null,
        remainingBalance: string | null = null,
        tipAmount: string | null = null,
        taxAmount: string | null = null,
        requestedCashBackAmount: string | null = null,
        authorizedCashBackAmount: string | null = null,
        ) {
        this.partialAuth = partialAuth;
        this.altCurrency = altCurrency;
        this.fsaAuth = fsaAuth;
        this.currencyCode = currencyCode;
        this.requestedAmount = requestedAmount;
        this.authorizedAmount = authorizedAmount;
        this.remainingBalance = remainingBalance;
        this.tipAmount = tipAmount;
        this.taxAmount = taxAmount;
        this.requestedCashBackAmount = requestedCashBackAmount;
        this.authorizedCashBackAmount = authorizedCashBackAmount;
        }
}

  /**
   * Request details about a payment method.
   */
export class PaymentMethod {

  /**
   * The payment token to be used for this transaction. This should be used for recurring
   * transactions. The /enroll endpoint ignores this field.
   */
    token?: string;

  /**
   * Track 1 magnetic stripe data.
   */
    track1?: string;

  /**
   * Track 2 magnetic stripe data.
   */
    track2?: string;

  /**
   * The primary account number. We recommend using the terminal or e-commerce
   * tokenization libraries instead of passing account numbers in directly, as this
   * would put your application in PCI scope.
   */
    pan?: string;

  /**
   * The ACH routing number for ACH transactions.
   */
    routingNumber?: string;

  /**
   * The cardholder name. Only required if the request includes a primary account number
   * or track data.
   */
    cardholderName?: string;

  /**
   * The card expiration month for use with PAN based transactions.
   */
    expMonth?: string;

  /**
   * The card expiration year for use with PAN based transactions.
   */
    expYear?: string;

  /**
   * The card CVV for use with PAN based transactions.
   */
    cvv?: string;

  /**
   * The cardholder address for use with address verification.
   */
    address?: string;

  /**
   * The cardholder postal code for use with address verification.
   */
    postalCode?: string;

  /**
   * The cardholder country.
   */
    country?: string;

  /**
   * That the payment entry method is a manual keyed transaction. If this is true, no other
   * payment method will be accepted.
   */
    manualEntry?: boolean;

  /**
   * The key serial number used for DUKPT encryption.
   */
    ksn?: string;

  /**
   * The encrypted pin block.
   */
    pinBlock?: string;

  /**
   * Designates categories of cards: credit, debit, EBT.
   */
    cardType?: CardType;

  /**
   * Designates brands of payment methods: Visa, Discover, etc.
   */
    paymentType?: string;

    // Constructor with default values for optional fields
    constructor(token: string | undefined = undefined,
        track1: string | undefined = undefined,
        track2: string | undefined = undefined,
        pan: string | undefined = undefined,
        routingNumber: string | undefined = undefined,
        cardholderName: string | undefined = undefined,
        expMonth: string | undefined = undefined,
        expYear: string | undefined = undefined,
        cvv: string | undefined = undefined,
        address: string | undefined = undefined,
        postalCode: string | undefined = undefined,
        country: string | undefined = undefined,
        manualEntry: boolean = false,
        ksn: string | undefined = undefined,
        pinBlock: string | undefined = undefined,
        cardType: CardType | undefined = undefined,
        paymentType: string | undefined = undefined,
        ) {
        this.token = token;
        this.track1 = track1;
        this.track2 = track2;
        this.pan = pan;
        this.routingNumber = routingNumber;
        this.cardholderName = cardholderName;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.cvv = cvv;
        this.address = address;
        this.postalCode = postalCode;
        this.country = country;
        this.manualEntry = manualEntry;
        this.ksn = ksn;
        this.pinBlock = pinBlock;
        this.cardType = cardType;
        this.paymentType = paymentType;
        }
}

  /**
   * Request details about tender amounts.
   */
export class RequestAmount {

  /**
   * The transaction currency code.
   */
    currencyCode: string | null = null;

  /**
   * The requested amount.
   */
    amount: string | null = null;

  /**
   * That the request is tax exempt. Only required for tax exempt level 2 processing.
   */
    taxExempt: boolean | null = null;

  /**
   * A flag to add a surcharge to the transaction to cover credit card fees, if permitted.
   */
    surcharge: boolean | null = null;

  /**
   * A flag that applies a discount to negate the surcharge for debit transactions or other
   * surcharge ineligible payment methods.
   */
    cashDiscount: boolean | null = null;

    // Constructor with default values for optional fields
    constructor(currencyCode: string | null = null,
        amount: string | null = null,
        taxExempt: boolean | null = null,
        surcharge: boolean | null = null,
        cashDiscount: boolean | null = null,
        ) {
        this.currencyCode = currencyCode;
        this.amount = amount;
        this.taxExempt = taxExempt;
        this.surcharge = surcharge;
        this.cashDiscount = cashDiscount;
        }
}

  /**
   * Request subtotals.
   */
export class Subtotals {

  /**
   * The tip amount.
   */
    tipAmount?: string;

  /**
   * The tax amount.
   */
    taxAmount?: string;

    // Constructor with default values for optional fields
    constructor(tipAmount: string | undefined = undefined,
        taxAmount: string | undefined = undefined,
        ) {
        this.tipAmount = tipAmount;
        this.taxAmount = taxAmount;
        }
}

  /**
   * A reference to a previous transaction.
   */
export class PreviousTransaction {

  /**
   * The ID of the previous transaction being referenced.
   */
    transactionId: string | null = null;

    // Constructor with default values for optional fields
    constructor(transactionId: string | null = null,
        ) {
        this.transactionId = transactionId;
        }
}

  /**
   * Core response fields for a transaction.
   */
export class CoreResponse {

  /**
   * The ID assigned to the transaction.
   */
    transactionId: string | null = null;

  /**
   * The ID assigned to the batch.
   */
    batchId?: string;

  /**
   * The transaction reference string assigned to the transaction request. If no
   * transaction ref was assiged on the request, then the gateway will randomly generate
   * one.
   */
    transactionRef?: string;

  /**
   * The type of transaction.
   */
    transactionType: string | null = null;

  /**
   * The timestamp of the transaction.
   */
    timestamp: string | null = null;

  /**
   * The hash of the last tick block.
   */
    tickBlock: string | null = null;

  /**
   * That the transaction was processed on the test gateway.
   */
    test: boolean | null = null;

  /**
   * The settlement account for merchants with split settlements.
   */
    destinationAccount?: string;

  /**
   * The ECC signature of the response. Can be used to ensure that it was signed by the
   * terminal and detect man-in-the middle attacks.
   */
    sig?: string;

    // Constructor with default values for optional fields
    constructor(transactionId: string | null = null,
        batchId: string | undefined = undefined,
        transactionRef: string | undefined = undefined,
        transactionType: string | null = null,
        timestamp: string | null = null,
        tickBlock: string | null = null,
        test: boolean | null = null,
        destinationAccount: string | undefined = undefined,
        sig: string | undefined = undefined,
        ) {
        this.transactionId = transactionId;
        this.batchId = batchId;
        this.transactionRef = transactionRef;
        this.transactionType = transactionType;
        this.timestamp = timestamp;
        this.tickBlock = tickBlock;
        this.test = test;
        this.destinationAccount = destinationAccount;
        this.sig = sig;
        }
}
