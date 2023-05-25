import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import PasswordChange from "../../components/Profile/PasswordChange";
import ProfileLayout from "../../components/Profile/ProfileLayout";

const index = () => {
  return (
    <>
      <ProfileLayout
        Template={PasswordChange}
        HeaderTemplate={CommonHeader}
        text={"Password Change"}
      />
    </>
  );
};

export default index;
