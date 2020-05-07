import * as authActions from "../constants/authActions";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    case authActions.LOGIN_REQUEST_GOOGLE:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case authActions.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.err,
      };
    case authActions.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    case authActions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case authActions.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.err,
      };
    case authActions.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    case authActions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case authActions.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.err,
      };
    default:
      return state;
  }
}
