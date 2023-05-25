import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import Orders from "../../components/Profile/Orders";
import ProfileLayout from "../../components/Profile/ProfileLayout";

const index = () => {
  return (
    <>
      <ProfileLayout
        Template={Orders}
        HeaderTemplate={CommonHeader}
        text={"Orders"}
      />
    </>
  );
};

export default index;
