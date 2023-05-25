import React, { useCallback, useEffect, useState } from "react";
import { categoryShopDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getShopCategory, getShops } from "../../lib/endpoints";
import ShopByCategory from "./ShopByCategory";
import ShopCatTemplate from "./ShopCatTemplate";

const ShopCategory = ({ data, setting,url=null }) => {
  const brandDataConverter = () => {
    const obj = [];
    data.map((item) => {
      obj.push({
        id: item.id,
        name: item.name,
        banner: item.banner,
        icon: item.icon,
        thumbnail_icon: item.thumbnail_icon,
        count: item.number_of_product,
        is_department : item?.is_department
      });
    });
    return obj?.slice(0, 6);
  };
  // const isVisible = setting.find(
  //   (item) => item.type == businessType.ShopByCategory
  // );
  //#region clientSide
  // const [shopData, setShopData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [visibleErro, setVisibileError] = useState(false);

  // const getShopsData = useCallback(() => {
  //   http.get({
  //     url: getShopCategory,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setShopData(categoryShopDataConverter(res));
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   getShopsData();
  // }, []);
  //#endregion

  return (
    <>
      {data.length > 0 && (
        <ShopByCategory
          Template={ShopCatTemplate
          }
          section={'category'}

          url={url = 'all-category'}
          childUrl={'/shop?cat_id='}
          headerText={"shop by category"}
          data={brandDataConverter()}
        />
      )}
    </>
  );
};

export default ShopCategory;
