import Axios from "axios";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { discountPartnerList } from "../../components/lib/endpoints";
import CardDiscountPartner from "../../components/Membership/CardDiscountPartner";
import JoinMembershipTemplate from "../../components/Membership/JoinMembershipTemplate";
import PurchaseMembership from "../../components/Membership/Purchase/PurchaseMembership";
import RegisterMembershipTemplate from "../../components/Membership/RegisterMembershipTemplate";
import RenewMembershipTemplate from "../../components/Membership/RenewMembershipTemplate";
import { baseUrl } from "../../services/httpService";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function purchase({ discountPartnerData, getError }) {
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <JoinMembershipTemplate />
      <CardDiscountPartner discountPartnerData={discountPartnerData.result} />
      <RegisterMembershipTemplate />
      <RenewMembershipTemplate />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default purchase;

export async function getServerSideProps(context) {
  const router = context.params?.id;
  let discountPartnerData,
    getError = false;
  let endpoints = [baseUrl + "/" + discountPartnerList];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(({ data: discountData }) => {
        discountPartnerData = discountData;
      })
    );
  } catch (error) {
    getError = true;
    discountPartnerData = null;
  }

  return {
    props: { discountPartnerData, getError }, // will be passed to the page component as props
  };
}
