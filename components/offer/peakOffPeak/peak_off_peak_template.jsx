import React, {useCallback, useEffect, useState} from "react";
import {http} from "../../../services/httpService";
import InfiniteScroll from "react-infinite-scroll-component";
import {productDataConverter} from "../../../services/dataService";
import FourColGridTemplate from "../../Shop/FourColGridTemplate";
import {compose} from "redux";
import MoreItemsToConsider from "../../Shop/MoreItemsToConsider";
import {useDispatch} from "react-redux";
import SixColGridTemplate from "../../Shop/SixColGridTemplate";
import FiveColGridTemplate from "../../Shop/FiveColGridTemplate";
import OneColGridTemplate from "../../Shop/OneColGridTemplate";
import RecentlyViewItem from "../../Shop/RecentlyViewItem";
import ProductInfoModel from "../../Product/ProductInfoModel";
import PeakOffPeakComponent from "./peak_off_peak_component";
import {withRouter} from "next/router";
import {warn} from "next/dist/build/output/log";
import {InfinitySpin} from "react-loader-spinner";
import TwoColGridTemplate from "../../Shop/TwoColGridTemplate";
import ThreeColGridTemplate from "../../Shop/threeColGridTemplate";

function PeakOffPeakTemplate({
                                 price,
                                 router,
                                 oneView,
                                 twoView,
                                 threeView,
                                 moreItems,
                             }) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [sliders, setSliders] = useState("");
    const [isVisibileError, setIsVisibleError] = useState(false);

    const [totalCount, settotalCount] = useState(0);

    //const totalCount = 50;
    let start = 1; //page let page_limit=10;
    const apiPath = "https://api.escuelajs.co/api/v1/products";
    const [products, setProducts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [page_limit, setPageLimit] = useState(0);

    const template = oneView
        ? OneColGridTemplate
        : twoView
            ? TwoColGridTemplate
            : threeView
                ? ThreeColGridTemplate
                : "";
    const clickEvent = (e) => {
        console.log(e);
    };
    const GetProducts = (stringUrl, price1, stPageNo) => {
        let mainUrl =
            "product-all-promotion?type=peak-off-peak&page=" + stPageNo + stringUrl;

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


                let mergeDate = [...products, ...productDataConverter(res.data)];
                mergeDate = mergeDate.map(item => {(item.isPeak = true)
                return item;
                });
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
        let mainUrl =
            "product-all-promotion?type=peak-off-peak&page=" + pageNo + stringUrl;

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
                settotalCount(res.total);
                //modify data for frontend
                if (res.data.data.length > 0) {
                    console.log(res.data, "merge");
                    res.data.data = res.data.data.map(item => {
                        item.isPeak = true
                        return item
                    });
                    console.log(res.data, "mergeee");

                    setProducts(productDataConverter(res.data.data));

                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }

                const minprice = res.min_price;
                const maxprice = res.max_price;
                dispatch({
                    type: "SET_PRODUCT_PRICE",
                    payload: [minprice, maxprice],
                });
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
                    name1: "cut off price",
                    link1: "/offer/peak-of-peak",
                    name2: "",
                    link2: "",
                    name3: "",
                    link3: "",
                    name4: "",
                    link4: "",
                },
            });

            const delayDebounceFn = setTimeout(() => {
                GetProductsFirst(strUrl, price);
            }, 1000);
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
                getProductList(strUrl, price);
            }
        }
    };
    console.log({products}, 'ahhhh')

    return (
        <>
            {isLoading && products.length == 0 && (
                <div className="loader-testing">
                    <InfinitySpin width="300" color="#004a96"/>
                </div>
            )}
            <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={products.length < totalCount}
                loader={isLoading && (
                    <div className={'text-center'}>
                        <InfinitySpin width="300" color="#004a96"/>
                    </div>
                )}
                endMessage={""}
            >
                <PeakOffPeakComponent
                    products={products}
                    Templete={template}
                    Templete2={ProductInfoModel}
                    section={'peak_off_peak'}
                />
            </InfiniteScroll>
            <>
                {/*<MoreItemsToConsider*/}
                {/*    HeaderText={"More Items To Consider"}*/}
                {/*    data={moreItems || []}*/}
                {/*    url={""}*/}
                {/*/>*/}
                {/*<RecentlyViewItem />*/}
            </>
        </>
    );
}

export default compose(withRouter)(PeakOffPeakTemplate);

// export default Shop;
