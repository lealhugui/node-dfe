let SignedXml = require('xml-crypto').SignedXml;
export class Signature {

  signXml(xml: string, tag: string, cert: any) {
    let sig = new SignedXml();
    sig.addReference("//*[local-name(.)='"+tag+"']","","","","","", true);
    sig.signingKey = cert;
    sig.computeSignature(xml);
    return sig.getSignedXml();
  }

  signXmlX509(xml: string, tag:string, cert: any){

    const transforms = [
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    ];

    
    const infoProvider = (pem: any) => {
      return {
        getKeyInfo() {
          const cert = this.getCert();
          return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
        },
        getCert() {
          const certLines = pem.certificate.split('\n');
          return certLines.filter((e: any, i: any) => i && e && e.indexOf('-----') !== 0).join('');
        }
      };
    };
    

    let sig = new SignedXml();
    sig.addReference("//*[local-name(.)='"+tag+"']", transforms, "", "", "", "", true);
    sig.signingKey = cert;
    sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
    //sig.keyInfoProvider = infoProvider(pem); //todo: x509 cDATA
    sig.computeSignature(xml);

    return sig.getSignedXml();
  }

}
