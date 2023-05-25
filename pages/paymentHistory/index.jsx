import Axios from "axios";
import React from "react";
import { paymentHis } from "../../components/lib/endpoints";
import CommonHeader from "../../components/Profile/CommonHeader";
import PaymentHistory from "../../components/Profile/PaymentHistory";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Custom404 from "../404";

const index = ({ paymentHistory, getError }) => {
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={PaymentHistory}
        HeaderTemplate={CommonHeader}
        text={"Payment"}
        data={paymentHistory.data}
      />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let paymentHistory,
    getError = false;

  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    const responsePaymentHis = await Axios.get(baseUrl + "/" + paymentHis, {
      headers: {
        Authorization: "Bearer " + authData.access_token,
      },
    }).then(({ data }) => {
      paymentHistory = data;
    });
  } catch (error) {
    console.log("error");
    paymentHistory = null;
    getError = true;
  }
  return {
    props: { paymentHistory, getError }, // will be passed to the page component as props
  };
}
