import React from "react";
import Slider from "../../utils/Slider/Slider";
import BulkCategorySingle from "./BulkCategorySingle";

const BulkCategory = ({ data }) => {
  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 8,
    width: "100%",
    breakpoints: {
      375: {
        perPage: 1,
      },
      576: {
        perPage: 2,
      },
      991: {
        perPage: 3,
      },
      992: {
        perPage: 4,
      },
      1024: {
        perPage: 4,
      },
      1200: {
        perPage: 5,
      },
    },
  };
  return (
    <section class="recipe-sm-slider">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="recipe-sm-slider-wrapper">
              <Slider
                Template={BulkCategorySingle}
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkCategory;
