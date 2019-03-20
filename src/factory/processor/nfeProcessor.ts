import { Empresa, NFCeDocumento, NFeDocumento } from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';
import * as util from "util";
const fs = require('fs');
const axios = require("axios");
const https = require("https");
/**
 * Classe para processamento de NFe/NFCe
 */
export class NFeProcessor {

    constructor(private empresa?: Empresa) {

    }

    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */
    processarDocumento(documento: NFeDocumento[] | NFCeDocumento | null): Evento | null {
        return '';
    }

    gerarXmlNfe(dados: any) {
        let NFe = <schema.TNFe> {
                infNFe: this.getInfNfe()
            };

        return new XmlHelper().serializeXml(NFe, 'NFe');
    }

    getInfNfe() {
        return <schema.TNFeInfNFe> {
            id: '',
            ide: this.getIde(),
            emit: this.getEmit(),
            infAdic: this.getInfoAdic(),
            dest: this.getDest(),
            det: this.getDet()
        }
    }

    getIde() {
        return <schema.TNFeInfNFeIde>{

        }
    }

    getEmit() {
        return <schema.TNFeInfNFeEmit>{
            
        }
    }

    getInfoAdic() {
        return <schema.TNFeInfNFeInfAdic>{
            
        }
    }

    getDest() {
        return <schema.TNFeInfNFeDest>{
            
        }
    }

    getDet() {
        return <schema.TNFeInfNFeDet[]>{
            
        }
    }

    gerarXmlStatusServico(versao: string, ambiente: number, uf: string) {
        let status = <schema.TConsStatServ>{
            $: {
                versao: versao,
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            tpAmb: ambiente == 1 ? schema.TAmb.PRD : schema.TAmb.HML,
            cUF: schema.TCodUfIBGE.Item43, // RS -> todo: get enum by uf
            xServ: schema.TConsStatServXServ.STATUS
        };

        return new XmlHelper().serializeXml(status, 'consStatServ');
    }

}