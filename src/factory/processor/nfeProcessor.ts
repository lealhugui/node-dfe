import { Empresa, NFCeDocumento, NFeDocumento } from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/schemaTest'
import { XmlHelper } from '../xmlHelper';

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

    consultarStatusServico(xml: string) {
        let url = 'https://nfe.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl';
        require('soap').createClient(url, {}, function (err: any, client: any) {
            console.log(client);
            console.log(err);
          });
    }

    gerarXmlStatusServico(versao: string, ambiente: number, uf: string) {
        let status = <schema.TConsStatServ>{
            xServ: schema.TConsStatServXServ.STATUS,
            cUF: schema.TCodUfIBGE.Item43, // RS -> todo: get enum by uf
            tpAmb: ambiente == 1 ? schema.TAmb.PRD : schema.TAmb.HML,
            versao: versao
        };
          
        return new XmlHelper().serializeXml(status, 'consStatServ');
    }

}