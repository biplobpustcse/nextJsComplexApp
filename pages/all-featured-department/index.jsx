import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Brand from "../../components/AllBrand/Brand";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import { SslFooter } from "../../components/Footer/SslFooter";
import SslFooter2 from "../../components/Footer/SslFooter2";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import {
    getHomeSliders,
    getMoreItems,
    getOfferItems,
} from "../../components/lib/endpoints";
import QuickView from "../../components/Product/QuickView";

import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import { baseUrl, http } from "../../services/httpService";
import Category from "../../components/Category/Category";
import Custom404 from "../404";
const index = ({ sliders, moreItems, offerItems, getError }) => {
    // const store = useSelector((state) => state.productPrice);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isVisibileError, setIsVisibleError] = useState(false);
    const [price, setPrice] = useState([0, 20000]);

    const [fourView, setfourView] = useState(false);
    const [fiveView, setfiveView] = useState(true);
    const [sixView, setsixView] = useState(false);

    // const GetShopNavItem = (url) => {
    //   http.get({
    //     url: url,
    //     before: () => {
    //       setIsLoading(true);
    //     },
    //     successed: (res) => {

    //       setShopNavCategory(res);
    //       const updatedList = [];
    //       {res.length > 0 &&
    //         res.map((slide) => {
    //         if(slide.banner !=''){
    //           updatedList.push(slide.banner);
    //         }})
    //       setSliders(updatedList);
    //       }
    //       setIsLoading(false);
    //     },
    //     failed: () => {
    //       setIsLoading(false);
    //       setIsVisibleError(true);
    //     },
    //   });
    // };

    // useEffect(() => {
    //   const url = props.router.query?.dept_id
    //     ? getCategoriesByDepartment + props.router.query?.dept_id
    //     : getCategoriesById + props.router.query?.cat_id;
    //   GetShopNavItem(url);

    // }, [router.asPath]);

    const handleClick = (event, isview) => {
        if (isview == "four") {
            setfourView(true);
            setfiveView(false);
            setsixView(false);
        } else if (isview == "five") {
            setfourView(false);
            setfiveView(true);
            setsixView(false);
        } else if (isview == "six") {
            setfourView(false);
            setfiveView(false);
            setsixView(true);
        } else {
            setfourView(false);
            setfiveView(false);
            setsixView(false);
        }
    };
    if (getError) {
        return <Custom404 />;
    }
    return (
        <>
            <SliderMain2 sliders={sliders?.home_slider_images} />
            <ShopProductShorting
                handleClick={handleClick}
                setPrice={setPrice}
                price={price}
                showPrice={false}
                showRevalance={true}
                showBrands={false}
                viewAsFormat={1}
            />
            {/*<Brand*/}
            {/*    fourView={fourView}*/}
            {/*    fiveView={fiveView}*/}
            {/*    sixView={sixView}*/}
            {/*    moreItems={moreItems}*/}
            {/*    offerItems={offerItems}*/}
            {/*/>*/}

            <Category
                fourView={fourView}
                fiveView={fiveView}
                sixView={sixView}
                section={'department'}
                moreItems={moreItems}
                offerItems={offerItems}
            />

            {/* <MoreItemsToConsider HeaderText={"More Items To Consider"} data={[]} url={""}/>

   <RecentlyViewItem/> */}
            <SecondFooter />
            <SslFooter2 />
            <QuickView />
        </>
    );
};

export default index;

export async function getServerSideProps(context) {
    let sliders,
        moreItems,
        offerItems,
        getError = false;
    let endpoints = [
        baseUrl + "/" + getHomeSliders,
        baseUrl + "/" + getMoreItems,
        baseUrl + "/" + getOfferItems,
    ];

    try {
        await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
            Axios.spread(
                (
                    { data: sliderData },
                    { data: moreProducts },
                    { data: offerProducts }
                ) => {
                    sliders = sliderData;
                    moreItems = moreProducts;

                    offerItems = offerProducts;
                }
            )
        );
    } catch (error) {
        sliders = null;
        moreItems = null;
        offerItems = null;
        getError = true;
    }

    return {
        props: { sliders, moreItems, offerItems, getError }, // will be passed to the page component as props
    };
}
