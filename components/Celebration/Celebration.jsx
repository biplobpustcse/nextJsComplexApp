import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import { getEventWiseProduct } from "../lib/endpoints";
import ProductInfoModel from "../Product/ProductInfoModel";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";
import FourColGridTemplate from "../Shop/FourColGridTemplate";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import ShopProductTemplete from "../Shop/ShopProductTemplete";
import SingleCelebration from "./SingleCelebration";
import ThreeColGridTemplate from "./ThreeColGridTemplate";
import TwoColGridTemplate from "./TwoColGridTemplate";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

function Celebration({ price,oneView, twoView, threeView, moreItems }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState("");
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [totalCount, settotalCount] = useState(0);

  let start = 1;
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [page_limit, setPageLimit] = useState(0);
  const template = twoView
    ? TwoColGridTemplate
    : threeView
    ? ThreeColGridTemplate
    :  oneView ? OneColGridTemplate :  "";

  const GetProducts = (stringUrl, price1, stPageNo) => {
    let mainUrl =
      getEventWiseProduct + router.query.id + "?page=" + stPageNo + stringUrl;

    // if (price1[0] !== undefined && price1[1] !== undefined) {
    //   mainUrl = mainUrl + "&min_price=" + price1[0] + "&max_price=" + price1[1];
    // }
    // if(price1[1] == 20000){
    //   return
    // }
    console.log("strurl", mainUrl);
    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        //setProducts(prevState=> [...prevState],res)

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
  const getProductList = (stringUrl, price1) => {
    var stPageNo = pageNo + 1;
    setPageNo(stPageNo);
    var end = page_limit + 15; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    const queryParam = "?offset=" + stPageNo + "&limit=" + end;
    //   const finalUrl = apiPath + queryParam;

    GetProducts(stringUrl, price1, stPageNo);
  };

  const GetProductsFirst = useCallback((stringUrl, id, price1) => {
    setPageNo(1);
    let mainUrl = getEventWiseProduct + id + "?page=" + pageNo + stringUrl; //+ pageNo

    // if (
    //   price1[0] !== undefined &&
    //   price1[1] !== undefined &&
    //   price1[1] != 20000
    // ) {
    //   mainUrl = mainUrl + "&min_price=" + price1[0] + "&max_price=" + price1[1];
    // }
    console.log("mainUrl", mainUrl);
    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        console.log(res, "wow");
        if (res.success == true) {
          settotalCount(res.meta?.total);
          setProducts(res.data);
        }

        // const minprice = res.min_price;
        // const maxprice = res.max_price;
        // dispatch({
        //   type: "SET_PRODUCT_PRICE",
        //   payload: [minprice, maxprice],
        // });

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    // if(Object.keys(router.query).length!=1){}
    if (router.asPath) {
      let strUrl = "?";
      let tifOptions = Object.keys(router.query).map(
        (key) =>
          (strUrl =
            key == "id" ? "" : strUrl + "&" + key + "=" + router.query[key])
      );
      router.query.id;
      const delayDebounceFn = setTimeout(() => {
        GetProductsFirst(strUrl, router.query.id, price);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [router.asPath, price]);

  const fetchMoreData = () => {
    if (router.asPath) {
      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) =>
          (strUrl =
            key == "id" ? "" : strUrl + "&" + key + "=" + router.query[key])
      );
      if (products.length < totalCount) {
        getProductList(strUrl, price);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loader-testing">
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length < totalCount}
        loader={<h4>...</h4>}
        endMessage={""}
      >
        <ShopProductTemplete
          products={products}
          Templete={template}
          Templete2={SingleCelebration}
        />
      </InfiniteScroll>
      <>
        <MoreItemsToConsider
          HeaderText={"More Items To Consider"}
          data={moreItems}
          url={""}
        />
        <RecentlyViewItem />
      </>
    </>
  );
}

export default Celebration;
