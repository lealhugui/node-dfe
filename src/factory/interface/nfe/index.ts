export enum ServicosSefaz {
    autorizacao = 'autorizacao',
    retAutorizacao = 'retAutorizacao',
    consultarStatusServico = 'consultarStatusServico'
}

export interface RetornoProcessamentoNF {
    success: boolean,
    error: string,
    nfe: Object,
    envioNF: RetornoProcessamento,
    consultaProc: RetornoProcessamento,
    retornoContingenciaOffline: RetornoContingenciaOffline
}

export interface RetornoContingenciaOffline {
    documento_enviado: NFCeDocumento,
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

export interface NFeDocumento {
    docFiscal: DocumentoFiscal;
    destinatario: Destinatario;
    produtos: Produto[];
    total: Total;
    transporte: Transporte;
    pagamento: Pagamento;
    infoAdicional: InfoAdicional;
}

export interface NFCeDocumento {
    docFiscal: DocumentoFiscal;
    destinatario: Destinatario;
    produtos: Produto[];
    total: Total;
    transporte: Transporte;
    pagamento: Pagamento;
    infoAdicional: InfoAdicional;
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

export interface Imposto {
    valorAproximadoTributos: string;
    icms: Icms;
    pis: Pis;
    cofins: Cofins;
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
}

export interface Pis {
    cst: string;
}

export interface Cofins {
    cst: string;
}

export interface Total {
    icmsTot: IcmsTot;
    issqnTot: IssqnTot;
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

}

export interface Transporte {
    modalidateFrete: string;
    //..
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
    idCSRT: string;
    CSRT: string;
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
}

export function fromJsonixObj<T>(json: any): T {
    return json as T;
}