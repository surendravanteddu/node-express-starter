import {Router} from 'express'

export default class UserRoutes {
  registerRoutes = () => {
    const router = Router()

    router.get('/', this.getUser)

    return router
  }

  getUser = (req, res) => {
    res.send({
      firstname: 'Ron',
      lastname: 'J',
      email: 'ron.j@miviewis.com'
    })
  }
}
