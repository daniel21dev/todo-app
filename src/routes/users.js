const {Router} = require('express')
const router   = Router()
const { saveUser } = require('../controllers/users')

router.post('/', saveUser)


module.exports = router