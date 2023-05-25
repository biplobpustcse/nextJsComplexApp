import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import {
  emptyEmailMsg,
  emptyNameMsg,
  emptyPasswordMsg,
  emptyPhoneMsg,
  invalidEmailMsg,
  passwordLengthValidMsg,
  passWordNotMatched,
  phoneInvalidMsg,
} from "../../utils/dictionaries";
import { postSignUp } from "../lib/endpoints";
import AuthenticationTemplate from "./AuthenticationTemplate";
import OtpCodeModal from "./OtpCodeModal";

const RegistrationModal = ({ setVisibleOtpPage }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [failed, setFailed] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: "Validation Failed",
  });
  //name state
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  //email state
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailFormated, setEmailFormated] = useState(false);
  //phone state
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneFormated, setPhoneFormated] = useState(false);
  //password state
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  //confirmPassword state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmIsValid, setConfirmIsValid] = useState(false);
  //subScribe state
  const [subscribe, setSubscribe] = useState(false);
  //formation for email & phone
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var phonenoFormat = /^\d{11}$/;
  //submitHandler for Registration
  const submitHandler = (evt) => {
    evt.preventDefault();

    if (failed) {
      setFailed(false);
    }
    setClicked(true);
    if (
      firstName.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      password.length >= 6 &&
      password == confirmPassword &&
      !emailFormated &&
      !phoneFormated
    ) {
      http.post({
        url: postSignUp,
        payload: {
          name: firstName,
          email: email,
          phone: phone,
          password: password,
          password_confirmation: confirmPassword,
          register_by: "",
          subscribe: subscribe,
        },
        before: () => {
          dispatch({
            type: "USER_REGISTRATION",
            payload: { phone: phone, password: password },
          });
        },
        successed: (res) => {
          setResponseMessage(res);
          dispatch({ type: "USER_OTP", payload: res });
          if (res.result) {
            setVisibleOtpPage(true);
          } else setFailed(true);
        },
        failed: () => {
          setFailed(true);
        },
      });
    }
  };

  //all events handler
  //#region
  const firstNameChangeHandler = ({ target }) => {
    setFirstName(target.value);
  };
  const firstNameIsTouched = () => {
    setFirstNameTouched(true);
  };
  const emailChangeHandler = ({ target }) => {
    setEmail(target.value);
    if (target.value.match(mailformat)) {
      setEmailFormated(false);
    } else setEmailFormated(true);
  };
  const emailIsTouched = () => {
    setEmailTouched(true);
  };
  const phoneChangeHandler = ({ target }) => {
    setPhone(target.value);
    if (target.value.match(phonenoFormat)) {
      setPhoneFormated(false);
    } else setPhoneFormated(true);
  };
  const phoneIsTouched = () => {
    setPhoneTouched(true);
  };
  const passwordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };
  const passwordIsTouched = () => {
    setPasswordTouched(true);
  };
  const cpasswordChangeHandler = ({ target }) => {
    setConfirmPassword(target.value);
    if (password == target.value) {
      setConfirmIsValid(false);
    } else setConfirmIsValid(true);
  };

  const subScribeClickedHandler = () => {
    setSubscribe(true);
  };
  //#endregion
  //validation effectRules
  useEffect(() => {
    if (clicked) {
      if (
        (firstName.length == 0 && firstNameTouched) ||
        (firstName.length == 0 && !firstNameTouched)
      ) {
        setFirstNameIsValid(true);
      } else setFirstNameIsValid(false);
      if (
        (email.length == 0 && emailTouched) ||
        (email.length == 0 && !emailTouched)
      ) {
        setEmailIsValid(true);
      } else setEmailIsValid(false);
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
  }, [
    clicked,
    firstName.length,
    firstNameTouched,
    email.length,
    emailTouched,
    phoneTouched,
    phone.length,
    passwordTouched,
    password.length,
  ]);

  return (
    <>
      <div
        class="tab-pane fade "
        id="registration-tab-pane"
        role="tabpanel"
        aria-labelledby="registration-tab"
        tabindex="0"
      >
        <form action="">
          <div class="form-group">
            <label for="" class="form-label">
              Name <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your First name"
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameIsTouched}
            />
            {/* validation check  */}
            {firstNameIsValid && <div>{emptyNameMsg}</div>}
            {firstName.length == 0 && firstNameTouched && !firstNameIsValid && (
              <div>{emptyNameMsg}</div>
            )}
          </div>
          <div class="form-group">
            <label for="" class="form-label">
              phone number <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your phone number"
              value={phone}
              onChange={phoneChangeHandler}
              onBlur={phoneIsTouched}
            />
            {/* validation check  */}
            {phoneIsValid && <div>{emptyPhoneMsg}</div>}
            {phone.length == 0 && phoneTouched && !phoneIsValid && (
              <div>{emptyPhoneMsg}</div>
            )}
            {phone.length > 0 && phoneTouched && phoneFormated && (
              <div>{phoneInvalidMsg}</div>
            )}
          </div>
          <div class="form-group">
            <label for="" class="form-label">
              email address <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your email address"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailIsTouched}
            />
            {/* validation check  */}
            {emailIsValid && <div>{emptyEmailMsg}</div>}
            {email.length == 0 && emailTouched && !emailIsValid && (
              <div>{emptyEmailMsg}</div>
            )}
            {email.length > 0 && emailTouched && emailFormated && (
              <div>{invalidEmailMsg}</div>
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
            {/* validation check  */}
            {passwordIsValid && <div>{emptyPasswordMsg}</div>}
            {password.length == 0 && passwordTouched && !passwordIsValid && (
              <div>{emptyPasswordMsg}</div>
            )}
            {passwordTouched && password.length < 6 && password.length > 0 && (
              <div>{passwordLengthValidMsg}</div>
            )}
          </div>
          <div class="form-group">
            <label for="" class="form-label">
              confirm password <sup class="text-danger">*</sup>
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Please enter your confirm password"
              value={confirmPassword}
              onChange={cpasswordChangeHandler}
            />
            {confirmIsValid && <div>{passWordNotMatched}</div>}
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value={subscribe}
              onClick={subScribeClickedHandler}
            />
            <label class="form-check-label" for="flexCheckDefault">
              subscribe to our newsletter
            </label>
          </div>
          <button class="btn user-login-btn" onClick={submitHandler}>
            signup
          </button>
        </form>
        {failed && <div>{responseMessage.message}</div>}
        <div></div>
      </div>
    </>
  );
};

export default RegistrationModal;
