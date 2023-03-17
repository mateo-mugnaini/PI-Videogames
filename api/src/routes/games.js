const { Router } = require("express");

const { Gender, Videogame } = require("../db");
const axios = require("axios");

const { APIKEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name, genresName, type = "All" } = req.query;
    if (name) {
      const numberPages = [1, 2, 3];

      const responses = await Promise.all(
        numberPages.map(async (num) => {
          const res = await axios.get(
            `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}&page=${num}&page_size=40`
          );
          return res;
        })
      );

      const apiVideoGames = [
        ...responses[0].data.results,
        ...responses[1].data.results,
        ...responses[2].data.results,
      ];

      const dataBaseVideoGames = await Videogame.findAll({
        where: {
          name: name,
        },
        attributes: ["name", "image", "id"],
        include: Gender,
      });

      const allVideogames = [...apiVideoGames, ...dataBaseVideoGames];
      // res.send(allVideogames);
      // prettier-ignore
      res.send(
        type === "DB"
          ? dataBaseVideoGames
          : type === "API" ? apiVideoGames
          : type === "All" ? allVideogames
           : []
      );
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
      const dataBaseVideoGames = await Videogame.findAll({
        include: Gender,
      });
      const filteredGamesDB = dataBaseVideoGames.filter((e) => {
        const objeto = e?.genres?.filter((f) => f.name === genresName);
        return objeto?.length > 0;
      });

      const allVideogames = [...filteredGames, ...filteredGamesDB];
      // res.send(filteredGames);
      // prettier-ignore
      res.send(
        type === "DB"
          ? dataBaseVideoGames
          : type === "API"
              ? apiVideoGames
              : type === "All"
              ? allVideogames
              : []
      );
    } else {
      const dataBaseVideoGames = await Videogame.findAll({
        attributes: ["name", "image", "id"],
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
      ].slice(0, 100);

      const allVideogames = [...apiVideoGames, ...dataBaseVideoGames];
      // res.send(allVideogames);
      // prettier-ignore
      res.send(
        type === "DB"
          ? dataBaseVideoGames
          : type === "API" ? apiVideoGames
          : type === "All" ? allVideogames
          : []
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al importar los elementos");
  }
});

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;

    const dataBaseVideoGames = await Videogame.findByPk(idVideogame, {
      attributes: [
        "id",
        "name",
        "rating",
        "description",
        "image",
        "released",
        "platform",
      ],
      include: Gender,
    });

    const response =
      !dataBaseVideoGames &&
      (await axios.get(
        `https://api.rawg.io/api/games/${Number(idVideogame)}?key=${APIKEY}`
      ));

    const gameSelected = response.data;

    // console.log("gsihdgsd", gameSelected);

    res.send(gameSelected || dataBaseVideoGames);
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
    res.status(500).send("El juego ya existe");
  }
});

module.exports = router;
