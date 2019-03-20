
import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper } from "../webservices/webserviceHelper";

const soap = {
    //TODO: buscar URL conforme UF e Ambiente
    url: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl',
    method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4',
    action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF'
};

/**
 * Classe para processamento do Status Servico
 */
export class StatusServicoProcessor {

    constructor(){

    }

    async processarDocumento(dados: any){
        let xml = this.gerarXmlStatusServico(dados.versao, dados.ambiente, dados.uf);

        let retornoConsulta = await this.consultarStatusServico(xml, dados.cert);

        //TODO: retornar dados
    }

    async consultarStatusServico(xml: string, cert: any) {
        return await WebServiceHelper.makeSoapRequest(xml, cert, soap);
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