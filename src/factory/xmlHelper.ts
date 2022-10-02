
import * as xml2js from 'xml2js';
export abstract class XmlHelper {

    public static serializeXml(obj: any, rootTag: string) {
        let builder = new xml2js.Builder({
            rootName: rootTag,
            headless: true,
            renderOpts: {
                pretty: false
            }, 
            cdata: true
        });
        return builder.buildObject(obj);
    }

    public static deserializeXml(xml: string, options?: xml2js.OptionsV2) {
        let resultObj;
        
        if (!options) {
            options = {
                mergeAttrs: true, 
                ignoreAttrs: true,
                explicitArray: false
            };
        }
         
        let parser = new xml2js.Parser(options);

        parser.parseString(xml, function(err: any, result: any){
            if (err) {
                throw new Error('Erro ao deserializar XML' + err)
            }
            resultObj = result;
        });

        return resultObj;
    }
}
