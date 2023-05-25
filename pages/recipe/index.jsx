import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import { SslFooter } from "../../components/Footer/SslFooter";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import SliderTemplate from "../../components/Home/MainSlider/SliderTemplate";
import SliderWithText from "../../components/Home/MainSlider/SliderWithText";
import {
  getHomeSliders,
  getMoreItems,
  getRecipeBanner,
  getRecipeCategory,
} from "../../components/lib/endpoints";
import FiveColGridTemplate from "../../components/recipe/FiveColGridTemplate";
import FourColGridTemplate from "../../components/recipe/FourColGridTemplate";
import Recipe from "../../components/recipe/Recipe";
import RecipeProductShorting from "../../components/recipe/RecipeProductShorting";
import RecipeSmSliderTemplate from "../../components/recipe/RecipeSmSliderTemplate";
import SixColGridTemplate from "../../components/recipe/SixColGridTemplate";
import { baseUrl, http } from "../../services/httpService";
import Custom404 from "../404";

function index({ moreItems, sliderData, miniSliderData, getError }) {
  const dispatch = useDispatch();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState(sliderData || []);
  const [miniSliders, setMiniSliders] = useState(miniSliderData.result || []);

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
    } else {
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
  // const GetMiniSliders = useCallback(() => {
  //   http.get({
  //     url: getRecipeCategory,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setMiniSliders(res.result);
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
    // GetMiniSliders();
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: "",
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
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      {sliders.home_slider_images?.length > 0 && (
        <SliderMain2 sliders={sliders.home_slider_images} />
      )}

      {miniSliders?.length > 0 && (
        <SliderTemplate
          sliders={miniSliders}
          Template={RecipeSmSliderTemplate}
          template={SliderWithText}
          options={options}
          url="/recipe?cat_id="
        />
      )}

      <RecipeProductShorting handleClick={handleClick} />
      <Recipe
        fourView={fourView}
        fiveView={fiveView}
        sixView={sixView}
        moreItems={moreItems}
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
    sliderData,
    miniSliderData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getHomeSliders,
    baseUrl + "/" + getRecipeCategory,
  ];
  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(
        (
          { data: moreProducts },
          { data: sliderItems },
          { data: miniSliderItems }
        ) => {
          moreItems = moreProducts;
          sliderData = sliderItems;
          miniSliderData = miniSliderItems;
        }
      )
    );
  } catch (error) {
    getError = true;
    moreItems = null;
    sliderData = null;
    miniSliderData = null;
  }

  return {
    props: { moreItems, sliderData, miniSliderData, getError }, // will be passed to the page component as props
  };
}
