[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lealhugui_node-dfe&metric=alert_status)](https://sonarcloud.io/dashboard?id=lealhugui_node-dfe)

# node-dfe
Biblioteca para geração/integração de NF-e/NFC-e em aplicações node.js

## HELP WANTED!!
OSS no Brasil é incrivelmente dificil, especialmente com o volume de trabalho e as cargas horarias que o mercado de trabalho brasileiro acaba impondo sob nossas vidas. Isso faz com que o tempo que tenhamos para investir em manutençao de projetos OS como esse acabe sendo bem reduzido (especialmente pela natureza "non profit" deste projeto). Portanto, se voce gostou da lib, ou se tem interesse em contribuir para algum projeto OS e ganhar alguma experiencia, sinta-se livre para enviar uma PR, ou apenas ajudar com as discussoes nos Issues abertos.

Entre no grupo do Discord https://discord.gg/P8WthxdtNy

## Instalação
A instalação pode ser feita diretamente via npm/yarn. Nao é requerido nenhum passo adicional.

```npm install node-dfe```

## Requisitos

NodeJs v8+, e um certificado A1 válido.
Certificados tipo A3 nao sao suportados (mas fica ai uma PR bem interessante ;) )

## Exemplo

```javascript
const { NFeProcessor } = require('node-dfe')
const dadosEmpresa = {...}
const dadosNFe = {...}
const nfeProcessor = new NFeProcessor(dadosEmpresa)
const docEmitido = await nfeProcessor.processarDocumento(dadosNFe)

if (!docEmitido.success) {
    throw new Exception(docEmitido.error)
} else {
    const env = docEmitido.envioNF
    console.log(env.xml_recebido)
    console.log(env.data.retEnviNFe.protNFe.infProt.nProt)
}
```

Exemplos completos da estrutura podem ser vistos em ```test.js```

## Releases

As releases do ```node-dfe``` seguem as liberações de versao/NT da SEFAZ, no formato [MAJOR].[MINOR].[FIX], sendo que:

- Major: Atualização do formato geral da NFe: Atualmente com a NFe 4.0, a node-dfe segue na versão '0'.
- Minor: Atualização de Nota Tecnica da NFe: a node-dfe contempla a partir da NT2018.005 v1.20 como versao '0'
- Fix: Correções e implementações internas da node-dfe.

## Estado Atual e Proximos Passos

Atualmente a biblioteca suporta eventos de emissao de DF-es modelo 55 e 65 (NF-e e NFC-e) para todos os estados, nos modelos sincrono e assincrono. 
Rotinas como: Cancelamento, Carta de Correção e Inutilização, devem ser testadas em outras UF, foram feitos testes apenas em SP.
