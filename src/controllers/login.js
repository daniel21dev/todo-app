const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/generteJwt');

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{

        const user = await prisma.user.findUnique({
            where:{email}
        });

        if( !bcrypt.compareSync(password, user.password) ){
            return res.status(500).json({error: 'auth error'})
        }

        const token = await generateJwt(user.id, '3d');
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

module.exports={
    loginUser
}