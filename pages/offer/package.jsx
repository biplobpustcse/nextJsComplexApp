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
import PackageTemplate from "../../components/offer/package/packageTemplate";
import product from "../../repositories/product";
import Custom404 from "../404";
import {SecondFooter} from "../../components/Footer/SecondFooter";

function Package(props) {
  const dispatch = useDispatch();
  console.log(props.MoreItems, "moreItems");

  const store = useSelector((state) => state.productPrice);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [shopNavCategory, setShopNavCategory] = useState([]);
  const router = useRouter();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [price, setPrice] = useState([0, 20000]);

  const [oneView, setoneView] = useState(false);
  const [twoView, settwoView] = useState(false);
  const [threeView, setthreeView] = useState(true);
  const [fourView, setfourView] = useState(false);
  const [fiveView, setfiveView] = useState(false);
  const [sixView, setsixView] = useState(false);

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
    } else if (isview == "row") {
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
      setfourView(false);
      setfiveView(false);
      setsixView(false);
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
          showPrice={false}
          showBrands={false}
          showRevalance={true}
          viewAsFormat={2}
        />

        <PackageTemplate
          price={price}
          oneView={oneView}
          twoView={twoView}
          threeView={threeView}
          fourView={fourView}
          fiveView={fiveView}
          sixView={sixView}
          router={router}
          moreItems={props.MoreItems.data}
          packageList={props.packages.data}
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
)(Package);

export async function getServerSideProps({ req, res, query }) {
  let MoreItems;
  let packages,
    getError = false;

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
    let packageResponse = await Axios.get(
      baseUrl + "/" + "product-all-promotion?type=package&page=1"
    );
    packages = await JSON.parse(JSON.stringify(packageResponse.data));
  } catch (error) {
    MoreItems = null;
    packages = null;
    getError = true;
  }
  return {
    props: { MoreItems, packages, getError }, // will be passed to the page component as props
  };
}
