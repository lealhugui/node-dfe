"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEnumByValue(enumType, value) {
    if (!value) {
        return '';
    }
    let result = Object.keys(enumType).filter(i => enumType[i] == value);
    if (result.length <= 0)
        throw new Error('Valor (' + value + ') não localizado no Enum.');
    return enumType[result[0]];
}
exports.getEnumByValue = getEnumByValue;
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;
function removeSelfClosedFields(o) {
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
exports.removeSelfClosedFields = removeSelfClosedFields;
function validaUrlWsdl(url) {
    if (!url.includes('?wsdl'))
        url += '?wsdl';
    return url;
}
exports.validaUrlWsdl = validaUrlWsdl;
function log(msg, processo) {
    console.log(`[node-dfe][${processo || 'log'}]->${msg}`);
}
exports.log = log;
function jsonOneLevel(obj) {
    const result = {};
    for (const k of Object.keys(obj)) {
        let logStr = obj[k].toString() || "null";
        if (logStr.length > 500) {
            logStr = logStr.substring(0, 499);
        }
        result[k] = logStr;
    }
    return JSON.stringify(result);
}
exports.jsonOneLevel = jsonOneLevel;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.timeout = timeout;
async function sleep(fn, ms, ...args) {
    await timeout(ms);
    return fn(...args);
}
exports.sleep = sleep;
