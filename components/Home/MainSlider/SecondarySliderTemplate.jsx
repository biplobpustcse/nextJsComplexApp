import React from "react";
import Slider from "../../../utils/Slider/Slider";

function SecondarySliderTemplate({ children }) {
  return (
    <div className="row">
      <div className="col-12">
        <section className="secondary-slider-flex">
          <div className="secondary-slider">
            <div className="secondary-first-wraper">
                {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SecondarySliderTemplate;
