import { ServicosSefaz } from '../interface/nfe';
import * as Utils from '../utils/utils';

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

    private static getUrlQRCodeByUF(uf: string, amb: string){
        switch (uf) {
            case 'AC':
                return 'www.sefaznet.ac.gov.br/nfce/consulta';
            case 'AL':
                return 'www.sefaz.al.gov.br/nfce/consulta';
            case 'AP':
                return 'www.sefaz.ap.gov.br/nfce/consulta';
            case 'AM':
                return 'www.sefaz.am.gov.br/nfce/consulta';
            case 'CE':
                return 'www.sefaz.ce.gov.br/nfce/consulta';
            case 'DF':
                return 'www.fazenda.df.gov.br/nfce/consulta'
            case 'ES':
                return 'www.sefaz.es.gov.br/nfce/consulta';
            case 'GO':
                return 'www.sefaz.go.gov.br/nfce/consulta';
            case 'MA':
                return 'www.sefaz.ma.gov.br/nfce/consulta';
            case 'MT':
                return 'www.sefaz.mt.gov.br/nfce/consulta';
            case 'MS':
                return 'www.dfe.ms.gov.br/nfce/consulta';
            case 'PA':
                return 'www.sefa.pa.gov.br/nfce/consulta';
            case 'PR':
                return 'www.fazenda.pr.gov.br/nfce/consulta';
            case 'PE':
                return 'nfce.sefaz.pe.gov.br/nfce/consulta';
            case 'PI':
                return 'www.sefaz.pi.gov.br/nfce/consulta';
            case 'RJ':
                return 'www.fazenda.rj.gov.br/nfce/consulta';
            case 'RN':
                return 'www.set.rn.gov.br/nfce/consulta';
            case 'RS':
                return 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=';
            case 'RO':
                return 'www.sefin.ro.gov.br/nfce/consulta';
            case 'RR':
                return 'www.sefaz.rr.gov.br/nfce/consulta';
            case 'TO':
                return 'www.sefaz.to.gov.br/nfce/consulta';
            case 'BA':
                if (amb == '1')
                    return 'http://www.sefaz.ba.gov.br/nfce/consulta';
                else 
                    return 'http://hinternet.sefaz.ba.gov.br/nfce/consulta';
            case 'MG':
                if (amb == '1')
                    return 'http://nfce.fazenda.mg.gov.br/portalnfce';
                else 
                    return 'http://hnfce.fazenda.mg.gov.br/portalnfce/sistema/consultaarg.xhtml';
            case 'PB':
                if (amb == '1')
                    return 'www.receita.pb.gov.br/nfce/consulta';
                else 
                    return 'www.receita.pb.gov.br/nfcehom';
            case 'SP':
                if (amb == '1')
                    return 'https://www.nfce.fazenda.sp.gov.br/consulta';
                else 
                    return 'https://www.homologacao.nfce.fazenda.sp.gov.br/consulta';
            case 'SE':
                if (amb == '1')
                    return 'http://www.nfce.se.gov.br/nfce/consulta';
                else 
                    return 'http://www.hom.nfe.se.gov.br/nfce/consulta';
            default:
                throw new Error('URL do QRCode não encontrada pelo UF ('+uf+') informado.');
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
            soap.urlQRCode = this.getUrlQRCodeByUF(uf, amb); 
        }

        soap.method = servicos[servico].method;
        soap.action = servicos[servico].action;

        return soap;
    }

}



