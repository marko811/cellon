import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loadServiceListSuccess,
  loadServiceListFail,
  orderProductSuccess,
  orderProductFail,
  loadOfferListSuccess,
  loadOfferListFail,
} from "../actions/service";
import {
  LOAD_SERVICE_LIST_REQUEST,
  ORDER_PRODUCT_REQUEST,
  LOAD_PRODUCT_LIST_REQUEST,
  LOAD_OFFER_LIST_REQUEST,
} from "../constants/serviceActions";

function* loadServiceListRequestHandler() {
  const params = {
    url: "/service/getServices",
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = yield call(axios.request, params);
    yield put(loadServiceListSuccess(res.data.data));
  } catch (err) {
    yield put(loadServiceListFail(err));
  }
}

function* orderProductRequestHandler({ payload }) {
  const params = {
    url: "/offer/addOffer",
    method: "post",
    data: payload,
    headers: {
      "content-type": "application/json",
    },
  };
  console.log(params);
  try {
    const res = yield call(axios.request, params);
    console.log(res.data);
    yield put(orderProductSuccess(res.data.data));
  } catch (err) {
    console.log("22");
    yield put(orderProductFail(err));
  }
}

function* loadProductListRequestHandler({ payload }) {
  const params = {
    url: "/offer/addOffer",
    method: "post",
    data: payload,
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = yield call(axios.request, params);
    yield put(loadOfferListSuccess(res.data.data));
  } catch (err) {
    yield put(loadOfferListFail(err));
  }
}

function* loadOfferListRequestHandler() {
  const params = {
    url: "/offer/getOffers",
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  };
  console.log(params);
  try {
    const res = yield call(axios.request, params);
    console.log(res.data);
    yield put(loadServiceListSuccess(res.data.data));
  } catch (err) {
    yield put(loadServiceListFail(err));
  }
}

export default function* serviceSagas() {
  yield takeLatest(LOAD_SERVICE_LIST_REQUEST, loadServiceListRequestHandler);
  yield takeLatest(ORDER_PRODUCT_REQUEST, orderProductRequestHandler);
  yield takeLatest(LOAD_PRODUCT_LIST_REQUEST, loadProductListRequestHandler);
  yield takeLatest(LOAD_OFFER_LIST_REQUEST, loadOfferListRequestHandler);
}
