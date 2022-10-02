"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetornoProcessor = void 0;
const xmlHelper_1 = require("../xmlHelper");
const webserviceHelper_1 = require("../webservices/webserviceHelper");
const nfe_1 = require("../interface/nfe");
const Utils = require("../utils/utils");
const sefazNfce_1 = require("../webservices/sefazNfce");
const sefazNfe_1 = require("../webservices/sefazNfe");
/**
 * Classe para processamento do Retorno da NFe
*/
let soapRetAutorizacao = null;
// FStatusServico: TNFeStatusServico;
// OK FEnviar: TNFeRecepcao;
// OK FRetorno: TNFeRetRecepcao;
// FRecibo: TNFeRecibo;
// FConsulta: TNFeConsulta;
// FInutilizacao: TNFeInutilizacao;
// FConsultaCadastro: TNFeConsultaCadastro;
// FEnvEvento: TNFeEnvEvento;
class RetornoProcessor {
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
    }
    async executar(recibo, nfeObj) {
        let result = {
            success: false,
            // nfe: nfeObj
        };
        try {
            let xmlConRecNFe = this.gerarXmlConsultaProc(recibo);
            let retornoConsulta = null;
            let cStat = '105';
            let _tentativa = 0;
            const { tentativas, aguardarConsultaRetorno } = this.configuracoes.webservices;
            do {
                await Utils.timeout(aguardarConsultaRetorno);
                retornoConsulta = await this.consultarProc(xmlConRecNFe);
                try {
                    Utils.log(Utils.jsonOneLevel({
                        retornoConsulta: !!retornoConsulta,
                        data: !retornoConsulta ? false : !!retornoConsulta.data
                    }), 'retornoConsulta.exists');
                    Utils.log(Utils.jsonOneLevel(retornoConsulta), 'retornoConsulta.data');
                }
                catch (e) {
                    Utils.log('retornoProcessor.envir: ja deu erro pra logar.......', 'retornoConsulta');
                }
                cStat = Object(retornoConsulta.data).retConsReciNFe.cStat;
                _tentativa++;
            } while (cStat == '105' && (_tentativa < tentativas)); // nota em processamento, realiza a consulta novamente até obter um status diferente.
            if (retornoConsulta)
                result = retornoConsulta;
        }
        catch (ex) {
            result.success = false;
            result.error = ex;
        }
        return result;
    }
    async consultarProc(xml) {
        const { empresa, geral: { ambiente, modelo }, webProxy, certificado } = this.configuracoes;
        let Sefaz = modelo == '65' ? sefazNfce_1.SefazNFCe : sefazNfe_1.SefazNFe;
        soapRetAutorizacao = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, nfe_1.ServicosSefaz.retAutorizacao);
        return await webserviceHelper_1.WebServiceHelper.makeSoapRequest(xml, certificado, soapRetAutorizacao, webProxy);
    }
    gerarXmlConsultaProc(recibo) {
        const { versao, ambiente } = this.configuracoes.geral;
        let consulta = {
            $: { versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
            tpAmb: ambiente,
            nRec: recibo
        };
        return xmlHelper_1.XmlHelper.serializeXml(consulta, 'consReciNFe');
    }
}
exports.RetornoProcessor = RetornoProcessor;
