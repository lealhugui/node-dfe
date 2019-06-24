import axios from 'axios';
import * as https from 'https';
import { XmlHelper } from '../xmlHelper';

import { RetornoProcessamento } from '../interface/nfe'

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
        let result = <RetornoProcessamento>{ xml_enviado: xml };
        try {
            
            console.log('----->', soap.url)
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
            console.log('----->', res.status)
            result.status = res.status;
            result.xml_recebido = res.data;

            if (res.status == 200) {
                result.success = true;
                
                //let retorno = (require('util').inspect(XmlHelper.deserializeXml(res.data), false, null));
                let retorno = XmlHelper.deserializeXml(res.data);
                if (retorno) {
                    //result.data = retorno;
                    result.data = Object(retorno)['soap:Envelope']['soap:Body']['nfeResultMsg'];
                    //console.log(result.data)
                }
            }
            console.log('----->', result.success)
            return result;
            
        } catch (err) {
            result.success = false;
            result.error = err;
            console.log('----->', result.success)
            return result;
        }
    }
}