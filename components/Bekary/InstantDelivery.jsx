import React, { useEffect } from "react";

function InstantDelivery({ bakeryInfo }) {
  return (
    <section class="instant-delivery-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="delivery-bg">
              <div class="row align-items-center">
                <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6 col-xl-7">
                  <div class="image-box">
                    <img src={bakeryInfo?.image} alt="" class="img-fluid" />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-6 col-xl-5">
                  <div class="delivery-descriptions">
                    <h3>{bakeryInfo?.title}</h3>
                    <p dangerouslySetInnerHTML={{ 
                      __html: bakeryInfo?.content
                     }}></p>
                    <div class="order-flex-main">
                      <div class="order-box">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <h4>minimum order</h4>
                              </td>
                              <td>
                                <h4>order time</h4>
                              </td>
                              <td>
                                <h4>free delivery</h4>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>{bakeryInfo?.minimum_order}</p>
                              </td>
                              <td>
                                <p>{bakeryInfo?.order_time}</p>
                              </td>
                              <td>
                                <p>{bakeryInfo?.free_delivery}</p>
                              </td>
                            </tr>
                            <tr>
                              <td class="" colspan="3">
                                <a href="#" class="cake-order-now">
                                  order now
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstantDelivery;
