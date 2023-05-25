import Axios from "axios";
import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Shipping from "../../components/Profile/Shipping";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { baseUrl } from "../../services/httpService";
import { getSavedAdrs } from "../../components/lib/endpoints";
import Custom404 from "../404";
const index = ({ getSavedAddress, getError }) => {
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={Shipping}
        HeaderTemplate={CommonHeader}
        text={"Shipping"}
        data={getSavedAddress.data}
      />
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let getSavedAddress,
    getError = false;

  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    let responseSavedAddress = await Axios.get(baseUrl + "/" + getSavedAdrs, {
      headers: {
        Authorization: "Bearer " + authData.access_token,
      },
    });
    getSavedAddress = await JSON.parse(
      JSON.stringify(responseSavedAddress.data)
    );
  } catch (error) {
    getError = true;
    getSavedAddress = null;
  }
  return {
    props: { getSavedAddress, getError }, // will be passed to the page component as props
  };
}
