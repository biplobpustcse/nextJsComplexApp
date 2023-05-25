import React from "react";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const AuthSignUp = ({ setVisibleOtpPage, setVisibleForgotPage }) => {
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
            sign in
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link "
            id="registration-tab"
            data-bs-toggle="tab"
            data-bs-target="#registration-tab-pane"
            type="button"
            role="tab"
            aria-controls="registration-tab-pane"
            aria-selected="false"
          >
            signup
          </button>
        </li>
      </ul>
      <div class="tab-content" id="">
        <LoginModal setVisibleForgotPage={setVisibleForgotPage} />
        <RegistrationModal setVisibleOtpPage={setVisibleOtpPage} />
      </div>
    </div>
  );
};

export default AuthSignUp;
