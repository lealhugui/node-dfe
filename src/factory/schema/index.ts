
/*
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
[System.Xml.Serialization.XmlRootAttribute("consReciNFe", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
*/
export interface TConsReciNFe {

    tpAmb: TAmb;
    nRec: string;
    versao: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TAmb {
  PRD = "1",
  HML = "2"
}
/*
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
[System.Xml.Serialization.XmlRootAttribute("consSitNFe", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
*/
export interface TConsSitNFe {

    tpAmb: TAmb;
    xServ: TConsSitNFeXServ;
    chNFe: string;
    versao: TVerConsSitNFe;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TConsSitNFeXServ {
    CONSULTAR,
}


//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TVerConsSitNFe {
    Item400,
}

//[System.Xml.Serialization.XmlRootAttribute("consStatServ", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
export interface TConsStatServ {

    tpAmb: TAmb;
    cUF: TCodUfIBGE;
    xServ: TConsStatServXServ;
    versao: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TCodUfIBGE {
  Item11="11",
  Item12="12",
  Item13="13",
  Item14="14",
  Item15="15",
  Item16="16",
  Item17="17",
  Item21="21",
  Item22="22",
  Item23="23",
  Item24="24",
  Item25="25",
  Item26="26",
  Item27="27",
  Item28="28",
  Item29="29",
  Item31="31",
  Item32="32",
  Item33="33",
  Item35="35",
  Item41="41",
  Item42="42",
  Item43="43",
  Item50="50",
  Item51="51",
  Item52="52",
  Item53="53",
}

//System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TConsStatServXServ {
    STATUS,
}

/*
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
[System.Xml.Serialization.XmlRootAttribute("enviNFe", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
*/
export interface TEnviNFe {

    idLote: string;
    indSinc: TEnviNFeIndSinc;
    nFe: TNFe[];
    versao: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TEnviNFeIndSinc {
    Item0="0",
    Item1="1",
}

/*
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
[System.Xml.Serialization.XmlRootAttribute("NFe", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
*/
export interface TNFe {

    infNFe: TNFeInfNFe;
    infNFeSupl: TNFeInfNFeSupl;
    //[System.Xml.Serialization.XmlElementAttribute(Namespace="http://www.w3.org/2000/09/xmldsig#")]
    signature: SignatureType;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFe {
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
    cobr: TNFeInfNFeCobr;
    pag: TNFeInfNFePag;
    infAdic: TNFeInfNFeInfAdic;
    exporta: TNFeInfNFeExporta;
    compra: TNFeInfNFeCompra;
    cana: TNFeInfNFeCana;
    infRespTec: TInfRespTec;
    versao: string;
    id: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TMod {
    Item55="55",
    Item65="65",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeTpNF {
    Item0="0",
    Item1="1",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeIdDest {
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeTpImp {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeTpEmis {
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
    Item6="6",
    Item7="7",
    Item9="9",
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TFinNFe {
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeIndFinal {
    Item0="0",
    Item1="1",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeIndPres {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
    Item9="9",
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TProcEmi {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeIdeNFref {
    refCTe?: string;
    refECF?: TNFeInfNFeIdeNFrefRefECF;
    refNF?: TNFeInfNFeIdeNFrefRefNF;
    refNFP?: TNFeInfNFeIdeNFrefRefNFP;
    refNFe?: string;
    itemElementName: ItemChoiceType1;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeIdeNFrefRefECF {
    mod: TNFeInfNFeIdeNFrefRefECFMod;
    nECF: string;
    nCOO: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeNFrefRefECFMod {
    Item2B="2B",
    Item2C="2C",
    Item2D="2D",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeIdeNFrefRefNF {

    cUF_1: TCodUfIBGE;
    aAMM: string;
    cNPJ: string;
    mod: TNFeInfNFeIdeNFrefRefNFMod;
    serie: string;
    nNF: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeNFrefRefNFMod {
    Item01="01",
    Item02="02",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType {
    CNPJ,
    CPF,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeIdeNFrefRefNFPMod {
    Item01="01",
    Item04="04",
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType1 {
    refCTe,
    refECF,
    refNF,
    refNFP,
    refNFe,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeEmit {
    item: string;
    //CPF/CNPJ
    itemElementName: ItemChoiceType2;
    xNome: string;
    xFant: string;
    enderEmit: TEnderEmi;
    ie: string;
    iEST: string;
    im: string;
    cNAE: string;
    cRT: TNFeInfNFeEmitCRT;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType2 {
    CNPJ,
    CPF,
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TEnderEmi {

    xLgr: string;

    nro: string;

    xCpl: string;

    xBairro: string;

    cMun: string;

    xMun: string;

    uf: TUfEmi;

    cEP: string;

    cPais: TEnderEmiCPais;

    cPaisSpecified: boolean;

    xPais: TEnderEmiXPais;

    xPaisSpecified: boolean;

    fone: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TUfEmi {
    AC,
    AL,
    AM,
    AP,
    BA,
    CE,
    DF,
    ES,
    GO,
    MA,
    MG,
    MS,
    MT,
    PA,
    PB,
    PE,
    PI,
    PR,
    RJ,
    RN,
    RO,
    RR,
    RS,
    SC,
    SE,
    SP,
    TO,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TEnderEmiCPais {
    Item1058="1058",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TEnderEmiXPais {
    Brasil,
    BRASIL,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeEmitCRT {

    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDest {

    item: string;
    //CNPJ/CPF/idEstrangeiro
    itemElementName: ItemChoiceType3;

    xNome: string;

    enderDest: TEndereco;

    indIEDest: TNFeInfNFeDestIndIEDest;

    ie: string;

    iSUF: string;

    im: string;

    email: string;

}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType3 {
    CNPJ,
    CPF,
    idEstrangeiro,
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TEndereco {
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
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TUf {
    AC,
    AL,
    AM,
    AP,
    BA,
    CE,
    DF,
    ES,
    GO,
    MA,
    MG,
    MS,
    MT,
    PA,
    PB,
    PE,
    PI,
    PR,
    RJ,
    RN,
    RO,
    RR,
    RS,
    SC,
    SE,
    SP,
    TO,
    EX,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDestIndIEDest {
    Item1="1",
    Item2="2",
    Item9="9",
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType4 {
    CNPJ,
    CPF,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeAutXML {

    item: string;

    itemElementName: ItemChoiceType5;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
export enum ItemChoiceType5 {
    CNPJ,
    CPF,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDet {
    prod: TNFeInfNFeDetProd;
    imposto: TNFeInfNFeDetImposto;
    impostoDevol: TNFeInfNFeDetImpostoDevol;
    infAdProd: string;
    nItem: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProd {
    cProd: string;
    cEAN: string;
    xProd: string;
    nCM: string;
    nVE: string[];
    cEST: string;
    indEscala: TNFeInfNFeDetProdIndEscala;
    indEscalaSpecified: boolean;
    cNPJFab: string;
    cBenef: string;
    eXTIPI: string;
    cFOP: string;
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
    //arma
    //comb
    //med
    //nRECOPI
    //veicProd
    items: object[];
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdIndEscala {
    S,
    N,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdIndTot {
    Item0="0",
    Item1="1",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdDITpViaTransp {
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
    Item6="6",
    Item7="7",
    Item8="8",
    Item9="9",
    Item10="10",
    Item11="11",
    Item12="12",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdDITpIntermedio {
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDIAdi {
    nAdicao: string;
    nSeqAdic: string;
    cFabricante: string;
    vDescDI: string;
    nDraw: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDetExport {
    nDraw: string;
    exportInd: TNFeInfNFeDetProdDetExportExportInd;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDetExportExportInd {
    nRE: string;
    chNFe: string;
    qExport: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdRastro {
    nLote: string;
    qLote: string;
    dFab: string;
    dVal: string;
    cAgreg: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdArma {
    tpArma: TNFeInfNFeDetProdArmaTpArma;
    nSerie: string;
    nCano: string;
    descr: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdArmaTpArma {
    Item0="0",
    Item1="1",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdCombCIDE {
    qBCProd: string;
    vAliqProd: string;
    vCIDE: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdCombEncerrante {
    nBico: string;
    nBomba: string;
    nTanque: string;
    vEncIni: string;
    vEncFin: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdMed {
    cProdANVISA: string;
    xMotivoIsencao: string;
    vPMC: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdVeicProdTpOp {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdVeicProdVIN {
    R,
    N,
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdVeicProdCondVeic {
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDIAdi {
    nAdicao: string;
    nSeqAdic: string;
    cFabricante: string;
    vDescDI: string;
    nDraw: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDetExport {
    nDraw: string;
    exportInd: TNFeInfNFeDetProdDetExportExportInd;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetProdDetExportExportInd {
    nRE: string;
    chNFe: string;    
    qExport: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetProdVeicProdTpRest {
    Item0="1",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item9="9",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImposto {
    
    vTotTrib: string;
    //ICMS
    //II
    //IPI
    //ISSQN
    items: object[];
    
    pIS: TNFeInfNFeDetImpostoPIS;
    
    pISST: TNFeInfNFeDetImpostoPISST;
    
    cOFINS: TNFeInfNFeDetImpostoCOFINS;
    
    cOFINSST: TNFeInfNFeDetImpostoCOFINSST;
    
    iCMSUFDest: TNFeInfNFeDetImpostoICMSUFDest;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMS {
    /*
    ICMS00
    ICMS10
    ICMS20
    ICMS30
    ICMS40
    ICMS51
    ICMS60
    ICMS70
    ICMS90
    ICMSPart
    ICMSSN101
    ICMSSN102
    ICMSSN201
    ICMSSN202
    ICMSSN500
    ICMSSN900
    ICMSST
    */
    item: object;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMSICMS00 {
    
    orig: Torig;
    
    cST: TNFeInfNFeDetImpostoICMSICMS00CST;
    
    modBC: TNFeInfNFeDetImpostoICMSICMS00ModBC;
    
    vBC: string;
    
    pICMS: string;
    
    vICMS: string;
    
    pFCP: string;
    
    vFCP: string;
}

//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum Torig {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
    Item6="6",
    Item7="7",
    Item8="8",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS00CST {
    Item00="00",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS00ModBC {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMSICMS10 {
    orig: Torig;
    cST: TNFeInfNFeDetImpostoICMSICMS10CST;
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS10CST {
    Item10="10",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS10ModBC {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS10ModBCST {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMSICMS20 {    
    orig: Torig;
    cST: TNFeInfNFeDetImpostoICMSICMS20CST;
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


export enum TNFeInfNFeDetImpostoICMSICMS20CST {
    Item20="20",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS20ModBC {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS20MotDesICMS {
    Item3="3",
    Item9="9",
    Item12="12",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMSICMS30 {    
    orig: Torig;    
    cST: TNFeInfNFeDetImpostoICMSICMS30CST;
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

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS30CST {
    Item30="30",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS30ModBCST {
    Item0="0",
    Item1="1",
    Item2="2",
    Item3="3",
    Item4="4",
    Item5="5",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS30MotDesICMS {
    Item6="6",
    Item7="7",
    Item9="9",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export interface TNFeInfNFeDetImpostoICMSICMS40 {
    origField: Torig;
    cSTField: TNFeInfNFeDetImpostoICMSICMS40CST;
    vICMSDesonField: string;
    motDesICMSField: TNFeInfNFeDetImpostoICMSICMS40MotDesICMS;
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS40CST {
    Item40="40",
    Item41="41",
    Item50="50",
}

//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TNFeInfNFeDetImpostoICMSICMS40MotDesICMS {
    Item1="1",
    Item3="3",
    Item4="4",
    Item5="5",
    Item6="6",
    Item7="7",
    Item8="8",
    Item9="9",
    Item10="10",
    Item11="11",
    Item16="16",
    Item90="90",
}