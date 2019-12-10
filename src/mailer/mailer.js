import config from '../config'
const nodemailer = require('nodemailer')

export default class Mailer {
  transporter = null

  getTransporter = () => {
    if (!this.transporter) {
      this.createTransporter()
    }

    return this.transporter
  }

  createTransporter = (transportConfig) => {
    if (!transportConfig) {
      transportConfig = {
        host: config.mailer.server,
        port: config.mailer.port,
        secure: config.mailer.secure, // when false it will upgrade later with STARTTLS
        ignoreTLS: config.mailer.ignoreTLS
      }

      if (config.mailer.auth.user && config.mailer.auth.password) {
        transportConfig.auth = {
          user: config.mailer.auth.user,
          pass: config.mailer.auth.password
        }
      }
    }

    this.transporter = nodemailer.createTransport(transportConfig)
  }

  verify = () => {
    this.getTransporter().verify((error, success) => {
      if (error) {
        console.error(error)
      } else {
        // eslint-disable-next-line
        console.log('Server is ready for message, transporter configured correctly. Success:', success)
      }
    })
  }

  sendMailCallback = (error, info) => {
    if (error) {
      console.error('Error sending mail!!  Error:', error, ' config:', config)
    } else if (config.env !== 'production') {
      // eslint-disable-next-line
      console.log('Message sent: ', info)
    }
  }

  sendMail = (email, callback = this.sendMailCallback) => {
    const msgDefaults = {
      from: config.mailer.defaultFrom,
      to: config.mailer.adminEmail
    }

    const mail = Object.assign({}, msgDefaults, email)

    this.getTransporter().sendMail(mail, callback)
  }
}
