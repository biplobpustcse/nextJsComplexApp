import React from "react";
import { useSelector } from "react-redux";
import QuickView from "../../components/Product/QuickView";
import CommonHeader from "../../components/Profile/CommonHeader";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Wishlist from "../../components/wishlist/Wishlist";

const index = () => {
  
  return (
    <>
      <ProfileLayout
        Template={Wishlist}
        HeaderTemplate={CommonHeader}
        text={"Wishlist"}
      />
      <QuickView />
    </>
  );
};

export default index;
