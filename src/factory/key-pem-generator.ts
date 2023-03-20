import * as forge from 'node-forge'
import * as fs from 'fs'
import { CertificateNotFoundError, CertificatePasswordError } from './error';

type Output = {
  pem: string
  key: string
}

export abstract class KeyPem {

  public static generate(path: string, password: string): Output {
    if (!fs.existsSync(path)) {
      throw new CertificateNotFoundError()
    }
    const pfx = fs.readFileSync(path)
    const p12buffer = pfx.toString('base64')
    const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer))
    let p12
    try {
      p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, password)
    } catch (err) {
      throw new CertificatePasswordError()
    }
    return {
      pem: getPem(p12),
      key: getKey(p12)
    }
  }

}


function getKey (p12: forge.pkcs12.Pkcs12Pfx): string {
  const keyData = (p12 as any)
    .getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag].concat(
      p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]
    )
  const rsaPrivateKey = forge.pki.privateKeyToAsn1(keyData[0].key)
  const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey)
  const key = forge.pki.privateKeyInfoToPem(privateKeyInfo)
  return key
}

function getPem (p12: forge.pkcs12.Pkcs12Pfx): string {
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag] as forge.pkcs12.Bag[]
  const pem = forge.pki.certificateToPem(certBags[0].cert as forge.pki.Certificate)
  return pem
}
