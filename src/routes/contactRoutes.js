import {Router} from 'express'
import Contact from '../controllers/Contact'
import {NotFoundError} from '../errors'

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
    router.get('/:id', this.getById)
    router.patch('/:id', this.updateById)
    router.put('/:id', this.updateById)

    return router
  }

  getAll = (req, res) => {
    const {pageNo = 1, pageSize} = req.query
    res.send(this.getContactInstance().getAll(pageNo, pageSize))
  }

  getById = (req, res) => {
    const contact = this.getContactInstance().getById(req.params.id)

    if (!contact) {
      return new NotFoundError(`Contact with id: ${req.params.id} not found`)
    }

    res.send(contact)
  }

  updateById = (req, res) => {
    const contact = this.getContactInstance().updateById(req.params.id, req.body)
    if (!contact) {
      return new NotFoundError(`Contact with id: ${req.params.id} not found`)
    }
    res.send(contact)
  }
}
