import { MainSliderWrapper, OfferSlider } from "../../../utils/slider";
import OfferSliderMain from "./OfferSliderMain";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../../services/httpService";
import { getHomeSliders } from "../../lib/endpoints";
import HomeSliderTemplate from "./HomeSliderTemplate";
import CommonSliderTemplate from "./CommonSliderTemplate";
import SliderTemplate from "./SliderTemplate";

function SliderMain2({ sliders }) {
  let data = [];
  // const sliceFilterData = (sliders) => {
  //   if (sliders.length > 20) {
  //     sliders.forEach((element, index) => {
  //       if (index <= 20) {
  //         data.push(element);
  //       }
  //     });
  //   } else {
  //     data = sliders;
  //   }
  //   return data;
  // };
  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 1,
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

  return (
    <>
      <SliderTemplate
        sliders={sliders}
        Template={HomeSliderTemplate}
        template={CommonSliderTemplate}
        options={options}
      />
      {/* {sliders.length > 0 && (
                <SliderTemplate
                  sliders={sliders}
                  Template={HomeSliderTemplate}
                  template={CommonSliderTemplate}
                  options={options}
                />
              )} */}
      {/* {sliders?.length > 0 &&  <HomeSlider sliders={sliders} />} */}
    </>
  );
}

export default SliderMain2;
