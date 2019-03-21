const fs = require('fs');
const lib = require('./lib');
const libFactory = require('./lib/factory');
const signUtils = new libFactory.Signature();
const XmlHelper = new libFactory.XmlHelper();

let cert = {
    key: fs.readFileSync('C:\\cert\\newKey.key'),
    pem: fs.readFileSync('C:\\cert\\test.pem'),
    pfx: fs.readFileSync('C:\\cert\\certificado.pfx'),
    password: fs.readFileSync('C:\\cert\\senha.txt')
};

let empresa = {
    razaoSocial: 'TESTE',
    nomeFantasia: 'TEST',
    cnpj: '99999999999999',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    codRegimeTributario: '3',
    endereco: {
        logradouro: 'Rua Teste',
        numero: 123,
        complemento: '',
        bairro: 'Bairro Teste',
        municipio: 'Cachoeirinha',
        codIbge: '4303103',
        uf: 'RS',
        cep: '99999999',
        telefone: '999999999'
    },
    certificado: cert
};

// TESTES STATUS SERVICO:
async function testeConsultaStatusServico(empresa) {
    const statusProc = new lib.StatusServicoProcessor(empresa);
    let result = await statusProc.processarDocumento();
    console.log(result.xml_enviado);
}


//Test deserialize:
//let obj = XmlHelper.deserializeXml(xml);
//console.log(obj)


let documento = {
    ambiente: '2',
    modelo: '65',
    numeroNota: 1,
    serie: '1',
    naturezaOperacao: 'VENDA',
    codIbge: '43',
    codigoNotaFiscal: '',
    tipoDocumentoFiscal: '1',
    identificadorDestinoOperacao: '1',
    codIbgeEmitente: '43',
    processoEmissao: '0',
    finalidadeEmissao: '1',
    indConsumidorFinal: '0',
    indPresenca: '0',
    tipoEmissao: '1',
    tipoImpressao: '0',
    versaoAplicativoEmissao: '1.0',
};

function testeEmissaoNFCe(empresa) {
    const nfeProc = new lib.NFeProcessor(empresa);
    console.log(nfeProc.gerarXmlNfce(documento));
}

function testeAssinaturaXML() {
    //Test assinatura
    let xml_test = '<consStatServ id="test" versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><cUF>43</cUF><xServ>STATUS</xServ></consStatServ>';
    let xmlAssinado = signUtils.signXmlX509(xml_test, 'consStatServ', cert);
    console.log(xmlAssinado)
}

//testeAssinaturaXML();
//testeConsultaStatusServico(empresa);
testeEmissaoNFCe(empresa);