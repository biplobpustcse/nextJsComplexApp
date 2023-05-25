import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import PurchaseHistory from "../../components/Profile/PurchaseHistory";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import Axios from "axios";
import { baseUrl } from "../../services/httpService";
import { purchaseHis } from "../../components/lib/endpoints";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Custom404 from "../404";

const index = ({ purchaseHistory, getError }) => {
  console.log({ purchaseHistory });
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={PurchaseHistory}
        HeaderTemplate={CommonHeader}
        text={"Purchase"}
        data={purchaseHistory.data}
      />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let purchaseHistory,
    getError = false;

  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    await Axios.get(baseUrl + "/" + purchaseHis + `?page=1`, {
      headers: {
        Authorization: "Bearer " + authData.access_token,
      },
    }).then(({ data }) => {
      purchaseHistory = data;
    });
  } catch (error) {
    purchaseHistory = null;
    getError = true;
    console.log("error");
  }
  return {
    props: { purchaseHistory, getError }, // will be passed to the page component as props
  };
}
