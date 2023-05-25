import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  productDataConverter,
  productSortOrdering,
} from "../../services/dataService";
import FourColGridTemplate from "./FourColGridTemplate";
import ShopProductTemplete from "./ShopProductTemplete";
import { useRouter, withRouter } from "next/router";
import { compose } from "redux";
import MoreItemsToConsider from "./MoreItemsToConsider";
import { useDispatch } from "react-redux";
import SixColGridTemplate from "./SixColGridTemplate";
import FiveColGridTemplate from "./FiveColGridTemplate";
import OneColGridTemplate from "./OneColGridTemplate";

import RecentlyViewItem from "./RecentlyViewItem";
import ProductInfoModel from "../Product/ProductInfoModel";
import CategoryDesciption from "./CategoryDesciption";
import MoreCategories from "./MoreCategories";
import RelatedCategoriesIn from "./RelatedCategoriesIn";
import { toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";

function Shop({
  price,
  router,
  oneView,
  fourView,
  fiveView,
  sixView,
  moreItems,
  offerItems,
  relatedItems,
  categories,
  moreCat,
  description,
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState("");
  const [isVisibileError, setIsVisibleError] = useState(false);
  let [hasMore, setHasMore] = useState(true);
  const [totalCount, settotalCount] = useState(0);

  //const totalCount = 50;
  let start = 1; //page let page_limit=10;
  const apiPath = "https://api.escuelajs.co/api/v1/products";
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [page_limit, setPageLimit] = useState(0);

  let [productList, setProductList] = useState({
    out_of_stock_products: [],
    available_stock_products: [],
  });

  const template = fourView
    ? FourColGridTemplate
    : fiveView
    ? FiveColGridTemplate
    : sixView
    ? SixColGridTemplate
    : oneView
    ? OneColGridTemplate
    : "";

  const clickEvent = (e) => {
    console.log(e);
  };

  const GetProducts = (stringUrl, price1, stPageNo) => {
    let mainUrl = "products?page=" + stPageNo + stringUrl;

    if (price1[0] !== undefined && price1[1] !== undefined) {
      mainUrl = mainUrl + "&min_price=" + price1[0] + "&max_price=" + price1[1];
    }
    // if(price1[1] == 20000){
    //   return
    // }

    http.get({
      url: mainUrl,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        //setProducts(prevState=> [...prevState],res)
        const mergeDate = [...products, ...res];
        let { inStockProducts, outOfStockProducts } =
          productSortOrdering(mergeDate);
        // setProducts(filterSortProduct(mergeDate));
        setProductList({
          out_of_stock_products: outOfStockProducts,
          available_stock_products: inStockProducts,
        });
        console.log(
          res,
          "============================================================================================"
        );
        // if (res?.length > 0) {
        //   setProducts(inStockProducts);
        // } else {
        //   setProducts([
        //     ...productList.available_stock_products,
        //     ...productList.out_of_stock_products,
        //   ]);
        //   setHasMore(false);
        // }
        setProducts(mergeDate);
        if (mergeDate.length === 0) {
          toast.error("No Product Found.");
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };
  const getProductList = (stringUrl, price1) => {
    setIsLoading(true);
    //var st = page_limit == 0 ? start : page_limit + 1;
    var stPageNo = pageNo + 1;
    setPageNo(stPageNo);
    var end = page_limit + 10; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    const queryParam = "?offset=" + stPageNo + "&limit=" + end;
    const finalUrl = apiPath + queryParam;

    GetProducts(stringUrl, price1, stPageNo);
  };

  const GetProductsFirst = useCallback((stringUrl, price1) => {
    setPageNo(1);
    let mainUrl = "products?page=" + pageNo + stringUrl;
    if (
      price1[0] !== undefined &&
      price1[1] !== undefined &&
      price1[1] != 20000
    ) {
      mainUrl = mainUrl + "&min_price=" + price1[0] + "&max_price=" + price1[1];
    }

    http.get1({
      url: mainUrl, //"products?page=0",
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        settotalCount(res.meta?.total);

        let { inStockProducts, outOfStockProducts } = productSortOrdering(
          res.data
        );
        // setProducts(filterSortProduct(mergeDate));
        setProductList({
          out_of_stock_products: outOfStockProducts,
          available_stock_products: inStockProducts,
        });

        // setProducts(filterSortProduct(res.data));
        // setProducts(inStockProducts);
        setProducts(res.data);
        const minprice = res.min_price;
        const maxprice = res.max_price;
        dispatch({
          type: "SET_PRODUCT_PRICE",
          payload: [minprice, maxprice],
        });
        console.log(res.data, "productData");
        if (res.data.length === 0) {
          setHasMore(false);
          toast.error("No Product Found.");
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  const filterSortProduct = (data) => {
    let placeholderImg = "placeholder";
    let available_stock_with_img = data.filter((value) => {
      if (value.stock > 0 && !value?.thumbnail_image.includes(placeholderImg)) {
        return value;
      }
    });

    let available_stock_without_img = data.filter((value) => {
      if (value.stock > 0 && value?.thumbnail_image.includes(placeholderImg)) {
        return value;
      }
    });
    let out_of_stock = data.filter((value) => {
      if (value.stock <= 0) {
        return value;
      }
    });

    let sort_product = [
      ...available_stock_with_img,
      ...available_stock_without_img,
      ...out_of_stock,
    ];

    return sort_product;
  };

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

      const delayDebounceFn = setTimeout(() => {
        GetProductsFirst(strUrl, price);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
      //getProductList(strUrl, price)
    }
  }, [router.asPath, price]);

  const fetchMoreData = () => {
    if (router.asPath) {
      let strUrl = "";
      let tifOptions = Object.keys(router.query).map(
        (key) => (strUrl = strUrl + "&" + key + "=" + router.query[key])
      );
      if (products.length < totalCount) {
        setIsLoading(true);
        getProductList(strUrl, price);
      }
    }
  };
  let notPermit =
    router.query.hasOwnProperty("flash_deal") ||
    router.query.hasOwnProperty("brand_id") ||
    router.query.hasOwnProperty("section_id") ||
    router.query.hasOwnProperty("search") ||
    router.query.hasOwnProperty("essential") ||
    (router.pathname == "/shop" && Object.keys(router.query).length == 0);

  return (
    <>
      {/*{isLoading && products.length == 0 && (*/}
      {/*  <div className="loader-testing">*/}
      {/*    <InfinitySpin width="300" color="#004a96" />*/}
      {/*  </div>*/}
      {/*)}*/}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          isLoading && (
            <div className={"text-center"}>
              <InfinitySpin width="300" color="#004a96" />
            </div>
          )
        }
        endMessage={
          <>
            <MoreItemsToConsider
              HeaderText={"More Items To Consider"}
              data={moreItems || []}
              url={""}
            />
            {offerItems.data != undefined && offerItems.data.length > 0 && (
              <MoreItemsToConsider
                HeaderText={"Sponsored items"}
                data={offerItems.data || []}
                url={""}
              />
            )}
            {relatedItems.data != undefined && relatedItems.data.length > 0 && (
              <MoreItemsToConsider
                HeaderText={"Similar items you might be like"}
                data={relatedItems.data || []}
                url={""}
              />
            )}
            <RecentlyViewItem />
          </>
        }
      >
        <ShopProductTemplete
          products={products}
          Templete={template}
          Templete2={ProductInfoModel}
        />
      </InfiniteScroll>

      {!notPermit && <RelatedCategoriesIn categories={categories} />}
      {!notPermit ? <MoreCategories data={moreCat} /> : ""}

      {description != null && description != "" ? (
        <CategoryDesciption description={description} />
      ) : (
        ""
      )}
    </>
  );
}

export default compose(withRouter)(Shop);
