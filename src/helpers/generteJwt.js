const jwt = require('jsonwebtoken');

const generarJwt = ( uid, expiresIn='1d' ) =>{
    return new Promise( (resolve, reject) =>{
        const payload = { uid };

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
    generarJwt
}