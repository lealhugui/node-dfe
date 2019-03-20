const axios = require("axios");
const https = require("https");
import { XmlHelper } from '../xmlHelper';

export class WebServiceHelper {

    buildSoapEnvelope(xml: string, soapMethod: string) {
        let soapEnvelopeObj = {
            '$': { 'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema' },
                'soap:Body': {
                    'nfeDadosMsg': {
                        '$': {
                            'xmlns': soapMethod
                        },
                        _: '[XML]'
                    }
                }
            };

        let soapEnvXml = new XmlHelper().serializeXml(soapEnvelopeObj, 'soap:Envelope');
        return soapEnvXml.replace('[XML]', xml);
    }

    getHttpsAgent(cert: any) {
        return new https.Agent({
            //rejectUnauthorized: false,
            //strictSSL: false,
            pfx: cert.pfx,
            passphrase: cert.password
        });
    }

    async makeSoapRequest(xml: string, cert: any, service: any) {
        try {
            let res = await axios({
                url: service.url,
                method: "post",
                httpsAgent: this.getHttpsAgent(cert),
                data: this.buildSoapEnvelope(xml, service.soapMethod),
                headers: {
                    "Content-Type": "text/xml;charset=utf-8",
                    "SOAPAction": service.soapAction
                }
            });

            if (res.status == 200) {
                // TODO: tratar retornos
                console.log(res.data);
                //console.log(util.inspect(new XmlHelper().deserializeXml(res.data)));
            }

            return res.data;
        } catch (err) {
            console.error(err);
        }
    }
}