import React from "react";
import Slider from "../../../utils/Slider/Slider";
import ProductInfoModel from "../../Product/ProductInfoModel";
import styles from "./HotSale.module.css";

const HotSaleTemplate = ({ data }) => {
  const options = {
    rewind: true,
    type: "slide",
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
      414: {
        perPage: 1,
      },
      575: {
        perPage: 1,
      },
      576: {
        perPage: 2,
      },
      768: {
        perPage: 2,
      },
      991: {
        perPage: 3,
      },
      992: {
        perPage: 3,
      },
      1024: {
        perPage: 3,
      },
      1200: {
        perPage: 3,
      },
      1372: {
        perPage: 3,
      },
      1400: {
        perPage: 4,
      },
    },
  };

  return (
    <>
      {data.length > 0 && (
        <div class="row">
          <div class="col-12">
            <div class="popularproduct-tabs">
              <div
                className={
                  data.length <= 6
                    ? `popularproduct-wrapper remove__arrow`
                    : `popularproduct-wrapper`
                }
              >
                <Slider
                  options={options}
                  Template={ProductInfoModel}
                  data={data}
                />

                {/* {data.length <= 6 && (
                  <ul className="splide__list">
                    {data.map((item) => (
                      <li className="splide__slide">
                        <ProductInfoModel item={item} />
                      </li>
                    ))}
                  </ul>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotSaleTemplate;
