const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/generteJwt');

const saveUser = async(req,res)=>{
    const {email,name,password} = req.body;
    try{
        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(password, salt);

        const user = await prisma.user.create({
            data:{
                email,
                name,
                password: securePassword
            },
            select:{
                id: true,
                email: true,
                name: true,
            }
        })

        const token = await generateJwt(user.id, '3d');
        res.json({user, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

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
    getUsers,
    saveUser
}