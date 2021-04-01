"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemChoiceType8 = exports.ItemChoiceType7 = exports.TCOrgaoIBGE = exports.TInutNFeInfInutXServ = exports.ReferenceTypeDigestMethod = exports.TTransformURI = exports.SignedInfoTypeSignatureMethod = exports.SignedInfoTypeCanonicalizationMethod = exports.TNFeInfNFeInfAdicProcRefIndProc = exports.TNFeInfNFePagDetPagCardTBand = exports.TNFeInfNFePagDetPagCardTpIntegra = exports.TNFeInfNFePagDetPagTPag = exports.TNFeInfNFePagDetPagIndPag = exports.ItemsChoiceType5 = exports.ItemChoiceType6 = exports.TNFeInfNFeTranspModFrete = exports.TNFeInfNFeTotalISSQNtotCRegTrib = exports.TNFeInfNFeDetImpostoICMSUFDestPICMSInter = exports.ItemsChoiceType4 = exports.TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST = exports.ItemsChoiceType3 = exports.TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSNTCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST = exports.ItemsChoiceType2 = exports.TNFeInfNFeDetImpostoPISPISQtdeCST = exports.ItemsChoiceType1 = exports.TNFeInfNFeDetImpostoPISPISOutrCST = exports.TNFeInfNFeDetImpostoPISPISNTCST = exports.TNFeInfNFeDetImpostoPISPISAliqCST = exports.TNFeInfNFeDetImpostoISSQNIndIncentivo = exports.TNFeInfNFeDetImpostoISSQNIndISS = exports.TCListServ = exports.ItemsChoiceType = exports.TIpiIPITribCST = exports.TIpiIPINTCST = exports.TNFeInfNFeDetImpostoICMSICMSSTCST = exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBC = exports.TNFeInfNFeDetImpostoICMSICMSSN900CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN500CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN202ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN202CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN201ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN201CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN102CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN101CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSPartModBCST = exports.TNFeInfNFeDetImpostoICMSICMSPartModBC = exports.TNFeInfNFeDetImpostoICMSICMSPartCST = exports.TNFeInfNFeDetImpostoICMSICMS90MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS90ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS90ModBC = exports.TNFeInfNFeDetImpostoICMSICMS90CST = exports.TNFeInfNFeDetImpostoICMSICMS70MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS70ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS70ModBC = exports.TNFeInfNFeDetImpostoICMSICMS70CST = exports.TNFeInfNFeDetImpostoICMSICMS60CST = exports.TNFeInfNFeDetImpostoICMSICMS51ModBC = exports.TNFeInfNFeDetImpostoICMSICMS51CST = exports.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS40CST = exports.TNFeInfNFeDetImpostoICMSICMS30MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS30ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS30CST = exports.TNFeInfNFeDetImpostoICMSICMS20MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS20ModBC = exports.TNFeInfNFeDetImpostoICMSICMS20CST = exports.TNFeInfNFeDetImpostoICMSICMS10ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS10ModBC = exports.TNFeInfNFeDetImpostoICMSICMS10CST = exports.TNFeInfNFeDetImpostoICMSICMS00ModBC = exports.TNFeInfNFeDetImpostoICMSICMS00CST = exports.Torig = exports.TNFeInfNFeDetProdVeicProdTpRest = exports.TNFeInfNFeDetProdVeicProdCondVeic = exports.TNFeInfNFeDetProdVeicProdVIN = exports.TNFeInfNFeDetProdVeicProdTpOp = exports.TNFeInfNFeDetProdArmaTpArma = exports.TNFeInfNFeDetProdDITpIntermedio = exports.TNFeInfNFeDetProdDITpViaTransp = exports.TNFeInfNFeDetProdIndTot = exports.TNFeInfNFeDetProdIndEscala = exports.ItemChoiceType5 = exports.ItemChoiceType4 = exports.TNFeInfNFeDestIndIEDest = exports.TUf = exports.ItemChoiceType3 = exports.TNFeInfNFeEmitCRT = exports.TEnderEmiXPais = exports.TEnderEmiCPais = exports.TUfEmi = exports.ItemChoiceType2 = exports.ItemChoiceType1 = exports.TNFeInfNFeIdeNFrefRefNFPMod = exports.ItemChoiceType = exports.TNFeInfNFeIdeNFrefRefNFMod = exports.TNFeInfNFeIdeNFrefRefECFMod = exports.TProcEmi = exports.TNFeInfNFeIdeIndPres = exports.TNFeInfNFeIdeIndFinal = exports.TFinNFe = exports.TNFeInfNFeIdeTpEmis = exports.TNFeInfNFeIdeTpImp = exports.TNFeInfNFeIdeIdDest = exports.TNFeInfNFeIdeTpNF = exports.TMod = exports.TNFeInfNFeIdeIndIntermed = exports.TEnviNFeIndSinc = exports.TConsStatServXServ = exports.TCodUfIBGE = exports.TVerConsSitNFe = exports.TConsSitNFeXServ = exports.TAmb = void 0;
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TAmb;
(function (TAmb) {
    TAmb["PRD"] = "1";
    TAmb["HML"] = "2";
})(TAmb = exports.TAmb || (exports.TAmb = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TConsSitNFeXServ;
(function (TConsSitNFeXServ) {
    TConsSitNFeXServ[TConsSitNFeXServ["CONSULTAR"] = 0] = "CONSULTAR";
})(TConsSitNFeXServ = exports.TConsSitNFeXServ || (exports.TConsSitNFeXServ = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TVerConsSitNFe;
(function (TVerConsSitNFe) {
    TVerConsSitNFe[TVerConsSitNFe["Item400"] = 0] = "Item400";
})(TVerConsSitNFe = exports.TVerConsSitNFe || (exports.TVerConsSitNFe = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TCodUfIBGE;
(function (TCodUfIBGE) {
    TCodUfIBGE["Item11"] = "11";
    TCodUfIBGE["Item12"] = "12";
    TCodUfIBGE["Item13"] = "13";
    TCodUfIBGE["Item14"] = "14";
    TCodUfIBGE["Item15"] = "15";
    TCodUfIBGE["Item16"] = "16";
    TCodUfIBGE["Item17"] = "17";
    TCodUfIBGE["Item21"] = "21";
    TCodUfIBGE["Item22"] = "22";
    TCodUfIBGE["Item23"] = "23";
    TCodUfIBGE["Item24"] = "24";
    TCodUfIBGE["Item25"] = "25";
    TCodUfIBGE["Item26"] = "26";
    TCodUfIBGE["Item27"] = "27";
    TCodUfIBGE["Item28"] = "28";
    TCodUfIBGE["Item29"] = "29";
    TCodUfIBGE["Item31"] = "31";
    TCodUfIBGE["Item32"] = "32";
    TCodUfIBGE["Item33"] = "33";
    TCodUfIBGE["Item35"] = "35";
    TCodUfIBGE["Item41"] = "41";
    TCodUfIBGE["Item42"] = "42";
    TCodUfIBGE["Item43"] = "43";
    TCodUfIBGE["Item50"] = "50";
    TCodUfIBGE["Item51"] = "51";
    TCodUfIBGE["Item52"] = "52";
    TCodUfIBGE["Item53"] = "53";
})(TCodUfIBGE = exports.TCodUfIBGE || (exports.TCodUfIBGE = {}));
//System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TConsStatServXServ;
(function (TConsStatServXServ) {
    TConsStatServXServ["STATUS"] = "STATUS";
})(TConsStatServXServ = exports.TConsStatServXServ || (exports.TConsStatServXServ = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TEnviNFeIndSinc;
(function (TEnviNFeIndSinc) {
    TEnviNFeIndSinc["Item0"] = "0";
    TEnviNFeIndSinc["Item1"] = "1";
})(TEnviNFeIndSinc = exports.TEnviNFeIndSinc || (exports.TEnviNFeIndSinc = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeIndIntermed;
(function (TNFeInfNFeIdeIndIntermed) {
    TNFeInfNFeIdeIndIntermed["Item0"] = "0";
    TNFeInfNFeIdeIndIntermed["Item1"] = "1";
    TNFeInfNFeIdeIndIntermed["Item2"] = "2";
    TNFeInfNFeIdeIndIntermed["Item3"] = "3";
    TNFeInfNFeIdeIndIntermed["Item4"] = "4";
    TNFeInfNFeIdeIndIntermed["Item9"] = "9";
})(TNFeInfNFeIdeIndIntermed = exports.TNFeInfNFeIdeIndIntermed || (exports.TNFeInfNFeIdeIndIntermed = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TMod;
(function (TMod) {
    TMod["Item55"] = "55";
    TMod["Item65"] = "65";
})(TMod = exports.TMod || (exports.TMod = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeTpNF;
(function (TNFeInfNFeIdeTpNF) {
    TNFeInfNFeIdeTpNF["Item0"] = "0";
    TNFeInfNFeIdeTpNF["Item1"] = "1";
})(TNFeInfNFeIdeTpNF = exports.TNFeInfNFeIdeTpNF || (exports.TNFeInfNFeIdeTpNF = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeIdDest;
(function (TNFeInfNFeIdeIdDest) {
    TNFeInfNFeIdeIdDest["Item1"] = "1";
    TNFeInfNFeIdeIdDest["Item2"] = "2";
    TNFeInfNFeIdeIdDest["Item3"] = "3";
})(TNFeInfNFeIdeIdDest = exports.TNFeInfNFeIdeIdDest || (exports.TNFeInfNFeIdeIdDest = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeTpImp;
(function (TNFeInfNFeIdeTpImp) {
    TNFeInfNFeIdeTpImp["Item0"] = "0";
    TNFeInfNFeIdeTpImp["Item1"] = "1";
    TNFeInfNFeIdeTpImp["Item2"] = "2";
    TNFeInfNFeIdeTpImp["Item3"] = "3";
    TNFeInfNFeIdeTpImp["Item4"] = "4";
    TNFeInfNFeIdeTpImp["Item5"] = "5";
})(TNFeInfNFeIdeTpImp = exports.TNFeInfNFeIdeTpImp || (exports.TNFeInfNFeIdeTpImp = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeTpEmis;
(function (TNFeInfNFeIdeTpEmis) {
    TNFeInfNFeIdeTpEmis["Item1"] = "1";
    TNFeInfNFeIdeTpEmis["Item2"] = "2";
    TNFeInfNFeIdeTpEmis["Item3"] = "3";
    TNFeInfNFeIdeTpEmis["Item4"] = "4";
    TNFeInfNFeIdeTpEmis["Item5"] = "5";
    TNFeInfNFeIdeTpEmis["Item6"] = "6";
    TNFeInfNFeIdeTpEmis["Item7"] = "7";
    TNFeInfNFeIdeTpEmis["Item9"] = "9";
})(TNFeInfNFeIdeTpEmis = exports.TNFeInfNFeIdeTpEmis || (exports.TNFeInfNFeIdeTpEmis = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TFinNFe;
(function (TFinNFe) {
    TFinNFe["Item1"] = "1";
    TFinNFe["Item2"] = "2";
    TFinNFe["Item3"] = "3";
    TFinNFe["Item4"] = "4";
})(TFinNFe = exports.TFinNFe || (exports.TFinNFe = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeIndFinal;
(function (TNFeInfNFeIdeIndFinal) {
    TNFeInfNFeIdeIndFinal["Item0"] = "0";
    TNFeInfNFeIdeIndFinal["Item1"] = "1";
})(TNFeInfNFeIdeIndFinal = exports.TNFeInfNFeIdeIndFinal || (exports.TNFeInfNFeIdeIndFinal = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeIndPres;
(function (TNFeInfNFeIdeIndPres) {
    TNFeInfNFeIdeIndPres["Item0"] = "0";
    TNFeInfNFeIdeIndPres["Item1"] = "1";
    TNFeInfNFeIdeIndPres["Item2"] = "2";
    TNFeInfNFeIdeIndPres["Item3"] = "3";
    TNFeInfNFeIdeIndPres["Item4"] = "4";
    TNFeInfNFeIdeIndPres["Item5"] = "5";
    TNFeInfNFeIdeIndPres["Item9"] = "9";
})(TNFeInfNFeIdeIndPres = exports.TNFeInfNFeIdeIndPres || (exports.TNFeInfNFeIdeIndPres = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TProcEmi;
(function (TProcEmi) {
    TProcEmi["Item0"] = "0";
    TProcEmi["Item1"] = "1";
    TProcEmi["Item2"] = "2";
    TProcEmi["Item3"] = "3";
})(TProcEmi = exports.TProcEmi || (exports.TProcEmi = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeNFrefRefECFMod;
(function (TNFeInfNFeIdeNFrefRefECFMod) {
    TNFeInfNFeIdeNFrefRefECFMod["Item2B"] = "2B";
    TNFeInfNFeIdeNFrefRefECFMod["Item2C"] = "2C";
    TNFeInfNFeIdeNFrefRefECFMod["Item2D"] = "2D";
})(TNFeInfNFeIdeNFrefRefECFMod = exports.TNFeInfNFeIdeNFrefRefECFMod || (exports.TNFeInfNFeIdeNFrefRefECFMod = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeNFrefRefNFMod;
(function (TNFeInfNFeIdeNFrefRefNFMod) {
    TNFeInfNFeIdeNFrefRefNFMod["Item01"] = "01";
    TNFeInfNFeIdeNFrefRefNFMod["Item02"] = "02";
})(TNFeInfNFeIdeNFrefRefNFMod = exports.TNFeInfNFeIdeNFrefRefNFMod || (exports.TNFeInfNFeIdeNFrefRefNFMod = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType;
(function (ItemChoiceType) {
    ItemChoiceType[ItemChoiceType["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType[ItemChoiceType["CPF"] = 1] = "CPF";
})(ItemChoiceType = exports.ItemChoiceType || (exports.ItemChoiceType = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeIdeNFrefRefNFPMod;
(function (TNFeInfNFeIdeNFrefRefNFPMod) {
    TNFeInfNFeIdeNFrefRefNFPMod["Item01"] = "01";
    TNFeInfNFeIdeNFrefRefNFPMod["Item04"] = "04";
})(TNFeInfNFeIdeNFrefRefNFPMod = exports.TNFeInfNFeIdeNFrefRefNFPMod || (exports.TNFeInfNFeIdeNFrefRefNFPMod = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType1;
(function (ItemChoiceType1) {
    ItemChoiceType1[ItemChoiceType1["refCTe"] = 0] = "refCTe";
    ItemChoiceType1[ItemChoiceType1["refECF"] = 1] = "refECF";
    ItemChoiceType1[ItemChoiceType1["refNF"] = 2] = "refNF";
    ItemChoiceType1[ItemChoiceType1["refNFP"] = 3] = "refNFP";
    ItemChoiceType1[ItemChoiceType1["refNFe"] = 4] = "refNFe";
})(ItemChoiceType1 = exports.ItemChoiceType1 || (exports.ItemChoiceType1 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType2;
(function (ItemChoiceType2) {
    ItemChoiceType2[ItemChoiceType2["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType2[ItemChoiceType2["CPF"] = 1] = "CPF";
})(ItemChoiceType2 = exports.ItemChoiceType2 || (exports.ItemChoiceType2 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TUfEmi;
(function (TUfEmi) {
    TUfEmi["AC"] = "AC";
    TUfEmi["AL"] = "AL";
    TUfEmi["AM"] = "AM";
    TUfEmi["AP"] = "AP";
    TUfEmi["BA"] = "BA";
    TUfEmi["CE"] = "CE";
    TUfEmi["DF"] = "DF";
    TUfEmi["ES"] = "ES";
    TUfEmi["GO"] = "GO";
    TUfEmi["MA"] = "MA";
    TUfEmi["MG"] = "MG";
    TUfEmi["MS"] = "MS";
    TUfEmi["MT"] = "MT";
    TUfEmi["PA"] = "PA";
    TUfEmi["PB"] = "PB";
    TUfEmi["PE"] = "PE";
    TUfEmi["PI"] = "PI";
    TUfEmi["PR"] = "PR";
    TUfEmi["RJ"] = "RJ";
    TUfEmi["RN"] = "RN";
    TUfEmi["RO"] = "RO";
    TUfEmi["RR"] = "RR";
    TUfEmi["RS"] = "RS";
    TUfEmi["SC"] = "SC";
    TUfEmi["SE"] = "SE";
    TUfEmi["SP"] = "SP";
    TUfEmi["TO"] = "TO";
})(TUfEmi = exports.TUfEmi || (exports.TUfEmi = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TEnderEmiCPais;
(function (TEnderEmiCPais) {
    TEnderEmiCPais["Item1058"] = "1058";
})(TEnderEmiCPais = exports.TEnderEmiCPais || (exports.TEnderEmiCPais = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TEnderEmiXPais;
(function (TEnderEmiXPais) {
    TEnderEmiXPais["Brasil"] = "Brasil";
    TEnderEmiXPais["BRASIL"] = "BRASIL";
})(TEnderEmiXPais = exports.TEnderEmiXPais || (exports.TEnderEmiXPais = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeEmitCRT;
(function (TNFeInfNFeEmitCRT) {
    TNFeInfNFeEmitCRT["Item1"] = "1";
    TNFeInfNFeEmitCRT["Item2"] = "2";
    TNFeInfNFeEmitCRT["Item3"] = "3";
})(TNFeInfNFeEmitCRT = exports.TNFeInfNFeEmitCRT || (exports.TNFeInfNFeEmitCRT = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType3;
(function (ItemChoiceType3) {
    ItemChoiceType3[ItemChoiceType3["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType3[ItemChoiceType3["CPF"] = 1] = "CPF";
    ItemChoiceType3[ItemChoiceType3["idEstrangeiro"] = 2] = "idEstrangeiro";
})(ItemChoiceType3 = exports.ItemChoiceType3 || (exports.ItemChoiceType3 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TUf;
(function (TUf) {
    TUf["AC"] = "AC";
    TUf["AL"] = "AL";
    TUf["AM"] = "AM";
    TUf["AP"] = "AP";
    TUf["BA"] = "BA";
    TUf["CE"] = "CE";
    TUf["DF"] = "DF";
    TUf["ES"] = "ES";
    TUf["GO"] = "GO";
    TUf["MA"] = "MA";
    TUf["MG"] = "MG";
    TUf["MS"] = "MS";
    TUf["MT"] = "MT";
    TUf["PA"] = "PA";
    TUf["PB"] = "PB";
    TUf["PE"] = "PE";
    TUf["PI"] = "PI";
    TUf["PR"] = "PR";
    TUf["RJ"] = "RJ";
    TUf["RN"] = "RN";
    TUf["RO"] = "RO";
    TUf["RR"] = "RR";
    TUf["RS"] = "RS";
    TUf["SC"] = "SC";
    TUf["SE"] = "SE";
    TUf["SP"] = "SP";
    TUf["TO"] = "TO";
    TUf["EX"] = "EX";
})(TUf = exports.TUf || (exports.TUf = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDestIndIEDest;
(function (TNFeInfNFeDestIndIEDest) {
    TNFeInfNFeDestIndIEDest["Item1"] = "1";
    TNFeInfNFeDestIndIEDest["Item2"] = "2";
    TNFeInfNFeDestIndIEDest["Item9"] = "9";
})(TNFeInfNFeDestIndIEDest = exports.TNFeInfNFeDestIndIEDest || (exports.TNFeInfNFeDestIndIEDest = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType4;
(function (ItemChoiceType4) {
    ItemChoiceType4[ItemChoiceType4["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType4[ItemChoiceType4["CPF"] = 1] = "CPF";
})(ItemChoiceType4 = exports.ItemChoiceType4 || (exports.ItemChoiceType4 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType5;
(function (ItemChoiceType5) {
    ItemChoiceType5[ItemChoiceType5["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType5[ItemChoiceType5["CPF"] = 1] = "CPF";
})(ItemChoiceType5 = exports.ItemChoiceType5 || (exports.ItemChoiceType5 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdIndEscala;
(function (TNFeInfNFeDetProdIndEscala) {
    TNFeInfNFeDetProdIndEscala[TNFeInfNFeDetProdIndEscala["S"] = 0] = "S";
    TNFeInfNFeDetProdIndEscala[TNFeInfNFeDetProdIndEscala["N"] = 1] = "N";
})(TNFeInfNFeDetProdIndEscala = exports.TNFeInfNFeDetProdIndEscala || (exports.TNFeInfNFeDetProdIndEscala = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdIndTot;
(function (TNFeInfNFeDetProdIndTot) {
    TNFeInfNFeDetProdIndTot["Item0"] = "0";
    TNFeInfNFeDetProdIndTot["Item1"] = "1";
})(TNFeInfNFeDetProdIndTot = exports.TNFeInfNFeDetProdIndTot || (exports.TNFeInfNFeDetProdIndTot = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdDITpViaTransp;
(function (TNFeInfNFeDetProdDITpViaTransp) {
    TNFeInfNFeDetProdDITpViaTransp["Item1"] = "1";
    TNFeInfNFeDetProdDITpViaTransp["Item2"] = "2";
    TNFeInfNFeDetProdDITpViaTransp["Item3"] = "3";
    TNFeInfNFeDetProdDITpViaTransp["Item4"] = "4";
    TNFeInfNFeDetProdDITpViaTransp["Item5"] = "5";
    TNFeInfNFeDetProdDITpViaTransp["Item6"] = "6";
    TNFeInfNFeDetProdDITpViaTransp["Item7"] = "7";
    TNFeInfNFeDetProdDITpViaTransp["Item8"] = "8";
    TNFeInfNFeDetProdDITpViaTransp["Item9"] = "9";
    TNFeInfNFeDetProdDITpViaTransp["Item10"] = "10";
    TNFeInfNFeDetProdDITpViaTransp["Item11"] = "11";
    TNFeInfNFeDetProdDITpViaTransp["Item12"] = "12";
})(TNFeInfNFeDetProdDITpViaTransp = exports.TNFeInfNFeDetProdDITpViaTransp || (exports.TNFeInfNFeDetProdDITpViaTransp = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdDITpIntermedio;
(function (TNFeInfNFeDetProdDITpIntermedio) {
    TNFeInfNFeDetProdDITpIntermedio["Item1"] = "1";
    TNFeInfNFeDetProdDITpIntermedio["Item2"] = "2";
    TNFeInfNFeDetProdDITpIntermedio["Item3"] = "3";
})(TNFeInfNFeDetProdDITpIntermedio = exports.TNFeInfNFeDetProdDITpIntermedio || (exports.TNFeInfNFeDetProdDITpIntermedio = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdArmaTpArma;
(function (TNFeInfNFeDetProdArmaTpArma) {
    TNFeInfNFeDetProdArmaTpArma["Item0"] = "0";
    TNFeInfNFeDetProdArmaTpArma["Item1"] = "1";
})(TNFeInfNFeDetProdArmaTpArma = exports.TNFeInfNFeDetProdArmaTpArma || (exports.TNFeInfNFeDetProdArmaTpArma = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdVeicProdTpOp;
(function (TNFeInfNFeDetProdVeicProdTpOp) {
    TNFeInfNFeDetProdVeicProdTpOp["Item0"] = "0";
    TNFeInfNFeDetProdVeicProdTpOp["Item1"] = "1";
    TNFeInfNFeDetProdVeicProdTpOp["Item2"] = "2";
    TNFeInfNFeDetProdVeicProdTpOp["Item3"] = "3";
})(TNFeInfNFeDetProdVeicProdTpOp = exports.TNFeInfNFeDetProdVeicProdTpOp || (exports.TNFeInfNFeDetProdVeicProdTpOp = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdVeicProdVIN;
(function (TNFeInfNFeDetProdVeicProdVIN) {
    TNFeInfNFeDetProdVeicProdVIN[TNFeInfNFeDetProdVeicProdVIN["R"] = 0] = "R";
    TNFeInfNFeDetProdVeicProdVIN[TNFeInfNFeDetProdVeicProdVIN["N"] = 1] = "N";
})(TNFeInfNFeDetProdVeicProdVIN = exports.TNFeInfNFeDetProdVeicProdVIN || (exports.TNFeInfNFeDetProdVeicProdVIN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdVeicProdCondVeic;
(function (TNFeInfNFeDetProdVeicProdCondVeic) {
    TNFeInfNFeDetProdVeicProdCondVeic["Item1"] = "1";
    TNFeInfNFeDetProdVeicProdCondVeic["Item2"] = "2";
    TNFeInfNFeDetProdVeicProdCondVeic["Item3"] = "3";
})(TNFeInfNFeDetProdVeicProdCondVeic = exports.TNFeInfNFeDetProdVeicProdCondVeic || (exports.TNFeInfNFeDetProdVeicProdCondVeic = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetProdVeicProdTpRest;
(function (TNFeInfNFeDetProdVeicProdTpRest) {
    TNFeInfNFeDetProdVeicProdTpRest["Item0"] = "1";
    TNFeInfNFeDetProdVeicProdTpRest["Item1"] = "1";
    TNFeInfNFeDetProdVeicProdTpRest["Item2"] = "2";
    TNFeInfNFeDetProdVeicProdTpRest["Item3"] = "3";
    TNFeInfNFeDetProdVeicProdTpRest["Item4"] = "4";
    TNFeInfNFeDetProdVeicProdTpRest["Item9"] = "9";
})(TNFeInfNFeDetProdVeicProdTpRest = exports.TNFeInfNFeDetProdVeicProdTpRest || (exports.TNFeInfNFeDetProdVeicProdTpRest = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var Torig;
(function (Torig) {
    Torig["Item0"] = "0";
    Torig["Item1"] = "1";
    Torig["Item2"] = "2";
    Torig["Item3"] = "3";
    Torig["Item4"] = "4";
    Torig["Item5"] = "5";
    Torig["Item6"] = "6";
    Torig["Item7"] = "7";
    Torig["Item8"] = "8";
})(Torig = exports.Torig || (exports.Torig = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS00CST;
(function (TNFeInfNFeDetImpostoICMSICMS00CST) {
    TNFeInfNFeDetImpostoICMSICMS00CST["Item00"] = "00";
})(TNFeInfNFeDetImpostoICMSICMS00CST = exports.TNFeInfNFeDetImpostoICMSICMS00CST || (exports.TNFeInfNFeDetImpostoICMSICMS00CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS00ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS00ModBC) {
    TNFeInfNFeDetImpostoICMSICMS00ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS00ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS00ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS00ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS00ModBC = exports.TNFeInfNFeDetImpostoICMSICMS00ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS00ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS10CST;
(function (TNFeInfNFeDetImpostoICMSICMS10CST) {
    TNFeInfNFeDetImpostoICMSICMS10CST["Item10"] = "10";
})(TNFeInfNFeDetImpostoICMSICMS10CST = exports.TNFeInfNFeDetImpostoICMSICMS10CST || (exports.TNFeInfNFeDetImpostoICMSICMS10CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS10ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS10ModBC) {
    TNFeInfNFeDetImpostoICMSICMS10ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS10ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS10ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS10ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS10ModBC = exports.TNFeInfNFeDetImpostoICMSICMS10ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS10ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS10ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMS10ModBCST) {
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMS10ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMS10ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS10ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMS10ModBCST = {}));
var TNFeInfNFeDetImpostoICMSICMS20CST;
(function (TNFeInfNFeDetImpostoICMSICMS20CST) {
    TNFeInfNFeDetImpostoICMSICMS20CST["Item20"] = "20";
})(TNFeInfNFeDetImpostoICMSICMS20CST = exports.TNFeInfNFeDetImpostoICMSICMS20CST || (exports.TNFeInfNFeDetImpostoICMSICMS20CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS20ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS20ModBC) {
    TNFeInfNFeDetImpostoICMSICMS20ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS20ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS20ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS20ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS20ModBC = exports.TNFeInfNFeDetImpostoICMSICMS20ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS20ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS20MotDesICMS;
(function (TNFeInfNFeDetImpostoICMSICMS20MotDesICMS) {
    TNFeInfNFeDetImpostoICMSICMS20MotDesICMS["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS20MotDesICMS["Item9"] = "9";
    TNFeInfNFeDetImpostoICMSICMS20MotDesICMS["Item12"] = "12";
})(TNFeInfNFeDetImpostoICMSICMS20MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS20MotDesICMS || (exports.TNFeInfNFeDetImpostoICMSICMS20MotDesICMS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS30CST;
(function (TNFeInfNFeDetImpostoICMSICMS30CST) {
    TNFeInfNFeDetImpostoICMSICMS30CST["Item30"] = "30";
})(TNFeInfNFeDetImpostoICMSICMS30CST = exports.TNFeInfNFeDetImpostoICMSICMS30CST || (exports.TNFeInfNFeDetImpostoICMSICMS30CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS30ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMS30ModBCST) {
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMS30ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMS30ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS30ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMS30ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS30MotDesICMS;
(function (TNFeInfNFeDetImpostoICMSICMS30MotDesICMS) {
    TNFeInfNFeDetImpostoICMSICMS30MotDesICMS["Item6"] = "6";
    TNFeInfNFeDetImpostoICMSICMS30MotDesICMS["Item7"] = "7";
    TNFeInfNFeDetImpostoICMSICMS30MotDesICMS["Item9"] = "9";
})(TNFeInfNFeDetImpostoICMSICMS30MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS30MotDesICMS || (exports.TNFeInfNFeDetImpostoICMSICMS30MotDesICMS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS40CST;
(function (TNFeInfNFeDetImpostoICMSICMS40CST) {
    TNFeInfNFeDetImpostoICMSICMS40CST["Item40"] = "40";
    TNFeInfNFeDetImpostoICMSICMS40CST["Item41"] = "41";
    TNFeInfNFeDetImpostoICMSICMS40CST["Item50"] = "50";
})(TNFeInfNFeDetImpostoICMSICMS40CST = exports.TNFeInfNFeDetImpostoICMSICMS40CST || (exports.TNFeInfNFeDetImpostoICMSICMS40CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS40MotDesICMS;
(function (TNFeInfNFeDetImpostoICMSICMS40MotDesICMS) {
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item5"] = "5";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item6"] = "6";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item7"] = "7";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item8"] = "8";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item9"] = "9";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item10"] = "10";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item11"] = "11";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item16"] = "16";
    TNFeInfNFeDetImpostoICMSICMS40MotDesICMS["Item90"] = "90";
})(TNFeInfNFeDetImpostoICMSICMS40MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS || (exports.TNFeInfNFeDetImpostoICMSICMS40MotDesICMS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS51CST;
(function (TNFeInfNFeDetImpostoICMSICMS51CST) {
    TNFeInfNFeDetImpostoICMSICMS51CST["Item51"] = "51";
})(TNFeInfNFeDetImpostoICMSICMS51CST = exports.TNFeInfNFeDetImpostoICMSICMS51CST || (exports.TNFeInfNFeDetImpostoICMSICMS51CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS51ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS51ModBC) {
    TNFeInfNFeDetImpostoICMSICMS51ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS51ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS51ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS51ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS51ModBC = exports.TNFeInfNFeDetImpostoICMSICMS51ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS51ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS60CST;
(function (TNFeInfNFeDetImpostoICMSICMS60CST) {
    TNFeInfNFeDetImpostoICMSICMS60CST["Item60"] = "60";
})(TNFeInfNFeDetImpostoICMSICMS60CST = exports.TNFeInfNFeDetImpostoICMSICMS60CST || (exports.TNFeInfNFeDetImpostoICMSICMS60CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS70CST;
(function (TNFeInfNFeDetImpostoICMSICMS70CST) {
    TNFeInfNFeDetImpostoICMSICMS70CST["Item70"] = "70";
})(TNFeInfNFeDetImpostoICMSICMS70CST = exports.TNFeInfNFeDetImpostoICMSICMS70CST || (exports.TNFeInfNFeDetImpostoICMSICMS70CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS70ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS70ModBC) {
    TNFeInfNFeDetImpostoICMSICMS70ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS70ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS70ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS70ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS70ModBC = exports.TNFeInfNFeDetImpostoICMSICMS70ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS70ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS70ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMS70ModBCST) {
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMS70ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMS70ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS70ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMS70ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS70MotDesICMS;
(function (TNFeInfNFeDetImpostoICMSICMS70MotDesICMS) {
    TNFeInfNFeDetImpostoICMSICMS70MotDesICMS["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS70MotDesICMS["Item9"] = "9";
    TNFeInfNFeDetImpostoICMSICMS70MotDesICMS["Item12"] = "12";
})(TNFeInfNFeDetImpostoICMSICMS70MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS70MotDesICMS || (exports.TNFeInfNFeDetImpostoICMSICMS70MotDesICMS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS90CST;
(function (TNFeInfNFeDetImpostoICMSICMS90CST) {
    TNFeInfNFeDetImpostoICMSICMS90CST["Item90"] = "90";
})(TNFeInfNFeDetImpostoICMSICMS90CST = exports.TNFeInfNFeDetImpostoICMSICMS90CST || (exports.TNFeInfNFeDetImpostoICMSICMS90CST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS90ModBC;
(function (TNFeInfNFeDetImpostoICMSICMS90ModBC) {
    TNFeInfNFeDetImpostoICMSICMS90ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS90ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS90ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS90ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMS90ModBC = exports.TNFeInfNFeDetImpostoICMSICMS90ModBC || (exports.TNFeInfNFeDetImpostoICMSICMS90ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS90ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMS90ModBCST) {
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMS90ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMS90ModBCST = exports.TNFeInfNFeDetImpostoICMSICMS90ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMS90ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMS90MotDesICMS;
(function (TNFeInfNFeDetImpostoICMSICMS90MotDesICMS) {
    TNFeInfNFeDetImpostoICMSICMS90MotDesICMS["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMS90MotDesICMS["Item9"] = "9";
    TNFeInfNFeDetImpostoICMSICMS90MotDesICMS["Item12"] = "12";
})(TNFeInfNFeDetImpostoICMSICMS90MotDesICMS = exports.TNFeInfNFeDetImpostoICMSICMS90MotDesICMS || (exports.TNFeInfNFeDetImpostoICMSICMS90MotDesICMS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSPartCST;
(function (TNFeInfNFeDetImpostoICMSICMSPartCST) {
    TNFeInfNFeDetImpostoICMSICMSPartCST["Item10"] = "10";
    TNFeInfNFeDetImpostoICMSICMSPartCST["Item90"] = "90";
})(TNFeInfNFeDetImpostoICMSICMSPartCST = exports.TNFeInfNFeDetImpostoICMSICMSPartCST || (exports.TNFeInfNFeDetImpostoICMSICMSPartCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSPartModBC;
(function (TNFeInfNFeDetImpostoICMSICMSPartModBC) {
    TNFeInfNFeDetImpostoICMSICMSPartModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSPartModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSPartModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSPartModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMSPartModBC = exports.TNFeInfNFeDetImpostoICMSICMSPartModBC || (exports.TNFeInfNFeDetImpostoICMSICMSPartModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSPartModBCST;
(function (TNFeInfNFeDetImpostoICMSICMSPartModBCST) {
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMSPartModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMSPartModBCST = exports.TNFeInfNFeDetImpostoICMSICMSPartModBCST || (exports.TNFeInfNFeDetImpostoICMSICMSPartModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN101CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN101CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN101CSOSN["Item101"] = "101";
})(TNFeInfNFeDetImpostoICMSICMSSN101CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN101CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN101CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN102CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN102CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN102CSOSN["Item102"] = "102";
    TNFeInfNFeDetImpostoICMSICMSSN102CSOSN["Item103"] = "103";
    TNFeInfNFeDetImpostoICMSICMSSN102CSOSN["Item300"] = "300";
    TNFeInfNFeDetImpostoICMSICMSSN102CSOSN["Item400"] = "400";
})(TNFeInfNFeDetImpostoICMSICMSSN102CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN102CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN102CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN201CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN201CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN201CSOSN["Item201"] = "201";
})(TNFeInfNFeDetImpostoICMSICMSSN201CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN201CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN201CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN201ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMSSN201ModBCST) {
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMSSN201ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMSSN201ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN201ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMSSN201ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN202CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN202CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN202CSOSN["Item202"] = "202";
    TNFeInfNFeDetImpostoICMSICMSSN202CSOSN["Item203"] = "203";
})(TNFeInfNFeDetImpostoICMSICMSSN202CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN202CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN202CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN202ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMSSN202ModBCST) {
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMSSN202ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMSSN202ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN202ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMSSN202ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN500CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN500CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN500CSOSN["Item500"] = "500";
})(TNFeInfNFeDetImpostoICMSICMSSN500CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN500CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN500CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN900CSOSN;
(function (TNFeInfNFeDetImpostoICMSICMSSN900CSOSN) {
    TNFeInfNFeDetImpostoICMSICMSSN900CSOSN["Item900"] = "900";
})(TNFeInfNFeDetImpostoICMSICMSSN900CSOSN = exports.TNFeInfNFeDetImpostoICMSICMSSN900CSOSN || (exports.TNFeInfNFeDetImpostoICMSICMSSN900CSOSN = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN900ModBC;
(function (TNFeInfNFeDetImpostoICMSICMSSN900ModBC) {
    TNFeInfNFeDetImpostoICMSICMSSN900ModBC["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBC["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBC["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBC["Item3"] = "3";
})(TNFeInfNFeDetImpostoICMSICMSSN900ModBC = exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBC || (exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBC = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSN900ModBCST;
(function (TNFeInfNFeDetImpostoICMSICMSSN900ModBCST) {
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item0"] = "0";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item1"] = "1";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item2"] = "2";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item3"] = "3";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item4"] = "4";
    TNFeInfNFeDetImpostoICMSICMSSN900ModBCST["Item5"] = "5";
})(TNFeInfNFeDetImpostoICMSICMSSN900ModBCST = exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBCST || (exports.TNFeInfNFeDetImpostoICMSICMSSN900ModBCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSICMSSTCST;
(function (TNFeInfNFeDetImpostoICMSICMSSTCST) {
    TNFeInfNFeDetImpostoICMSICMSSTCST["Item41"] = "41";
    TNFeInfNFeDetImpostoICMSICMSSTCST["Item60"] = "60";
})(TNFeInfNFeDetImpostoICMSICMSSTCST = exports.TNFeInfNFeDetImpostoICMSICMSSTCST || (exports.TNFeInfNFeDetImpostoICMSICMSSTCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TIpiIPINTCST;
(function (TIpiIPINTCST) {
    TIpiIPINTCST["Item01"] = "01";
    TIpiIPINTCST["Item02"] = "02";
    TIpiIPINTCST["Item03"] = "03";
    TIpiIPINTCST["Item04"] = "04";
    TIpiIPINTCST["Item05"] = "05";
    TIpiIPINTCST["Item51"] = "51";
    TIpiIPINTCST["Item52"] = "52";
    TIpiIPINTCST["Item53"] = "53";
    TIpiIPINTCST["Item54"] = "54";
    TIpiIPINTCST["Item55"] = "55";
})(TIpiIPINTCST = exports.TIpiIPINTCST || (exports.TIpiIPINTCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TIpiIPITribCST;
(function (TIpiIPITribCST) {
    TIpiIPITribCST["Item00"] = "00";
    TIpiIPITribCST["Item49"] = "49";
    TIpiIPITribCST["Item50"] = "50";
    TIpiIPITribCST["Item99"] = "99";
})(TIpiIPITribCST = exports.TIpiIPITribCST || (exports.TIpiIPITribCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType;
(function (ItemsChoiceType) {
    ItemsChoiceType[ItemsChoiceType["pIPI"] = 0] = "pIPI";
    ItemsChoiceType[ItemsChoiceType["qUnid"] = 1] = "qUnid";
    ItemsChoiceType[ItemsChoiceType["vBC"] = 2] = "vBC";
    ItemsChoiceType[ItemsChoiceType["vUnid"] = 3] = "vUnid";
})(ItemsChoiceType = exports.ItemsChoiceType || (exports.ItemsChoiceType = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TCListServ;
(function (TCListServ) {
    TCListServ["Item0101"] = "01.01";
    TCListServ["Item0102"] = "01.02";
    TCListServ["Item0103"] = "01.03";
    TCListServ["Item0104"] = "01.04";
    TCListServ["Item0105"] = "01.05";
    TCListServ["Item0106"] = "01.06";
    TCListServ["Item0107"] = "01.07";
    TCListServ["Item0108"] = "01.08";
    TCListServ["Item0109"] = "01.09";
    TCListServ["Item0201"] = "02.01";
    TCListServ["Item0302"] = "03.02";
    TCListServ["Item0303"] = "03.03";
    TCListServ["Item0304"] = "03.04";
    TCListServ["Item0305"] = "03.05";
    TCListServ["Item0401"] = "04.01";
    TCListServ["Item0402"] = "04.02";
    TCListServ["Item0403"] = "04.03";
    TCListServ["Item0404"] = "04.04";
    TCListServ["Item0405"] = "04.05";
    TCListServ["Item0406"] = "04.06";
    TCListServ["Item0407"] = "04.07";
    TCListServ["Item0408"] = "04.08";
    TCListServ["Item0409"] = "04.09";
    TCListServ["Item0410"] = "04.10";
    TCListServ["Item0411"] = "04.11";
    TCListServ["Item0412"] = "04.12";
    TCListServ["Item0413"] = "04.13";
    TCListServ["Item0414"] = "04.14";
    TCListServ["Item0415"] = "04.15";
    TCListServ["Item0416"] = "04.16";
    TCListServ["Item0417"] = "04.17";
    TCListServ["Item0418"] = "04.18";
    TCListServ["Item0419"] = "04.19";
    TCListServ["Item0420"] = "04.20";
    TCListServ["Item0421"] = "04.21";
    TCListServ["Item0422"] = "04.22";
    TCListServ["Item0423"] = "04.23";
    TCListServ["Item0501"] = "05.01";
    TCListServ["Item0502"] = "05.02";
    TCListServ["Item0503"] = "05.03";
    TCListServ["Item0504"] = "05.04";
    TCListServ["Item0505"] = "05.05";
    TCListServ["Item0506"] = "05.06";
    TCListServ["Item0507"] = "05.07";
    TCListServ["Item0508"] = "05.08";
    TCListServ["Item0509"] = "05.09";
    TCListServ["Item0601"] = "06.01";
    TCListServ["Item0602"] = "06.02";
    TCListServ["Item0603"] = "06.03";
    TCListServ["Item0604"] = "06.04";
    TCListServ["Item0605"] = "06.05";
    TCListServ["Item0606"] = "06.06";
    TCListServ["Item0701"] = "07.01";
    TCListServ["Item0702"] = "07.02";
    TCListServ["Item0703"] = "07.03";
    TCListServ["Item0704"] = "07.04";
    TCListServ["Item0705"] = "07.05";
    TCListServ["Item0706"] = "07.06";
    TCListServ["Item0707"] = "07.07";
    TCListServ["Item0708"] = "07.08";
    TCListServ["Item0709"] = "07.09";
    TCListServ["Item0710"] = "07.10";
    TCListServ["Item0711"] = "07.11";
    TCListServ["Item0712"] = "07.12";
    TCListServ["Item0713"] = "07.13";
    TCListServ["Item0716"] = "07.16";
    TCListServ["Item0717"] = "07.17";
    TCListServ["Item0718"] = "07.18";
    TCListServ["Item0719"] = "07.19";
    TCListServ["Item0720"] = "07.20";
    TCListServ["Item0721"] = "07.21";
    TCListServ["Item0722"] = "07.22";
    TCListServ["Item0801"] = "08.01";
    TCListServ["Item0802"] = "08.02";
    TCListServ["Item0901"] = "09.01";
    TCListServ["Item0902"] = "09.02";
    TCListServ["Item0903"] = "09.03";
    TCListServ["Item1001"] = "10.01";
    TCListServ["Item1002"] = "10.02";
    TCListServ["Item1003"] = "10.03";
    TCListServ["Item1004"] = "10.04";
    TCListServ["Item1005"] = "10.05";
    TCListServ["Item1006"] = "10.06";
    TCListServ["Item1007"] = "10.07";
    TCListServ["Item1008"] = "10.08";
    TCListServ["Item1009"] = "10.09";
    TCListServ["Item1010"] = "10.10";
    TCListServ["Item1101"] = "11.01";
    TCListServ["Item1102"] = "11.02";
    TCListServ["Item1103"] = "11.03";
    TCListServ["Item1104"] = "11.04";
    TCListServ["Item1201"] = "12.01";
    TCListServ["Item1202"] = "12.02";
    TCListServ["Item1203"] = "12.03";
    TCListServ["Item1204"] = "12.04";
    TCListServ["Item1205"] = "12.05";
    TCListServ["Item1206"] = "12.06";
    TCListServ["Item1207"] = "12.07";
    TCListServ["Item1208"] = "12.08";
    TCListServ["Item1209"] = "12.09";
    TCListServ["Item1210"] = "12.10";
    TCListServ["Item1211"] = "12.11";
    TCListServ["Item1212"] = "12.12";
    TCListServ["Item1213"] = "12.13";
    TCListServ["Item1214"] = "12.14";
    TCListServ["Item1215"] = "12.15";
    TCListServ["Item1216"] = "12.16";
    TCListServ["Item1217"] = "12.17";
    TCListServ["Item1302"] = "13.02";
    TCListServ["Item1303"] = "13.03";
    TCListServ["Item1304"] = "13.04";
    TCListServ["Item1305"] = "13.05";
    TCListServ["Item1401"] = "14.01";
    TCListServ["Item1402"] = "14.02";
    TCListServ["Item1403"] = "14.03";
    TCListServ["Item1404"] = "14.04";
    TCListServ["Item1405"] = "14.05";
    TCListServ["Item1406"] = "14.06";
    TCListServ["Item1407"] = "14.07";
    TCListServ["Item1408"] = "14.08";
    TCListServ["Item1409"] = "14.09";
    TCListServ["Item1410"] = "14.10";
    TCListServ["Item1411"] = "14.11";
    TCListServ["Item1412"] = "14.12";
    TCListServ["Item1413"] = "14.13";
    TCListServ["Item1414"] = "14.14";
    TCListServ["Item1501"] = "15.01";
    TCListServ["Item1502"] = "15.02";
    TCListServ["Item1503"] = "15.03";
    TCListServ["Item1504"] = "15.04";
    TCListServ["Item1505"] = "15.05";
    TCListServ["Item1506"] = "15.06";
    TCListServ["Item1507"] = "15.07";
    TCListServ["Item1508"] = "15.08";
    TCListServ["Item1509"] = "15.09";
    TCListServ["Item1510"] = "15.10";
    TCListServ["Item1511"] = "15.11";
    TCListServ["Item1512"] = "15.12";
    TCListServ["Item1513"] = "15.13";
    TCListServ["Item1514"] = "15.14";
    TCListServ["Item1515"] = "15.15";
    TCListServ["Item1516"] = "15.16";
    TCListServ["Item1517"] = "15.17";
    TCListServ["Item1518"] = "15.18";
    TCListServ["Item1601"] = "16.01";
    TCListServ["Item1602"] = "16.02";
    TCListServ["Item1701"] = "17.01";
    TCListServ["Item1702"] = "17.02";
    TCListServ["Item1703"] = "17.03";
    TCListServ["Item1704"] = "17.04";
    TCListServ["Item1705"] = "17.05";
    TCListServ["Item1706"] = "17.06";
    TCListServ["Item1708"] = "17.08";
    TCListServ["Item1709"] = "17.09";
    TCListServ["Item1710"] = "17.10";
    TCListServ["Item1711"] = "17.11";
    TCListServ["Item1712"] = "17.12";
    TCListServ["Item1713"] = "17.13";
    TCListServ["Item1714"] = "17.14";
    TCListServ["Item1715"] = "17.15";
    TCListServ["Item1716"] = "17.16";
    TCListServ["Item1717"] = "17.17";
    TCListServ["Item1718"] = "17.18";
    TCListServ["Item1719"] = "17.19";
    TCListServ["Item1720"] = "17.20";
    TCListServ["Item1721"] = "17.21";
    TCListServ["Item1722"] = "17.22";
    TCListServ["Item1723"] = "17.23";
    TCListServ["Item1724"] = "17.24";
    TCListServ["Item1725"] = "17.25";
    TCListServ["Item1801"] = "18.01";
    TCListServ["Item1901"] = "19.01";
    TCListServ["Item2001"] = "20.01";
    TCListServ["Item2002"] = "20.02";
    TCListServ["Item2003"] = "20.03";
    TCListServ["Item2101"] = "21.01";
    TCListServ["Item2201"] = "22.01";
    TCListServ["Item2301"] = "23.01";
    TCListServ["Item2401"] = "24.01";
    TCListServ["Item2501"] = "25.01";
    TCListServ["Item2502"] = "25.02";
    TCListServ["Item2503"] = "25.03";
    TCListServ["Item2504"] = "25.04";
    TCListServ["Item2505"] = "25.05";
    TCListServ["Item2601"] = "26.01";
    TCListServ["Item2701"] = "27.01";
    TCListServ["Item2801"] = "28.01";
    TCListServ["Item2901"] = "29.01";
    TCListServ["Item3001"] = "30.01";
    TCListServ["Item3101"] = "31.01";
    TCListServ["Item3201"] = "32.01";
    TCListServ["Item3301"] = "33.01";
    TCListServ["Item3401"] = "34.01";
    TCListServ["Item3501"] = "35.01";
    TCListServ["Item3601"] = "36.01";
    TCListServ["Item3701"] = "37.01";
    TCListServ["Item3801"] = "38.01";
    TCListServ["Item3901"] = "39.01";
    TCListServ["Item4001"] = "40.01";
})(TCListServ = exports.TCListServ || (exports.TCListServ = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoISSQNIndISS;
(function (TNFeInfNFeDetImpostoISSQNIndISS) {
    TNFeInfNFeDetImpostoISSQNIndISS["Item1"] = "1";
    TNFeInfNFeDetImpostoISSQNIndISS["Item2"] = "2";
    TNFeInfNFeDetImpostoISSQNIndISS["Item3"] = "3";
    TNFeInfNFeDetImpostoISSQNIndISS["Item4"] = "4";
    TNFeInfNFeDetImpostoISSQNIndISS["Item5"] = "5";
    TNFeInfNFeDetImpostoISSQNIndISS["Item6"] = "6";
    TNFeInfNFeDetImpostoISSQNIndISS["Item7"] = "7";
})(TNFeInfNFeDetImpostoISSQNIndISS = exports.TNFeInfNFeDetImpostoISSQNIndISS || (exports.TNFeInfNFeDetImpostoISSQNIndISS = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoISSQNIndIncentivo;
(function (TNFeInfNFeDetImpostoISSQNIndIncentivo) {
    TNFeInfNFeDetImpostoISSQNIndIncentivo["Item1"] = "1";
    TNFeInfNFeDetImpostoISSQNIndIncentivo["Item2"] = "2";
})(TNFeInfNFeDetImpostoISSQNIndIncentivo = exports.TNFeInfNFeDetImpostoISSQNIndIncentivo || (exports.TNFeInfNFeDetImpostoISSQNIndIncentivo = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoPISPISAliqCST;
(function (TNFeInfNFeDetImpostoPISPISAliqCST) {
    TNFeInfNFeDetImpostoPISPISAliqCST["Item01"] = "01";
    TNFeInfNFeDetImpostoPISPISAliqCST["Item02"] = "02";
})(TNFeInfNFeDetImpostoPISPISAliqCST = exports.TNFeInfNFeDetImpostoPISPISAliqCST || (exports.TNFeInfNFeDetImpostoPISPISAliqCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoPISPISNTCST;
(function (TNFeInfNFeDetImpostoPISPISNTCST) {
    TNFeInfNFeDetImpostoPISPISNTCST["Item04"] = "04";
    TNFeInfNFeDetImpostoPISPISNTCST["Item05"] = "05";
    TNFeInfNFeDetImpostoPISPISNTCST["Item06"] = "06";
    TNFeInfNFeDetImpostoPISPISNTCST["Item07"] = "07";
    TNFeInfNFeDetImpostoPISPISNTCST["Item08"] = "08";
    TNFeInfNFeDetImpostoPISPISNTCST["Item09"] = "09";
})(TNFeInfNFeDetImpostoPISPISNTCST = exports.TNFeInfNFeDetImpostoPISPISNTCST || (exports.TNFeInfNFeDetImpostoPISPISNTCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoPISPISOutrCST;
(function (TNFeInfNFeDetImpostoPISPISOutrCST) {
    TNFeInfNFeDetImpostoPISPISOutrCST["Item49"] = "49";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item50"] = "50";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item51"] = "51";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item52"] = "52";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item53"] = "53";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item54"] = "54";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item55"] = "55";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item56"] = "56";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item60"] = "60";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item61"] = "61";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item62"] = "62";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item63"] = "63";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item64"] = "64";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item65"] = "65";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item66"] = "66";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item67"] = "67";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item70"] = "70";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item71"] = "71";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item72"] = "72";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item73"] = "73";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item74"] = "74";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item75"] = "75";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item98"] = "98";
    TNFeInfNFeDetImpostoPISPISOutrCST["Item99"] = "99";
})(TNFeInfNFeDetImpostoPISPISOutrCST = exports.TNFeInfNFeDetImpostoPISPISOutrCST || (exports.TNFeInfNFeDetImpostoPISPISOutrCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType1;
(function (ItemsChoiceType1) {
    ItemsChoiceType1[ItemsChoiceType1["pPIS"] = 0] = "pPIS";
    ItemsChoiceType1[ItemsChoiceType1["qBCProd"] = 1] = "qBCProd";
    ItemsChoiceType1[ItemsChoiceType1["vAliqProd"] = 2] = "vAliqProd";
    ItemsChoiceType1[ItemsChoiceType1["vBC"] = 3] = "vBC";
})(ItemsChoiceType1 = exports.ItemsChoiceType1 || (exports.ItemsChoiceType1 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoPISPISQtdeCST;
(function (TNFeInfNFeDetImpostoPISPISQtdeCST) {
    TNFeInfNFeDetImpostoPISPISQtdeCST["Item03"] = "03";
})(TNFeInfNFeDetImpostoPISPISQtdeCST = exports.TNFeInfNFeDetImpostoPISPISQtdeCST || (exports.TNFeInfNFeDetImpostoPISPISQtdeCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType2;
(function (ItemsChoiceType2) {
    ItemsChoiceType2[ItemsChoiceType2["pPIS"] = 0] = "pPIS";
    ItemsChoiceType2[ItemsChoiceType2["qBCProd"] = 1] = "qBCProd";
    ItemsChoiceType2[ItemsChoiceType2["vAliqProd"] = 2] = "vAliqProd";
    ItemsChoiceType2[ItemsChoiceType2["vBC"] = 3] = "vBC";
})(ItemsChoiceType2 = exports.ItemsChoiceType2 || (exports.ItemsChoiceType2 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST;
(function (TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST) {
    TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST["Item01"] = "01";
    TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST["Item02"] = "02";
})(TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST || (exports.TNFeInfNFeDetImpostoCOFINSCOFINSAliqCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoCOFINSCOFINSNTCST;
(function (TNFeInfNFeDetImpostoCOFINSCOFINSNTCST) {
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item04"] = "04";
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item05"] = "05";
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item06"] = "06";
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item07"] = "07";
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item08"] = "08";
    TNFeInfNFeDetImpostoCOFINSCOFINSNTCST["Item09"] = "09";
})(TNFeInfNFeDetImpostoCOFINSCOFINSNTCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSNTCST || (exports.TNFeInfNFeDetImpostoCOFINSCOFINSNTCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST;
(function (TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST) {
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item49"] = "49";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item50"] = "50";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item51"] = "51";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item52"] = "52";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item53"] = "53";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item54"] = "54";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item55"] = "55";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item56"] = "56";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item60"] = "60";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item61"] = "62";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item62"] = "62";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item63"] = "63";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item64"] = "64";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item65"] = "65";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item66"] = "66";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item67"] = "67";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item70"] = "70";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item71"] = "71";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item72"] = "72";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item73"] = "73";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item74"] = "74";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item75"] = "75";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item98"] = "98";
    TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST["Item99"] = "99";
})(TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST || (exports.TNFeInfNFeDetImpostoCOFINSCOFINSOutrCST = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType3;
(function (ItemsChoiceType3) {
    ItemsChoiceType3[ItemsChoiceType3["pCOFINS"] = 0] = "pCOFINS";
    ItemsChoiceType3[ItemsChoiceType3["qBCProd"] = 1] = "qBCProd";
    ItemsChoiceType3[ItemsChoiceType3["vAliqProd"] = 2] = "vAliqProd";
    ItemsChoiceType3[ItemsChoiceType3["vBC"] = 3] = "vBC";
})(ItemsChoiceType3 = exports.ItemsChoiceType3 || (exports.ItemsChoiceType3 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST;
(function (TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST) {
    TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST["Item03"] = "03";
})(TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST = exports.TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST || (exports.TNFeInfNFeDetImpostoCOFINSCOFINSQtdeCST = {}));
// [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType4;
(function (ItemsChoiceType4) {
    ItemsChoiceType4[ItemsChoiceType4["pCOFINS"] = 0] = "pCOFINS";
    ItemsChoiceType4[ItemsChoiceType4["qBCProd"] = 1] = "qBCProd";
    ItemsChoiceType4[ItemsChoiceType4["vAliqProd"] = 2] = "vAliqProd";
    ItemsChoiceType4[ItemsChoiceType4["vBC"] = 3] = "vBC";
})(ItemsChoiceType4 = exports.ItemsChoiceType4 || (exports.ItemsChoiceType4 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeDetImpostoICMSUFDestPICMSInter;
(function (TNFeInfNFeDetImpostoICMSUFDestPICMSInter) {
    TNFeInfNFeDetImpostoICMSUFDestPICMSInter["Item400"] = "4.00";
    TNFeInfNFeDetImpostoICMSUFDestPICMSInter["Item700"] = "7.00";
    TNFeInfNFeDetImpostoICMSUFDestPICMSInter["Item1200"] = "12.00";
})(TNFeInfNFeDetImpostoICMSUFDestPICMSInter = exports.TNFeInfNFeDetImpostoICMSUFDestPICMSInter || (exports.TNFeInfNFeDetImpostoICMSUFDestPICMSInter = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeTotalISSQNtotCRegTrib;
(function (TNFeInfNFeTotalISSQNtotCRegTrib) {
    TNFeInfNFeTotalISSQNtotCRegTrib["Item1"] = "1";
    TNFeInfNFeTotalISSQNtotCRegTrib["Item2"] = "2";
    TNFeInfNFeTotalISSQNtotCRegTrib["Item3"] = "3";
    TNFeInfNFeTotalISSQNtotCRegTrib["Item4"] = "4";
    TNFeInfNFeTotalISSQNtotCRegTrib["Item5"] = "5";
    TNFeInfNFeTotalISSQNtotCRegTrib["Item6"] = "6";
})(TNFeInfNFeTotalISSQNtotCRegTrib = exports.TNFeInfNFeTotalISSQNtotCRegTrib || (exports.TNFeInfNFeTotalISSQNtotCRegTrib = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeTranspModFrete;
(function (TNFeInfNFeTranspModFrete) {
    TNFeInfNFeTranspModFrete["Item0"] = "0";
    TNFeInfNFeTranspModFrete["Item1"] = "1";
    TNFeInfNFeTranspModFrete["Item2"] = "2";
    TNFeInfNFeTranspModFrete["Item3"] = "3";
    TNFeInfNFeTranspModFrete["Item4"] = "4";
    TNFeInfNFeTranspModFrete["Item9"] = "9";
})(TNFeInfNFeTranspModFrete = exports.TNFeInfNFeTranspModFrete || (exports.TNFeInfNFeTranspModFrete = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType6;
(function (ItemChoiceType6) {
    ItemChoiceType6[ItemChoiceType6["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType6[ItemChoiceType6["CPF"] = 1] = "CPF";
})(ItemChoiceType6 = exports.ItemChoiceType6 || (exports.ItemChoiceType6 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemsChoiceType5;
(function (ItemsChoiceType5) {
    ItemsChoiceType5[ItemsChoiceType5["balsa"] = 0] = "balsa";
    ItemsChoiceType5[ItemsChoiceType5["reboque"] = 1] = "reboque";
    ItemsChoiceType5[ItemsChoiceType5["vagao"] = 2] = "vagao";
    ItemsChoiceType5[ItemsChoiceType5["veicTransp"] = 3] = "veicTransp";
})(ItemsChoiceType5 = exports.ItemsChoiceType5 || (exports.ItemsChoiceType5 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFePagDetPagIndPag;
(function (TNFeInfNFePagDetPagIndPag) {
    TNFeInfNFePagDetPagIndPag["Item0"] = "0";
    TNFeInfNFePagDetPagIndPag["Item1"] = "1";
})(TNFeInfNFePagDetPagIndPag = exports.TNFeInfNFePagDetPagIndPag || (exports.TNFeInfNFePagDetPagIndPag = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFePagDetPagTPag;
(function (TNFeInfNFePagDetPagTPag) {
    TNFeInfNFePagDetPagTPag["Item01"] = "01";
    TNFeInfNFePagDetPagTPag["Item02"] = "02";
    TNFeInfNFePagDetPagTPag["Item03"] = "03";
    TNFeInfNFePagDetPagTPag["Item04"] = "04";
    TNFeInfNFePagDetPagTPag["Item05"] = "05";
    TNFeInfNFePagDetPagTPag["Item10"] = "10";
    TNFeInfNFePagDetPagTPag["Item11"] = "11";
    TNFeInfNFePagDetPagTPag["Item12"] = "12";
    TNFeInfNFePagDetPagTPag["Item13"] = "13";
    TNFeInfNFePagDetPagTPag["Item14"] = "14";
    TNFeInfNFePagDetPagTPag["Item15"] = "15";
    TNFeInfNFePagDetPagTPag["Item16"] = "16";
    TNFeInfNFePagDetPagTPag["Item17"] = "17";
    TNFeInfNFePagDetPagTPag["Item18"] = "18";
    TNFeInfNFePagDetPagTPag["Item19"] = "19";
    TNFeInfNFePagDetPagTPag["Item90"] = "90";
    TNFeInfNFePagDetPagTPag["Item99"] = "99";
})(TNFeInfNFePagDetPagTPag = exports.TNFeInfNFePagDetPagTPag || (exports.TNFeInfNFePagDetPagTPag = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFePagDetPagCardTpIntegra;
(function (TNFeInfNFePagDetPagCardTpIntegra) {
    TNFeInfNFePagDetPagCardTpIntegra["Item1"] = "1";
    TNFeInfNFePagDetPagCardTpIntegra["Item2"] = "2";
})(TNFeInfNFePagDetPagCardTpIntegra = exports.TNFeInfNFePagDetPagCardTpIntegra || (exports.TNFeInfNFePagDetPagCardTpIntegra = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFePagDetPagCardTBand;
(function (TNFeInfNFePagDetPagCardTBand) {
    TNFeInfNFePagDetPagCardTBand["Item01"] = "01";
    TNFeInfNFePagDetPagCardTBand["Item02"] = "02";
    TNFeInfNFePagDetPagCardTBand["Item03"] = "03";
    TNFeInfNFePagDetPagCardTBand["Item04"] = "04";
    TNFeInfNFePagDetPagCardTBand["Item05"] = "05";
    TNFeInfNFePagDetPagCardTBand["Item06"] = "06";
    TNFeInfNFePagDetPagCardTBand["Item07"] = "07";
    TNFeInfNFePagDetPagCardTBand["Item08"] = "08";
    TNFeInfNFePagDetPagCardTBand["Item09"] = "09";
    TNFeInfNFePagDetPagCardTBand["Item99"] = "99";
})(TNFeInfNFePagDetPagCardTBand = exports.TNFeInfNFePagDetPagCardTBand || (exports.TNFeInfNFePagDetPagCardTBand = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TNFeInfNFeInfAdicProcRefIndProc;
(function (TNFeInfNFeInfAdicProcRefIndProc) {
    TNFeInfNFeInfAdicProcRefIndProc["Item0"] = "0";
    TNFeInfNFeInfAdicProcRefIndProc["Item1"] = "1";
    TNFeInfNFeInfAdicProcRefIndProc["Item2"] = "2";
    TNFeInfNFeInfAdicProcRefIndProc["Item3"] = "3";
    TNFeInfNFeInfAdicProcRefIndProc["Item9"] = "9";
})(TNFeInfNFeInfAdicProcRefIndProc = exports.TNFeInfNFeInfAdicProcRefIndProc || (exports.TNFeInfNFeInfAdicProcRefIndProc = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.w3.org/2000/09/xmldsig#")]
class SignedInfoTypeCanonicalizationMethod {
    constructor() {
        this.algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
    }
}
exports.SignedInfoTypeCanonicalizationMethod = SignedInfoTypeCanonicalizationMethod;
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.w3.org/2000/09/xmldsig#")]
class SignedInfoTypeSignatureMethod {
    constructor() {
        this.algorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    }
}
exports.SignedInfoTypeSignatureMethod = SignedInfoTypeSignatureMethod;
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.w3.org/2000/09/xmldsig#")]
var TTransformURI;
(function (TTransformURI) {
    TTransformURI["httpwwww3org200009xmldsigenvelopedsignature"] = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
    TTransformURI["httpwwww3orgTR2001RECxmlc14n20010315"] = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
})(TTransformURI = exports.TTransformURI || (exports.TTransformURI = {}));
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.w3.org/2000/09/xmldsig#")]
class ReferenceTypeDigestMethod {
    constructor() {
        this.algorithm = "http://www.w3.org/2000/09/xmldsig#sha1";
    }
}
exports.ReferenceTypeDigestMethod = ReferenceTypeDigestMethod;
//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
var TInutNFeInfInutXServ;
(function (TInutNFeInfInutXServ) {
    TInutNFeInfInutXServ[TInutNFeInfInutXServ["INUTILIZAR"] = 0] = "INUTILIZAR";
})(TInutNFeInfInutXServ = exports.TInutNFeInfInutXServ || (exports.TInutNFeInfInutXServ = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
var TCOrgaoIBGE;
(function (TCOrgaoIBGE) {
    TCOrgaoIBGE["Item11"] = "11";
    TCOrgaoIBGE["Item12"] = "12";
    TCOrgaoIBGE["Item13"] = "13";
    TCOrgaoIBGE["Item14"] = "14";
    TCOrgaoIBGE["Item15"] = "15";
    TCOrgaoIBGE["Item16"] = "16";
    TCOrgaoIBGE["Item17"] = "17";
    TCOrgaoIBGE["Item21"] = "21";
    TCOrgaoIBGE["Item22"] = "22";
    TCOrgaoIBGE["Item23"] = "23";
    TCOrgaoIBGE["Item24"] = "24";
    TCOrgaoIBGE["Item25"] = "25";
    TCOrgaoIBGE["Item26"] = "26";
    TCOrgaoIBGE["Item27"] = "27";
    TCOrgaoIBGE["Item28"] = "28";
    TCOrgaoIBGE["Item29"] = "29";
    TCOrgaoIBGE["Item31"] = "31";
    TCOrgaoIBGE["Item32"] = "32";
    TCOrgaoIBGE["Item33"] = "33";
    TCOrgaoIBGE["Item35"] = "35";
    TCOrgaoIBGE["Item41"] = "41";
    TCOrgaoIBGE["Item42"] = "42";
    TCOrgaoIBGE["Item43"] = "43";
    TCOrgaoIBGE["Item50"] = "50";
    TCOrgaoIBGE["Item51"] = "51";
    TCOrgaoIBGE["Item52"] = "52";
    TCOrgaoIBGE["Item53"] = "53";
    TCOrgaoIBGE["Item90"] = "90";
    TCOrgaoIBGE["Item91"] = "91";
    TCOrgaoIBGE["Item92"] = "92";
})(TCOrgaoIBGE = exports.TCOrgaoIBGE || (exports.TCOrgaoIBGE = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType7;
(function (ItemChoiceType7) {
    ItemChoiceType7[ItemChoiceType7["CNPJ"] = 0] = "CNPJ";
    ItemChoiceType7[ItemChoiceType7["CPF"] = 1] = "CPF";
})(ItemChoiceType7 = exports.ItemChoiceType7 || (exports.ItemChoiceType7 = {}));
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe", IncludeInSchema=false)]
var ItemChoiceType8;
(function (ItemChoiceType8) {
    ItemChoiceType8[ItemChoiceType8["CNPJDest"] = 0] = "CNPJDest";
    ItemChoiceType8[ItemChoiceType8["CPFDest"] = 1] = "CPFDest";
})(ItemChoiceType8 = exports.ItemChoiceType8 || (exports.ItemChoiceType8 = {}));
