"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = require("../schema/index");
const xmlHelper_1 = require("../xmlHelper");
const webserviceHelper_1 = require("../webservices/webserviceHelper");
const nfe_1 = require("../interface/nfe");
const Utils = require("../utils/utils");
const sefazNfce_1 = require("../webservices/sefazNfce");
const sefazNfe_1 = require("../webservices/sefazNfe");
/**
 * Classe para processamento do Status Servico
 */
class StatusServicoProcessor {
    constructor(empresa, ambiente, modelo, webProxy) {
        this.empresa = empresa;
        this.ambiente = ambiente;
        this.modelo = modelo;
        this.webProxy = webProxy;
    }
    async processarDocumento() {
        let xml = this.gerarXmlStatusServico('4.00', this.ambiente, this.empresa.endereco.cUf);
        return await this.consultarStatusServico(xml, this.empresa.certificado);
    }
    async consultarStatusServico(xml, cert) {
        let Sefaz = this.modelo == '65' ? sefazNfce_1.SefazNFCe : sefazNfe_1.SefazNFe;
        let soap = Sefaz.getSoapInfo(this.empresa.endereco.uf, this.ambiente, nfe_1.ServicosSefaz.consultarStatusServico);
        return await webserviceHelper_1.WebServiceHelper.makeSoapRequest(xml, cert, soap, this.webProxy);
    }
    gerarXmlStatusServico(versao, ambiente, cUf) {
        let status = {
            $: {
                versao: versao,
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            tpAmb: Utils.getEnumByValue(schema.TAmb, ambiente),
            cUF: Utils.getEnumByValue(schema.TCodUfIBGE, cUf),
            xServ: schema.TConsStatServXServ.STATUS
        };
        return xmlHelper_1.XmlHelper.serializeXml(status, 'consStatServ');
    }
}
exports.StatusServicoProcessor = StatusServicoProcessor;
