const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({});
        res.json({users});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

module.exports={
    getUsers
}