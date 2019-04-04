
export function getEnumByValue (enumType: any, value: any): any {
    if (!value) {
        return '';
    }
        
    let result = Object.keys(enumType).filter(i => enumType[i as any] == value);
    if (result.length <= 0)
        throw new Error('Valor ('+ value +') não localizado no Enum.');

    return enumType[result[0]];
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function removeSelfClosedFields(o: Object | any): void{
    Object.keys(o).forEach(key => {
        if (o[key] !== null && typeof o[key] === 'object') {
            removeSelfClosedFields(o[key]);
            return;
        }
        if (o[key] === undefined || o[key] === '' || o[key] === null) {
            delete o[key];
        }
    });
}

export function validaUrlWsdl(url: string) {
    if (!url.includes('?wsdl'))
        url += '?wsdl';
        
    return url;
}