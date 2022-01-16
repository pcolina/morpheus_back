const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    console.log("helper generateJWT");
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                reject('Not able generate JWT')
            } else {
                resolve(token);
            }

        });

    });


}


module.exports = {
    generateJWT,
}