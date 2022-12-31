const express = require("express");
const deletes = require("../controllers/delete.controller");
const deleteRoutes = express.Router();

deleteRoutes.delete('/market/:market', deletes.deleteMarket);

deleteRoutes.delete('/barrack/:barrack', (req, res) => {
    res.status(200).json({
        message: 'barrack berhasil didelete'
    });
})

deleteRoutes.delete('/farm/:farm', (req, res) => {
    res.status(200).json({
        message: 'farm berhasil didelete'
    });
})

module.exports = deleteRoutes;