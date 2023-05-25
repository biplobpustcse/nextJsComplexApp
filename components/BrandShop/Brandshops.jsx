import { Router, useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfinitySpin } from "react-loader-spinner";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import { getAllShops, getRecipe, getRecipeByCategory } from "../lib/endpoints";
import RecipeProductTemplate from "../recipe/RecipeProductTemplate";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";
import FourColGridTemplate from "../Shop/FourColGridTemplate";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import SixColGridTemplate from "../Shop/SixColGridTemplate";
import BrandTemplate from "./BrandTemplate";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

function Brandshops({ oneView,fourView, fiveView, sixView, moreItems }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  // const totalCount = 5;
  let start = 0; //page let page_limit=10;
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [page_limit, setPageLimit] = useState(0);
  const [product, setState] = useState(0);
  const [totalCount, settotalCount] = useState(0);

  const template = fourView
    ? FourColGridTemplate
    : fiveView
    ? FiveColGridTemplate
    : sixView
    ? SixColGridTemplate
    : oneView ? OneColGridTemplate : "";

  const GetProducts = (stPageNo) => {
    let mainUrl = router.query.hasOwnProperty('brand_store') ?  getAllShops + "?platform=web&brand_store="+router.query.brand_store+"&page=" + stPageNo
                                                                :  getAllShops + "?page=" + stPageNo;

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        const mergeDate = [...products, ...res];
        setProducts(mergeDate);

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };
  const getProductList = () => {
    //var st = page_limit == 0 ? start : page_limit + 1;
    var stPageNo = pageNo + 1;
    setPageNo(stPageNo);
    var end = page_limit + 10; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    const queryParam = "?offset=" + stPageNo + "&limit=" + end;

    GetProducts(stPageNo);
  };

  const GetProductsFirst = useCallback((strUrl) => {
    let mainUrl = router.query.hasOwnProperty('brand_store') ? getAllShops + "?platform=web&brand_store="+router.query.brand_store+"&page=" + pageNo
                                                                : getAllShops + "?page=" + pageNo;

    setPageNo(1);
    if (strUrl != "" && !router.query.hasOwnProperty('brand_store')) {
      mainUrl = getRecipeByCategory + strUrl;
    }

    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(false);
      },
      successed: (res) => {
        settotalCount(res.meta?.total);
        setProducts(res.data);

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    if (router.asPath) {
      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = router.query[key])
      );
      GetProductsFirst(strUrl);
    }
  }, [router.asPath]);

  const fetchMoreData = () => {
    getProductList();
  };
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getElement = document.getElementById("logoClick");

    document.body.addEventListener("click", () => {
      Router.events.on("routeChangeStart", (url) => {
        //this.setState({ isLoading: true });
        setLoader(true);
        console.log("router change");
      });
      Router.events.on("routeChangeComplete", (url) => {
        //this.setState({ isLoading: false });
        // setTimeout(() => {
        //   setLoader(false);
        // }, [1000]);
        setLoader(false);
        console.log("router change complete");
      });
    });
  }, [Router]);
  return (
    <>
      {loader && products.length == 0 && (
        <div className="loader-testing">
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length < totalCount}
        loader={isLoading && (
            <div className={'text-center'}>
              <InfinitySpin width="300" color="#004a96" />
            </div>
        )}
        endMessage={<>
          <MoreItemsToConsider
              HeaderText={"More Items To Consider"}
              data={moreItems}
              url={""}
          />
          <RecentlyViewItem />
        </>}
      >
        <BrandTemplate products={products} Templete={template} />
      </InfiniteScroll>

    </>
  );
}

export default Brandshops;
