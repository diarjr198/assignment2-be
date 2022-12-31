const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Market = require("../models/Markets");
const User = require("../models/Users");

class users {
    static async login(req, res, next) {
        const {
            email,
            password
        } = req.body;
        const {
            cookies
        } = req;
        try {
            if (!('access_token' in cookies)) {
                const result = await User.findOne({
                    email: email.toLowerCase()
                }).populate('market.resource');
                if (!result) {
                    throw {
                        name: 'Email_Invalid'
                    };
                    // return res.status(404).json({
                    //     message: 'Email tidak ditemukan!'
                    // });
                }
                const checkPass = bcrypt.compareSync(password, result.password);
                if (!checkPass) {
                    throw {
                        name: 'User_Invalid'
                    };
                    // return res.status(409).json({
                    //     message: 'Email atau Password tidak Match!'
                    // })
                }
                const privateKey = fs.readFileSync('./keys/private.key', 'utf-8');
                const token = jwt.sign({
                    id: result.id,
                    email: result.email
                }, privateKey, {
                    algorithm: 'HS512',
                    expiresIn: '1h'
                });
                return res.status(200).cookie('access_token', token).json({
                    message: 'Login Berhasil Ngab!',
                    data: result,
                    Access_Token: token
                });
            } else {
                throw {
                    name: 'Your_Logged'
                };
            }
        } catch (error) {
            next(error);
        }

    }

    static async register(req, res, next) {
        const {
            username,
            email,
            password
        } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        try {
            const result = await User.create({
                username,
                email: email.toLowerCase(),
                password: hashedPassword
            });
            return res.status(201).json({
                success: true,
                message: 'Register Berhasil, Happy Gaming:v',
                data: result
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async logout(req, res, next) {
        res.status(200).clearCookie('access_token').json({
            message: 'logout'
        });
    }

    static async listUser(req, res, next) {
        const {
            id
        } = req.params;
        const {
            userData
        } = req;
        try {
            if (id === userData.id) {
                const result = await User.findById(id).populate('market.resource');
                res.status(200).json({
                    message: 'Data user berhasil ditampilkan',
                    data: result
                });
            } else {
                throw {
                    name: 'NOT_FOUND'
                };
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    static async market(req, res, next) {
        try {
            const result = await Market.find();
            for (let i = 0; i < result.length; i++) {
                if (result[i].gold < 20) {
                    await Market.updateOne({
                        name: result[i].name
                    }, {
                        $inc: {
                            gold: 1
                        }
                    });
                    console.log(`${result[i].name}: ${result[i].gold+1}`);
                }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = users;