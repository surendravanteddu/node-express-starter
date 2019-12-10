import {DomainError} from '.'

export default class NotFoundError extends DomainError {
  constructor (message, code = 404) {
    super(message)
    this.name = this.constructor.name
    this.status = 404
    this.code = code
  }

  static recordId = (id) => {
    return new NotFoundError(`The requested record could not be found using id:${id}.`)
  }
}
