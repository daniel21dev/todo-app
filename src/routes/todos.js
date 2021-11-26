const {Router} = require('express')
const router   = Router()
const { getTodos, createTodo } = require('../controllers/todos')
const { validateJWT } = require('../middlewares/validateJwt')


router.get('/',[
    validateJWT
], getTodos)

router.post('/',[
    validateJWT
],createTodo)


module.exports = router