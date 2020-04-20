import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper, WebProxy } from "../webservices/webserviceHelper";
import { Empresa, ServicosSefaz, Configuracoes, RetornoProcessamento } from "../interface/nfe";
import * as Utils from "../utils/utils";
import { SefazNFCe } from "../webservices/sefazNfce";
import { SefazNFe } from "../webservices/sefazNfe";
import { Evento, DetalheEvento } from '../interface';
import { Signature } from '../signature';
import * as fs from 'fs';
import * as path from 'path';

let soapEvento: any = null;

/**
 * Classe para processamento de Eventos ( Cancelamento / Inutilização )
 */
export class EventoProcessor {

    constructor(
        private configuracoes: Configuracoes
    ) {
        if (!this.configuracoes.geral.versao) this.configuracoes.geral.versao = '4.00';
        if (!this.configuracoes.webservices) this.configuracoes.webservices = { tentativas: 3, aguardarConsultaRetorno: 1000 };
        if (!this.configuracoes.webservices.tentativas) this.configuracoes.webservices.tentativas = 3;
        if (!this.configuracoes.webservices.aguardarConsultaRetorno) this.configuracoes.webservices.aguardarConsultaRetorno = 1000;
        if (this.configuracoes.arquivos) {
            if (this.configuracoes.arquivos.pastaEnvio && (!'/\\'.includes(this.configuracoes.arquivos.pastaEnvio.substr(-1))))
                this.configuracoes.arquivos.pastaEnvio = this.configuracoes.arquivos.pastaEnvio + path.sep;
            if (this.configuracoes.arquivos.pastaRetorno && (!'/\\'.includes(this.configuracoes.arquivos.pastaRetorno.substr(-1))))
                this.configuracoes.arquivos.pastaRetorno = this.configuracoes.arquivos.pastaRetorno + path.sep;
            if (this.configuracoes.arquivos.pastaXML && (!'/\\'.includes(this.configuracoes.arquivos.pastaXML.substr(-1))))
                this.configuracoes.arquivos.pastaXML = this.configuracoes.arquivos.pastaXML + path.sep;
        }



    }

    public async executar(evento: Evento) {
        let result = <RetornoProcessamento>{
            success: false
        };

        try {
            const { geral: { modelo, ambiente }, empresa, arquivos } = this.configuracoes
            const Sefaz = modelo == '65' ? SefazNFCe : SefazNFe;

            soapEvento = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, ServicosSefaz.evento);

            const xml = this.gerarXml(evento);
            const xmlAssinado = Signature.signXmlX509(xml, 'infEvento', this.configuracoes.certificado);

            let xmlLote = this.gerarXmlLote(xmlAssinado);

            result = await this.transmitirXml(xmlLote);

            if (arquivos.salvar && result.success == true) {
                console.log('pasta para salvar', arquivos.pastaXML)

                // if (! await fs.existsSync(arquivos.pastaEnvio)) await fs.mkdirSync(arquivos.pastaEnvio, { recursive: true });
                // if (! await fs.existsSync(arquivos.pastaRetorno)) await fs.mkdirSync(arquivos.pastaRetorno, { recursive: true });
                if (!await fs.existsSync(arquivos.pastaXML)) await fs.mkdirSync(arquivos.pastaXML, { recursive: true });

                const filename = `${arquivos.pastaXML}${evento.chNFe}${evento.tpEvento}-procEventoNFe.xml`;

                const procEvento = <schema.TProcEvento> {
                    $: { versao: "1.00", xmlns: "http://www.portalfiscal.inf.br/nfe" },
                    _: '[XML_EVENTO]',
                    retEvento: Object(result.data).retEnvEvento
                };

                Utils.removeSelfClosedFields(procEvento);
                let xmlProcEvento = XmlHelper.serializeXml(procEvento, 'procEvento');
                xmlProcEvento = xmlProcEvento.replace('[XML_EVENTO]', xmlAssinado);

                await fs.writeFileSync(filename, xmlProcEvento);
            }
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }

    private async transmitirXml(xml: string) {
        const { geral: { modelo, ambiente }, empresa, certificado, webProxy } = this.configuracoes;

        const Sefaz = modelo == '65' ? SefazNFCe : SefazNFe;
        const soap = Sefaz.getSoapInfo(empresa.endereco.uf, ambiente, ServicosSefaz.evento);
        return await WebServiceHelper.makeSoapRequest(xml, certificado, soap, webProxy);
    }

    private getInfEvento(evento: Evento) {
        const { geral: { ambiente }, empresa } = this.configuracoes;
        const _ID = `ID${evento.tpEvento}${evento.chNFe}${("00" + evento.nSeqEvento).slice(-2)}`;
        if (_ID.length < 54) throw 'ID de Evento inválido';

        return <schema.TEventoInfEvento>{
            $: { Id: _ID },
            cOrgao: empresa.endereco.cUf,
            tpAmb: Utils.getEnumByValue(schema.TAmb, ambiente),
            CNPJ: empresa.cnpj,
            chNFe: evento.chNFe,
            dhEvento: evento.dhEvento,
            tpEvento: evento.tpEvento,
            nSeqEvento: evento.nSeqEvento,
            verEvento: '1.00',
            detEvento: this.getDetEvento(evento)
        };
    }

    private getDetEvento(evento: Evento) {
        //TODO: transformar tpEvento em enum
        const result = <schema.TEventoInfEventoDetEvento>{
            $: { versao: '1.00' },
            descEvento: evento.detEvento.descEvento,
        };
        if (evento.tpEvento == 'cce') {
            result.xCorrecao = evento.detEvento.xCorrecao;
            result.xCondUso = evento.detEvento.xCondUso;
        };
        if (evento.tpEvento == '110111') { //cancelamento
            result.nProt = evento.detEvento.nProt;
            result.xJust = evento.detEvento.xJust;
        };
        if (evento.tpEvento == 'cancSubst') {
            // if Utils. (result.chNFeRef', '', 'Chave de NFe Refenciada inválida'
            result.cOrgaoAutor = evento.detEvento.cOrgaoAutor;
            result.tpAutor = '001';
            result.verAplic = evento.detEvento.verAplic;
            result.nProt = evento.detEvento.nProt;
            result.xJust = evento.detEvento.xJust;
            result.chNFeRef = evento.detEvento.chNFeRef;
        };
        if (evento.tpEvento == 'manifDestOperNaoRealizada') {
            result.xJust = evento.detEvento.xJust;
        };

        return result;
    }

    private gerarXml(evento: Evento) {
        const { geral: { versao } } = this.configuracoes;
        const xmlEvento = <schema.TEvento>{
            $: {
                versao: '1.00',
                xmlns: 'http://www.portalfiscal.inf.br/nfe'
            },
            infEvento: this.getInfEvento(evento)
        };

        Utils.removeSelfClosedFields(xmlEvento);
        // pcnEnvEventoNFe ln 160
        return XmlHelper.serializeXml(xmlEvento, 'evento');
    }

    private gerarXmlLote(xml: string) {
        //TODO: ajustar para receber uma lista de xmls...
        const { geral: { versao } } = this.configuracoes;

        const loteId = Utils.randomInt(1, 999999999999999).toString();
        const envEvento = <schema.TEnviEvento>{
            $: { versao: '1.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
            idLote: loteId,
            _: '[XMLS]'
        };

        const xmlLote = XmlHelper.serializeXml(envEvento, 'envEvento');
        return xmlLote.replace('[XMLS]', xml);
    }

}