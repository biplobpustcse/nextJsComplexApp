import Axios from "axios";
import React from "react";
import { useState } from "react";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import { getMoreItems, userOrderList } from "../../components/lib/endpoints";
import MyItems from "../../components/MyItems/MyItems";
import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import { baseUrl } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import QuickView from "../../components/Product/QuickView";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

const index = ({ moreItems, reorderItemList, getError }) => {
  console.log({ reorderItemList });
  const [price, setPrice] = useState([0, 2000000]);
  const [twoView, setTwoView] = useState(false);
  const [threeView, setThreeView] = useState(true);
  const [fourView, setFourView] = useState(true);
  const [reorderItems, setReorderItems] = useState({});
  const handleClick = (event, isview) => {
    if (isview == "two") {
      setTwoView(true);
      setThreeView(false);
    } else if (isview == "three") {
      setTwoView(false);
      setThreeView(true);
    } else {
      setTwoView(false);
      setThreeView(false);
    }
  };
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ShopProductShorting
        handleClick={handleClick}
        setPrice={setPrice}
        price={price}
        showPrice={false}
        showBrands={false}
        showRevalance={false}
        viewAsFormat={2}
      />
      <MyItems
        moreItems={moreItems.data}
        twoView={twoView}
        threeView={threeView}
        fourView={fourView}
        reorderItemList={reorderItemList}
      />
      <QuickView />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let moreItems,
    reorderItemList,
    getError = false;

  let endpoints = [baseUrl + "/" + getMoreItems, baseUrl + "/" + userOrderList];
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
      Axios.spread(({ data: moreProducts }, { data: reorderItems }) => {
        moreItems = moreProducts;
        reorderItemList = reorderItems;
      })
    );
  } catch (error) {
    getError = true;
    moreItems = null;
    reorderItemList = null;
  }

  return {
    props: { moreItems, reorderItemList, getError }, // will be passed to the page component as props
  };
}
