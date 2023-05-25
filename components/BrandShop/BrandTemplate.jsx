import React from 'react'
import SingleBrandTemplate from './SingleBrandTemplate';

function BrandTemplate({ Templete, products }) {
    return (
        <section class="product-view-main">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="tab-content" id="myTabContent">
                  <Templete>
                    {products &&
                      products.length > 0 &&
                      products.map((item) => {
                        return (
                          <>
                            <SingleBrandTemplate item={item}/>
                          </>
                        );
                      })}
                  </Templete>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}

export default BrandTemplate