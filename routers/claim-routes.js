const express = require("express");
const claimRoutes = express.Router();
const claims = require("../controllers/claim.controller");

claimRoutes.post('/market', claims.claimAllMarket);

claimRoutes.post('/market/:market', claims.claimMarket);

claimRoutes.post('/barrack/:barrack', (req, res) => {
    res.status(200).json({
        message: 'barrack berhasil diclaim'
    });
})

claimRoutes.post('/farm/:farm', (req, res) => {
    res.status(200).json({
        message: 'farm berhasil diclaim'
    });
})

module.exports = claimRoutes;