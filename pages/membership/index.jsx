import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import { SslFooter } from "../../components/Footer/SslFooter";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import {
  discountPartnerList,
  getHomeSliders,
  getMembershipType,
} from "../../components/lib/endpoints";
import CardDiscountPartner from "../../components/Membership/CardDiscountPartner";
import JoinMembershipTemplate from "../../components/Membership/JoinMembershipTemplate";
import RegisterMembershipTemplate from "../../components/Membership/RegisterMembershipTemplate";
import RenewMembershipTemplate from "../../components/Membership/RenewMembershipTemplate";

import { baseUrl, http } from "../../services/httpService";
import Custom404 from "../404";

function index({
  homeSliderData,
  memberShipData,
  discountPartnerData,
  getError,
  discountPartnerImage,
}) {
  console.log({ discountPartnerData });
  console.log({ discountPartnerImage });
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState(
    homeSliderData?.membership_slider_images || []
  );
  // const GetHomeSliders = useCallback(() => {
  //   http.get({
  //     url: getHomeSliders,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setSliders(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   GetHomeSliders();
  // }, []);
  if (getError) {
    return <Custom404 />;
  }
  return (
    <>
      <SliderMain2 sliders={sliders} />
      <JoinMembershipTemplate memberShipData={memberShipData.data} />
      <CardDiscountPartner
        discountPartnerData={discountPartnerData.result}
        discountPartnerImage={discountPartnerImage ?? []}
      />
      <RegisterMembershipTemplate />
      <RenewMembershipTemplate />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}

export default index;
export async function getServerSideProps(context) {
  const router = context.params?.id;
  let product,
    moreItems,
    relatedItems,
    offerItems,
    homeSliderData,
    discountPartnerData,
    discountPartnerImage,
    memberShipData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getHomeSliders,
    baseUrl + "/" + getMembershipType,
    baseUrl + "/" + discountPartnerList,
    baseUrl + "/" + "membership-discount-partners-image",
  ];

  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(
        (
          { data: homeSliders },
          { data: memberShipDatas },
          { data: discountData },
          { data: discountPartnerImages }
        ) => {
          console.log({ discountPartnerImages });
          homeSliderData = homeSliders;
          memberShipData = memberShipDatas;
          discountPartnerData = discountData;
          discountPartnerImage = discountPartnerImages?.result ?? [];
        }
      )
    );
  } catch (error) {
    homeSliderData = null;
    memberShipData = null;
    discountPartnerData = null;
    discountPartnerImage = null;
    getError = true;
  }

  return {
    props: {
      homeSliderData,
      memberShipData,
      discountPartnerData,
      discountPartnerImage,
    }, // will be passed to the page component as props
  };
}
