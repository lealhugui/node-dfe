"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retornoProcessor_1 = require("./retornoProcessor");
const enviaProcessor_1 = require("./enviaProcessor");
const eventoProcessor_1 = require("./eventoProcessor");
const inutilizaProcessor_1 = require("./inutilizaProcessor");
const xmlHelper_1 = require("../xmlHelper");
const Utils = require("../utils/utils");
const fs = require("fs");
const path = require("path");
/**
 * Classe para processamento de NFe/NFCe
 */
class NFeProcessor {
    constructor(configuracoes) {
        this.configuracoes = configuracoes;
        this.retornoProcessor = null;
        this.enviaProcessor = null;
        this.eventoProcessor = null;
        this.inutlizacaoProcessor = null;
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
        this.retornoProcessor = new retornoProcessor_1.RetornoProcessor(this.configuracoes);
        this.enviaProcessor = new enviaProcessor_1.EnviaProcessor(this.configuracoes);
        this.eventoProcessor = new eventoProcessor_1.EventoProcessor(this.configuracoes);
        this.inutlizacaoProcessor = new inutilizaProcessor_1.InutilizaProcessor(this.configuracoes);
    }
    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma sincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    async processarDocumento(documento) {
        let result = await this.executar(documento);
        return result;
    }
    async executar(documento, assincrono = false) {
        const { arquivos } = this.configuracoes;
        let result = {};
        try {
            result = await this.enviaProcessor.executar(documento);
            let retEnviNFe = null;
            let retConsReciNFe = null;
            let cStat = '';
            if (result.envioNF && result.envioNF.data) {
                const data = Object(result.envioNF.data);
                if (data.retEnviNFe) {
                    retEnviNFe = data.retEnviNFe;
                    const recibo = retEnviNFe.infRec.nRec;
                    result.consultaProc = await this.retornoProcessor.executar(recibo);
                    retConsReciNFe = Object(result.consultaProc.data).retConsReciNFe;
                    cStat = retConsReciNFe.cStat;
                }
                if (retConsReciNFe)
                    if (cStat == '104' && retConsReciNFe.protNFe.infProt.cStat == '100') {
                        result.confirmada = true;
                        result.success = true;
                    }
                if (arquivos.salvar) {
                    if (!await fs.existsSync(arquivos.pastaEnvio))
                        await fs.mkdirSync(arquivos.pastaEnvio, { recursive: true });
                    if (!await fs.existsSync(arquivos.pastaRetorno))
                        await fs.mkdirSync(arquivos.pastaRetorno, { recursive: true });
                    if (!await fs.existsSync(arquivos.pastaXML))
                        await fs.mkdirSync(arquivos.pastaXML, { recursive: true });
                    if ((result.success == true) && (retConsReciNFe.protNFe.infProt.cStat == '100')) {
                        const filename = `${arquivos.pastaXML}${retConsReciNFe.protNFe.infProt.chNFe}-procNFe.xml`;
                        const nfe_enviada = Object(xmlHelper_1.XmlHelper.deserializeXml(result.envioNF.xml_enviado, { explicitArray: false }));
                        const nfeProc = {
                            $: { versao: "1.00", xmlns: "http://www.portalfiscal.inf.br/nfe" },
                            NFe: nfe_enviada.enviNFe.NFe,
                            protNFe: retConsReciNFe.protNFe
                        };
                        Utils.removeSelfClosedFields(nfeProc);
                        let xmlNfeProc = xmlHelper_1.XmlHelper.serializeXml(nfeProc, 'nfeProc');
                        await fs.writeFileSync(filename, xmlNfeProc);
                    }
                    else {
                        const filenameEnvio = `${arquivos.pastaEnvio}${retEnviNFe.infRec.nRec}-enviNFe.xml`;
                        const filenameRetorno = `${arquivos.pastaRetorno}${retEnviNFe.infRec.nRec}-retEnviNFe.xml`;
                        await fs.writeFileSync(filenameEnvio, result.envioNF.xml_enviado);
                        await fs.writeFileSync(filenameRetorno, result.envioNF.xml_recebido);
                        const filenameConsultaEnvio = `${arquivos.pastaEnvio}${retConsReciNFe.nRec}-consReciNFe.xml`;
                        const filenameConsultaRetorno = `${arquivos.pastaRetorno}${retConsReciNFe.nRec}-retConsReciNFe.xml`;
                        await fs.writeFileSync(filenameConsultaEnvio, result.consultaProc.xml_enviado);
                        await fs.writeFileSync(filenameConsultaRetorno, result.consultaProc.xml_recebido);
                    }
                }
            }
            else {
                throw new Error('Erro ao realizar requisição');
            }
        }
        catch (ex) {
            result.success = false;
            result.error = ex;
        }
        return result;
    }
    async inutilizarNumeracao(dados) {
        return await this.inutlizacaoProcessor.executar(dados);
    }
    async gerarEvento(evento) {
        return await this.eventoProcessor.executar(evento);
    }
}
exports.NFeProcessor = NFeProcessor;
