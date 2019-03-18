//[System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TConsSitNFeXServ {
    CONSULTAR,
}
//[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://www.portalfiscal.inf.br/nfe")]
export enum TAmb {
    PRD = "1",
    HML = "2"
  }

  //[System.Xml.Serialization.XmlRootAttribute("consStatServ", Namespace="http://www.portalfiscal.inf.br/nfe", IsNullable=false)]
export interface TConsStatServ {
    tpAmb: TAmb;
    cUF: TCodUfIBGE;
    xServ: TConsStatServXServ;
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
    STATUS="STATUS",
}