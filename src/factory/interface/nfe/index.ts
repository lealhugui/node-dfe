import { WebProxy } from "../../webservices/webserviceHelper";

export enum ServicosSefaz {
    autorizacao = 'autorizacao',
    retAutorizacao = 'retAutorizacao',
    consultarStatusServico = 'consultarStatusServico',
    evento = 'recepcaoEvento',
    inutilizacao = 'inutilizacao',
    protocolo = 'consultarProtocolo',
    cadastro = 'consultarCadastro',
}

export interface RetornoProcessamentoNF {
    success: boolean,
    error: string,
    nfe: Object,
    confirmada: boolean;
    envioNF: RetornoProcessamento,
    consultaProc: RetornoProcessamento,
    retornoContingenciaOffline: RetornoContingenciaOffline
}

export interface RetornoContingenciaOffline {
    xml_gerado: string
}

export interface RetornoProcessamento {
    xml_enviado: string,
    xml_recebido: string,
    status: number,
    success: boolean,
    data: Object,
    error: string
}

export interface NFeBase {
    docFiscal: DocumentoFiscal;
    destinatario: Destinatario;
    produtos: Produto[];
    total: Total;
    transporte: Transporte;
    infoAdicional: InfoAdicional;
}

export interface NFeDocumento extends NFeBase {
    cobranca: Cobranca;
    pagamento: Pagamento;
}

export interface NFCeDocumento extends NFeBase {
    pagamento: Pagamento;
}

export interface DocumentoFiscal {
    serie: string;
    modelo: string;
    numeroNota: string;
    naturezaOperacao: string;
    ambiente: string;
    dhEmissao: string;
    dhSaiEnt: string;
    codUF: string;
    tipoDocumentoFiscal: string;
    identificadorDestinoOperacao: string;
    codIbgeFatoGerador: string;
    tipoImpressao: string;
    tipoEmissao: string;
    finalidadeEmissao: string;
    indPresenca: string;
    indConsumidorFinal: string;
    processoEmissao: string;
    versaoAplicativoEmissao: string;
    dhContingencia: string;
    justificativaContingencia: string;
    isContingenciaOffline: boolean;
    indIntermed?: string;
}

export interface Produto {
    prod: DetalhesProduto;
    imposto: Imposto;
    infoAdicional: string;
    numeroItem: string;
}

export interface DetalhesProduto {
    codigo: string;
    cEAN: string;
    descricao: string;
    cest: string;
    NCM: string;
    CFOP: string;
    unidadeComercial: string;
    quantidadeComercial: string;
    valorUnitarioComercial: string;
    valorTotal: string;
    cEANTrib: string;
    unidadeTributavel: string;
    quantidadeTributavel: string;
    valorUnitarioTributavel: string;
    valorFrete: string;
    valorSeguro: string;
    valorDesconto: string;
    valorOutro: string;
    indicadorTotal: string;
    numeroPedido: string;
    numeroItemPedido: string;
    cNPJFab: string;
    cBenef: string;
    eXTIPI: string;

    percentualDevolucao: number;
    valorIPIDevolucao: number;
    /*
    TODO: demais campos
    nVE: string[];
    indEscala: TNFeInfNFeDetProdIndEscala;
    indEscalaSpecified: boolean;
    di: TNFeInfNFeDetProdDI[];
    detExport: TNFeInfNFeDetProdDetExport[];
    nFCI: string;
    rastro: TNFeInfNFeDetProdRastro[];
    */
}

export interface impostoDevol {
    pDevol: number;
    vIPIDevol: number;
}

export interface Imposto {
    valorAproximadoTributos: string;
    icms: Icms;
    pis: Pis;
    cofins: Cofins;
    ipi: Ipi;
    ii: II;
    issqn: Issqn;
    pisst: PisST;
    cofinsst: CofinsST;
    icmsUfDest: IcmsUfDest
}

export interface Icms {
    orig: string;
    CST: string;
    modBC: string;
    pRedBC: string;
    vBC: string;
    pICMS: string;
    vICMS: string;
    modBCST: string;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCSTRet: string;
    vICMSSTRet: string;
    vBCSTDest: string;
    vICMSSTDest: string;
    motDesICMS: string;
    pBCOp: string;
    UFST: string;
    CSOSN: string;
    pCredSN: string;
    vCredICMSSN: string;
    vICMSDeson: string;
    vICMSOp: string;
    pDif: string;
    vICMSDif: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    vBCFCPSTRet: string;
    pFCPSTRet: string;
    vFCPSTRet: string;
    pST: string;
    pICMSEfet: string;
    pRedBCEfet: string;
    vBCEfet: string;
    vICMSEfet: string;
}
export interface IcmsUfDest {
    vBCUFDest: number;
    vBCFCPUFDest: number;
    pFCPUFDest: number;
    pICMSUFDest: number;
    pICMSInter: number;
    pICMSInterPart: number;
    vFCPUFDest: number;
    vICMSUFDest: number;
    vICMSUFRemet: number;
}

export interface Pis {
    CST: string;
    vBC: number;
    pPIS: number;
    vPIS: number;
    vBCProd: number;
    vAliqProd: number;
    qBCProd: number;
}

export interface PisST {
    vBC: number;
    pPIS: number;
    qBCProd: number;
    vAliqProd: number;
    vPIS: number;
}

export interface CofinsST {
    vBC: number;
    pCOFINS: number;
    qBCProd: number;
    vAliqProd: number;
    vCOFINS: number;
}

export interface Cofins {
    CST: string;
    vBC: number;
    pCOFINS: number;
    vCOFINS: number;
    qBCProd: number;
    vAliqProd: number;
}

export interface Ipi {
    cEnq: string;
    CST: string;
    vBC: number;
    qUnid: number;
    vUnid: number;
    pIPI: number;
    vIPI: number;
    CNPJProd: string;
    cSelo: string;
    qSelo: string;
}

export interface II {
    vBC: number,
    vDespAdu: number,
    vII: number,
    vIOF: number
}

export interface Issqn {
    vBC: string,
    vAliq: string,
    vISSQN: string,
    cMunFG: string,
    cListServ: string,
    vDeducao: string,
    vOutro: string,
    vDescIncond: string,
    vDescCond: string,
    vISSRet: string,
    indISS: string,
    cServico: string,
    cMun: string,
    cPais: string,
    nProcesso: string,
    indIncentivo: string
}

export interface Total {
    icmsTot: IcmsTot;
    issqnTot: IssqnTot;
    retTrib: RetTrib;
}

export interface IcmsTot {
    vBC: string;
    vICMS: string;
    vICMSDeson: string;
    vFCPUFDest: string;
    vICMSUFDest: string;
    vICMSUFRemet: string;
    vFCP: string;
    vBCST: string;
    vST: string;
    vFCPST: string;
    vFCPSTRet: string;
    vProd: string;
    vFrete: string;
    vSeg: string;
    vDesc: string;
    vII: string;
    vIPI: string;
    vIPIDevol: string;
    vPIS: string;
    vCOFINS: string;
    vOutro: string;
    vNF: string;
    vTotTrib: string;
}

export interface IssqnTot {
    vServ: string;
    vBC: string;
    vISS: string;
    vPIS: string;
    vCOFINS: string;
    dCompet: string;
    vDeducao: string;
    vOutro: string;
    vDescIncond: string;
    vDescCond: string;
    vISSRet: string;
    cRegTrib: string;
}

export interface RetTrib {
    vRetPIS: string;
    vRetCOFINS: string;
    vRetCSLL: string;
    vBCIRRF: string;
    vIRRF: string;
    vBCRetPrev: string;
    vRetPrev: string;
}

export interface Transporte {
    modalidateFrete: string;
    //..
}

export interface Cobranca {
    fatura: Fatura;
    duplicatas: Duplicata[];
}

export interface Fatura {
    nFatura: string;
    vOriginal: number;
    vDesconto: number;
    vLiquido: number;
}

export interface Duplicata {
    nDuplicata: string;
    dVencimento: string;
    vDuplicatata: Number;
}

export interface Pagamento {
    valorTroco: string;
    pagamentos: DetalhePagamento[]
}

export interface DetalhePagamento {
    indicadorFormaPagamento: string;
    formaPagamento: string;
    valor: string;
    dadosCartao: DetalhePgtoCartao;
    descricaoFormaPagamento: string;
}

export interface DetalhePgtoCartao {
    tipoIntegracao: string;
    cnpj: string;
    bandeira: string;
    codAutorizacao: string;
}

export interface InfoAdicional {
    infoComplementar: string;
    infoFisco: string;
    // ..
}

export interface Empresa {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    inscricaoEstadualST: string;
    inscricaoMunicipal: string;
    CNAE: string;
    codRegimeTributario: string;
    endereco: Endereco;
    certificado: Certificado;
    idCSC: string;
    CSC: string;
}

export interface ResponsavelTecnico {
    cnpj: string;
    contato: string;
    email: string;
    fone: string;
    idCSRT?: string;
    CSRT?: string;
}

export interface Destinatario {
    documento: string;
    nome: string;
    endereco: Endereco;
    indicadorIEDestinario: string;
    email: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    inscricaoSuframa: string;
    isEstrangeiro: boolean;
}

export interface Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    codMunicipio: string;
    municipio: string;
    uf: string;
    cUf: string;
    cep: string;
    codPais: string;
    pais: string;
    telefone: string;
}

export interface Certificado {
    key: any;
    pfx: any;
    password: string;
    opcoes?: OpcoesCertificado;
}

export interface OpcoesCertificado {
    stringfyPassphrase?: boolean;
    removeRejectUnauthorized?: boolean;
}

export function fromJsonixObj<T>(json: any): T {
    return json as T;
}

export interface Geral {
    ambiente: string;
    versao: string;
    modelo: string;    
}

export interface Webservices {
    tentativas: number; // quantidade de tentativas a serem feitas, para evitar bloqueio por consumo indevido
    aguardarConsultaRetorno: number; //tempo em milisegundos
}

export interface Arquivos {
    salvar: boolean;
    pastaEnvio: string;
    pastaRetorno: string;
    pastaXML: string;
}

export enum TipoEvento {
    cancelamento = '110111',
    cartaCorrecao = '110110',
    manifestacaoConfirmacaoOperacao = '210200',
    manifestacaoCienciaEmissao = '210210',
    manifestacaoDesconhecimentoOperacao = '210220',
    manifestacaoOperacaoNaoRealizada = '210240',
    epec = '110140',
}

export interface Configuracoes {
    empresa: Empresa;
    webProxy?: WebProxy;
    certificado: Certificado;
    geral: Geral;
    webservices: Webservices;
    responsavelTecnico?: ResponsavelTecnico;
    arquivos: Arquivos;
}
