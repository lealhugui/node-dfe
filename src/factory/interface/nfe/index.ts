export interface NFeDocumento {

}

export interface NFCeDocumento {
    
}

export interface Empresa {

}

export function fromJsonixObj<T>(json: any): T {
    return json as T;
}