import { call, put } from "redux-saga/effects";
import BeerAPI from "../../api";
import { GET_BEERS } from "../constants";

export default function* getBeerList(action) {
  const res = yield call(BeerAPI.getBeer, action.payload.page);
  const payload = res ? res : {};
  console.log(payload);
  // send returned object back to reducer as payload:
  yield put({ type: GET_BEERS, payload });
}
