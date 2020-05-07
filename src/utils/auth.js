import axios from "axios";
import asyncStore from "./asyncStore";

export const setToken = token => {
  if (token) {
    axios.defaults.headers.common.authToken = token;
    asyncStore.setAsyncStorage("token", token);
  } else {
    delete axios.defaults.headers.common.authToken;
    asyncStore.removeAsyncstorage("token");
  }
};

export const setUserInfo = data => {
  if (data === null) {
    asyncStore.removeAsyncstorage("user");
  } else {
    asyncStore.setAsyncStorage("user", data);
  }
};
