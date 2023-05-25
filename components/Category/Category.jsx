import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Link from "next/link";
import { productDataConverter } from "../../services/dataService";
import { compose } from "redux";
import { useDispatch } from "react-redux";

import FourColGridTemplate from "../Shop/FourColGridTemplate";
import FiveColGridTemplate from "../Shop/FiveColGridTemplate";
import SixColGridTemplate from "../Shop/SixColGridTemplate";
import MoreItemsToConsider from "../Shop/MoreItemsToConsider";
import RecentlyViewItem from "../Shop/RecentlyViewItem";
import { useRouter } from "next/router";
import {getAllCategories, getCategoriesByDepartment, getFeatureDepartment, getPantry} from "../lib/endpoints";
import CategoryTemplate from "./CategoryTemplate";
import { InfinitySpin } from "react-loader-spinner";
import department from "../../repositories/department";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

function Category({ section,fourView, fiveView, sixView,oneView, moreItems, offerItems }) {
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
    : oneView ?
     OneColGridTemplate
    : "";
  const clickEvent = (e) => {
    console.log(e);
  };
  const GetProducts = (stringUrl, price1, stPageNo) => {
    let apiUrl = section == 'department' ? getFeatureDepartment :
        section == 'pantry_category' ? getPantry :
        section == 'department-wise-product' ? getCategoriesByDepartment + router.query.dept_id  : getAllCategories

    let mainUrl = router.pathname.match('department-wise-product') ? apiUrl + "?page=" + stPageNo + stringUrl + '&platform=web' : apiUrl + "?page=" + stPageNo + stringUrl;

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        const mergeDate = [...items, ...res];
        console.log(mergeDate);
        setItems(mergeDate);
        console.log("dd", items);

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
    console.log(items);
    GetProducts(stringUrl, stPageNo);
  };

  const GetProductsFirst = useCallback((stringUrl) => {
    setPageNo(1);
    let apiUrl = section == 'department' ? getFeatureDepartment :
        section == 'pantry_category' ? getPantry :
        section = 'department-wise-product'  ? getCategoriesByDepartment + router.query.dept_id : getAllCategories

    let mainUrl = router.pathname.match('department-wise-product')  ? apiUrl + "?page=" + pageNo + stringUrl + '&platform=web' :  apiUrl + "?parent_id=0&page=" + pageNo + stringUrl;

    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {

        settotalCount(res.meta?.total);
        setItems(res.data);
        console.log(res)

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
        (key) => (strUrl = strUrl + "&" + key + "=" + router.query[key])
      );

      if(section == 'department'  ){
        dispatch({
          type: "setBredCumbdata",
          payload: {
            name1: "All Featured Department",
            link1: "/all-featured-department",
            name2: "",
            link2: "",
            name3: "",
            link3: "",
            name4: "",
            link4: "",
          },
        });
      }else if(section == 'pantry_category' ) {
        dispatch({
          type: "setBredCumbdata",
          payload: {
            name1: "All Pantry Category",
            link1: "/pantry",
            name2: "",
            link2: "",
            name3: "",
            link3: "",
            name4: "",
            link4: "",
          },
        });
      }else if(section == 'department-wise-category') {
        dispatch({
          type: "setBredCumbdata",
          payload: {
            name1: "Department Category",
            link1: "/department-wise-category?dept_id="+ router.query.dept_id,
            name2: "",
            link2: "",
            name3: "",
            link3: "",
            name4: "",
            link4: "",
          },
        });
      }

      else{
        dispatch({
          type: "setBredCumbdata",
          payload: {
            name1: "All Category",
            link1: "/all-category",
            name2: "",
            link2: "",
            name3: "",
            link3: "",
            name4: "",
            link4: "",
          },
        });
      }


      const delayDebounceFn = setTimeout(() => {
        GetProductsFirst(strUrl);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
      //getProductList(strUrl, price)
      
    }
  }, [router.asPath]);

  const fetchMoreData = () => {
    if (router.asPath) {

      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = strUrl + "&" + key + "=" + router.query[key])
      );
      if (items.length < totalCount) {

        getProductList(strUrl);
      }
    }
  };
  return (
    <>
      {isLoading && items.length == 0 && (
        <div className="loader-testing">
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
        endMessage={""}
      >
        <CategoryTemplate items={items} Templete={template} section={'department'} />
      </InfiniteScroll>

      <>
        <MoreItemsToConsider
          HeaderText={"More Items To Consider"}
          data={productDataConverter(moreItems.data)}
          url={""}
        />
        <MoreItemsToConsider
          HeaderText={"Sponsored Items"}
          data={productDataConverter(offerItems.data)}
          url={""}
        />
        <RecentlyViewItem />
      </>
    </>
  );
}

export default Category;

// export default Shop;
