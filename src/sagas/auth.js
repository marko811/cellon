import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginSuccess,
  loginFail,
  signupSuccess,
  signupFail,
  updateProfileSuccess,
  updateProfileFail,
} from "../actions/auth";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_GOOGLE,
  SIGNUP_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from "../constants/authActions";
import { setToken } from "../utils/auth";

function* loginRequestHandler({ payload }) {
  const params = {
    url: "/auth/login",
    method: "post",
    data: payload,
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = yield call(axios.request, params);
    console.log(res.data.data);
    yield put(loginSuccess(res.data.data));
    setToken(res.data.data.access_token);
    // yield put(NavigationActions.navigate({ routeName: "CustomerMainStack" }));
  } catch (err) {
    yield put(loginFail(err.response.data));
  }
}

function* loginRequestWithGoogleHandler({ payload }) {
  const params = {
    url: "/auth/google",
    method: "get",
    params: payload,
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = yield call(axios.request, params);
    yield put(loginSuccess(res.data.data));
    setToken(res.data.data.access_token);
  } catch (err) {
    yield put(loginFail(err.response.data));
  }
}

function* signupRequestHandler({ payload }) {
  const params = {
    url: "/auth/register",
    method: "post",
    data: payload,
  };
  try {
    const res = yield call(axios.request, params);
    yield put(signupSuccess(res.data.data));
  } catch (err) {
    yield put(signupFail(err.response.data));
  }
}

function* updateProfileRequestHandler({ payload }) {
  const params = {
    url: "/user/updateProfile",
    method: "post",
    data: payload,
  };
  console.log(params);
  try {
    const res = yield call(axios.request, params);
    yield put(updateProfileSuccess(res.data.data));
  } catch (err) {
    yield put(updateProfileFail(err));
  }
}

export default function* authSagas() {
  yield takeLatest(LOGIN_REQUEST, loginRequestHandler);
  yield takeLatest(LOGIN_REQUEST_GOOGLE, loginRequestWithGoogleHandler);
  yield takeLatest(SIGNUP_REQUEST, signupRequestHandler);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileRequestHandler);
}
