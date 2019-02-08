import { createStore, compose, applyMiddleware } from "redux";
// import rootReducer from "./reducers";
import thunk from "redux-thunk";
import BeerReducer from "./reducers/BeerReducer";

const middleware = [thunk];

export const store = createStore(
  BeerReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
