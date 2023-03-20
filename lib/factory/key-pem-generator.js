"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPem = void 0;
const forge = require("node-forge");
const fs = require("fs");
const certificate_1 = require("./error/certificate");
class KeyPem {
    static generate(path, password) {
        if (!fs.existsSync(path)) {
            throw new certificate_1.CertificateNotFoundError();
        }
        const pfx = fs.readFileSync(path);
        const p12buffer = pfx.toString('base64');
        const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer));
        let p12;
        try {
            p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, password);
        }
        catch (err) {
            throw new certificate_1.CertificatePasswordError();
        }
        return {
            pem: getPem(p12),
            key: getKey(p12)
        };
    }
}
exports.KeyPem = KeyPem;
function getKey(p12) {
    const keyData = p12
        .getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag].concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
    const rsaPrivateKey = forge.pki.privateKeyToAsn1(keyData[0].key);
    const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
    const key = forge.pki.privateKeyInfoToPem(privateKeyInfo);
    return key;
}
function getPem(p12) {
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
    const pem = forge.pki.certificateToPem(certBags[0].cert);
    return pem;
}
