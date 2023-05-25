import React from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import {
  getCart,
  getCouponList,
  getHomeSliders,
  getPaymentTypes,
  getSavedAdrs,
  getStorelist,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";

import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import ViewCart from "../../components/cart/ViewCart";
import router from "next/router";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";
const index = ({
  getSavedAddress,
  storeList,
  typeOfPayments,
  coupons,
  cartItems,
  getError,
}) => {
  console.log({ getSavedAddress });
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ViewCart
        getSavedAddress={getSavedAddress}
        storeList={storeList}
        typeOfPayments={typeOfPayments}
        coupons={coupons}
        cartItems={cartItems}
      />
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let bazarlistSliderData,
    getSavedAddress,
    storeList,
    typeOfPayments,
    coupons,
    cartItems,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getSavedAdrs,
    baseUrl + "/" + getStorelist,
    baseUrl + "/" + getPaymentTypes,
    baseUrl + "/" + getCouponList,
    baseUrl + "/" + getCart,
  ];

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
      Axios.spread(
        (
          { data: SavedAddress },
          { data: storeListItems },
          { data: typesPayment },
          { data: couponList },
          { data: cartItemsList }
        ) => {
          getSavedAddress = SavedAddress;
          storeList = storeListItems;
          typeOfPayments = typesPayment;
          coupons = couponList;
          cartItems = cartItemsList;
        }
      )
    );
  } catch (error) {
    console.log(error);
    getSavedAddress = null;
    storeList = null;
  typeOfPayments = null;
    coupons = null;
    cartItems = null;
    getError = true;
  }
  return {
    props: {
      getSavedAddress,
      storeList,
      typeOfPayments,
      coupons,
      cartItems,
      getError,
    }, // will be passed to the page component as props
  };
}
