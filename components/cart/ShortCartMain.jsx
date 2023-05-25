import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import RequestCartProduct from "./RequestCartProduct";
import ShortCartProduct from "./ShortCartProduct";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {http} from "../../services/httpService";
import {addCartMultiple, applyCoupon, removeCoupon} from "../lib/endpoints";
import {deleteCookie, setCookie} from "cookies-next";

function ShortCartMain() {
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const store = useSelector((state) => state.authReducerContext);
  const ctxApp = useSelector((store) => store.appReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);

  const [estimateSaving, setEstimateSaving] = useState(0);
  console.log(ctxApp.stockItems, "stockItems");
  const router = useRouter();
  const getCartContextItems = getCartContext.Items;
  // const gotoCheckoutHandler = () => {
  //   if (getCartContextItems.length > 0) {
  //     router.push("/checkout");
  //   } else {
  //     toast.error("Buy Some First");
  //   }
  // };
  useEffect(() => {
    let sum = 0;
    console.log(getCartContextItems,'uiouio')
    getCartContextItems.forEach((item) => {

      sum += (parseFloat(item.discount || 0) + parseFloat(item.offer_amount || 0) +  parseFloat(item.member_price || 0))  * parseFloat(item.quantity);
    });
    setEstimateSaving(sum.toFixed(2));
  }, [getCartContextItems]);

  // console.log('getCartContextItems: ', getCartContextItems)

  const price = getCartContextItems.map((items) => {
    // console.log('getCartContextItems: ', items.price)
    // console.log('getCartContextItems: ', items.price)
    // console.log('getCartContextItems: ', items.discount)
    // console.log('getCartContextItems: ', items.discountPrice)
  });



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
          promotion_code: element.promotion_code == 0 ? "" : element.promotion_code,
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

    // setIsVisible(false);
  };

  return (
    <ul className="dropdown-menu dropdown-menu-end fade-down short-cart-main-wrapper">

      <div className="cart-item-list">
        {getCartContextItems.map((item) => (
          <ShortCartProduct item={item} />
        ))}

        {store.isLoggedIn == true && ctxApp.stockItems.length > 0 && (
          <>
            <h6
              scope="col"
              colspan="5"
              className="text-center request-stock-title"
            >
              Request Stock Items
            </h6>

            {ctxApp.stockItems.map((item) => {
              return <RequestCartProduct item={item} />;
            })}
          </>
        )}
      </div>

      <div class="cart-footer">
        <div class="subtotal">
          <div class="row">
            <div class="col-8">
              <p>Subtotal</p>
            </div>
            <div class="col-4 text-end">
              <span class="price text-end">{parseFloat(getCartContext.TotalAmmount).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div class="savings">
          <div class="row">
            <div class="col-8">
              <p>Estimated savings</p>
            </div>
            <div class="col-4 text-end">
              <span class="price text-end">{estimateSaving || 0}</span>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 view-cart-btn">
          {/* <Link
            class="btn"
            type="button"
            onClick={gotoCheckoutHandler}
            
          >
            View cart and checkout
          </Link> */}
          {/*<Link href="/checkout">*/}
          <div onClick={gotoCheckoutHandler}>
            <button className="btn" type="button">
              View cart and checkout
            </button>
          </div>

          {/*</Link>*/}
        </div>
      </div>




      {/* <div className="short-cart-main">
                <div className="qty-box">
                    <form>
                        <a href="javascript:void(0)" type="button"
                            onclick="decrementValue()" className="minus-btn">-</a>
                        <input type="text" className="form-control" id="number" value="10" />
                        <a href="javascript:void(0)" type="button"
                            onclick="incrementValue()" className="plus-btn">+</a>

                    </form>
                </div>
                <div className="product-image">
                    <img src="../assets/images/products/pran.webp" alt="" className="img-fluid" />
                </div>
                <div className="product-description">
                    <h5 className="prodcut-title">
                        <a href="#" target="_blank">nescage matinal coffee glass jar
                            250gm</a>
                    </h5>
                    <h6 className="price"> 690.00 x 1 = 650</h6>
                </div>
                <a className="delete-product" href="javascript:void(0)">
                    <i className="icofont-trash"></i>
                </a>
            </div>

            <div className="short-cart-main">
                <div className="qty-box">
                    <form>
                        <a href="javascript:void(0)" type="button"
                            onclick="decrementValue()" className="minus-btn">-</a>
                        <input type="text" className="form-control" id="number" value="10" />
                        <a href="javascript:void(0)" type="button"
                            onclick="incrementValue()" className="plus-btn">+</a>

                    </form>
                </div>
                <div className="product-image">
                    <img src="../assets/images/products/pran2.webp" alt="" className="img-fluid" />
                </div>
                <div className="product-description">
                    <h5 className="prodcut-title">
                        <a href="#" target="_blank">nescage matinal coffee glass jar
                            250gm</a>
                    </h5>
                    <h6 className="price"> 690.00 x 1 = 650</h6>
                </div>
                <a className="delete-product" href="javascript:void(0)">
                    <i className="icofont-trash"></i>
                </a>
            </div>

            <div className="short-cart-main">
                <div className="qty-box">
                    <form>
                        <a href="javascript:void(0)" type="button"
                            onclick="decrementValue()" className="minus-btn">-</a>
                        <input type="text" className="form-control" id="number" value="10" />
                        <a href="javascript:void(0)" type="button"
                            onclick="incrementValue()" className="plus-btn">+</a>
                    </form>
                </div>
                <div className="product-image">
                    <img src="../assets/images/products/pran3.webp" alt="" className="img-fluid" />
                </div>
                <div className="product-description">
                    <h5 className="prodcut-title">
                        <a href="#" target="_blank">nescage matinal coffee glass jar
                            250gm</a>
                    </h5>
                    <h6 className="price"> 690.00 x 1 = 650</h6>
                </div>
                <a className="delete-product" href="javascript:void(0)">
                    <i className="icofont-trash"></i>
                </a>
            </div> */}
    </ul>
  );
}

export default ShortCartMain;
