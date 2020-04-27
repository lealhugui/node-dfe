export interface Evento {
    id: string;
    tpAmbiente: string;
    CNPJ: string;
    cOrgao: string;
    chNFe: string;
    dhEvento: string;
    tpEvento: string;
    nSeqEvento: string;
    versaoEvento: string;
    detEvento: DetalheEvento;
}

export interface DetalheEvento {
    versao: string;
    descEvento: string;
    xCorrecao: string;
    xCondUso: string;
    nProt: string;
    xJust: string;
    cOrgaoAutor: number;
    tpAutor: string;
    verAplic: string;
    chNFeRef: string;
    dhEmi: Date;
    tpNF: string;
    IE: string;
    dest: EventoDestinatario;
    vNF: number;
    vICMS: number;
    vST: number;
    itemPedido: EventoItemPedido;
    idPedidoCancelado: string;

}

export interface EventoItemPedido {
    numItem: number;
    qtdeItem: number;
}

export interface EventoDestinatario {
    UF: string;           
    CNPJCPF: string;      
    idEstrangeiro: string;
    IE: string;           
}