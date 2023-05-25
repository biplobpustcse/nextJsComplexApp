import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import OrderDetails from "../../components/Profile/OrderDetails";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import { baseUrl } from "../../services/httpService";
import { orderDetails } from "../../components/lib/endpoints";
import Custom404 from "../404";

const index = ({ orderDetailsData, purchaseHistoryItems, getError }) => {


  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={OrderDetails}
        HeaderTemplate={CommonHeader}
        text={"Order Details"}
        data={orderDetailsData.data[0]}
        purchaseHistoryItems={purchaseHistoryItems}
      />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res, query }) {
  let orderDetailsData,
    purchaseHistoryItems,
    getError = false;
  const routerParams = query.id;

  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    const responseOrderDetail = await Axios.get(
      baseUrl + "/" + orderDetails + routerParams,
      {
        headers: {
          Authorization: "Bearer " + authData.access_token,
        },
      }
    ).then(({ data }) => {
      orderDetailsData = data;
    });
    const purchaseHistoryItemsResult = await Axios.get(
      baseUrl + "/" + "purchase-history-items/" + routerParams,
      {
        headers: {
          Authorization: "Bearer " + authData.access_token,
        },
      }
    ).then(({ data }) => {
      purchaseHistoryItems = data?.data;
    });
  } catch (error) {
    (orderDetailsData = null), (purchaseHistoryItems = null),
        (getError = true);
    console.log("error");
  }
  return {
    props: { orderDetailsData, purchaseHistoryItems, getError }, // will be passed to the page component as props
  };
}
