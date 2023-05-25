import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import { addCart, delete_Cart } from "../lib/endpoints";
import {getCookie} from "../../utils/cookie";

function ShortCartProduct({ item = [] }) {
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const ctxApp = useSelector((store) => store.appReducerContext);

  console.log(ctxApp.isPaymentActive);
  console.log(ctxApp.address, "address");
  console.log(ctxApp.store, "store");
  const router = useRouter();
  const [qty, setQty] = useState("");
  const dispatch = useDispatch();
  const qtyIncHandler = (item2, e) => {
    e.preventDefault();
    console.log({ item2 }, "incValue");
    let quantity;
    if (item2.is_weight == 0) {
      let uomKgYard = item2.uomkgyardQty ? item2.uomkgyardQty : 1;
      if (item2.fraction_allow == 1) {
        quantity = parseFloat(item2.quantity) + parseFloat(uomKgYard);
      } else {
        quantity = parseFloat(item2.quantity) + parseFloat(uomKgYard);
      }
    } else if (item2.is_weight == 1 && item2.selectedWeight) {
      quantity = parseInt(item2.quantity) + parseInt(item2.selectedWeight);
    } else {
      quantity = item2.quantity + 1;
    }

    console.log({ quantity });

    // let quantity = parseFloat(item2.quantity) + 1;
    if (ctxAuth.isLoggedIn) {
      http.post({
        url: addCart,
        payload: {
          id: item2.id,
          bar_code: item2.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: quantity,
          product_referral_code: "",
          type: item2.type,
          promotion_code: item2.promotion_code,
          instruction: "",
          deal_offer: item2.offer || "",
          deal_offer_amount: item2.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
          } else {
            toast.error("Stock Out");
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
    }
    // if (router.pathname == "/checkout" && ctxApp.isPaymentActive == true) {
    //   requestCartToServer();
    // }
    // getCartContext.updateQuantity(findItem, quantity);
    let sum = 0;
    getCartContext.Items.forEach((itemRedux) => {
      if(item2.product_id == itemRedux.id){
        sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity+1);
      }else{
        sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity);
      }
      // }else{
      //   sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * ( parseFloat(itemRedux.quantity));
      // }
    });

    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum + (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })
  };
  const requestCartToServer = () => {
    getCartContext.Items.forEach((element) => {
      http.post({
        url: addCart,
        payload: {
          id: element.id,
          bar_code: element.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: element.quantity,
          product_referral_code: "",
          address_id: ctxApp.address,
          type: element.type,
          promotion_code: element.promotion_code,
          instruction: "",
          deal_offer: element.offer,
          deal_offer_amount: element.offer_amount,
          pickup_point: ctxApp.store,
        },
        before: () => {},
        successed: () => {},
        failed: () => {},
      });
    });
  };
  const qtyDecHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    if (item2.is_weight == 0) {
      let uomKgYard = item2.uomkgyardQty ? item2.uomkgyardQty : 1;
      if (item2.fraction_allow == 1) {
        quantity = parseFloat(item2.quantity) - parseFloat(uomKgYard);
      } else {
        quantity = parseFloat(item2.quantity) - parseFloat(uomKgYard);
      }
    } else if (item2.is_weight == 1 && item2.selectedWeight) {
      quantity = parseInt(item2.quantity) - parseInt(item2.selectedWeight);
    } else {
      quantity = item2.quantity - 1;
    }
    // let quantity = parseFloat(item2.quantity) - 1;
    // if (quantity <= 0) {
    //   alert("Quantity cannot be less than 1");
    //   return;
    // }
    if (ctxAuth.isLoggedIn) {
      if (quantity > 0) {
        http.post({
          url: addCart,
          payload: {
            id: item2.id,
            bar_code: item2.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: quantity,
            product_referral_code: "",
            type: item2.type,
            promotion_code: item2.promotion_code,
            instruction: "",
            deal_offer: item2.offer || "",
            deal_offer_amount: item2.offer_amount || "",
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
            } else {
              toast.error("Stock Out");
            }
          },
        });
      } else if (quantity <= 0) {
        const getItem = ctxApp.cartCollection.find(
          (item) => parseInt(item.barcode) == item2.barcode
        );
        if (getItem != undefined) {
          http.post({
            url: delete_Cart + getItem.id,
            payload: {},
            before: () => {},
            successed: () => {
              dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
            },
            failed: () => {},
          });
        }
        if (getItem == undefined) {
          dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
        }
      }
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
    }
    // dispatch({ type: "UPDATE_QTY", item: item2, qty: quantity });
    // if (router.pathname == "/checkout" && ctxApp.isPaymentActive == true) {
    //   requestCartToServer();
    // }
    // getCartContext.updateQuantity(findItem, quantity);
    let sum = 0;
    getCartContext.Items.forEach((itemRedux) => {
        if(item2.product_id == itemRedux.id){
          sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity-1);
        }else{
          sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity);

        }
      // }else{
      //   sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * ( parseFloat(itemRedux.quantity));
      // }
    });

    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum + (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })
  };
  const qtyChangeHandler = (itemContain, { target }) => {
    const itemRedux = getCartContext.Items.find(
      (item2) => item2.id == itemContain.id && item2.barcode == itemContain.barcode
    );
    let localQuantity = itemContain.quantity;

    let quantity = 1;
    if (target.value == "") {
      quantity = 0;
      target.value = 0;
      setQty(0);
    } else {
      //if value is has floating point and item fraction is allowed then take the fraction point
      if (
        parseFloat(target.value) % 1 != 0 &&
        itemContain.fraction_allow == 1
      ) {
        if (
          parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty)
        ) {
          quantity = parseFloat(target.value);
          setQty(parseFloat(target.value));
          itemContain.quantity = quantity;
        } else {
          quantity = parseFloat(itemContain.weight_min_qty);
          setQty(parseFloat(itemContain.weight_min_qty));
          itemContain.quantity = quantity;
        }
      }
      //if value is number take the number
      else if (parseFloat(target.value) % 1 == 0) {
        if (
          parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty)
        ) {
          quantity = parseFloat(target.value);
          setQty(parseFloat(target.value));
          itemContain.quantity = quantity;
        } else {
          quantity = parseFloat(itemContain.weight_min_qty);
          setQty(parseFloat(itemContain.weight_min_qty));
          itemContain.quantity = quantity;
        }
      } else {
        toast.error("Fraction not allowed");
        return;
      }
    }

    if (ctxAuth.isLoggedIn) {
      http.post({
        url: addCart,
        payload: {
          id: itemContain.id,
          bar_code: itemContain.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: target.value,
          product_referral_code: "",
          type: itemContain.type,
          promotion_code: itemContain.promotion_code,
          instruction: "",
          deal_offer: itemContain.offer || "",
          deal_offer_amount: itemContain.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result == true) {
            dispatch({
              type: "UPDATE_EDITABLE_QTY",
              item: itemContain,
              qty: target.value,
            });
          } else {
            // console.log(itemContain.quantity,'ittt')
            // console.log(itemRedux.quantity,'ittt')
            itemContain.quantity = localQuantity
            dispatch({
              type: "UPDATE_EDITABLE_QTY",
              item: itemContain,
              qty: localQuantity,
            });
            toast.error("Stock Out");
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({
        type: "UPDATE_EDITABLE_QTY",
        item: itemContain,
        qty: qty,
      });
    }
    // dispatch({
    //   type: "UPDATE_EDITABLE_QTY",
    //   item: itemContain,
    //   qty: target.value,
    // });
    // if (router.pathname == "/checkout" && ctxApp.isPaymentActive == true) {
    //   requestCartToServer();
    // }
    // getCartContext.updateEditableQuantity(itemContain, target.value);

    let sum = 0;
    getCartContext.Items.forEach((itemRedux) => {
      if(itemContain.product_id == itemRedux.id) {
        sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(qty);
      }else{
        sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity);
      }
      // }else{
      //   sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * ( parseFloat(itemRedux.quantity));
      // }
    });

    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum + (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })
  };
  const blurHandler = (itemContain) => {
    if (qty === 0) {
      // setQtyAlert(true);

      toast.error("Quantity Can't be less than 1");
      if (ctxAuth.isLoggedIn) {
        http.post({
          url: addCart,
          payload: {
            id: itemContain.id,
            bar_code: itemContain.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: 1,
            product_referral_code: "",
            type: itemContain.type,
            promotion_code: itemContain.promotion_code,
            instruction: "",
            deal_offer: itemContain.offer || "",
            deal_offer_amount: itemContain.offer_amount || "",
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: "UPDATE_EDITABLE_QTY",
                item: itemContain,
                qty: 1,
              });
            } else {
              toast.error("Stock Out");
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: "UPDATE_EDITABLE_QTY",
          item: itemContain,
          qty: 1,
        });
      }

      // if (router.pathname == "/checkout" && ctxApp.isPaymentActive == true) {
      //   requestCartToServer();
      // }
      //getCartContext.updateEditableQuantity(itemContain, 1);
      setQty(1);
    }
  };

  const removeCartItemHandler = (item) => {
    if (!item.offer) {
      item.offer = "";
    }
    console.log({ item }, "hola");
    if (ctxAuth.isLoggedIn) {
      const findItem = ctxApp.cartCollection.find(
        (item2) => parseInt(item2.barcode) == item.barcode || item2.promotion_code == item.id
      );
      console.log({ findItem }, "2");
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
    let sum = 0;
    getCartContext.Items.forEach((itemRedux) => {
      if(item.product_id != itemRedux.id){
        sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * parseFloat(itemRedux.quantity);
      }
      // }else{
      //   sum += (parseFloat(itemRedux.discount || 0) + parseFloat(itemRedux.offer_amount || 0) + parseFloat(itemRedux.member_price || 0)) * ( parseFloat(itemRedux.quantity));
      // }
    });

    dispatch({
      type : 'ESTIMATED_SAVING',
      payload : {
        estimatedAmount  : sum + (getCookie("coupon") ?  parseFloat(JSON.parse(getCookie("coupon")).amount) : 0)
      }
    })

    if (router.pathname == "/checkout") {
      requestCartToServer();
    }
  };
  console.log({ item }, "yahooItem");

  // useEffect(() => {
  //
  //   var total = getCartContext.reduce(function (sum, value) {
  //
  //     if(value.offer == null || value.offer == ''  ){
  //       console.log(value.price)
  //       return (
  //           sum +
  //           (parseFloat(value.price)) * parseFloat(value.quantity)
  //       );
  //     }else {
  //       return  sum;
  //     }
  //
  //   }, 0);
  //
  //
  //
  //
  //   console.log( ctxApp.today_discount_limit_amount  ,'jj')
  //   console.log(  total,'jj')
  //   console.log( ctxApp.today_discount_limit_amount  > total,'jj')
  //
  //   if(  ctxApp.today_discount_limit_amount >  total  ){
  //
  //     if( getCartContext.length > 0){
  //       let data =   getCartContext.find((item) => {
  //         return item.offer != '' && item.offer != null
  //       })
  //       console.log(data,'jj')
  //
  //       if(data != undefined && ctxApp.today_discount_limit_amount >  total) {
  //         alert('jj')
  //         removeCartItemHandler(data)
  //       }
  //
  //       // dispatch({type : "TODAY_DISCOUNT_LIMIT_AMOUNT",payload :   null })
  //     }
  //   }
  // },[getCartContext.length])

  return (
    <div className="short-cart-main">
      <div className="qty-box">
        <form>
          <a
            href
            type="button"
            className="minus-btn"
            onClick={qtyDecHandler.bind(this, item)}
          >
            -
          </a>

          {item.is_weight == 1 || item.type != "product" ? (
            <input
              type="number"
              className="form-control"
              id="number"
              value={item.quantity}
              disabled={true}
              // onChange={
              //   qtyChangeHandler.bind(null, item)}
              // onBlur={blurHandler.bind(null, item)}
              // step='0.01'
            />
          ) : (
            <input
              type="number"
              className="form-control"
              id="number"
              value={item.quantity}
              onChange={qtyChangeHandler.bind(null, item)}
              onBlur={blurHandler.bind(null, item)}
              step="0.01"
            />
          )}

          <a
            href
            type="button"
            className="plus-btn"
            onClick={qtyIncHandler.bind(this, item)}
          >
            +
          </a>
        </form>
      </div>
      <div className="product-image">
        {item.image != undefined && (
          <img src={item.image} alt="" className="img-fluid" />
        )}
        {item.image == undefined && (
          <img src={item.image} alt="" className="img-fluid" />
        )}
      </div>
      <div className="product-description">
        <h5 className="prodcut-title">
          <a href="#" target="_blank">
            {item.name}
          </a>
        </h5>
        <div className="product-price">
          {ctxAuth && ctxAuth?.user && ctxAuth?.user?.user && ctxAuth.user.user?.membership_type != undefined  && ctxAuth?.user?.user?.membership_type == "Silver" && item?.offer!='todays_deal' && (
              <h6 className="price">
                {item.quantity} x {item.discountPrice}= &#2547;
                {(item.discountPrice * item.quantity).toFixed(2)}
              </h6>
          )}
          {item.discount > 0 && ctxAuth && ctxAuth?.user && ctxAuth?.user?.user && ctxAuth.user.user?.membership_type != undefined && !ctxAuth.user.user.membership_type == "Silver" &&  item?.offer!='todays_deal' && (
            <h6 className="price">
              {item.quantity} x {item.discountPrice}= &#2547;
              {(item.discountPrice * item.quantity).toFixed(2)}
            </h6>
          )}
          {item.discount <= 0 && ctxAuth && ctxAuth?.user && ctxAuth?.user?.user && ctxAuth?.user?.user?.membership_type != undefined &&  !ctxAuth.user.user.membership_type == "Silver" &&  item?.offer!='todays_deal' &&(
            <h6 className="price">
              {item.quantity} x {item.price}= &#2547;
              {(item.price * item.quantity).toFixed(2)}
            </h6>
          )}

          {/*{item.discount <= 0 && ctxAuth && ctxAuth?.user  &&  ctxAuth?.user?.user != undefined && ctxAuth.user.user?.membership_type == undefined  && item.offer !=='todays_deal' && (*/}
          {/*    <h6 className="price">*/}
          {/*      {item.quantity} x {item.price}= &#2547;*/}
          {/*      {(item.price * item.quantity).toFixed(2)}*/}
          {/*    </h6>*/}
          {/*)}*/}

          {/*offline*/}

          {item.discount > 0  && ctxAuth?.user?.user == undefined && ctxAuth?.user?.user?.membership_type == undefined && item.offer !=='todays_deal' &&(
              <h6 className="price">
                {item.quantity} x {item.discountPrice}= &#2547;
                {(item.discountPrice * item.quantity).toFixed(2)}
              </h6>
          )}
          {item.discount > 0  && ctxAuth?.user?.user != undefined  && item?.isPeak == true && ctxAuth?.user?.user?.membership_type == undefined && item.offer !=='todays_deal' &&(
              <h6 className="price">
                {item.quantity} x {item.discountPrice}= &#2547;
                {(item.discountPrice * item.quantity).toFixed(2)}
              </h6>
          )}

          {/*package*/}
          {/*{item.discount > 0  && ctxAuth?.user?.user != undefined  && item.offer !=='todays_deal' &&(*/}
          {/*    <h6 className="price">*/}
          {/*      {item.quantity} x {item.discountPrice}= &#2547;*/}
          {/*      {(item.price * item.quantity).toFixed(2)}*/}
          {/*    </h6>*/}
          {/*)}*/}

          {/*offline*/}
          {item.discount <= 0  && ctxAuth?.user?.user == undefined && ctxAuth?.user?.user?.membership_type == undefined  && item.offer !=='todays_deal'&&(
              <h6 className="price">
                {item.quantity} x {item.price}= &#2547;
                {(item.price * item.quantity).toFixed(2)}
              </h6>
          )}

          {/*package*/}
          {item.discount <= 0  && ctxAuth?.user?.user != undefined && ctxAuth?.user?.user?.membership_type == undefined  && item.offer !=='todays_deal'&&(
              <h6 className="price">
                {item.quantity} x {item.price}= &#2547;
                {(item.price * item.quantity).toFixed(2)}
              </h6>
          )}
          {item.discount > 0  && item.type=="package" && ctxAuth?.user?.user != undefined && ctxAuth?.user?.user?.membership_type == undefined  && item.offer !=='todays_deal'&&(
              <h6 className="price">
                {item.quantity} x {item.price}= &#2547;
                {(item.price * item.quantity).toFixed(2)}
              </h6>
          )}

          {item.offer=='todays_deal' &&(
              <h6 className="price">
                {item.quantity} x {item.price}= &#2547;
                {(item.price * item.quantity).toFixed(2)}
              </h6>
          )}
        </div>
      </div>

      <a
        className="delete-product"
        href
        onClick={removeCartItemHandler.bind(null, item)}
      >
        <i class="fa-solid fa-trash-can"></i>
      </a>
    </div>
  );
}

export default ShortCartProduct;
