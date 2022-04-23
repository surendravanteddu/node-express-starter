import {Router} from 'express'
import {Logger} from '../logger'
import {generateToken} from '../utils'
import config from '../config'
import {AuthenticationError} from '../errors'

const router = Router()

router.get('/', (req, res) => {
  res.send('user route working')
})

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

export default router
