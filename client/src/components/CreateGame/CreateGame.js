/* ----------------------------------IMPORTS---------------------------------- */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getGenres, getGames } from "../../Redux/Actions/actions";
import axios from "axios";
import "../CreateGame/CreateGame.css";

/* ----------------------------------FUNCTION---------------------------------- */
function CreateGame(props) {
  /* ----------------------------------USESTATE---------------------------------- */
  const [generos, setGeneros] = useState();
  const [plataformas, setPlataformas] = useState([]);

  const platformList = [
    "PC",
    "Android",
    "iOS",
    "Wii U",
    "Xbox One",
    "Xbox 360",
    "Xbox Series S/X",
    "Nintendo",
    "Nintendo Switch",
    "PlayStation",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
  ];

  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    genreName: [],
  });

  const [errors, setErrors] = useState({
    name: true,
    image: true,
    description: true,
    released: true,
    rating: true,
    platforms: true,
    genres: true,
    genreName: true,
  });

  useEffect(() => {
    setGeneros(props.genres);
  }, [props.genres]);

  /* ----------------------------------PLATFORMS----------------------------------*/
  /* ----------------------------------HANDLESELECT---------------------------------- */
  function handleSelectPlatforms(e) {
    setInputs({
      ...inputs,
      platforms: [...inputs.platforms, e.target.value],
    });

    const plataformasNuevos = plataformas.filter((el) => el !== e.target.value);

    setPlataformas(plataformasNuevos);
  }

  /*----------------------------------HANDLEDELETE----------------------------------*/
  function handleDeletePlatforms(e) {
    e.preventDefault();
    const deletePlatforms = inputs.platforms.filter((c) => c !== e.target.name);
    setInputs({
      ...inputs,
      platforms: deletePlatforms,
    });
    const deletedPlatform = platformList.filter((el) => el === e.target.name);
    console.log(e.target.name, deletedPlatform);
    setPlataformas([...plataformas, ...deletedPlatform]);
  }

  useEffect(() => {
    props.getGenres();
    setPlataformas(platformList);
  }, []);

  /* ----------------------------------GENRES----------------------------------*/
  /* ----------------------------------HANDLESELECTGENRES---------------------------------- */
  function handleSelectGenres(e) {
    const filterName = props.genres.filter(
      (c) => c.id.toString() === e.target.value
    );
    setInputs({
      ...inputs,
      genres: [...inputs.genres, e.target.value],
      genreName: [...inputs.genreName, filterName[0].name],
    });

    const generosNuevos = generos.filter(
      (el) => el.id.toString() !== e.target.value
    );

    console.log(e.target.value);

    setGeneros(generosNuevos);
  }

  /*----------------------------------HANDLEDELETE----------------------------------*/

  function handleDeleteGenres(e) {
    e.preventDefault();
    const deleteGenres = inputs.genreName.filter((c) => c !== e.target.name);

    const deletedGenre = props.genres.filter((el) => el.name === e.target.name);
    setGeneros([...generos, ...deletedGenre]);
    const ASD = inputs.genres.filter((e) => e.id !== deletedGenre.id);
    setInputs({
      ...inputs,
      genreName: deleteGenres,
      genres: inputs.genres.filter((e) => Number(e) !== deletedGenre[0].id),
    });
  }
  useEffect(() => {
    console.log("inp", inputs.genres);
  }, [inputs.genres]);

  const inputImagen = document.getElementById("imagen");
  const vistaPrevia = document.getElementById("vista-previa");

  inputImagen?.addEventListener("input", () => {
    vistaPrevia.src = inputImagen.value;
  });

  /* ----------------------------------HANDLECHANGE---------------------------------- */
  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(errors);
  }

  /* ----------------------------------ON SUBMIT---------------------------------- */
  async function onSubmit(e) {
    e.preventDefault();

    if (!inputs.name) {
      return window.alert("El campo 'nombre' está vacío");
    }

    if (!inputs.image) {
      return window.alert("El campo 'imagen' está vacío");
    }

    if (!inputs.description) {
      return window.alert("El campo 'descripcion' está vacío");
    }

    if (!inputs.released) {
      return window.alert("El campo 'fechaDeLanzamiento' está vacío");
    }

    if (!inputs.rating) {
      return window.alert("El campo 'rating' está vacío");
    }

    if (!inputs.platforms) {
      return window.alert("El campo 'plataformas' está vacío");
    }

    if (inputs.genres.length === 0) {
      return window.alert("Debe seleccionar al menos un género");
    }

    const formData = {
      name: inputs.name,
      image: inputs.image,
      description: inputs.description,
      released: inputs.released,
      rating: inputs.rating,
      platform: inputs.platforms,
      gender: inputs.genres,
    };
    await axios.post("http://localhost:3001/videogames", formData);
    window.alert("El juego ha sido creado con éxito!!");
    window.location.href = "http://localhost:3000/home";
  }

  /* ----------------------------------RETURN---------------------------------- */
  return (
    /* ----------------------------------CONTENEDOR GENERAL---------------------------------- */
    <div className="contenedor-general-formulario">
      {/* ----------------------------------TEXTOS---------------------------------- */}
      <div className="contenedor-textos-head">
        <div className="titulo-create">
          <h1>Create your game</h1>
        </div>
        <div className="parrafo-create">
          <p>
            ¡Hola! En esta seccion vas a poder crear tu propio juego.
            <br />
            Todos los juegos que crees apareceran en el home luego de que
            completes el siguiente formulario
          </p>
        </div>
      </div>
      <div>
        {/* ----------------------------------FORMULARIO---------------------------------- */}
        <form className="contenedor-formulario" onSubmit={(e) => onSubmit(e)}>
          <div className="formulario-fondo">
            {/* ----------------------------------NOMBRE---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label"> Nombre: </label>
              <input
                className="input-marco"
                placeholder="Nombre del juego"
                name="name"
                value={inputs.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* ----------------------------------IMAGEN---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label"> Imagen: </label>
              <input
                className="input-marco"
                placeholder="Inserte link de imagen"
                name="image"
                type="text"
                id="image"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* ----------------------------------DESCRIPCION---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label"> Descripcion: </label>
              <textarea
                className="input-marco"
                placeholder="Inserte una descripcion"
                name="description"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* ----------------------------------PLATAFORMA---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label"> Plataformas: </label>
              <select
                className="input-marco"
                name="platforms"
                onChange={(e) => handleSelectPlatforms(e)}
              >
                <option>Selecciona una plataforma</option>
                {plataformas &&
                  plataformas.map((c) => (
                    <option value={c} primary={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            {/* ----------------------------------FECHA DE LANZAMIENTO---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label">Fecha de lanzamiento:</label>
              <input
                className="input-marco"
                name="released"
                type="date"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* ----------------------------------RATING---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label">Rating:</label>
              <input
                className="input-marco"
                name="rating"
                type="range"
                min="0"
                max="5"
                onChange={(e) => handleChange(e)}
              />
              <div className="vistaprevia-rating">{inputs.rating}</div>
            </div>
            {/* ----------------------------------GENREROS---------------------------------- */}
            <div className="formulario">
              <label className="formulario-label">Generos</label>
              <select
                className="input-marco"
                name="genres"
                onChange={(e) => handleSelectGenres(e)}
              >
                <option>Selecciona un genero</option>
                {generos &&
                  generos.map((c) => (
                    <option value={c.id} primary={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* ----------------------------------BOTON CREAR---------------------------------- */}
            <div className="boton">
              <input className="boton-crear" type="submit" value="Crear!" />
            </div>
          </div>
          {/* ----------------------------------VISTA PREVIA---------------------------------- */}
          <div className="vistaprevia">
            {/* ----------------------------------VISTA PREVIA IMAGEN---------------------------------- */}
            <img
              className="vistaprevia-imagen"
              src={inputs.image}
              id="image"
              alt="Vista previa de la imagen"
            />
            {/* ----------------------------------VISTA PREVIA NOMBRE---------------------------------- */}
            <h2 className="vistaprevia-nombre">{inputs.name}</h2>
            {/* ----------------------------------VISTA PREVIA GENEROS---------------------------------- */}
            <h2 className="vistaprevia-generos">
              {inputs?.genreName.join(", ")}
            </h2>
          </div>
          {/* ----------------------------------VER GENEROS---------------------------------- */}
          <div className="contenedor-generos">
            <div className="opciones-generos">
              {inputs.genreName.length > 0 &&
                inputs.genreName.map((c) => (
                  <div className="generos-seleccionado">
                    {/* /* ----------------------------------BOTON BORRAR GENERO----------------------------------  */}
                    <button
                      className="boton-borrar"
                      name={c}
                      onClick={(e) => handleDeleteGenres(e)}
                    >
                      X
                    </button>
                    <p>{c}</p>
                  </div>
                ))}
            </div>
          </div>
          {/* ----------------------------------VER PLATAFORMAS---------------------------------- */}
          <div className="contenedor-plataformas">
            <div className="opciones-plataformas">
              {inputs.platforms.length > 0 &&
                inputs.platforms.map((c) => (
                  <div className="plataformas-seleccionadas">
                    {/* ----------------------------------BOTON BORRAR PLATAFORMAS----------------------------------  */}
                    <button
                      className="boton-borrar"
                      name={c}
                      onClick={(e) => handleDeletePlatforms(e)}
                    >
                      X
                    </button>
                    <p>{c}</p>
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------------MAPSTATETOPROPS---------------------------------- */
function mapStateToProps(state) {
  return {
    videogames: state?.videogames,
    filtered: state?.filtered,
    genres: state?.genres,
  };
}

export default connect(mapStateToProps, { getGenres, getGames })(CreateGame);
