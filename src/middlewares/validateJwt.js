const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const validateJWT = async (req, res, next) =>{

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        const { userId } = jwt.verify( token, process.env.SECRETWORD );
        const userAuth = await prisma.user.findUnique({id: userId});

        if( !userAuth ){
            res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = userAuth;

        next();
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}