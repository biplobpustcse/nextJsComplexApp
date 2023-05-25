import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import {
  emptyPasswordMsg,
  passWordNotMatched,
  resendOtpSuccessfully,
  verficationCodeMsg,
} from "../../utils/dictionaries";
import { passwordReset, postLogin, resendPassword } from "../lib/endpoints";
import { setCookie } from "cookies-next";

const ResendPasswordModal = () => {
  const store = useSelector((state) => state.authReducerContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  //verifyCode validation state
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyCodeTouched, setVerifyCodeTouched] = useState(false);
  const [verifyCodeIsValid, setVerifyCodeIsValid] = useState(false);
  //password validation state
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  //confirmPassword state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmIsValid, setConfirmIsValid] = useState(false);

  //#region  handler
  const verifyCodeChangeHandler = ({ target }) => {
    setVerifyCode(target.value);
  };
  const verifyCodeIsTouched = () => {
    setVerifyCodeTouched(true);
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
  //#endregion ahndler
  // password reset request
  const passwordResendHandler = () => {
    setVerifyCodeIsValid(false);
    setVerifyCodeTouched(false);
    setPasswordIsValid(false);
    setPasswordTouched(false);
    http.post({
      url: resendPassword,
      payload: {
        user_id: store.otpUserId,
        register_by: "",
      },
      before: () => {},
      successed: (res) => {
        setResendOtp(true);
        console.log(res);
      },
      failed: () => {},
    });
  };
  // verify submit handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setClicked(true);
    if (verifyCode.length > 0 && password.length > 0 && !confirmIsValid) {
      http.post({
        url: passwordReset,
        payload: {
          verification_code: verifyCode,
          user_id: store.otpUserId,
          password: password,
        },
        before: () => {},
        successed: (res) => {
          http.post({
            url: postLogin,
            payload: {
              email: store.registration.phone,
              password: password,
            },
            before: () => {},
            successed: (res) => {
              console.log(res)
              dispatch({ type: "USER_LOGIN", payload: res });
              setCookie("auth", res, {
                maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
              });
              setCookie("supplier", res.user.supplier_id?.id, {
                maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
              });
              dispatch({ type: "USER_LOGIN", payload: res });
              router.push("/");
            },
            failed: () => {},
          });
        },
        failed: () => {},
      });
    }
  };

  //validation effect
  useEffect(() => {
    if (clicked) {
      if (
        (verifyCode.length == 0 && verifyCodeTouched) ||
        (verifyCode.length == 0 && !verifyCodeTouched)
      ) {
        setVerifyCodeIsValid(true);
      } else setVerifyCodeIsValid(false);
      if (
        (password.length == 0 && passwordTouched) ||
        (password.length == 0 && !passwordTouched)
      ) {
        setPasswordIsValid(true);
      } else setPasswordIsValid(false);
    }
  }, [
    clicked,
    verifyCodeTouched,
    verifyCode.length,
    passwordTouched,
    password.length,
  ]);
  //resend otp Msg timeout effect
  useEffect(() => {
    setTimeout(() => {
      setResendOtp(false);
    }, [3000]);
  }, [resendOtp]);

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
            Password Reset
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
              Verification Code <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your phone no."
              value={verifyCode}
              onChange={verifyCodeChangeHandler}
              onBlur={verifyCodeIsTouched}
            />
            {verifyCodeIsValid && <div>{verficationCodeMsg}</div>}
            {verifyCode.length == 0 &&
              verifyCodeTouched &&
              !verifyCodeIsValid && <div>{verficationCodeMsg}</div>}
          </div>
          <div class="form-group">
            <label for="" class="form-label">
              New password <sup class="text-danger">*</sup>
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Please enter your password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordIsTouched}
            />
            {resendOtp && <div>{resendOtpSuccessfully}</div>}
            {passwordIsValid && <div>{emptyPasswordMsg}</div>}
            {password.length == 0 && passwordTouched && !passwordIsValid && (
              <div>{emptyPasswordMsg}</div>
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
          <button class="btn user-login-btn" onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
      <div onClick={passwordResendHandler}>Resend Verify Code Again</div>
    </div>
  );
};

export default ResendPasswordModal;
