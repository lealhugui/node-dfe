import { ServicosSefaz } from '../interface/nfe';
import * as Utils from '../utils/utils';
const servicos = require('../../../servicos.json')
const autorizadores = require('../../../autorizadores.json')

export abstract class SefazNFCe {

    private static getAutorizadorByUF(uf: string): any {
        switch (uf) {
            case 'AM':
                return autorizadores.AM;
            case 'CE':
                return autorizadores.CE;
            case 'GO':
                return autorizadores.GO;
            case 'MT':
                return autorizadores.MT;
            case 'MS':
                return autorizadores.MS;
            case 'MG':
                return autorizadores.MG;
            case 'PR':
                return autorizadores.PR;
            case 'RS':
                return autorizadores.RS;
            case 'SP':
                return autorizadores.SP;
            case 'AC':
            case 'AL':
            case 'AP':
            case 'BA':
            case 'DF':
            case 'ES':
            case 'MA':
            case 'PA':
            case 'PB':
            case 'PE':
            case 'PI':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'SE':
            case 'TO':
                return autorizadores.SVRS;
            default:
                throw new Error('Autorizador não encontrado!');
        }
    }

    private static getInfoQRCodeByUF(uf: string, amb: string) {
        if (amb == '1') {
            switch (uf) {
				case 'AC':
					return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaznet.ac.gov.br/nfce/qrcode' };
				case 'AL':
					return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.al.gov.br/nfce/qrcode' };
				case 'AP':
					return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ap.gov.br/nfce/qrcode' };
				case 'AM':
					return { urlChave: 'www.sefaz.am.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.am.gov.br/nfce/qrcode' };
				case 'CE':
					return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ce.gov.br/nfce/qrcode' };
				case 'DF':
					return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.df.gov.br/nfce/qrcode' };
				case 'ES':
					return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.es.gov.br/nfce/qrcode' };
				case 'GO':
					return { urlChave: 'www.sefaz.go.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.go.gov.br/nfce/qrcode' };
				case 'MA':
					return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ma.gov.br/nfce/qrcode' };
				case 'MS':
					return { urlChave: 'www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
				case 'PA':
					return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'http://www.sefa.pa.gov.br/nfce/qrcode' };
				case 'PR':
					return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode' };
				case 'PE':
					return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.pe.gov.br/nfce/qrcode' };
				case 'PI':
					return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
				case 'RJ':
					return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.rj.gov.br/nfce/qrcode' };
				case 'RN':
					return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://www.set.rn.gov.br/nfce/qrcode' };
				case 'RS':
					return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.rs.gov.br/nfce/qrcode' };
				case 'RO':
					return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.sefin.ro.gov.br/nfce/qrcode' };
				case 'RR':
					return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.rr.gov.br/nfce/qrcode' };
				case 'BA':
					return { urlChave: 'www.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ba.gov.br/nfce/qrcode' };
				case 'MG':
					return { urlChave: 'http://nfce.fazenda.mg.gov.br/portalnfce', urlQRCode: 'http://nfce.fazenda.mg.gov.br/nfce/qrcode' };
				case 'MT':
					return { urlChave: 'http://www.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://www.sefaz.mt.gov.br/nfce/qrcode' };
				case 'PB':
					return { urlChave: 'www.receita.pb.gov.br/nfce/consulta', urlQRCode: 'http://www.receita.pb.gov.br/nfce/qrcode' };
				case 'SP':
					return { urlChave: 'https://www.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'http://www.nfce.fazenda.sp.gov.br/nfce/qrcode' };
				case 'SE':
					return { urlChave: 'http://www.nfce.se.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.se.gov.br/nfce/qrcode' };
				case 'TO':
					return { urlChave: 'www.sefaz.to.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.to.gov.br/nfce/qrcode' };
                default:
                    throw new Error('URL do QRCode não encontrada pelo UF ('+uf+') informado.');
            }
        } else {
            switch (uf) {
				case 'AC':
					return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaznet.ac.gov.br/nfce/qrcode' };
				case 'AL':
					return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.al.gov.br/nfce/qrcode' };
				case 'AP':
					return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ap.gov.br/nfce/qrcode' };
				case 'AM':
					return { urlChave: 'www.sefaz.am.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.am.gov.br/nfce/qrcode' };
				case 'CE':
					return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ce.gov.br/nfce/qrcode' };
				case 'DF':
					return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.df.gov.br/nfce/qrcode' };
				case 'ES':
					return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.es.gov.br/nfce/qrcode' };
				case 'GO':
					return { urlChave: 'www.sefaz.go.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.go.gov.br/nfce/qrcode' };
				case 'MA':
					return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.ma.gov.br/nfce/qrcode' };
				case 'MS':
					return { urlChave: 'www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
				case 'PA':
					return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'http://www.sefa.pa.gov.br/nfce/qrcode' };
				case 'PR':
					return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode' };
				case 'PE':
					return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.pe.gov.br/nfce/qrcode' };
				case 'PI':
					return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
				case 'RJ':
					return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.rj.gov.br/nfce/qrcode' };
				case 'RN':
					return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://www.set.rn.gov.br/nfce/qrcode' };
				case 'RS':
					return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.rs.gov.br/nfce/qrcode' };
				case 'RO':
					return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.sefin.ro.gov.br/nfce/qrcode' };
				case 'RR':
					return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.rr.gov.br/nfce/qrcode' };
				case 'BA':
					return { urlChave: 'http://hinternet.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://hinternet.sefaz.ba.gov.br/nfce/qrcode' };
				case 'MG':
					return { urlChave: 'http://hnfce.fazenda.mg.gov.br/portalnfce/', urlQRCode: 'http://hnfce.fazenda.mg.gov.br/nfce/qrcode' };
				case 'MT':
					return { urlChave: 'http://homologacao.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://homologacao.sefaz.mt.gov.br/nfce/qrcode' };
				case 'PB':
					return { urlChave: 'www.receita.pb.gov.br/nfcehom', urlQRCode: 'http://www.receita.pb.gov.br/nfce/qrcode' };
				case 'SP':
					return { urlChave: 'https://www.homologacao.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'http://www.homologacao.nfce.fazenda.sp.gov.br/nfce/qrcode' };
				case 'SE':
					return { urlChave: 'http://www.hom.nfe.se.gov.br/nfce/consulta', urlQRCode: 'http://www.hom.nfe.se.gov.br/nfce/qrcode' };
				case 'TO':
					return { urlChave: 'http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf', urlQRCode: 'http://homologacao.sefaz.to.gov.br/nfce/qrcode' };
                default:
                    throw new Error('URL do QRCode não encontrada pelo UF ('+uf+') informado.');
            }
        }
        
    }

    public static getSoapInfo(uf: string, amb: string, servico: ServicosSefaz) {
        let soap: any = {};
        let autorizador = this.getAutorizadorByUF(uf);

        if (amb == '1')
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_producao);
        else
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_homologacao);

        if (servico == ServicosSefaz.autorizacao) {
            let infoQRCode = this.getInfoQRCodeByUF(uf, amb);
            soap.urlQRCode = infoQRCode.urlQRCode;
            soap.urlChave = infoQRCode.urlChave;
        }

        soap.method = servicos[servico].method;
        soap.action = servicos[servico].action;

        return soap;
    }

}



