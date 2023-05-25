import React from "react";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const AuthenticationTemplate = ({
  Template,
  setVisibleOtpPage,
  setVisibleForgotPage,
}) => {
  //main template of Authentication
  return (
    <section class="login-layout">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="login-main-bg">
              <div class="login-container">
                <Template
                  setVisibleOtpPage={setVisibleOtpPage}
                  setVisibleForgotPage={setVisibleForgotPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationTemplate;
