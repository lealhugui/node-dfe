
import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper } from "../webservices/webserviceHelper";
import {Empresa} from "../interface/nfe";
import * as Utils from "../utils/utils";

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

    constructor(private empresa: Empresa){

    }

    async processarDocumento(){
        let xml = this.gerarXmlStatusServico('4.00', 2, this.empresa.endereco.cUf); //TODO: ambiente
        return await this.consultarStatusServico(xml, this.empresa.certificado);
    }

    async consultarStatusServico(xml: string, cert: any) {
        return await WebServiceHelper.makeSoapRequest(xml, cert, soap);
    }

    gerarXmlStatusServico(versao: string, ambiente: number, cUf: string) {
        let status = <schema.TConsStatServ>{
            $: {
                versao: versao,
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            tpAmb: Utils.getEnumByValue(schema.TAmb, ambiente),
            cUF: Utils.getEnumByValue(schema.TCodUfIBGE, cUf),
            xServ: schema.TConsStatServXServ.STATUS
        };

        return XmlHelper.serializeXml(status, 'consStatServ');
    }

}