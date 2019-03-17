/*
const lib = require('./lib');
const n = new lib.NFeProcessor();
//console.log(n.processarDocumento())


const x = require('xml4js');

// Most of xml2js options should still work
var options = {};

var fs = require('fs');
var util = require('util');
var parser = new x.Parser(options);

var schema = fs.readFileSync('./resources/PL_009_V4_2016_002_v160b/consStatServ_v4.00.xsd', {encoding: 'utf-8'});
parser.addSchema('http://www.portalfiscal.inf.br/nfe', schema, function (err, importsAndIncludes) {
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in schema.xsd
    console.log(x.Builder)
    //console.log(err, util.inspect(importsAndIncludes, false, null));
});

*/
const lib = require('../node-nfe/src/factory/processor/nfeProcessor');
const sign = require('../node-nfe/src/factory/signature');
const xmlHelper = require('../node-nfe/src/factory/xmlHelper');

let signUtils = new sign.Signature();
let nfeProc = new lib.NFeProcessor();
let XmlHelper = new xmlHelper.XmlHelper();

let xml = nfeProc.gerarXmlStatusServico('4.00', 2, 'RS');

//Test deserialize:
let obj = XmlHelper.deserializeXml(xml);
console.log(obj)

let xmlAssinado = signUtils.signXml(xml, 'consStatServ', 'C:/Projetos/node-nfe/node_modules/xml-crypto/example/client.pem')
//console.log('Xml Assinado -->', xmlAssinado)

nfeProc.consultarStatusServico(xml);
