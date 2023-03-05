const { Router } = require("express");

const { Gender, Videogame } = require("../db");
const axios = require("axios");

const { APIKEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name, genresName } = req.query;
    if (name) {
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
    } else if (genresName) {
      const numberPages = [1, 2, 3];

      const responses = await Promise.all(
        numberPages.map(async (num) => {
          const res = await axios.get(
            `https://api.rawg.io/api/games?key=${APIKEY}&page=${num}&page_size=40`
          );
          return res;
        })
      );

      const apiVideoGames = [
        ...responses[0].data.results,
        ...responses[1].data.results,
        ...responses[2].data.results,
      ];
      const filteredGames = apiVideoGames.filter((e) =>
        e.genres?.some((genero) => genero.name === genresName)
      );
      res.send(filteredGames);
    } else {
      const dataBaseVideoGames = await Videogame.findAll({
        attributes: ["name", "image"],
        include: Gender,
      });

      const numberPages = [1, 2, 3];

      const responses = await Promise.all(
        numberPages.map(async (num) => {
          const res = await axios.get(
            `https://api.rawg.io/api/games?key=${APIKEY}&page=${num}&page_size=40`
          );
          return res;
        })
      );

      const apiVideoGames = [
        ...responses[0].data.results,
        ...responses[1].data.results,
        ...responses[2].data.results,
      ];

      const allVideogames = [...apiVideoGames, ...dataBaseVideoGames];
      res.send(allVideogames);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`
    );

    const gameSelected = response.data;

    const dataBaseVideoGames = await Videogame.findByPk(idVideogame, {
      attributes: ["id", "name", "rating", "description", "image"],
      include: Gender,
    });

    res.send(
      gameSelected.detail === "Not found." ? [dataBaseVideoGames] : gameSelected
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("El id no existe");
  }
});

router.post("/", async function (req, res) {
  try {
    const { name, image, description, platform, released, rating, gender } =
      req.body;

    const idFecha = new Date();
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
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
