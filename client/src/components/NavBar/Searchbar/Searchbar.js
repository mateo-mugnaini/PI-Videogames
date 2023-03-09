import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getGame } from "../../../Redux/Actions/actions";
import "../Searchbar/Searchbar.css";

function SearchBar() {
  const [nameGames, setNameGames] = useState();

  const dispatch = useDispatch();
  async function handleChange(e) {
    // e.preventDefault();
    setNameGames(e);
    dispatch(getGame(e, "All"));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(getGame(nameGames, "All"));
  }

  return (
    <div className="contenedor-search">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="searchbar"
          type="search"
          placeholder="Buscar juego..."
          onChange={(e) => handleChange(e.target.value)}
        />
        <input className="botonSearch" type="submit" value="Buscar" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state?.videogames,
  };
}

export default connect(mapStateToProps, { getGame })(SearchBar);
