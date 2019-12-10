import config from '../config'
import winston, {format} from 'winston'
import path from 'path'

require('winston-daily-rotate-file')

const transport = new (winston.transports.DailyRotateFile)({
  filename: path.join(config.app.logging.path, 'api-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const APILogger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  level: config.app.logging.level,
  levels: winston.config.syslog.levels,
  transports: [
    transport
  ]
})

// If we're not in production then log to the `console` also
if (process.env.NODE_ENV !== 'production') {
  APILogger.add(new winston.transports.Console())
}

export default APILogger
