import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestCartProduct from "./RequestCartProduct";
import ShortCartProduct from "./ShortCartProduct";
import { get, http } from "../../services/httpService";
import {
  addCart,
  addCartMultiple,
  applyCoupon,
  delete_Cart,
  getCart,
  removeCoupon
} from "../lib/endpoints";
import { toast } from "react-toastify";
import QuotesCartProduct from "./QuotesCartProduct";
import {deleteCookie, getCookie, setCookie} from "cookies-next";

export default function OffcanvasCart() {
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const store = useSelector((state) => state.authReducerContext);
  const ctxApp = useSelector((store) => store.appReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  let getCartContextItems = getCartContext.Items;

  const [estimateSaving, setEstimateSaving] = useState(0);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const appContext = useSelector((store) => store.appReducerContext);

  const [dailyDeal, setDailyDeal] = useState([]);


  let dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await get({
        url: "marketing/daily_deal?platform=web",
        successed: (res) => {
          setDailyDeal(res);
        },
      });
    }
    fetchData();
  }, []);

  const addOfferToCart = () => {
    console.log();
    const getItem = getCartContextItems.find(
      (item2) =>
        item2.id == dailyDeal[0]?.product?.data[0].id &&
        item2.offer == "todays_deal"
    );

    if (getItem) {
      toast.error("Item Already Activated.");
    } else {
      if (
        getCartContext.TotalAmmount >= dailyDeal[0].todays_deal_minimum_amount
      ) {
        let itemContain = dailyDeal[0]?.product?.data[0];
        itemContain.quantity = 1;
        itemContain.base_discounted_price =
          dailyDeal[0]?.todays_deal_discount_amount;
        itemContain.offer_amount = dailyDeal[0]?.todays_deal_discount_amount;
        // itemContain.price = dailyDeal[0]?.todays_deal_discount_amount;
        itemContain.price =
          itemContain.base_price - itemContain.base_discounted_price;

        itemContain.image = itemContain?.thumbnail_image;
        itemContain.offer = "todays_deal";

        console.log({ itemContain });
        if (ctxAuth.isLoggedIn) {
          let type = "";
          if (itemContain.promotion) {
            type = itemContain.promotion;
          } else {
            type = "product";
          }
          http.post({
            url: addCart,
            payload: {
              id: itemContain.id,
              bar_code: itemContain.barcode,
              user_id: ctxAuth.user.user.id,
              quantity: 1,
              product_referral_code: "",
              type: type || "",
              promotion_code: itemContain.promotion_code,
              instruction: "",
              deal_offer: itemContain.offer || "",
              deal_offer_amount: itemContain.offer_amount || "",
            },
            before: () => {},
            successed: (res) => {
              if (res.result) {
                console.log(dailyDeal, "joy");
                dispatch({ type: "Store_Cart_Item", item: itemContain });
                // if(dailyDeal[0].todays_deal_minimum_amount > 0){
                //   dispatch({type : "TODAY_DISCOUNT_LIMIT_AMOUNT",payload :  itemContain.price })
                // }
              } else {
                toast.error("Stock Out.");
              }
            },
          });
        } else if (!ctxAuth.isLoggedIn) {
          dispatch({ type: "Store_Cart_Item", item: itemContain });
        }
      } else {
        toast.error("Buy Some First");
      }
    }
  };

  const gotoCheckoutHandler = () => {
    if (getCartContextItems.length > 0 && store.isLoggedIn) {
      let arrOfCarts = [];
      getCartContext.Items.forEach((element) => {
        let id = "";
        if (element.type != "product") {
          id = "";
        } else {
          id = element.id;
        }
        arrOfCarts.push({
          deal_offer: element.offer || "",
          deal_offer_amount: element.offer_amount || "",
          id: id,
          bar_code: element.barcode || "",
          user_id: store.user.user.id,
          quantity: element.quantity,
          product_referral_code: "",
          type: element.type || "",
          promotion_code:
            element.promotion_code == 0 ? "" : element.promotion_code,
          instruction: "",
        });
      });
      console.log({ arrOfCarts });
      if(localStorage.getItem('coupon')){
        http.post({
          url: removeCoupon,
          before: () => { },
          successed: (res) => {

            if(res.result == true){
              http.post({
                url: applyCoupon,
                payload: {
                  user_id: ctxAuth.user.user.id,
                  owner_id: "",
                  coupon_code: localStorage.getItem('coupon'),
                },
                before: () => { },
                successed: (res) => {
                  if (res.result) {
                    setCookie("coupon",{
                      type : res?.discount_type,
                      amount : res?.discount,
                    });


                    http.post({
                      url: addCartMultiple,
                      payload: arrOfCarts,
                      before: () => {},
                      successed: () => {
                        // nextPaymentPageHandler();
                        // dispatch({ type: "ACTIVE_PAYMENT_STATE", payload: true });


                      },
                      failed: () => {},
                    });

                  } else {
                    localStorage.removeItem('coupon')
                    deleteCookie('coupon')
                    toast.error(res.message);
                  }
                },
                failed: () => { },
              });
            }
          },
          failed: () => { },
        });
      }else{
        http.post({
          url: addCartMultiple,
          payload: arrOfCarts,
          before: () => {},
          successed: () => {
            // nextPaymentPageHandler();
            // dispatch({ type: "ACTIVE_PAYMENT_STATE", payload: true });


          },
          failed: () => {},
        });
      }

      router.push("/checkout");
    } else if (getCartContextItems.length == 0) {
      toast.error("Buy Some First");
    } else if (!store.isLoggedIn) {
      router.push("/auth");
    }

    setIsVisible(false);
  };


  useEffect(() => {
    let sum = 0;

    getCartContextItems.forEach((item2) => {
      if (item2.type == "product") {
        sum +=
          (
              parseFloat(item2?.discount || 0) +
              parseFloat(item2?.member_price || 0) +
            parseFloat(item2?.offer_amount || 0)) *
          parseFloat(item2.quantity);
      }else{
        sum +=
            (parseFloat(item2?.discount || 0)) *
            parseFloat(item2?.quantity);
      }
    });

    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum +   (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })



  }, [getCartContext.Items]);



  useEffect(() => {
    if (router.pathname === "/checkout") {
      setIsVisible(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (dailyDeal[0]?.todays_deal_minimum_amount > 0) {
      dispatch({
        type: "TODAY_DISCOUNT_LIMIT_AMOUNT",
        payload: dailyDeal[0]?.todays_deal_minimum_amount,
      });
    }
  }, [dailyDeal, router.pathname]);

  useEffect(() => {
    var total = getCartContextItems.reduce(function (sum, value) {
      if (value.offer == null || value.offer == "") {
        return sum + parseFloat(value.price) * parseFloat(value.quantity);
      } else {
        return sum;
      }
    }, 0);



    if (parseFloat(appContext.today_discount_limit_amount) > parseFloat( total)) {
      if (getCartContextItems.length > 0) {
        let data = getCartContextItems.find((item) => {
          return item.offer != "" && item.offer != null;
        });

        if (
          data != undefined &&
          appContext.today_discount_limit_amount > total
        ) {
          removeCartItemHandler(data);
        }

      }
    }
  }, [getCartContextItems.length]);


  const removeCartItemHandler = (item) => {
    if (!item.offer) {
      item.offer = "";
    }

    if (ctxAuth.isLoggedIn) {
      const findItem = ctxApp.cartCollection.find(
        (item2) =>
          parseInt(item2.barcode) == item.barcode && item2.offer == item.offer
      );

      if (findItem) {
        http.post({
          url: delete_Cart + findItem?.id,
          payload: {},
          before: () => {},
          successed: () => {},
          failed: () => {},
        });
      }
      dispatch({ type: "REMOVE_SINGLE_ITEM", item: item });
      dispatch({ type: "SERVER_CART_COLLECTION_REMOVE_ITEM", item: item });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "REMOVE_SINGLE_ITEM", item: item });
    }


  };


  // useEffect(() => {
  //
  //
  //   if(ctxAuth.isLoggedIn == true){
  //
  //     http.get({
  //       url: getCart,
  //       before: () => { },
  //       successed: (res) => {
  //         const arrayOfCartItems = [];
  //         let totalAmount = 0;
  //
  //         res.forEach((element) => {
  //
  //
  //           if (element.type != "package") {
  //             element.cart_items.forEach((item) => {
  //               let product =  getCartContext.Items.find((val) => val.id == item.product_id)
  //
  //               if(product != undefined) {
  //
  //                 if(item.peak_of_peak_dis > 0) {
  //                   //for peak_off_peak
  //                   product.price = item.actual_price + item.membership_discount  ;
  //                   product.discountPrice =  (item.actual_price - item.peak_of_peak_dis) + item.membership_discount ;
  //                   product.member_price =  0;
  //                   totalAmount += product.price
  //                 }else if(product.offer != null && product.offer != '') {
  //                   //for offer
  //                   product.price = item.price  ;
  //                   product.discountPrice =  item.price + item.membership_discount;
  //                   product.member_price =  0;
  //                   totalAmount += product.price
  //
  //
  //                 }else if((product.offer == null || product.offer == '' )){
  //                   product.price = item.price;
  //                   product.discountPrice = item.price;
  //                   product.member_price =  item.membership_discount;
  //                   if(product.discount > 0) {
  //                     totalAmount += product.discountPrice
  //                   }else{
  //                     totalAmount += product.price
  //                   }
  //                 }
  //
  //               }
  //               arrayOfCartItems.push(product);
  //             });
  //           } else {
  //             //for package
  //             element.cart_items.forEach((item) => {
  //               let packg =  getCartContext.Items.find((val) => val.id == item.promotion_code)
  //               if(packg != undefined) {
  //                 if (packg.discount > 0) {
  //                   totalAmount += packg.discountPrice
  //                 } else {
  //                   totalAmount += packg.price
  //                 }
  //                 arrayOfCartItems.push(packg);
  //               }
  //             });
  //           }
  //         });
  //
  //
  //         getCartContext.TotalAmmount = totalAmount
  //
  //         getCartContextItems = arrayOfCartItems
  //
  //         //remove duplicate product
  //         // getCartContextItems =  [...new Map(getCartContextItems.map(item => [item['id'], item])).values()]
  //
  //       },
  //       failed: () => { },
  //     });
  //   }
  //
  // },[])

  // useEffect(() => {
  //
  //
  //   if(ctxAuth.isLoggedIn == true){
  //
  //     http.get({
  //       url: getCart,
  //       before: () => { },
  //       successed: (res) => {
  //         const arrayOfCartItems = [];
  //         let totalAmount = 0;
  //
  //         res.forEach((element) => {
  //
  //
  //           if (element.type != "package") {
  //             element.cart_items.forEach((item) => {
  //               let product =  getCartContext.Items.find((val) => val.id == item.product_id)
  //
  //               if(product != undefined) {
  //                 if(item.peak_of_peak_dis > 0) {
  //                   //for peak_off_peak
  //                   product.price = item.actual_price + item.membership_discount  ;
  //                   product.discountPrice =  (item.actual_price - item.peak_of_peak_dis) + item.membership_discount ;
  //                   product.member_price =  0;
  //                   totalAmount += product.price
  //                 }else if(product.offer != null && product.offer != '') {
  //                   //for offer
  //                   product.price = item.price +  item.membership_discount  ;
  //                   product.discountPrice =  item.price + item.membership_discount;
  //                   product.member_price =  0;
  //                   totalAmount += product.price
  //                 }else if((product.offer == null || product.offer == '' )){
  //                   product.price = item.price;
  //                   product.discountPrice = item.price;
  //                   product.member_price =  parseFloat(item.membership_discount) || 0;
  //                   if(product.discount > 0) {
  //                     totalAmount += product.discountPrice
  //                   }else{
  //                     totalAmount += product.price
  //                   }
  //                 }
  //               }
  //               arrayOfCartItems.push(product);
  //             });
  //           } else {
  //             //for package
  //             element.cart_items.forEach((item) => {
  //               let packg =  getCartContext.Items.find((val) => val.id == item.promotion_code)
  //               if(packg != undefined) {
  //                 if (packg.discount > 0) {
  //                   totalAmount += packg.discountPrice
  //                 } else {
  //                   totalAmount += packg.price
  //                 }
  //                 arrayOfCartItems.push(packg);
  //               }
  //             });
  //           }
  //         });
  //
  //
  //         getCartContext.TotalAmmount = totalAmount
  //
  //         getCartContextItems = arrayOfCartItems
  //
  //         //remove duplicate product
  //         // getCartContextItems =  [...new Map(getCartContextItems.map(item => [item['id'], item])).values()]
  //
  //       },
  //       failed: () => { },
  //     });
  //   }
  //
  // },[ctxAuth.isLoggedIn,getCartContextItems.length])
  const CalculateCart = () => {

    getCartContextItems.length > 0
        ? setIsVisible(true)
        : toast.error("Pick a product at least 😁.")

    let sum = 0;
    getCartContext.Items.forEach((itemRedux) => {
        sum += (parseFloat(itemRedux?.discount || 0) + parseFloat(itemRedux?.offer_amount || 0) + parseFloat(itemRedux?.member_price || 0)) *  parseFloat(itemRedux?.quantity);
    });



    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum +   (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })
  }
  return (
    <div className="OffcanvasCart">
      {router.pathname != "/checkout" && (
        <>
          <button
            className="btn btn-primary offcanvas-open-btn"
            type="button"
            data-bs-toggle={getCartContextItems.length > 0 ? "offcanvas" : ""}
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onClick={CalculateCart}



          >
            <div className="total-item">
              <i className="fa-solid fa-cart-shopping"></i>
              <p className="p-0 m-0">Item: {getCartContextItems.length}</p>
            </div>
            <div className="total-item-price">
              &#2547;{getCartContext?.TotalAmmount.toFixed(2)}
            </div>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <button
              className="btn btn-primary offcanvas-close-btn"
              id="offcanvas-close-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              onClick={() => setIsVisible(false)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                {getCartContextItems.length} Item{" "}
                <i className="fa-sharp fa-solid fa-basket-shopping ms-3"></i>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => setIsVisible(false)}
              ></button>
            </div>

            <div className="offcanvas-body scroll_container" data-simplebar>
              <div className="offcanvas-cart-product">
                {getCartContextItems.map((item) => (
                  <ShortCartProduct item={item} />
                ))}
              </div>
              {store.isLoggedIn == true && ctxApp.stockItems.length > 0 && (
                <>
                  <h5
                    scope="col"
                    colspan="5"
                    className="text-center request-stock-title"
                  >
                    Request Stock Items
                  </h5>

                  <div className="offset-request-product">
                    {ctxApp.stockItems.map((item) => (
                      <RequestCartProduct item={item} />
                    ))}
                  </div>
                </>
              )}
              {store.isLoggedIn == true && ctxApp.quoteItems.length > 0 && (
                <>
                  <h5
                    scope="col"
                    colspan="5"
                    className="text-center request-stock-title"
                  >
                    Quote Items
                  </h5>

                  <div className="offset-request-product">
                    {ctxApp.quoteItems.map((item) => (
                      <QuotesCartProduct item={item} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="offcanvas-footer">
              {dailyDeal && dailyDeal.length > 0 && (
                <div className="accordion accordion-flush" id="todays-deal">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="todays-deal-header">
                      <button
                        className="accordion-button todays-deal-button collapsed"
                        id="todays-deal-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#todays-deal-collapse"
                        aria-expanded="false"
                        aria-controls="todays-deal-collapse"
                      >
                        {/* <div className="todays-deal-activated">
                      <h6 className="">Daily Deals</h6>
                    </div> */}
                        <div className="today-deal-collapsed">
                          Today's deal <sup>*</sup>{" "}
                          <span className="text-danger">Limited stock</span>{" "}
                        </div>
                        <div className="todays-deal-counter-wrapper">
                          <div className="todays-deal-counter-title">
                            <h6>{dailyDeal[0]?.todays_deal_name}</h6>
                            <p>
                              <sup>*</sup>Limited Stock
                            </p>
                          </div>
                          <div className="todays-deal-counter">
                            <div id="countdown">
                              <div id="tiles">
                                <span>02</span> : <span>00</span> :{" "}
                                <span>00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="todays-deal-collapse"
                      className={
                        isVisible && router.pathname != "/checkout"
                          ? "accordion-collapse collapse show"
                          : "accordion-collapse collapse"
                      }
                      aria-labelledby="todays-deal-header"
                      data-bs-parent="#todays-deal"
                      // style={!isVisible ? { height: "146px" } : { height: "" }}
                    >
                      <div className="accordion-body">
                        {dailyDeal &&
                        dailyDeal.length > 0 &&
                        dailyDeal[0].product
                          ? dailyDeal[0]?.product?.data.map((item) => {
                              return (
                                <div class="card" >
                                  <div class="card-body">
                                    <div class={getCartContext?.TotalAmmount  <= dailyDeal[0]?.todays_deal_minimum_amount? `image-box flex-basis-auto` : `image-box`}>
                                      <img
                                        src={item?.thumbnail_image}
                                        alt=""
                                        class="img-fluid"
                                      />
                                    </div>
                                    <div class={getCartContext?.TotalAmmount  <= dailyDeal[0]?.todays_deal_minimum_amount? `content-box flex-basis-40` : `content-box`}>
                                      <div class="offer-product-name">
                                        <h5>
                                          <a href="#">{item.name}</a>{" "}
                                        </h5>
                                        <p>
                                          <span>
                                            &#2547; {item?.base_price}
                                          </span>{" "}
                                          |{" "}
                                          &#2547;  {
                                            dailyDeal[0]
                                              ?.todays_deal_discount_amount
                                          }
                                        </p>
                                        <button class="btn offer-btn discount-btn me-1">
                                          &#2547;  {
                                            dailyDeal[0]
                                              ?.todays_deal_discount_amount
                                          }{" "}
                                          off
                                        </button>
                                        {
                                          getCartContext?.TotalAmmount  >= dailyDeal[0]
                                              ?.todays_deal_minimum_amount
                                          &&
                                          <button className="btn offer-btn"  onClick={addOfferToCart}>
                                            Add To Cart
                                          </button>
                                        }

                                      </div>
                                    </div>
                                    {
                                      getCartContext?.TotalAmmount  <= dailyDeal[0]
                                          ?.todays_deal_minimum_amount
                                        &&
                                      <div className="order-discount-box">
                                        <p>
                                          Order over <br />
                                          <span>
                                          {
                                            dailyDeal[0]
                                                ?.todays_deal_minimum_amount
                                          }{" "}
                                            TK
                                        </span>{" "}
                                          <br />
                                          to activate
                                        </p>
                                      </div>
                                    }




                                    <div className="order-discount-box-small">
                                      <p>
                                        Order over <br />
                                        <span>99 TK</span> <br />
                                        to activate
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div
            className="accordion accordion-flush d-none"
            id="offcanvas-cupon"
          >
            <div className="accordion-item">
              <h2 className="accordion-header" id="offcanvas-cupon-header">
                <button
                  className="accordion-button collapsed offcanvas-cupon-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#offcanvas-cupon-collapse"
                  aria-expanded="false"
                  aria-controls="offcanvas-cupon-collapse"
                >
                  Do you have a cupon?
                </button>
              </h2>
              <div
                id="offcanvas-cupon-collapse"
                className="accordion-collapse collapse"
                aria-labelledby="offcanvas-cupon-header"
                data-bs-parent="#offcanvas-cupon"
              >
                <div className="accordion-body">
                  <form action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cuppon code"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button className="btn" type="button" id="button-addon2">
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}

              <div className="total-price">
                <div className="subtotal d-flex justify-content-between">
                  <p>Subtotal</p>
                  <span className="price text-end">
                   &#2547; {getCartContext.TotalAmmount!= null && getCartContext?.TotalAmmount.toFixed(2)}
                  </span>
                </div>
                <div className="savings d-flex justify-content-between">
                  <p>Estimated savings</p>
                  <span className="price text-end">{getCartContext.EstimateSaving.toFixed(2) || 0}</span>
                </div>
                <div className="d-grid gap-2 view-cart-btn">
                  <button
                    className="btn"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={gotoCheckoutHandler}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
