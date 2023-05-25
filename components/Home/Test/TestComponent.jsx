import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../../services/httpService";
import Slider from "../../../utils/Slider/Slider";
import { getFlashDeals, getHomeCategory } from "../../lib/endpoints";
import ProductInfoHeader from "../../Product/ProductInfoHeader";
import ProductInfoModel from "../../Product/ProductInfoModel";
import HotSaleTemplate from "../HotSale/HotSaleTemplate";

const TestComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [catWiseProduct, setCatWiseProduct] = useState([]);
  const GetHomeCategory = useCallback(() => {
    http.get({
      url: getHomeCategory,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        setCategoryData(res);
      },
      failed: () => {
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    GetHomeCategory();
  }, [GetHomeCategory]);
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
        perPage: 2,
      },
      991: {
        perPage: 3,
      },
      992: {
        perPage: 4,
      },
      1024: {
        perPage: 4,
      },
      1200: {
        perPage: 5,
      },
    },
  };
  console.log({ categoryData });
  return (
    <>
      {!isLoading && (
        <section class="popularproduct-main">
          <div class="container-fluid">
            <ProductInfoHeader headerText={"Test"} />
            <Slider
              Template={ProductInfoModel}
              options={options}
              data={categoryData}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TestComponent;
