import axios from "axios";
import {
  GET_GAMES,
  GET_GAME,
  GET_BUSQUEDA,
  GET_DETAIL,
  GET_GENRES,
  ORDER_BY_RATING,
  ORDER_BY_NAME,
  // RESET,
} from "../Actions/actions_type";

// --------------------------------------------GETS GAMES--------------------------------------------
export function getGames(type = "All") {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames?type=${type}`
    );
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
      payload: [response.data],
    });
    // console.log(response.data);
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

// --------------------------------------------FILTERS--------------------------------------------

export function orderByName(modo) {
  return function (dispatch) {
    dispatch({
      type: ORDER_BY_NAME,
      payload: modo,
    });
  };
}

export function orderByRating(modo) {
  return function (dispatch) {
    dispatch({
      type: ORDER_BY_RATING,
      payload: modo,
    });
  };
}

export function filterByGenres(genresName) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames?genresName=${genresName}`
    );
    dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
  };
}

/*
export function resetFilters(modo) {
  return async function (dispatch) {
    dispatch({
      type: RESET,
      payload: modo,
    });
  };
}
*/
