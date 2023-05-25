import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import SecondFooter2 from "../../../components/Footer/SecondFooter2";
import SslFooter2 from "../../../components/Footer/SslFooter2";
import {
  getMembershipTypeSingle,
  postMembership,
  postMembershipPay,
} from "../../../components/lib/endpoints";
import PurchaseMembership from "../../../components/Membership/Purchase/PurchaseMembership";
import { http } from "../../../services/httpService";
import {SecondFooter} from "../../../components/Footer/SecondFooter";

function index() {
  const router = useRouter();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDetail, setCardDetail] = useState();
  const [isShowForm, setIsShowForm] = useState(true);

  const GetMembershipType = useCallback((urlId) => {
    http.get({
      url: getMembershipTypeSingle + urlId,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setCardDetail(res);

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  });
  function memberShipJoinPay(data) {
    http.post({
      url: postMembershipPay,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        window.location.assign(res.url)
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  const purMemberShipPaymentHandler = (item, e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));

    const data = {
      user_id: user?.user.id,
      payment_option: "sslcommerz",
      payment_type: "membership_pay",
      amount: item.price,
    };
    memberShipJoinPay(data);
  };

  useEffect(() => {
    if (router.asPath) {
      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = router.query[key])
      );
      GetMembershipType(strUrl);
    }
  }, [router.asPath]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    if (!user) {
      router.push({ pathname: "/auth" });
    }
  }, []);

  return (
    <>
      {isShowForm && (
        <PurchaseMembership
          setIsShowForm={setIsShowForm}
          cardDetail={cardDetail}
        />
      )}
      {!isShowForm && (
        <section class="membership-main">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="membership-bg">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      {/* <legend class="rounded">
                        join the wholesale club membership
                      </legend> */}
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="card">
                            <div class="row g-0">
                              <div class="col-md-6">
                                <img
                                  src={cardDetail.photo}
                                  class="img-fluid"
                                  alt="..."
                                />
                              </div>
                              <div class="col-md-6">
                                <div class="card-body">
                                  <h5 class="">
                                    {cardDetail.category_name} Fee &#2547;{" "}
                                    {cardDetail.price}
                                  </h5>

                                  <p class="membership-price">
                                    {" "}
                                    &#2547; {cardDetail.price} / year
                                  </p>
                                  <p class="membership-price"></p>
                                </div>
                                <div class="card-footer">
                                  <a
                                    href="javascript:void(0);"
                                    type="button"
                                    class="btn purchase-membership"
                                    onClick={purMemberShipPaymentHandler.bind(
                                      this,
                                      cardDetail
                                    )}
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    Continue
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default index;
