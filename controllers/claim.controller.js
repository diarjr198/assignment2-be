const User = require("../models/Users");
const Market = require("../models/Markets");

class claims {
    static async claimMarket(req, res, next) {
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
                const result = await User.findById(id).populate('market.resource');
                console.log(typeof result.market.resource[0].id);
                for (let i = 0; i < result.market.resource.length; i++) {
                    if (market === result.market.resource[i].id) {
                        if (result.townhall.resource.golds + result.market.resource[i].gold <= 1000) {
                            const amountGold = result.market.resource[i].gold;
                            const resultUpdateMarket = await Market.findByIdAndUpdate(market, {
                                gold: 0
                            }, {
                                new: true
                            });
                            const resultUpdateTownhall = await User.findByIdAndUpdate(id, {
                                $inc: {
                                    "townhall.resource.golds": amountGold
                                }
                            }, {
                                new: true
                            }).populate('market.resource');
                            return res.status(200).json({
                                message: 'Market berhasil diclaim',
                                data: resultUpdateMarket,
                                user: resultUpdateTownhall
                            });
                        } else if (result.townhall.resource.golds === 1000) {
                            return res.status(200).json({
                                message: 'Resource Townhall sudah penuh',
                                data: result
                            });
                        } else {
                            const spaceGold = 1000 - result.townhall.resource.golds;
                            console.log(spaceGold);
                            const resultUpdateMarket = await Market.findByIdAndUpdate(market, {
                                $inc: {
                                    gold: -spaceGold
                                }
                            }, {
                                new: true
                            });
                            const resultUpdateTownhall = await User.findByIdAndUpdate(id, {
                                $inc: {
                                    "townhall.resource.golds": spaceGold
                                }
                            }, {
                                new: true
                            }).populate('market.resource');
                            return res.status(200).json({
                                message: 'Market berhasil diclaim',
                                data: resultUpdateMarket,
                                user: resultUpdateTownhall
                            });
                        }
                    }
                }
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

    static async claimAllMarket(req, res, next) {
        const {
            id
        } = req;
        const {
            userData
        } = req;
        try {
            if (id === userData.id) {
                const result = await User.findById(id).populate('market.resource');
                for (let i = 0; i < result.market.resource.length; i++) {
                    if (result.townhall.resource.golds + result.market.resource[i].gold <= 1000) {
                        await Market.findByIdAndUpdate(result.market.resource[i].id, {
                            gold: 0
                        });
                        await User.findByIdAndUpdate(id, {
                            $inc: {
                                "townhall.resource.golds": result.market.resource[i].gold
                            }
                        });
                    } else if (result.townhall.resource.golds === 1000) {
                        return res.status(200).json({
                            message: 'Resource Townhall sudah penuh',
                            data: result
                        });
                    } else {
                        const resultNew = await User.findById(id).populate('market.resource');
                        const spaceGold = 1000 - resultNew.townhall.resource.golds;
                        await Market.findByIdAndUpdate(result.market.resource[i].id, {
                            $inc: {
                                gold: -spaceGold
                            }
                        }, {
                            new: true
                        });
                        const resultUpdateTownhall = await User.findByIdAndUpdate(id, {
                            $inc: {
                                "townhall.resource.golds": spaceGold
                            }
                        }, {
                            new: true
                        }).populate('market.resource');
                        return res.status(200).json({
                            message: 'Beberapa market berhasil diclaim',
                            data: resultUpdateTownhall.market.resource,
                            user: resultUpdateTownhall
                        });
                    }
                    result.townhall.resource.golds += result.market.resource[i].gold
                }
                const resultNew = await User.findById(id).populate('market.resource');
                return res.status(200).json({
                    message: 'Semua market berhasil diclaim',
                    data: resultNew.market.resource,
                    user: resultNew,
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

module.exports = claims;