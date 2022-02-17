function getContentType(uf) {
    switch (uf) {
        case 'GO':
            return "application/soap+xml";
        case 'AC':
        case 'AL':
        case 'AP':
        case 'DF':
        case 'ES':
        case 'MG':
        case 'PB':
        case 'RJ':
        case 'RN':
        case 'RO':
        case 'RR':
        case 'RS':
        case 'SC':
        case 'SE':
        case 'SP':
        case 'TO':
        case 'AM':
        case 'BA':
        case 'CE':
        case 'MA':
        case 'MS':
        case 'MT':
        case 'PA':
        case 'PE':
        case 'PI':
        case 'PR':
            return "text/xml;charset=utf-8";
        default:
            throw new Error('Content Type não encontrado!');
    }
}

module.exports = {
    getContentType
};
