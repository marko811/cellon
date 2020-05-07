import * as serviceActions from "../constants/serviceActions";

export const loadServiceListRequest = payload => ({
  type: serviceActions.LOAD_SERVICE_LIST_REQUEST,
  payload,
});

export const loadServiceListSuccess = payload => ({
  type: serviceActions.LOAD_SERVICE_LIST_SUCCESS,
  payload,
});

export const loadServiceListFail = err => ({
  type: serviceActions.LOAD_SERVICE_LIST_FAIL,
  err,
});

export const orderProductRequest = payload => ({
  type: serviceActions.ORDER_PRODUCT_REQUEST,
  payload,
});

export const orderProductSuccess = payload => ({
  type: serviceActions.ORDER_PRODUCT_SUCCESS,
  payload,
});

export const orderProductFail = err => ({
  type: serviceActions.ORDER_PRODUCT_FAIL,
  err,
});

export const loadProductListRequest = payload => ({
  type: serviceActions.LOAD_PRODUCT_LIST_REQUEST,
  payload,
});

export const loadProductListSuccess = payload => ({
  type: serviceActions.LOAD_PRODUCT_LIST_SUCCESS,
  payload,
});

export const loadProductListFail = err => ({
  type: serviceActions.LOAD_PRODUCT_LIST_FAIL,
  err,
});

export const addProduct = payload => ({
  type: serviceActions.ADD_PRODUCT,
  payload,
});

export const removeProduct = payload => ({
  type: serviceActions.REMOVE_PRODUCT,
  payload,
});

export const loadOfferListRequest = payload => ({
  type: serviceActions.LOAD_OFFER_LIST_REQUEST,
  payload,
});

export const loadOfferListSuccess = payload => ({
  type: serviceActions.LOAD_OFFER_LIST_SUCCESS,
  payload,
});

export const loadOfferListFail = err => ({
  type: serviceActions.LOAD_OFFER_LIST_FAIL,
  err,
});
