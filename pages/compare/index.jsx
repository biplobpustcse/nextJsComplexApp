import React, { useState } from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import BrandShopTemplate from "../../components/Home/BrandShop/BrandShopTemplate";
import { getCompareList, getSavedAdrs } from "../../components/lib/endpoints";
import Product from "../../components/Product/Product";
import ShopHomeSlider from "../../components/ShopExtraProductComponent/ShopHomeSlider";
import ShopProductShorting from "../../components/ShopExtraProductComponent/ShopProductShorting";
import ShopProductView from "../../components/ShopExtraProductComponent/ShopProductView";
import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import QuickView from "../../components/Product/QuickView";
import router from "next/router";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const index = ({ compareItems }) => {
  console.log({ compareItems });
  const [gridViewWise, setGridViewWsie] = useState(5);
  const breadCumbData = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "Compare",
    },
  ];
  const configuration = {
    priceRangeVisible: false,
    shopByBrandVisible: false,
    shopByRelevance: false,
  };
  if (compareItems == null) {
    return <Custom404 />;
  }
  return (
    <>
      <ShopHomeSlider data={[]} />
      <ShopProductShorting
        breadCumbData={breadCumbData}
        configuration={configuration}
        setGridViewWsie={setGridViewWsie}
      />
      <ShopProductView
        gridViewWise={gridViewWise}
        data={compareItems.result.data}
      />
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
};

export default index;
export async function getServerSideProps({ req, res }) {
  let compareItems;
  let endpoints = [baseUrl + "/" + getCompareList];

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
      Axios.spread(({ data: compareItemList }) => {
        compareItems = compareItemList;
      })
    );
  } catch (error) {
    compareItems = null;
  }
  return {
    props: { compareItems }, // will be passed to the page component as props
  };
}
