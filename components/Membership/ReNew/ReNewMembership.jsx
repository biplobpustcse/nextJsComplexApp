import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { http } from "../../../services/httpService";
import {
  getMembershipType,
  getMembershipTypeSingle,
  postMembershipPay,
  postReNewMembershipPay,
} from "../../lib/endpoints";

function ReNewMembership({ cardDetails }) {
  const [cardDetail, setCardDetail] = useState();
  const [memberShipType, setMemberShipType] = useState([]);
  const [message, setMessage] = useState();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const memberShipJoinPay = useCallback((data) => {
    http.post({
      url: postReNewMembershipPay,
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
  })
  const reNewMemberShipPaymentHandler = (item, e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));

    const data = {
      user_id: user?.user.id,
      payment_option: "sslCommerz",
      payment_type: "renew_membership_pay",
      amount: item.renew_price,
    };
    memberShipJoinPay(data);
  };
  return (
    <>
      {cardDetails && (
        <section className="membership-main ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="membership-bg">
                  <div className="common-fieldset-main">
                    <fieldset className="common-fieldset">
                      <div className="row" style={{justifyContent:"center"}}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div className="card">
                            <div className="row g-0">
                              <div className="col-md-6">
                                <img
                                  src="../assets/images/club/c1.png"
                                  className="img-fluid"
                                  alt="..."
                                />
                              </div>
                              <div className="col-md-6  text-center">
                                <div className="card-body">
                                  <h5 className="">
                                    {cardDetails?.category_name} 
                                  </h5>
                                  <p className="text-danger m-0">
                                    Everyday instant savings
                                  </p>
                                  <p className="text-secondary m-0">
                                    Membership Renewal Fee
                                  </p>
                                  <p className="membership-price m-0">
                                    {" "}
                                    &#2547; {cardDetails.renew_price} / year
                                  </p>
                                  <p className="membership-price"></p>
                                </div>
                                <div className="card-footer">
                                  <a
                                    href="javascript:void(0);"
                                    type="button"
                                    className="btn purchase-membership"
                                    onClick={reNewMemberShipPaymentHandler.bind(
                                      this,
                                      cardDetails
                                    )}
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    Renew Membership
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
    </>
  );
}

export default ReNewMembership;
