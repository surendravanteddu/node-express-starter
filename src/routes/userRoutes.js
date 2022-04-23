import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send({
    firstname: 'Ron',
    lastname: 'J',
    email: 'ron.j@miviewis.com'
  })
})

export default router
