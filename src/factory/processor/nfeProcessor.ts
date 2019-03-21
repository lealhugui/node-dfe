import { Empresa, Endereco, NFCeDocumento, NFeDocumento, DocumentoFiscal, Destinatario, Transporte, Pagamento, Produto, Total, InfoAdicional, DetalhesProduto} from '../interface/nfe'
import { Evento } from '../interface/evento';

import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';

import * as Utils from '../utils/utils';
import {TNFeInfNFeDetProd} from "../schema";

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
    processarDocumento(documento: NFeDocumento | NFCeDocumento): Evento | null {
        let xml = this.gerarXml(documento);
        console.log(xml);
        let xmlAssinado = '';
        return '';
    }

    gerarXml(documento: NFeDocumento | NFCeDocumento) {
        let NFe = <schema.TNFe> {
                infNFe: this.gerarNFCe(documento)
            };

        return new XmlHelper().serializeXml(NFe, 'NFe');
    }

    gerarNFe(documento: NFeDocumento) {
        return <schema.TNFeInfNFe> {

        };
    }

    gerarNFCe(documento: NFCeDocumento) {
        return <schema.TNFeInfNFe> {
            $: { versao: '4.00' },
            id: '',
            ide: this.getIde(documento.docFiscal),
            emit: this.getEmit(this.empresa),
            dest: this.getDest(documento.destinatario),
            det: this.getDet(documento.produtos),
            total: this.getTotal(),
            transp: this.getTransp(documento.transporte),
            pag: this.getPag(),
            infAdic: this.getInfoAdic(documento.infoAdicional),
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
            procEmi: Utils.getEnumByValue(schema.TProcEmi, documento.processoEmissao),
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

    getEmit(empresa: Empresa) {
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

    getEnderEmit(endereco: Endereco){
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

    getDest(destinatario: Destinatario) {
        return <schema.TNFeInfNFeDest>{
            indIEDest: destinatario.indicadorIEDestinario
        }
    }

    getDet(produtos: Produto[]) {
        let det_list = [];
        for (const produto of produtos) {
            det_list.push(<schema.TNFeInfNFeDet>{
                prod: this.getDetProd(produto.prod),
            });
        }

        return det_list;
    }

    getDetProd(produto: DetalhesProduto) {
        return <schema.TNFeInfNFeDetProd>{
            cProd: produto.codigo,
            xProd: produto.descricao,
            cEST: produto.cest,
            cEAN: produto.cEAN,
            cFOP: produto.CFOP,
            nCM: produto.NCM,
            cBenef: produto.cBenef,
            cNPJFab: produto.cNPJFab,
            qCom: produto.quantidadeComercial,
            uCom: produto.unidadeComercial,
            vUnCom: produto.valorUnitarioComercial,
            qTrib: produto.quantidadeTributavel,
            vUnTrib: produto.valorUnitarioTributavel,
            uTrib: produto.unidadeTributavel,
            vProd: produto.valorTotal,
            indTot: produto.indicadorTotal,
            vDesc: produto.valorDesc,
            vFrete: produto.valorFrete,
            vOutro: produto.valorOutro,
            vSeg: produto.valorSeg,
            xPed: produto.numeroPedido,
            nItemPed: produto.numeroItemPedido,
            cEANTrib: produto.cEANTrib,
            eXTIPI: produto.eXTIPI
            //..
        }
    }

    getDetImposto(imposto: any) {

    }

    getTotal() {
        return <schema.TNFeInfNFeTotal>{
            
        }
    }

    getTransp(transp: Transporte) {
        return <schema.TNFeInfNFeTransp>{
            
        }
    }

    getPag() {
        return <schema.TNFeInfNFePag>{
            
        }
    }

    getInfoAdic(info: InfoAdicional) {
        return <schema.TNFeInfNFeInfAdic>{
            infCpl: info.infoComplementar,
            infAdFisco: info.infoFisco
        }
    }

}