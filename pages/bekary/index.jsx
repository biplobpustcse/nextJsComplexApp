import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Bekary from "../../components/Bekary/Bekary";
import InstantDelivery from "../../components/Bekary/InstantDelivery";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import SliderTemplate from "../../components/Home/MainSlider/SliderTemplate";
import SliderWithText from "../../components/Home/MainSlider/SliderWithText";

import {
  getBakeryInfo,
  getBekaryCategory,
  getBekarySlider,
  getBekaryTabCategory,
  getHomeSliders,
  getMoreItems,
  getOfferItems,
  getRecipeCategory,
  getrelatedProducts,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";
import RecipeSmSliderTemplate from "../../components/recipe/RecipeSmSliderTemplate";
import MoreItemsToConsider from "../../components/Shop/MoreItemsToConsider";
import RecentlyViewItem from "../../components/Shop/RecentlyViewItem";
import { productDataConverter } from "../../services/dataService";
import { baseUrl, http } from "../../services/httpService";
import Custom404 from "../404";
import { SecondFooter } from "../../components/Footer/SecondFooter";

function index({
  moreItems,
  offerItems,
  bekarySliderData,
  miniSliderData,
  bekaryTabData,
  getError,
}) {
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState(bekarySliderData || []);
  const [miniSliders, setMiniSliders] = useState(miniSliderData || []);
  const [bekaryTabCategory, setBekaryTabCategory] = useState(
    bekaryTabData || []
  );
  let [bakeryPageInfo, setBakeryPageInfo] = useState(null);
  useEffect(() => {
    http.get({
      url: getBakeryInfo,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setBakeryPageInfo(res?.result);
      },
      failed: () => {
        setIsLoading(false);
      },
    });
  }, []);

  // const GetHomeSliders = useCallback(() => {
  //   http.get({
  //     url: getBekarySlider,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setSliders(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  // const GetBekarytabCategory = useCallback(() => {
  //   http.get({
  //     url: getBekaryTabCategory,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setBekaryTabCategory(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  // const GetMiniSliders = useCallback(() => {
  //   http.get({
  //     url: getBekaryCategory,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setMiniSliders(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   // GetHomeSliders();
  //   // GetBekarytabCategory();
  //   // GetMiniSliders();
  //   // dispatch({
  //   //   type: "setBredCumbdata",
  //   //   payload: {
  //   //     name1: "",
  //   //     link1: "",
  //   //     name2: "",
  //   //     link2: "",
  //   //     name3: "",
  //   //     link3: "",
  //   //     name4: "",
  //   //     link4: "",
  //   //   },
  //   // });
  // }, []);

  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 5,
    width: "100%",
    breakpoints: {
      320: {
        perPage: 1,
      },
      375: {
        perPage: 1,
      },
      576: {
        perPage: 1,
      },
      768: {
        perPage: 1,
      },
      991: {
        perPage: 1,
      },
      992: {
        perPage: 1,
      },
      1024: {
        perPage: 1,
      },
      1200: {
        perPage: 1,
      },
    },
  };
  console.log("mini", miniSliders);
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      {sliders.length > 0 && <SliderMain2 sliders={sliders} />}
      {miniSliders?.length > 0 && (
        <SliderTemplate
          sliders={miniSliders}
          Template={RecipeSmSliderTemplate}
          template={SliderWithText}
          options={options}
          url="/shop?cat_id="
        />
      )}

      {bekaryTabCategory && bekaryTabCategory?.length > 0 && (
        <Bekary tabCategory={bekaryTabCategory} />
      )}
      <InstantDelivery bakeryInfo={bakeryPageInfo} />

      {/*<MoreItemsToConsider*/}
      {/*  HeaderText={"Sponsored Items"}*/}
      {/*  data={offerItems.data}*/}
      {/*  url={""}*/}
      {/*/>*/}
      {/*<MoreItemsToConsider*/}
      {/*  HeaderText={"More Items To Consider"}*/}
      {/*  data={moreItems.data}*/}
      {/*  url={""}*/}
      {/*/>*/}
      {/*<RecentlyViewItem />*/}
      <QuickView />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const router = context.params?.id;
  let product,
    moreItems,
    relatedItems,
    offerItems,
    bekarySliderData,
    miniSliderData,
    bekaryTabData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getOfferItems,
    baseUrl + "/" + getBekarySlider,
    baseUrl + "/" + getBekaryCategory,
    baseUrl + "/" + getBekaryTabCategory,
  ];
  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(
        (
          { data: moreProducts },
          { data: offerPro },
          { data: bekaryData1 },
          { data: miniSliderItems },
          { data: bekarySliderData2 }
        ) => {
          moreItems = moreProducts;
          offerItems = offerPro;
          bekarySliderData = bekaryData1;
          miniSliderData = miniSliderItems;
          bekaryTabData = bekarySliderData2;
        }
      )
    );
  } catch (error) {
    moreItems = null;
    offerItems = null;
    bekarySliderData = null;
    miniSliderData = null;
    bekaryTabData = null;
    getError = true;
  }

  return {
    props: {
      moreItems,
      offerItems,
      bekarySliderData,
      miniSliderData,
      bekaryTabData,
      getError,
    }, // will be passed to the page component as props
  };
}
