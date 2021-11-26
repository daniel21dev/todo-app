const {Router} = require('express')
const router   = Router()
const { loginUser } = require('../controllers/login')

router.post('/', loginUser);


module.exports = router