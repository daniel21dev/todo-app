const {Router} = require('express')
const router   = Router()
const { getUsers, saveUser } = require('../controllers/users')

router.post('/', saveUser)
router.get('/', getUsers)


module.exports = router