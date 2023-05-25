import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import { addCart } from "../lib/endpoints";
import { useRouter } from "next/router";

const OfferTemplate = (props) => {
  let [product, setProductData] = React.useState(props.product);
  const dispatch = useDispatch();
  const [qty, setQty] = useState("");
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [visibleCartBox, setVisibleCartBox] = useState(false);
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const getCartCtxItems = getCartContext.Items;
  let router= useRouter()
  const findItem = getCartCtxItems.find(
    (item2) => item2.id == product.PROMOTION_CODE
  );

  useEffect(() => {
    setProductData(props.product);
    if (findItem) {
      setVisibleCartBox(true);
    }
  }, [product, findItem]);

  const qtyIncHandler = (item2, e) => {
    console.log({ item2 }, "hurrah");
    e.preventDefault();
    let quantity;
    let item;

    quantity = findItem.quantity + 1;
    item = findItem;
    let type = "";
    if (ctxAuth.isLoggedIn) {
      if (item2.PROMOTION_TYPE) {
        type = item2.PROMOTION_TYPE;
      } else {
        type = "product";
      }
      http.post({
        url: addCart,
        payload: {
          id: "",
          bar_code: item2.barcode || "",
          user_id: ctxAuth.user.user.id,
          quantity: quantity,
          product_referral_code: "",
          type: type || "",
          promotion_code: item2.PROMOTION_CODE,
          instruction: "",
          deal_offer: item2.offer || "",
          deal_offer_amount: item2.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
          } else {
            toast.error("Stock Out");
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
    }

    // getCartContext.updateQuantity(findItem, quantity);
  };

  const storeCartHandler = (itemContain, e) => {
    console.warn(itemContain);
    // e.preventDefault();
    let data = {
      id: itemContain.PROMOTION_CODE,
      discount: parseFloat( itemContain.PACKAGE_ACTUAL_PRICE - itemContain.PACKAGE_PROMOTION_PRICE),
      discountPrice: parseFloat(itemContain.PACKAGE_PROMOTION_PRICE),
      price: parseFloat(itemContain.PACKAGE_PROMOTION_PRICE),
      promotion_code: itemContain.PROMOTION_CODE,
      promotion: itemContain.PROMOTION_TYPE,
      barcode : itemContain.PROMOTION_CODE,
      name: itemContain.PROMOTION_NAME,
      image: itemContain.IMAGE,
      type: itemContain.PROMOTION_TYPE,
      silver_member_price:parseFloat(itemContain.PACKAGE_PROMOTION_PRICE),
      is_variant  : 0
    };
    let type = "";
    if (ctxAuth.isLoggedIn) {
      if (itemContain.PROMOTION_TYPE) {
        type = itemContain.PROMOTION_TYPE;
      } else {
        type = "product";
      }
      http.post({
        url: addCart,
        payload: {
          id: "",
          bar_code: itemContain.barcode || "",
          user_id: ctxAuth.user.user.id,
          quantity: 1,
          product_referral_code: "",
          type: type || "",
          promotion_code:
            itemContain.PROMOTION_CODE == 0 ? "" : itemContain.PROMOTION_CODE,
          instruction: "",
          deal_offer: itemContain.offer || "",
          deal_offer_amount: itemContain.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({ type: "Store_Cart_Item", item: data });
          } else {
            toast.error("Stock Out");
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "Store_Cart_Item", item: data });
    }
  };

  const qtyDecHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    let item;

    quantity = findItem.quantity - 1;
    item = findItem;
    let type = "";
    if (ctxAuth.isLoggedIn) {
      if (item2.PROMOTION_TYPE) {
        type = item2.PROMOTION_TYPE;
      } else {
        type = "product";
      }
      http.post({
        url: addCart,
        payload: {
          id: "",
          bar_code: item2.barcode || "",
          user_id: ctxAuth.user.user.id,
          quantity: quantity,
          product_referral_code: "",
          type: type || "",
          promotion_code: item2.PROMOTION_CODE,
          instruction: "",
          deal_offer: item2.offer || "",
          deal_offer_amount: item2.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
          } else {
            toast.error("Stock Out");
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
    }

    // getCartContext.updateQuantity(findItem, quantity);
    if (item.quantity === 0) {
      setVisibleCartBox(false);
    }
  };

  const qtyChangeHandler = (itemContain, { target }) => {
    let item;
    item = findItem;
    if (target.value === "") {
      setQty(0);
    } else {
      setQty(target.value);
    }
    dispatch({
      type: "UPDATE_EDITABLE_QTY",
      item: item,
      qty: target.value,
    });
    // getCartContext.updateEditableQuantity(itemContain, target.value);
  };

  const blurHandler = (itemContain) => {
    let item;
    item = findItem;

    if (qty === 0) {
      // setQtyAlert(true);
      toast.error("Quantity Can't be less than 1");
      dispatch({
        type: "UPDATE_EDITABLE_QTY",
        item: item,
        qty: 1,
      });
      //getCartContext.updateEditableQuantity(itemContain, 1);
      setQty(1);
    }
  };

  return (
    <div className="single-celebration">
      {product && (
        <div className="celebration-flex">
          <div className="left-box">
            <img src={product.IMAGE} alt="" className="img-fluid w-100 h-100" />
          </div>
          <div className="right-box">
            <div className="product-info">
              <div className="image-box">
                <img
                  src={product.IMAGE}
                  alt=""
                  className="img-fluid w-100 h-100"
                />
              </div>
              <div className="description-box">
                <h5>{product.PROMOTION_NAME}</h5>
                <div className="price-box">
                  <div className="current-price me-2">
                    &#2547; {product.PACKAGE_PROMOTION_PRICE}{" "}
                    {/*<span>/per PCs</span>*/}
                  </div>
                  <del className="old-price ">
                    &#2547; {product.PACKAGE_ACTUAL_PRICE}
                  </del>
                </div>
              </div>
            </div>

            {visibleCartBox === false || findItem === undefined ? (
              <button
                className="btn addtocart-btn"
                onClick={storeCartHandler.bind(this, product)}
              >
                add to cart
              </button>
            ) : (
              ""
            )}

            {visibleCartBox && (
              <>
                {findItem && (
                  <div class="quantity-box">
                    <button
                      class="btn qty-minus-btn"
                      onClick={qtyDecHandler.bind(this, product)}
                    >
                      <i class="icofont-minus"></i>
                    </button>
                    <input
                      type="number"
                      class="form-control"
                      value={findItem?.quantity}
                      // onChange={qtyChangeHandler.bind(null, product)}
                      // onBlur={blurHandler.bind(null, product)}
                      // step="0.01"
                      disabled={true}
                    />
                    <button
                      class="btn qty-plus-btn"
                      onClick={qtyIncHandler.bind(this, product)}
                    >
                      <i class="icofont-plus"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(OfferTemplate);
