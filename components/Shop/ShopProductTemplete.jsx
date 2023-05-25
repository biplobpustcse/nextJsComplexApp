import React from "react";
import { productDataConverter } from "../../services/dataService";
import ProductInfoModel from "../Product/ProductInfoModel";
import FourColGridTemplate from "./FourColGridTemplate";

function ShopProductTemplete({ products, Templete, Templete2 }) {
  console.log("Templete: ", Templete);
  products = productDataConverter(products);
  console.log({ products });
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
                        {" "}
                        <div class="single-product">
                          <Templete2 item={item} />
                        </div>
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

export default ShopProductTemplete;
