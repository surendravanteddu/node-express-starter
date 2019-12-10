import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {ErrorHandler, ContentTypeError} from './errors'
import path from 'path'
import typeis from 'type-is'
import routes from './routes'

import config from './config'
const errorHandler = new ErrorHandler()

const app = express()
const port = config.app.port

// Validate POST|PUT|PATCH requests that have a body also have the content-type header equal to application/json
// otherwise return a ContentTypeError
// Technically the RFC says only a trace method MUST NOT have a message-body all other methods are leave it undefined
// meaning even a Get request CAN have a message body, but practially only POST, PUT or PATCH requests should
// have a message-body that interests the API.
app.use((req, res, next) => {
  if (req.method.match(/^(POST|PUT|PATCH)$/i) && typeis.hasBody(req) && (!typeis(req, 'json'))) {
    next(ContentTypeError.notJson())
  } else {
    next()
  }
})

app.use(cors())

// parse application/x-www-form-urlencoded - Probably will not need this
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json - Default limit is 100kb seems small so increased it here
app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

// Add Routers
app.use('/', routes)

// Serve the API documentation
app.use('/docs', express.static(path.join(__dirname, '../docs')))

// Error handlers must be the last thing added before the listen
app.use(errorHandler.handleExpressError)

// eslint-disable-next-line
app.listen(port, () => console.log(`Api listening on port ${port}!`))
