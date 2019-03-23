
export function getEnumByValue (enumType: any, value: any): any {
    let result = Object.keys(enumType).filter(i => enumType[i as any] == value);
    if (result.length <= 0)
        throw new Error('Valor ('+ value +') não localizado no Enum.');

    return enumType[result[0]];
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
