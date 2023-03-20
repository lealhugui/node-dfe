import {KeyPem} from './src/factory/key-pem-generator';
import {readFileSync} from 'fs'


const keypem = generateKeyPem()
let cert = {
    pem: keypem.pem,
    key: keypem.key,
};
function generateKeyPem(){
    const data = KeyPem.generate('certificado/certificado.pfx', readFileSync('certificado/senha', 'utf8'))
    return data
}
console.log(cert)