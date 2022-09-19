import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper, WebProxy } from "../webservices/webserviceHelper";
import { Empresa, ServicosSefaz, Configuracoes, RetornoProcessamentoNF, RetornoProcessamento } from "../interface/nfe";
import * as Utils from "../utils/utils";
import { SefazNFCe } from "../webservices/sefazNfce";
import { SefazNFe } from "../webservices/sefazNfe";

/**
 * Classe para processamento do Retorno da NFe
*/

let soapRetAutorizacao: any = null;

// FStatusServico: TNFeStatusServico;
// OK FEnviar: TNFeRecepcao;
// OK FRetorno: TNFeRetRecepcao;
// FRecibo: TNFeRecibo;
// FConsulta: TNFeConsulta;
// FInutilizacao: TNFeInutilizacao;
// FConsultaCadastro: TNFeConsultaCadastro;
// FEnvEvento: TNFeEnvEvento;

export class RetornoProcessor {

    constructor(
        private configuracoes: Configuracoes
    ) {
        if (!this.configuracoes.geral.versao) this.configuracoes.geral.versao = '4.00';
        if (!this.configuracoes.webservices) this.configuracoes.webservices = { tentativas: 3, aguardarConsultaRetorno: 1000 };
        if (!this.configuracoes.webservices.tentativas) this.configuracoes.webservices.tentativas = 3;
        if (!this.configuracoes.webservices.aguardarConsultaRetorno) this.configuracoes.webservices.aguardarConsultaRetorno = 1000;
    }

    async executar(recibo: string, nfeObj?: Object) {
        let result = <RetornoProcessamento>{
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
                    }), 'retornoConsulta.exists')

                    Utils.log(Utils.jsonOneLevel(retornoConsulta), 'retornoConsulta.data');
                } catch (e) {
                    Utils.log('retornoProcessor.envir: ja deu erro pra logar.......', 'retornoConsulta')
                }

                cStat = Object(retornoConsulta.data).retConsReciNFe.cStat;

                _tentativa++;
            } while (cStat == '105' && (_tentativa < tentativas)); // nota em processamento, realiza a consulta novamente até obter um status diferente.

            if (retornoConsulta)
                result = retornoConsulta;
        } catch (ex: any) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }

    private async consultarProc(xml: string) {
        const { empresa, geral: { ambiente, modelo }, webProxy, certificado } = this.configuracoes
        let Sefaz = modelo == '65' ? SefazNFCe : SefazNFe;

        soapRetAutorizacao = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, ServicosSefaz.retAutorizacao);

        return await WebServiceHelper.makeSoapRequest(
            xml, certificado, soapRetAutorizacao, webProxy
        );
    }

    private gerarXmlConsultaProc(recibo: string) {
        const { versao, ambiente } = this.configuracoes.geral;

        let consulta = <schema.TConsReciNFe>{
            $: { versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
            tpAmb: ambiente,
            nRec: recibo
        };
        return XmlHelper.serializeXml(consulta, 'consReciNFe');
    }

}