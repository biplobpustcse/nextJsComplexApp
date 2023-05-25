import React from "react";
import { MainSliderWrapper } from "../../../utils/slider";
import Slider from "../../../utils/Slider/Slider";
import CommonSliderTemplate from "./CommonSliderTemplate";

function MainSliderTemplate({ children }) {
  return (
    <div className="main-slider">
      <div className="main-slider-wrapper">
        {children}
      </div>
    </div>
    // <div className="main-slider">
    //   <div className="main-slider-wrapper" style={{height:"100%"}}>

    //   {sliders.length > 0 && (
    //               <Slider
    //                 options={options}
    //                 Template={CommonSliderTemplate}
    //                 data={sliders}
    //               />
    //             )}

    //   </div>

    // </div>
  );
}

export default MainSliderTemplate;
