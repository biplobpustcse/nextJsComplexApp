import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import {
  emptyPasswordMsg,
  emptyPhoneMsg,
  failedLoginMsg,
  phoneInvalid,
  phoneInvalidMsg,
} from "../../utils/dictionaries";
import {addCartMultiple, postLogin} from "../lib/endpoints";

const LoginModal = ({ setVisibleForgotPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useSelector((state) => state.HomeData);

  const [clicked, setClicked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: failedLoginMsg,
  });
  //phone validation state
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneFormated, setPhoneFormated] = useState(false);
  // password validation state
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  //validation formate
  var phonenoFormat = /^\d{11}$/;

  //#region Handlers
  const phoneChangeHandler = ({ target }) => {
    setPhone(target.value);
  };
  const phoneIsTouched = () => {
    setPhoneTouched(true);
    if (phone.match(phonenoFormat)) {
      setPhoneFormated(false);
    } else setPhoneFormated(true);
  };
  const passwordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };
  const passwordIsTouched = () => {
    setPasswordTouched(true);
  };
  const forgotButtonClickedHandler = () => {
    setVisibleForgotPage(true);
  };
  //#endregion

  const submitHandler = (evt) => {
    evt.preventDefault();
    setClicked(true);
    if (phone.length > 0 && phone.length == 11 && password.length > 0) {
      http.post({
        url: postLogin,
        payload: {
          email: phone,
          password: password,
        },
        before: () => {},
        successed: (res) => {
          setResponseMessage(res);

          if (!res.result) {
            setIsValid(true);

          } else {
            setCookie("auth", res, {
              maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
            });
            setCookie("supplier", res.user.supplier_id?.id, {
              maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
            });
            dispatch({ type: "USER_LOGIN", payload: res });

            const arrOfCarts = [];
            let cartItems = JSON.parse(localStorage.getItem('CARTV1WHOLESALE25'));
            if(cartItems && cartItems.Items.length>0){
              cartItems.Items.forEach((element) => {
                arrOfCarts.push({
                  id: element.type != "product" ? "" : element.id,
                  bar_code: element.type != "product" ? "" : element.barcode,
                  user_id: res.user.id,
                  quantity: element.quantity,
                  product_referral_code: "",
                  type: element.type,
                  promotion_code:
                      element.promotion_code == 0 ? "" : element.promotion_code,
                  instruction: "",
                  deal_offer: element.offer || "",
                  deal_offer_amount: element.offer_amount || "",
                });
              })
              http.post({
                url: addCartMultiple,
                payload:   arrOfCarts,
                before: () => {},
                successed: () => {
                  // nextPaymentPageHandler();
                  // dispatch({ type: "ACTIVE_PAYMENT_STATE", payload: true });

                },
                failed: () => {},
              });
            }

            dispatch({type:"CLEAR_CART_ITEMS"})


          }
          if (store?.isJoinMemberShip) {
            router.push({ pathname: "/membership/purchase" });
          } else if (store?.isRegisterMemberShip) {
            router.push({ pathname: "/membership/register" });
          } else if (store?.isRenewMemberShip) {
            router.push({ pathname: "/membership/renew" });
          } else {
            router.back();
          }

          // router.push("/");
        },
        failed: () => {
          setIsValid(true);
        },
      });
    }
  };

  //validation effect
  useEffect(() => {
    if (clicked) {
      if (
        (phone.length == 0 && phoneTouched) ||
        (phone.length == 0 && !phoneTouched)
      ) {
        setPhoneIsValid(true);
      } else setPhoneIsValid(false);
      if (
        (password.length == 0 && passwordTouched) ||
        (password.length == 0 && !passwordTouched)
      ) {
        setPasswordIsValid(true);
      } else setPasswordIsValid(false);
    }
  }, [clicked, phoneTouched, phone.length, passwordTouched, password.length]);

  return (
    <div
      class="tab-pane fade show active"
      id="login-tab-pane"
      role="tabpanel"
      aria-labelledby="login-tab"
      tabindex="0"
    >
      <form action="">
        <div class="form-group">
          <label for="" class="form-label">
            Phone Number <sup class="text-danger">*</sup>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Please enter your phone no."
            value={phone}
            onChange={phoneChangeHandler}
            onBlur={phoneIsTouched}
          />
          {/* validation handle  */}
          {phoneIsValid && <div className='text-danger'>{emptyPhoneMsg}</div>}
          {phone.length == 0 && phoneTouched && !phoneIsValid && (
            <div className='text-danger'>{emptyPhoneMsg}</div>
          )}
          {phone.length > 0 && phoneTouched && phoneFormated && (
            <div className='text-danger'>{phoneInvalidMsg}</div>
          )}
        </div>
        <div class="form-group">
          <label for="" class="form-label">
            password <sup class="text-danger">*</sup>
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Please enter your password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordIsTouched}
          />
          {/* validation handle  */}
          {passwordIsValid && <div className='text-danger'>{emptyPasswordMsg}</div>}
          {password.length == 0 && passwordTouched && !passwordIsValid && (
            <div className='text-danger'>{emptyPasswordMsg}</div>
          )}
        </div>
        <div class="form-group" onClick={forgotButtonClickedHandler}>
          Forgot Password
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            remember me
          </label>
        </div>
        <button class="btn user-login-btn" onClick={submitHandler}>
          sign in
        </button>
      </form>
      {/* validation handle  */}
      {isValid && <div className='text-danger'>{responseMessage.message}</div>}
    </div>
  );
};

export default LoginModal;
