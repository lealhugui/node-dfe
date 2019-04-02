import { ServicosSefaz } from '../interface/nfe';

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
                url_producao: '',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4.asmx?wsdl',
                url_qrcode_producao: 'www.sefaz.am.gov.br/nfce/consulta',
                url_qrcode_homologacao: 'www.sefaz.am.gov.br/nfce/consulta'
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeRetAutorizacao4.asmx?wsdl'
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: 'https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4.asmx?wsdl'
            }
        }
    }, 
    'CE': {
        nome: 'Ceará',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'GO': {
        nome: 'Goiás',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'MT': {
        nome: 'Mato Grosso',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'MS': {
        nome: 'Mato Grosso do Sul',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'MG': {
        nome: 'Minas Gerais',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'PR': {
        nome: 'Paraná',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    }, 
    'RS': {
        nome: 'Rio Grande do Sul',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx?wsdl',
                url_qrcode_producao: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=',
                url_qrcode_homologacao: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p='
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx?wsdl'
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl'
            }
        }
    }, 
    'SVRS': {
        nome: 'SEFAZ Virtual – SVRS',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
            }
        }
    },
    'SP': {
        nome: 'São Paulo',
        servicos: {
            autorizacao: {
                url_producao: '',
                url_homologacao: '',
                url_qrcode_producao: '',
                url_qrcode_homologacao: ''
            },
            retAutorizacao: {
                url_producao: '',
                url_homologacao: ''
            },
            consultarStatusServico: {
                url_producao: '',
                url_homologacao: ''
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
            case 'EF':
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

    public static getSoapInfo(uf: string, amb: string, servico: ServicosSefaz) {
        let soap: any = {};
        let autorizador = this.getAutorizadorByUF(uf);

        if (amb == '1')
            soap.url = autorizador.servicos[servico].url_producao
        else
            soap.url = autorizador.servicos[servico].url_homologacao

        if (servico == ServicosSefaz.autorizacao) {
            if (amb == '1')
                soap.urlQRCode = autorizador.servicos[servico].url_qrcode_producao
            else
                soap.urlQRCode = autorizador.servicos[servico].url_qrcode_homologacao
        }

        soap.method = servicos[servico].method;
        soap.action = servicos[servico].action;

        return soap;
    }

}



