const User = require("../models/Users");
const Market = require("../models/Markets");

class creates {
    static async createMarket(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        const {
            name
        } = req.body;
        try {
            if (id === userData.id) {
                const resultUser = await User.findById(userData.id);
                const {
                    golds,
                    foods
                } = resultUser.townhall.resource;
                const resultMarket = await Market.find({
                    name: {
                        $in: name
                    }
                });
                if (golds >= 30 && foods >= 10) {
                    if (resultMarket.length < 1) {
                        const resultCreate = await Market.create({
                            name
                        });
                        const resultUserUpdate = await User.findByIdAndUpdate(userData.id, {
                            $inc: {
                                "market.amount": 1,
                                "townhall.resource.golds": -30,
                                "townhall.resource.foods": -10
                            },
                            $push: {
                                "market.resource": resultCreate.id
                            }
                        }, {
                            new: true
                        }).populate('market.resource');
                        return res.status(200).json({
                            message: 'Market berhasil dibuat',
                            data: resultCreate,
                            user: resultUserUpdate
                        });
                    } else {
                        throw {
                            name: 'Name_Used'
                        };
                    }
                } else {
                    throw {
                        name: 'Not_Enough'
                    };
                }
            } else {
                throw {
                    name: 'ID_NOT_PASS'
                };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = creates;