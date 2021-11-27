const jwt = require('jsonwebtoken');

const generateJwt = ( userId, expiresIn='1d' ) =>{
    return new Promise( (resolve, reject) =>{
        const payload = { userId };

        jwt.sign(payload, process.env.SECRETWORD,{ expiresIn },
            ( err, token)=>{
            if( err ){
                console.log( err);
                reject('it could not generate jwt')
            }else{
                resolve( token );
            }
        });
    });
}

module.exports = {
    generateJwt
}