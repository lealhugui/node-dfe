"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatePasswordError = exports.CertificateNotFoundError = void 0;
class CertificateNotFoundError extends Error {
    constructor() {
        super('The received certificate path not found');
        this.name = 'CertificateNotFoundError';
    }
}
exports.CertificateNotFoundError = CertificateNotFoundError;
class CertificatePasswordError extends Error {
    constructor() {
        super('The received password is wrong');
        this.name = 'CertificatePasswordError';
    }
}
exports.CertificatePasswordError = CertificatePasswordError;
