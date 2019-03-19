import { Empresa, NFCeDocumento, NFeDocumento } from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/schemaTest'
import { XmlHelper } from '../xmlHelper';
const fs = require('fs');
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

    consultarStatusServico(xml: string, cert: any) {
        let url = 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl';
        require('soap').createClient(url, {
            wsdl_options: {
                rejectUnauthorized: false, 
                cert: fs.readFileSync(cert.certPath),
                key: fs.readFileSync(cert.keyPath)
            }
        }, function(err: any, client: any) {
            console.log('client', client);
            //console.log(err);
            client.nfeStatusServicoNF(xml, function (err: any, result: any, body: any) {
                console.log(err);
                console.log(result);
                console.log(body);
            });
        });
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