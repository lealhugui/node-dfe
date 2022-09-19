"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SefazNFCe = void 0;
const nfe_1 = require("../interface/nfe");
const functions_1 = require("./functions");
const Utils = require("../utils/utils");
const servicos = require('../../../servicos.json');
const autorizadores = require('../../../autorizadores.json');
class SefazNFCe {
    static getAutorizadorByUF(uf) {
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
    static getInfoQRCodeByUF(uf, amb) {
        if (amb == '1') {
            switch (uf) {
                case 'AC':
                    return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaznet.ac.gov.br/nfce/qrcode' };
                case 'AL':
                    return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp' };
                case 'AP':
                    return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.ap.gov.br/nfce/nfcep.php' };
                case 'AM':
                    return { urlChave: 'www.sefaz.am.gov.br/nfce/consulta', urlQRCode: 'http://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp' };
                case 'BA':
                    return { urlChave: 'www.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx' };
                case 'CE':
                    return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html' };
                case 'DF':
                    return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx' };
                case 'ES':
                    return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://app.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx' };
                case 'GO':
                    return { urlChave: 'www.sefaz.go.gov.br/nfce/consulta', urlQRCode: 'http://nfe.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe' };
                case 'MA':
                    return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp' };
                case 'MG':
                    return { urlChave: 'http://nfce.fazenda.mg.gov.br/portalnfce', urlQRCode: 'https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml' };
                case 'MS':
                    return { urlChave: 'http://www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
                case 'MT':
                    return { urlChave: 'http://www.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://www.sefaz.mt.gov.br/nfce/consultanfce' };
                case 'PA':
                    return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/nfceForm.seam' };
                case 'PB':
                    return { urlChave: 'www.receita.pb.gov.br/nfce/consulta', urlQRCode: 'http://www.receita.pb.gov.br/nfce' };
                case 'PE':
                    return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.pe.gov.br/nfce-web/consultarNFCe' };
                case 'PI':
                    return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
                case 'PR':
                    return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode/' };
                case 'RJ':
                    return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode' };
                case 'RN':
                    return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://nfce.set.rn.gov.br/consultarNFCe.aspx' };
                case 'RO':
                    return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp' };
                case 'RS':
                    return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx' };
                case 'RR':
                    return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rr.gov.br/nfce/servlet/qrcode' };
                case 'SE':
                    return { urlChave: 'http://www.nfce.se.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.se.gov.br/portal/consultarNFCe.jsp' };
                case 'SP':
                    return { urlChave: 'https://www.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'https://www.nfce.fazenda.sp.gov.br/qrcode' };
                case 'TO':
                    return { urlChave: 'www.sefaz.to.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.to.gov.br/nfce/qrcode' };
                default:
                    throw new Error('URL do QRCode não encontrada pelo UF (' + uf + ') informado.');
            }
        }
        else {
            switch (uf) {
                case 'AC':
                    return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://hml.sefaznet.ac.gov.br/nfce/qrcode' };
                case 'AL':
                    return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp' };
                case 'AP':
                    return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.ap.gov.br/nfcehml/nfce.php' };
                case 'AM':
                    return { urlChave: 'https://sistemas.sefaz.am.gov.br/nfceweb-hom/formConsulta.do', urlQRCode: 'https://sistemas.sefaz.am.gov.br/nfceweb-hom/consultarNFCe.jsp' };
                case 'BA':
                    return { urlChave: 'http://hinternet.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://hnfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx' };
                case 'CE':
                    return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html' };
                case 'DF':
                    return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx' };
                case 'ES':
                    return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://homologacao.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx' };
                case 'GO':
                    return { urlChave: 'http://www.nfce.go.gov.br/post/ver/214413/consulta-nfc-e-homologacao', urlQRCode: 'http://homolog.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe' };
                case 'MA':
                    return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp' };
                case 'MG':
                    return { urlChave: 'http://hnfce.fazenda.mg.gov.br/portalnfce', urlQRCode: 'https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml' };
                case 'MS':
                    return { urlChave: 'http://www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
                case 'MT':
                    return { urlChave: 'http://homologacao.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://homologacao.sefaz.mt.gov.br/nfce/consultanfce' };
                case 'PA':
                    return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'https://appnfc.sefa.pa.gov.br/portal-homologacao/view/consultas/nfce/nfceForm.seam' };
                case 'PB':
                    return { urlChave: 'www.receita.pb.gov.br/nfcehom', urlQRCode: 'http://www.receita.pb.gov.br/nfcehom' };
                case 'PE':
                    return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfcehomolog.sefaz.pe.gov.br/nfce-web/consultarNFCe' };
                case 'PI':
                    return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
                case 'PR':
                    return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode/' };
                case 'RJ':
                    return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode' };
                case 'RN':
                    return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx' };
                case 'RO':
                    return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp' };
                case 'RS':
                    return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx' };
                case 'RR':
                    return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'http://200.174.88.103:8080/nfce/servlet/qrcode' };
                case 'SE':
                    return { urlChave: 'http://www.hom.nfe.se.gov.br/nfce/consulta', urlQRCode: 'http://www.hom.nfe.se.gov.br/portal/consultarNFCe.jsp' };
                case 'SP':
                    return { urlChave: 'https://www.homologacao.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode' };
                case 'TO':
                    return { urlChave: 'http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf', urlQRCode: 'http://homologacao.sefaz.to.gov.br/nfce/qrcode' };
                default:
                    throw new Error('URL do QRCode não encontrada pelo UF (' + uf + ') informado.');
            }
        }
    }
    static getSoapInfo(uf, amb, servico) {
        let soap = {};
        let autorizador = this.getAutorizadorByUF(uf);
        if (amb == '1')
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_producao);
        else
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_homologacao);
        if (servico == nfe_1.ServicosSefaz.autorizacao) {
            let infoQRCode = this.getInfoQRCodeByUF(uf, amb);
            soap.urlQRCode = infoQRCode.urlQRCode;
            soap.urlChave = infoQRCode.urlChave;
        }
        soap.contentType = (0, functions_1.getContentType)(uf);
        soap.method = servicos[servico].method;
        soap.action = servicos[servico].action;
        return soap;
    }
}
exports.SefazNFCe = SefazNFCe;
