import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { productDataConverter } from "../../../services/dataService";
import { http } from "../../../services/httpService";
import { addCart } from "../../lib/endpoints";
import ProductInfoModel from "../../Product/ProductInfoModel";

function IngredientsMainProductTemplate({ item }) {
  let filterVariantStock,
    selectedSize = "",
    selectedColor = "";
  const dispatch = useDispatch();
  //redux state check
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  //visible Qty Checker
  const [visibleCartBox, setVisibleCartBox] = useState(false);
  const getCartCtxItems = getCartContext.Items;
  item.product.data[0].ingredientQuantity = item?.quantity;
  item.product.data[0].displayIngredientQuantity = item.display_quantity;
  item.product.data[0].price =
    "main_price" in item
      ? parseFloat(item.product.data[0].main_price)
      : parseFloat(item.product.data[0]?.base_price);
  item.product.data[0].discountPrice =
    item.product.data[0].base_discounted_price;
  // findItem for visible Cart Box
  // Variant && Non Variant
  const findItem = getCartCtxItems.find(function (item1) {
    let barcode;
    if (item.product.data[0].is_variant == 1) {
      const findVariantItem = item.product.data[0].variant.find(
        (item2) => item2.variant == item.variant
      );
      barcode = findVariantItem?.barcode;
    } else barcode = item.product.data[0].barcode;
    if (item1.id == item.product.data[0].id && item1.barcode == barcode) {
      return item1;
    } else return null;
  });

  const addToCartHandler = () => {
    if (item.product.data[0].is_variant == 1) {
      // may need barcode here for better performing
      filterVariantStock = item?.product.data[0].variant.filter(
        (item2) => item2.variant == item.variant
      );
      if (
        item?.product.data[0].colors.length > 0 &&
        item?.product.data[0].sizes.length > 0 &&
        item?.product.data[0].variant != null &&
        item?.product.data[0].variant.length > 0
      ) {
        let split = item.variant.split("-");
        selectedColor = split[0];
        selectedSize = split[1];
      } else if (item.product.data[0].colors.length > 0) {
        selectedColor = item.product.data[0].colors[0];
      } else if (item.product.data[0].sizes.length > 0) {
        selectedSize = item.product.data[0].sizes[0];
      }
    }
    if (
      item.product.data[0].is_variant == 1 &&
      item.product.data[0].is_weight == 0 &&
      filterVariantStock?.stock > 0
    ) {
      item.product.data[0].barcode = filterVariantStock?.barcode;
      item.product.data[0].discountPrice =
        filterVariantStock?.base_discounted_price;
      item.product.data[0].price = filterVariantStock?.base_price;
      item.product.data[0].color = color;
      item.product.data[0].size = size;
      item.product.data[0].promotion = item.product.data[0]?.promotion_type;
      item.product.data[0].promotion_code =
        item.product.data[0]?.promotion_code;
      if (ctxAuth.isLoggedIn) {
        let type = "";
        if (item.product.data[0].promotion) {
          type = item.product.data[0].promotion;
        } else {
          type = "product";
        }
        http.post({
          url: addCart,
          payload: {
            id: item.product.data[0].id,
            bar_code: item.product.data[0].barcode,
            user_id: ctxAuth.user.user.id,
            quantity: 1,
            product_referral_code: "",
            type: type || "",
            promotion_code: item.product.data[0].promotion_code,
            instruction: "",
            deal_offer: item.product.data[0].offer || "",
            deal_offer_amount: item.product.data[0].offer_amount || "",
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: "VARIANT_ADD_CART",
                item: item.product.data[0],
                promotion: item.product.data[0]?.promotion_type,
                promotion_code: item.product.data[0]?.promotion_code,
              });
            } else {
              toast.error("Stock Out");
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: "VARIANT_ADD_CART",
          item: item.product.data[0],
          promotion: item.product.data[0]?.promotion_type,
          promotion_code: item.product.data[0]?.promotion_code,
        });
      }
    } else if (
      item.product.data[0].is_weight == 1 &&
      item.product.data[0].is_variant == 0 &&
      item.product.data[0].stock > 0
    ) {
      let qty = item.product.data[0]?.weight[0].weight;
      item.product.data[0].promotion = item.product.data[0]?.promotion_type;
      (item.product.data[0].promotion_code =
        item.product.data[0]?.promotion_code),
        (item.product.data[0].barcode = item.product.data[0]?.barcode);
      if (ctxAuth.isLoggedIn) {
        let type = "";
        if (item.product.data[0].promotion) {
          type = item.product.data[0].promotion;
        } else {
          type = "product";
        }
        http.post({
          url: addCart,
          payload: {
            id: item.product.data[0].id,
            bar_code: item.product.data[0].barcode,
            user_id: ctxAuth.user.user.id,
            quantity: qty,
            product_referral_code: "",
            type: type || "",
            promotion_code: item.product.data[0].promotion_code,
            instruction: "",
            deal_offer: item.product.data[0].offer || "",
            deal_offer_amount: item.product.data[0].offer_amount || "",
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: "Store_Cart_WEIGHT_Item",
                item: item.product.data[0],
                qty: qty,
                promotion: item.product.data[0]?.promotion_type,
                promotion_code: item.product.data[0]?.promotion_code,
              });
            } else {
              toast.error("Stock Out");
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: "Store_Cart_WEIGHT_Item",
          item: item.product.data[0],
          qty: qty,
          promotion: item.product.data[0]?.promotion_type,
          promotion_code: item.product.data[0]?.promotion_code,
        });
      }
    } else if (item.product.data[0].stock > 0) {
      item.product.data[0].barcode = item.product.data[0]?.barcode;
      item.product.data[0].promotion = item.product.data[0]?.promotion_type;
      item.product.data[0].promotion_code =
        item.product.data[0]?.promotion_code;
      if (ctxAuth.isLoggedIn) {
        let type = "";
        if (item.product.data[0].promotion) {
          type = item.product.data[0].promotion;
        } else {
          type = "product";
        }
        http.post({
          url: addCart,
          payload: {
            id: item.product.data[0].id,
            bar_code: item.product.data[0].barcode,
            user_id: ctxAuth.user.user.id,
            quantity: 1,
            product_referral_code: "",
            type: type || "",
            promotion_code: item.product.data[0].promotion_code,
            instruction: "",
            deal_offer: item.product.data[0].offer || "",
            deal_offer_amount: item.product.data[0].offer_amount || "",
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: "Store_Cart_Item",
                item: item.product.data[0],
                promotion: item.product.data[0]?.promotion_type,
                promotion_code: item.product.data[0]?.promotion_code,
              });
              // console.log({ itemContain }, "man");
            } else {
              toast.error("Stock Out");
            }
            // setIsSuccessToRequServer(true);
          },
          failed: () => {
            toast.error("Stock Out");
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: "Store_Cart_Item",
          item: item.product.data[0],
          promotion: item.product.data[0]?.promotion_type,
          promotion_code: item.product.data[0]?.promotion_code,
        });
      }
    }
  };

  useEffect(() => {
    if (findItem) {
      setVisibleCartBox(true);
    } else {
      setVisibleCartBox(false);
    }
  }, [findItem]);

  return (
    <>
      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="card">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={item?.product.data[0].thumbnail_image}
                class="img-fluid rounded-start"
                alt={item?.product.data[0].thumbnail_image}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{item?.product.data[0].name} </h5>
                <p class="recipe-needs">
                  recipe qty: {item?.display_quantity} kg
                </p>
                <p class="product-price">
                  Price :{" "}
                  {item?.product.data[0].discountPrice > 0
                    ? item?.product.data[0].discountPrice
                    : item?.product.data[0].base_price}{" "}
                  tk bdt / kg
                </p>
                {!visibleCartBox && (
                  <button class="btn addtocart-btn" onClick={addToCartHandler}>
                    add to cart
                  </button>
                )}
                {visibleCartBox && (
                  <button class="btn addtocart-btn">
                    Already Added In Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IngredientsMainProductTemplate;
