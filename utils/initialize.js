import Router from "next/router";
import actions from "../redux/actions";
import { getCookie } from "../utils/cookie";
import { get } from "../utils/localstorage";
import { get1, post,http } from "../services/httpService";

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(actions.reauthenticate(get("USER", ctx.req)));
    }
  } else {
    const token = ctx.store.getState().authentication.token; //token==null? ctx.store.dispatch(actions.reauthenticate(get('token', ctx.req))):
    if (token && (ctx.pathname === "/signin" || ctx.pathname === "/signup")) {
      setTimeout(function () {
        Router.push("/");
      }, 0);
    }
  }
}

export const subscribe_now = async (email) => {
  if (
    email == "" ||
    email == null ||
    email == undefined ||
    email?.length == 0
  ) {
    return { data: "Email is required", status: 421 };
  }
  let res = {
    data: "Something went wrong",
    status: 500,
  };
  await http.post({
    url: 'subscribe',
    payload: { email },
    successed: () => {
      res = { data: "Email Subscribed SuccessFully", status: 200 };
    },
    failed: () => {
      res = { data: "Already Subscribed", status: 422 };
    },
  });
  return res;
};
