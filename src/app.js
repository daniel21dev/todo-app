const express = require('express')
const cors = require('cors')
const app = express()

// variables
const paths = {
    users: '/api/v1/users',
    todos: '/api/v1/todos',
    login: '/api/v1/login'
}
// middlewares
app.use(cors())
app.use(express.json())
// routes
app.use(paths.users, require('./routes/users'))
app.use(paths.todos, require('./routes/todos'))
app.use(paths.login, require('./routes/login'))

module.exports = app;