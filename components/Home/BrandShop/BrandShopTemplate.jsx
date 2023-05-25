import React from 'react';
import { BrandSlider } from '../../../utils/slider';
import Slider from '../../../utils/Slider/Slider';
import BrandShopBrand from './BrandShopBrand';

const BrandShopTemplate = ({ data }) => {
  const options = {
    rewind: true,
    type: 'slice',
    drag: 'free',
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 5,
    width: '100%',
    breakpoints: {
      375: {
        perPage: 1,
      },
      576: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      992: {
        perPage: 3,
      },
      1024: {
        perPage: 3,
      },
      1200: {
        perPage: 4,
      },
      1400: {
        perPage: 4,
      },
    },
  };
  return (
    <>
      {data.length > 0 && (
        <>
          <div class="row">
            <div class="col-12">
              <div class="popularproduct-tabs">
                <div class="popularproduct-wrapper">
                  <Slider
                    options={options}
                    Template={BrandShopBrand}
                    data={data}
                  />
                </div>
              </div>
            </div>
          </div>
          <BrandSlider />
        </>
      )}
    </>
  );
};

export default BrandShopTemplate;
