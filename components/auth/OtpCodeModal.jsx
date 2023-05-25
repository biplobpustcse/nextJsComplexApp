import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import { verficationCodeMsg } from "../../utils/dictionaries";
import { postLogin, resendPassword, verifyOtp } from "../lib/endpoints";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const OtpCodeModal = () => {
  const store = useSelector((state) => state.authReducerContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  // otp validation state
  const [otpCode, setOtpCode] = useState("");
  const [otpTouched, setOtpTouched] = useState(false);
  const [otpIsValid, setOtpIsValid] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);

  //#region  handler
  const otpChangeHandler = ({ target }) => {
    console.log(target.value);
    setOtpCode(target.value);
  };
  const otpTouchedHandler = () => {
    setOtpTouched(true);
  };
  //#endregion

  const verifySubmitHandler = (evt) => {
    evt.preventDefault();
    setClicked(true);
    if (otpCode.length > 0) {
      http.post({
        url: verifyOtp,
        payload: {
          user_id: store.otpUserId,
          verification_code: otpCode,
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            http.post({
              url: postLogin,
              payload: {
                email: store.registration.phone,
                password: store.registration.password,
              },
              before: () => {},
              successed: (res) => {
                debugger;
                const authData = getCookie("auth");
                http.post({
                  url: postLogin,
                  payload: {
                    email: store.registration.phone,
                    password: store.registration.password,
                  },
                  before: () => {},
                  successed: () => {
                    if (authData) {
                      deleteCookie("auth");
                    } else {
                      setCookie("auth", res, {
                        maxAge: new Date().setFullYear(
                          new Date().getFullYear() + 1
                        ),
                      });
                    }
                    dispatch({ type: "USER_LOGIN", payload: res });
                    router.push("/");
                  },
                  failed: () => {},
                });
              },
              failed: () => {},
            });
          }
        },
        failed: () => {},
      });
    }
  };

  const resendOtpHandler = () => {
    setOtpIsValid(false);
    setOtpTouched(false);
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

  //validation effect
  useEffect(() => {
    if (clicked) {
      if (
        (otpCode.length == 0 && otpTouched) ||
        (otpCode.length == 0 && !otpTouched)
      ) {
        setOtpIsValid(true);
      } else setOtpIsValid(false);
    }
  }, [clicked, otpCode.length, otpTouched]);

  //timeout for Resend OTP Status
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
            Verify OTP
          </button>
        </li>
      </ul>
      <div class="tab-content" id="">
        <div
          class="tab-pane fade show active"
          id="login-tab-pane"
          role="tabpanel"
          aria-labelledby="login-tab"
          tabindex="0"
        >
          <form action="">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Please enter your Verify No"
                value={otpCode}
                onChange={otpChangeHandler}
                onBlur={otpTouchedHandler}
              />
              {otpIsValid && <div>{verficationCodeMsg}</div>}
              {otpCode.length == 0 && otpTouched && !otpIsValid && (
                <div>{verficationCodeMsg}</div>
              )}
            </div>
            {resendOtp && <div>Resend Otp Successfully.</div>}
            <button class="btn user-login-btn" onClick={verifySubmitHandler}>
              Verify Otp
            </button>
          </form>
        </div>
      </div>
      <div onClick={resendOtpHandler}>Resend OTP Code</div>
    </div>
  );
};

export default OtpCodeModal;
