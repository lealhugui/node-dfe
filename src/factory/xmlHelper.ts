
import * as xml2js from 'xml2js';
export class XmlHelper {

    serializeXml(obj: any, rootTag: string) {
        //TODO: namespaces "http://www.portalfiscal.inf.br/nfe"
        let builder = new xml2js.Builder({rootName: rootTag, explicitArray: false});
        return builder.buildObject(obj);
    }

    deserializeXml(xml: string) {
        let resultObj;
        let parser = new xml2js.Parser();

        parser.parseString(xml, function(err: any, result: any){
            if (err) {
                throw new Error('Erro ao deserializar XML' + err)
            }
            resultObj = result;
        });

        return resultObj;
    }
}
