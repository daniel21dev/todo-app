const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = require('./app')

const main = async () => {
    const port = process.env.PORT
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
