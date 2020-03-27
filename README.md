[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lealhugui_node-dfe&metric=alert_status)](https://sonarcloud.io/dashboard?id=lealhugui_node-dfe)

# node-dfe
Biblioteca para geração/integração de NF-e/NFC-e em aplicações node.js

## Instalação
A instalação pode ser feita diretamente via npm/yarn. Nao é requerido nenhum passo adicional.

```npm install node-dfe```

## Requisitos

A biblioteca foi testada em plataformas windows/linux, 32 e 64 bits. O unico requisito real é nodejs v8+.

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

Atualmente a biblioteca suporta eventos de emissao de DF-es modelo 65 (NFC-e) para todos os estados, nos modelos sincrono e assincrono. As proximas versoes Fix devem contemplar ajustes necessários para emissão de DF-e modelo 55 (NF-e) e também diferentes eventos para estes modelos (inutilização e cancelamento por exemplo).
