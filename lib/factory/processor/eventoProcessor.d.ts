import { Configuracoes, RetornoProcessamento } from "../interface/nfe";
import { Evento } from '../interface';
/**
 * Classe para processamento de Eventos ( Cancelamento / Inutilização )
 */
export declare class EventoProcessor {
    private configuracoes;
    constructor(configuracoes: Configuracoes);
    executar(evento: Evento): Promise<RetornoProcessamento>;
    private transmitirXml;
    private getInfEvento;
    private getDetEvento;
    private gerarXml;
    private gerarXmlLote;
}
