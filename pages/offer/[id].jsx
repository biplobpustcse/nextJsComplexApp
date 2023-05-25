import Axios from "axios";
import React, {useEffect} from "react";
import { useState } from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import {
  collectionProduct,
  getHomeSliders,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";
import ShopHomeSlider from "../../components/ShopExtraProductComponent/ShopHomeSlider";
import ShopProductShorting from "../../components/ShopExtraProductComponent/ShopProductShorting";
import ShopProductView from "../../components/ShopExtraProductComponent/ShopProductView";
import { baseUrl } from "../../services/httpService";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const OfferSProduct = (props) => {
  const [gridViewWise, setGridViewWsie] = useState(5);

  const breadCumbData = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: props.celecbrationProduct?.offer_data?.name,
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
      <>
        <ShopHomeSlider
          data={props.bazarlistSliderData?.shop_page_slider_images}
        />
        <ShopProductShorting
          breadCumbData={breadCumbData}
          configuration={configuration}
          setGridViewWsie={setGridViewWsie}
        />
        {props.celecbrationProduct.result != undefined && (
          <ShopProductView
            gridViewWise={gridViewWise}
            data={props.celecbrationProduct.result.data}
          />
        )}
        {props.celecbrationProduct.result == undefined && (
          <ShopProductView gridViewWise={gridViewWise} data={[]} />
        )}

        <SecondFooter />
        <SslFooter2 />
        <QuickView />
      </>
    </>
  );
};

export default OfferSProduct;
export async function getServerSideProps({ req, re, query }) {
  let celecbrationProduct,
    bazarlistSliderData,
    getError = false;

  let endpoints = [
    baseUrl + "/" + getHomeSliders,
    baseUrl + "/" + collectionProduct + query.id,
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(({ data: sliders }, { data: bazarProData }) => {
        bazarlistSliderData = sliders;
        celecbrationProduct = bazarProData;
      })
    );
  } catch (error) {
    getError = true;
    bazarlistSliderData = null;
    celecbrationProduct = null;
  }
  return {
    props: { bazarlistSliderData, celecbrationProduct, getError }, // will be passed to the page component as props
  };
}
