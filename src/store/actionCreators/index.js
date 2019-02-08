import {
  ADD_TO_FAV,
  GET_BEERS,
  SEARCH_BEER,
  REMOVE_FROM_FAV
} from "../constants";

export const getBeer = beers => dispatch => {
  dispatch({
    type: GET_BEERS,
    payload: {
      beers
    }
  });
};

export const searchBeer = beer_name => dispatch => {
  dispatch({
    type: SEARCH_BEER,
    payload: {
      search: beer_name
    }
  });
};

export const addToFav = id => dispatch => {
  dispatch({
    type: ADD_TO_FAV,
    payload: {
      id
    }
  });
};

export const removeFromFav = id => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAV,
    payload: {
      id
    }
  });
};
