import * as xml2js from 'xml2js';
export declare abstract class XmlHelper {
    static serializeXml(obj: any, rootTag: string): string;
    static deserializeXml(xml: string, options?: xml2js.OptionsV2): undefined;
}
