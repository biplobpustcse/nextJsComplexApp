import React from "react";
import {
  RightBottomSliderWrapper,
  RightTopSliderWrapper,
} from "../../../utils/slider";
import Slider from "../../../utils/Slider/Slider";
import CommonSliderTemplate from "./CommonSliderTemplate";
import RightBottomSlider from "./RightBottomSlider";
import RightTopSlider from "./RightTopSlider";
import SliderTemplate from "./SliderTemplate";

function DoubleSlider({ sliders }) {
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
    <div className="double-slider">
      {sliders.home_sidebar_up_images?.length > 0 && (
        <SliderTemplate
          sliders={sliders.home_sidebar_up_images}
          Template={RightTopSlider}
          template={CommonSliderTemplate}
          options={options}
        />
      )}
      {sliders.home_sidebar_down_images?.length > 0 && (
        <SliderTemplate
          sliders={sliders.home_sidebar_down_images}
          Template={RightBottomSlider}
          template={CommonSliderTemplate}
          options={options}
        />
      )}

      {/* <div className="right-top-slider">
        <div className="right-top-slider-wrapper">
          {sliders?.home_sidebar_up_images?.length > 0 && (
            <Slider
              options={options}
              Template={CommonSliderTemplate}
              data={sliders.home_sidebar_up_images}
            />
          )}
        </div>
      </div>
      <div className="right-bottom-slider">
        <div className="right-bottom-slider-wrapper">
          {sliders?.home_sidebar_down_images?.length > 0 && (
            <Slider
              options={options}
              Template={CommonSliderTemplate}
              data={sliders.options}
            />
          )}
        </div>
      </div> */}
    </div>
  );
}

export default DoubleSlider;
