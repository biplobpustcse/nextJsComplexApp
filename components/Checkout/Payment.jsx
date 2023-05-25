import React, { useState, useRef, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import {
  applyCoupon,
  getCart,
  getPaymentURL,
  orderCreate,
} from "../lib/endpoints";

const Payment = ({
  prevAddressPageHandler,
  confirmOrderHandler,
  typeOfPayments,
  coupons,
}) => {
  const [cartCollection, setCartCollection] = useState([]);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const [coupon, setCoupon] = useState("");
  const [couponCost, setCouponCost] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [subTotalSum, setSubTotalSum] = useState(0);
  const [subTotalTax, setSubTotalTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [couponApplySuccessfully, setCouponApplySuccessfully] = useState(false);
  const dispatch = useDispatch();
  let owner_id;
  const selectedPaymentHandler = (item, { target }) => {
    setSelectedPayment(item);
    const radioClass = document.getElementsByClassName("selected");
    if (radioClass.length > 0) {
      Array.from(radioClass).forEach((element) => {
        element.classList.remove("selected");
      });
    }
    target.parentElement.classList.add("selected");
  };
  const applyCouponHandler = (item) => {
    setCoupon(item.code);
    setCouponApplySuccessfully(false);
  };
  const couponOnChangeHandler = ({ target }) => {
    setCoupon(target.value);
    setCouponApplySuccessfully(false);
  };
  const postCouponHandler = () => {
    http.post({
      url: applyCoupon,
      payload: {
        user_id: ctxAuth.user.user.id,
        owner_id: owner_id,
        coupon_code: coupon,
      },
      before: () => {},
      successed: (res) => {
        setCoupon("");
        setCouponApplySuccessfully(true);
      },
      failed: () => {},
    });
  };
  const confirmToOrderCreateHandler = () => {
    if (selectedPayment.payment_type != undefined) {
      http.post({
        url: orderCreate,
        payload: {
          owner_id: owner_id,
          user_id: ctxAuth.user.user.id,
          payment_type: selectedPayment.payment_type,
          payment_option: selectedPayment.payment_type,
          amount: subTotalSum + subTotalTax + shippingCost,
        },
        before: () => {},
        successed: (res) => {
          console.log({ res });
          http.post({
            url: getPaymentURL,
            payload: {
              payment_type: res.payment_type,
              combined_order_id: res.combined_order_id,
              amount: res.grand_total,
              user_id: res.user_id,
              payment_option: res.payment_type,
            },
            before: () => {},
            successed: (res) => {
              // res.redirect(res.url);
              confirmOrderHandler();
              dispatch({ type: "CLEAR_CART_ITEMS" });
              if (selectedPayment.payment_type != "cash_payment") {
                setTimeout(() => {
                  window.open(res.url);
                }, [700]);
              }
            },
            failed: () => {},
          });
          console.log(res);
        },
        failed: () => {},
      });
      //confirmOrderHandler();
    } else {
      toast.error("Select Payment First.");
    }
  };
  console.log({ selectedPayment });
  const getCartCollection = useCallback(() => {
    http.get({
      url: getCart,
      before: () => {},
      successed: (res) => {
        const arrayOfCartItems = [];
        res.forEach((element) => {
          element.cart_items.forEach((item) => {
            arrayOfCartItems.push(item);
          });
        });
        setCartCollection(arrayOfCartItems);
        let sumTotal = 0,
          sumTax = 0;
        arrayOfCartItems.forEach((item) => {
          sumTotal += item.price * item.quantity;
          sumTax += item.tax;
        });
        setSubTotalSum(sumTotal);
        setSubTotalTax(sumTax);
        setShippingCost(res[0]?.cart_items[0]?.shipping_cost);

        owner_id = res[0]?.owner_id;
      },
      failed: () => {},
    });
  }, []);
  console.log({ cartCollection });

  useEffect(() => {
    setTimeout(() => {
      getCartCollection();
    }, [1300]);
  }, [getCartContext.Items]);

  return (
    <>
      <fieldset>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend>Payment Information</legend>
                <div class="form-card">
                  <div class="radio-group">
                    {typeOfPayments.map((item) => (
                      <div
                        class="radio"
                        data-value={item.payment_type_key}
                        onclick="play()"
                        onClick={selectedPaymentHandler.bind(this, item)}
                      >
                        <img src={item.image} />
                        <p class="text-center">{item.name}</p>
                      </div>
                    ))}

                    <br />

                    <audio
                      id="audio"
                      src="/images/mixkit-select-click-1109.wav"
                    ></audio>
                  </div>

                  <div class="additional-information">
                    <label for="additional-information-input">
                      Additional Information
                    </label>
                    <textarea
                      name=""
                      id="additional-information-input"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend>Summary</legend>
                <div class="form-card">
                  <div class="table-responsive mb-5">
                    <table class="table table-bordered checkout-table mb-0">
                      <thead>
                        <tr>
                          <th scope="col" class="text-center">
                            Product
                          </th>
                          <th scope="col" class="text-center">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartCollection.map((item) => (
                          <tr>
                            <td class="text-start" style={{ width: "80%" }}>
                              {item.product_name} × {item.quantity}
                            </td>
                            <td class="text-end">&#2547;{item.price}</td>
                          </tr>
                        ))}

                        <tr>
                          <td class="text-start" style={{ width: "80%" }}>
                            Subtotal
                          </td>
                          <td class="text-end">&#2547;{subTotalSum}</td>
                        </tr>
                        <tr>
                          <td class="text-start" style={{ width: "80%" }}>
                            Tax
                          </td>
                          <td class="text-end">&#2547;{subTotalTax}</td>
                        </tr>
                        <tr>
                          <td class="text-start" style={{ width: "80%" }}>
                            Shipping
                          </td>
                          <td class="text-end">&#2547;{shippingCost}</td>
                        </tr>
                        <tr>
                          <td class="text-start" style={{ width: "80%" }}>
                            Total
                          </td>
                          <td class="text-end">
                            &#2547;{subTotalSum + subTotalTax + shippingCost}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="input-group mb-3 d-flex cupon-input">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Have a cupon code? Apply Here"
                      value={coupon}
                      onChange={couponOnChangeHandler}
                    />

                    <button
                      class="btn make_payment"
                      type="button"
                      id="button-addon2"
                      onClick={postCouponHandler}
                    >
                      Apply
                    </button>
                    {couponApplySuccessfully && (
                      <div>Coupon Applied Successfully</div>
                    )}
                  </div>
                  <div class="row mb-3">
                    <div class="col-12">
                      {coupons.map((item) => (
                        <div class="voucher-main">
                          <div class="voucher-item-left">
                            <img
                              src="./images/logo.png"
                              alt=""
                              class="img-fluid"
                            />
                          </div>
                          <div class="voucher-item-right">
                            <div class="voucher-conditions">
                              <div class="discont">৳ {item.discount} Off</div>
                              <div class="condition">Min spend ৳ 300</div>
                            </div>
                          </div>
                          <button
                            class="voucher-item-button"
                            type="button"
                            onClick={applyCouponHandler.bind(null, item)}
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <input
          type="button"
          name="previous"
          class="previous action-button-previous"
          value="Previous"
          onClick={() => {
            prevAddressPageHandler();
          }}
        />
        <input
          type="button"
          name="make_payment"
          class="next action-button"
          value="Confirm"
          onClick={confirmToOrderCreateHandler}
        />
      </fieldset>
    </>
  );
};

export default Payment;
