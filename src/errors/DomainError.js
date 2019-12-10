export default class DomainError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DomainError'
    this.status = 412
    this.code = 0
    this.suppressStackTrace = false
  }
}
