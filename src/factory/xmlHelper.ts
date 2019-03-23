
import * as xml2js from 'xml2js';
export abstract class XmlHelper {

    public static serializeXml(obj: any, rootTag: string) {
        let builder = new xml2js.Builder({
            rootName: rootTag,
            explicitArray: false,
            headless: true,
            renderOpts: {
                pretty: false
            }, 
            cdata: true
        });
        return builder.buildObject(obj);
    }

    public static deserializeXml(xml: string) {
        let resultObj;
        let parser = new xml2js.Parser({
            mergeAttrs: true, 
            ignoreAttrs: true,
            explicitArray: false
        });

        parser.parseString(xml, function(err: any, result: any){
            if (err) {
                throw new Error('Erro ao deserializar XML' + err)
            }
            resultObj = result;
        });

        return resultObj;
    }
}
