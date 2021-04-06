export interface TConsReciNFe {
    $: {
        versao: string;
        xmlns: string;
    };
    tpAmb: TAmb;
    nRec: string;
}
export declare enum TAmb {
    PRD = "1",
    HML = "2"
}
export interface TConsSitNFe {
    tpAmb: TAmb;
    xServ: TConsSitNFeXServ;
    chNFe: string;
    versao: TVerConsSitNFe;
}
export declare enum TConsSitNFeXServ {
    CONSULTAR = 0
}
export declare enum TVerConsSitNFe {
    Item400 = 0
}
export interface TConsStatServ {
    tpAmb: TAmb;
    cUF: TCodUfIBGE;
    xServ: TConsStatServXServ;
    $: {
        versao: string;
    };
}
export declare enum TCodUfIBGE {
    Item11 = "11",
    Item12 = "12",
    Item13 = "13",
    Item14 = "14",
    Item15 = "15",
    Item16 = "16",
    Item17 = "17",
    Item21 = "21",
    Item22 = "22",
    Item23 = "23",
    Item24 = "24",
    Item25 = "25",
    Item26 = "26",
    Item27 = "27",
    Item28 = "28",
    Item29 = "29",
    Item31 = "31",
    Item32 = "32",
    Item33 = "33",
    Item35 = "35",
    Item41 = "41",
    Item42 = "42",
    Item43 = "43",
    Item50 = "50",
    Item51 = "51",
    Item52 = "52",
    Item53 = "53"
}
export declare enum TConsStatServXServ {
    STATUS = "STATUS"
}
export interface TEnviNFe {
    $: {
        versao: string;
        xmlns: string;
    };
    idLote: string;
    indSinc: TEnviNFeIndSinc;
    _: string;
}
export declare enum TEnviNFeIndSinc {
    Item0 = "0",
    Item1 = "1"
}
export interface TNFe {
    $: {
        versao: string;
        xmlns: string;
    };
    infNFe: TNFeInfNFe;
    infNFeSupl: TNFeInfNFeSupl;
    signature: SignatureType;
}
export interface TNFeInfNFe {
    $: {
        versao: string;
        Id: string;
    };
    ide: TNFeInfNFeIde;
    emit: TNFeInfNFeEmit;
    avulsa: TNFeInfNFeAvulsa;
    dest: TNFeInfNFeDest;
    retirada: TLocal;
    entrega: TLocal;
    autXML: TNFeInfNFeAutXML[];
    det: TNFeInfNFeDet[];
    total: TNFeInfNFeTotal;
    transp: TNFeInfNFeTransp;
    cobr?: TNFeInfNFeCobr;
    pag?: TNFeInfNFePag;
    infAdic: TNFeInfNFeInfAdic;
    exporta: TNFeInfNFeExporta;
    compra: TNFeInfNFeCompra;
    cana: TNFeInfNFeCana;
    infRespTec: TInfRespTec;
}
export interface TNFeInfNFeIde {
    cUF: TCodUfIBGE;
    cNF: string;
    natOp: string;
    mod: TMod;
    serie: string;
    nNF: string;
    dhEmi: string;
    dhSaiEnt: string;
    tpNF: TNFeInfNFeIdeTpNF;
    idDest: TNFeInfNFeIdeIdDest;
    cMunFG: string;
    tpImp: TNFeInfNFeIdeTpImp;
    tpEmis: TNFeInfNFeIdeTpEmis;
    cDV: string;
    tpAmb: TAmb;
    finNFe: TFinNFe;
    indFinal: TNFeInfNFeIdeIndFinal;
    indPres: TNFeInfNFeIdeIndPres;
    procEmi: TProcEmi;
    verProc: string;
    dhCont: string;
    xJust: string;
    nFref: TNFeInfNFeIdeNFref[];
    indIntermed?: TNFeInfNFeIdeIndIntermed;
}
export declare enum TNFeInfNFeIdeIndIntermed {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item9 = "9"
}
export declare enum TMod {
    Item55 = "55",
    Item65 = "65"
}
export declare enum TNFeInfNFeIdeTpNF {
    Item0 = "0",
    Item1 = "1"
}
export declare enum TNFeInfNFeIdeIdDest {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeIdeTpImp {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export declare enum TNFeInfNFeIdeTpEmis {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6",
    Item7 = "7",
    Item9 = "9"
}
export declare enum TFinNFe {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4"
}
export declare enum TNFeInfNFeIdeIndFinal {
    Item0 = "0",
    Item1 = "1"
}
export declare enum TNFeInfNFeIdeIndPres {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item9 = "9"
}
export declare enum TProcEmi {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeIdeNFref {
    refCTe?: string;
    refECF?: TNFeInfNFeIdeNFrefRefECF;
    refNF?: TNFeInfNFeIdeNFrefRefNF;
    refNFP?: TNFeInfNFeIdeNFrefRefNFP;
    refNFe?: string;
    itemElementName: ItemChoiceType1;
}
export interface TNFeInfNFeIdeNFrefRefECF {
    mod: TNFeInfNFeIdeNFrefRefECFMod;
    nECF: string;
    nCOO: string;
}
export declare enum TNFeInfNFeIdeNFrefRefECFMod {
    Item2B = "2B",
    Item2C = "2C",
    Item2D = "2D"
}
export interface TNFeInfNFeIdeNFrefRefNF {
    cUF_1: TCodUfIBGE;
    aAMM: string;
    cNPJ: string;
    mod: TNFeInfNFeIdeNFrefRefNFMod;
    serie: string;
    nNF: string;
}
export declare enum TNFeInfNFeIdeNFrefRefNFMod {
    Item01 = "01",
    Item02 = "02"
}
export interface TNFeInfNFeIdeNFrefRefNFP {
    cUF: TCodUfIBGE;
    aAMM: string;
    item: string;
    itemElementName: ItemChoiceType;
    ie: string;
    mod: TNFeInfNFeIdeNFrefRefNFPMod;
    serie: string;
    nNF: string;
}
export declare enum ItemChoiceType {
    CNPJ = 0,
    CPF = 1
}
export declare enum TNFeInfNFeIdeNFrefRefNFPMod {
    Item01 = "01",
    Item04 = "04"
}
export declare enum ItemChoiceType1 {
    refCTe = 0,
    refECF = 1,
    refNF = 2,
    refNFP = 3,
    refNFe = 4
}
export interface TNFeInfNFeEmit {
    CNPJ: string;
    CPF: string;
    xNome: string;
    xFant: string;
    enderEmit: TEnderEmi;
    IE: string;
    iEST: string;
    IM: string;
    CNAE: string;
    CRT: TNFeInfNFeEmitCRT;
}
export declare enum ItemChoiceType2 {
    CNPJ = 0,
    CPF = 1
}
export interface TEnderEmi {
    xLgr: string;
    nro: string;
    xCpl: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: TUfEmi;
    CEP: string;
    cPais: TEnderEmiCPais;
    cPaisSpecified: boolean;
    xPais: TEnderEmiXPais;
    xPaisSpecified: boolean;
    fone: string;
}
export declare enum TUfEmi {
    AC = "AC",
    AL = "AL",
    AM = "AM",
    AP = "AP",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MG = "MG",
    MS = "MS",
    MT = "MT",
    PA = "PA",
    PB = "PB",
    PE = "PE",
    PI = "PI",
    PR = "PR",
    RJ = "RJ",
    RN = "RN",
    RO = "RO",
    RR = "RR",
    RS = "RS",
    SC = "SC",
    SE = "SE",
    SP = "SP",
    TO = "TO"
}
export declare enum TEnderEmiCPais {
    Item1058 = "1058"
}
export declare enum TEnderEmiXPais {
    Brasil = "Brasil",
    BRASIL = "BRASIL"
}
export declare enum TNFeInfNFeEmitCRT {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeAvulsa {
    cNPJ: string;
    xOrgao: string;
    matr: string;
    xAgente: string;
    fone: string;
    uf: TUfEmi;
    nDAR: string;
    dEmi: string;
    vDAR: string;
    repEmi: string;
    dPag: string;
}
export interface TNFeInfNFeDest {
    CNPJ: string;
    CPF: string;
    idEstrangeiro: string;
    xNome: string;
    enderDest: TEndereco;
    indIEDest: TNFeInfNFeDestIndIEDest;
    IE: string;
    ISUF: string;
    IM: string;
    email: string;
}
export declare enum ItemChoiceType3 {
    CNPJ = 0,
    CPF = 1,
    idEstrangeiro = 2
}
export interface TEndereco {
    xLgr: string;
    nro: string;
    xCpl: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: TUf;
    CEP: string;
    cPais: string;
    xPais: string;
    fone: string;
}
export declare enum TUf {
    AC = "AC",
    AL = "AL",
    AM = "AM",
    AP = "AP",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MG = "MG",
    MS = "MS",
    MT = "MT",
    PA = "PA",
    PB = "PB",
    PE = "PE",
    PI = "PI",
    PR = "PR",
    RJ = "RJ",
    RN = "RN",
    RO = "RO",
    RR = "RR",
    RS = "RS",
    SC = "SC",
    SE = "SE",
    SP = "SP",
    TO = "TO",
    EX = "EX"
}
export declare enum TNFeInfNFeDestIndIEDest {
    Item1 = "1",
    Item2 = "2",
    Item9 = "9"
}
export interface TLocal {
    item: string;
    itemElementName: ItemChoiceType4;
    xNome: string;
    xLgr: string;
    nro: string;
    xCpl: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    uf: TUf;
    cEP: string;
    cPais: string;
    xPais: string;
    fone: string;
    email: string;
    ie: string;
}
export declare enum ItemChoiceType4 {
    CNPJ = 0,
    CPF = 1
}
export interface TNFeInfNFeAutXML {
    item: string;
    itemElementName: ItemChoiceType5;
}
export declare enum ItemChoiceType5 {
    CNPJ = 0,
    CPF = 1
}
export interface TNFeInfNFeDet {
    $: {
        nItem: string;
    };
    prod: TNFeInfNFeDetProd;
    imposto: TNFeInfNFeDetImposto;
    impostoDevol: any;
    infAdProd: string;
}
export interface TNFeInfNFeDetProd {
    cProd: string;
    cEAN: string;
    xProd: string;
    NCM: string;
    nVE: string[];
    CEST: string;
    indEscala: TNFeInfNFeDetProdIndEscala;
    indEscalaSpecified: boolean;
    cNPJFab: string;
    cBenef: string;
    eXTIPI: string;
    CFOP: string;
    uCom: string;
    qCom: string;
    vUnCom: string;
    vProd: string;
    cEANTrib: string;
    uTrib: string;
    qTrib: string;
    vUnTrib: string;
    vFrete: string;
    vSeg: string;
    vDesc: string;
    vOutro: string;
    indTot: TNFeInfNFeDetProdIndTot;
    di: TNFeInfNFeDetProdDI[];
    detExport: TNFeInfNFeDetProdDetExport[];
    xPed: string;
    nItemPed: string;
    nFCI: string;
    rastro: TNFeInfNFeDetProdRastro[];
    items: object[];
}
export declare enum TNFeInfNFeDetProdIndEscala {
    S = 0,
    N = 1
}
export declare enum TNFeInfNFeDetProdIndTot {
    Item0 = "0",
    Item1 = "1"
}
export interface TNFeInfNFeDetProdDI {
    nDI: string;
    dDI: string;
    xLocDesemb: string;
    uFDesemb: TUfEmi;
    dDesemb: string;
    tpViaTransp: TNFeInfNFeDetProdDITpViaTransp;
    vAFRMM: string;
    tpIntermedio: TNFeInfNFeDetProdDITpIntermedio;
    cNPJ: string;
    uFTerceiro: TUfEmi;
    uFTerceiroSpecified: boolean;
    cExportador: string;
    adi: TNFeInfNFeDetProdDIAdi[];
}
export declare enum TNFeInfNFeDetProdDITpViaTransp {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6",
    Item7 = "7",
    Item8 = "8",
    Item9 = "9",
    Item10 = "10",
    Item11 = "11",
    Item12 = "12"
}
export declare enum TNFeInfNFeDetProdDITpIntermedio {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeDetProdDIAdi {
    nAdicao: string;
    nSeqAdic: string;
    cFabricante: string;
    vDescDI: string;
    nDraw: string;
}
export interface TNFeInfNFeDetProdDetExport {
    nDraw: string;
    exportInd: TNFeInfNFeDetProdDetExportExportInd;
}
export interface TNFeInfNFeDetProdDetExportExportInd {
    nRE: string;
    chNFe: string;
    qExport: string;
}
export interface TNFeInfNFeDetProdRastro {
    nLote: string;
    qLote: string;
    dFab: string;
    dVal: string;
    cAgreg: string;
}
export interface TNFeInfNFeDetProdArma {
    tpArma: TNFeInfNFeDetProdArmaTpArma;
    nSerie: string;
    nCano: string;
    descr: string;
}
export declare enum TNFeInfNFeDetProdArmaTpArma {
    Item0 = "0",
    Item1 = "1"
}
export interface TNFeInfNFeDetProdComb {
    cProdANP: string;
    descANP: string;
    pGLP: string;
    pGNn: string;
    pGNi: string;
    vPart: string;
    cODIF: string;
    qTemp: string;
    uFCons: TUf;
    cIDE: TNFeInfNFeDetProdCombCIDE;
    encerrante: TNFeInfNFeDetProdCombEncerrante;
}
export interface TNFeInfNFeDetProdCombCIDE {
    qBCProd: string;
    vAliqProd: string;
    vCIDE: string;
}
export interface TNFeInfNFeDetProdCombEncerrante {
    nBico: string;
    nBomba: string;
    nTanque: string;
    vEncIni: string;
    vEncFin: string;
}
export interface TNFeInfNFeDetProdMed {
    cProdANVISA: string;
    xMotivoIsencao: string;
    vPMC: string;
}
export interface TNFeInfNFeDetProdVeicProd {
    tpOp: TNFeInfNFeDetProdVeicProdTpOp;
    chassi: string;
    cCor: string;
    xCor: string;
    pot: string;
    cilin: string;
    pesoL: string;
    pesoB: string;
    nSerie: string;
    tpComb: string;
    nMotor: string;
    cMT: string;
    dist: string;
    anoMod: string;
    anoFab: string;
    tpPint: string;
    tpVeic: string;
    espVeic: string;
    vIN: TNFeInfNFeDetProdVeicProdVIN;
    condVeic: TNFeInfNFeDetProdVeicProdCondVeic;
    cMod: string;
    cCorDENATRAN: string;
    lota: string;
    tpRest: TNFeInfNFeDetProdVeicProdTpRest;
}
export declare enum TNFeInfNFeDetProdVeicProdTpOp {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetProdVeicProdVIN {
    R = 0,
    N = 1
}
export declare enum TNFeInfNFeDetProdVeicProdCondVeic {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeDetProdDIAdi {
    nAdicao: string;
    nSeqAdic: string;
    cFabricante: string;
    vDescDI: string;
    nDraw: string;
}
export interface TNFeInfNFeDetProdDetExport {
    nDraw: string;
    exportInd: TNFeInfNFeDetProdDetExportExportInd;
}
export interface TNFeInfNFeDetProdDetExportExportInd {
    nRE: string;
    chNFe: string;
    qExport: string;
}
export declare enum TNFeInfNFeDetProdVeicProdTpRest {
    Item0 = "1",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item9 = "9"
}
export interface TNFeInfNFeDetImposto {
    vTotTrib: string;
    ICMS: any;
    PIS: any;
    COFINS: any;
    PISST: any;
    COFINSST: any;
    II: any;
    IPI: any;
    ISSQN: any;
    ICMSUFDest: any;
}
export interface TNFeInfNFeDetImpostoICMS {
    item: object;
}
export interface TNFeInfNFeDetImpostoICMSICMS00 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS00CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS00ModBC;
    vBC: string;
    pICMS: string;
    vICMS: string;
    pFCP: string;
    vFCP: string;
}
export declare enum Torig {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6",
    Item7 = "7",
    Item8 = "8"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS00CST {
    Item00 = "00"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS00ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeDetImpostoICMSICMS10 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS10CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS10ModBC;
    vBC: string;
    pICMS: string;
    vICMS: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
    modBCST: TNFeInfNFeDetImpostoICMSICMS10ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS10CST {
    Item10 = "10"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS10ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS10ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export interface TNFeInfNFeDetImpostoICMSICMS20 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS20CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS20ModBC;
    pRedBC: string;
    vBC: string;
    pICMS: string;
    vICMS: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
    vICMSDeson: string;
    motDesICMS: TNFeInfNFeDetImpostoICMSICMS20MotDesICMS;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS20CST {
    Item20 = "20"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS20ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS20MotDesICMS {
    Item3 = "3",
    Item9 = "9",
    Item12 = "12"
}
export interface TNFeInfNFeDetImpostoICMSICMS30 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS30CST;
    modBCST: TNFeInfNFeDetImpostoICMSICMS30ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    vICMSDeson: string;
    motDesICMS: TNFeInfNFeDetImpostoICMSICMS30MotDesICMS;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS30CST {
    Item30 = "30"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS30ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS30MotDesICMS {
    Item6 = "6",
    Item7 = "7",
    Item9 = "9"
}
export interface TNFeInfNFeDetImpostoICMSICMS40 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS40CST;
    vICMSDeson: string;
    motDesICMS: TNFeInfNFeDetImpostoICMSICMS40MotDesICMS;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS40CST {
    Item40 = "40",
    Item41 = "41",
    Item50 = "50"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS40MotDesICMS {
    Item1 = "1",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6",
    Item7 = "7",
    Item8 = "8",
    Item9 = "9",
    Item10 = "10",
    Item11 = "11",
    Item16 = "16",
    Item90 = "90"
}
export interface TNFeInfNFeDetImpostoICMSICMS51 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS51CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS51ModBC;
    modBCSpecified: boolean;
    pRedBC: string;
    vBC: string;
    pICMS: string;
    vICMSOp: string;
    pDif: string;
    vICMSDif: string;
    vICMS: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS51CST {
    Item51 = "51"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS51ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export interface TNFeInfNFeDetImpostoICMSICMS60 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS60CST;
    vBCSTRet: string;
    pST: string;
    vICMSSubstituto: string;
    vICMSSTRet: string;
    vBCFCPSTRet: string;
    pFCPSTRet: string;
    vFCPSTRet: string;
    pRedBCEfet: string;
    vBCEfet: string;
    pICMSEfet: string;
    vICMSEfet: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS60CST {
    Item60 = "60"
}
export interface TNFeInfNFeDetImpostoICMSICMS70 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS70CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS70ModBC;
    pRedBC: string;
    vBC: string;
    pICMS: string;
    vICMS: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
    modBCST: TNFeInfNFeDetImpostoICMSICMS70ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    vICMSDeson: string;
    motDesICMS: TNFeInfNFeDetImpostoICMSICMS70MotDesICMS;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS70CST {
    Item70 = "70"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS70ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS70ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS70MotDesICMS {
    Item3 = "3",
    Item9 = "9",
    Item12 = "12"
}
export interface TNFeInfNFeDetImpostoICMSICMS90 {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMS90CST;
    modBC: TNFeInfNFeDetImpostoICMSICMS90ModBC;
    vBC: string;
    pRedBC: string;
    pICMS: string;
    vICMS: string;
    vBCFCP: string;
    pFCP: string;
    vFCP: string;
    modBCST: TNFeInfNFeDetImpostoICMSICMS90ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    vICMSDeson: string;
    motDesICMS: TNFeInfNFeDetImpostoICMSICMS90MotDesICMS;
}
export declare enum TNFeInfNFeDetImpostoICMSICMS90CST {
    Item90 = "90"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS90ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS90ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export declare enum TNFeInfNFeDetImpostoICMSICMS90MotDesICMS {
    Item3 = "3",
    Item9 = "9",
    Item12 = "12"
}
export interface TNFeInfNFeDetImpostoICMSICMSPart {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMSPartCST;
    modBC: TNFeInfNFeDetImpostoICMSICMSPartModBC;
    vBC: string;
    pRedBC: string;
    pICMS: string;
    vICMS: string;
    modBCST: TNFeInfNFeDetImpostoICMSICMSPartModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    pBCOp: string;
    UFST: TUf;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSPartCST {
    Item10 = "10",
    Item90 = "90"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSPartModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSPartModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN101 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN101CSOSN;
    pCredSN: string;
    vCredICMSSN: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN101CSOSN {
    Item101 = "101"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN102 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN102CSOSN;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN102CSOSN {
    Item102 = "102",
    Item103 = "103",
    Item300 = "300",
    Item400 = "400"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN201 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN201CSOSN;
    modBCST: TNFeInfNFeDetImpostoICMSICMSSN201ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    pCredSN: string;
    vCredICMSSN: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN201CSOSN {
    Item201 = "201"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN201ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN202 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN202CSOSN;
    modBCST: TNFeInfNFeDetImpostoICMSICMSSN202ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN202CSOSN {
    Item202 = "202",
    Item203 = "203"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN202ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN500 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN500CSOSN;
    vBCSTRet: string;
    pST: string;
    vICMSSubstituto: string;
    vICMSSTRet: string;
    vBCFCPSTRet: string;
    pFCPSTRet: string;
    vFCPSTRet: string;
    pRedBCEfet: string;
    vBCEfet: string;
    pICMSEfet: string;
    vICMSEfet: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN500CSOSN {
    Item500 = "500"
}
export interface TNFeInfNFeDetImpostoICMSICMSSN900 {
    orig: Torig;
    CSOSN: TNFeInfNFeDetImpostoICMSICMSSN900CSOSN;
    modBC: TNFeInfNFeDetImpostoICMSICMSSN900ModBC;
    vBC: string;
    pRedBC: string;
    pICMS: string;
    vICMS: string;
    modBCST: TNFeInfNFeDetImpostoICMSICMSSN900ModBCST;
    pMVAST: string;
    pRedBCST: string;
    vBCST: string;
    pICMSST: string;
    vICMSST: string;
    vBCFCPST: string;
    pFCPST: string;
    vFCPST: string;
    pCredSN: string;
    vCredICMSSN: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN900CSOSN {
    Item900 = "900"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN900ModBC {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3"
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSN900ModBCST {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5"
}
export interface TNFeInfNFeDetImpostoICMSICMSST {
    orig: Torig;
    CST: TNFeInfNFeDetImpostoICMSICMSSTCST;
    vBCSTRet: string;
    pST: string;
    vICMSSubstituto: string;
    vICMSSTRet: string;
    vBCFCPSTRet: string;
    pFCPSTRet: string;
    vFCPSTRet: string;
    vBCSTDest: string;
    vICMSSTDest: string;
    pRedBCEfet: string;
    vBCEfet: string;
    pICMSEfet: string;
    vICMSEfet: string;
}
export declare enum TNFeInfNFeDetImpostoICMSICMSSTCST {
    Item41 = "41",
    Item60 = "60"
}
export interface TNFeInfNFeDetImpostoII {
    vBC: string;
    vDespAdu: string;
    vII: string;
    vIOF: string;
}
export interface TIpi {
    CNPJProd: string;
    cSelo: string;
    qSelo: string;
    cEnq: string;
    IPITrib: TIpiIPITrib;
    item: object;
}
export interface TIpiIPINT {
    CST: TIpiIPINTCST;
}
export declare enum TIpiIPINTCST {
    Item01 = "01",
    Item02 = "02",
    Item03 = "03",
    Item04 = "04",
    Item05 = "05",
    Item51 = "51",
    Item52 = "52",
    Item53 = "53",
    Item54 = "54",
    Item55 = "55"
}
export interface TIpiIPITrib {
    CST: TIpiIPITribCST;
    vBC: number;
    pIPI: number;
    vIPI: number;
    qUnid: number;
    vUnid: number;
}
export declare enum TIpiIPITribCST {
    Item00 = "00",
    Item49 = "49",
    Item50 = "50",
    Item99 = "99"
}
export declare enum ItemsChoiceType {
    pIPI = 0,
    qUnid = 1,
    vBC = 2,
    vUnid = 3
}
export interface TNFeInfNFeDetImpostoISSQN {
    vBC: string;
    vAliq: string;
    vISSQN: string;
    cMunFG: string;
    cListServ: TCListServ;
    vDeducao: string;
    vOutro: string;
    vDescIncond: string;
    vDescCond: string;
    vISSRet: string;
    indISS: TNFeInfNFeDetImpostoISSQNIndISS;
    cServico: string;
    cMun: string;
    cPais: string;
    nProcesso: string;
    indIncentivo: TNFeInfNFeDetImpostoISSQNIndIncentivo;
}
export declare enum TCListServ {
    Item0101 = "01.01",
    Item0102 = "01.02",
    Item0103 = "01.03",
    Item0104 = "01.04",
    Item0105 = "01.05",
    Item0106 = "01.06",
    Item0107 = "01.07",
    Item0108 = "01.08",
    Item0109 = "01.09",
    Item0201 = "02.01",
    Item0302 = "03.02",
    Item0303 = "03.03",
    Item0304 = "03.04",
    Item0305 = "03.05",
    Item0401 = "04.01",
    Item0402 = "04.02",
    Item0403 = "04.03",
    Item0404 = "04.04",
    Item0405 = "04.05",
    Item0406 = "04.06",
    Item0407 = "04.07",
    Item0408 = "04.08",
    Item0409 = "04.09",
    Item0410 = "04.10",
    Item0411 = "04.11",
    Item0412 = "04.12",
    Item0413 = "04.13",
    Item0414 = "04.14",
    Item0415 = "04.15",
    Item0416 = "04.16",
    Item0417 = "04.17",
    Item0418 = "04.18",
    Item0419 = "04.19",
    Item0420 = "04.20",
    Item0421 = "04.21",
    Item0422 = "04.22",
    Item0423 = "04.23",
    Item0501 = "05.01",
    Item0502 = "05.02",
    Item0503 = "05.03",
    Item0504 = "05.04",
    Item0505 = "05.05",
    Item0506 = "05.06",
    Item0507 = "05.07",
    Item0508 = "05.08",
    Item0509 = "05.09",
    Item0601 = "06.01",
    Item0602 = "06.02",
    Item0603 = "06.03",
    Item0604 = "06.04",
    Item0605 = "06.05",
    Item0606 = "06.06",
    Item0701 = "07.01",
    Item0702 = "07.02",
    Item0703 = "07.03",
    Item0704 = "07.04",
    Item0705 = "07.05",
    Item0706 = "07.06",
    Item0707 = "07.07",
    Item0708 = "07.08",
    Item0709 = "07.09",
    Item0710 = "07.10",
    Item0711 = "07.11",
    Item0712 = "07.12",
    Item0713 = "07.13",
    Item0716 = "07.16",
    Item0717 = "07.17",
    Item0718 = "07.18",
    Item0719 = "07.19",
    Item0720 = "07.20",
    Item0721 = "07.21",
    Item0722 = "07.22",
    Item0801 = "08.01",
    Item0802 = "08.02",
    Item0901 = "09.01",
    Item0902 = "09.02",
    Item0903 = "09.03",
    Item1001 = "10.01",
    Item1002 = "10.02",
    Item1003 = "10.03",
    Item1004 = "10.04",
    Item1005 = "10.05",
    Item1006 = "10.06",
    Item1007 = "10.07",
    Item1008 = "10.08",
    Item1009 = "10.09",
    Item1010 = "10.10",
    Item1101 = "11.01",
    Item1102 = "11.02",
    Item1103 = "11.03",
    Item1104 = "11.04",
    Item1201 = "12.01",
    Item1202 = "12.02",
    Item1203 = "12.03",
    Item1204 = "12.04",
    Item1205 = "12.05",
    Item1206 = "12.06",
    Item1207 = "12.07",
    Item1208 = "12.08",
    Item1209 = "12.09",
    Item1210 = "12.10",
    Item1211 = "12.11",
    Item1212 = "12.12",
    Item1213 = "12.13",
    Item1214 = "12.14",
    Item1215 = "12.15",
    Item1216 = "12.16",
    Item1217 = "12.17",
    Item1302 = "13.02",
    Item1303 = "13.03",
    Item1304 = "13.04",
    Item1305 = "13.05",
    Item1401 = "14.01",
    Item1402 = "14.02",
    Item1403 = "14.03",
    Item1404 = "14.04",
    Item1405 = "14.05",
    Item1406 = "14.06",
    Item1407 = "14.07",
    Item1408 = "14.08",
    Item1409 = "14.09",
    Item1410 = "14.10",
    Item1411 = "14.11",
    Item1412 = "14.12",
    Item1413 = "14.13",
    Item1414 = "14.14",
    Item1501 = "15.01",
    Item1502 = "15.02",
    Item1503 = "15.03",
    Item1504 = "15.04",
    Item1505 = "15.05",
    Item1506 = "15.06",
    Item1507 = "15.07",
    Item1508 = "15.08",
    Item1509 = "15.09",
    Item1510 = "15.10",
    Item1511 = "15.11",
    Item1512 = "15.12",
    Item1513 = "15.13",
    Item1514 = "15.14",
    Item1515 = "15.15",
    Item1516 = "15.16",
    Item1517 = "15.17",
    Item1518 = "15.18",
    Item1601 = "16.01",
    Item1602 = "16.02",
    Item1701 = "17.01",
    Item1702 = "17.02",
    Item1703 = "17.03",
    Item1704 = "17.04",
    Item1705 = "17.05",
    Item1706 = "17.06",
    Item1708 = "17.08",
    Item1709 = "17.09",
    Item1710 = "17.10",
    Item1711 = "17.11",
    Item1712 = "17.12",
    Item1713 = "17.13",
    Item1714 = "17.14",
    Item1715 = "17.15",
    Item1716 = "17.16",
    Item1717 = "17.17",
    Item1718 = "17.18",
    Item1719 = "17.19",
    Item1720 = "17.20",
    Item1721 = "17.21",
    Item1722 = "17.22",
    Item1723 = "17.23",
    Item1724 = "17.24",
    Item1725 = "17.25",
    Item1801 = "18.01",
    Item1901 = "19.01",
    Item2001 = "20.01",
    Item2002 = "20.02",
    Item2003 = "20.03",
    Item2101 = "21.01",
    Item2201 = "22.01",
    Item2301 = "23.01",
    Item2401 = "24.01",
    Item2501 = "25.01",
    Item2502 = "25.02",
    Item2503 = "25.03",
    Item2504 = "25.04",
    Item2505 = "25.05",
    Item2601 = "26.01",
    Item2701 = "27.01",
    Item2801 = "28.01",
    Item2901 = "29.01",
    Item3001 = "30.01",
    Item3101 = "31.01",
    Item3201 = "32.01",
    Item3301 = "33.01",
    Item3401 = "34.01",
    Item3501 = "35.01",
    Item3601 = "36.01",
    Item3701 = "37.01",
    Item3801 = "38.01",
    Item3901 = "39.01",
    Item4001 = "40.01"
}
export declare enum TNFeInfNFeDetImpostoISSQNIndISS {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6",
    Item7 = "7"
}
export declare enum TNFeInfNFeDetImpostoISSQNIndIncentivo {
    Item1 = "1",
    Item2 = "2"
}
export interface TNFeInfNFeDetImpostoPIS {
    CST: string;
    vBC: number;
    pPIS: number;
    vPIS: number;
    vBCProd: number;
    qBCProd: number;
    vAliqProd: number;
}
export interface TNFeInfNFeDetImpostoPISPISAliq {
    CST: TNFeInfNFeDetImpostoPISPISAliqCST;
    vBC: string;
    pPIS: string;
    vPIS: string;
}
export declare enum TNFeInfNFeDetImpostoPISPISAliqCST {
    Item01 = "01",
    Item02 = "02"
}
export interface TNFeInfNFeDetImpostoPISPISNT {
    CST: TNFeInfNFeDetImpostoPISPISNTCST;
}
export declare enum TNFeInfNFeDetImpostoPISPISNTCST {
    Item04 = "04",
    Item05 = "05",
    Item06 = "06",
    Item07 = "07",
    Item08 = "08",
    Item09 = "09"
}
export interface TNFeInfNFeDetImpostoPISPISOutr {
    CST: TNFeInfNFeDetImpostoPISPISOutrCST;
    items: string[];
    itemsElementName: ItemsChoiceType1[];
    vPIS: string;
}
export declare enum TNFeInfNFeDetImpostoPISPISOutrCST {
    Item49 = "49",
    Item50 = "50",
    Item51 = "51",
    Item52 = "52",
    Item53 = "53",
    Item54 = "54",
    Item55 = "55",
    Item56 = "56",
    Item60 = "60",
    Item61 = "61",
    Item62 = "62",
    Item63 = "63",
    Item64 = "64",
    Item65 = "65",
    Item66 = "66",
    Item67 = "67",
    Item70 = "70",
    Item71 = "71",
    Item72 = "72",
    Item73 = "73",
    Item74 = "74",
    Item75 = "75",
    Item98 = "98",
    Item99 = "99"
}
export declare enum ItemsChoiceType1 {
    pPIS = 0,
    qBCProd = 1,
    vAliqProd = 2,
    vBC = 3
}
export interface TNFeInfNFeDetImpostoPISPISQtde {
    CST: TNFeInfNFeDetImpostoPISPISQtdeCST;
    qBCProd: string;
    vAliqProd: string;
    vPIS: string;
}
export declare enum TNFeInfNFeDetImpostoPISPISQtdeCST {
    Item03 = "03"
}
export interface TNFeInfNFeDetImpostoPISST {
    vBC: number;
    pPIS: number;
    vPIS: number;
    qBCProd: number;
    vAliqProd: number;
}
export declare enum ItemsChoiceType2 {
    pPIS = 0,
    qBCProd = 1,
    vAliqProd = 2,
    vBC = 3
}
export interface TNFeInfNFeDetImpostoCOFINS {
    CST: string;
    vBC: number;
    pCOFINS: number;
    vCOFINS: number;
    qBCProd: number;
    vAliqProd: number;
}
export interface TNFeInfNFeDetImpostoCOFINSCOFINSAliq {
    CST: TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST;
    vBC: string;
    pCOFINS: string;
    vCOFINS: string;
}
export declare enum TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST {
    Item01 = "01",
    Item02 = "02"
}
export interface TNFeInfNFeDetImpostoCOFINSCOFINSNT {
    CST: TNFeInfNFeDetImpostoCOFINSCOFINSNTCST;
}
export declare enum TNFeInfNFeDetImpostoCOFINSCOFINSNTCST {
    Item04 = "04",
    Item05 = "05",
    Item06 = "06",
    Item07 = "07",
    Item08 = "08",
    Item09 = "09"
}
export interface TNFeInfNFeDetImpostoCOFINSCOFINSOutr {
    CST: TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST;
    items: string[];
    itemsElementName: ItemsChoiceType3[];
    vCOFINS: string;
}
export declare enum TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST {
    Item49 = "49",
    Item50 = "50",
    Item51 = "51",
    Item52 = "52",
    Item53 = "53",
    Item54 = "54",
    Item55 = "55",
    Item56 = "56",
    Item60 = "60",
    Item61 = "62",
    Item62 = "62",
    Item63 = "63",
    Item64 = "64",
    Item65 = "65",
    Item66 = "66",
    Item67 = "67",
    Item70 = "70",
    Item71 = "71",
    Item72 = "72",
    Item73 = "73",
    Item74 = "74",
    Item75 = "75",
    Item98 = "98",
    Item99 = "99"
}
export declare enum ItemsChoiceType3 {
    pCOFINS = 0,
    qBCProd = 1,
    vAliqProd = 2,
    vBC = 3
}
export interface TNFeInfNFeDetImpostoCOFINSCOFINSQtde {
    CST: TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST;
    qBCProd: string;
    vAliqProd: string;
    vCOFINS: string;
}
export declare enum TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST {
    Item03 = "03"
}
export interface TNFeInfNFeDetImpostoCOFINSST {
    vBC: number;
    pCOFINS: number;
    vCOFINS: number;
    qBCProd: number;
    vAliqProd: number;
}
export declare enum ItemsChoiceType4 {
    pCOFINS = 0,
    qBCProd = 1,
    vAliqProd = 2,
    vBC = 3
}
export interface TNFeInfNFeDetImpostoICMSUFDest {
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
export declare enum TNFeInfNFeDetImpostoICMSUFDestPICMSInter {
    Item400 = "4.00",
    Item700 = "7.00",
    Item1200 = "12.00"
}
export interface TNFeInfNFeDetImpostoDevol {
    pDevol: number;
    IPI: TNFeInfNFeDetImpostoDevolIPI;
}
export interface TNFeInfNFeDetImpostoDevolIPI {
    vIPIDevol: number;
}
export interface TNFeInfNFeTotal {
    ICMSTot: TNFeInfNFeTotalICMSTot;
    ISSQNtot: TNFeInfNFeTotalISSQNtot;
    retTrib: TNFeInfNFeTotalRetTrib;
}
export interface TNFeInfNFeTotalICMSTot {
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
export interface TNFeInfNFeTotalISSQNtot {
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
    cRegTrib: TNFeInfNFeTotalISSQNtotCRegTrib;
    cRegTribSpecified: boolean;
}
export declare enum TNFeInfNFeTotalISSQNtotCRegTrib {
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item5 = "5",
    Item6 = "6"
}
export interface TNFeInfNFeTotalRetTrib {
    vRetPIS: string;
    vRetCOFINS: string;
    vRetCSLL: string;
    vBCIRRF: string;
    vIRRF: string;
    vBCRetPrev: string;
    vRetPrev: string;
}
export interface TNFeInfNFeTransp {
    modFrete: TNFeInfNFeTranspModFrete;
    transporta: TNFeInfNFeTranspTransporta;
    retTransp: TNFeInfNFeTranspRetTransp;
    items: object[];
    itemsElementName: ItemsChoiceType5[];
    vol: TNFeInfNFeTranspVol[];
}
export declare enum TNFeInfNFeTranspModFrete {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item4 = "4",
    Item9 = "9"
}
export interface TNFeInfNFeTranspTransporta {
    item: string;
    itemElementName: ItemChoiceType6;
    xNome: string;
    ie: string;
    xEnder: string;
    xMun: string;
    uf: TUf;
    ufSpecified: boolean;
}
export declare enum ItemChoiceType6 {
    CNPJ = 0,
    CPF = 1
}
export interface TNFeInfNFeTranspRetTransp {
    vServ: string;
    vBCRet: string;
    pICMSRet: string;
    vICMSRet: string;
    cFOP: string;
    cMunFG: string;
}
export interface TVeiculo {
    placa: string;
    uf: TUf;
    rNTC: string;
}
export declare enum ItemsChoiceType5 {
    balsa = 0,
    reboque = 1,
    vagao = 2,
    veicTransp = 3
}
export interface TNFeInfNFeTranspVol {
    qVol: string;
    esp: string;
    marca: string;
    nVol: string;
    pesoL: string;
    pesoB: string;
    lacres: TNFeInfNFeTranspVolLacres[];
}
export interface TNFeInfNFeTranspVolLacres {
    nLacre: string;
}
export interface TNFeInfNFeCobr {
    fat: TNFeInfNFeCobrFat;
    dup: TNFeInfNFeCobrDup[];
}
export interface TNFeInfNFeCobrFat {
    nFat: string;
    vOrig: string;
    vDesc: string;
    vLiq: string;
}
export interface TNFeInfNFeCobrDup {
    nDup: string;
    dVenc: string;
    vDup: string;
}
export interface TNFeInfNFePag {
    detPag: TNFeInfNFePagDetPag[];
    vTroco: string;
}
export interface TNFeInfNFePagDetPag {
    indPag: TNFeInfNFePagDetPagIndPag;
    indPagSpecified: boolean;
    tPag: TNFeInfNFePagDetPagTPag;
    vPag: string;
    card: TNFeInfNFePagDetPagCard;
    xPag?: string;
}
export declare enum TNFeInfNFePagDetPagIndPag {
    Item0 = "0",
    Item1 = "1"
}
export declare enum TNFeInfNFePagDetPagTPag {
    Item01 = "01",
    Item02 = "02",
    Item03 = "03",
    Item04 = "04",
    Item05 = "05",
    Item10 = "10",
    Item11 = "11",
    Item12 = "12",
    Item13 = "13",
    Item14 = "14",
    Item15 = "15",
    Item16 = "16",
    Item17 = "17",
    Item18 = "18",
    Item19 = "19",
    Item90 = "90",
    Item99 = "99"
}
export interface TNFeInfNFePagDetPagCard {
    tpIntegra: TNFeInfNFePagDetPagCardTpIntegra;
    CNPJ: string;
    tBand: TNFeInfNFePagDetPagCardTBand;
    tBandSpecified: boolean;
    cAut: string;
}
export declare enum TNFeInfNFePagDetPagCardTpIntegra {
    Item1 = "1",
    Item2 = "2"
}
export declare enum TNFeInfNFePagDetPagCardTBand {
    Item01 = "01",
    Item02 = "02",
    Item03 = "03",
    Item04 = "04",
    Item05 = "05",
    Item06 = "06",
    Item07 = "07",
    Item08 = "08",
    Item09 = "09",
    Item99 = "99"
}
export interface TNFeInfNFeInfAdic {
    infAdFisco: string;
    infCpl: string;
    obsCont: TNFeInfNFeInfAdicObsCont[];
    obsFisco: TNFeInfNFeInfAdicObsFisco[];
    procRef: TNFeInfNFeInfAdicProcRef[];
}
export interface TNFeInfNFeInfAdicObsCont {
    xTexto: string;
    xCampo: string;
}
export interface TNFeInfNFeInfAdicObsFisco {
    xTexto: string;
    xCampo: string;
}
export interface TNFeInfNFeInfAdicProcRef {
    nProc: string;
    indProc: TNFeInfNFeInfAdicProcRefIndProc;
}
export declare enum TNFeInfNFeInfAdicProcRefIndProc {
    Item0 = "0",
    Item1 = "1",
    Item2 = "2",
    Item3 = "3",
    Item9 = "9"
}
export interface TNFeInfNFeExporta {
    uFSaidaPais: TUfEmi;
    xLocExporta: string;
    xLocDespacho: string;
}
export interface TNFeInfNFeCompra {
    xNEmp: string;
    xPed: string;
    xCont: string;
}
export interface TNFeInfNFeCana {
    safra: string;
    ref: string;
    forDia: TNFeInfNFeCanaForDia[];
    qTotMes: string;
    qTotAnt: string;
    qTotGer: string;
    deduc: TNFeInfNFeCanaDeduc[];
    vFor: string;
    vTotDed: string;
    vLiqFor: string;
}
export interface TNFeInfNFeCanaForDia {
    qtde: string;
    dia: string;
}
export interface TNFeInfNFeCanaDeduc {
    xDed: string;
    vDed: string;
}
export interface TInfRespTec {
    CNPJ: string;
    xContato: string;
    email: string;
    fone: string;
    idCSRT: string;
    hashCSRT: string;
}
export interface TNFeInfNFeSupl {
    qrCode: string;
    urlChave: string;
}
export interface SignatureType {
    signedInfo: SignedInfoType;
    signatureValue: SignatureValueType;
    keyInfo: KeyInfoType;
    id: string;
}
export interface SignedInfoType {
    canonicalizationMethod: SignedInfoTypeCanonicalizationMethod;
    signatureMethod: SignedInfoTypeSignatureMethod;
    reference: ReferenceType;
    id: string;
}
export declare class SignedInfoTypeCanonicalizationMethod {
    algorithm: string;
}
export declare class SignedInfoTypeSignatureMethod {
    algorithm: string;
}
export interface ReferenceType {
    transforms: TransformType[];
    digestMethod: ReferenceTypeDigestMethod;
    digestValue: number[];
    id: string;
    uRI: string;
    Type: string;
}
export interface TransformType {
    xPath: string[];
    algorithm: TTransformURI;
}
export declare enum TTransformURI {
    httpwwww3org200009xmldsigenvelopedsignature = "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
    httpwwww3orgTR2001RECxmlc14n20010315 = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
}
export declare class ReferenceTypeDigestMethod {
    algorithm: string;
}
export interface SignatureValueType {
    id: string;
    value: number[];
}
export interface KeyInfoType {
    x509Data: X509DataType;
    id: string;
}
export interface X509DataType {
    x509Certificate: number[];
}
export interface TInutNFe {
    infInut: TInutNFeInfInut;
    _: string;
    signature: SignatureType;
    $: {
        versao: string;
        xmlns: string;
    };
}
export interface TInutNFeInfInut {
    tpAmb: TAmb;
    xServ: string;
    cUF: TCodUfIBGE;
    ano: number;
    CNPJ: string;
    mod: number;
    serie: number;
    nNFIni: number;
    nNFFin: number;
    xJust: string;
    $: {
        Id: string;
    };
}
export declare enum TInutNFeInfInutXServ {
    INUTILIZAR = 0
}
export interface TProcInutNFe {
    inutNFe: TInutNFe;
    retInutNFe: TRetInutNFe;
    $: {
        versao: string;
        xmlns: string;
    };
    _: string;
}
export interface TRetInutNFe {
    infInut: TRetInutNFeInfInut;
    signature: SignatureType;
    $: {
        versao: string;
    };
}
export interface TRetInutNFeInfInut {
    tpAmbField: TAmb;
    verAplicField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    anoField: string;
    cNPJField: string;
    modField: TMod;
    modFieldSpecified: boolean;
    serieField: string;
    nNFIniField: string;
    nNFFinField: string;
    dhRecbtoField: string;
    nProtField: string;
    idField: string;
}
export interface TNfeProc {
    NFe: TNFe;
    protNFe: TProtNFe;
    $: {
        versao: string;
        xmlns: string;
    };
    _: string;
}
export interface TProtNFe {
    infProt: TProtNFeInfProt;
    signature: SignatureType;
    versao: string;
}
export interface TProtNFeInfProt {
    tpAmb: TAmb;
    verAplic: string;
    chNFe: string;
    dhRecbto: string;
    nProt: string;
    digVal: number[];
    cStat: string;
    xMotivo: string;
    cMsg: string;
    xMsg: string;
    Id: string;
}
export interface TRetConsReciNFe {
    tpAmbField: TAmb;
    verAplicField: string;
    nRecField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    dhRecbtoField: string;
    cMsgField: string;
    xMsgField: string;
    protNFeField: TProtNFe[];
    versaoField: string;
}
export interface TRetConsSitNFe {
    tpAmbField: TAmb;
    verAplicField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    dhRecbtoField: string;
    chNFeField: string;
    protNFeField: TProtNFe;
    retCancNFeField: TRetCancNFe;
    procEventoNFeField: TProcEvento[];
    versaoField: TVerConsSitNFe;
}
export interface TRetCancNFe {
    infCancField: TRetCancNFeInfCanc;
    signatureField: SignatureType;
    versaoField: string;
}
export interface TRetCancNFeInfCanc {
    tpAmbField: TAmb;
    verAplicField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    chNFeField: string;
    dhRecbtoField: Date;
    dhRecbtoFieldSpecified: boolean;
    nProtField: string;
    idField: string;
}
export interface TProcEvento {
    $: {
        versao: string;
        xmlns: string;
    };
    _: string;
    retEvento: TRetEvento;
    versao: string;
}
export interface TEvento {
    $: {
        versao: string;
        xmlns: string;
    };
    infEvento: TEventoInfEvento;
    signature: SignatureType;
    versao: string;
}
export interface TEnviEvento {
    $: {
        versao: string;
        xmlns: string;
    };
    idLote: string;
    _: string;
}
export interface TEventoInfEvento {
    $: {
        Id: string;
    };
    cOrgao: TCOrgaoIBGE;
    tpAmb: TAmb;
    CNPJ: string;
    CPF: string;
    item: string;
    itemElementName: ItemChoiceType7;
    chNFe: string;
    dhEvento: string;
    tpEvento: string;
    nSeqEvento: string;
    verEvento: string;
    detEvento: TEventoInfEventoDetEvento;
    id: string;
}
export declare enum TCOrgaoIBGE {
    Item11 = "11",
    Item12 = "12",
    Item13 = "13",
    Item14 = "14",
    Item15 = "15",
    Item16 = "16",
    Item17 = "17",
    Item21 = "21",
    Item22 = "22",
    Item23 = "23",
    Item24 = "24",
    Item25 = "25",
    Item26 = "26",
    Item27 = "27",
    Item28 = "28",
    Item29 = "29",
    Item31 = "31",
    Item32 = "32",
    Item33 = "33",
    Item35 = "35",
    Item41 = "41",
    Item42 = "42",
    Item43 = "43",
    Item50 = "50",
    Item51 = "51",
    Item52 = "52",
    Item53 = "53",
    Item90 = "90",
    Item91 = "91",
    Item92 = "92"
}
export declare enum ItemChoiceType7 {
    CNPJ = 0,
    CPF = 1
}
export interface TEventoInfEventoDetEvento {
    $: {
        versao: string;
    };
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
    vNF: number;
    vICMS: number;
    vST: number;
    idPedidoCancelado: string;
    Any: any[];
    AnyAttrField: any[];
}
export interface TRetEvento {
    infEventoField: TRetEventoInfEvento;
    signatureField: SignatureType;
    versaoField: string;
}
export interface TRetEventoInfEvento {
    tpAmbField: TAmb;
    verAplic: string;
    cOrgao: TCOrgaoIBGE;
    cStat: string;
    xMotivo: string;
    chNFe: string;
    tpEvento: string;
    xEvento: string;
    nSeqEvento: string;
    item: string;
    itemElementName: ItemChoiceType8;
    emailDest: string;
    dhRegEvento: string;
    nProt: string;
    id: string;
}
export declare enum ItemChoiceType8 {
    CNPJDest = 0,
    CPFDest = 1
}
export interface TRetConsStatServ {
    tpAmbField: TAmb;
    verAplicField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    dhRecbtoField: string;
    tMedField: string;
    dhRetornoField: string;
    xObsField: string;
    versaoField: string;
}
export interface TRetEnviNFe {
    tpAmbField: TAmb;
    verAplicField: string;
    cStatField: string;
    xMotivoField: string;
    cUFField: TCodUfIBGE;
    dhRecbtoField: string;
    itemField: object;
    versaoField: string;
}
export interface TRetEnviNFeInfRec {
    nRecField: string;
    tMedField: string;
}
