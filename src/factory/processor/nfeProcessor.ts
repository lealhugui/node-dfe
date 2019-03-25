import { RetornoProcessamentoNF, Empresa, Endereco, NFCeDocumento, NFeDocumento, DocumentoFiscal, Destinatario, Transporte, Pagamento, Produto, Total, 
    InfoAdicional, DetalhesProduto, Imposto, Icms, Cofins, Pis, IcmsTot, IssqnTot, DetalhePagamento, DetalhePgtoCartao, RetornoContingenciaOffline
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

        let result = <RetornoProcessamentoNF>{
            success: false
        };

        try {
            let doc = this.gerarXml(documento);
            let xml = doc.xml.replace('>]]>', ']]>').replace('<![CDATA[<', '<![CDATA[')
    
            let xmlAssinado = Signature.signXmlX509(xml, 'infNFe', this.empresa.certificado);
            let xmlLote = this.gerarXmlLote(xmlAssinado);

            if (documento.docFiscal.modelo == '65' && documento.docFiscal.isContingenciaOffline) {
                result.retornoContingenciaOffline = <RetornoContingenciaOffline>{};

                result.nfe = doc.nfe;
                result.success = true;
                result.retornoContingenciaOffline.documento_enviado = documento;
                result.retornoContingenciaOffline.xml_gerado = xmlLote;
            } else {
                result = await this.transmitirXml(xmlLote, documento.docFiscal.ambiente);
            }
            
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }

    async transmitirXml(xmlLote: string, ambiente: string){
        let result = <RetornoProcessamentoNF>{
            success: false
        };

        try {
            let retornoEnvio = await this.enviarNF(xmlLote, this.empresa.certificado);
            result.envioNF = retornoEnvio;
    
            let retEnviNFe = Object(retornoEnvio.data).retEnviNFe;
            if (retEnviNFe.cStat == '103') {
                let recibo = retEnviNFe.infRec.nRec;
                let xmlConRecNFe = this.gerarXmlConsultaProc(ambiente, recibo);

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
        };
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

        return {
            nfe: NFe,
            xml: XmlHelper.serializeXml(NFe, 'NFe')
        };
    }

    gerarChaveNF(empresa: Empresa, docFiscal: DocumentoFiscal){
        let chave = '';

        let ano = docFiscal.dhEmissao.substring(2,4);
        let mes = docFiscal.dhEmissao.substring(5,7);

        chave += (docFiscal.codUF.padStart(2,'0'));
        chave += (ano + mes);
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
        let ide = <schema.TNFeInfNFeIde> {
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
        };

        if (documento.isContingenciaOffline && documento.modelo == '65') {
            if (ide.dhCont == '' || ide.xJust == '')
                throw new Error('Deve ser informada a data/hora de contingência e justificativa.');
                
            ide.tpEmis = Utils.getEnumByValue(schema.TNFeInfNFeIdeTpEmis, '9');
        }

        return ide;
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
        if (icms.CST && icms.CST !== '') {
            switch (icms.CST) {
                case '00':
                    result = {
                        ICMS00: <schema.TNFeInfNFeDetImpostoICMSICMS00> {
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS00ModBC, icms.modBC),
                            pICMS: icms.pICMS,
                            vBC: icms.vBC,
                            vICMS: icms.vICMS,
                            pFCP: icms.pFCP,
                            vFCP: icms.vFCP
                        }
                    }
                    break;
                case '10':
                    // partilha icms
                    if (icms.UFST && icms.UFST !== '' && icms.pBCOp && icms.pBCOp !== '') {
                        result = {
                            ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMSPart> {
                                orig: icms.orig,
                                CST: icms.CST,
                                modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMSPartModBC, icms.modBC),
                                vBC: icms.vBC,
                                pRedBC: icms.pRedBC,
                                pICMS: icms.pICMS,
                                vICMS: icms.vICMS,
                                modBCST: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMSPartModBCST, icms.modBCST),
                                pMVAST: icms.pMVAST,
                                pRedBCST: icms.pRedBCST,
                                vBCST: icms.vBCST,
                                pICMSST: icms.pICMSST,
                                vICMSST: icms.vICMSST,
                                pBCOp: icms.pBCOp,
                                UFST: Utils.getEnumByValue(schema.TUf, icms.UFST),
                            }
                        }
                    } else {
                        result = {
                            ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMS10> {
                                orig: icms.orig,
                                CST: icms.CST,
                                modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS10ModBC, icms.modBC),
                                pICMS: icms.pICMS,
                                vBC: icms.vBC,
                                vICMS: icms.vICMS,
                                pFCP: icms.pFCP,
                                vFCP: icms.vFCP,
                                modBCST: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS10ModBCST, icms.modBCST),
                                pFCPST: icms.pFCPST,
                                pICMSST: icms.pICMSST,
                                pMVAST: icms.pMVAST,
                                pRedBCST: icms.pRedBCST,
                                vBCFCP: icms.vBCFCP,
                                vBCFCPST: icms.vBCFCPST,
                                vBCST: icms.vBCST,
                                vFCPST: icms.vFCPST,
                                vICMSST: icms.vICMSST,
                            }
                        }
                    }
                    break;
                case '20':
                    result = {
                        ICMS20: <schema.TNFeInfNFeDetImpostoICMSICMS20>{
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS20ModBC, icms.modBC),
                            pRedBC: icms.pRedBC,
                            vBC: icms.vBC,
                            pICMS: icms.pICMS,
                            vICMS: icms.vICMS,
                            vBCFCP: icms.vBCFCP,
                            pFCP: icms.pFCP,
                            vFCP: icms.vFCP,
                            vICMSDeson: icms.vICMSDeson,
                            motDesICMS: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS20MotDesICMS, icms.motDesICMS)
                        }
                    }
                    break;
                case '30':
                    result = {
                        ICMS30: <schema.TNFeInfNFeDetImpostoICMSICMS30> {
                            orig: icms.orig,
                            CST: icms.CST,
                            modBCST: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS30ModBCST, icms.modBCST),
                            pMVAST: icms.pMVAST,
                            pRedBCST: icms.pRedBCST,
                            vBCST: icms.vBCST,
                            pICMSST: icms.pICMSST,
                            vICMSST: icms.vICMSST,
                            motDesICMS: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS30MotDesICMS, icms.motDesICMS),
                            vICMSDeson: icms.vICMSDeson,
                            vBCFCPST: icms.vBCFCPST,
                            pFCPST: icms.pFCPST,
                            vFCPST: icms.vFCPST
                        }
                    }
                    break;
                case '40':
                case '50':
                    result = {
                        ICMS40: <schema.TNFeInfNFeDetImpostoICMSICMS40> {
                            orig: icms.orig,
                            CST: icms.CST,
                            motDesICMS : Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS, icms.motDesICMS),
                            vICMSDeson: icms.vICMSDeson
                        }
                    }
                    break;
                case '41':
                    if (icms.vBCSTRet && icms.vBCSTRet !== '') {
                        result = {
                            ICMS41: <schema.TNFeInfNFeDetImpostoICMSICMSST> {
                                orig: icms.orig,
                                CST: icms.CST,
                                vBCSTRet: icms.vBCSTRet,
                                vICMSSTRet: icms.vICMSSTRet,
                                vBCSTDest: icms.vBCSTDest,
                                vICMSSTDest: icms.vICMSSTDest,
                                //pFCPSTRet: '',
                                //pST: '',
                                //vBCFCPSTRet: '',
                                //vFCPSTRet: '',
                                //pICMSEfet: '',
                                //pRedBCEfet: '',
                                //vBCEfet: '',
                                //vICMSEfet: '',
                                //vICMSSubstituto: '',
                            }
                        }
                    } else {
                        result = {
                            ICMS40: <schema.TNFeInfNFeDetImpostoICMSICMS40> {
                                orig: icms.orig,
                                CST: icms.CST,
                                motDesICMS : Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS, icms.motDesICMS),
                                vICMSDeson: icms.vICMSDeson
                            }
                        }
                    }
                    break;
                case '51':
                    result = {
                        ICMS51: <schema.TNFeInfNFeDetImpostoICMSICMS51> {
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS51ModBC,icms.modBC),
                            vBC: icms.vBC,
                            pRedBC: icms.pRedBC,
                            pICMS: icms.pICMS,
                            vICMS: icms.vICMS,
                            pDif: icms.pDif,
                            vICMSDif: icms.vICMSDif,
                            vICMSOp: icms.vICMSOp,
                            vBCFCP: icms.vBCFCP,
                            pFCP: icms.pFCP,
                            vFCP: icms.vFCP
                        }
                    }
                    break;
                case '60':
                    result = {
                        ICMS60: <schema.TNFeInfNFeDetImpostoICMSICMS60> {
                            orig: icms.orig,
                            CST: icms.CST,
                            vBCSTRet: icms.vBCSTRet,
                            vICMSSTRet: icms.vICMSSTRet,
                            pST: icms.pST,
                            vBCFCPSTRet: icms.vBCFCPSTRet,
                            pFCPSTRet: icms.pFCPSTRet,
                            vFCPSTRet: icms.vFCPSTRet,
                            //pICMSEfet: '',
                            //pRedBCEfet: '',
                            //vBCEfet: '',
                            //vICMSEfet: '',
                            //vICMSSubstituto: '',
                        }
                    }
                    break;
                case '70':
                    result = {
                        ICMS70: <schema.TNFeInfNFeDetImpostoICMSICMS70> {
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: icms.modBC,
                            vBC: icms.vBC,
                            pRedBC: icms.pRedBC,
                            pICMS: icms.pICMS,
                            vICMS: icms.vICMS,
                            modBCST: icms.modBCST,
                            pMVAST: icms.pMVAST,
                            pRedBCST: icms.pRedBCST,
                            vBCST: icms.vBCST,
                            pICMSST: icms.pICMSST,
                            vICMSST: icms.vICMSST,
                            motDesICMS: icms.motDesICMS,
                            vICMSDeson: icms.vICMSDeson,
                            vBCFCP: icms.vBCFCP,
                            pFCP: icms.pFCP,
                            vFCP: icms.vFCP,
                            vBCFCPST: icms.vBCFCPST,
                            pFCPST: icms.pFCPST,
                            vFCPST: icms.vFCPST,
                        }
                    }
                    break;
                case '90':
                    // partilha icms
                    if (icms.UFST && icms.UFST !== '' && icms.pBCOp && icms.pBCOp !== '') {
                        result = {
                            ICMS90: <schema.TNFeInfNFeDetImpostoICMSICMSPart> {
                                orig: icms.orig,
                                CST: icms.CST,
                                modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMSPartModBC, icms.modBC),
                                vBC: icms.vBC,
                                pRedBC: icms.pRedBC,
                                pICMS: icms.pICMS,
                                vICMS: icms.vICMS,
                                modBCST: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMSPartModBCST, icms.modBCST),
                                pMVAST: icms.pMVAST,
                                pRedBCST: icms.pRedBCST,
                                vBCST: icms.vBCST,
                                pICMSST: icms.pICMSST,
                                vICMSST: icms.vICMSST,
                                pBCOp: icms.pBCOp,
                                UFST: Utils.getEnumByValue(schema.TUf, icms.UFST)
                            }
                        }
                    } else {
                        result = {
                            ICMS90: <schema.TNFeInfNFeDetImpostoICMSICMS90> {
                                orig: icms.orig,
                                CST: icms.CST,
                                modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS90ModBC, icms.modBC),
                                vBC: icms.vBC,
                                pRedBC: icms.pRedBC,
                                pICMS: icms.pICMS,
                                vICMS: icms.vICMS,
                                modBCST: icms.modBCST,
                                pMVAST: icms.pMVAST,
                                pRedBCST: icms.pRedBCST,
                                vBCST: icms.vBCST,
                                pICMSST: icms.pICMSST,
                                vICMSST: icms.vICMSST,
                                motDesICMS: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS90MotDesICMS, icms.motDesICMS),
                                vICMSDeson: icms.vICMSDeson,
                                vBCFCP: icms.vBCFCP,
                                pFCP: icms.pFCP,
                                vFCP: icms.vFCP,
                                vBCFCPST: icms.vBCFCPST,
                                vFCPST: icms.vFCPST,
                            }
                        }
                    }
                    break;
                default:
                    //throw exception?
                    break;
            }
        } else {
            // Simples Nacional
            switch(icms.CSOSN) {
                case '101':
                    result = {
                        ICMSSN101: <schema.TNFeInfNFeDetImpostoICMSICMSSN101> {
                            orig: icms.orig,
                            CSOSN: icms.CSOSN,
                            pCredSN: icms.pCredSN,
                            vCredICMSSN: icms.vCredICMSSN
                        }
                    }
                    break;
                case '102':
                case '103':
                case '300':
                case '400':
                    result = {
                        ICMSSN102: <schema.TNFeInfNFeDetImpostoICMSICMSSN102> {
                            orig: icms.orig,
                            CSOSN: icms.CSOSN
                        }
                    }
                    break;
                case '201':
                    result = {
                        ICMSSN201: <schema.TNFeInfNFeDetImpostoICMSICMSSN201> {
                            orig: icms.orig,
                            CSOSN: icms.CSOSN,
                            modBCST: icms.modBCST,
                            pMVAST: icms.pMVAST,
                            pRedBCST: icms.pRedBCST,
                            vBCST: icms.vBCST,
                            pICMSST: icms.pICMSST,
                            vICMSST: icms.vICMSST,
                            pCredSN: icms.pCredSN,
                            vCredICMSSN: icms.vCredICMSSN,
                            vBCFCPST: icms.vBCFCPST,
                            pFCPST: icms.pFCPST,
                            vFCPST: icms.vFCPST
                        }
                    }
                    break;
                case '202':
                case '203':
                    result = {
                        ICMSSN202: <schema.TNFeInfNFeDetImpostoICMSICMSSN202> {
                            orig: icms.orig,
                            CSOSN: icms.CSOSN,
                            modBCST: icms.modBCST,
                            pMVAST: icms.pMVAST,
                            pRedBCST: icms.pRedBCST,
                            vBCST: icms.vBCST,
                            pICMSST: icms.pICMSST,
                            vICMSST: icms.vICMSST,  
                            vBCFCPST: icms.vBCFCPST,
                            pFCPST: icms.pFCPST,
                            vFCPST: icms.vFCPST
                        }
                    }
                    break;
                case '500':
                    result = {
                        ICMSSN500: <schema.TNFeInfNFeDetImpostoICMSICMSSN500>{
                            orig: icms.orig,
                            CSOSN: icms.CSOSN,
                            vBCSTRet: icms.vBCSTRet,
                            vICMSSTRet: icms.vICMSSTRet,
                            vBCFCPSTRet: icms.vBCFCPSTRet,
                            pFCPSTRet: icms.pFCPSTRet,
                            vFCPSTRet: icms.vFCPSTRet
                        }
                    } 
                    break;
                case '900':
                    result = {
                        ICMSSN900: <schema.TNFeInfNFeDetImpostoICMSICMSSN900> {
                            orig: icms.orig,
                            CSOSN: icms.CSOSN,
                            modBC: icms.modBC,
                            vBC: icms.vBC,
                            pRedBC: icms.pRedBC,
                            pICMS: icms.pICMS,
                            vICMS: icms.vICMS,
                            modBCST: icms.modBCST,
                            pMVAST: icms.pMVAST,
                            pRedBCST: icms.pRedBCST,
                            vBCST: icms.vBCST,
                            pICMSST: icms.pICMSST,
                            vICMSST: icms.vICMSST,
                            pCredSN: icms.pCredSN,
                            vCredICMSSN: icms.vCredICMSSN,
                            vBCFCPST: icms.vBCFCPST,
                            pFCPST: icms.pFCPST,
                            vFCPST: icms.vFCPST
                        }
                    }
                    break;
            }
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