import React from "react";
import ShopBreadCum from "./ShopBreadCum";
import ShopByBrand from "./ShopByBrand";
import ShopByRelevance from "./ShopByRelevance";
import ShopPriceRange from "./ShopPriceRange";
import ShopProductViewAs from "./ShopProductViewAs";

const ShopProductShorting = ({
  breadCumbData,
  configuration,
  setGridViewWsie,
}) => {
  return (
    <section class="shop-product-sorting ss">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="sorting-flex-main">
              {/* breadcum */}
              <ShopBreadCum data={breadCumbData} />
              {configuration.priceRangeVisible == true && <ShopPriceRange />}
              {configuration.shopByBrandVisible == true && (
                <div class="sortby-main">
                  <ShopByBrand />
                </div>
              )}
              {configuration.shopByRelevance == true && (
                <div class="sortby-main">
                  <ShopByRelevance />
                </div>
              )}

              <div class="viewall-main">
                <h4>view as</h4>
                <ShopProductViewAs setGridViewWsie={setGridViewWsie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopProductShorting;
