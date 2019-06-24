import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper, WebProxy } from "../webservices/webserviceHelper";
import {Empresa, ServicosSefaz} from "../interface/nfe";
import * as Utils from "../utils/utils";
import { SefazNFCe } from "../webservices/sefazNfce";
import { SefazNFe } from "../webservices/sefazNfe";

/**
 * Classe para processamento do Status Servico
 */
export class StatusServicoProcessor {

    constructor(
        private empresa: Empresa,
        private ambiente: string,
        private modelo: string,
        private webProxy?: WebProxy) { }

    async processarDocumento() {
        let xml = this.gerarXmlStatusServico('4.00', this.ambiente, this.empresa.endereco.cUf);
        return await this.consultarStatusServico(xml, this.empresa.certificado);
    }

    async consultarStatusServico(xml: string, cert: any) {
        let Sefaz = this.modelo == '65' ? SefazNFCe : SefazNFe;
        let soap = Sefaz.getSoapInfo(this.empresa.endereco.uf, this.ambiente, ServicosSefaz.consultarStatusServico);
        return await WebServiceHelper.makeSoapRequest(xml, cert, soap, this.webProxy);
    }

    gerarXmlStatusServico(versao: string, ambiente: string, cUf: string) {
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