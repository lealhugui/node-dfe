
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