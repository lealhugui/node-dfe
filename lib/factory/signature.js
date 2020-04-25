"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let SignedXml = require('xml-crypto').SignedXml;
class Signature {
    static signXml(xml, tag, certificado) {
        let sig = new SignedXml();
        sig.addReference("//*[local-name(.)='" + tag + "']", "", "", "", "", "", true);
        sig.signingKey = certificado.key;
        sig.computeSignature(xml);
        return sig.getSignedXml();
    }
    static signXmlX509(xml, tag, certificado) {
        const transforms = [
            'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
            'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
        ];
        const infoProvider = (pem) => {
            return {
                getKeyInfo() {
                    const cert = this.getCert();
                    return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
                },
                getCert() {
                    const certLines = pem.toString().split('\n');
                    return certLines.filter((e, i) => i && e && e.indexOf('-----') !== 0).join('');
                }
            };
        };
        let sig = new SignedXml();
        sig.addReference("//*[local-name(.)='" + tag + "']", transforms, "", "", "", "", false);
        sig.signingKey = certificado.key;
        sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
        sig.keyInfoProvider = infoProvider(certificado.pem);
        sig.computeSignature(xml);
        return sig.getSignedXml();
    }
}
exports.Signature = Signature;
