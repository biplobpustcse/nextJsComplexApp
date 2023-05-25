import React, { useCallback, useEffect, useState } from "react";
import { departmentDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getBrandStore } from "../../lib/endpoints";
import ShopByCategory from "../ShopCategory/ShopByCategory";
import ShopCatTemplate from "../ShopCategory/ShopCatTemplate";

const BrandStore = ({ data, setting }) => {
  const brandDataConverter = () => {
    const obj = [];
    data.map((item) => {
      obj.push({
        id: item.id,
        name: item.name,
        banner: item.logo,
        icon: item.logo,
        count: item.links.product_count,
      });
    });
    return obj?.slice(0, 6);
  };
  // const isVisible = setting.find(
  //   (item) => item.type == businessType.BrandStore
  // );
  //#region  clientSide
  // const [isLoading, setIsLoading] = useState(true);
  // const [brandStoreData, setBrandStoreData] = useState([]);

  // const getBrandsStoreData = useCallback(() => {
  //   http.get({
  //     url: getBrandStore,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setBrandStoreData(res);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // });

  // useEffect(() => {
  //   getBrandsStoreData();
  // }, []);
  //#endregion
  return (
    <>
      {
        <ShopByCategory
          Template={ShopCatTemplate}
          headerText={"brand store"}
          section={'brand'}
          data={brandDataConverter()}
          url="all-brand?brand_store=1"
          childUrl={'/shop?brand_id='}
          
        />
      }
    </>
  );
};

export default BrandStore;
