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
    static buildSoapEnvelope(xml: string, soapMethod: string): string;
    static makeSoapRequest(xml: string, cert: any, soap: any, proxy?: WebProxy): Promise<RetornoProcessamento>;
}
