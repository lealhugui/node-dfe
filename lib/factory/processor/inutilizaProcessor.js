"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmlHelper_1 = require("../xmlHelper");
const webserviceHelper_1 = require("../webservices/webserviceHelper");
const nfe_1 = require("../interface/nfe");
const Utils = require("../utils/utils");
const sefazNfce_1 = require("../webservices/sefazNfce");
const sefazNfe_1 = require("../webservices/sefazNfe");
const signature_1 = require("../signature");
const fs = require("fs");
const path = require("path");
let soapInutilizacao = null;
/**
 * Classe para processamento de Inutilização de numeração
 */
class InutilizaProcessor {
    constructor(configuracoes) {
        this.configuracoes = configuracoes;
        if (!this.configuracoes.geral.versao)
            this.configuracoes.geral.versao = '4.00';
        if (!this.configuracoes.webservices)
            this.configuracoes.webservices = { tentativas: 3, aguardarConsultaRetorno: 1000 };
        if (!this.configuracoes.webservices.tentativas)
            this.configuracoes.webservices.tentativas = 3;
        if (!this.configuracoes.webservices.aguardarConsultaRetorno)
            this.configuracoes.webservices.aguardarConsultaRetorno = 1000;
        if (this.configuracoes.arquivos) {
            if (this.configuracoes.arquivos.pastaEnvio && (!'/\\'.includes(this.configuracoes.arquivos.pastaEnvio.substr(-1))))
                this.configuracoes.arquivos.pastaEnvio = this.configuracoes.arquivos.pastaEnvio + path.sep;
            if (this.configuracoes.arquivos.pastaRetorno && (!'/\\'.includes(this.configuracoes.arquivos.pastaRetorno.substr(-1))))
                this.configuracoes.arquivos.pastaRetorno = this.configuracoes.arquivos.pastaRetorno + path.sep;
            if (this.configuracoes.arquivos.pastaXML && (!'/\\'.includes(this.configuracoes.arquivos.pastaXML.substr(-1))))
                this.configuracoes.arquivos.pastaXML = this.configuracoes.arquivos.pastaXML + path.sep;
        }
    }
    async executar(dados) {
        let result = {
            success: false
        };
        try {
            const { geral: { modelo, ambiente }, empresa, arquivos } = this.configuracoes;
            const Sefaz = modelo == '65' ? sefazNfce_1.SefazNFCe : sefazNfe_1.SefazNFe;
            soapInutilizacao = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, nfe_1.ServicosSefaz.inutilizacao);
            const xml = this.gerarXml(dados);
            result = await this.transmitirXml(xml);
            if (arquivos && arquivos.salvar) {
                if (!fs.existsSync(arquivos.pastaEnvio))
                    fs.mkdirSync(arquivos.pastaEnvio, { recursive: true });
                if (!fs.existsSync(arquivos.pastaRetorno))
                    fs.mkdirSync(arquivos.pastaRetorno, { recursive: true });
                if (!fs.existsSync(arquivos.pastaXML))
                    fs.mkdirSync(arquivos.pastaXML, { recursive: true });
                if ((result.success == true) && (Object(result.data).retInutNFe.infInut.cStat == 102)) {
                    const filename = `${arquivos.pastaXML}${dados.ano}${dados.modelo}${dados.serie}${dados.numeroInicial}${dados.numeroFinal}-procInutNFe.xml`;
                    const procEvento = {
                        $: { versao: "1.00", xmlns: "http://www.portalfiscal.inf.br/nfe" },
                        _: '[XML]',
                        retInutNFe: Object(result.data).retInutNFe
                    };
                    Utils.removeSelfClosedFields(procEvento);
                    let xmlProcEvento = xmlHelper_1.XmlHelper.serializeXml(procEvento, 'retInutNFe');
                    xmlProcEvento = xmlProcEvento.replace('[XML]', xml);
                    fs.writeFileSync(filename, xmlProcEvento);
                }
                else {
                    const filenameEnvio = `${arquivos.pastaEnvio}${dados.ano}${dados.modelo}${dados.serie}${dados.numeroInicial}${dados.numeroFinal}-inutNFe.xml`;
                    const filenameRetorno = `${arquivos.pastaRetorno}${dados.ano}${dados.modelo}${dados.serie}${dados.numeroInicial}${dados.numeroFinal}-retInutNFe.xml`;
                    fs.writeFileSync(filenameEnvio, result.xml_enviado);
                    fs.writeFileSync(filenameRetorno, result.xml_recebido);
                }
            }
        }
        catch (ex) {
            result.success = false;
            result.error = ex;
        }
        return result;
    }
    async transmitirXml(xml) {
        const { geral: { modelo, ambiente }, empresa, certificado, webProxy } = this.configuracoes;
        const Sefaz = modelo == '65' ? sefazNfce_1.SefazNFCe : sefazNfe_1.SefazNFe;
        const soap = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, nfe_1.ServicosSefaz.inutilizacao);
        return await webserviceHelper_1.WebServiceHelper.makeSoapRequest(xml, certificado, soap, webProxy);
    }
    gerarInfInut(dados) {
        const { geral: { ambiente }, empresa } = this.configuracoes;
        const _ID = `ID${empresa.endereco.cUf}${dados.ano}${empresa.cnpj}${("00" + dados.modelo).slice(-2)}${("000" + dados.serie).slice(-3)}${("000000000" + dados.numeroInicial).slice(-9)}${("000000000" + dados.numeroFinal).slice(-9)}`;
        if (_ID.length < 43)
            throw 'ID de Inutilização inválido';
        const infInut = {
            $: { Id: _ID },
            tpAmb: ambiente,
            xServ: 'INUTILIZAR',
            cUF: empresa.endereco.cUf,
            ano: dados.ano,
            CNPJ: empresa.cnpj,
            mod: dados.modelo,
            serie: dados.serie,
            nNFIni: dados.numeroInicial,
            nNFFin: dados.numeroFinal,
            xJust: dados.xJustificativa,
        };
        return infInut;
    }
    gerarXml(dados) {
        const { geral: { versao } } = this.configuracoes;
        if (dados.ano > 2000)
            dados.ano = dados.ano - 2000;
        if (dados.numeroInicial > dados.numeroFinal)
            throw 'O numero final não pode ser menor que o inicial.';
        const infInut = this.gerarInfInut(dados);
        const inutNFe = {
            $: { versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
            infInut
        };
        Utils.removeSelfClosedFields(inutNFe);
        const xml = xmlHelper_1.XmlHelper.serializeXml(inutNFe, 'inutNFe');
        const xmlAssinado = signature_1.Signature.signXmlX509(xml, 'infInut', this.configuracoes.certificado);
        return xmlAssinado;
    }
}
exports.InutilizaProcessor = InutilizaProcessor;
