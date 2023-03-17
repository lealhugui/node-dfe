type Output = {
    pem: string;
    key: string;
};
export declare abstract class KeyPem {
    static generate(path: string, password: string): Output;
}
export {};
