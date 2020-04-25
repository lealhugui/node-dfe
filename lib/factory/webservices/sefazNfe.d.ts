import { ServicosSefaz } from '../interface/nfe';
export declare abstract class SefazNFe {
    private static getAutorizadorContingenciaByUF;
    private static getAutorizadorByUF;
    static getSoapInfo(uf: string, amb: string, servico: ServicosSefaz, isContingencia?: boolean): any;
}
