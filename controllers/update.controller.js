const User = require("../models/Users");
const Market = require("../models/Markets");

class updates {
    static async updateMarket(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        const {
            market
        } = req.params;
        const {
            name
        } = req.body;
        console.log(name);
        try {
            const resultMarket = await Market.find({
                name: {
                    $in: name
                }
            });
            if (id === userData.id) {
                if (resultMarket.length < 1) {
                    const result = await Market.findByIdAndUpdate(market, {
                        name
                    }, {
                        new: true
                    });
                    res.status(200).json({
                        message: 'Market berhasil diupdate',
                        data: result
                    });
                } else {
                    throw {
                        name: 'Name_Used'
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

module.exports = updates;