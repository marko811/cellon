export function validateEmail(email) {
  const reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

export function validatePhoneNumber(phoneNum) {
  const reg = /^\+?[1-9]\d{1,14}$/;
  return reg.test(phoneNum);
}

export function validateAccount(url) {
  // eslint-disable-next-line no-useless-escape
  const reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return reg.test(url);
}

export function validatePassword(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

export function valideConfrimPwd(pwd1, pwd2) {
  if (pwd1 === pwd2) {
    return true;
  }
  return false;
}
