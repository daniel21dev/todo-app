const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const emailExists = async( email ) =>{
    const userExists = await prisma.user.findUnique({where:{email}})
    if( userExists ){
        throw new Error(`the email ${ email } is already registered`);
    }
}

module.exports = {
    emailExists
}