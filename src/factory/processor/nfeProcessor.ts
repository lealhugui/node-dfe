import { Empresa, Endereco, NFCeDocumento, NFeDocumento, DocumentoFiscal, Destinatario, Transporte, Pagamento, Produto, Total, 
    InfoAdicional, DetalhesProduto, Imposto, Icms, Cofins, Pis, IcmsTot, IssqnTot, DetalhePagamento, DetalhePgtoCartao
} from '../interface/nfe';

import { WebServiceHelper } from "../webservices/webserviceHelper";
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

        let result = {
            success: false,
            error: '',
            envioNF: {},
            consultaProc: {}
        };

        try {
            let xml = this.gerarXml(documento);
            xml = xml.replace('>]]>', ']]>').replace('<![CDATA[<', '<![CDATA[')
            //console.log('XML ANTES DE ASSINAR\n\n' + xml + '\n\n');
    
            let xmlAssinado = Signature.signXmlX509(xml, 'infNFe', this.empresa.certificado);
            //console.log(xmlAssinado);
    
            let xmlLote = this.gerarXmlLote(xmlAssinado);
            //console.log('\n' + xmlLote + '\n');
    
            let retornoEnvio = await this.enviarNF(xmlLote, this.empresa.certificado);
            //console.log('\n' + Object(retornoEnvio));
            result.envioNF = retornoEnvio;
    
            let retEnviNFe = Object(retornoEnvio.data).retEnviNFe;
            if (retEnviNFe.cStat == '103') {
                let recibo = retEnviNFe.infRec.nRec;
                let xmlConRecNFe = this.gerarXmlConsultaProc(documento.docFiscal.ambiente, recibo);

                let retornoConsulta = null; 
                let retConsReciNFe = null;
                let cStat = '105';

                do {
                    retornoConsulta = await this.consultarProc(xmlConRecNFe, this.empresa.certificado);
                    retConsReciNFe = Object(retornoConsulta.data).retConsReciNFe;
                    cStat = retConsReciNFe.cStat;
                } while (cStat == '105'); // nota em processamento, realiza a consulta novamente até obter um status diferente.
    
                result.consultaProc = retornoConsulta;

                if (cStat == '104' && retConsReciNFe.protNFe.infProt.cStat == '100') {
                    result.success = true;
                }
                
            } else {
                result.success = false;
            }

        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
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
            infNFe: documento.docFiscal.modelo == '65' ? this.gerarNFCe(documento, dadosChave) : this.gerarNFe(documento, dadosChave)
        };
 
        if (documento.docFiscal.modelo == '65') {
            let qrCode = this.gerarQRCodeNFCeOnline(soapEnvio.urlQRCode, dadosChave.chave, '2', documento.docFiscal.ambiente, this.empresa.idCSC, this.empresa.CSC);
            NFe.infNFeSupl = <schema.TNFeInfNFeSupl>{
                qrCode: '<' + qrCode + '>',
                urlChave: soapEnvio.urlConsultaNFCe
            };
        }

        Utils.removeSelfClosedFields(NFe);

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

    gerarNFe(documento: NFeDocumento, dadosChave: any) {
        let nfe = <schema.TNFeInfNFe> {
            $: { versao: '4.00', Id: 'NFe' + dadosChave.chave }
        };
        
        return nfe;
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
            
            dhSaiEnt: documento.dhSaiEnt,
            dhCont: documento.dhContingencia,
            xJust: documento.justificativaContingencia,
            //nFref: schema.TNFeInfNFeIdeNFref[],
        }
    }

    getEmit(empresa: Empresa) {
        return <schema.TNFeInfNFeEmit>{
            CNPJ: empresa.cnpj,
            xNome: empresa.razaoSocial,
            xFant: empresa.nomeFantasia,
            enderEmit: this.getEnderEmit(empresa.endereco),
            IE: empresa.inscricaoEstadual,
            IM: empresa.inscricaoMunicipal,
            CRT: empresa.codRegimeTributario,
            iEST: empresa.inscricaoEstadualST,
            CNAE: empresa.CNAE
        }
    }

    getEnderEmit(endereco: Endereco){
        return <schema.TEnderEmi>{
            xLgr: endereco.logradouro,
            nro: endereco.numero,
            xCpl: endereco.complemento,
            xBairro: endereco.bairro,
            cMun: endereco.codMunicipio,
            xMun: endereco.municipio,
            UF: Utils.getEnumByValue(schema.TUfEmi, endereco.uf),
            CEP: endereco.cep,
            cPais: schema.TEnderEmiCPais.Item1058,
            xPais: schema.TEnderEmiXPais.BRASIL,
            fone: endereco.telefone,
        }
    }

    getEnderDest(endereco: Endereco){
        return <schema.TEndereco>{
            xLgr: endereco.logradouro,
            nro: endereco.numero,
            xCpl: endereco.complemento,
            xBairro: endereco.bairro,
            cMun: endereco.codMunicipio,
            xMun: endereco.municipio,
            UF: Utils.getEnumByValue(schema.TUf, endereco.uf),
            CEP: endereco.cep,
            cPais: endereco.codPais,
            xPais: endereco.pais,
            fone: endereco.telefone,
        }
    }

    getDest(destinatario: Destinatario, ambiente: string) {
        let dest = <schema.TNFeInfNFeDest>{};

        if (destinatario.isEstrangeiro)
            dest.idEstrangeiro = destinatario.documento;
        if (destinatario.documento.length == 14)
            dest.CNPJ = destinatario.documento;
        else
            dest.CPF = destinatario.documento;
        
        dest.xNome = ambiente == '2' ? 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' : destinatario.nome;

        if (destinatario.endereco)
            dest.enderDest = this.getEnderDest(destinatario.endereco);
        
        dest.indIEDest = Utils.getEnumByValue(schema.TNFeInfNFeDestIndIEDest, destinatario.indicadorIEDestinario);
        dest.IE = destinatario.inscricaoEstadual;
        dest.ISUF = destinatario.inscricaoSuframa;
        dest.IM = destinatario.inscricaoMunicipal;
        dest.email = destinatario.email;

        return dest;
    }

    getDet(produtos: Produto[], ambiente: string) {
        let det_list = [];

        for (let i = 0; i < produtos.length; i++){
            det_list.push(<schema.TNFeInfNFeDet>{
                $: {nItem: produtos[i].numeroItem},
                prod: this.getDetProd(produtos[i].prod, ambiente, i == 0),
                imposto: this.getDetImposto(produtos[i].imposto),
                infAdProd: produtos[i].infoAdicional
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
            //nVE: string[];
            CEST: produto.cest,
            //indEscala: TNFeInfNFeDetProdIndEscala;
            cNPJFab: produto.cNPJFab,
            cBenef: produto.cBenef,
            eXTIPI: produto.eXTIPI,
            CFOP: produto.CFOP,
            uCom: produto.unidadeComercial,
            qCom: produto.quantidadeComercial,
            vUnCom: produto.valorUnitarioComercial,
            vProd: produto.valorTotal,
            cEANTrib: produto.cEANTrib,
            uTrib: produto.unidadeTributavel,
            qTrib: produto.quantidadeTributavel,
            vUnTrib: produto.valorUnitarioTributavel,
            vFrete: produto.valorFrete,
            vSeg: produto.valorSeguro,
            vDesc: produto.valorDesconto,
            vOutro: produto.valorOutro,
            indTot: produto.indicadorTotal,
            //di: TNFeInfNFeDetProdDI[];
            //detExport: TNFeInfNFeDetProdDetExport[];
            xPed: produto.numeroPedido,
            nItemPed: produto.numeroItemPedido,
            //nFCI: string;
            //rastro: TNFeInfNFeDetProdRastro[];
            //arma
            //comb
            //med
            //nRECOPI
            //veicProd
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
        let result;

        /**ICMS00
    ICMS10
    ICMS20
    ICMS30
    ICMS40
    ICMS51
    ICMS60
    ICMS70
    ICMS90
    ICMSPart
    ICMSSN101
    ICMSSN102
    ICMSSN201
    ICMSSN202
    ICMSSN500
    ICMSSN900
    ICMSST */
        switch (icms.cst) {
            case '00':
                result = {
                    ICMS00: <schema.TNFeInfNFeDetImpostoICMSICMS00> {
                        orig: icms.origem,
                        CST: icms.cst,
                        modBC: schema.TNFeInfNFeDetImpostoICMSICMS00ModBC.Item0,
                        pICMS: '',
                        vBC: '',
                        vICMS: '',
                        pFCP: '',
                        vFCP: ''
                    }
                }
                break;
            case '10':
                //TODO: verificar logica para definir se é partilha do icms
                if (true) {
                    result = {
                        ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMSPart> {
                            orig: icms.origem,
                            CST: icms.cst,
                            modBC: schema.TNFeInfNFeDetImpostoICMSICMSPartModBC.Item0,
                            vBC: '',
                            pRedBC: '',
                            pICMS: '',
                            vICMS: '',
                            modBCST: schema.TNFeInfNFeDetImpostoICMSICMSPartModBCST.Item0,
                            pMVAST: '',
                            pRedBCST: '',
                            vBCST: '',
                            pICMSST: '',
                            vICMSST: '',
                            pBCOp: '',
                            UFST: schema.TUf.AC,
                        }
                    }
                } else {
                    result = {
                        ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMS10> {
                            orig: icms.origem,
                            CST: icms.cst,
                            modBC: schema.TNFeInfNFeDetImpostoICMSICMS10ModBC.Item0,
                            pICMS: '',
                            vBC: '',
                            vICMS: '',
                            pFCP: '',
                            vFCP: '',
                            modBCST: schema.TNFeInfNFeDetImpostoICMSICMS10ModBCST.Item0,
                            pFCPST: '',
                            pICMSST: '',
                            pMVAST: '',
                            pRedBCST: '',
                            vBCFCP: '',
                            vBCFCPST: '',
                            vBCST: '',
                            vFCPST: '',
                            vICMSST: '',
                        }
                    }
                }
                break;
            case '20':
                result = {
                    ICMS20: <schema.TNFeInfNFeDetImpostoICMSICMS20>{
                        orig: icms.origem,
                        CST: icms.cst,
                        modBC: schema.TNFeInfNFeDetImpostoICMSICMS20ModBC.Item0,
                        pRedBC: '',
                        vBC: '',
                        pICMS: '',
                        vICMS: '',
                        vBCFCP: '',
                        pFCP: '',
                        vFCP: '',
                        vICMSDeson: '',
                        motDesICMS: schema.TNFeInfNFeDetImpostoICMSICMS20MotDesICMS.Item3
                    }
                }
                break;
            case '30':
                result = {
                    ICMS30: <schema.TNFeInfNFeDetImpostoICMSICMS30> {

                    }
                }
                break;
            case '40':
            case '51':
            case '60':
                result = {
                    ICMS60: <schema.TNFeInfNFeDetImpostoICMSICMS60> {
                        orig: icms.origem,
                        CST: icms.cst,
                    }
                }
                break;
            case '70':
            case '90':
                result = {
                    ICMS90: <schema.TNFeInfNFeDetImpostoICMSICMS90> {
                        orig: icms.origem,
                        CST: icms.cst,
                    }
                }
                break;
            default:
                //throw exception?
                break;
        }
        return result;
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
            /**
             * transporta: TNFeInfNFeTranspTransporta;
                retTransp: TNFeInfNFeTranspRetTransp;
                //balsa
                //reboque
                //vagao
                //veicTransp
                items: object[];
                itemsElementName: ItemsChoiceType5[];
                vol: TNFeInfNFeTranspVol[]; 
            */
        }
    }

    getPag(pagamento: Pagamento) {
        let pag = <schema.TNFeInfNFePag>{};
        pag.detPag = this.getDetalhamentoPagamentos(pagamento.pagamentos);
        pag.vTroco = pagamento.valorTroco;

        return pag;
    }

    getDetalhamentoPagamentos(pagamentos: DetalhePagamento[]){
        let listPagamentos = [];
        let detPag;

        for (const pag of pagamentos) {
            detPag = <schema.TNFeInfNFePagDetPag>{};

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
            tpIntegra: Utils.getEnumByValue(schema.TNFeInfNFePagDetPagCardTpIntegra, dadosCartao.tipoIntegracao),
            CNPJ: dadosCartao.cnpj,
            tBand: Utils.getEnumByValue(schema.TNFeInfNFePagDetPagCardTBand, dadosCartao.bandeira),
            cAut: dadosCartao.codAutorizacao
        }
    }

    getInfoAdic(info: InfoAdicional) {
        return <schema.TNFeInfNFeInfAdic>{
            infCpl: info.infoComplementar,
            infAdFisco: info.infoFisco
        }
    }

}