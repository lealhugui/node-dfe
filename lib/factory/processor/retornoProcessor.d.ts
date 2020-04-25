import { Configuracoes, RetornoProcessamento } from "../interface/nfe";
export declare class RetornoProcessor {
    private configuracoes;
    constructor(configuracoes: Configuracoes);
    executar(recibo: string, nfeObj?: Object): Promise<RetornoProcessamento>;
    private consultarProc;
    private gerarXmlConsultaProc;
}
