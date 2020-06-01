import {
    RetornoProcessamentoNF, Empresa, Endereco, NFCeDocumento, NFeDocumento, DocumentoFiscal, Destinatario, Transporte, Pagamento, Produto, Total,
    InfoAdicional, DetalhesProduto, Imposto, Icms, Cofins, Pis, IcmsTot, IssqnTot, DetalhePagamento, DetalhePgtoCartao, RetornoContingenciaOffline, ResponsavelTecnico, ServicosSefaz, II, PisST, Ipi, CofinsST, IcmsUfDest, impostoDevol, Configuracoes, Cobranca, Duplicata, NFeBase
} from '../interface/nfe';

import { WebServiceHelper } from "../webservices/webserviceHelper";
import * as schema from '../schema/index';
import { XmlHelper } from '../xmlHelper';
import * as Utils from '../utils/utils';
import { Signature } from '../signature';
import { SefazNFCe } from '../webservices/sefazNfce';
import { SefazNFe } from '../webservices/sefazNfe';
import * as fs from 'fs';
import * as path from 'path';

const sha1 = require('sha1');

let soapAutorizacao: any = null;
let soapRetAutorizacao: any = null;


function log(msg: string, processo?: string) {
    console.log(`[node-dfe][${processo || 'log'}]->${msg}`);
}

function jsonOneLevel(obj: any): string {
    const result: any = {}


    for (const k of Object.keys(obj)) {
        let logStr = obj[k].toString() || "null";
        if (logStr.length > 500) {
            logStr = logStr.substring(0, 499)
        }
        result[k] = logStr
    }

    return JSON.stringify(result)
}

/**
 * Classe para processamento de NFe/NFCe
 */
export class EnviaProcessor {

    constructor(
        private configuracoes: Configuracoes
    ) {
        if (!this.configuracoes.geral.versao) this.configuracoes.geral.versao = '4.00';
        if (!this.configuracoes.webservices) this.configuracoes.webservices = { tentativas: 3, aguardarConsultaRetorno: 1000 };
        if (!this.configuracoes.webservices.tentativas) this.configuracoes.webservices.tentativas = 3;
        if (!this.configuracoes.webservices.aguardarConsultaRetorno) this.configuracoes.webservices.aguardarConsultaRetorno = 1000;
        if (this.configuracoes.arquivos) {
            if (this.configuracoes.arquivos.pastaEnvio && (!'/\\'.includes(this.configuracoes.arquivos.pastaEnvio.substr(-1))))
                this.configuracoes.arquivos.pastaEnvio = this.configuracoes.arquivos.pastaEnvio + path.sep;
            if (this.configuracoes.arquivos.pastaRetorno && (!'/\\'.includes(this.configuracoes.arquivos.pastaRetorno.substr(-1))))
                this.configuracoes.arquivos.pastaRetorno = this.configuracoes.arquivos.pastaRetorno + path.sep;
            if (this.configuracoes.arquivos.pastaXML && (!'/\\'.includes(this.configuracoes.arquivos.pastaXML.substr(-1))))
                this.configuracoes.arquivos.pastaXML = this.configuracoes.arquivos.pastaXML + path.sep;
        }
    }

    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     * @param assincrono Boolean para definir se a execução sera sincrona ou assincrona, por padrao === sincrona!
     */
    public async executar(documento: NFeBase, assincrono: boolean = false) {
        let result = <RetornoProcessamentoNF>{
            success: false
        };

        try {
            this.configuraUrlsSefaz();
            let doc = this.gerarXml(documento);
            let xmlAssinado = Signature.signXmlX509(doc.xml, 'infNFe', this.configuracoes.certificado);

            if (documento.docFiscal.modelo == '65') {
                let appendQRCode = this.appendQRCodeXML(documento as NFCeDocumento, xmlAssinado);
                xmlAssinado = appendQRCode.xml;
                doc.nfe.infNFeSupl = appendQRCode.qrCode;
            }

            let xmlLote = this.gerarXmlLote(xmlAssinado, assincrono);

            if (documento.docFiscal.modelo == '65' && documento.docFiscal.isContingenciaOffline) {
                result.retornoContingenciaOffline = <RetornoContingenciaOffline>{};
                result.success = true;
                result.retornoContingenciaOffline.xml_gerado = xmlLote;
            } else {
                result = await this.transmitirXml(xmlLote, doc.nfe);
            }
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }

    private configuraUrlsSefaz() {
        const { geral: { modelo, ambiente }, empresa } = this.configuracoes;
        if (!soapAutorizacao || !soapRetAutorizacao) {
            let Sefaz = modelo == '65' ? SefazNFCe : SefazNFe;

            soapAutorizacao = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, ServicosSefaz.autorizacao);
            soapRetAutorizacao = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, ServicosSefaz.retAutorizacao);
        }
    }

    private appendQRCodeXML(documento: NFCeDocumento, xmlAssinado: string) {
        let qrCode = null;
        let xmlAssinadoObj = XmlHelper.deserializeXml(xmlAssinado, { explicitArray: false });

        let chave = Object(xmlAssinadoObj).NFe.infNFe.$.Id.replace('NFe', '');

        if (documento.docFiscal.isContingenciaOffline) {

            let diaEmissao = documento.docFiscal.dhEmissao.substring(8, 10);
            let valorTotal = documento.total.icmsTot.vNF;
            let digestValue = Object(xmlAssinadoObj).NFe.Signature.SignedInfo.Reference.DigestValue;

            qrCode = this.gerarQRCodeNFCeOffline(soapAutorizacao.urlQRCode, chave, '2', documento.docFiscal.ambiente, diaEmissao, valorTotal, digestValue, this.configuracoes.empresa.idCSC, this.configuracoes.empresa.CSC);
        } else {
            qrCode = this.gerarQRCodeNFCeOnline(soapAutorizacao.urlQRCode, chave, '2', documento.docFiscal.ambiente, this.configuracoes.empresa.idCSC, this.configuracoes.empresa.CSC);
        }

        let qrCodeObj = <schema.TNFeInfNFeSupl>{
            qrCode: '<' + qrCode + '>',
            urlChave: soapAutorizacao.urlChave
        };

        let qrCodeXml = XmlHelper.serializeXml(qrCodeObj, 'infNFeSupl').replace('>]]>', ']]>').replace('<![CDATA[<', '<![CDATA[');

        return {
            qrCode: qrCodeObj,
            xml: xmlAssinado.replace('</infNFe><Signature', '</infNFe>' + qrCodeXml + '<Signature')
        };
    }

    public async transmitirXml(xmlLote: string, nfeObj: Object) {
        let result = <RetornoProcessamentoNF>{
            success: false,
            nfe: nfeObj
        };

        try {
            let retEnviNFe = null;

            if (!nfeObj) {
                let xmlObj = XmlHelper.deserializeXml(xmlLote, { explicitArray: false });
                result.nfe = Object(xmlObj).enviNFe.NFe;
            }

            this.configuraUrlsSefaz();

            let retornoEnvio = await this.enviarNF(xmlLote);

            try {
                log(jsonOneLevel({
                    success: !!retornoEnvio ? retornoEnvio.success : false,
                    retornoEnvio: !!retornoEnvio,
                    data: !retornoEnvio ? false : !!retornoEnvio.data
                }), 'retornoEnvio.exists')

                log(jsonOneLevel(retornoEnvio), 'retornoEnvio.full');
            } catch (e) {
                log(`ja deu erro pra logar.......${e.toString()}`, 'retornoEnvio')
            }

            if (retornoEnvio && retornoEnvio.data) {
                const data = Object(retornoEnvio.data);
                if (data.retEnviNFe) {
                    retEnviNFe = data.retEnviNFe;
                }
            } else {
                throw new Error('Erro ao realizar requisição');
            }

            // console.log(retEnviNFe && retEnviNFe.cStat == '104' && retEnviNFe.protNFe.infProt.cStat == '100');
            // console.log(retEnviNFe && retEnviNFe.cStat == '103');
            // 100 Autorizado o uso da NF-e
            // 101 Cancelamento de NF-e homologado
            // 102 Inutilização de número homologado
            // 103 Lote recebido com sucesso
            // 104 Lote processado
            // 105 Lote em processamento
            // 106 Lote não localizado
            // 107 Serviço em Operação

            result.envioNF = retornoEnvio;
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }
        result.success = true; //nao esta confirmada, mas houve sucesso nessa requisicao de envio da nota
        return result;
    }

    private async enviarNF(xml: string) {
        const { webProxy, certificado } = this.configuracoes

        return await WebServiceHelper.makeSoapRequest(
            xml, certificado, soapAutorizacao, webProxy
        );
    }

    private gerarXmlLote(xml: string, isAsync: boolean) {
        //TODO: ajustar para receber uma lista de xmls...

        let loteId = Utils.randomInt(1, 999999999999999).toString();

        let enviNFe = <schema.TEnviNFe>{
            $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
            idLote: loteId,
            indSinc: isAsync ? schema.TEnviNFeIndSinc.Item0 : schema.TEnviNFeIndSinc.Item1,
            _: '[XMLS]'
        };

        let xmlLote = XmlHelper.serializeXml(enviNFe, 'enviNFe');
        return xmlLote.replace('[XMLS]', xml);
    }

    private gerarXml(documento: NFeBase) {
        if (documento.docFiscal.modelo == '65' && documento.docFiscal.isContingenciaOffline)
            documento.docFiscal.tipoEmissao = '9';

        let dadosChave = this.gerarChaveNF(this.configuracoes.empresa, documento.docFiscal);
        let NFe = <schema.TNFe>{
            $: {
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            infNFe: documento.docFiscal.modelo == '65' ? this.gerarNFCe(documento as NFCeDocumento, dadosChave) : this.gerarNFe(documento as NFeDocumento, dadosChave)
        };

        Utils.removeSelfClosedFields(NFe);

        return {
            nfe: NFe,
            xml: XmlHelper.serializeXml(NFe, 'NFe')
        };
    }

    private gerarChaveNF(empresa: Empresa, docFiscal: DocumentoFiscal) {
        let chave = '';

        let ano = docFiscal.dhEmissao.substring(2, 4);
        let mes = docFiscal.dhEmissao.substring(5, 7);

        chave += (docFiscal.codUF.padStart(2, '0'));
        chave += (ano + mes);
        chave += (empresa.cnpj.padStart(14, '0'));
        chave += (docFiscal.modelo.padStart(2, '0'));
        chave += (docFiscal.serie.padStart(3, '0'));
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

    private obterDigitoVerificador(chave: any) {
        let soma = 0;
        let mod = -1;
        let dv = -1;
        let peso = 2;

        let chaveArr = chave.split('');

        for (let i = chaveArr.length - 1; i !== -1; i--) {
            let ch = Number(chaveArr[i].toString());

            soma += ch * peso;
            if (peso < 9)
                peso += 1;
            else
                peso = 2;
        }

        mod = soma % 11;
        if (mod === 0 || mod === 1)
            dv = 0;
        else
            dv = 11 - mod;

        return dv.toString();
    }

    private gerarQRCodeNFCeOnline(urlQRCode: string, chave: string, versaoQRCode: string, ambiente: string, idCSC: string, CSC: string) {
        let s = '|';
        let concat = [chave, versaoQRCode, ambiente, Number(idCSC)].join(s);
        let hash = sha1(concat + CSC).toUpperCase();

        return urlQRCode + '?p=' + concat + s + hash;
    }

    private gerarQRCodeNFCeOffline(urlQRCode: string, chave: string, versaoQRCode: string, ambiente: string, diaEmissao: string, valorTotal: string, digestValue: string, idCSC: string, CSC: string) {
        let s = '|';
        let hexDigestValue = Buffer.from(digestValue).toString('hex');
        let concat = [chave, versaoQRCode, ambiente, diaEmissao, valorTotal, hexDigestValue, Number(idCSC)].join(s);
        let hash = sha1(concat + CSC).toUpperCase();

        return urlQRCode + '?p=' + concat + s + hash;
    }

    private gerarNFe(documento: NFeDocumento, dadosChave: any) {
        let nfe = <schema.TNFeInfNFe>{
            $: { versao: '4.00', Id: 'NFe' + dadosChave.chave }
        };

        nfe.ide = this.getIde(documento.docFiscal, dadosChave);
        nfe.emit = this.getEmit(this.configuracoes.empresa);
        //nfe.avulsa = ;
        nfe.dest = this.getDest(documento.destinatario, documento.docFiscal.ambiente);
        //nfe.retirada = ;
        //nfe.entrega = ;
        //nfe.autXML = ;
        nfe.det = this.getDet(documento.produtos, documento.docFiscal.ambiente, documento.docFiscal.modelo);
        nfe.total = this.getTotal(documento.total);
        nfe.transp = this.getTransp(documento.transporte);
        nfe.cobr = this.getCobr(documento.cobranca);
        nfe.pag = this.getPag(documento.pagamento);        
        nfe.infAdic = this.getInfoAdic(documento.infoAdicional);
        //nfe.exporta = ;
        //nfe.compra = ;
        //nfe.cana = ;

        if (this.configuracoes.responsavelTecnico)
            nfe.infRespTec = this.getResponsavelTecnico(this.configuracoes.responsavelTecnico, dadosChave.chave);

        return nfe;
    }

    private gerarNFCe(documento: NFCeDocumento, dadosChave: any) {
        let nfce = <schema.TNFeInfNFe>{
            $: { versao: '4.00', Id: 'NFe' + dadosChave.chave }
        };

        nfce.ide = this.getIde(documento.docFiscal, dadosChave);
        nfce.emit = this.getEmit(this.configuracoes.empresa);

        if (documento.destinatario)
            nfce.dest = this.getDest(documento.destinatario, documento.docFiscal.ambiente);

        nfce.det = this.getDet(documento.produtos, documento.docFiscal.ambiente, documento.docFiscal.modelo);
        nfce.total = this.getTotal(documento.total);
        nfce.transp = this.getTransp(documento.transporte);
        nfce.pag = this.getPag(documento.pagamento);
        nfce.infAdic = this.getInfoAdic(documento.infoAdicional);

        if (this.configuracoes.responsavelTecnico)
            nfce.infRespTec = this.getResponsavelTecnico(this.configuracoes.responsavelTecnico, dadosChave.chave);

        return nfce;
    }

    private getIde(documento: DocumentoFiscal, dadosChave: any) {
        let ide = <schema.TNFeInfNFeIde>{
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

        return ide;
    }

    private getEmit(empresa: Empresa) {
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

    private getEnderEmit(endereco: Endereco) {
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

    private getEnderDest(endereco: Endereco) {
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

    private getDest(destinatario: Destinatario, ambiente: string) {
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

    private getDet(produtos: Produto[], ambiente: string, modelo: string) {
        let det_list = [];

        for (let i = 0; i < produtos.length; i++) {
            det_list.push(<schema.TNFeInfNFeDet>{
                $: { nItem: produtos[i].numeroItem },
                prod: this.getDetProd(produtos[i].prod, ambiente, i == 0),
                imposto: this.getDetImposto(produtos[i].imposto, modelo, produtos[i].prod.CFOP),
                infAdProd: produtos[i].infoAdicional,
                impostoDevol: (produtos[i].prod.percentualDevolucao && (produtos[i].prod.percentualDevolucao > 0)) ? this.getImpostoDevolucao({ pDevol: produtos[i].prod.percentualDevolucao, vIPIDevol: produtos[i].prod.valorIPIDevolucao }) : undefined
            });
        }

        return det_list;
    }

    private getDetProd(produto: DetalhesProduto, ambiente: string, isPrimeiroProduto: boolean) {
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

    private getDetImposto(imposto: Imposto, modelo: string, cfop: string) {
        let detImposto = <schema.TNFeInfNFeDetImposto>{
            vTotTrib: imposto.valorAproximadoTributos,
            ICMS: imposto.icms ? [this.getImpostoIcms(imposto.icms)] : [],
            PIS: imposto.pis ? [this.getImpostoPIS(imposto.pis, modelo)] : [],
            COFINS: imposto.cofins ? [this.getImpostoCOFINS(imposto.cofins, modelo)] : [],
            PISST: imposto.pisst ? [this.getImpostoPISST(imposto.pisst)] : [],
            COFINSST: imposto.cofinsst ? [this.getImpostoCOFINSST(imposto.cofinsst)] : [],
            IPI: imposto.ipi ? [this.getImpostoIPI(imposto.ipi, modelo)] : [],
            II: imposto.ii ? [this.getImpostoII(imposto.ii, cfop)] : [],
            ICMSUFDest: imposto.icmsUfDest ? [this.getIcmsUfDest(imposto.icmsUfDest)] : [],
            ISSQN: '',
        };

        return detImposto;
    }

    private getImpostoIcms(icms: Icms) {
        let result;
        if (icms.CST && icms.CST !== '') {
            switch (icms.CST) {
                case '00':
                    result = {
                        ICMS00: <schema.TNFeInfNFeDetImpostoICMSICMS00>{
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS00ModBC, icms.modBC),
                            vBC: icms.vBC,
                            pICMS: icms.pICMS,
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
                            ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMSPart>{
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
                            ICMS10: <schema.TNFeInfNFeDetImpostoICMSICMS10>{
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
                        ICMS30: <schema.TNFeInfNFeDetImpostoICMSICMS30>{
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
                        ICMS40: <schema.TNFeInfNFeDetImpostoICMSICMS40>{
                            orig: icms.orig,
                            CST: icms.CST,
                            motDesICMS: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS, icms.motDesICMS),
                            vICMSDeson: icms.vICMSDeson
                        }
                    }
                    break;
                case '41':
                    if (icms.vBCSTRet && icms.vBCSTRet !== '') {
                        result = {
                            ICMS41: <schema.TNFeInfNFeDetImpostoICMSICMSST>{
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
                                pRedBCEfet: icms.pRedBCEfet,
                                vBCEfet: icms.vBCEfet,
                                pICMSEfet: icms.pICMSEfet,
                                vICMSEfet: icms.vICMSEfet,
                                //vICMSSubstituto: '',
                            }
                        }
                    } else {
                        result = {
                            ICMS40: <schema.TNFeInfNFeDetImpostoICMSICMS40>{
                                orig: icms.orig,
                                CST: icms.CST,
                                motDesICMS: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS, icms.motDesICMS),
                                vICMSDeson: icms.vICMSDeson
                            }
                        }
                    }
                    break;
                case '51':
                    result = {
                        ICMS51: <schema.TNFeInfNFeDetImpostoICMSICMS51>{
                            orig: icms.orig,
                            CST: icms.CST,
                            modBC: Utils.getEnumByValue(schema.TNFeInfNFeDetImpostoICMSICMS51ModBC, icms.modBC),
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
                        ICMS60: <schema.TNFeInfNFeDetImpostoICMSICMS60>{
                            orig: icms.orig,
                            CST: icms.CST,
                            vBCSTRet: icms.vBCSTRet,
                            vICMSSTRet: icms.vICMSSTRet,
                            pST: icms.pST,
                            vBCFCPSTRet: icms.vBCFCPSTRet,
                            pFCPSTRet: icms.pFCPSTRet,
                            vFCPSTRet: icms.vFCPSTRet,
                            pRedBCEfet: icms.pRedBCEfet,
                            vBCEfet: icms.vBCEfet,
                            pICMSEfet: icms.pICMSEfet,
                            vICMSEfet: icms.vICMSEfet,
                            //vICMSSubstituto: '',
                        }
                    }
                    break;
                case '70':
                    result = {
                        ICMS70: <schema.TNFeInfNFeDetImpostoICMSICMS70>{
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
                            ICMS90: <schema.TNFeInfNFeDetImpostoICMSICMSPart>{
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
                            ICMS90: <schema.TNFeInfNFeDetImpostoICMSICMS90>{
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
            switch (icms.CSOSN) {
                case '101':
                    result = {
                        ICMSSN101: <schema.TNFeInfNFeDetImpostoICMSICMSSN101>{
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
                        ICMSSN102: <schema.TNFeInfNFeDetImpostoICMSICMSSN102>{
                            orig: icms.orig,
                            CSOSN: icms.CSOSN
                        }
                    }
                    break;
                case '201':
                    result = {
                        ICMSSN201: <schema.TNFeInfNFeDetImpostoICMSICMSSN201>{
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
                        ICMSSN202: <schema.TNFeInfNFeDetImpostoICMSICMSSN202>{
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
                            vFCPSTRet: icms.vFCPSTRet,
                            pRedBCEfet: icms.pRedBCEfet,
                            vBCEfet: icms.vBCEfet,
                            pICMSEfet: icms.pICMSEfet,
                            vICMSEfet: icms.vICMSEfet,
                        }
                    }
                    break;
                case '900':
                    result = {
                        ICMSSN900: <schema.TNFeInfNFeDetImpostoICMSICMSSN900>{
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

    private getImpostoISSQN() {
        return <schema.TNFeInfNFeDetImpostoISSQN>{
            vBC: '',
            vAliq: '',
            vISSQN: '',
            cMunFG: '',
            cListServ: schema.TCListServ.Item0101,
            vDeducao: '',
            vOutro: '',
            vDescIncond: '',
            vDescCond: '',
            vISSRet: '',
            indISS: schema.TNFeInfNFeDetImpostoISSQNIndISS.Item1,
            cServico: '',
            cMun: '',
            cPais: '',
            nProcesso: '',
            indIncentivo: schema.TNFeInfNFeDetImpostoISSQNIndIncentivo.Item1
        }
    }

    private getImpostoIPI(ipi: Ipi, modelo: string) {
        let result;
        if (modelo != '55' || !ipi) return;   //não deve gerar grupo IPI para NFCe
        //   if (!GerarTagIPIparaNaoTributado) && (!['00', '49', '50', '99'].includes(ipi.CST)) return;
        //se valores padrão de quando não foi preenchido a TAG IPI

        if ((ipi.cEnq = '') && (ipi.CST = '00') && (ipi.vBC = 0) && (ipi.qUnid = 0) && (ipi.vUnid = 0) && (ipi.pIPI = 0) && (ipi.vIPI = 0)) return;
        if ((ipi.vBC + ipi.pIPI > 0) && (ipi.qUnid + ipi.vUnid > 0)) throw 'As TAG <vBC> e <pIPI> não podem ser informadas em conjunto com as TAG <qUnid> e <vUnid>';


        result = {
            IPI: <schema.TIpi>{
                CNPJProd: ipi.CNPJProd,
                cSelo: ipi.cSelo,
                qSelo: ipi.qSelo,
                cEnq: ipi.cEnq || '999',
            }

        }

        if (ipi.qUnid + ipi.vUnid > 0) {
            result.IPI.IPITrib = <schema.TIpiIPITrib>{
                CST: ipi.CST,
                qUnid: ipi.qUnid,
                vUnid: ipi.vUnid,
                vIPI: ipi.vIPI,
            }
        } else {
            result.IPI.IPITrib = <schema.TIpiIPITrib>{
                CST: ipi.CST,
                vBC: ipi.vBC,
                pIPI: ipi.pIPI,
                vIPI: ipi.vIPI,
            }
        }

        // result.IPI.IPINT = { CST: ipi.CST }
        return result;
    }

    private getImpostoII(ii: II, cfop: string) {
        if (!ii) return;
        if ((ii.vBC > 0) || (ii.vDespAdu > 0) || (ii.vII > 0) || (ii.vIOF > 0) || (cfop[0] === '3')) {
            return {
                vBC: ii.vBC,
                vDespAdu: ii.vDespAdu,
                vII: ii.vII,
                vIOF: ii.vIOF
            };
        }
        return;
    }

    private getImpostoPIS(pis: Pis, modelo: string) {
        let result;

        if ((modelo != '55') &&
            ((pis.vBC == 0) && (pis.pPIS = 0) && (pis.vPIS = 0) &&
                (pis.qBCProd = 0) && (pis.vAliqProd = 0) &&
                (!['04', '05', '06', '07', '08', '09', '49', '99'].includes(pis.CST)))) return undefined;

        if (!pis && modelo == '55') throw 'NF-e sem grupo do PIS'
        switch (pis.CST) {
            case '01':
            case '02':
                result = {
                    PISAliq: <schema.TNFeInfNFeDetImpostoPIS>{
                        CST: pis.CST,
                        vBC: pis.vBC,
                        pPIS: pis.pPIS,
                        vPIS: pis.vPIS,
                    }
                };
                break;
            case '03':
                result = {
                    PISQtde: <schema.TNFeInfNFeDetImpostoPIS>{
                        CST: pis.CST,
                        vBCProd: pis.vBCProd,
                        vAliqProd: pis.vAliqProd,
                        vPIS: pis.vPIS,
                    }
                }
                break;
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':
                result = {
                    PISNT: <schema.TNFeInfNFeDetImpostoPIS>{
                        CST: pis.CST
                    }
                }
            case '49':
            case '50':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
            case '56':
            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '98':
            case '99':
                if ((pis.vBC + pis.pPIS > 0) && (pis.qBCProd + pis.vAliqProd > 0)) throw 'As TAG <vBC> e <pPIS> não podem ser informadas em conjunto com as TAG <qBCProd> e <vAliqProd>'
                if (pis.qBCProd + pis.vAliqProd <= 0) return undefined;

                result = {
                    PISOutr: <schema.TNFeInfNFeDetImpostoPIS>{
                        CST: pis.CST,
                        qBCProd: pis.qBCProd,
                        vAliqProd: pis.vAliqProd,
                        vPIS: pis.vPIS
                    }
                }
            default:
                result = {
                    PISOutr: <schema.TNFeInfNFeDetImpostoPIS>{
                        CST: pis.CST,
                        vBC: pis.vBC,
                        pPIS: pis.pPIS,
                        vPIS: pis.vPIS
                    }
                }
                break;
        }
        return result;
    }

    private getImpostoCOFINS(cofins: Cofins, modelo: string) {
        let result;

        if ((modelo != '55') &&
            ((cofins.vBC == 0) && (cofins.pCOFINS = 0) && (cofins.vCOFINS = 0) &&
                (cofins.qBCProd = 0) && (cofins.vAliqProd = 0) &&
                (!['04', '05', '06', '07', '08', '09', '49', '99'].includes(cofins.CST)))) return undefined;
        //No caso da NFC-e, o grupo de tributação do PIS e o grupo de tributação da COFINS são opcionais.

        if (!cofins && modelo == '55') throw 'NF-e sem grupo do COFINS'
        switch (cofins.CST) {
            case '01':
            case '02':
                result = {
                    COFINSAliq: <schema.TNFeInfNFeDetImpostoCOFINS>{
                        CST: cofins.CST,
                        vBC: cofins.vBC,
                        pCOFINS: cofins.pCOFINS,
                        vCOFINS: cofins.vCOFINS,
                    }
                };
                break;
            case '03':
                result = {
                    COFINSQtde: <schema.TNFeInfNFeDetImpostoCOFINS>{
                        CST: cofins.CST,
                        qBCProd: cofins.qBCProd,
                        vAliqProd: cofins.vAliqProd,
                        vCOFINS: cofins.vCOFINS
                    }
                }
                break;
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':
                result = {
                    COFINSNT: <schema.TNFeInfNFeDetImpostoCOFINS>{
                        CST: cofins.CST
                    }
                }
                break;
            case '49':
            case '50':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
            case '56':
            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '98':
            case '99':
                if ((cofins.vBC + cofins.pCOFINS > 0) && (cofins.qBCProd + cofins.vAliqProd > 0)) throw 'As TAG <vBC> e <pCOFINS> não podem ser informadas em conjunto com as TAG <qBCProd> e <vAliqProd>'
                if (cofins.qBCProd + cofins.vAliqProd <= 0) return undefined;

                result = {
                    COFINSOutr: <schema.TNFeInfNFeDetImpostoCOFINS>{
                        CST: cofins.CST,
                        qBCProd: cofins.qBCProd,
                        vAliqProd: cofins.vAliqProd,
                        vCOFINS: cofins.vCOFINS
                    }
                }
                break
            default:
                result = {
                    COFINSOutr: <schema.TNFeInfNFeDetImpostoCOFINS>{
                        CST: cofins.CST,
                        vBC: cofins.vBC,
                        pCOFINS: cofins.pCOFINS,
                        vCOFINS: cofins.vCOFINS
                    }
                }
                break;
        }
        return result;
    }

    private getImpostoPISST(PISST: PisST) {
        let result;
        if (!PISST) return;
        if ((PISST.vBC > 0) || (PISST.pPIS > 0) || (PISST.qBCProd > 0) || (PISST.vAliqProd > 0) || (PISST.vPIS > 0)) {
            if ((PISST.vBC + PISST.pPIS > 0) && (PISST.qBCProd + PISST.vAliqProd > 0)) throw 'As TAG <vBC> e <pPIS> não podem ser informadas em conjunto com as TAG <qBCProd> e <vAliqProd>';

            if (PISST.vBC + PISST.pPIS > 0) {
                result = {
                    PISST: <schema.TNFeInfNFeDetImpostoPISST>{
                        vBC: PISST.vBC,
                        pPIS: PISST.pPIS,
                        vPIS: PISST.vPIS,
                    }
                };
            }

            if (PISST.qBCProd + PISST.vAliqProd > 0) {
                result = {
                    PISST: <schema.TNFeInfNFeDetImpostoPISST>{
                        qBCProd: PISST.qBCProd,
                        vAliqProd: PISST.vAliqProd,
                        vPIS: PISST.vPIS,
                    }
                };
            }

        }
        return result;
    }

    private getImpostoCOFINSST(COFINSST: CofinsST) {
        let result;
        if (!COFINSST) return;
        if ((COFINSST.vBC > 0) && (COFINSST.pCOFINS > 0) && (COFINSST.qBCProd > 0) && (COFINSST.vAliqProd > 0) && (COFINSST.vCOFINS > 0)) {
            if ((COFINSST.vBC + COFINSST.pCOFINS > 0) && (COFINSST.qBCProd + COFINSST.vAliqProd > 0)) throw 'As TAG <vBC> e <pCOFINS> não podem ser informadas em conjunto com as TAG <qBCProd> e <vAliqProd>';

            if (COFINSST.vBC + COFINSST.pCOFINS > 0) {
                result = {
                    COFINSST: <schema.TNFeInfNFeDetImpostoCOFINSST>{
                        vBC: COFINSST.vBC,
                        pCOFINS: COFINSST.pCOFINS,
                        vCOFINS: COFINSST.vCOFINS,
                    }
                };
            }

            if (COFINSST.qBCProd + COFINSST.vAliqProd > 0) {
                result = {
                    COFINSST: <schema.TNFeInfNFeDetImpostoCOFINSST>{
                        qBCProd: COFINSST.qBCProd,
                        vAliqProd: COFINSST.vAliqProd,
                        vCOFINS: COFINSST.vCOFINS,
                    }
                };
            }

        }
        return result;
    }

    private getImpostoDevolucao(devol: impostoDevol) {
        return {
            impostoDevol: <schema.TNFeInfNFeDetImpostoDevol>{
                pDevol: devol.pDevol,
                IPI: {
                    vIPIDevol: devol.vIPIDevol
                }
            }

        }
    }

    private getIcmsUfDest(icmsUfDest: IcmsUfDest) {
        if (!icmsUfDest) return;
        if (icmsUfDest.pICMSInterPart <= 0) return;
        return {
            ICMSUFDest: <schema.TNFeInfNFeDetImpostoICMSUFDest>{
                vBCUFDest: icmsUfDest.vBCUFDest,
                vBCFCPUFDest: icmsUfDest.vBCFCPUFDest,
                pFCPUFDest: icmsUfDest.pFCPUFDest,
                pICMSUFDest: icmsUfDest.pICMSUFDest,
                pICMSInter: icmsUfDest.pICMSInter,
                pICMSInterPart: icmsUfDest.pICMSInterPart,
                vFCPUFDest: icmsUfDest.vFCPUFDest,
                vICMSUFDest: icmsUfDest.vICMSUFDest,
                vICMSUFRemet: icmsUfDest.vICMSUFRemet,
            }
        }
    }

    private getTotal(total: Total) {
        return <schema.TNFeInfNFeTotal>{
            ICMSTot: total.icmsTot
        }
    }

    private getIcmsTot(icmsTot: IcmsTot) {
        return icmsTot;

    }

    private getTransp(transp: Transporte) {
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

    private getCobr(cobranca: Cobranca) {
        if ((cobranca && cobranca.fatura) &&
            (cobranca.fatura.nFatura || (cobranca.fatura.vOriginal > 0) || 
             cobranca.duplicatas.length > 0)
        ) {
            const cobr = <schema.TNFeInfNFeCobr>{ fat: {} };            
            cobr.fat.nFat = cobranca.fatura.nFatura;
            cobr.fat.vOrig = cobranca.fatura.vOriginal.toFixed(2);
            cobr.fat.vDesc = (cobranca.fatura.vDesconto ? cobranca.fatura.vDesconto : 0).toFixed(2);
            cobr.fat.vLiq = cobranca.fatura.vLiquido.toFixed(2);         

            cobr.dup = this.getDetalheCobranca(cobranca.duplicatas);

            return cobr;
        } else return;


    }

    private getDetalheCobranca(duplicatas: Duplicata[]) {
        let listaDuplicata = [];
        let detDup;

        for (const dup of duplicatas) {
            detDup = <schema.TNFeInfNFeCobrDup>{};
            detDup.nDup = dup.nDuplicata;
            detDup.dVenc = dup.dVencimento;
            detDup.vDup = (dup.vDuplicatata ? dup.vDuplicatata : 0).toFixed(2);           
            listaDuplicata.push(detDup);
        }

        return listaDuplicata;
    }

    private getPag(pagamento: Pagamento) {
        let pag = <schema.TNFeInfNFePag>{};
        pag.detPag = this.getDetalhamentoPagamentos(pagamento.pagamentos);
        pag.vTroco = pagamento.valorTroco;

        return pag;
    }

    private getDetalhamentoPagamentos(pagamentos: DetalhePagamento[]) {
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

    private getDetalhamentoCartao(dadosCartao: DetalhePgtoCartao) {
        return <schema.TNFeInfNFePagDetPagCard>{
            tpIntegra: Utils.getEnumByValue(schema.TNFeInfNFePagDetPagCardTpIntegra, dadosCartao.tipoIntegracao),
            CNPJ: dadosCartao.cnpj,
            tBand: Utils.getEnumByValue(schema.TNFeInfNFePagDetPagCardTBand, dadosCartao.bandeira),
            cAut: dadosCartao.codAutorizacao
        }
    }

    private getInfoAdic(info: InfoAdicional) {
        return <schema.TNFeInfNFeInfAdic>{
            infCpl: info.infoComplementar,
            infAdFisco: info.infoFisco
        }
    }

    private getResponsavelTecnico(respTec: ResponsavelTecnico, chave: string) {
        const result: any = {
            CNPJ: respTec.cnpj,
            xContato: respTec.contato,
            email: respTec.email,
            fone: respTec.fone,
        }
        if (respTec.CSRT != null && respTec.CSRT != "") {
            result.idCSRT = respTec.idCSRT;
            result.hashCSRT = this.gerarHashCSRT(chave, respTec.CSRT);
        }
        return result;

        /*
        return <schema.TInfRespTec> {
            CNPJ: respTec.cnpj,
            xContato: respTec.contato,
            email: respTec.email,
            fone: respTec.fone,
            idCSRT: respTec.idCSRT,
            hashCSRT: this.gerarHashCSRT(chave, respTec.CSRT)
        }
        */
    }

    private gerarHashCSRT(chave: string, CSRT: string) {
        return Buffer.from(sha1(CSRT + chave), 'hex').toString('base64');
    }

}
