import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Link from "next/link";
import { productDataConverter } from "../../services/dataService";
import { compose } from "redux";
import { useDispatch } from "react-redux";
import BrandTemplate from "./BrandTemplate";
import FourColGridTemplate from "../Shop/FourColGridTemplate";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";
import SixColGridTemplate from "../Shop/SixColGridTemplate";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import { useRouter } from "next/router";
import { getBrandStore } from "../lib/endpoints";
import { InfinitySpin } from "react-loader-spinner";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

function Brand({ oneView,fourView, fiveView, sixView, moreItems, offerItems }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState("");
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [totalCount, settotalCount] = useState(0);

  //const totalCount = 50;
  let start = 1; //page let page_limit=10;
  const apiPath = "https://api.escuelajs.co/api/v1/items";
  const [items, setItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [page_limit, setPageLimit] = useState(0);

  const template = fourView
    ? FourColGridTemplate
    : fiveView
    ? FiveColGridTemplate
    : sixView
    ? SixColGridTemplate
    : oneView ? OneColGridTemplate
    : "";
  const clickEvent = (e) => {
    console.log(e);
  };
  const GetProducts = (stringUrl, stPageNo,price1 ) => {
    let mainUrl = getBrandStore + "?page=" + stPageNo + stringUrl;

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        const mergeDate = [...items, ...res];
        setItems(mergeDate);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };
  const getProductList = (stringUrl) => {
    //var st = page_limit == 0 ? start : page_limit + 1;
    var stPageNo = pageNo + 1;
    setPageNo(stPageNo);
    var end = page_limit + 10; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    const queryParam = "?offset=" + stPageNo + "&limit=" + end;
    const finalUrl = apiPath + queryParam;
    GetProducts(stringUrl, stPageNo);
  };

  const GetProductsFirst = useCallback((stringUrl) => {
    setPageNo(1);
    let mainUrl = getBrandStore + "?page=" + pageNo + stringUrl;
    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        settotalCount(res.meta?.total);
        setItems(res.data);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    // if (query) getProductList();
    if (router.asPath) {
      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = strUrl + "&" + key + "=" + router.query[key])
      );
      // setTimeout(() => {
      //   GetProductsFirst(strUrl, price);
      // }, 1000);

      dispatch({
        type: "setBredCumbdata",
        payload: {
          name1: "Brand",
          link1: "",
          name2: "",
          link2: "",
          name3: "",
          link3: "",
          name4: "",
          link4: "",
        },
      });

      // const delayDebounceFn = setTimeout(() => {
        GetProductsFirst(strUrl);
      // }, 600);
      // return () => clearTimeout(delayDebounceFn);
      //getProductList(strUrl, price)
    }
  }, [router.asPath]);

  const fetchMoreData = () => {
    if (router.asPath) {
      console.log("fetch");

      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = strUrl + "&" + key + "=" + router.query[key])
      );
      if (items.length < totalCount) {
        setIsLoading(true)
        getProductList(strUrl);
      }
    }
  };
  return (

    <>
      {isLoading && items.length == 0 && (
        <div className="loader-testing " >
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < totalCount}
        loader={isLoading && (
            <div className={'text-center'}>
              <InfinitySpin width="300" color="#004a96" />
            </div>
        )}
        endMessage={
          <>
            <MoreItemsToConsider
                HeaderText={"More Items To Consider"}
                data={moreItems.data}
                url={""}
            />
            <MoreItemsToConsider
                HeaderText={"Sponsored Items"}
                data={offerItems.data}
                url={""}
            />
            <RecentlyViewItem />
          </>
        }
      >
        <BrandTemplate items={items} Templete={template} />
      </InfiniteScroll>


    </>
  );
}

export default Brand;

// export default Shop;
