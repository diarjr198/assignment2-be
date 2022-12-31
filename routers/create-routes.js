const express = require("express");
const createRoutes = express.Router();
const User = require("../models/Users");
const Market = require("../models/Markets");
const creates = require("../controllers/create.controller");

createRoutes.post('/market', creates.createMarket);

createRoutes.post('/barrack', (req, res) => {
    res.status(200).json({
        message: 'barrack berhasil dibuat'
    });
})

createRoutes.post('/farm', (req, res) => {
    res.status(200).json({
        message: 'farm berhasil dibuat'
    });
})

module.exports = createRoutes;