import { Empresa, NFCeDocumento, NFeDocumento } from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';
import * as util from "util";
const fs = require('fs');
const axios = require("axios");
const https = require("https");
/**
 * Classe para processamento de NFe/NFCe
 */
export class NFeProcessor {

    constructor(private empresa?: Empresa) {

    }

    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    processarDocumento(documento: NFeDocumento[] | NFCeDocumento | null): Evento | null {
        return '';
    }

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

    consultarStatusServico(xml: string, cert: any) {
        const url = 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl';

        const agent = new https.Agent({
            rejectUnauthorized: false,
            strictSSL: false,
            pfx: cert.pfx,
            passphrase: cert.password
        });

        const xmlSoapEnv = this.buildSoapEnvelope(xml, 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4');

        (async () => {
            try {
                let res = await axios({
                    url: url,
                    method: "post",
                    httpsAgent: agent,
                    data: xmlSoapEnv,
                    headers: {
                        "Content-Type": "text/xml;charset=utf-8",
                        "SOAPAction": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF"
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
        })();

    }

    gerarXmlStatusServico(versao: string, ambiente: number, uf: string) {
        let status = <schema.TConsStatServ>{
            $: {
                versao: versao,
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            tpAmb: ambiente == 1 ? schema.TAmb.PRD : schema.TAmb.HML,
            cUF: schema.TCodUfIBGE.Item43, // RS -> todo: get enum by uf
            xServ: schema.TConsStatServXServ.STATUS
        };

        return new XmlHelper().serializeXml(status, 'consStatServ');
    }

}