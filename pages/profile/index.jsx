import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import ProfileFrom from "../../components/Profile/ProfileFrom";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Custom404 from "../404";

const index = ({ authData, getError }) => {
  if (getError) {
    return <Custom404 />;
  }
  const hello = JSON.parse(authData);
  console.log({ hello });
  return (
    <>
      <ProfileLayout
        Template={ProfileFrom}
        HeaderTemplate={CommonHeader}
        text={"Profile"}
      />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let getError = false;
  let authData;
  try {
     authData = getCookie("auth", { req, res });
  } catch (error) {
    getError = true;
    authData = null;
  }

  return {
    props: { authData, getError }, // will be passed to the page component as props
  };
}
