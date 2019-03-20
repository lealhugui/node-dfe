const service = {
    //TODO: buscar URL conforme UF e Ambiente
    url: 'https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx?wsdl',
    soapMethod: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4',
    soapAction: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF'
}

import { WebServiceHelper } from './webserviceHelper'

export class ConsultarStatusServico {

    async consultarStatusServico(xml: string, cert: any) {
        return await new WebServiceHelper().makeSoapRequest(xml, cert, service);
    }
}

