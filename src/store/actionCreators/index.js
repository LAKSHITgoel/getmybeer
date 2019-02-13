import {
  ADD_TO_FAV,
  GET_BEERS,
  SEARCH_BEER,
  REMOVE_FROM_FAV,
  FETCH_BEERS
} from "../constants";

export const getBeer = page => {
  return {
    type: FETCH_BEERS,
    payload: {
      page
    }
  };
};

export const searchBeer = beer_name => {
  return {
    type: SEARCH_BEER,
    payload: {
      search: beer_name
    }
  };
};

export const addToFav = id => {
  return {
    type: ADD_TO_FAV,
    payload: {
      id
    }
  };
};

export const removeFromFav = id => {
  return {
    type: REMOVE_FROM_FAV,
    payload: {
      id
    }
  };
};
