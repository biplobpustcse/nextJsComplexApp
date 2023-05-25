import React from 'react';
import { businessType } from '../../../utils/dictionaries';
import Slider from '../../../utils/Slider/Slider';
import QuoteTemplate from './QuoteTemplate';

const Quotes = ({ data, setting }) => {
  //const isVisible = setting.find((item) => item.type == businessType.Quotes);
  const options = {
    rewind: true,
    type: 'loop',
    drag: 'free',
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 4,
    // width: '100%',
    gap   : '10px',
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
      991: {
        perPage: 2,
      },
      992: {
        perPage: 2,
      },
      1024: {
        perPage: 2,
      },
      1200: {
        perPage: 3,
      },
    },
  };
  return (
    <>
      {
        <section class="testimonials-clean">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="testimonial-bg py-10">
                  <div class="row">
                    <div class="col-12">
                      <div class="people testimonial-wrapper px-seventeen py-seventeen">
                        <Slider
                          data={data}
                          options={options}
                          Template={QuoteTemplate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Quotes;
