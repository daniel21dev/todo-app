const {Router} = require('express');
const { check } = require('express-validator');
const { loginUser } = require('../controllers/login');
const { validateFields } = require('../middlewares/validateFields');
const router   = Router()

router.post('/',[
    check('email','must be a valid email').isEmail(),
    check('password','must be an string').isString(),
    validateFields
],loginUser);


module.exports = router