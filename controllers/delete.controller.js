const User = require("../models/Users");
const Market = require("../models/Markets");

class deletes {
    static async deleteMarket(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        try {
            if (id === userData.id) {
                const {
                    market
                } = req.params;
                await User.findByIdAndUpdate(id, {
                    $inc: {
                        "market.amount": -1
                    },
                    $pull: {
                        "market.resource": market
                    }
                });
                const result = await Market.findByIdAndDelete(market);
                res.status(200).json({
                    message: 'Market berhasil didelete',
                    data: result
                });
            } else {
                throw {
                    name: 'ID_NOT_PASS'
                };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = deletes;