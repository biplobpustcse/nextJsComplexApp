import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getShopsBrand } from "../../lib/endpoints";
import Product from "../../Product/Product";
import BrandShopTemplate from "./BrandShopTemplate";

const BrandShop = ({ data, setting }) => {
  const HeaderText = "Brand Shop";
  // const isVisible = setting.find((item) => item.type == businessType.BrandShop);
  //#region clientApi
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
  //#endregion
  return (
    <>
      {
        <Product
          headerText={HeaderText}
          Template={BrandShopTemplate}
          linkUrl={'/brand-shop?brand_store=1'}
          data={data}
        />
      }
    </>
  );
};

export default BrandShop;
