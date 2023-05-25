import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import { getHomeSliders, getMembershipType } from "../lib/endpoints";

function RegisterMembershipTemplate() {
  const dispatch = useDispatch();
 const [memberPageData,setMemberPageData] = useState()


  const ctxAuth = useSelector((state) => state.authReducerContext);
  const registerMemberShipHandler = (e) => {
    e.preventDefault();
    if (ctxAuth.isLoggedIn) {
      router.push({ pathname: "/membership/register" });
    } else {
      dispatch({
        type: "REGISTER_MEMBER_SHIP_LOGIN",
        payload: true,
      });
      router.push({ pathname: "/auth" });
    }
  };




  const getMemberPageData = () => {
    http.get({
      url: 'membership-page-content',
      before: () => {
      },
      successed: (res) => {
        setMemberPageData(res);
      },
      failed: () => {
      },
    });
  }

  useEffect(() => {
    getMemberPageData()
  },[])
  
  return (
    <section class="club-register">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="club-bg">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                  <div class="image-box">
                    <img
                      src={memberPageData?.banner}
                      class="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                  <div class="club-reg-content">
                    <h3>{memberPageData?.title}</h3>
                    <p>
                      {memberPageData?.description}
                    </p>
                    <a
                      href="#"
                      class="btn register-membership"
                      onClick={registerMemberShipHandler.bind(this)}
                    >
                      register your membership
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterMembershipTemplate;
