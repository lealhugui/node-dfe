import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper } from "../webservices/webserviceHelper";
import {Empresa, ServicosSefaz} from "../interface/nfe";
import * as Utils from "../utils/utils";
import { SefazNFCe } from "../webservices/sefazNfce";

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
        let soap = SefazNFCe.getSoapInfo(this.empresa.endereco.uf, '2', ServicosSefaz.consultarStatusServico);
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