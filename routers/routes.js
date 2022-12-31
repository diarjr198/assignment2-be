const express = require("express");
const routes = express.Router();
const attackRoutes = require("./attack-routes");
const claimRoutes = require("./claim-routes");
const createRoutes = require("./create-routes");
const deleteRoutes = require("./delete-routes");
const listRoutes = require("./list-routes");
const updateRoutes = require("./update-routes");
const auth = require("../middlewares/authJwt");
const users = require("../controllers/user.controller");
const User = require("../models/Users");
const checkID = require("../middlewares/checkID");

routes.post('/register', users.register)

routes.post('/login', users.login)

routes.post('/logout', users.logout)

routes.use(auth.authentication);

routes.get('/user/:id', users.listUser);

routes.use('/user/:id/list', checkID, listRoutes);
routes.use('/user/:id/create', checkID, createRoutes);
routes.use('/user/:id/update', checkID, updateRoutes);
routes.use('/user/:id/delete', checkID, deleteRoutes);
routes.use('/user/:id/claim', checkID, claimRoutes);
routes.use('/user/:id/attack', checkID, attackRoutes);

module.exports = routes;