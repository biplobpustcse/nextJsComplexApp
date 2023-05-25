import {http} from "./httpService";
import {getCart, productMultiArrayNewCart} from "../components/lib/endpoints";
import {productDataConverter} from "./dataService";




const cartIdProductDetailsToRedux = ( getCartContext, ctxAuth, dispatch) => {



    http.get({
        url: getCart,
        before: () => {},
        successed: (res) => {
           let arrayOfCartItems =  []
            res.forEach((element) => {

                if (element.type != "package") {
                    element.cart_items.forEach((item) => {
                        arrayOfCartItems.push(item);
                    });
                } else {
                    element.cart_items.forEach((item) => {
                        item.product_name = item.promotion_name;
                        item.barcode = "";
                        item.product_thumbnail_image = item.image;
                        item.type = "package";
                        delete item.promotion_name;

                        arrayOfCartItems.push(item);
                    });
                }


            });

            let product, packages, today_deal;
            if (ctxAuth.isLoggedIn && arrayOfCartItems.length > 0) {


                let url = arrayOfCartItems.map((item) => item.id).join(",");
                http.get({
                    url: productMultiArrayNewCart + url,
                    before: () => {
                    },
                    successed: (res) => {
                        product = res.products.data;


                        product = product.map((item) => {

                            let checkPeakProduct = arrayOfCartItems.find(
                                (cart) => cart.barcode == item.barcode
                            );
                            if (parseFloat(checkPeakProduct?.peak_of_peak_dis) > 0) {
                                item.isPeak = true;
                            } else {
                                item.isPeak = false;
                            }

                            return item;
                        });

                        today_deal = res.todayDeals.data.map((item) => {
                            if (item.today_deal_price != undefined) {
                                item.offer = "todays_deal";
                            }
                            return item;
                        });

                        product = [...product, ...today_deal];


                        let promotions_data = [];


                        if (res.promotions.length > 0) {

                            packages = res.promotions.forEach((itemContain) => {
                                let itemFindQty = arrayOfCartItems.find(
                                    (item) => itemContain.PROMOTION_CODE == item.promotion_code
                                );
                                let promotions_state = getCartContext.Items.find(item5 => item5.barcode == itemContain.PROMOTION_CODE)

                                if (promotions_state == undefined) {

                                    promotions_data.push({
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
                                } else {


                                    if (promotions_state != undefined) {
                                        promotions_data.push({...promotions_state, quantity: itemFindQty?.quantity})
                                    }
                                }

                            });
                        }

                        var data = [...product, ...promotions_data];


                        productDataConverter(data).map((item) => {
                            // here barcode
                            let getCart;

                            if (item.promotion_code != null && item.promotion_code != "") {
                                getCart = arrayOfCartItems.find(
                                    (item3) => item3.promotion_code == item.promotion_code
                                );
                            } else {
                                getCart = arrayOfCartItems.find(
                                    (item3) =>
                                        item3.barcode == item.barcode && item3.offer == item.offer
                                );
                            }


                            if (item.is_variant == 1) {
                                const findItem = item.variant.find(
                                    (item2) => item2.barcode == item.barcode
                                );
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
                                    item.quantity = getCart?.quantity;
                                }


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
                    },
                    failed: () => {
                    },
                });
            }


        }
    })





}


export default cartIdProductDetailsToRedux;