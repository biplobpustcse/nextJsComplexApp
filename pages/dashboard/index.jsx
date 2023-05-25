import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import Dashboard from "../../components/Profile/Dashboard";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import { baseUrl } from "../../services/httpService";
import {
  getSavedAdrs,
  paymentHis,
  purchaseHis,
} from "../../components/lib/endpoints";
import Custom404 from "../404";

const index = ({
  getSavedAddress,
  purchaseData,
  getError,
  unpaidOrder,
  totalOrder,
}) => {
  if (getError) {
    return <Custom404 />;
  }
  console.log("purchaseData", purchaseData);
  console.log("unpaidOrder", unpaidOrder);
  const data = [getSavedAddress, purchaseData.data, unpaidOrder, totalOrder];
  return (
    <>
      <ProfileLayout
        Template={Dashboard}
        HeaderTemplate={CommonHeader}
        text={"Dashboard"}
        data={data}
      />
    </>
  );
};

export default index;
export async function getServerSideProps({ req, res }) {
  let getSavedAddress,
    purchaseData,
    getError = false;
  let endpoints = [baseUrl + "/" + getSavedAdrs, baseUrl + "/" + paymentHis];
  let unpaidOrder,
    totalOrder = 0;
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
      Axios.spread(({ data: SavedAddress }, { data: purchaseHistory }) => {
        console.log(purchaseHistory);
        getSavedAddress = SavedAddress;
        purchaseData = purchaseHistory;
        unpaidOrder = purchaseHistory?.unpaidOrder;
        totalOrder = purchaseHistory?.totalOrder;
        console.log("unpaidOrder", purchaseHistory?.meta);
      })
    );
  } catch (error) {
    console.log("error");
    getSavedAddress = null;
    purchaseData = null;
    getError = true;
    unpaidOrder = 0;
    totalOrder = 0;
  }
  return {
    props: { getSavedAddress, purchaseData, getError, unpaidOrder, totalOrder }, // will be passed to the page component as props
  };
}
