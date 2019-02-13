import { fork, takeEvery } from "redux-saga/effects";
import getBeerList from "./getBeerList";
import { FETCH_BEERS } from "../constants";

export default function* rootSaga() {
  yield takeEvery(FETCH_BEERS, getBeerList);
}
