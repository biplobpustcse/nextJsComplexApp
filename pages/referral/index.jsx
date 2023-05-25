import React from "react";
import CommonHeader from "../../components/Profile/CommonHeader";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import Referral from "../../components/Profile/Referral";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { baseUrl } from "../../services/httpService";
import {
  logsOfUserData,
  referralStats,
  withdrawHistory,
} from "../../components/lib/endpoints";
import Axios from "axios";
import Custom404 from "../404";

const index = ({ withdrawHisData, statsData, logsOfUserInfo, getError }) => {
  const data = [withdrawHisData.data, statsData.data, logsOfUserInfo.data];
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <ProfileLayout
        Template={Referral}
        HeaderTemplate={CommonHeader}
        text="Referral"
        data={data}
      />
      ;
    </>
  );
};

export default index;

export async function getServerSideProps({ req, res }) {
  let withdrawHisData,
    statsData,
    logsOfUserInfo,
    getError = false;
  let endpoints = [
    baseUrl + "/" + withdrawHistory,
    baseUrl + "/" + referralStats,
    baseUrl + "/" + logsOfUserData,
  ];
  try {
    const authData = JSON.parse(getCookie("auth", { req, res }));
    await Axios.all(
      endpoints.map((endpoint) =>
        Axios.get(endpoint, {
          headers: {
            Authorization: "Bearer " + authData.access_token,
          },
        })
      )
    ).then(
      Axios.spread(
        ({ data: withdrawHis }, { data: stats }, { data: logsOfUser }) => {
          withdrawHisData = withdrawHis;
          statsData = stats;
          logsOfUserInfo = logsOfUser;
        }
      )
    );
  } catch (error) {
    getError = true;
    withdrawHisData = null;
    statsData = null;
    logsOfUserInfo = null;
  }

  return {
    props: { withdrawHisData, statsData, logsOfUserInfo, getError }, // will be passed to the page component as props
  };
}
