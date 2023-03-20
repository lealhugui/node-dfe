
export class CertificateNotFoundError extends Error {
  constructor () {
    super('The received certificate path not found')
    this.name = 'CertificateNotFoundError'
  }
}

export class CertificatePasswordError extends Error {
  constructor () {
    super('The received password is wrong')
    this.name = 'CertificatePasswordError'
  }
}
