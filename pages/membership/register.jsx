import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import RegisterMembership from "../../components/Membership/Register/RegisterMembership";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function register() {
  return (
    <>
      <RegisterMembership />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default register;
