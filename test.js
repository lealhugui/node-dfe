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