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

    constructor(private empresa: Empresa) {

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
            ide: this.getIde({}),
            emit: this.getEmit(),
            dest: this.getDest(),
            det: this.getDet(),
            total: this.getTotal(),
            transp: this.getTransp(),
            pag: this.getPag(),
            infAdic: this.getInfoAdic()
        }
    }

    getIde(ideObj: any) {
        return <schema.TNFeInfNFeIde>{
            cDV: '',
            cMunFG: '',
            cNF: '',
            cUF: schema.TCodUfIBGE.Item11,
            dhCont: '',
            dhEmi: '',
            dhSaiEnt: '',
            finNFe: schema.TFinNFe.Item1,
            idDest: schema.TNFeInfNFeIdeIdDest.Item1,
            indFinal: schema.TNFeInfNFeIdeIndFinal.Item0,
            indPres: schema.TNFeInfNFeIdeIndPres.Item0,
            mod: schema.TMod.Item65,
            //nFref: schema.TNFeInfNFeIdeNFref[],
            nNF: '',
            natOp: '',
            procEmi: schema.TProcEmi.Item0,
            serie: '',
            tpAmb: schema.TAmb.HML,
            tpEmis: schema.TNFeInfNFeIdeTpEmis.Item1,
            tpImp: schema.TNFeInfNFeIdeTpImp.Item1,
            tpNF: schema.TNFeInfNFeIdeTpNF.Item1,
            verProc: '',
            xJust: '',
        }
    }

    getEmit() {
        return <schema.TNFeInfNFeEmit>{
            cNAE: this.empresa.CNAE,
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

    getTotal() {
        return <schema.TNFeInfNFeTotal>{
            
        }
    }

    getTransp() {
        return <schema.TNFeInfNFeTransp>{
            
        }
    }

    getPag() {
        return <schema.TNFeInfNFePag>{
            
        }
    }

    getInfoAdic() {
        return <schema.TNFeInfNFeInfAdic>{
            
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