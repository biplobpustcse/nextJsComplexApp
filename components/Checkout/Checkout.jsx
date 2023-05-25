
import React, { useState, useRef, useEffect } from "react";
import Address from "./Address";
import Payment from "./Payment";
import SuccessOrder from "./SuccessOrder";

const Checkout = ({ data, storeList, typeOfPayments, coupons }) => {
  const ref = useRef();
  const [activeAddressStatus, setActiveAddressStatus] = useState(true);
  const [activePaymentStatus, setActivePaymentStatus] = useState(false);
  const [successOrderStatus, setSuccessOrderStatus] = useState(false);

  const nextPaymentPageHandler = () => {
    setActivePaymentStatus(true);
    setActiveAddressStatus(false);
  };
  const prevAddressPageHandler = () => {
    setActivePaymentStatus(false);
    setActiveAddressStatus(true);
  };
  const confirmOrderHandler = () => {
    setSuccessOrderStatus(true);
    setActivePaymentStatus(false);
    setActiveAddressStatus(false);
  };
  useEffect(() => {
    if (activeAddressStatus) {
      ref.current.firstChild.classList.add("active");
    } else {
      ref.current.firstChild.classList.remove("active");
    }
    if (activePaymentStatus) {
      ref.current.firstChild.nextElementSibling.classList.add("active");
    } else {
      ref.current.firstChild.nextElementSibling.classList.remove("active");
    }
    if (successOrderStatus) {
      ref.current.lastChild.classList.add("active");
    } else {
      ref.current.lastChild.classList.remove("active");
    }
  }, [activeAddressStatus, activePaymentStatus, successOrderStatus]);

  return (
    <>
      <section class="multistep-form-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="multistep-form-bg">
                {/* <!-- MultiStep Form --> */}
                <div class="grad1" id="grad1">
                  <div class="row justify-content-center mt-0">
                    <div class="col-11 col-sm-9 col-md-8 col-lg-10 text-center p-0 mt-3 mb-2">
                      <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                        <div class="row">
                          <div class="col-md-12 mx-0">
                            <div class="common-fieldset-main">
                              <fieldset class="common-fieldset">
                                <legend>Checkout Form</legend>

                                <form id="msform">
                                  {/* <!-- <h2><strong>Checkout Form</strong></h2> -->

                                  <!-- progressbar --> */}
                                  <ul id="progressbar" ref={ref}>
                                    <li class="" id="account">
                                      <strong>Address</strong>
                                    </li>
                                    {/* <!-- <li id="personal"><strong>Personal</strong></li> --> */}
                                    <li id="payment">
                                      <strong>Payment</strong>
                                    </li>
                                    <li id="confirm">
                                      <strong>Finish</strong>
                                    </li>
                                  </ul>
                                  {activeAddressStatus && (
                                    <Address
                                      nextPaymentPageHandler={
                                        nextPaymentPageHandler
                                      }
                                      data={data}
                                      storeList={storeList}
                                    />
                                  )}

                                  {/* <!-- fieldsets --> */}
                                  {activePaymentStatus && (
                                    <Payment
                                      prevAddressPageHandler={
                                        prevAddressPageHandler
                                      }
                                      confirmOrderHandler={confirmOrderHandler}
                                      typeOfPayments={typeOfPayments}
                                      coupons={coupons}
                                    />
                                  )}
                                  {successOrderStatus && <SuccessOrder />}
                                </form>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
