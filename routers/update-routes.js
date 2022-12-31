const express = require("express");
const updates = require("../controllers/update.controller");
const updateRoutes = express.Router();

updateRoutes.put('/market/:market', updates.updateMarket);

updateRoutes.put('/barrack/:barrack', (req, res) => {
    res.status(200).json({
        message: 'barrack berhasil diupdate'
    });
})

updateRoutes.put('/farm/:farm', (req, res) => {
    res.status(200).json({
        message: 'farm berhasil diupdate'
    });
})

module.exports = updateRoutes;