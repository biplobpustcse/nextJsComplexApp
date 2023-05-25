var CryptoJS = require("crypto-js");
import { Encrypt, API } from "../config";

export const set = (key, value) => {
  if (process.browser) {
    //value=CryptoJS.AES.encrypt(value, Encrypt).toString();
    localStorage.setItem(key, value);
  }
};

export const remove = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const get = (key) => {
  if (process.browser) {
    return localStorage.getItem(key);
    // if(getCookieFromBrowser(key)){
    //     var data = CryptoJS.AES.decrypt(getCookieFromBrowser(key), Encrypt);

    // }else{
    //     return null;
    // }
  }
  // return process.browser
  //     ? getCookieFromBrowser(key)
  //     : getCookieFromServer(key, req);
};
const getCookieFromBrowser = (key) => {
  return localStorage.getItem(key);
};
