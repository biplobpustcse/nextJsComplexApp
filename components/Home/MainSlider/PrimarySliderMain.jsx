import DoubleSlider from './DoubleSlider';
import MainSliderTemplate from './MainSliderTemplate';
import SliderTemplate from './SliderTemplate';

import React from 'react';
import CommonSliderTemplate from './CommonSliderTemplate';
import SecondarySliderTemplate from './SecondarySliderTemplate';

function PrimarySliderMain({ sliders }) {
  const MainSliderOptions = {
    rewind: true,
    type: 'loop',
    drag: 'free',
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 1,
    width: '100%',
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
  const SecondarySliderOptions = {
    rewind: true,
    type: 'loop',
    drag: 'free',
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 13,
    width: '100%',
    breakpoints: {
      375: {
        perPage: 4,
      },
      576: {
        perPage: 5,
      },
      767: {
        perPage: 5,
      },
      991: {
        perPage: 7,
      },
      992: {
        perPage: 7,
      },
      1024: {
        perPage: 8,
      },
      1200: {
        perPage: 9,
      },
    },
  };
  return (
    <section className="primary-slider-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="primary-slider-flex">
              {sliders.home_slider_images?.length > 0 && (
                <SliderTemplate
                  sliders={sliders.home_slider_images}
                  Template={MainSliderTemplate}
                  template={CommonSliderTemplate}
                  options={MainSliderOptions}
                  className="primary-slider"
                />
              )}

              <DoubleSlider sliders={sliders} />
            </div>
          </div>
        </div>
        {sliders.home_slider_images?.length > 0 && (
          <SliderTemplate
            sliders={sliders.home_slider_bottom_images}
            Template={SecondarySliderTemplate}
            template={CommonSliderTemplate}
            options={SecondarySliderOptions}
          />
        )}
      </div>
    </section>
  );
}

export default PrimarySliderMain;
