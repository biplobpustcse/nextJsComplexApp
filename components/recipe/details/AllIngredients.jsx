import React from "react";
import { useDispatch } from "react-redux";

function AllIngredients({ children, allData }) {
  const dispatch = useDispatch();
  const addingAllToCartHandler = () => {
    allData.forEach((item) => {
      let filterVariantStock,
        selectedColor = "",
        selectedSize = "";
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
        (item.product.data[0].promotion_code =
          item.product.data[0]?.promotion_code),
          dispatch({
            type: "VARIANT_ADD_CART",
            item: item.product.data[0],
            promotion: item.product.data[0]?.promotion_type,
            promotion_code: item.product.data[0]?.promotion_code,
          });
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
        dispatch({
          type: "Store_Cart_WEIGHT_Item",
          item: item.product.data[0],
          qty: qty,
          promotion: item.product.data[0]?.promotion_type,
          promotion_code: item.product.data[0]?.promotion_code,
        });
      } else if (item.product.data[0].stock > 0) {
        item.product.data[0].barcode = item.product.data[0]?.barcode;
        item.product.data[0].promotion = item.product.data[0]?.promotion_type;
        (item.product.data[0].promotion_code =
          item.product.data[0]?.promotion_code),
          dispatch({
            type: "Store_Cart_Item",
            item: item.product.data[0],
            promotion: item.product.data[0]?.promotion_type,
            promotion_code: item.product.data[0]?.promotion_code,
          });
      }
    });
  };
  return (
    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
      <div class="all-ingredients">
        <div class="common-fieldset-main">
          <fieldset class="common-fieldset">
            <legend class="rounded" onClick={addingAllToCartHandler}>
              all ingredients add to cart
            </legend>
            <div class="row">{children}</div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default AllIngredients;
