import { RetornoProcessamentoNF, NFCeDocumento, NFeDocumento, Configuracoes } from '../interface/nfe';
import { Inutilizar } from '../interface/inutilizacao';
import { Evento } from '../interface';
/**
 * Classe para processamento de NFe/NFCe
 */
export declare class NFeProcessor {
    private configuracoes;
    private retornoProcessor;
    private enviaProcessor;
    private eventoProcessor;
    private inutlizacaoProcessor;
    constructor(configuracoes: Configuracoes);
    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma sincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    processarDocumento(documento: NFeDocumento | NFCeDocumento): Promise<RetornoProcessamentoNF>;
    executar(documento: NFeDocumento | NFCeDocumento): Promise<RetornoProcessamentoNF>;
    inutilizarNumeracao(dados: Inutilizar): Promise<any>;
    gerarEvento(evento: Evento): Promise<any>;
    processarXmlContingencia(xml: string): Promise<any>;
}
