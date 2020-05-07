import { all, fork } from "redux-saga/effects";
import authSagas from "./auth";
import serviceSagas from "./service";

// function createDevice() {}

function* rootSaga() {
  yield all([fork(authSagas), fork(serviceSagas)]);
}

export default rootSaga;
