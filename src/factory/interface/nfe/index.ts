import {
    TNFeInfNFeDetProdDetExport,
    TNFeInfNFeDetProdDI,
    TNFeInfNFeDetProdIndEscala,
    TNFeInfNFeDetProdIndTot, TNFeInfNFeDetProdRastro
} from "../../schema";

export interface NFeDocumento {
    docFiscal: DocumentoFiscal;
    destinatario: Destinatario;
    produtos: Produto[];
    total: Total;
    transporte: Transporte;
    pagamentos: Pagamento[];
    infoAdicional: InfoAdicional;
}

export interface NFCeDocumento {
    docFiscal: DocumentoFiscal;
    destinatario: Destinatario;
    produtos: Produto[];
    total: Total;
    transporte: Transporte;
    pagamentos: Pagamento[];
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
    codIbgeEmitente: string;
    codNotaFiscal: string;
    tipoDocumentoFiscal: string;
    identificadorDestinoOperacao: string;
    codIbgeFatoGerador: string;
    tipoImpressao: string;
    tipoEmissao: string;
    codDigitoVerificador: string;
    finalidadeEmissao: string;
    indPresenca: string;
    indConsumidorFinal: string;
    processoEmissao: string;
    versaoAplicativoEmissao: string;
    dhContingencia: string;
    justificativaContingencia: string;
}

export interface Produto {
    prod: DetalhesProduto;
    imposto: Imposto;
    infoAdicional: string;
    numeroItem: number;
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
    valorSeg: string;
    valorDesc: string;
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
    valorAproximadoTributos: number;
    icms: Icms;
    pis: Pis;
    cofins: Cofins;
}

export interface Icms {
    cst: string;
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

}

export interface IssqnTot {

}

export interface Transporte {
    modalidateFrete: string;
    //..
}

export interface Pagamento {

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
}

export interface Destinatario {
    documento: string;
    nome: string;
    endereco: Endereco;
    indicadorIEDestinario: string;
    email: string;
}

export interface Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    codMunicipio: string;
    municipio: string;
    uf: string;
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