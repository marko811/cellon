import * as serviceActions from "../constants/serviceActions";

const initialState = {
  loading: false,
  orderList: [],
  offerList: [],
  serviceList: null,
  error: null,
};

export default function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case serviceActions.LOAD_SERVICE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        serviceList: null,
        error: null,
      };
    case serviceActions.LOAD_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceList: action.payload,
        error: null,
      };
    case serviceActions.LOAD_SERVICE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        serviceList: null,
        error: action.err,
      };
    case serviceActions.ORDER_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case serviceActions.ORDER_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case serviceActions.ORDER_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.err,
      };
    case serviceActions.LOAD_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        serviceList: null,
        error: null,
      };
    case serviceActions.LOAD_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceList: action.payload,
        error: null,
      };
    case serviceActions.LOAD_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        serviceList: null,
        error: action.err,
      };
    case serviceActions.ADD_PRODUCT: {
      const { orderList } = state;
      orderList.push(action.payload.product);
      return {
        ...state,
        loading: false,
        orderList,
        error: null,
      };
    }
    case serviceActions.REMOVE_PRODUCT: {
      const { orderList } = state;
      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i] === action.payload.product) {
          orderList.splice(i, 1);
        }
      }
      return {
        ...state,
        loading: false,
        orderList,
        error: null,
      };
    }
    case serviceActions.LOAD_OFFER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        offerList: null,
        error: null,
      };
    case serviceActions.LOAD_OFFER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        offerList: action.payload,
        error: null,
      };
    case serviceActions.LOAD_OFFER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        offerList: null,
        error: action.err,
      };
    default:
      return state;
  }
}
