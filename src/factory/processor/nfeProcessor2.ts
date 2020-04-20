import {
    RetornoProcessamentoNF, RetornoProcessamento, NFCeDocumento, NFeDocumento, Configuracoes
} from '../interface/nfe';

import { RetornoProcessor } from './retornoProcessor';
import { EnviaProcessor } from './enviaProcessor';
import { EventoProcessor } from './eventoProcessor';


/**
 * Classe para processamento de NFe/NFCe
 */
export class NFeProcessor {
    private retornoProcessor: any = null;
    private enviaProcessor: any = null;
    private eventoProcessor: any = null;

    constructor(
        private configuracoes: Configuracoes
    ) {
        if (!this.configuracoes.geral.versao) this.configuracoes.geral.versao = '4.00';
        if (!this.configuracoes.webservices) this.configuracoes.webservices = { tentativas: 3, aguardarConsultaRetorno: 1000 };
        if (!this.configuracoes.webservices.tentativas) this.configuracoes.webservices.tentativas = 3;
        if (!this.configuracoes.webservices.aguardarConsultaRetorno) this.configuracoes.webservices.aguardarConsultaRetorno = 1000;

        this.retornoProcessor = new RetornoProcessor(this.configuracoes);
        this.enviaProcessor = new EnviaProcessor(this.configuracoes);
        this.eventoProcessor = new EventoProcessor(this.configuracoes);
    }

    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma sincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */    
    public async processarDocumento(documento: NFeDocumento | NFCeDocumento) {
        let result = <RetornoProcessamentoNF> await this.executar(documento);
        return result;
    }

    public async executar(documento: NFeDocumento | NFCeDocumento, assincrono: boolean = false) {
        let result = <RetornoProcessamentoNF>{};
        try {
            result = <RetornoProcessamentoNF>await this.enviaProcessor.executar(documento);

            let retEnviNFe = null;
            let retConsReciNFe = null;
            let cStat = '';

            if (result.envioNF && result.envioNF.data) {
                const data = Object(result.envioNF.data);
                if (data.retEnviNFe) {
                    retEnviNFe = data.retEnviNFe;
                    const recibo = retEnviNFe.infRec.nRec;
                    result.consultaProc = <RetornoProcessamento>await this.retornoProcessor.executar(recibo);
                    retConsReciNFe = Object(result.consultaProc.data).retConsReciNFe;
                    cStat = retConsReciNFe.cStat;
                }

                if (retConsReciNFe)
                    if (cStat == '104' && retConsReciNFe.protNFe.infProt.cStat == '100') {
                        result.confirmada = true;
                        result.success = true;
                    }
            } else {
                throw new Error('Erro ao realizar requisição');
            }
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }


}