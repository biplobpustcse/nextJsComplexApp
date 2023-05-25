import React, { useState } from "react";
import AuthenticationTemplate from "../../components/auth/AuthenticationTemplate";
import AuthSignUp from "../../components/auth/AuthSignUp";
import ForgotModal from "../../components/auth/ForgotModal";
import OtpCodeModal from "../../components/auth/OtpCodeModal";
import ResendPasswordModal from "../../components/auth/ResendPasswordModal";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import { SslFooter } from "../../components/Footer/SslFooter";
import SslFooter2 from "../../components/Footer/SslFooter2";

const index = () => {
  const [visibleLoginPage, setVisibleLoginPage] = useState(true);
  const [visibelOtpPage, setVisibleOtpPage] = useState(false);
  const [visibleForgotPage, setVisibleForgotPage] = useState(false);
  const [visibleResetPassword, setVisibleResetPassword] = useState(false);
  return (
    <>
      {/* visible signin & signup Page */}
      {visibleLoginPage && !visibelOtpPage && !visibleForgotPage && (
        <AuthenticationTemplate
          Template={AuthSignUp}
          setVisibleOtpPage={setVisibleOtpPage}
          setVisibleForgotPage={setVisibleForgotPage}
        />
      )}
      {/* visible Otp Page */}
      {visibelOtpPage && <AuthenticationTemplate Template={OtpCodeModal} />}
      {/* visible forgot page */}
      {visibleForgotPage && !visibelOtpPage && !visibleResetPassword && (
        <AuthenticationTemplate
          Template={ForgotModal}
          setVisibleForgotPage={setVisibleResetPassword}
        />
      )}
      {/* visible resend password page  */}
      {visibleResetPassword && (
        <AuthenticationTemplate Template={ResendPasswordModal} />
      )}
      <SecondFooter />
      <SslFooter2 />
    </>
  );
};

export default index;
