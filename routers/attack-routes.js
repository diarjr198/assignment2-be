const express = require("express");
const attackRoutes = express.Router();

attackRoutes.post('/:idEnemy', (req, res) => {
    res.status(200).json({
        message: 'Berhasil menyerang lawan'
    });
})

module.exports = attackRoutes;