export interface NFeDocumento {

}

export interface NFCeDocumento {
    serie: string;
    modelo: string;
    numero: string;
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
}

export interface Endereco {
    logradouro: string;
    nome: string;
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

export function fromJsonixObj<T>(json: any): T {
    return json as T;
}