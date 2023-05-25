import router from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function RenewMembershipTemplate() {
    const dispatch = useDispatch();

  const ctxAuth = useSelector((state) => state.authReducerContext);
  const renewMemberShipHandler = (e) => {
    e.preventDefault();
    if (ctxAuth.isLoggedIn) {
      router.push({ pathname: "/membership/renew" });
    } else {
      dispatch({
        type: "RENEW_MEMBER_SHIP_LOGIN",
        payload: true,
      });
      router.push({ pathname: "/auth" });
    }
  };
  return (
    <section class="club-renew">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="renew-bg">
              <h3>already a wholesale club member ?</h3>
              <a href="" class="renew-btn" onClick={renewMemberShipHandler.bind(this)}>
                renew membership
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RenewMembershipTemplate;
