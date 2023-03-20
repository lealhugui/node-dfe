const fs = require('fs');
const pemKey = require('./lib/factory/key-pem-generator');

const keypem = generateKeyPem()
let cert = {
    pem: keypem.pem,
    key: keypem.key,
};
function generateKeyPem(){
    const data = pemKey.KeyPem.generate('certificado/certificado.pfx', fs.readFileSync('certificado/senha', 'utf8'))
    return data
}
console.log(cert)