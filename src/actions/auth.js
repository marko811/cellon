import * as authActions from "../constants/authActions";

export const loginRequest = payload => ({
  type: authActions.LOGIN_REQUEST,
  payload,
});

export const loginRequestWithGoogle = payload => ({
  type: authActions.LOGIN_REQUEST_GOOGLE,
  payload,
});

export const loginSuccess = payload => ({
  type: authActions.LOGIN_SUCCESS,
  payload,
});

export const loginFail = err => ({
  type: authActions.LOGIN_FAIL,
  err,
});

export const signupRequest = payload => ({
  type: authActions.SIGNUP_REQUEST,
  payload,
});

export const signupSuccess = payload => ({
  type: authActions.SIGNUP_SUCCESS,
  payload,
});

export const signupFail = err => ({
  type: authActions.SIGNUP_FAIL,
  err,
});

export const updateProfileRequest = payload => ({
  type: authActions.UPDATE_PROFILE_REQUEST,
  payload,
});

export const updateProfileSuccess = payload => ({
  type: authActions.UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileFail = err => ({
  type: authActions.UPDATE_PROFILE_FAIL,
  err,
});
