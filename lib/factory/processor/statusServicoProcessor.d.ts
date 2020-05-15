import { WebProxy } from "../webservices/webserviceHelper";
import { Empresa } from "../interface/nfe";
/**
 * Classe para processamento do Status Servico
 */
export declare class StatusServicoProcessor {
    private empresa;
    private ambiente;
    private modelo;
    private webProxy?;
    constructor(empresa: Empresa, ambiente: string, modelo: string, webProxy?: WebProxy | undefined);
    processarDocumento(): Promise<import("../interface/nfe").RetornoProcessamento>;
    consultarStatusServico(xml: string, cert: any): Promise<import("../interface/nfe").RetornoProcessamento>;
    gerarXmlStatusServico(versao: string, ambiente: string, cUf: string): string;
}
