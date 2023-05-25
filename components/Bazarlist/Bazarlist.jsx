import React from "react";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import BazarlistProductModel from "./BazarlistProductModel";

const Bazarlist = () => {
  return (
    <>
      <BazarlistProductModel />
      <MoreItemsToConsider
        HeaderText={"More Items To Consider"}
        data={[]}
        url={""}
      />
      <RecentlyViewItem />
    </>
  );
};

export default Bazarlist;
