const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

const path = require('path')
const rootPath = path.normalize(path.dirname(__dirname))
const env = process.env.NODE_ENV || 'development'

const config = {
  app: {
    port: parseInt(process.env.APP_PORT || 18880, 10),
    rootPath: rootPath,
    logging: {
      path: process.env.LOG_DIR || path.join(rootPath, 'logs'),
      level: process.env.LOG_LEVEL || 'error'
    }
  },
  mailer: {
    server: process.env.SMTP_SERVER || '',
    port: parseInt(process.env.SMTP_PORT || 25, 10),
    secure: process.env.SMTP_SECURE !== 'false',
    ignoreTLS: process.env.SMTP_IGNORE_TLS !== 'false',
    auth: {
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || ''
    },
    defaultFrom: process.env.EMAIL_DEFAULT_FROM || 'email@gmail.com',
    adminEmail: process.env.ADMIN_EMAIL || 'email@gmail.com'
  },
  db: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
  },
  env: env,
  password_secret: process.env.PASSWORD_SECRET
}

export default config
