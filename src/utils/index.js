import traverse from 'traverse'
import jwt from 'jsonwebtoken'
import config from '../config'
import {Logger} from '../logger'

export const hidePasswords = (obj) => {
  // map here should NOT take an arrow function so it can get the traverse 'this' context
  return traverse(obj).map(function () {
    if (this.key && (this.key.match(/(password|passwd)/i))) {
      this.update('**** hidden ****')
    }
  })
}

/**
 * Generated authentication token (jwt). Reads expiration time and secret from .env file
 * @param payload
 * @returns {*}
 */
export const generateToken = (payload) => {
  try {
    return jwt.sign(
      payload,
      config.appToken.secret,
      {
        expiresIn: config.appToken.expiresIn
      }
    )
  } catch (e) {
    Logger.error(e)
    throw new Error('Something went wrong')
  }
}

/**
 * Takes bearer token and returns user object. For invalid token return error
 * @param bearerToken
 * @returns {null|*}
 */
export const getUserFromToken = (bearerToken) => {
  try {
    const token = bearerToken?.substr(bearerToken.indexOf('Bearer') + 7).trim()
    return jwt.verify(token, config.appToken.secret)
  } catch (e) {
    Logger.error(e)
    return null
  }
}
