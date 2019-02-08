import {
  ADD_TO_FAV,
  GET_BEERS,
  SEARCH_BEER,
  REMOVE_FROM_FAV
} from "../constants";

const initialState = {
  beers: [],
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BEERS: {
      return { ...state, beers: [...state.beers, ...action.payload.beers] };
    }

    case SEARCH_BEER: {
      return { ...state, beers: [...state.beers, action.payload] };
    }

    case ADD_TO_FAV: {
      let fav = [];
      let arr = state.beers.map(obj => {
        if (Number(obj.id) === Number(action.payload.id)) {
          fav.push({ ...obj, fav: true });
          return { ...obj, fav: true };
        }
        return obj;
      });
      return {
        ...state,
        beers: [...arr],
        favourites: [...state.favourites, ...fav]
      };
    }

    case REMOVE_FROM_FAV: {
      let arr = state.beers.map(obj => {
        if (Number(obj.id) === Number(action.payload.id)) {
          return { ...obj, fav: false };
        }
        return obj;
      });

      let fav = state.favourites.filter(obj => {
        console.log(action.payload.id);
        if (Number(obj.id) !== Number(action.payload.id)) {
          return obj;
        }
      });

      return {
        ...state,
        beers: [...arr],
        favourites: [...fav]
      };
    }

    default:
      return state;
  }
};
