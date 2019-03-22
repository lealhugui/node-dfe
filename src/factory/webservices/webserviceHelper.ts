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
                let xml_retorno_exemplo = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><nfeResultMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4"><retEnviNFe versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><verAplic>RSnfce201807191353</verAplic><cStat>656</cStat><xMotivo>Rejeicao: Consumo indevido pelo
                aplicativo da empresa [Quantidade rejeicoes: 31, NF-e]</xMotivo><cUF /><dhRecbto>2019-03-22T17:20:45-03:00</dhRecbto></retEnviNFe></nfeResultMsg></soap:Body></soap:Envelope>`; 
                console.log(res.data);
                //console.log(util.inspect(new XmlHelper().deserializeXml(res.data)));
                let retorno = require('util').inspect(XmlHelper.deserializeXml(xml_retorno_exemplo), false, null);
                if (retorno) {
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