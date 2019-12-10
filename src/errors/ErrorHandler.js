import {Mailer} from '../mailer'
import config from '../config'
import {DomainError} from './index'
import {Logger} from '../logger'
import {hidePasswords} from '../utils'

const moment = require('moment')
const ErrorStackParser = require('error-stack-parser')

export default class ErrorHandler {
  mailer = null

  getMailer = () => {
    if (!this.mailer) {
      this.mailer = new Mailer()
    }

    return this.mailer
  }

  handleExpressError = (error, req, res, next) => {
    const status = error.status || 500

    const json = {
      error: {
        message: error.message,
        code: error.code || undefined,
        name: error.name || undefined
      }
    }

    if (!error.suppressStackTrace) {
      json.error.stack = ErrorStackParser.parse(error)
    }

    const extended = JSON.stringify(hidePasswords(Object.assign({}, json, {config, env: process.env})), null, 2)

    // Only send an email for errors that do not inheirt from DomainError or when in development environment
    if (!(error instanceof DomainError) && config.env !== 'development') {
      const email = {
        subject: `Error ${process.env.npm_package_name} ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        text: extended
      }
      const mailer = this.getMailer()
      mailer.sendMail(email)
    }

    if (error instanceof DomainError) {
      // This is an error thrown by the API so different loglevel but lets still write it to the log
      Logger.notice(`ErrorHandler: ${extended}`)
    } else {
      Logger.error(`ErrorHandler: ${extended}`)
    }

    return res.status(status).json(json)
  }
}
