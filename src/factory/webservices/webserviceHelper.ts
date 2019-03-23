import axios from 'axios';
import * as https from 'https';
import { XmlHelper } from '../xmlHelper';

export abstract class WebServiceHelper {

    public static buildSoapEnvelope(xml: string, soapMethod: string) {
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

        let soapEnvXml = XmlHelper.serializeXml(soapEnvelopeObj, 'soap:Envelope');
        return soapEnvXml.replace('[XML]', xml);
    }

    public static getHttpsAgent(cert: any) {
        return new https.Agent({
            //rejectUnauthorized: false,
            //strictSSL: false,
            pfx: cert.pfx,
            passphrase: cert.password
        });
    }

    public static async makeSoapRequest(xml: string, cert: any, soap: any) {
        try {
            let res = await axios({
                url: soap.url,
                method: "post",
                httpsAgent: this.getHttpsAgent(cert),
                data: this.buildSoapEnvelope(xml, soap.method),
                headers: {
                    "Content-Type": "text/xml;charset=utf-8",
                    "SOAPAction": soap.action
                }
            });

            if (res.status == 200) {
                // TODO: tratar retornos
                //console.log(res.data);
                //console.log(util.inspect(new XmlHelper().deserializeXml(res.data)));

                //let test = XmlHelper.deserializeXml(res.data)
                //console.log(test);
                
                //let retorno = JSON.parse(XmlHelper.deserializeXml(res.data));
                //console.log(retorno['q'])
                let retorno = (require('util').inspect(XmlHelper.deserializeXml(res.data), false, null));
                if (retorno) {
                    //console.log(Object(retorno))
                    console.log(retorno)
                }
               
                //console.log(require('util').inspect(retorno, false, null))
            }

            return res.data;
        } catch (err) {
            console.error(err);
        }
    }
}