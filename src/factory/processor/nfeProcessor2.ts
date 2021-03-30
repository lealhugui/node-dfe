import {
    RetornoProcessamentoNF, RetornoProcessamento, NFCeDocumento, NFeDocumento, Configuracoes
} from '../interface/nfe';

import { RetornoProcessor } from './retornoProcessor';
import { EnviaProcessor } from './enviaProcessor';
import { EventoProcessor } from './eventoProcessor';
import { InutilizaProcessor } from './inutilizaProcessor';
import { Inutilizar } from '../interface/inutilizacao';
import { Evento } from '../interface';
import { XmlHelper } from '../xmlHelper';
import * as Utils from '../utils/utils';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from '../schema';



/**
 * Classe para processamento de NFe/NFCe
 */
export class NFeProcessor {
    private retornoProcessor: any = null;
    private enviaProcessor: any = null;
    private eventoProcessor: any = null;
    private inutlizacaoProcessor: any = null;

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


        this.retornoProcessor = new RetornoProcessor(this.configuracoes);
        this.enviaProcessor = new EnviaProcessor(this.configuracoes);
        this.eventoProcessor = new EventoProcessor(this.configuracoes);
        this.inutlizacaoProcessor = new InutilizaProcessor(this.configuracoes);
    }

    /**
     * Metodo para realizar o processamento de documento(s) do tipo 55 ou 65 de forma sincrona
     * @param documento Array de documentos modelo 55 ou 1 documento modelo 65
     */    
    public async processarDocumento(documento: NFeDocumento | NFCeDocumento) {
        let result = <RetornoProcessamentoNF> await this.executar(documento);
        return result;
    }

    public async executar(documento: NFeDocumento | NFCeDocumento) {
        const { arquivos, geral } = this.configuracoes;
        let result = <RetornoProcessamentoNF>{};
        try {
            result = <RetornoProcessamentoNF>await this.enviaProcessor.executar(documento);

            let retEnviNFe = null;
            let retConsReciNFe = null;
            let cStat = '';

            if (result.envioNF && result.envioNF.data) {
                const data = Object(result.envioNF.data);
                if (data.retEnviNFe && geral.modelo == '55') {
                    retEnviNFe = data.retEnviNFe;
                    const recibo = retEnviNFe.infRec.nRec;
                    result.consultaProc = <RetornoProcessamento>await this.retornoProcessor.executar(recibo);
                    retConsReciNFe = Object(result.consultaProc.data).retConsReciNFe;
                    cStat = retConsReciNFe.cStat;
                }

                if (retEnviNFe && retConsReciNFe)
                    if (retEnviNFe.cStat == '103' && retConsReciNFe.cStat == '104') { //protNFe.infProt.
                        result.confirmada = true;
                        result.success = true;
                    }

                if (arquivos && arquivos.salvar) {
                    if (!fs.existsSync(arquivos.pastaEnvio)) fs.mkdirSync(arquivos.pastaEnvio, { recursive: true });
                    if (!fs.existsSync(arquivos.pastaRetorno)) fs.mkdirSync(arquivos.pastaRetorno, { recursive: true });
                    if (!fs.existsSync(arquivos.pastaXML)) fs.mkdirSync(arquivos.pastaXML, { recursive: true });
        
                    if ((result.success == true) && (retConsReciNFe.cStat == '104')) {
                        const filename = `${arquivos.pastaXML}${retConsReciNFe.protNFe.infProt.chNFe}-procNFe.xml`;
                        
                        const nfe_enviada = Object(XmlHelper.deserializeXml(result.envioNF.xml_enviado, { explicitArray: false }));
                        const nfeProc = <schema.TNfeProc>{
                            $: { versao: "1.00", xmlns: "http://www.portalfiscal.inf.br/nfe" },
                            NFe: nfe_enviada.enviNFe.NFe,
                            protNFe: retConsReciNFe.protNFe
                        };

                        Utils.removeSelfClosedFields(nfeProc);
                        let xmlNfeProc = XmlHelper.serializeXml(nfeProc, 'nfeProc');

                        fs.writeFileSync(filename, xmlNfeProc);
                    } else {
                        const filenameEnvio = `${arquivos.pastaEnvio}${retEnviNFe.infRec.nRec}-enviNFe.xml`;
                        const filenameRetorno = `${arquivos.pastaRetorno}${retEnviNFe.infRec.nRec}-retEnviNFe.xml`;
                        fs.writeFileSync(filenameEnvio, result.envioNF.xml_enviado);
                        fs.writeFileSync(filenameRetorno, result.envioNF.xml_recebido);

                        const filenameConsultaEnvio = `${arquivos.pastaEnvio}${retConsReciNFe.nRec}-consReciNFe.xml`;
                        const filenameConsultaRetorno = `${arquivos.pastaRetorno}${retConsReciNFe.nRec}-retConsReciNFe.xml`;
                        fs.writeFileSync(filenameConsultaEnvio, result.consultaProc.xml_enviado);
                        fs.writeFileSync(filenameConsultaRetorno, result.consultaProc.xml_recebido);       
                    }
                }
            } else if (result.retornoContingenciaOffline && result.success) {
                return result;
            } else {
                console.error('nfeProcessor.executar: Erro ao realizar requisição', result);
                throw new Error('Erro ao realizar requisição');
            }
        } catch (ex) {
            result.success = false;
            result.error = ex;
        }

        return result;
    }

    public async inutilizarNumeracao( dados: Inutilizar) {
        return await this.inutlizacaoProcessor.executar( dados );
    }

    public async gerarEvento( evento: Evento ) {
        return await this.eventoProcessor.executar(evento);
    }

    public async processarXmlContingencia(xml: string) {
        return await this.enviaProcessor.transmitirXml(xml);
    }

}
