
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


export function log(msg: string, processo?: string) {
    console.log(`[node-dfe][${processo || 'log'}]->${msg}`);
}

export function jsonOneLevel(obj: any): string {
    const result: any = {}


    for (const k of Object.keys(obj)) {
        let logStr = obj[k].toString() || "null";
        if (logStr.length > 500) {
            logStr = logStr.substring(0, 499)
        }
        result[k] = logStr
    }

    return JSON.stringify(result)
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function sleep(fn: any, ms: number, ...args: any) {
    await timeout(ms);
    return fn(...args);
}