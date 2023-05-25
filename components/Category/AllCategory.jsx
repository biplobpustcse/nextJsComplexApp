import React, { useEffect, useState } from "react";
import CategoryTemplate from "./CategoryTemplate";
import InfiniteScroll from "react-infinite-scroll-component";
import { http } from "../../services/httpService";
import { InfinitySpin } from "react-loader-spinner";
import FourColGridTemplate from "../Shop/FourColGridTemplate";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";
import SixColGridTemplate from "../Shop/SixColGridTemplate";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

export const AllCategory = ({
  section,
  fourView,
  fiveView,
  sixView,
  oneView,
  moreItems,
  offerItems,
}) => {
  let [items, setItems] = useState([]);
  const template = fourView
    ? FourColGridTemplate
    : fiveView
    ? FiveColGridTemplate
    : sixView
    ? SixColGridTemplate
    : oneView
    ? OneColGridTemplate
          : "";
  useEffect(() => {
    http.get({
      url: "categories?is_shop_by_category=1",
      successed: (res) => {
        console.log(res);
        setItems(res);
      },
    });
  }, []);
  return (
    <>
    
         
        <CategoryTemplate
          items={items}
          Templete={template}
          section={"Category"}
        />
    </>
  );
};
