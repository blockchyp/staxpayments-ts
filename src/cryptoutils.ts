import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes, bytesToHex, utf8ToBytes } from '@noble/hashes/utils'
import  moment from 'moment'
const base32 = require('base32')
import { p256 } from '@noble/curves/nist'
import * as aesjs from 'aes-js'
import { Buffer } from 'buffer';
import { StaxPaymentsCredentials } from './client'


export class StaxPaymentsCrypto {
  generateGatewayHeaders (creds: StaxPaymentsCredentials) {
    const nonce = this.generateNonce()
    const ts = this.generateIsoTimestamp()
    const toSign = creds.apiKey + creds.bearerToken + ts + nonce
    const key = Buffer.from(creds.signingKey, 'hex')
    const mac = hmac(sha256, key, utf8ToBytes(toSign))
    const sig = bytesToHex(mac)

    const results = {
      'Nonce': nonce,
      'Timestamp': ts,
      'Authorization': 'Dual ' + creds.bearerToken + ':' + creds.apiKey + ':' + sig
    }

    return results
  }

  encrypt (hexKey: string, plainText: string) {
    const key = Buffer.from(hexKey, 'hex').slice(0, 32)
    const keyArr = [...key]

    const iv = randomBytes(16)
    const ivArr = [...iv]

    const aesCbc = new aesjs.ModeOfOperation.cbc(keyArr, ivArr)
    const plainBytes = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(plainText))
    const encryptedBytes = aesCbc.encrypt(plainBytes)

    return bytesToHex(iv) + aesjs.utils.hex.fromBytes(encryptedBytes)
  }

  sha256Hash (msg: string) {
    const msgBytes = Buffer.from(msg, 'hex')
    return bytesToHex(sha256(msgBytes))
  }

  validateSignature (publicKey: any, msg: string, sig: any) {
    const msgHash = this.sha256Hash(msg)
    const msgHashBytes = Buffer.from(msgHash, 'hex')

    const pubKeyPoint = p256.ProjectivePoint.fromAffine({
      x: BigInt('0x' + publicKey.x),
      y: BigInt('0x' + publicKey.y)
    })
    const pubKeyBytes = pubKeyPoint.toRawBytes(false)

    const signature = new p256.Signature(
      BigInt('0x' + sig.r),
      BigInt('0x' + sig.s)
    )
    const sigBytes = signature.toCompactRawBytes()

    // Verify signature (prehash: true means we already hashed the message)
    return p256.verify(sigBytes, msgHashBytes, pubKeyBytes, { prehash: true })
  }

  decrypt (hexKey: string, cipherText: string) {
    const key = Buffer.from(hexKey, 'hex').slice(0, 32)
    const keyArr = [...key]

    const cipherBytes = Buffer.from(cipherText, 'hex')
    const iv = cipherBytes.slice(0, 16)

    const aesCbc = new aesjs.ModeOfOperation.cbc(keyArr, iv)

    const cipher = cipherBytes.slice(16, cipherBytes.length)
    const cipherArr = [...cipher]
    const decryptedBytes = aesjs.padding.pkcs7.strip(aesCbc.decrypt(cipherArr))

    return aesjs.utils.utf8.fromBytes(decryptedBytes)
  }

  generateNonce () {
    return base32.encode(randomBytes(32)).toUpperCase()
  }

  generateIsoTimestamp () {
    return moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
  }
}

const CryptoUtils = new StaxPaymentsCrypto()
export default CryptoUtils
