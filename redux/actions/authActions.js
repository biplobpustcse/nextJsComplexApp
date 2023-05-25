import Router from "next/router";
import { AUTHENTICATE, DEAUTHENTICATE } from "../types";
import { API } from "../../config";
import { setCookie, removeCookie } from "../../utils/cookie";
import { set, remove, get } from "../../utils/localstorage";

//import axios from 'axios';
const axios = require("axios");
// const headers = {
//     "Accept": "*/*",
//     "Content-Type": "application/json;charset=UTF-8",
//     "App-Language": "en" };
//const headers={"Access-Control-Allow-Headers": "*",'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',"Access-Control-Allow-Origin": "*"}
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};
// Register a User
const register = (
  { name, email_or_phone, password, passowrd_confirmation, register_by },
  type
) => {
  if (type !== "signup") {
    throw new Error("Wrong API call!");
  }
  const json = {
    name: name,
    email_or_phone: email_or_phone,
    password: password,
    passowrd_confirmation: passowrd_confirmation,
    register_by: register_by,
  };
  return () => {
    axios
      .post(`${API}/auth/signup`, json, headers)
      .then(() => {
        Router.push("/signin");
      })
      .catch((error) => {
        console.log(error);
        // switch (error.response.status) {
        //     case 422:
        //         let message = '';
        //         for (const [key, value] of Object.entries(error.response.data)) {
        //             message += `${key.toUpperCase()}: ${value.join(', ')}\n`
        //         }
        //         alert(message);
        //         break;
        //     case 401:
        //         alert(error.response.data);
        //         break;
        //     case 500:
        //         alert('Interval server error! Reload the page and try again!');
        //         break;
        //     default:
        //         alert(error.response.data);
        //         break;
        // }
      });
  };
};

// Gets token from the API and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== "signin") {
    throw new Error("Wrong API call!");
  }

  return (dispatch) => {
    const json = { email: email, password: password }; //JSON.stringify(
      console.log('json',json)
    dispatch({ type: AUTHENTICATE, payload: json });
    set("token", JSON.stringify(json));
    // axios
    //   .post(`${API}/auth/login`, json, headers)
    //   .then((response) => {
    //     set("token", JSON.stringify(response.data.access_token));
    //     set("user", JSON.stringify(response.data.user));
    //     Router.push("/me");
    //     dispatch({ type: AUTHENTICATE, payload: response.data });
    //   })
    //   .catch((error) => {
    //     debugger;
    //     console.log(error);
        
    //   });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (obj) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: obj });
  };
};

// const reauthenticate = (token) => {

//     return (dispatch) => {
//         dispatch({ type: AUTHENTICATE, payload: token });
//     };
// };

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    remove("token");
    remove("user");
    Router.push("/");
    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  register,
  authenticate,
  reauthenticate,
  deauthenticate,
};
