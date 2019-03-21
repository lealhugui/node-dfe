
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
    codigo: string;
    cEAN: string;
    descricao: string;
    NCM: string;
    CFOP: string;
    unidadeComercial: string;
    quantidade: string;
    valorUnitario: string;
    valorTotal: string;
    cEANTrib: string;
    unidadeTributavel: string;
    quantidadeTributavel: string;
    valorUnitarioTributavel: string;
    indicadorTotal: string;
    // TODO: demais campos

    imposto: Imposto;
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