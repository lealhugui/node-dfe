
export function getEnumByValue (enumType: any, value: any): any {
    let result = Object.keys(enumType).filter(i => enumType[i as any] == value);
    if (result.length <= 0)
        throw new Error('Valor ('+ value +') não localizado no Enum.');

    return enumType[result[0]];
}
