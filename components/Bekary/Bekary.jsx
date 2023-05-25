import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import Tabs from "../../utils/Tabs/Tabs";
import {
  getAllPopularProducts,
  getBreads,
  getCakes,
  getCookies,
  getOthers,
  getSweets,
} from "../lib/endpoints";
import ProductInfoModel from "../Product/ProductInfoModel";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";

function Bekary({ tabCategory }) {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [infoState, setInfoState] = useState({
    link: tabCategory && tabCategory[0]?.url,
  });
  let tabInfo = [];
  tabCategory.map((item, index) => {
    tabInfo.push({
      id: item.id,
      text: item.text,
      url: item.url,
    });
  });

  const getTabedProduct = useCallback((url) => {
    console.log("data", url);
    const responseHotSale = Axios.get(url)
      .then((res) => {
        setProductData(productDataConverter(res.data.data));
      })
      .catch((error) => {});
  }, []);

  const tabedClickHandler = (url) => {
    console.log("dataU", url);
    getTabedProduct(url);
  };
  useEffect(() => {
    tabedClickHandler(infoState.link);
  }, []);
  console.log("tabInfo", tabInfo);
  return (
    <section class="popularproduct-main">
      <div class="container-fluid">
        <div class="row">
          {/*<div class="col-12">*/}
          {/*  <div class="popularproduct-tabs py-thirty px-seventeen">*/}
          {/*    {tabInfo.length > 0 && (*/}
          {/*      <Tabs*/}
          {/*        tabInfo={tabInfo}*/}
          {/*        tabClickHttp={getTabedProduct}*/}
          {/*        setClicked={setClicked}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*    <div class="tab-content" id="myTabContent">*/}
          {/*      {productData.length > 0 && (*/}
          {/*        <FiveColGridTemplate>*/}
          {/*          {productData &&*/}
          {/*            productData.length > 0 &&*/}
          {/*            productData.map((item) => {*/}
          {/*              return (*/}
          {/*                <>*/}
          {/*                  <div class="single-product">*/}
          {/*                    <ProductInfoModel item={item} />*/}
          {/*                  </div>*/}
          {/*                </>*/}
          {/*              );*/}
          {/*            })}*/}
          {/*        </FiveColGridTemplate>*/}
          {/*      )}*/}
          {/*      {!isLoading && productData.length == 0 && (*/}
          {/*        <div*/}
          {/*          // tab-pane*/}
          {/*          class=" "*/}
          {/*          id="no-products"*/}
          {/*          role="tabpanel"*/}
          {/*          aria-labelledby="imported-products"*/}
          {/*          tabindex="0"*/}
          {/*        >*/}
          {/*          Sorry No Products Found.*/}
          {/*        </div>*/}
          {/*      )}*/}
          {/*     */}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
}

export default Bekary;
