import React, { useEffect } from "react";

function CardDiscountPartner({ discountPartnerData, discountPartnerImage }) {
  useEffect(() => {
    $(".brand-slider-wrapper").slick({
      dots: false,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 2,
      autoplay: true,
      arrows: true,
      infinite: true,
      prevArrow:
        "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
      nextArrow:
        "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
    console.log(discountPartnerImage);
  }, [discountPartnerImage]);
  return (
    <>
      <section class="brand-partner-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="bp-bg">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="common-title-flex">
                      <div class="left-box">
                        <h3 class="common-title ">brand partner</h3>
                      </div>
                      <div class="center-box"></div>
                      {/* <div class="right-box">
                        <a href="#" class="see-all-products">
                          see all <i class="fa-solid fa-chevron-right"></i>
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="brand-slider-wrapper px-seventee">
                      {discountPartnerImage.map((item, index) => (
                        <div class="card">
                          <div class="card-body">
                            <div class="image-box">
                              <img src={item?.image} alt="" />
                            </div>
                            <div class="discount">{item?.discount} %</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="discount-chart"></section> */}
      <section class="discount-chart">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="chart-bg">
                <div class="common-fieldset-main">
                  <fieldset class="common-fieldset">
                    <legend class="rounded">
                      membership card discount partners
                    </legend>

                    <div
                      class="downoload-btn"
                      data-bs-toggle="tooltip"
                      data-bs-title="Download Discount Chart"
                      data-bs-placement="top"
                    >
                      <a href="javascript:void(0);" class="">
                        <i class="fa-solid fa-file-arrow-down"></i>
                      </a>
                    </div>
                    <div class="table-responsive discount-partners">
                      <table class="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">sl No. </th>
                            <th scope="col">shop name</th>
                            <th scope="col">shop no.</th>
                            <th scope="col">discount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discountPartnerData.map((item, index) => (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.shop}</td>
                              <td>{item.discount} %</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardDiscountPartner;
