import { ServicosSefaz } from '../interface/nfe';
export declare abstract class SefazNFCe {
    private static getAutorizadorByUF;
    private static getInfoQRCodeByUF;
    static getSoapInfo(uf: string, amb: string, servico: ServicosSefaz): any;
}
