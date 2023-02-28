import React, { useEffect } from "react";
import Cards from "../Cards/Cards";
import { getGames } from "../../Redux/Actions/actions";
import { connect } from "react-redux";
import "../Home/Home.css";

//codigo
function Home(props) {
  useEffect(() => {
    if (!props.filtered) props.getGames();
  }, []);
  return (
    <div className="conteiner-home">
      <div className="card-home">
        <Cards />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state?.videogames,
    filtered: state?.filtered,
  };
}

export default connect(mapStateToProps, { getGames })(Home);
