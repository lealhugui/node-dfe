const fs = require('fs');
const lib = require('./lib');
const libFactory = require('./lib/factory');
const signUtils = new libFactory.Signature();
const XmlHelper = new libFactory.XmlHelper();

let cert = {
    key: fs.readFileSync('C:\\cert\\newKey.key'),
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
    await statusProc.processarDocumento();
}


//Test deserialize:
//let obj = XmlHelper.deserializeXml(xml);
//console.log(obj)

//Test assinatura
//let xmlAssinado = signUtils.signXml(xml, 'consStatServ', cert.key);
//console.log('Xml Assinado -->', xmlAssinado)


let documento = {
    modelo: '65',
    numeroNota: 1,
    serie: '1',
    naturezaOperacao: 'VENDA',
    codIbge: '',
    codigoNotaFiscal: '',
    tipoDocumentoFiscal: '',
    identificadorDestinoOperacao: '',
    codIbgeEmitente: '43'
};

function testeEmissaoNFCe(empresa) {
    const nfeProc = new lib.NFeProcessor(empresa);
    console.log(nfeProc.gerarXmlNfce(documento));
}

//testeConsultaStatusServico(empresa);
testeEmissaoNFCe(empresa);