const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Gender, VideoGame } = require("../db");
const axios = require("axios");
const { where } = require("sequelize");

const games = require("./games");
const gender = require("./gender");

const { APIKEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", games);
router.use("/genres", gender);

module.exports = router;
