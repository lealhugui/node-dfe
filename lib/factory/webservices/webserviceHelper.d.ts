import { RetornoProcessamento } from '../interface/nfe';
export interface WebProxy {
    host: string;
    port: string;
    isHttps?: boolean;
    auth?: {
        username: string;
        password: string;
    };
}
export declare abstract class WebServiceHelper {
    private static httpPost;
    static buildSoapEnvelope(xml: string, soapMethod: string): string;
    private static buildSoapRequestOpt;
    private static buildCertAgentOpt;
    static makeSoapRequest(xml: string, cert: any, soap: any, proxy?: WebProxy): Promise<RetornoProcessamento>;
}
