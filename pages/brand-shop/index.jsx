import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Brandshops from "../../components/BrandShop/Brandshops";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import {
  getHomeSliders,
  getMoreItems,
  getRecipeByCategory,
  getRecipeCategory,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";
import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import { baseUrl, http } from "../../services/httpService";
import Custom404 from "../404";
import Shop from "../../components/Shop/Shop";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function index({ moreItems, homeSliderData }) {
  const dispatch = useDispatch();

  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState(homeSliderData || []);
  const [price, setPrice] = useState([0, 20000]);

  const [oneView, setOneView] = useState(false);
  const [fourView, setfourView] = useState(false);
  const [fiveView, setfiveView] = useState(true);
  const [sixView, setsixView] = useState(false);

  const handleClick = (event, isview) => {
    if (isview == "four") {
      setfourView(true);
      setfiveView(false);
      setsixView(false);
    } else if (isview == "five") {
      setfourView(false);
      setfiveView(true);
      setsixView(false);
    } else if (isview == "six") {
      setfourView(false);
      setfiveView(false);
      setsixView(true);
    } else if(isview == "one") {
      setOneView(true);
      setfourView(false);
      setfiveView(false);
      setsixView(false);
    }
  };

  // const GetHomeSliders = useCallback(() => {
  //   http.get({
  //     url: getHomeSliders,
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

  useEffect(() => {
    // GetHomeSliders();
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: "brand",
        link1: "",
        name2: "",
        link2: "",
        name3: "",
        link3: "",
        name4: "",
        link4: "",
      },
    });
  }, []);

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
      375: {
        perPage: 1,
      },
      576: {
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
  // if (getError) {
  //   return <Custom404 />;
  // }
  return (
    <>
      {sliders.home_slider_images?.length > 0 && (
        <SliderMain2 sliders={sliders.home_slider_images} />
      )}

      <ShopProductShorting
        handleClick={handleClick}
        setPrice={setPrice}
        price={price}
        showPrice={false}
        showBrands={true}
        showRevalance={false}
        viewAsFormat={1}
        totalVisible={1}
      />
      <Brandshops
        oneView={oneView}
        fourView={fourView}
        fiveView={fiveView}
        sixView={sixView}
        moreItems={moreItems?.data}
        moreCat={[]}
        description={null}
      />
      {/* {fourView && (
          <Recipe Template={FourColGridTemplate} />
        )}
        {fiveView && (
          <Recipe Template={FiveColGridTemplate} />
        )}
        {sixView && (
          <Recipe Template={SixColGridTemplate} />
        )} */}
      <SecondFooter />
      <SslFooter2 />
      <QuickView />
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
    homeSliderData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getHomeSliders,
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(({ data: moreProducts }, { data: homeSliders }) => {
        moreItems = moreProducts;
        homeSliderData = homeSliders;
      })
    );
  } catch (error) {
    moreItems = null;
    homeSliderData = null;
    getError = true;
  }

  return {
    props: { moreItems, homeSliderData, getError }, // will be passed to the page component as props
  };
}
