
const fs = require('fs');
const lib = require('./lib');
const signUtils = require('./lib/factory/signature');
const XmlHelper = require('./lib/factory/xmlHelper');
const path = require('path');

let cert = {
    key: fs.readFileSync('C:\\cert\\newKey.key'),
    pem: fs.readFileSync('C:\\cert\\test.pem'),
    pfx: fs.readFileSync('C:\\cert\\certificado.pfx'),
    password: fs.readFileSync('C:\\cert\\senha.txt')
    , rejectUnauthorized: false
};

let empresa = {
    razaoSocial: 'TESTE',
    nomeFantasia: 'TESTE',
    cnpj: '18885949000181',
    inscricaoEstadual: '144895078115',
    inscricaoMunicipal: '',
    codRegimeTributario: '1',//2
    endereco: {
        logradouro: 'Rua Teste',
        numero: 123,
        complemento: '',
        bairro: 'Bairro Teste',
        municipio: 'Cachoeirinha',
        codMunicipio: '3550308',
        uf: 'SP',
        cUf: '35',
        cep: '99999999',
        telefone: '999999999'
    },
    certificado: cert,
    idCSC: '1',
    CSC: ''
};

let responsavelTecnico = {
    cnpj: 'empresa teste',
    contato: 'teste',
    email: 'teste@teste.com',
    fone: '999999999',
    idCSRT: '01',
    CSRT: 'G8063VRTNDMO886SFNK5LDUDEI24XJ22YIPO'
};

let moment = require('moment');

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let documento = {
    dhEmissao: moment().format(),
    ambiente: '2',
    modelo: '55',
    numeroNota: randomInt(2, 9999),
    serie: '20',
    naturezaOperacao: 'VENDA',
    tipoDocumentoFiscal: '1',
    identificadorDestinoOperacao: '1',
    codUF: '35',
    codIbgeFatoGerador: '3550308',
    processoEmissao: '0',
    finalidadeEmissao: '1',
    indConsumidorFinal: '1',
    indPresenca: '1',
    tipoEmissao: '1',
    tipoImpressao: '0',
//     0=Sem geração de DANFE;
// 1=DANFE normal, Retrato;
// 2=DANFE normal, Paisagem;
// 3=DANFE Simplificado;
// 4=DANFE NFC-e;
// 5=DANFE NFC-e em mensagem eletrônica (o envio de
//     mensagem eletrônica pode ser feita de forma simultânea com a
//     impressão do DANFE; usar o tpImp=5 quando esta for a única
//     forma de disponibilização do DANFE).

    versaoAplicativoEmissao: 'NODE-NFE TEST 1.0',
};

let dest = {
    indicadorIEDestinario: '9',
    documento: '34493536837',
    nome: 'THIAGO FIGLIANO ROSA',
    isEstrangeiro: false,   
    email: '',
    endereco: {
        logradouro: 'RUA A',
        numero: 1,
        complemento: '',
        bairro: 'CENTRO',
        municipio: 'SÃO PAULO',
        codMunicipio: '3550308',
        cUf: '35',
        uf: 'SP',
        cep: '03071000',
        telefone: ''
    }
};

let transp = {
  modalidateFrete: '9'
};

let infoAdic = {
  infoComplementar: 'TESTE NFE 55'
};

let produtos = [];
let valorProduto = 31.80;
let valorTotalProdutos = 0;
for (let i = 1; i <= 1; i++) {
    valorTotalProdutos += valorProduto;
    produtos.push({
        prod: {
            codigo: '84233',
            cEAN: '7898221456293',
            descricao: 'PRODUTO TESTE',
            cest: '2104400',
            NCM: '85164000',
            CFOP: '5102',
            unidadeComercial: 'SAC',
            quantidadeComercial: '1.0000',
            valorUnitarioComercial: valorProduto.toFixed(2),
            valorTotal: valorProduto.toFixed(2),
            cEANTrib: '7898221456293',
            unidadeTributavel: 'SAC',
            quantidadeTributavel: '1.0000',
            valorUnitarioTributavel: valorProduto.toFixed(2),
            indicadorTotal: '1',
            valorFrete: '',
            valorSeguro: '',
            valorDesconto: '',
            valorOutro: '',
            numeroPedido: '123',
            numeroItemPedido: '1',
        },
        imposto: {
            valorAproximadoTributos: 0,
            icms: {
                orig: '0',
                CSOSN: '400'
            },
            pis: {
                CST: '01',
                vBC: 0,
                pPIS: 0.17,
                vPIS: 0
            },
            cofins: {
                CST: '01',
                pCOFINS: 0.81,
                vBC: 0,
                vCOFINS: 0
            }
        },
        //infoAdicional: 'TEST',
        numeroItem: i,
    });
}

let pagamento = {
  //valorTroco: '',
  pagamentos: [{
      indicadorFormaPagamento: '',
      formaPagamento: '01',
      valor: valorTotalProdutos.toFixed(2),
      dadosCartao: {
        tipoIntegracao: '1',
        cnpj: '99999999999999',
        bandeira: '01',
        codAutorizacao: '1321231231'
      }
  }]
};

let icmsTot = {
    vBC: 0,
    vICMS: 0,
    vICMSDeson: '0.00',
    //vFCPUFDest: '0.00',
    //vICMSUFDest:'0.00',
    //vICMSUFRemet: '0.00',
    vFCP: '0.00',
    vBCST: '0.00',
    vST: '0.00',
    vFCPST: '0.00',
    vFCPSTRet: '0.00',
    vProd: valorTotalProdutos.toFixed(2),
    vFrete: '0.00',
    vSeg: '0.00',
    vDesc: '0.00',
    vII: '0.00',
    vIPI: '0.00',
    vIPIDevol: '0.00',
    vPIS: '0.00',
    vCOFINS: '0.00',
    vOutro: '0.00',
    vNF: valorTotalProdutos.toFixed(2),
    //vTotTrib: '0.00',
};

let nfce = {
    docFiscal: documento,
    destinatario: dest,
    produtos: produtos,
    total: {icmsTot: icmsTot},
    transporte: transp,
    pagamento: pagamento,
    infoAdicional: infoAdic
};


const configuracoes = {
    empresa,
    certificado: cert,
    geral: {
        ambiente: '2',
        modelo: '55',
        versao: '4.00'
    },
    arquivos: {
        salvar: true,
        pastaEnvio: path.join(__dirname, 'xml_envio'),
        pastaRetorno: path.join(__dirname, 'xml_retorno'),
        pastaXML: path.join(__dirname, 'xml'),
    }
}

async function testeEmissaoNFe() {
    const nfeProc = new lib.NFeProcessor(configuracoes);

    const ini = new Date();
    let result = await nfeProc.processarDocumento(nfce);
    const fin = new Date();
    console.log(`${(fin.getTime() - ini.getTime())/1000}s`)

    result = require('util').inspect(result, false, null);
    console.log('Resultado Emissão NF-e: \n\n' + result);
}

async function testeEmissaoNFCeContingenciaOffline(empresa) {
    const nfeProc = new lib.NFeProcessor(empresa);

    nfce.docFiscal.isContingenciaOffline = true;
    nfce.docFiscal.dhContingencia = moment().format();
    nfce.docFiscal.justificativaContingencia = 'TESTE CONTINGENCIA';

    let result = await nfeProc.processarDocumento(nfce);
    //console.log('Resultado Geração XML NFC-e Contingencia: \n\n' + require('util').inspect(result, false, null) + '\n\n');

    let result_emissao = await nfeProc.transmitirXml(Object(result.retornoContingenciaOffline).xml_gerado,'2', null);
    console.log('Resultado Transmissão XML Contingencia: \n\n' + require('util').inspect(result_emissao, false, null));
    
}

function testeAssinaturaXML() {
    //Test assinatura
    let xml_test = '<consStatServ id="test" versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><cUF>43</cUF><xServ>STATUS</xServ></consStatServ>';
    let xmlAssinado = signUtils.Signature.signXmlX509(xml_test, 'consStatServ', cert);
    console.log(xmlAssinado)
}

function testeQRcodeNFCe(){
    //urls qrcode: http://nfce.encat.org/consulte-sua-nota-qr-code-versao-2-0/
    const nfeProc = new lib.NFeProcessor(empresa);
    console.log(nfeProc.gerarQRCodeNFCeOnline('https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?', '43181296418264011920650200000086101048053960', '2', '2', empresa.idCSC, empresa.CSC));
}

// TESTES STATUS SERVICO:
async function testeConsultaStatusServico(empresa, ambiente, modelo) {
    const statusProc = new lib.StatusServicoProcessor(empresa, ambiente, modelo);
    let result = await statusProc.processarDocumento();
    console.log(result.data);
    
    console.log(result.data.retConsStatServ.xMotivo);
}

function testeDesereliaze() {
    let xml = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><nfeResultMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4"><retConsStatServ versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><verAplic>RSnfce201805211008</verAplic><cStat>107</cStat><xMotivo>Servico em Operacao</xMotivo><cUF>43</cUF><dhRecbto>2019-03-21T22:37:44-03:00</dhRecbto><tMed>1</tMed></retConsStatServ></nfeResultMsg></soap:Body></soap:Envelope>
    <consStatServ versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><tpAmb>2</tpAmb><cUF>43</cUF><xServ>STATUS</xServ></consStatServ>`; 

    let obj = XmlHelper.XmlHelper.deserializeXml(xml);
    console.log(require('util').inspect(obj, false, null))
}

function testHashRespTec(){
    const nfeProc = new lib.NFeProcessor(empresa);
    console.log(nfeProc.gerarHashCSRT('41180678393592000146558900000006041028190697', 'G8063VRTNDMO886SFNK5LDUDEI24XJ22YIPO'));
}

const evento = {
    // id: string;
    // tpAmbiente: configuracoes.ambiente,
    // CNPJ: empresa.CNPJ,
    // cOrgao: empresa.cOrgao,
    chNFe: '35200418885949000181550200000060481462915175',
    dhEvento: moment().format(),
    tpEvento: '110111',
    nSeqEvento: 1,
    detEvento: {
        descEvento:'Cancelamento',
        nProt:'135200002917461',
        xJust: 'TESTE DE CANCELAMENTO DA NFE........'
    }
}

async function testeEventoNFe() {
    const eventoProc = new lib.EventoProcessor(configuracoes);

    const ini = new Date();
    let result = await eventoProc.executar(evento);
    const fin = new Date();
    console.log(`${(fin.getTime() - ini.getTime())/1000}s`)

    result = require('util').inspect(result, false, null);
    console.log('Resultado Emissão NF-e: \n\n' + result);
}

async function testeConsultaRecibo() {
    const nfeProc = new lib.RetornoProcessor(configuracoes);

    const ini = new Date();
    const recibo = '351000140151879'
    let result = await nfeProc.executar(recibo);
    const fin = new Date();
    console.log(`${(fin.getTime() - ini.getTime())/1000}s`)

    result = require('util').inspect(result, false, null);
    console.log('Resultado consulta recibo NF-e: \n\n' + result);
}

// testeConsultaRecibo()
// testeAssinaturaXML();
// testeConsultaStatusServico(empresa, '2', '65');
// testeDesereliaze();
// testeEmissaoNFCe();
// testeEmissaoNFCeContingenciaOffline(empresa);
//testeQRcodeNFCe();
//testHashRespTec();

//  testeEmissaoNFe();
testeEventoNFe()


// openssl pkcs12 -in mycaservercert.pfx -nokeys -out mycaservercert.pem
// openssl pkcs12 -in mycaservercert.pfx -nodes -nocerts -out mycaservercertkey.pem
// openssl rsa -in mycaservercertkey.pem -check -out mycaservercertkeyrsa.pem
// limpar primeiras linhas do mycaservercert.pem ou no linux, executar awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' cert-name.pem
// REFERENCIA: https://docs.vmware.com/br/Unified-Access-Gateway/3.2/com.vmware.uag-32-deploy-config.doc/GUID-870AF51F-AB37-4D6C-B9F5-4BFEB18F11E9.html