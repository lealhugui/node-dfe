import { RetornoProcessamentoNF, Empresa, NFCeDocumento, NFeDocumento, ResponsavelTecnico } from '../interface/nfe';
import { WebProxy } from "../webservices/webserviceHelper";
/**
 * Classe para processamento de NFe/NFCe
 */
export declare class NFeProcessor {
    private empresa;
    private responsavelTecnico?;
    private webProxy?;
    constructor(empresa: Empresa, responsavelTecnico?: ResponsavelTecnico | undefined, webProxy?: WebProxy | undefined);
    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma sincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    processarDocumento(documento: NFeDocumento | NFCeDocumento): Promise<RetornoProcessamentoNF>;
    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma assincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    processarDocumentoAsync(documento: NFeDocumento | NFCeDocumento): Promise<RetornoProcessamentoNF>;
    private configuraUrlsSefaz;
    private appendQRCodeXML;
    transmitirXml(xmlLote: string, modelo: string, ambiente: string, nfeObj: Object): Promise<RetornoProcessamentoNF>;
    private consultarProc;
    private enviarNF;
    private gerarXmlConsultaProc;
    private gerarXmlLote;
    private gerarXml;
    private gerarChaveNF;
    private obterDigitoVerificador;
    private gerarQRCodeNFCeOnline;
    private gerarQRCodeNFCeOffline;
    private gerarNFe;
    private gerarNFCe;
    private getIde;
    private getEmit;
    private getEnderEmit;
    private getEnderDest;
    private getDest;
    private getDet;
    private getDetProd;
    private getDetImposto;
    private getImpostoIcms;
    private getImpostoISSQN;
    private getImpostoIPI;
    private getImpostoII;
    private getImpostoPIS;
    private getImpostoCOFINS;
    private getImpostoPISST;
    private getImpostoCOFINSST;
    private getImpostoDevolucao;
    private getIcmsUfDest;
    private getTotal;
    private getIcmsTot;
    private getTransp;
    private getPag;
    private getDetalhamentoPagamentos;
    private getDetalhamentoCartao;
    private getInfoAdic;
    private getResponsavelTecnico;
    private gerarHashCSRT;
}
