import {DomainError} from '.'

export default class AuthenticationError extends DomainError {
  constructor (message, code = 401) {
    super(message)
    this.name = this.constructor.name
    this.status = code
    this.code = code
  }
}
