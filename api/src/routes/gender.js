const { Router } = require("express");

const { Gender, Videogame } = require("../db");
const axios = require("axios");

const { APIKEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  const response = await axios.get(
    `https://api.rawg.io/api/genres?key=${APIKEY}`
  );

  const genersApi = await response.data.results;

  genersApi.forEach((g) => {
    Gender.findOrCreate({
      where: {
        name: g.name,
      },
    });
  });
  const generos = await Gender.findAll();
  res.send(generos);
});

module.exports = router;
