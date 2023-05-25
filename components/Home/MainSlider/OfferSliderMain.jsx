import { AlwaysOfferMain } from "../../../utils/slider";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { http } from "../../../services/httpService";
import { collectionList, getHomeSliderProduct } from "../../lib/endpoints";
import Slider from "../../../utils/Slider/Slider";
import OfferSliderChildren from "./OfferSliderChildren";

function OfferSliderMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [offerSliders, setOfferSliders] = useState([]);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [dynamicPromo, setDynamicPromo] = useState([]);

  const GetHomeOfferSliders = useCallback(() => {
    http.get({
      url: getHomeSliderProduct,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        let offer = [];
        let dynamicText = [];
        offer = res;

        res.homeSliderText?.map((item) => {
          dynamicText.push({
            dynamicPromo: item,
          });
        });
        // products
        let products = res?.homeSliderProduct?.data?.map((item) => {
          item.url = `/product/${item.id}`;
          return item;
        });

        products = products?.filter(
          (item) => parseInt(item.stroked_price) !== parseInt(item.main_price)
        );

        /// offers
        let offers = res?.homeSliderOffer?.map((item) => {
          item.url = `/offer/${item.id}`;
          return item;
        });

        // offer.push({ name: "Ramadan Offer", thumbnail_image: "" });
        setOfferSliders([...offers, ...products, ...dynamicText]);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    GetHomeOfferSliders();
  }, [GetHomeOfferSliders]);

  console.log({ offerSliders });

  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 10,
    width: "100%",
    pagination: false,
    gap: "10px",
    breakpoints: {
      375: {
        perPage: 1,
        gap: "0px",
      },
      576: {
        perPage: 1,
        gap: "0px",
      },
      768: {
        perPage: 2,
      },
      991: {
        perPage: 3,
        gap: "10px",
      },
      992: {
        perPage: 3,
        gap: "10px",
      },
      1024: {
        perPage: 3,
        gap: "10px",
      },
      1200: {
        perPage: 5,
        gap: "10px",
      },
      1366: {
        perPage: 7,
        gap: "10px",
      },
      1600: {
        perPage: 8,
        gap: "10px",
      },
      1750: {
        perPage: 8,
        gap: "10px",
      },
      1920: {
        perPage: 10,
        gap: "10px",
      },
    },
  };

  return (
    <div className="offer-slider-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="always-offer-main">
              {offerSliders.length > 2 && (
                <Slider
                  options={options}
                  Template={OfferSliderChildren}
                  data={offerSliders}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <AlwaysOfferMain /> */}
    </div>
  );
}

export default OfferSliderMain;
