import { Configuracoes, RetornoProcessamento } from "../interface/nfe";
import { Inutilizar } from '../interface/inutilizacao';
/**
 * Classe para processamento de Inutilização de numeração
 */
export declare class InutilizaProcessor {
    private configuracoes;
    constructor(configuracoes: Configuracoes);
    executar(dados: Inutilizar): Promise<RetornoProcessamento>;
    private transmitirXml;
    private gerarInfInut;
    private gerarXml;
}
