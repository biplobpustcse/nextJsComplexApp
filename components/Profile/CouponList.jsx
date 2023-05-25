import React from "react";

const CouponList = ({ data }) => {
  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">coupon list</legend>

              <div class="row">
                {data.map((item) => (
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div class="voucher-main my-3">
                      <div class="voucher-item-left">
                        <img
                          src="assets/images/logo.png"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                      <div class="voucher-item-right">
                        <div class="voucher-conditions">
                          <div class="discont">৳ 1{item.discount} Off</div>
                          <div class="condition">
                            Min Spend ৳ {item.details.min_buy}
                          </div>
                        </div>
                      </div>
                      <div class="voucher-item-button-wrapper">
                        <div class="card-exp-date">
                          <p>Exp: 12/2/2022</p>
                        </div>
                        <button class="voucher-item-button" type="button">
                          collect
                        </button>
                        <div class="term-condition">
                          <a href>Terms & Condition</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponList;
