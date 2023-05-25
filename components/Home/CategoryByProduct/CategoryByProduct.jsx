import React, { useCallback, useEffect, useState } from "react";
import { productDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getHomeCategory, getHomeCatVisibleProduct } from "../../lib/endpoints";
import Product from "../../Product/Product";
import HotSaleTemplate from "../HotSale/HotSaleTemplate";

const CategoryByProduct = ({ data, setting, showMan=null }) => {
  //const isVisible = setting.find((item) => item.type == businessType.Category);
  //#region clientSide categoryProduct
  // const [isLoading, setIsLoading] = useState(true);
  // const [categoryData, setCategoryData] = useState([]);
  // const [catWiseProduct, setCatWiseProduct] = useState([]);
  // const GetHomeCategory = useCallback(() => {
  //   http.get({
  //     url: getHomeCategory,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setCategoryData(res);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   GetHomeCategory();
  // }, []);
  //#endregion

  console.log("catergory by product: ", data);

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

  return (
    <>
      {data.length > 0 &&
        data.map((item) => {
          if (showMan) {
            return item && item?.name == "Men's" ? (
              <>
                <Product
                  Template={HotSaleTemplate}
                  headerText="Fashion For Man"
                  linkUrl={"/shop?cat_id=" + item?.id}
                  data={productDataConverter(item.categories_products?.data)}
                />
              </>
            ) : null;
          } else {
            return item && item?.name == "Men's" ? null : (
              <>
                <Product
                  Template={HotSaleTemplate}
                  headerText={item?.name}
                  linkUrl={"/shop?cat_id=" + item?.id}
                  data={productDataConverter(item.categories_products?.data)}
                />
              </>
            );
          }
        })}
    </>
  );
};

export default CategoryByProduct;
