const {Router} = require('express')
const { check } = require('express-validator')
const router   = Router()
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todos')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJwt')


router.get('/',[
    validateJWT
], getTodos)

router.post('/',[
    validateJWT,
    check('title',  'must be an string').isString(),
    check('content','must be an string').isString(),
    check('dueDate','must be an string').isString(),
    validateFields
],createTodo)

router.put('/:id',[
    validateJWT,
    check('id',  'must be an integer').isInt(),
    // check('title',  'must be an string').isString(),
    // check('content','must be an string').isString(),
    // check('dueDate','must be an string').isString(),
    // check('completed','must be a boolean').isBoolean(),
    validateFields
],updateTodo)

router.delete('/:id',[
    validateJWT,
    check('id',  'must be an integer').isInt(),
    validateFields
],deleteTodo)


module.exports = router