const jwt = require("jsonwebtoken");
const fs = require("fs");

class authJwt {
    static authentication(req, res, next) {
        const {
            cookies
        } = req;
        if ('access_token' in cookies) {
            console.log('Access Token Exists');
            const publicKey = fs.readFileSync('./keys/private.key', 'utf-8');
            jwt.verify(cookies.access_token, publicKey, {
                algorithm: ['HS512']
            }, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.clearCookie('access_token');
                    }
                    next(err);
                }
                req.userData = decoded;
            });
        } else {
            console.log('Access Token Missing');
            throw {name: 'Missing_Token'};
        }
        next();

        // const publicKey = fs.readFileSync('./keys/private.key', 'utf-8');
        // if (!access_token) {
        //     res.status(401).json({
        //         success: false,
        //         message: 'Token Hilang'
        //     });
        // }
        // jwt.verify(access_token, publicKey, {
        //     algorithm: ['HS512']
        // }, (err, decoded) => {
        //     if (err) {
        //         res.status(401).json({
        //             success: false,
        //             message: 'Invalid Token'
        //         });
        //     }
        //     req.userData = decoded;
        // });
    }
}

module.exports = authJwt;