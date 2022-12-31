const User = require("../models/Users");
const Market = require("../models/Markets");

class list {
    static async listMarketOwned(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        try {
            if (userData) {
                if (id === userData.id) {
                    const result = await User.findById(userData.id).populate('market.resource');
                    res.status(200).json({
                        message: 'Daftar market berhasil ditampilkan',
                        data: result.market
                    });
                } else {
                    throw {
                        name: 'ID_NOT_PASS'
                    };
                }
            } else {
                throw {
                    name: 'Missing_Token'
                };
            }
        } catch (error) {
            next(error);
        }
    }

    static async listMarketOwnedSpecific(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        const {
            market
        } = req.params;
        try {
            if (userData) {
                if (id === userData.id) {
                    const result = await Market.findById(market);
                    return res.status(200).json({
                        message: 'Detail market berhasil ditampilkan',
                        data: result
                    });
                } else {
                    throw {
                        name: 'ID_NOT_PASS'
                    };
                }
            } else {
                throw {
                    name: 'Missing_Token'
                };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = list;