import Axios from "axios";
import React from "react";
import { getCountryList, getCouponList } from "../../components/lib/endpoints";
import CommonHeader from "../../components/Profile/CommonHeader";
import CouponList from "../../components/Profile/CouponList";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Custom404 from "../404";

const index = ({ coupons, getError }) => {
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={CouponList}
        HeaderTemplate={CommonHeader}
        text={"Coupons"}
        data={coupons.coupon_list}
      />
    </>
  );
};

export default index;
export async function getServerSideProps({ req, res }) {
  let coupons,
    getError = false;
  let endpoints = [baseUrl + "/" + getCouponList];

  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    await Axios.all(
      endpoints.map((endpoint) =>
        Axios.get(endpoint, {
          headers: {
            Authorization: "Bearer " + authData.access_token,
          },
        })
      )
    ).then(
      Axios.spread(({ data: couponList }) => {
        coupons = couponList;
      })
    );
  } catch (error) {
    coupons = null;
    getError = true;
  }
  return {
    props: { coupons, getError }, // will be passed to the page component as props
  };
}
