import { Empresa, Endereco, NFCeDocumento, NFeDocumento, DocumentoFiscal, Destinatario, Transporte, Pagamento, Produto, Total, 
    InfoAdicional, DetalhesProduto, Imposto, Icms, Cofins, Pis, IcmsTot, IssqnTot, DetalhePagamento, DetalhePgtoCartao
} from '../interface/nfe';

import { WebServiceHelper } from "../webservices/webserviceHelper";
import { Evento } from '../interface/evento';
import * as schema from '../schema/index'
import { XmlHelper } from '../xmlHelper';
import * as Utils from '../utils/utils';
import { Signature } from '../signature';
const sha1 = require('sha1');


const soapEnvio = {
    //TODO: buscar URL conforme UF e Ambiente
    url: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx?wsdl',
    method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4',
    action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4/nfeAutorizacaoLote',
    urlQRCode: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=',
    urlConsultaNFCe: 'http://www.sefaz.rs.gov.br/nfce/consulta'
};

const soapConsulta = {
    //TODO: buscar URL conforme UF e Ambiente
    url: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx?wsdl',
    method: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeRetAutorizacao4',
    action: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeRetAutorizacao4/nfeRetAutorizacaoLote'
};

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
    async processarDocumento(documento: NFeDocumento | NFCeDocumento) {

        let xml = this.gerarXml(documento);
        xml = xml.replace('>]]>', ']]>').replace('<![CDATA[<', '<![CDATA[')
        console.log('XML ANTES DE ASSINAR\n\n' + xml + '\n\n');

        let xmlAssinado = Signature.signXmlX509(xml, 'infNFe', this.empresa.certificado);
        //console.log(xmlAssinado);

        let xmlLote = this.gerarXmlLote(xmlAssinado);
        console.log('\n' + xmlLote + '\n');

        let retornoEnvio = await this.enviarNF(xmlLote, this.empresa.certificado);
        console.log('\n' + retornoEnvio);

        //TODO: buscar recibo e consultar ..
        //let xmlConRecNFe = this.gerarXmlConsultaProc(documento.docFiscal.ambiente, '');
        //let retornoConsulta = await this.consultarProc(xmlConRecNFe, this.empresa.certificado);
        
        return '';
    }

    async consultarProc(xml:string, cert: any) {
        return await WebServiceHelper.makeSoapRequest(xml, cert, soapConsulta);
    }

    async enviarNF(xml: string, cert: any) {
        return await WebServiceHelper.makeSoapRequest(xml, cert, soapEnvio);
    }

    gerarXmlConsultaProc(ambiente: string, recibo: string){
        let consulta = <schema.TConsReciNFe> {
            $: {versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe'},
            tpAmb: ambiente,
            nRec: recibo
        }
        return XmlHelper.serializeXml(consulta, 'consReciNFe');
    }

    gerarXmlLote(xml: string){
        //TODO: ajustar para receber uma lista de xmls...

        let loteId = Utils.randomInt(1,999999999999999).toString();

        let enviNFe = <schema.TEnviNFe>{
            $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe'},
            idLote: loteId,
            indSinc: schema.TEnviNFeIndSinc.Item0,
            _: '[XMLS]'
        };

        let xmlLote = XmlHelper.serializeXml(enviNFe, 'enviNFe');
        return xmlLote.replace('[XMLS]', xml);
    }

    gerarXml(documento: NFeDocumento | NFCeDocumento) {
        let dadosChave = this.gerarChaveNF(this.empresa, documento.docFiscal);
        let NFe = <schema.TNFe> {
            $: {
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            infNFe: this.gerarNFCe(documento, dadosChave)
        };
 
        if (documento.docFiscal.modelo == '65') {
            let qrCode = this.gerarQRCodeNFCeOnline(soapEnvio.urlQRCode, dadosChave.chave, '2', documento.docFiscal.ambiente, this.empresa.idCSC, this.empresa.CSC);
            NFe.infNFeSupl = <schema.TNFeInfNFeSupl>{
                qrCode: '<' + qrCode + '>',
                urlChave: soapEnvio.urlConsultaNFCe
            };
        }    

        return XmlHelper.serializeXml(NFe, 'NFe');
    }

    gerarChaveNF(empresa: Empresa, docFiscal: DocumentoFiscal){
        let chave = '';

        //TODO: ajustar para receber dhEmissao e formatar em ano/mes
        let dataEmissao = new Date();
        let ano = dataEmissao.getFullYear().toString().substring(2,4);
        let mes = dataEmissao.getMonth() + 1;

        chave += (docFiscal.codUF.padStart(2,'0'));
        chave += (ano + (mes.toString().length == 1 ? '0' + mes : mes));
        chave += (empresa.cnpj.padStart(14,'0'));
        chave += (docFiscal.modelo.padStart(2,'0'));
        chave += (docFiscal.serie.padStart(3,'0'));
        chave += (docFiscal.numeroNota.toString().padStart(9, '0'));
        chave += (docFiscal.tipoEmissao);

        let cnf = (Utils.randomInt(10000000, 99999999)).toString();
        chave += cnf;

        let digitoVerificador = this.obterDigitoVerificador(chave);
        chave += digitoVerificador;

        return {
            chave: chave,
            cnf: cnf,
            dv: digitoVerificador
        };
    }

    obterDigitoVerificador(chave: any) {
        let soma = 0;
        let mod = -1;
        let dv = -1;
        let peso = 2;

        let chaveArr = chave.split('');

        for (let i = chaveArr.length - 1; i !== -1; i--)
        {
            let ch = Number(chaveArr[i].toString());
  
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
        let hash = sha1(concat + CSC).toUpperCase();
        
        return urlConsultaNFCe + concat + s + hash;
    }

    gerarQRCodeNFCeOffline(urlConsultaNFCe: string, chave: string, versaoQRCode: string, ambiente: string, diaEmissao: string, valorTotal:string, digestValue: string, idCSC: string, CSC: string) {
        let s = '|';
        let concat = [chave, versaoQRCode, ambiente, diaEmissao, valorTotal, digestValue, idCSC].join(s);
        let hash = sha1(concat + CSC).toUpperCase();

        return urlConsultaNFCe + concat + s + hash;
    }

    gerarNFe(documento: NFeDocumento) {
        return <schema.TNFeInfNFe> {

        };
    }

    gerarNFCe(documento: NFCeDocumento, dadosChave: any) {
        let nfce = <schema.TNFeInfNFe> {
            $: { versao: '4.00', Id: 'NFe' + dadosChave.chave }
        };

        nfce.ide = this.getIde(documento.docFiscal, dadosChave);
        nfce.emit = this.getEmit(this.empresa);

        if (documento.destinatario)
            nfce.dest = this.getDest(documento.destinatario, documento.docFiscal.ambiente);
        
        nfce.det = this.getDet(documento.produtos, documento.docFiscal.ambiente);
        nfce.total = this.getTotal(documento.total);
        nfce.transp = this.getTransp(documento.transporte);
        nfce.pag = this.getPag(documento.pagamento);
        nfce.infAdic = this.getInfoAdic(documento.infoAdicional);
        
        return nfce;
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
            //IM: empresa.inscricaoMunicipal,
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

    getDest(destinatario: Destinatario, ambiente: string) {
        return <schema.TNFeInfNFeDest>{
            CPF: destinatario.documento,
            xNome: ambiente == '2' ? 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' : destinatario.nome,
            indIEDest: destinatario.indicadorIEDestinario
        }
    }

    getDet(produtos: Produto[], ambiente: string) {
        let det_list = [];

        for (let i = 0; i < produtos.length; i++){
            det_list.push(<schema.TNFeInfNFeDet>{
                $: {nItem: produtos[i].numeroItem},
                prod: this.getDetProd(produtos[i].prod, ambiente, i == 0),
                imposto: this.getDetImposto(produtos[i].imposto),
                //infAdProd: produto.infoAdicional
            });
        }

        return det_list;
    }

    getDetProd(produto: DetalhesProduto, ambiente: string, isPrimeiroProduto: boolean) {
        return <schema.TNFeInfNFeDetProd>{
            cProd: produto.codigo,
            cEAN: produto.cEAN,
            xProd: (ambiente == '2' && isPrimeiroProduto) ? 'NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' : produto.descricao,
            NCM: produto.NCM,
            CEST: produto.cest,
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
            //xPed: produto.numeroPedido,
            //nItemPed: produto.numeroItemPedido,
            //vDesc: produto.valorDesc,
            //vFrete: produto.valorFrete,
            //vOutro: produto.valorOutro,
            //vSeg: produto.valorSeg,
            //cBenef: produto.cBenef,
            //cNPJFab: produto.cNPJFab,
            //eXTIPI: produto.eXTIPI,
            //
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

    getTotal(total: Total) {
        return <schema.TNFeInfNFeTotal>{
            ICMSTot: total.icmsTot
        }
    }

    getIcmsTot(icmsTot: IcmsTot) {
        return icmsTot;
        
    }

    getTransp(transp: Transporte) {
        return <schema.TNFeInfNFeTransp>{
            modFrete: transp.modalidateFrete
        }
    }

    getPag(pagamento: Pagamento) {
        let pag = <schema.TNFeInfNFePag>{};
        pag.detPag = this.getDetalhamentoPagamentos(pagamento.pagamentos);
        if (pagamento.valorTroco)
            pag.vTroco = pagamento.valorTroco;

        return pag;
    }

    getDetalhamentoPagamentos(pagamentos: DetalhePagamento[]){
        let listPagamentos = [];
        let detPag;

        for (const pag of pagamentos) {
            detPag = <schema.TNFeInfNFePagDetPag>{};

            if (pag.indicadorFormaPagamento)
                detPag.indPag = Utils.getEnumByValue(schema.TNFeInfNFePagDetPagIndPag, pag.indicadorFormaPagamento);

            detPag.tPag = Utils.getEnumByValue(schema.TNFeInfNFePagDetPagTPag, pag.formaPagamento);
            detPag.vPag = pag.valor;
            
            if (pag.dadosCartao) {
                detPag.card = this.getDetalhamentoCartao(pag.dadosCartao);
            }
            listPagamentos.push(detPag);
        }

        return listPagamentos;
    }

    getDetalhamentoCartao(dadosCartao: DetalhePgtoCartao) {
        return <schema.TNFeInfNFePagDetPagCard>{

        }
    }

    getInfoAdic(info: InfoAdicional) {
        return <schema.TNFeInfNFeInfAdic>{
            infCpl: info.infoComplementar,
            //infAdFisco: info.infoFisco
        }
    }

}