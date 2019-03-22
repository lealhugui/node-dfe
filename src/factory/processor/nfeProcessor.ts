import {
    Empresa,
    Endereco,
    NFCeDocumento,
    NFeDocumento,
    DocumentoFiscal,
    Destinatario,
    Transporte,
    Pagamento,
    Produto,
    Total,
    InfoAdicional,
    DetalhesProduto,
    Imposto,
    Icms,
    Cofins,
    Pis,
    IcmsTot,
    IssqnTot,
    DetalhePagamento, DetalhePgtoCartao
} from '../interface/nfe';

import { Evento } from '../interface/evento';
import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';
import * as Utils from '../utils/utils';
const sha1 = require('sha1');

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
        let dadosChave = this.gerarChaveNF(this.empresa, documento.docFiscal);
        let NFe = <schema.TNFe> {
                $: {
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                infNFe: this.gerarNFCe(documento, dadosChave)
            };

        return new XmlHelper().serializeXml(NFe, 'NFe');
    }

    gerarChaveNF(empresa: Empresa, docFiscal: DocumentoFiscal){
        let chave = [];

        //TODO: ajustar para receber dhEmissao e formatar em ano/mes
        let dataEmissao = new Date();
        let ano = dataEmissao.getFullYear().toString().substring(2,4);
        let mes = dataEmissao.getMonth() + 1;

        chave.push(docFiscal.codUF);
        chave.push(ano + (mes.toString().length == 1 ? '0' + mes : mes));
        chave.push(empresa.cnpj);
        chave.push(docFiscal.modelo);
        chave.push(docFiscal.serie.padStart(3,'0'));
        chave.push(docFiscal.numeroNota.toString().padStart(9, '0'));
        chave.push(docFiscal.tipoEmissao);

        let cnf = Math.floor(Math.random() * 100000000);
        let digitoVerificador = this.obterDigitoVerificador(chave);

        chave.push(cnf);
        chave.push(digitoVerificador);

        return {
            chave: chave.join(''),
            cnf: cnf,
            dv: digitoVerificador
        };
    }

    obterDigitoVerificador(chave: any) {
        let soma = 0;
        let mod = -1;
        let dv = -1;
        let peso = 2;

        for (let i = chave.length - 1; i !== -1; i--)
        {
            let ch = Number(chave[i].toString());
            soma += ch*peso;
            if (peso < 9)
                peso += 1;
            else
                peso = 2;
        }

        mod = soma%11;
        if (mod === 0 || mod === 1)
            dv = 0;
        else
            dv = 11 - mod;

        return dv.toString();
    }

    gerarQRCodeNFCeOnline(urlConsultaNFCe: string, chave: string, versaoQRCode: string, ambiente: string, idCSC: string, CSC: string) {
        let s = '|';
        let concat = [chave, versaoQRCode, ambiente, idCSC].join(s);
        let hash = sha1(concat + CSC);

        return urlConsultaNFCe + concat + s + hash;
    }

    gerarQRCodeNFCeOffline(urlConsultaNFCe: string, chave: string, versaoQRCode: string, ambiente: string, diaEmissao: string, valorTotal:string, digestValue: string, idCSC: string, CSC: string) {
        let s = '|';
        let concat = [chave, versaoQRCode, ambiente, diaEmissao, valorTotal, digestValue, idCSC].join(s);
        let hash = sha1(concat + CSC);

        return urlConsultaNFCe + concat + s + hash;
    }

    gerarNFe(documento: NFeDocumento) {
        return <schema.TNFeInfNFe> {

        };
    }

    gerarNFCe(documento: NFCeDocumento, dadosChave: any) {
        return <schema.TNFeInfNFe> {
            $: { versao: '4.00', Id: 'NFe' + dadosChave.chave },
            ide: this.getIde(documento.docFiscal, dadosChave),
            emit: this.getEmit(this.empresa),
            //dest: this.getDest(documento.destinatario), //ajustar self-closed
            det: this.getDet(documento.produtos),
            total: this.getTotal(),
            transp: this.getTransp(documento.transporte),
            pag: this.getPag(documento.pagamento),
            infAdic: this.getInfoAdic(documento.infoAdicional),
        }
    }

    getIde(documento: DocumentoFiscal, dadosChave: any) {
        return <schema.TNFeInfNFeIde>{
            cUF: Utils.getEnumByValue(schema.TCodUfIBGE, documento.codUF),
            cNF: dadosChave.cnf,
            natOp: documento.naturezaOperacao,
            mod: Utils.getEnumByValue(schema.TMod, documento.modelo),
            serie: documento.serie,
            nNF: documento.numeroNota,
            dhEmi: documento.dhEmissao,
            tpNF: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpNF, documento.tipoDocumentoFiscal),
            idDest: Utils.getEnumByValue(schema.TNFeInfNFeIdeIdDest, documento.identificadorDestinoOperacao),
            cMunFG: documento.codIbgeFatoGerador,
            tpImp: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpImp, documento.tipoImpressao),
            tpEmis: Utils.getEnumByValue(schema.TNFeInfNFeIdeTpEmis, documento.tipoEmissao),
            cDV: dadosChave.dv,
            tpAmb: Utils.getEnumByValue(schema.TAmb, documento.ambiente),
            finNFe: Utils.getEnumByValue(schema.TFinNFe, documento.finalidadeEmissao),
            indFinal: Utils.getEnumByValue(schema.TNFeInfNFeIdeIndFinal, documento.indConsumidorFinal),
            indPres: Utils.getEnumByValue(schema.TNFeInfNFeIdeIndPres, documento.indPresenca),
            procEmi: Utils.getEnumByValue(schema.TProcEmi, documento.processoEmissao),
            verProc: documento.versaoAplicativoEmissao,
            
            //dhSaiEnt: documento.dhSaiEnt,
            //dhCont: documento.dhContingencia,
            //xJust: documento.justificativaContingencia,
            //nFref: schema.TNFeInfNFeIdeNFref[],
        }
    }

    getEmit(empresa: Empresa) {
        return <schema.TNFeInfNFeEmit>{
            CNPJ: empresa.cnpj,
            //itemElementName: schema.ItemChoiceType2.CNPJ,
            xNome: empresa.razaoSocial,
            xFant: empresa.nomeFantasia,
            enderEmit: this.getEnderEmit(empresa.endereco),
            IE: empresa.inscricaoEstadual,
            IM: empresa.inscricaoMunicipal,
            CRT: empresa.codRegimeTributario,
            //iEST: empresa.inscricaoEstadualST,
            //CNAE: empresa.CNAE
        }
    }

    getEnderEmit(endereco: Endereco){
        return <schema.TEnderEmi>{
            xLgr: endereco.logradouro,
            nro: endereco.numero,
            //xCpl: endereco.complemento,
            xBairro: endereco.bairro,
            cMun: endereco.codMunicipio,
            xMun: endereco.municipio,
            UF: schema.TUfEmi.RS, //TODO: endereco.uf,
            CEP: endereco.cep,
            cPais: schema.TEnderEmiCPais.Item1058,
            //cPaisSpecified: true,
            xPais: schema.TEnderEmiXPais.BRASIL,
            //xPaisSpecified: true
            fone: endereco.telefone,
        }
    }

    getDest(destinatario: Destinatario) {
        if (destinatario) {
            return <schema.TNFeInfNFeDest>{
                indIEDest: destinatario.indicadorIEDestinario
            }
        } else {
            //TODO: remover self-closed tags do xml
            return null;
        }
    }

    getDet(produtos: Produto[]) {
        let det_list = [];
        for (const produto of produtos) {
            det_list.push(<schema.TNFeInfNFeDet>{
                $: {nItem: produto.numeroItem},
                prod: this.getDetProd(produto.prod),
                imposto: this.getDetImposto(produto.imposto),
                infAdProd: produto.infoAdicional
            });
        }

        return det_list;
    }

    getDetProd(produto: DetalhesProduto) {
        return <schema.TNFeInfNFeDetProd>{
            cProd: produto.codigo,
            cEAN: produto.cEAN,
            xProd: produto.descricao,
            NCM: produto.NCM,
            CFOP: produto.CFOP,
            uCom: produto.unidadeComercial,
            qCom: produto.quantidadeComercial,
            vUnCom: produto.valorUnitarioComercial,
            vProd: produto.valorTotal,
            cEANTrib: produto.cEANTrib,
            uTrib: produto.unidadeTributavel,
            qTrib: produto.quantidadeTributavel,
            vUnTrib: produto.valorUnitarioTributavel,
            indTot: produto.indicadorTotal,
            xPed: produto.numeroPedido,
            nItemPed: produto.numeroItemPedido,
            //vDesc: produto.valorDesc,
            //vFrete: produto.valorFrete,
            //vOutro: produto.valorOutro,
            //vSeg: produto.valorSeg,
            //cBenef: produto.cBenef,
            //cNPJFab: produto.cNPJFab,
            //eXTIPI: produto.eXTIPI,
            //CEST: produto.cest
            //..
        }
    }

    getDetImposto(imposto: Imposto) {
        let test = <schema.TNFeInfNFeDetImposto>{
            vTotTrib: '0.00',
            ICMS: [this.getImpostoIcms(imposto.icms)]

        };

        return test;
    }

    getImpostoIcms(icms: Icms) {
        // case icms.cst ...
        return { 
            ICMS60: <schema.TNFeInfNFeDetImpostoICMSICMS60> {
                orig: icms.origem,
                CST: icms.cst,
            }
        };
    }

    getTotal() {
        return <schema.TNFeInfNFeTotal>{

        }
    }

    getTransp(transp: Transporte) {
        return <schema.TNFeInfNFeTransp>{
            modFrete: transp.modalidateFrete
        }
    }

    getPag(pagamento: Pagamento) {
        return <schema.TNFeInfNFePag>{
            detPag: this.getDetalhamentoPagamentos(pagamento.pagamentos),
            vTroco: pagamento.valorTroco
        }
    }

    getDetalhamentoPagamentos(pagamentos: DetalhePagamento[]){
        let listPagamentos = [];
        for (const pag of pagamentos) {
            listPagamentos.push(<schema.TNFeInfNFePagDetPag>{
                indPag: pag.indicadorFormaPagamento,
                vPag: pag.valor,
                tPag: pag.formaPagamento,
                card: this.getDetalhamentoCartao(pag.dadosCartao)
            });
        }
        return listPagamentos;
    }

    getDetalhamentoCartao(dadosCartao: DetalhePgtoCartao) {
        if (dadosCartao) {
            return <schema.TNFeInfNFePagDetPagCard>{

            }
        }
    }

    getInfoAdic(info: InfoAdicional) {
        return <schema.TNFeInfNFeInfAdic>{
            infCpl: info.infoComplementar,
            //infAdFisco: info.infoFisco
        }
    }

}