import { Empresa, DocumentoFiscal } from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';

import * as Utils from '../utils/utils';

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
    processarDocumento(documento: DocumentoFiscal): Evento | null {
        let xml = this.gerarXmlNfce(documento);
        let xmlAssinado = '';
        return '';
    }

    gerarXmlNfce(documento: DocumentoFiscal) {
        let NFe = <schema.TNFe> {
                infNFe: this.getInfNfe(documento)
            };

        return new XmlHelper().serializeXml(NFe, 'NFe');
    }

    getInfNfe(documento: DocumentoFiscal) {
        return <schema.TNFeInfNFe> {
            $: { versao: '4.00' },
            id: '',
            ide: this.getIde(documento),
            emit: this.getEmit(this.empresa),
            dest: this.getDest(),
            det: this.getDet(),
            total: this.getTotal(),
            transp: this.getTransp(),
            pag: this.getPag(),
            infAdic: this.getInfoAdic(),
        }
    }

    getIde(documento: DocumentoFiscal) {
        return <schema.TNFeInfNFeIde>{
            cDV: documento.codDigitoVerificador,
            cMunFG: documento.codIbgeFatoGerador,
            cNF: documento.codNotaFiscal,
            cUF: Utils.getEnumByValue(schema.TCodUfIBGE, documento.codIbgeEmitente),
            dhEmi: documento.dhEmissao,
            dhSaiEnt: documento.dhSaiEnt,
            mod: Utils.getEnumByValue(schema.TMod, documento.modelo),
            nNF: documento.numeroNota,
            natOp: documento.naturezaOperacao,
            serie: documento.serie,
            tpAmb: Utils.getEnumByValue(schema.TAmb, documento.ambiente),
            procEmi: Utils.getEnumByValue(schema.TProcEmi.Item0, documento.processoEmissao),
            finNFe: Utils.getEnumByValue(schema.TFinNFe, documento.finalidadeEmissao),
            idDest: Utils.getEnumByValue(schema.TNFeInfNFeIdeIdDest, documento.identificadorDestinoOperacao),
            indFinal: Utils.getEnumByValue(schema.TNFeInfNFeIdeIndFinal, documento.indConsumidorFinal),
            indPres: Utils.getEnumByValue(schema.TNFeInfNFeIdeIndPres, documento.indPresenca),
            tpEmis: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpEmis, documento.tipoEmissao),
            tpImp: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpImp, documento.tipoImpressao),
            tpNF: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpNF, documento.tipoDocumentoFiscal),
            verProc: documento.versaoAplicativoEmissao,
            //contingencia
            dhCont: documento.dhContingencia,
            xJust: documento.justificativaContingencia,
            //nFref: schema.TNFeInfNFeIdeNFref[],
        }
    }

    getEmit(empresa: any) {
        return <schema.TNFeInfNFeEmit>{
            item: empresa.cnpj,
            itemElementName: schema.ItemChoiceType2.CNPJ,
            xNome: empresa.razaoSocial,
            xFant: empresa.nomeFantasia,
            ie: empresa.inscricaoEstadual,
            cNAE: empresa.CNAE,
            cRT: empresa.codRegimeTributario,
            im: empresa.inscricaoMunicipal,
            iEST: empresa.inscricaoEstadualST,
            enderEmit: this.getEnderEmit(empresa.endereco)
        }
    }

    getEnderEmit(endereco: any){
        return <schema.TEnderEmi>{
            xLgr: endereco.logradouro,
            nro: endereco.numero,
            xCpl: endereco.complemento,
            xBairro: endereco.bairro,
            xMun: endereco.municipio,
            cMun: endereco.codMunicipio,
            cPais: schema.TEnderEmiCPais.Item1058,
            cPaisSpecified: true,
            cEP: endereco.cep,
            uf: schema.TUfEmi.RS, //TODO: endereco.uf,
            fone: endereco.telefone,
            xPais: schema.TEnderEmiXPais.BRASIL,
            xPaisSpecified: true
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

}