"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SefazNFe = void 0;
const functions_1 = require("./functions");
const Utils = require("../utils/utils");
const servicos = require('../../../servicos.json');
const autorizadores = require('../../../autorizadoresNFe.json');
class SefazNFe {
    static getAutorizadorContingenciaByUF(uf) {
        switch (uf) {
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'MG':
            case 'PB':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'RS':
            case 'SC':
            case 'SE':
            case 'SP':
            case 'TO':
                return autorizadores["SVC-AN"];
            case 'AM':
            case 'BA':
            case 'CE':
            case 'GO':
            case 'MA':
            case 'MS':
            case 'MT':
            case 'PA':
            case 'PE':
            case 'PI':
            case 'PR':
                return autorizadores["SVC-RS"];
            default:
                throw new Error('Autorizador de Contingência não encontrado!');
        }
    }
    static getAutorizadorByUF(uf) {
        switch (uf) {
            case 'AM':
                return autorizadores.AM;
            case 'BA':
                return autorizadores.BA;
            case 'CE':
                return autorizadores.CE;
            case 'GO':
                return autorizadores.GO;
            case 'MG':
                return autorizadores.MG;
            case 'MS':
                return autorizadores.MS;
            case 'MT':
                return autorizadores.MT;
            case 'PE':
                return autorizadores.PE;
            case 'PR':
                return autorizadores.PR;
            case 'RS':
                return autorizadores.RS;
            case 'SP':
                return autorizadores.SP;
            case 'MA':
            case 'PA':
                return autorizadores.SVAN;
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'PB':
            case 'PI':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'SC':
            case 'SE':
            case 'TO':
                return autorizadores.SVRS;
            default:
                throw new Error('Autorizador não encontrado!');
        }
    }
    static getSoapInfo(uf, amb, servico, isContingencia) {
        let soap = {};
        let autorizador = isContingencia ? this.getAutorizadorContingenciaByUF(uf) : this.getAutorizadorByUF(uf);
        if (amb == '1')
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_producao);
        else
            soap.url = Utils.validaUrlWsdl(autorizador.servicos[servico].url_homologacao);
        soap.contentType = (0, functions_1.getContentType)(uf);
        soap.method = servicos[servico].method;
        soap.action = servicos[servico].action;
        return soap;
    }
}
exports.SefazNFe = SefazNFe;
