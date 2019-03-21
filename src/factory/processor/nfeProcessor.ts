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

        chave.push(docFiscal.codIbgeEmitente);
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

    gerarQRCodeNFCe(urlSefaz: string, chave: string, versaoQRCode: string, ambiente: string, csc: string) {
        //urls qrcode: http://nfce.encat.org/consulte-sua-nota-qr-code-versao-2-0/

        // http://<dominio>/nfce/qrcode?p=<chave_acesso>|<versao_qrcode>|<tipo_ambiente>|<identificador_csc>|<codigo_hash>
    }

    gerarNFe(documento: NFeDocumento) {
        return <schema.TNFeInfNFe> {

        };
    }

    gerarNFCe(documento: NFCeDocumento, dadosChave: any) {
        return <schema.TNFeInfNFe> {
            $: { versao: '4.00', id: 'NFe' + dadosChave.chave },
            ide: this.getIde(documento.docFiscal, dadosChave),
            emit: this.getEmit(this.empresa),
            dest: this.getDest(documento.destinatario),
            det: this.getDet(documento.produtos),
            total: this.getTotal(),
            transp: this.getTransp(documento.transporte),
            pag: this.getPag(documento.pagamento),
            infAdic: this.getInfoAdic(documento.infoAdicional),
        }
    }

    getIde(documento: DocumentoFiscal, dadosChave: any) {
        return <schema.TNFeInfNFeIde>{
            cDV: dadosChave.dv,
            cMunFG: documento.codIbgeFatoGerador,
            cNF: dadosChave.cnf,
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
        if (destinatario) {
            return <schema.TNFeInfNFeDest>{
                indIEDest: destinatario.indicadorIEDestinario
            }
        }
    }

    getDet(produtos: Produto[]) {
        let det_list = [];
        for (const produto of produtos) {
            det_list.push(<schema.TNFeInfNFeDet>{
                prod: this.getDetProd(produto.prod),
                imposto: this.getDetImposto(produto.imposto),
                infAdProd: produto.infoAdicional,
                nItem: produto.numeroItem
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

    getDetImposto(imposto: Imposto) {
        let test = <schema.TNFeInfNFeDetImposto>{
            vTotTrib: '0.00',
            items: [this.getImpostoIcms(imposto.icms)]

        };

        return test;
    }

    getImpostoIcms(icms: Icms) {
        // case icms.cst ...
        return <schema.TNFeInfNFeDetImpostoICMSICMS60> {
            cST: icms.cst,
            orig: icms.origem,

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
            vTroco: pagamento.valorTroco,
            detPag: this.getDetalhamentoPagamentos(pagamento.pagamentos)
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
            infAdFisco: info.infoFisco
        }
    }

}