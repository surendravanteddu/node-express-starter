import {Router} from 'express'
import Contact from '../controllers/Contact'

export default class ContactRoutes {
  contactInstance = null

  /**
   *
   * @returns {Contact}
   */
  getContactInstance = () => {
    if (!this.contactInstance) {
      this.contactInstance = new Contact()
    }
    return this.contactInstance
  }

  registerRoutes = () => {
    const router = Router()
    router.get('/', this.getAll)

    return router
  }

  getAll = (req, res) => {
    const {pageNo = 1, pageSize} = req.query
    res.send(this.getContactInstance().getAll(pageNo, pageSize))
  }
}
