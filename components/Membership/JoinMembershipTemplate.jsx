import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import { getMembershipType } from "../lib/endpoints";

function JoinMembershipTemplate({ memberShipData }) {
  const dispatch = useDispatch();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [memberShipType, setMemberShipType] = useState(memberShipData || []);

  const ctxAuth = useSelector((state) => state.authReducerContext);

  const purchaseMemberShipHandler = (item, e) => {
    e.preventDefault();
    if (ctxAuth.isLoggedIn) {
      router.push({
        pathname: "/membership/join",
        query: { id: item.categoryid },
      });
    } else {
      dispatch({
        type: "JOIN_MEMBER_SHIP_LOGIN",
        payload: true,
      });
      router.push({ pathname: "/auth" });
    }
  };
  console.log({ memberShipData });
  // const GetMembershipType = useCallback(() => {
  //   http.get({
  //     url: getMembershipType,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setMemberShipType(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   GetMembershipType();
  // }, []);
  return (
    <section class="membership-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="membership-bg">
              <div class="common-fieldset-main">
                <fieldset class="common-fieldset">
                  <legend class="rounded">
                    join the wholesale club membership
                  </legend>
                  <div class="row">
                    {memberShipType.length > 0 &&
                      memberShipType.map((item) => {
                        return (
                          <>
                            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                              <div class="card mb-3">
                                <div class="row g-0">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <img
                                      src={item?.photo}
                                      class="img-fluid"
                                      alt="..."
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        {item?.category_name}
                                      </h5>
                                      <p class="instant-saving">
                                        everyday instant savings
                                      </p>
                                      <p class="membership-price">
                                        {" "}
                                        &#2547; {item?.price} / year
                                      </p>
                                      <a
                                        href="javascript:void(0);"
                                        type="button"
                                        class="btn purchase-membership"
                                        onClick={purchaseMemberShipHandler.bind(
                                          this,
                                          item
                                        )}
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                      >
                                        purchase membership
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinMembershipTemplate;
