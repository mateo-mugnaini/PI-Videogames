import axios from "axios";
import {
  GET_GAMES,
  GET_GAME,
  GET_BUSQUEDA,
  GET_DETAIL,
  GET_GENRES,
  FILTER_BY_CREATER,
  FILTER_GENRES,
  ORDER_BY_NAME,
} from "../Actions/actions_type";

// --------------------------------------------GETS GAMES--------------------------------------------
export function getGames() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
  };
}

export function getGame(name, type) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}&type=${type}`
    );
    dispatch({
      type: GET_GAME,
      payload: response.data,
    });
  };
}

export function getBusqueda(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    dispatch({
      type: GET_BUSQUEDA,
      payload: response.data,
    });
  };
}

export function getDetail(idVideogame) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames/${idVideogame}`
    );
    dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
}

// --------------------------------------------GETS GENRES--------------------------------------------
export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
}