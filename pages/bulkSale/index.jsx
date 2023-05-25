import React, { useState } from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import ShopHomeSlider from "../../components/ShopExtraProductComponent/ShopHomeSlider";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Axios from "axios";
import {
  bulkProducts,
  getMoreItems,
  partyCategory,
  partyList,
} from "../../components/lib/endpoints";
import { baseUrl } from "../../services/httpService";
import BulkCategory from "../../components/BulkSale/BulkCategory";
import ShopProductShorting from "../../components/ShopExtraProductComponent/ShopProductShorting";
import BulkSaleProductView from "../../components/BulkSale/BulkSaleProductView";
import MoreItemsToConsider from "../../components/Shop/MoreItemsToConsider";
import RecentlyViewItem from "../../components/Shop/RecentlyViewItem";
import QuickView from "../../components/Product/QuickView";
import { productDataConverter } from "../../services/dataService";
import { useEffect } from "react";
import { Router } from "next/router";
import { InfinitySpin } from "react-loader-spinner";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const index = ({
  bulkCategory,
  partyListInfo,
  getBulkProducts,
  moreItems,
  getError,
}) => {
  console.log({ partyListInfo });
  const [gridViewWise, setGridViewWsie] = useState(5);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getElement = document.getElementById("logoClick");

    document.body.addEventListener("click", () => {
      Router.events.on("routeChangeStart", (url) => {
        //this.setState({ isLoading: true });
        setLoader(true);
        console.log("router change");
      });
      Router.events.on("routeChangeComplete", (url) => {
        //this.setState({ isLoading: false });
        // setTimeout(() => {
        //   setLoader(false);
        // }, [1000]);
        setLoader(false);
        console.log("router change complete");
      });
    });
  }, [Router]);
  const breadCumbData = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "Bulk Sale",
    },
  ];
  const configuration = {
    priceRangeVisible: false,
    shopByBrandVisible: false,
    shopByRelevance: false,
  };
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      {loader && (
        <div className="loader-testing">
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}
      {/* <ShopHomeSlider data={[]} /> */}
      <BulkCategory data={bulkCategory.result} />
      <ShopProductShorting
        breadCumbData={breadCumbData}
        configuration={configuration}
        setGridViewWsie={setGridViewWsie}
      />
      <BulkSaleProductView
        gridViewWise={gridViewWise}
        data={partyListInfo.data}
        bulkProducts={getBulkProducts.data}
      />
      <MoreItemsToConsider
        HeaderText={"More Items To Consider"}
        data={moreItems.data}
      />
      <RecentlyViewItem />
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let bulkCategory,
    partyListInfo,
    getBulkProducts,
    moreItems,
    getError = false;
  let endpoints = [
    baseUrl + "/" + partyCategory,
    baseUrl + "/" + partyList,
    baseUrl + "/" + bulkProducts,
    baseUrl + "/" + getMoreItems,
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint))).then(
      Axios.spread(
        (
          { data: BulkCategoryList },
          { data: partyListData },
          { data: BulkProducts },
          { data: moreProData }
        ) => {
          bulkCategory = BulkCategoryList;
          partyListInfo = partyListData;
          getBulkProducts = BulkProducts;
          moreItems = moreProData;
        }
      )
    );
  } catch (error) {
    bulkCategory = null;
    partyListInfo = null;
    getBulkProducts = null;
    moreItems = null;
    getError = true;
  }
  return {
    props: {
      bulkCategory,
      partyListInfo,
      getBulkProducts,
      moreItems,
      getError,
    }, // will be passed to the page component as props
  };
}
