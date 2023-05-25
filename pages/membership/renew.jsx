import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { getMembershipTypeSingle } from "../../components/lib/endpoints";
import ReNewMembership from "../../components/Membership/ReNew/ReNewMembership";
import { http } from "../../services/httpService";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function renew() {
  const dispatch = useDispatch();
  const [cardDetails, setCardDetails] = useState();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const registerMemberShipHandler = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    if (user) {
      router.push({ pathname: "/membership/register" });
    }
  };
  const joinMemberShipHandler = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    if (user) {
      router.push({ pathname: "/membership" });
    }
  };

  const getMembershipCategory = useCallback((urlId) => {
    http.get({
      url: getMembershipTypeSingle + urlId,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setCardDetails(res);

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  });
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    console.log("user", user?.user);
    if (!user) {
      router.push({ pathname: "/auth" });
    } else {
      getMembershipCategory(user?.user?.membership?.categoryid);
      dispatch({ type: "RENEW_MEMBER_SHIP_LOGIN", payload: false });
    }
  }, []);
  console.log(cardDetails);
  return (
    <>
      {cardDetails && Object.keys(cardDetails).length > 0 && (
        <ReNewMembership cardDetails={cardDetails} />
      )}
      {cardDetails && Object.keys(cardDetails).length <= 0 && (
        <h4>You have not any membership card</h4>
      )}
      <section class="membership-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="membership-bg">
                <div class="common-fieldset-main">
                  <fieldset class="common-fieldset text-center">
                    <h6>Already a member,but new to Wholesale Club online?</h6>
                    <a
                      href="#"
                      class="btn view-all-product-btn mt-4"
                      onClick={registerMemberShipHandler.bind(this)}
                    >
                      register your membership
                    </a>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="membership-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="membership-bg">
                <div class="common-fieldset-main">
                  <fieldset class="common-fieldset text-center">
                    <h6>Not a Wholesale Club member?</h6>
                    <a
                      href="#"
                      class="btn view-all-product-btn mt-4"
                      onClick={joinMemberShipHandler.bind(this)}
                    >
                      join now the Wholesale Club Membership
                    </a>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default renew;
