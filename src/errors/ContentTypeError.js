import {DomainError} from '.'

export default class ContentTypeError extends DomainError {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.status = 415 // Unsupported Media Type
    this.code = 415
    this.suppressStackTrace = true
  }

  static notJson = () => {
    let msg = ['The request did not include the correct Content-Type header.']
    msg.push('Only json is supported for the request message-body.')
    msg.push(`The request should have a Content-Type header with a value of 'application/json'.`)
    return new ContentTypeError(msg.join('  '))
  }
}
