const {Router} = require('express')
const router   = Router()
const { getTodos, createTodo, updateTodo } = require('../controllers/todos')
const { validateJWT } = require('../middlewares/validateJwt')


router.get('/',[
    validateJWT
], getTodos)

router.post('/',[
    validateJWT
],createTodo)

router.put('/:id',[
    validateJWT
],updateTodo)


module.exports = router