
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
        let resultado = {
            xml_enviado: '',
            xml_retorno: ''
        };

        let xml = this.gerarXmlStatusServico('4.00', 2, this.empresa.endereco.uf); //TODO: ambiente
        resultado.xml_enviado = xml;

        let retornoConsulta = await this.consultarStatusServico(xml, this.empresa.certificado);
        resultado.xml_retorno = retornoConsulta;

        return resultado;
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
            tpAmb: Utils.getEnumByValue(schema.TAmb, ambiente),
            cUF: Utils.getEnumByValue(schema.TCodUfIBGE, '43'), //TODO buscar codigo ibge pela uf (ex: 'RS' -> 43)
            xServ: schema.TConsStatServXServ.STATUS
        };

        return new XmlHelper().serializeXml(status, 'consStatServ');
    }

}