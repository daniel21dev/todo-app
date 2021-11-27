const {Router} = require('express')
const { check } = require('express-validator')
const router   = Router()
const { saveUser } = require('../controllers/users')
const { emailExists } = require('../helpers/dbValidators')
const { validateFields } = require('../middlewares/validateFields')

router.post('/',[
    check('email','must be a valid email').isEmail(),
    check('password','must be an string').isString(),
    check('name','must be an string').isString(),
    check('email').custom( emailExists ),
    validateFields
], saveUser)


module.exports = router