import {
  GET_GAMES,
  GET_GAME,
  GET_DETAIL,
  GET_GENRES,
  FILTER_BY_CREATER,
  FILTER_GENRES,
  ORDER_BY_NAME,
} from "../Actions/actions_type";

const initialState = {
  videogames: [],
  genres: [],
  videogame: [],
  filtered: false,
};

export default function rootReducer(state = initialState, action) {
  if (action.type === GET_GAMES) {
    return {
      ...state,
      videogames: action.payload,
    };
  }

  if (action.type === GET_GAME) {
    return {
      ...state,
      videogames: action.payload,
    };
  }
  if (action.type === GET_GENRES) {
    return {
      ...state,
      genres: action.payload,
    };
  }

  if (action.type === GET_DETAIL) {
    return {
      ...state,
      videogame: action.payload,
    };
  }
}
