import { ServicosSefaz } from '../interface/nfe';
import * as Utils from '../utils/utils';
const servicos = require('../../../servicos.json')
const autorizadores = require('../../../autorizadores.json')

/*
const servicos: any = {
    'autorizacao': {
        method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4',
        action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4/nfeAutorizacaoLote',
    },
    'retAutorizacao': {
        method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeRetAutorizacao4',
        action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeRetAutorizacao4/nfeRetAutorizacaoLote'
    },
    'consultarStatusServico': {
        method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4',
        action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF'
    }
};


const autorizadores = {
    'AM': {
        nome: 'Amazonas',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4.asmx?wsdl'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefaz.am.gov.br/nfce-services/services/NfeRetAutorizacao4',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeRetAutorizacao4.asmx?wsdl'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4.asmx?wsdl'
            }
        }
    },
    'CE': {
        nome: 'Ceará',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4?WSDL',
                url_homologacao: 'https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4?WSDL'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefaz.ce.gov.br/nfce4/services/NFeRetAutorizacao4?WSDL',
                url_homologacao: 'https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeRetAutorizacao4?WSDL'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4?WSDL',
                url_homologacao: 'https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4?WSDL'
            }
        }
    },
    'GO': {
        nome: 'Goiás',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4?wsdl',
                url_homologacao: 'https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4?wsdl'
            },
            retAutorizacao: {
                url_producao: 'https://nfe.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4?wsdl',
                url_homologacao: 'https://homolog.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4?wsdl'
            },
            consultarStatusServico: {
                url_producao: 'https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4?wsdl',
                url_homologacao: 'https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4?wsdl'
            }
        }
    },
    'MT': {
        nome: 'Mato Grosso',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4',
                url_homologacao: 'https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4',
                url_homologacao: 'https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4',
                url_homologacao: 'https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4'
            }
        }
    },
    'MS': {
        nome: 'Mato Grosso do Sul',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4',
                url_homologacao: 'https://hom.nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4',
                url_homologacao: 'https://hom.nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefaz.ms.gov.br/ws/NFeStatusServico4',
                url_homologacao: 'https://hom.nfce.sefaz.ms.gov.br/ws/NFeStatusServico4'
            }
        }
    },
    'MG': {
        nome: 'Minas Gerais',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4',
                url_homologacao: 'https://hnfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4',
                url_homologacao: 'https://hnfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4',
                url_homologacao: 'https://hnfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4'
            }
        }
    },
    'PR': {
        nome: 'Paraná',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4',
                url_homologacao: 'https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4',
                url_homologacao: 'https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefa.pr.gov.br/nfce/NFeStatusServico4',
                url_homologacao: 'https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeStatusServico4'
            }
        }
    },
    'RS': {
        nome: 'Rio Grande do Sul',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx?wsdl'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx?wsdl'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl'
            }
        }
    },
    'SVRS': {
        nome: 'SEFAZ Virtual – SVRS',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx',
                url_homologacao: 'https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx',
                url_homologacao: 'https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx',
                url_homologacao: 'https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx'
            }
        }
    },
    'SP': {
        nome: 'São Paulo',
        servicos: {
            autorizacao: {
                url_producao: 'https://nfce.fazenda.sp.gov.br/ws/NFeAutorizacao4.asmx',
                url_homologacao: 'https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeAutorizacao4.asmx'
            },
            retAutorizacao: {
                url_producao: 'https://nfce.fazenda.sp.gov.br/ws/NFeRetAutorizacao4.asmx',
                url_homologacao: 'https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeRetAutorizacao4.asmx'
            },
            consultarStatusServico: {
                url_producao: 'https://nfce.fazenda.sp.gov.br/ws/NFeStatusServico4.asmx',
                url_homologacao: 'https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeStatusServico4.asmx'
            }
        }
    },
};
*/

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



