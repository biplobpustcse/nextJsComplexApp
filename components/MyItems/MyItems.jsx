import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productDataConverter } from "../../services/dataService";
import SingleCelebration from "../Celebration/SingleCelebration";
import ThreeColGridTemplate from "../Celebration/ThreeColGridTemplate";
import TwoColGridTemplate from "../Celebration/TwoColGridTemplate";
import ProductInfoModel from "../Product/ProductInfoModel";
import FourColGridTemplate from "../Shop/FourColGridTemplate";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import ShopProductTemplete from "../Shop/ShopProductTemplete";

const MyItems = ({
  moreItems,
  twoView,
  threeView,
  reorderItemList,
  fourView,
}) => {
  const template = twoView
    ? TwoColGridTemplate
    : threeView
    ? ThreeColGridTemplate
    : fourView
    ? FourColGridTemplate
    : "";
  return (
    <>
      <ShopProductTemplete
        products={reorderItemList.result.data}
        Templete={template}
        Templete2={ProductInfoModel}
      />

      <MoreItemsToConsider
        HeaderText={"More Items To Consider"}
        data={moreItems}
        url={""}
      />
      <RecentlyViewItem />
    </>
  );
};

export default MyItems;
