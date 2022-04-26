import {Router} from 'express'
import {Logger} from '../logger'
import config from '../config'
import {generateToken, getUserFromToken} from '../utils'
import {AuthenticationError} from '../errors'
import ContactRoutes from './contactRoutes'
import UserRoutes from './userRoutes'
const router = Router()

const contactRoutes = new ContactRoutes()
router.use('/contacts', contactRoutes.registerRoutes())

router.post('/login', (req, res) => {
  try {
    Logger.info('User login attempt')
    const {username, password} = req.body
    /**
         * Since we don't have a db, we are checking user credentials against the hard coded values in the .env
         */
    if (username === config.app.username && password === config.app.password) {
      return res.send({
        token: generateToken({
          username
        })
      })
    }
    /**
         * throws error if the credentials does not match
         */
    throw new AuthenticationError('Username and password mismatch')
  } catch (e) {
    Logger.error(e)
    /**
         * We need to show this error to the user. so we need to bubble this error up.
         */
    throw e
  }
})

router.use((req, res, next) => {
  const user = getUserFromToken(req.headers.authorization)
  if (user) {
    req.headers.user = user
    return next()
  }

  next(new AuthenticationError('Invalid token'))
})

const userRoutes = new UserRoutes()
router.use('/users', userRoutes.registerRoutes())

export default router
