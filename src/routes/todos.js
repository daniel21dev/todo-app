const {Router} = require('express')
const router   = Router()
const { getTodos, createTodo } = require('../controllers/todos')


router.get('/', getTodos)

router.post('/:userId',createTodo)


module.exports = router