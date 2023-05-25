import { Fragment, useCallback, useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import React, { useEffect } from "react";
import TopHeader from "./Header/TopHeader";
import MainHeader from "./Header/MainHeader";

import { SecondFooter } from "../components/Footer/SecondFooter";
import { SslFooter } from "../components/Footer/SslFooter";
import { HotSaleSlider, OfferSlider } from "../utils/slider";
import ScrollToTop from "./pages/ScrollToTop";
import Sidebar from "./Sidebar/Sidebar";
import { useRouter } from "next/router";
import OfferSliderMain from "./Home/MainSlider/OfferSliderMain";
import { http } from "../services/httpService";
import {
  getAllProduct,
  getCart,
  getCompareList,
  postRemoveWishItem,
  productMultiArray,
  productMultiArrayNew,
  productMultiArrayNewCart,
  quoteList,
  stockList,
} from "./lib/endpoints";
import OffcanvasCart from "./cart/OffcanvasCart";
import MobileTopHeader from "./Header/MobileTopHeader";
import { productDataConverter } from "../services/dataService";
import SidebarRecursive from "./Sidebar/SidebarRecursive";
import { getCookie } from "../utils/cookie";
// import CustomJs from '../public/assets/js/reactCustom';

const Layout = ({ children, title, isAuthenticated, deauthenticate }) => {
  const appName = "WholeSaleClub";
  const router = useRouter();
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const titleHead = title ? `${title} - ${appName}` : appName;
  const { pathname } = useRouter();
  const [sliderData, setSliderData] = useState([]);
  const [cartCollection, setCartCollection] = useState([]);
  const ctxApp = useSelector((store) => store.appReducerContext);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [serverCart, setServerCart] = useState([]);
  // const getWishListItems = useCallback(() => {
  //   http.get({
  //     url: postRemoveWishItem,
  //     before: () => {},
  //     successed: (res) => {
  //       const wishedItems = res.map((item) => item.product);
  //       dispatch({ type: "UPDATE_WISH_LIST", payload: wishedItems });
  //     },
  //     failed: () => {},
  //   });
  // }, []);
  const getStockListItems = useCallback((userId) => {
    http.get({
      url: stockList + userId,
      before: () => {},
      successed: (res) => {
        console.log({ res }, "ok");
        let items = [];
        res.forEach((element) => {
          let item = {
            id: element.product_id,
            quantity: element.quantity_count,
            barcode: element.barcode,
            variant: element.variant,
            stock_id: element.id,
          };
          items.push(item);
        });
        console.log("holaItems", items);
        dispatch({ type: "IMPORT_STOCK_LIST", items: items });
        // const stockItems = res.map((item) => ({
        //   quantity_count: item.quantity,
        // }));
        // console.log({ stockItems }, "ho");
      },
      failed: () => {},
    });
  }, []);

  const getCartCollection = useCallback(() => {
    setTimeout(() => {
      http.get({
        url: getCart,
        before: () => {},
        successed: (res) => {
          var data = [];
          res.forEach((element) => {
            element.cart_items.forEach((item) => {
              data.push(item);
            });
          });
          setCartCollection(data || []);
          dispatch({ type: "SERVER_CART_COLLECTION", items: data });
          console.log({ data });
        },
        failed: () => {},
      });
    }, [2000]);
  }, []);
  //
  // const getProductsInfo = useCallback(() => {
  //   http.get({
  //     url:
  //       productMultiArray +
  //       ctxApp.cartCollection.map((item) => item.product_id).join(","),
  //     before: () => {},
  //     successed: (res) => {
  //       console.log({ res });
  //     },
  //     failed: () => {},
  //   });
  // }, []);
  // console.log({ serverCart });

  const getQuoteListItems = useCallback((userId) => {
    http.get({
      url: quoteList + userId,
      before: () => {},
      successed: (res) => {
        let items = [];
        if (
          res.result != undefined &&
          res.result != null &&
          res.result.length > 0 &&
          res.status != "Failed"
        ) {
          let rslt = res.result;
          rslt.forEach((element) => {
            if (element.barcode != undefined && element.quote_id != undefined) {
              let item = {
                id: element.product_id,
                quantity: element.quantity_count,
                barcode: element.barcode,
                variant: element.variant,
                quote_id: element.id,
              };
              items.push(item);
            }
          });
        }
        dispatch({ type: "IMPORT_QUOTE_LIST", items: items });
        // const stockItems = res.map((item) => ({
        //   quantity_count: item.quantity,
        // }));
        // console.log({ stockItems }, "ho");
      },
      failed: () => {},
    });
  }, []);
  // const getCompareItems = useCallback(() => {
  //   http.get({
  //     url: getCompareList,
  //     before: () => {},
  //     successed: (res) => {
  //       const data = [];
  //       if (res.result.data.length > 0) {
  //         res.result.data.forEach((element) => {
  //           data.push({ product_id: element.id });
  //         });
  //         dispatch({ type: "UPDATE_COMPARE_LIST", payload: data });
  //       }
  //     },
  //     failed: () => {},
  //   });
  // });

  useEffect(() => {
    let user = localStorage.getItem("USERWHOLESALE25");
    let cartV1 = localStorage.getItem("CARTV1WHOLESALE25");
    let dataBreadcumb = localStorage.getItem("dataBreadcumb");

    let storedUser = {};
    let storedCart = {};
    let isLoggedIn = false;
    if (user) {
      storedUser = JSON.parse(user);
      isLoggedIn = true;
      dispatch({ type: "AUTH_UPDATED", payload: storedUser });
      // getWishListItems();
      // getCompareItems();
      getStockListItems(JSON.parse(user).user.id);
      // getQuoteListItems(JSON.parse(user).user.id);
      if (cartV1) {
        storedCart = JSON.parse(cartV1);
      }
    }
    if (cartV1) {
      storedCart = JSON.parse(cartV1);
      dispatch({ type: "CART_UPDATED", payload: storedCart });
    }
    if (dataBreadcumb) {
      dispatch({
        type: "GET_BREAD_CUMB_DATA",
        payload: JSON.parse(dataBreadcumb),
      });
    }
  }, []);
  console.log({ ctxAuth });
  useEffect(() => {
    let product, packages, today_deal;

    if (ctxAuth.isLoggedIn && ctxApp.cartCollection.length > 0) {
      // let url = ctxApp.cartCollection.map((item) => item.product_id || item.promotion_code).join(",");
      let url = ctxApp.cartCollection.map((item) => item.id).join(",");

      http.get({
        // url: productMultiArrayNew + url,
        url: productMultiArrayNewCart + url,
        before: () => {},
        successed: (res) => {
          console.log({ res }, "ghfgh6");
          product = res.products.data;

          console.log({ product });
          product = product.map((item) => {
            if (
              ctxAuth &&
              ctxAuth.user.user.membership_type &&
              ctxAuth.user.user.membership_type == "Silver"
            ) {
              // item.price = item.silver_member_price;
              // item.base_price = item.silver_member_price;
            }
            let checkPeakProduct = ctxApp.cartCollection.find(
              (cart) => cart.barcode == item.barcode
            );
            if (parseFloat(checkPeakProduct?.peak_of_peak_dis) > 0) {
              item.isPeak = true;
            } else {
              item.isPeak = false;
            }

            // let itemFindQty = ctxApp.cartCollection.find(item2 => item2.barcode == item.barcode);
            // item.quantity = itemFindQty.quantity;
            return item;
          });

          today_deal = res.todayDeals.data.map((item) => {
            if (item.today_deal_price != undefined) {
              item.offer = "todays_deal";
            }
            return item;
          });

          product = [...product, ...today_deal];

          console.log(product, "utryty");

          let array = [];
          if (res.promotions) {
            packages = res.promotions.forEach((itemContain) => {
              let itemFindQty = ctxApp.cartCollection.find(
                (item) => itemContain.PROMOTION_CODE == item.promotion_code
              );

              if (
                getCartContext.Items.filter(
                  (item5) => item5.barcode == itemContain.PROMOTION_CODE
                ).length == 0
              ) {
                array.push({
                  id: itemContain?.PROMOTION_CODE,
                  discount:
                    parseFloat(itemContain.ACTUAL_PRICE) -
                    parseFloat(itemContain.PROMOTION_PRICE),
                  discountPrice: parseFloat(itemContain.PROMOTION_PRICE),
                  price: parseFloat(itemContain?.PROMOTION_PRICE || 0),
                  barcode: itemContain.PROMOTION_CODE,
                  promotion_code: itemContain.PROMOTION_CODE,
                  promotion: itemContain.PROMOTION_TYPE,
                  name: itemContain.PROMOTION_NAME,
                  image: itemContain.IMAGE,
                  type: itemContain.PROMOTION_TYPE,
                  silver_member_price: parseFloat(itemContain.PROMOTION_PRICE),
                  is_variant: 0,
                  quantity: itemFindQty?.quantity,
                });
              }

              // console.log(parseFloat( itemContain.ACTUAL_PRICE) - parseFloat(itemContain.PROMOTION_PRICE) + "12345678910")
            });
          }

          setServerCart([...product, ...array]);
        },
        failed: () => {},
      });
    }
  }, [ctxApp.cartCollection.length > 0, ctxAuth.isLoggedIn == true]);
  // ctxApp.cartCollection.length > 0,

  console.log({ getCartContext });

  useEffect(() => {
    console.log(cartCollection, "yot");
    console.log(serverCart, "yot");
    console.log(productDataConverter(serverCart), "yot");
    if (ctxApp.cartCollection.length > 0 && serverCart.length > 0) {
      productDataConverter(serverCart).map((item) => {
        // here barcode
        let getCart;

        //     =  ctxApp.cartCollection.find(
        //     (item3) =>item3.barcode==item.barcode ||  item3.promotion_code==item.promotion_code
        // );;

        if (item.promotion_code != null && item.promotion_code != "") {
          getCart = ctxApp.cartCollection.find(
            (item3) => item3.promotion_code == item.promotion_code
          );
        } else {
          getCart = ctxApp.cartCollection.find(
            (item3) =>
              item3.barcode == item.barcode && item3.offer == item.offer
          );
        }

        const findItem = getCartContext.Items.find(
          (item2) => item2.barcode == item.barcode || item.id == item2.id
        );
        // if (findItem == undefined && ctxAuth.isLoggedIn) {
        console.log(getCart, "wewe");

        if (item.is_variant == 1) {
          const findItem = item.variant.find(
            (item2) => item2.barcode == item.barcode
          );
          // item.discountPrice = parseFloat(
          //   findItem?.base_discounted_price.toString().replace(/,/g, "")
          // );
          // item.price = parseFloat(
          //   findItem?.base_price.toString().replace(/,/g, "")
          // );
          item.promotion = findItem?.promotion_type;
          item.promotion_code = findItem?.promotion_code;
          item.quantity = getCart?.quantity;
          if (item.offer) {
            item.offer = item.offer;
          } else {
            item.offer = "";
          }
          if (getCart) {
            item.price = getCart.price;
          }

          dispatch({
            type: "VARIANT_ADD_CART",
            item: item,
            promotion: item?.promotion_type,
            promotion_code: item?.promotion_code,
          });
        } else if (item.is_weight == 1) {
          item.promotion = item?.promotion_type;
          // item.selectedWeight = item.weight[0].weight;
          item.promotion_code = item?.promotion_code;
          item.quantity = getCart?.quantity;
          if (item.offer) {
            item.offer = item.offer;
          } else {
            item.offer = "";
          }

          // item.offer = getCart.offer
          if (getCart) {
            item.price = getCart.price;
          }

          dispatch({
            type: "Store_Cart_WEIGHT_Item",
            item: item,
            qty: item.quantity,
            promotion: item?.promotion_type,
            promotion_code: item?.promotion_code,
          });
        } else if (item.is_variant == 0) {
          // item.price =
          //   "main_price" in item
          //     ? parseFloat(item.main_price)
          //     : parseFloat(item?.base_price);

          item.promotion =
            item?.promotion_code != null && item?.promotion_code != ""
              ? "package"
              : item?.promotion_type;
          item.promotion_code = item?.promotion_code;
          item.quantity = getCart?.quantity;

          if (getCart.offer) {
            item.offer = getCart.offer;
            item.discount = item.today_deal_price;
            item.price = item.discountPrice;
          }
          if (item.offer) {
            item.offer = item.offer;
          } else {
            item.offer = "";
          }

          if (getCart) {
            // item.price = getCart.price;
            item.quantity = getCart?.quantity;
          }

          console.log(item, "iopio");

          dispatch({
            type: "Store_Cart_Item",
            qty: item?.quantity,
            item: item,
            promotion: item?.promotion_type,
            promotion_code: item?.promotion_code,
          });
        }
        // }
      });

      // console.log({ makeCartFundamental });
      // let storedCart = {};
      // let cartV1 = localStorage.getItem("CARTV1WHOLESALE25");
      // if (cartV1) {
      //   storedCart = JSON.parse(cartV1);
      // }
      // let count = 0;
      // const mergedArray = [...storedCart.Items, ...makeCartFundamental];
      // let truncateItems = [];
      // mergedArray.forEach((item) => {
      //   mergedArray.forEach((item2) => {
      //     if (item.barcode == item2.barcode) {
      //       count = 1;
      //     }
      //   });
      //   if (count == 0) {
      //     truncateItems.push(item);
      //   }
      //   count = 0;
      // });
      // truncateItems = storedCart.Items.filter(
      //   (val) => !makeCartFundamental.includes(val.barcode)
      // );
      // dispatch({ type: "CART_IMPORT_FROM_DATABASE", items: truncateItems });
      // console.log({ truncateItems });
    }
  }, [serverCart]);

  useEffect(() => {
    setTimeout(() => {
      let sum = 0;

      getCartContext.Items.forEach((itemRedux) => {
        sum +=
          (parseFloat(itemRedux?.discount || 0) +
            parseFloat(itemRedux?.offer_amount || 0) +
            parseFloat(itemRedux?.member_price || 0)) *
          parseFloat(itemRedux?.quantity);
        // }else{
        //   sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * ( parseFloat(itemRedux.quantity));
        // }
      });

      dispatch({
        type: "ESTIMATED_SAVING",
        payload: {
          estimatedAmount:
            sum +
            (getCookie("coupon")
              ? parseFloat(JSON.parse(getCookie("coupon")).amount)
              : 0),
        },
      });
    }, 200);
  }, [getCartContext.Items.length > 0]);

  useEffect(() => {
    if (!ctxAuth.isLoggedIn) {
      setServerCart([]);
    }
  }, [ctxAuth]);

  useEffect(() => {
    if (ctxAuth.isLoggedIn) {
      // getWishListItems();
      getStockListItems(ctxAuth.user.user.id);
      getQuoteListItems(ctxAuth.user.user.id);
    }
  }, [ctxAuth]);

  useEffect(() => {
    if (ctxAuth.isLoggedIn) {
      getCartCollection();
    }
  }, [
    ctxAuth.isLoggedIn,
    getCartContext.Items.length != ctxApp.cartCollection.length,
  ]);

  useEffect(() => {
    if (typeof window != undefined && window.innerWidth <= 991) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/646a01d2ad80445890ee32ca/1h0v1e7qq";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  console.log({ ctxAuth });

  return (
    <Fragment>
      <Head>
        <title>{titleHead}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="shortcut icon"
          href="../assets/images/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="../assets/images/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="../assets/fonts/icofont.min.css" />
        <link rel="stylesheet" href="../assets/fonts/arial-font.css" />
        <link rel="stylesheet" href="../assets/scss/bootstrap.min.css" />

        <link rel="stylesheet" href="../assets/scss/select2.min.css" />

        <link rel="stylesheet" href="../assets/scss/slick.css" />
        <link rel="stylesheet" href="../assets/scss/slick-theme.css" />
        <link rel="stylesheet" href="../assets/scss/calendar.css" />

        <link rel="stylesheet" href="../assets/scss/style.css" />
        <link rel="stylesheet" href="../assets/scss/responsive.css" />
        {/* <link rel="stylesheet" href="url-to-cdn/splide.min.css"></link> */}
        <link
          rel="stylesheet"
          href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css"
        />

        <script src="../assets/js/jquery-3.6.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

        <script src="../assets/js/select2.min.js"></script>
        <script src="../assets/js/bootstrap.bundle.min.js"></script>

        <script src="../assets/js/slick.js"></script>
        <script src="cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-zoom/1.7.21/jquery.zoom.js"></script>

        {/* <script src="../assets/js/custom.js"></script> */}

        {/* <script type="text/javascript" src="/utils/zoom.js"></script> */}
      </Head>

      <TopHeader
        appName={appName}
        isAuthenticated={isAuthenticated}
        deauthenticate={deauthenticate}
      />
      <MainHeader />

      {isVisible && <MobileTopHeader />}
      <section className="layout-main">
        {!isVisible && <Sidebar />}
        {/* {!isVisible && <SidebarRecursive />} */}

        <section id="content">
          <OfferSliderMain />
          {children}
        </section>
        {/*<section className="py-4 mb-4 bg-light">*/}
        {/*  <div className="container text-center">*/}
        {/*    <button id="bKash_button" className="d-none">*/}
        {/*      Pay With bKash*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</section>*/}
        {/* {router.pathname != "/checkout" && <OffcanvasCart />} */}
        <OffcanvasCart />
      </section>

      <ScrollToTop />
    </Fragment>
  );
};

const mapStoreToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStoreToProps, actions)(Layout);
