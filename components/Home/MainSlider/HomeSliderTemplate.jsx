import React from "react";
import { HomeSliderWrapper } from "../../../utils/slider";
import Slider from "../../../utils/Slider/Slider";
import CommonSliderTemplate from "./CommonSliderTemplate";

function HomeSliderTemplate({ children }) {
  return (
    <section className="home-slider-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" />
          <div className="homeslider-wrapper">
            {children}
            {/* {sliders.length > 0 && (
                  <Slider
                    options={options}
                    Template={CommonSliderTemplate}
                    data={sliders}
                  />
                )} */}
            {/* {sliders &&
              sliders.length > 0 &&
              sliders.map((slide) => {
                return (
                  <div className="home-slider">
                    <img
                      src={slide}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                );
              })} */}

            {/* <div className="home-slider">
              <img
                src="../assets/images/slider/1.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="home-slider">
              <img
                src="../assets/images/slider/2.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="home-slider">
              <img
                src="../assets/images/slider/1.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="home-slider">
              <img
                src="../assets/images/slider/2.png"
                alt=""
                className="img-fluid"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSliderTemplate;
