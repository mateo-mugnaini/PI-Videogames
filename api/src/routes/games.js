const { Router } = require("express");

const { Gender, Videogame } = require("../db");
const axios = require("axios");

const { APIKEY } = process.env;

const router = Router();

// router.get("/", (rec, res) => {
//   res.send(true);
// });

// Todos los Video Juegos

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const apiVideoGames = [];
      let url = `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`;
      for (let index = 0; index < 5; index++) {
        const response = await axios.get(url);

        response.data?.results.forEach((game) => apiVideoGames.push(game));

        url = response.data.next;
      }

      const dataBaseVideoGames = await Videogame.findAll({
        where: {
          name: name,
        },
        attributes: ["name", "image"],
        include: Gender,
      });

      const allVideogames = [...apiVideoGames, ...dataBaseVideoGames];
      res.send(allVideogames);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  } else {
    const dataBaseVideoGames = await Videogame.findAll({
      attributes: ["name", "image"],
      include: Gender,
    });

    const apiVideoGames = [];
    let url = `http://api.rawg.io/api/games?key=${APIKEY}`;
    for (let index = 0; index < 5; index++) {
      const response = await axios.get(url);

      response.data?.results.forEach((game) => apiVideoGames.push(game));

      url = response.data.next;
    }

    console.log("AAA", apiVideoGames.length);

    const allVideogames = [...apiVideoGames, ...dataBaseVideoGames];
    res.send(allVideogames);
  }
});

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`
    );

    const gameSelected = response.data;
    // console.log(gameSelected);
    const dataBaseVideoGames = await Videogame.findByPk(idVideogame, {
      attributes: ["id", "name", "rating", "description", "image"],
      include: Gender,
    });
    // console.log(typeof dataBaseVideoGames);

    res.send(
      gameSelected.detail === "Not found." ? [dataBaseVideoGames] : gameSelected
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("El id no existe");
  }
});

router.post("/", async function (req, res) {
  const { name, image, description, platform, released, rating, gender } =
    req.body;

  const idFecha = new Date();
  // console.log(
  //   "aaaa",
  //   name,
  //   image,
  //   description,
  //   platform,
  //   released,
  //   rating,
  //   gender
  // );
  const juegos = await Videogame.create({
    name: name,
    image: image,
    description: description,
    platform: platform,
    released: released,
    rating: rating,
    id: idFecha.getTime(),
  });
  await juegos.setGenders([...gender]);
  res.json(juegos);
});

module.exports = router;
