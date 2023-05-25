import { connect } from "react-redux";

import React, { useCallback, useEffect, useState } from "react";
import { baseUrl, http } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  getHomeSliders,
  getCategoriesByDepartment,
  getCategoriesById,
  deleteBazarItem,
  getMoreItems,
} from "../../components/lib/endpoints";

import { compose } from "redux";
import { Router, useRouter, withRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import QuickView from "../../components/Product/QuickView";
import { InfinitySpin } from "react-loader-spinner";
import Axios from "axios";
import PeakOffPeakTemplate from "../../components/offer/peakOffPeak/peak_off_peak_template";
import ShopProductShorting from "../../components/Shop/ShopProductShorting";
import Custom404 from "../404";
import PackageTemplate from "../../components/offer/package/packageTemplate";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function PeakoffPeak(props) {
  const dispatch = useDispatch();
  console.log(props.MoreItems, "moreItems");

  const store = useSelector((state) => state.productPrice);
  // const store =StoreData?.bredCumbData;
  // const store1 =StoreData?.productPrice;
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [shopNavCategory, setShopNavCategory] = useState([]);
  const router = useRouter();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [price, setPrice] = useState([0, 20000]);


  const [oneView, setoneView] = useState(false);
  const [twoView, settwoView] = useState(false);
  const [threeView, setthreeView] = useState(true);


  const GetHomeSliders = useCallback(() => {
    http.get({
      url: getHomeSliders,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setSliders(res);
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

  const GetShopNavItem = (url) => {
    http.get({
      url: url,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setShopNavCategory(res);
        const updatedList = [];
        {
          res.length > 0 &&
            res.map((slide) => {
              if (slide.banner != "") {
                updatedList.push(slide.banner);
              }
            });
          setSliders(updatedList);
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
      : getCategoriesById + props.router.query?.cat_id;
    GetShopNavItem(url);
  }, [router.asPath]);

  const handleClick = (event, isview) => {

     if (isview == "row") {
      setoneView(true);
      settwoView(false);
      setthreeView(false);
    } else if (isview == "two") {
      settwoView(true);
      setoneView(false);
      setthreeView(false);
    } else if (isview == "three") {
      setthreeView(true);
      setoneView(false);
      settwoView(false);
    } else {
      setoneView(false);
      settwoView(false);
      setthreeView(false);
    }
  };
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getElement = document.getElementById("logoClick");

    getElement.addEventListener("click", () => {
      Router.events.on("routeChangeStart", (url) => {
        //this.setState({ isLoading: true });
        setLoader(true);
        console.log("router change");
      });
      Router.events.on("routeChangeComplete", (url) => {
        //this.setState({ isLoading: false });
        // setTimeout(() => {
        setLoader(false);
        // }, [1000]);

        console.log("router change complete");
      });
    });
  }, [Router]);

  if (props.getError) {
    return <Custom404 />;
  }
  return (
    <>
      {loader && (
        <div className="loader-testing">
          <InfinitySpin width="300" color="#004a96" />
        </div>
      )}

      <>
        <ShopProductShorting
          handleClick={handleClick}
          setPrice={setPrice}
          price={price}
          showPrice={true}
          showBrands={true}
          showRevalance={true}
          viewAsFormat={2}
        />

        <PeakOffPeakTemplate
          price={price}
          oneView={oneView}
          twoView={twoView}
          threeView={threeView}
          moreItems={props.MoreItems.data}
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
)(PeakoffPeak);

export async function getServerSideProps({ req, res, query }) {
  let MoreItems,
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
  } catch (error) {
    getError = true;
    MoreItems = null;
  }
  return {
    props: { MoreItems, getError }, // will be passed to the page component as props
  };
}
