"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceHelper = void 0;
const node_fetch_1 = require("node-fetch");
const https = require("https");
const xmlHelper_1 = require("../xmlHelper");
function proxyToUrl(pr) {
    const server = `${pr.host}:${pr.port}`;
    let auth = null;
    let final = pr.isHttps ? 'https://' : 'http://';
    if (pr.auth) {
        final = `${final}${pr.auth.username}:${pr.auth.password}@`;
    }
    return `${final}${server}`;
}
class WebServiceHelper {
    static buildSoapEnvelope(xml, soapMethod) {
        let soapEnvelopeObj = {
            '$': { 'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema' },
            'soap:Body': {
                'nfeDadosMsg': {
                    '$': {
                        'xmlns': soapMethod
                    },
                    _: '[XML]'
                }
            }
        };
        let soapEnvXml = xmlHelper_1.XmlHelper.serializeXml(soapEnvelopeObj, 'soap:Envelope');
        return soapEnvXml.replace('[XML]', xml);
    }
    static async makeSoapRequest(xml, cert, soap, proxy) {
        let result = { xml_enviado: xml };
        try {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": soap.contentType,
                    "SOAPAction": soap.action
                },
                agent: new https.Agent({
                    rejectUnauthorized: false,
                    // pfx: cert.pfx,
                    cert: cert.pem,
                    key: cert.key,
                    passphrase: cert.password,
                }),
                body: this.buildSoapEnvelope(xml, soap.method),
            };
            const res = await (0, node_fetch_1.default)(soap.url, options);
            result.status = res.status;
            result.xml_recebido = await res.text();
            if (result.status == 200) {
                result.success = true;
                let retorno = xmlHelper_1.XmlHelper.deserializeXml(result.xml_recebido, { explicitArray: false });
                if (retorno) {
                    result.data = Object(retorno)['soap:Envelope'] != undefined
                        ? Object(retorno)['soap:Envelope']['soap:Body']['nfeResultMsg']
                        : Object(retorno)['env:Envelope']['env:Body']['nfeResultMsg'];
                }
            }
            return result;
        }
        catch (err) {
            result.success = false;
            result.error = err;
            return result;
        }
    }
}
exports.WebServiceHelper = WebServiceHelper;
