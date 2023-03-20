import {
  GET_GAMES,
  GET_GAME,
  GET_DETAIL,
  GET_GENRES,
  ORDER_BY_RATING,
  ORDER_BY_NAME,
  RESET,
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

  /* -------------------------------------------ORDENAR POR NOMBRE------------------------------------------- */
  if (action.type === ORDER_BY_NAME) {
    const allGames = [...state.videogames];

    allGames.sort((a, b) => {
      let ordenA = a.name ? a.name.toUpperCase() : "";
      let ordenB = b.name ? b.name.toUpperCase() : "";

      if (action.payload === "A-Z") {
        if (ordenA === ordenB) {
          return 0;
        } else if (ordenA < ordenB) {
          return -1;
        }
        return 1;
      }
      if (action.payload === "Z-A") {
        if (ordenA === ordenB) {
          return 0;
        } else if (ordenA < ordenB) {
          return 1;
        }
        return -1;
      }
    });
    return {
      ...state,
      videogames: allGames,
      filtered: true,
    };
  }

  /* -------------------------------------------ORDENAR POR RATING------------------------------------------- */
  if (action.type === ORDER_BY_RATING) {
    const allGames = [...state.videogames];
    allGames.sort((a, b) => {
      let ratingA = a.rating;
      let ratingB = b.rating;

      let ratingANumber;
      let ratingBNumber;

      if (typeof ratingA === "object") {
        ratingANumber = Number(ratingA);
      } else {
        ratingANumber = Number(ratingA);
      }

      if (typeof ratingB === "object") {
        ratingBNumber = Number(ratingB);
      } else {
        ratingBNumber = Number(ratingB);
      }

      if (action.payload === "Asc") {
        if (ratingANumber === ratingBNumber) {
          return 0;
        } else if (ratingANumber < ratingBNumber) {
          return -1;
        }
        return 1;
      }
      if (action.payload === "Des") {
        if (ratingANumber === ratingBNumber) {
          return 0;
        } else if (ratingANumber < ratingBNumber) {
          return 1;
        }
        return -1;
      }
    });
    return {
      ...state,
      videogames: allGames,
      filtered: true,
    };
  }
  /* -------------------------------------------RESET FILTRO------------------------------------------- */
  // if (action.type === RESET) {
  //   return {
  //     ...state,
  //     filters: {
  //       name: "All",
  //       genre: "All",
  //       rating: "All",
  //     },
  //   };
  // }
  /* -------------------------------------------ESTADO BASE------------------------------------------- */
  return state;
}
