"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlHelper = void 0;
const xml2js = require("xml2js");
class XmlHelper {
    static serializeXml(obj, rootTag) {
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
    static deserializeXml(xml, options) {
        let resultObj;
        if (!options) {
            options = {
                mergeAttrs: true,
                ignoreAttrs: true,
                explicitArray: false
            };
        }
        let parser = new xml2js.Parser(options);
        parser.parseString(xml, function (err, result) {
            if (err) {
                throw new Error('Erro ao deserializar XML' + err);
            }
            resultObj = result;
        });
        return resultObj;
    }
}
exports.XmlHelper = XmlHelper;
