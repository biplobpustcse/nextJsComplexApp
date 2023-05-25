import React from "react";
import Slider from "../../utils/Slider/Slider";

const homeTemplate = ({ item }) => {
  return (
    <div class="home-slider">
      <img src={item} alt="" class="img-fluid" />
    </div>
  );
};
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
const ShopHomeSlider = ({ data }) => {
  console.log();
  return (
    <section class="home-slider-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="homeslider-wrapper">
              <Slider data={data} Template={homeTemplate} options={options} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHomeSlider;
