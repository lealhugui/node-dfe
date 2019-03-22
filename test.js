
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
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    codRegimeTributario: '3',
    endereco: {
        logradouro: 'Rua Teste',
        numero: 123,
        complemento: '',
        bairro: 'Bairro Teste',
        municipio: 'Cachoeirinha',
        codMunicipio: '4303103',
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

function testeDesereliaze() {
    let xml = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><nfeResultMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4"><retConsStatServ versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><verAplic>RSnfce201805211008</verAplic><cStat>107</cStat><xMotivo>Servico em Operacao</xMotivo><cUF>43</cUF><dhRecbto>2019-03-21T22:37:44-03:00</dhRecbto><tMed>1</tMed></retConsStatServ></nfeResultMsg></soap:Body></soap:Envelope>
    <consStatServ versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><cUF>43</cUF><xServ>STATUS</xServ></consStatServ>`; 

    let obj = XmlHelper.deserializeXml(xml);
    console.log(require('util').inspect(obj, false, null))
}


let moment = require('moment');

let documento = {
    dhEmissao: moment().format(),
    ambiente: '2',
    modelo: '65',
    numeroNota: 1,
    serie: '1',
    naturezaOperacao: 'VENDA',
    tipoDocumentoFiscal: '1',
    identificadorDestinoOperacao: '1',
    codUF: '43',
    codIbgeFatoGerador: '4303103',
    processoEmissao: '0',
    finalidadeEmissao: '1',
    indConsumidorFinal: '1',
    indPresenca: '1',
    tipoEmissao: '1',
    tipoImpressao: '4',
    versaoAplicativoEmissao: '1.0',
};

let dest = {
    indicadorIEDestinario: '9'
};


let transp = {
  modalidateFrete: '9'
};

let infoAdic = {
  infoComplementar: 'TEST'
};

let produtos = [];

/*
    cNPJFab: string;
    cBenef: string;
    eXTIPI: string;*/
produtos.push({
    prod: {
        codigo: '1234',
        cEAN: '',
        descricao: 'PRODUTO TESTE',
        cest: '0500100',
        NCM: '25232910',
        CFOP: '5405',
        unidadeComercial: 'SAC',
        quantidadeComercial: '1.0000',
        valorUnitarioComercial: '31.8000000000',
        valorTotal: '31.80',
        cEANTrib: '',
        unidadeTributavel: 'SAC',
        quantidadeTributavel: '1.0000',
        valorUnitarioTributavel: '31.8000000000',
        indicadorTotal: '1',
        valorFrete: '0',
        valorSeguro: '0',
        valorDesconto: '0',
        valorOutros: '0',
        numeroPedido: '123',
        numeroItemPedido: '1',
    },
    imposto: {
        valorAproximadoTributos: 0,
        icms: {
            cst: '60',
            origem: '5',
            baseCalc: '31.80',
            aliquota: '0.00',
            valor: '0.00',
            baseCalcST: '31.80',
            valorST: '0.00',
            aliquotaST: '0.00',
            percentualReducaoBaseCalc: '0.00',
        }
    },
    infoAdicional: 'TEST',
    numeroItem: 1,
});

let pagamento = {
  valorTroco: '0.00',
  pagamentos: [{
      indicadorFormaPagamento: '0',
      formaPagamento: '01',
      valor: '31.80',
      //dadosCartao: {}
  }]
};

let icmsTot = {
    vBC: '0.00',
    vICMS: '0.00',
    vICMSDeson: '0.00',
    vFCPUFDest: '0.00',
    vICMSUFDest:'0.00',
    vICMSUFRemet: '0.00',
    vFCP: '0.00',
    vBCST: '0.00',
    vST: '0.00',
    vFCPST: '0.00',
    vFCPSTRet: '0.00',
    vProd: '31.80',
    vFrete: '0.00',
    vSeg: '0.00',
    vDesc: '0.00',
    vII: '0.00',
    vIPI: '0.00',
    vIPIDevol: '0.00',
    vPIS: '0.00',
    vCOFINS: '0.00',
    vOutro: '0.00',
    vNF: '31.80',
    vTotTrib: '0.00',
};

let nfce = {
    docFiscal: documento,
    //destinatario: dest,
    produtos: produtos,
    total: {icmsTot: icmsTot},
    transporte: transp,
    pagamento: pagamento,
    infoAdicional: infoAdic
};

async function testeEmissaoNFCe(empresa) {
    const nfeProc = new lib.NFeProcessor(empresa);
    await nfeProc.processarDocumento(nfce);
}

function testeAssinaturaXML() {
    //Test assinatura
    let xml_test = '<consStatServ id="test" versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><cUF>43</cUF><xServ>STATUS</xServ></consStatServ>';
    let xmlAssinado = signUtils.signXmlX509(xml_test, 'consStatServ', cert);
    console.log(xmlAssinado)
}

function testeQRcodeNFCe(){
    //urls qrcode: http://nfce.encat.org/consulte-sua-nota-qr-code-versao-2-0/
    const nfeProc = new lib.NFeProcessor(empresa);
    console.log(nfeProc.gerarQRCodeNFCeOnline('https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?', '43190399999999999999650010000000011544962464', '2', '2', '1', '123456'));
}

//testeAssinaturaXML();
//testeConsultaStatusServico(empresa);
//testeDesereliaze();
testeEmissaoNFCe(empresa);
//testeQRcodeNFCe();

