import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import Carrer from "../../components/Carrer/Carrer";
import Shop from "../../components/Shop/Shop";
import React, { useCallback, useEffect, useState } from "react";
import { baseUrl, http } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  getHomeSliders,
  getCategoriesByDepartment,
  getCategoriesById,
  deleteBazarItem,
  getMoreItems,
  getrelatedProducts,
  getOfferItems,
  getCategory,
} from "../../components/lib/endpoints";

import { compose } from "redux";
import ShopCategoryNav from "../../components/Shop/ShopCategoryNav";

import { Router, useRouter, withRouter } from "next/router";
import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import FourColGridTemplate from "../../components/Shop/FourColGridTemplate";
import FiveColGridTemplate from "../../components/Shop/FiveColGridTemplate";
import SixColGridTemplate from "../../components/Shop/SixColGridTemplate";
import { SecondFooter } from "../../components/Footer/SecondFooter";
import { SslFooter } from "../../components/Footer/SslFooter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import QuickView from "../../components/Product/QuickView";
import { InfinitySpin } from "react-loader-spinner";
import Axios from "axios";
import Custom404 from "../404";
import ShopProductShorting2 from "../../components/Shop/ShopProductShorting2";

function Index(props) {
  const dispatch = useDispatch();
  console.log(props.MoreItems, "moreItems");

  const store = useSelector((state) => state.productPrice);
  // const store =StoreData?.bredCumbData;
  // const store1 =StoreData?.productPrice;
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [moreCat, setMoreCat] = useState([]);
  const [description, setDescription] = useState([]);
  const [shopNavCategory, setShopNavCategory] = useState([]);
  const router = useRouter();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [price, setPrice] = useState([0, 2000000]);

  const [oneView, setOneView] = useState(false);
  const [fourView, setfourView] = useState(false);
  const [fiveView, setfiveView] = useState(true);
  const [sixView, setsixView] = useState(false);

  console.log({ shopNavCategory });

  const GetHomeSliders = useCallback(() => {
    http.get({
      url: getHomeSliders,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        // setSliders(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  // useEffect(() => {
  //   GetHomeSliders();
  // }, [GetHomeSliders]);
  const getCategoryData = (id) => {
    http.get({
      url: getCategory + id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setSliders([res[0]?.banner]);
        setMoreCat(res[0]?.more_categories);

        setDescription(res[0]?.description);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };

  const GetShopNavItem = (url) => {
    http.get({
      url: url,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        if (res.length > 80) {
          setShopNavCategory(res.slice(0, 80));
        } else {
          setShopNavCategory(res);
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };

  useEffect(() => {
    const url = props.router.query?.dept_id
      ? getCategoriesByDepartment + props.router.query?.dept_id
      : props.router.query?.cat_id == undefined
      ? getCategoriesById + props.router.query?.section_id
      : getCategoriesById + props.router.query?.cat_id;
    GetShopNavItem(url);
    let cat_id =
      props.router.query?.dept_id != undefined
        ? props.router.query?.dept_id
        : props.router.query?.cat_id;
    getCategoryData(cat_id);
  }, [router.asPath]);

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
    } else if (isview == "one") {
      setOneView(true);
      setfourView(false);
      setfiveView(false);
      setsixView(false);
    } else {
      setfourView(false);
      setfiveView(false);
      setsixView(false);
    }
  };

  const getSectionData = (id) => {
    http.get({
      url: "page-section?id=" + id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        if (res.image != undefined) {
          setSliders([res?.image]);
        }

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    console.log(router, "leg");
    const getElement = document.getElementById("logoClick");
    if (router.query.hasOwnProperty("section_id")) {
      getSectionData(router.query.section_id);
    }
    document.body.addEventListener("click", () => {
      Router.events.on("routeChangeStart", (url) => {
        //this.setState({ isLoading: true });
        setLoader(true);
      });
      Router.events.on("routeChangeComplete", (url) => {
        //this.setState({ isLoading: false });
        // setTimeout(() => {
        setLoader(false);
        // }, [1000]);
      });
    });
  }, [Router]);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      if (window != undefined) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    return () => {
      router.events.off("routeChangeComplete", () => {});
    };
  }, [router.events]);

  if (props.getError) {
    return <Custom404 />;
  }
  let notPermit =
    router.query.hasOwnProperty("flash_deal") ||
    router.query.hasOwnProperty("brand_id") ||
    router.query.hasOwnProperty("search") ||
    router.query.hasOwnProperty("essential") ||
    (router.pathname == "/shop" && Object.keys(router.query).length == 0);
  return (
    <>
      {/*{loader && (*/}
      {/*  <div className="loader-testing">*/}
      {/*    <InfinitySpin width="300" color="#004a96" />*/}
      {/*  </div>*/}
      {/*)}*/}

      <>
        {!notPermit && sliders.length != 0 && <SliderMain2 sliders={sliders} />}

        {!notPermit && !router.query.hasOwnProperty("section_id") && (
          <ShopCategoryNav categories={shopNavCategory} />
        )}

        {/* {shopNavCategory.length > 0 && <ShopCategoryNav categories={shopNavCategory} />} */}
        {/* {price[1] > 0 && <ShopProductShorting handleClick={handleClick} setPrice={setPrice} price={price} />} */}

        <ShopProductShorting
          handleClick={handleClick}
          setPrice={setPrice}
          price={price}
          showPrice={true}
          showBrands={true}
          showRevalance={true}
          viewAsFormat={1}
        />

        <Shop
          price={price}
          fourView={fourView}
          fiveView={fiveView}
          sixView={sixView}
          oneView={oneView}
          moreItems={props.MoreItems.data}
          relatedItems={props.relatedItems}
          offerItems={props.offerItems}
          categories={shopNavCategory}
          moreCat={moreCat}
          description={description}
        />
      </>

      <SecondFooter />
      <SslFooter2 />
      <QuickView />
    </>
  );
}

// Index.getInitialProps = function (ctx) {
//   initialize(ctx);
// };
export default compose(
  withRouter,
  connect((state) => state)
)(Index);

export async function getServerSideProps({ req, res, query }) {
  let MoreItems,
    relatedItems,
    offerItems,
    getError = false;
  console.log({ query });
  try {
    if (query.dept_id != undefined) {
      let responseMoreItems = await Axios.get(
        baseUrl + "/" + getMoreItems + "category_id=" + query.dept_id
      );
      MoreItems = await JSON.parse(JSON.stringify(responseMoreItems.data));
    } else if (query.cat_id != undefined) {
      let responseMoreItems = await Axios.get(
        baseUrl + "/" + getMoreItems + "sub_category_id=" + query.cat_id
      );
      MoreItems = await JSON.parse(JSON.stringify(responseMoreItems.data));
    } else {
      MoreItems = [];
    }
    if (query.dept_id != undefined) {
      let releatedProducts = await Axios.get(
        baseUrl + "/" + getrelatedProducts + query.dept_id
      );
      relatedItems = await JSON.parse(JSON.stringify(releatedProducts.data));
    } else {
      relatedItems = [];
    }

    if (query.dept_id != undefined) {
      let offerProducts = await Axios.get(
        baseUrl + "/" + getOfferItems + "category_id=" + query.dept_id
      );
      offerItems = await JSON.parse(JSON.stringify(offerProducts.data));
    } else if (query.cat_id != undefined) {
      let offerProducts = await Axios.get(
        baseUrl + "/" + getOfferItems + "sub_category_id=" + query.cat_id
      );
      offerItems = await JSON.parse(JSON.stringify(offerProducts.data));
    } else {
      offerItems = [];
    }
  } catch (error) {
    MoreItems = null;
    relatedItems = null;
    offerItems = null;
    getError = true;
    // return { notFound: true };
  }
  return {
    props: { MoreItems, relatedItems, offerItems, getError }, // will be passed to the page component as props
  };
}
