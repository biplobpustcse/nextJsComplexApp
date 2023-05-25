import React from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { getBazarlist, getHomeSliders } from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";
import ShopHomeSlider from "../../components/ShopExtraProductComponent/ShopHomeSlider";
import ShopProductShorting from "../../components/ShopExtraProductComponent/ShopProductShorting";
import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import { useState } from "react";
import ShopProductView from "../../components/ShopExtraProductComponent/ShopProductView";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const index = (props) => {
  const [gridViewWise, setGridViewWsie] = useState(5);

  const breadCumbData = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "Quotelist",
    },
  ];
  const configuration = {
    priceRangeVisible: false,
    shopByBrandVisible: false,
    shopByRelevance: false,
  };
  if (props.getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ShopHomeSlider
        data={props.bazarlistSliderData?.shop_page_slider_images}
      />
      <ShopProductShorting
        breadCumbData={breadCumbData}
        configuration={configuration}
        setGridViewWsie={setGridViewWsie}
      />
      <ShopProductView
        gridViewWise={gridViewWise}
        data={props.bazarProductData.result.data}
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
    bazarProductData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getHomeSliders,
    baseUrl + "/" + getBazarlist,
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
      Axios.spread(({ data: sliders }, { data: bazarProData }) => {
        bazarlistSliderData = sliders;
        bazarProductData = bazarProData;
      })
    );
  } catch (error) {
    bazarlistSliderData = null;
    bazarProductData = null;
    getError = true;
  }
  return {
    props: { bazarlistSliderData, bazarProductData, getError }, // will be passed to the page component as props
  };
}
