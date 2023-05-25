import React from "react";
import { SecondaryFirstWraper } from "../../../utils/slider";
import Slider from "../../../utils/Slider/Slider";
import CommonSliderTemplate from "./CommonSliderTemplate";
import SecondarySliderTemplate from "./SecondarySliderTemplate";

function SliderTemplate({ sliders, Template, template, options, url }) {

  return (
    <>
      <Template>
         {sliders.length > 0 && (
                  <Slider
                    options={options}
                    Template={template}
                    data={sliders}
                    url={url}
                  />
                )}
      </Template>
    </>
    // <div className="row">
    //   <div className="col-12">
    //     <section className="secondary-slider-flex">
    //       <div className="secondary-slider">
    //         <div className="secondary-first-wraper">

    //         {sliders.length > 0 && (
    //               <Slider
    //                 options={options}
    //                 Template={CommonSliderTemplate}
    //                 data={sliders}
    //               />
    //             )}

    //         </div>
    //       </div>
    //     </section>
    //   </div>

    // </div>
  );
}

export default SliderTemplate;
