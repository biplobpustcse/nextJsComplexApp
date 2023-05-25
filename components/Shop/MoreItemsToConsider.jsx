import React, { useCallback, useEffect, useState } from "react";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import BrandShopTemplate from "../Home/BrandShop/BrandShopTemplate";
import HotSaleTemplate from "../Home/HotSale/HotSaleTemplate";
import { getShopsBrand } from "../lib/endpoints";
import Product from "../Product/Product";
import ProductInfoModel from "../Product/ProductInfoModel";

const MoreItemsToConsider = ({ HeaderText, data, url }) => {
  // const HeaderText = "More Items To Consider";
  // const [brandData, setBrandData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const getBrandData = useCallback(() => {
  //   http.get({
  //     url: getShopsBrand,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setBrandData(res);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   getBrandData();
  // }, []);

  return (
    <>
      <Product
        headerText={HeaderText}
        Template={HotSaleTemplate}
        data={productDataConverter(data)}
      />
    </>
  );
};

export default MoreItemsToConsider;
