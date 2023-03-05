import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getGames,
  orderByName,
  getGenres,
  filterByGenres,
} from "../../Redux/Actions/actions";
import "../Filter/Filter.css";

function Filter(props) {
  const [type, setType] = useState("All");

  /*ORDENAR ALFAETICAMENTE */
  function handleOrderAlf(e) {
    if (e.target.value === "All") {
      props.getGames();
    } else {
      props.orderByName(e.target.value, props.videojuego);
    }
  }
  /*FILTRAR API O DB */
  function handleBdApi(e) {
    props.getGames(e.target.value);
    setType(e.target.value);
  }

  /*FILTRAR POR GENEROS */

  function handleSelectGenres(e) {
    if (e.target.value === "All") {
      props.getGames();
    } else {
      props.filterByGenres(e.target.value);
    }
  }
  useEffect(() => {
    props.getGenres();
  }, []);

  return (
    <div className="container-filter">
      {/* --------------------ORDENAR ALFABETICAMENTE--------------------*/}
      <div className="name-filter">
        <select
          className="filtro"
          name="Alfabeticamente"
          onChange={(e) => handleOrderAlf(e)}
        >
          <option value="All">Ordenar alfabeticamente</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      {/* --------------------ORDENAR GERES--------------------*/}
      <div>
        <select
          className="filtro"
          name="temperaments"
          onChange={(e) => handleSelectGenres(e)}
          required
        >
          <option value="All">Generos</option>
          {props.genres &&
            props.genres.map((c) => <option value={c.name}> {c.name}</option>)}
        </select>
      </div>
      {/* --------------------ORDENAR BD o API --------------------*/}
      <div className="name-filter">
        <select
          className="filtro"
          name="Alfabeticamente"
          onChange={(f) => handleBdApi(f)}
        >
          <option value="All">All</option>
          <option value="DB">Data Base</option>
          <option value="API">API</option>
        </select>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videojuego: state?.videogame,
    genres: state?.genres,
  };
}

export default connect(mapStateToProps, {
  getGames,
  filterByGenres,
  orderByName,
  getGenres,
})(Filter);
