import React, { useCallback, useEffect, useRef, useState } from "react";
import { productDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { ProductSlider } from "../../../utils/slider";
import Slider from "../../../utils/Slider/Slider";
import Tabs from "../../../utils/Tabs/Tabs";
import {
  getAllImported,
  getAllImportedFromUSA,
  getAllPopularProducts,
  getNewArrival,
} from "../../lib/endpoints";
import ProductInfoModel from "../../Product/ProductInfoModel";
import Link from "next/link";
import Axios from "axios";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

const POpularTabedPro = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [infoState, setInfoState] = useState({
    link: getAllPopularProducts,
  });
  const [tabInfo, setTabInfo] = useState();
  const [currentTabParam, setCurrentTabParam] = useState("");
  const [currentTabName, setCurrentTabName] = useState("");
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
      576: {
        perPage: 1,
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
      1440: {
        perPage: 4,
      },
    },
  };
  const getTabedProduct = useCallback((url, name) => {
    Axios.get(url)
      .then(({ data }) => {
        console.warn(productDataConverter(data?.data));

        setIsLoading(true);
        setCurrentTabParam(url);
        setCurrentTabName(name);
        setProductData(productDataConverter(data?.data));
        setIsLoading(false);
      })
      .catch((err) => {});
  }, []);

  const tabedClickHandler = (url, name) => {

    getTabedProduct(url, name);
  };
  useEffect(() => {
    http.get({
      url: "tab-category-list",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setTabInfo(res);
        setIsLoading(false);
      },
      failed: () => {},
    });
  }, []);

  useEffect(() => {
    if (tabInfo != undefined && tabInfo.length > 0) {
      tabedClickHandler(tabInfo[0]?.url, tabInfo[0]?.name);
    }
  }, [tabInfo]);

  const tabChange = (url) => {
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: currentTabName,
        link1: url,
        name2: '',
        link2: '',
        name3: '',
        link3: '',
        name4: '',
        link4: '',
        name5: '',
        id5: '',
      },
    });
    router.push(url)
  }

  return (
    <section class="popularproduct-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="popularproduct-tabs px-seventeen py-seventeen">
              <Tabs
                tabInfo={tabInfo}
                tabClickHttp={getTabedProduct}
                setClicked={setClicked}
              />
              <div class="tab-content" id="myTabContent">
                {!isLoading && productData.length > 0 && (
                  <div
                    class="tab-pane fade show active"
                    id="popular-products-pane"
                    role="tabpanel"
                    aria-labelledby="popular-products"
                    tabindex="0"
                  >
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div
                          class={
                            productData.length <= 6
                              ? `popularproduct-wrapper remove__arrow`
                              : `popularproduct-wrapper`
                          }
                        >
                          {/* {productData.length < 6 &&
                            productData.map((item) => (
                              <ProductInfoModel item={item} />
                            ))} */}
                          {
                            // productData.length > 6 && (

                            <Slider
                              options={options}
                              Template={ProductInfoModel}
                              data={productData}
                            />
                          }
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 text-center">
                        {/*<Link href={"shop?" + currentTabParam.split("?")[1]}>*/}
                        {/*  <a class="btn view-all-product-btn">*/}
                        {/*    View all {currentTabName}*/}
                        {/*  </a>*/}
                        {/*</Link>*/}
                        <div onClick={() => tabChange("/shop?" + currentTabParam.split("?")[1],currentTabName)}>
                            <a class="btn view-all-product-btn">
                              View all {currentTabName}
                            </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!isLoading && productData.length == 0 && (
                  <div
                    // tab-pane
                    class=" "
                    id="no-products"
                    role="tabpanel"
                    aria-labelledby="imported-products"
                    tabindex="0"
                  >
                    Sorry No Products Found.
                  </div>
                )}
                <div
                  class="tab-pane fade"
                  id="imported-usa-tab-pane"
                  role="tabpanel"
                  aria-labelledby="imported-usa-tab"
                  tabindex="0"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default POpularTabedPro;
