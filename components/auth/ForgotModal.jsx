import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { http } from "../../services/httpService";
import {
  emptyPhoneMsg,
  failedForgotPageMsg,
  phoneInvalidMsg,
} from "../../utils/dictionaries";
import { forgotPassword } from "../lib/endpoints";

const ForgotModal = ({ setVisibleForgotPage }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  // phone state validation
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneFormated, setPhoneFormated] = useState(false);
  const [isValid, setIsValid] = useState(false);
  var phonenoValidation = /^\d{11}$/;
  //#region handler
  const phoneChangeHandler = ({ target }) => {
    setPhone(target.value);
  };
  const phoneIsTouched = () => {
    setPhoneTouched(true);
    if (phone.match(phonenoValidation)) {
      setPhoneFormated(false);
    } else setPhoneFormated(true);
  };
  //#endregion
  const submitButtonHandler = (evt) => {
    evt.preventDefault();
    setClicked(true);
    if (phone.length == 11) {
      http.post({
        url: forgotPassword,
        payload: {
          email_or_phone: phone,
          send_code_by: "phone",
        },
        before: () => {},
        successed: (res) => {
          dispatch({ type: "USER_OTP", payload: res });
          dispatch({
            type: "USER_REGISTRATION",
            payload: { phone: phone, password: "" },
          });
          setVisibleForgotPage(true);
        },
        failed: () => {
          setIsValid(true);
        },
      });
    }
  };
  useEffect(() => {
    if (clicked) {
      if (
        (phone.length == 0 && phoneTouched) ||
        (phone.length == 0 && !phoneTouched)
      ) {
        setPhoneIsValid(true);
      } else setPhoneIsValid(false);
    }
  }, [clicked, phoneTouched, phone.length]);

  return (
    <div class="site-login-overflow">
      <ul class="nav nav-tabs login-page-tab" id="login-reg-Tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="login-tab"
            data-bs-toggle="tab"
            data-bs-target="#login-tab-pane"
            type="button"
            role="tab"
            aria-controls="login-tab-pane"
            aria-selected="true"
          >
            Forgot Password
          </button>
        </li>
      </ul>
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
            {phoneIsValid && <div>{emptyPhoneMsg}</div>}
            {phone.length == 0 && phoneTouched && !phoneIsValid && (
              <div>{emptyPhoneMsg}</div>
            )}
            {phone.length > 0 && phoneTouched && phoneFormated && (
              <div>{phoneInvalidMsg}</div>
            )}
          </div>
          <button class="btn user-login-btn" onClick={submitButtonHandler}>
            submit
          </button>
        </form>
      </div>
      {isValid && <div>{failedForgotPageMsg}</div>}
    </div>
  );
};

export default ForgotModal;
