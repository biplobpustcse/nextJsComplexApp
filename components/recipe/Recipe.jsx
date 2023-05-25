import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import {
  getRecipe,
  getRecipeByCategory,
  getRecipeById,
} from "../lib/endpoints";

import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import FiveColGridTemplate from "./FiveColGridTemplate";
import FourColGridTemplate from "./FourColGridTemplate";
import RecipeProductTemplate from "./RecipeProductTemplate";
import SixColGridTemplate from "./SixColGridTemplate";

function Recipe({ fourView, fiveView, sixView, moreItems }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  // const totalCount = 5;
  let start = 0; //page let page_limit=10;
  const apiPath = "https://api.escuelajs.co/api/v1/products";
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
    : "";

  const GetProducts = (stPageNo) => {
    let mainUrl = getRecipe + "?page=" + stPageNo;

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(false);
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
    const finalUrl = apiPath + queryParam;
    GetProducts(stPageNo);
  };

  const GetProductsFirst = useCallback((strUrl) => {
    let mainUrl = getRecipe + "?page=" + pageNo;
    setPageNo(1);
    if (strUrl != "") {
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

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length < totalCount}
        loader={<h4>...</h4>}
        endMessage={""}
      >
        <RecipeProductTemplate products={products} Templete={template} />
      </InfiniteScroll>
      <>
        <MoreItemsToConsider
          HeaderText={"More Items To Consider"}
          data={moreItems.data}
          url={""}
        />
        <RecentlyViewItem />
      </>
    </>
  );
}

export default Recipe;
