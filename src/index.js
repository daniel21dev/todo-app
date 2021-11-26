const { PrismaClient } = require('@prisma/client')
const express = require('express')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')


const main = async () => {
    // variables
    const port = process.env.PORT
    const paths = {
        users: '/api/v1/users',
        todos: '/api/v1/todos',
        login: '/api/v1/login'
    }
    // middlewares
    app.use( cors() )
    app.use( express.json() )
    // routes
    app.use( paths.users, require('./routes/users') )
    app.use( paths.todos, require('./routes/todos') )
    app.use( paths.login, require('./routes/login') )

    // app listen for requests
    app.listen(port,()=>{
        console.log(`app running at http://localhost:${port}`);
    })
}

// start the app
main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })