const express = require("express");
const listRoutes = express.Router();
const list = require("../controllers/list.controller");
const checkID = require("../middlewares/checkID");

listRoutes.get('/market', list.listMarketOwned);

listRoutes.get('/market/:market', list.listMarketOwnedSpecific);

listRoutes.get('/barrack', (req, res) => {
    res.status(200).json({
        message: 'Daftar barrack berhasil ditampilkan'
    });
})

listRoutes.get('/barrack/:barrack', (req, res) => {
    res.status(200).json({
        message: 'Detail barrack berhasil ditampilkan'
    });
})

listRoutes.get('/farm', (req, res) => {
    res.status(200).json({
        message: 'Daftar farm berhasil ditampilkan'
    });
})

listRoutes.get('/farm/:farm', (req, res) => {
    res.status(200).json({
        message: 'Detail farm berhasil ditampilkan'
    });
})

module.exports = listRoutes;