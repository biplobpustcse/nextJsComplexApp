import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { http } from "../../services/httpService";
import {
  getCart,
  productMultiArrayNewCart,
  purchaseHis,
} from "../lib/endpoints";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { productDataConverter } from "../../services/dataService";

const PurchaseHistory = ({ data }) => {
  const [paymentData, setPaymentData] = useState(data);
  const [pageNo, setPageNo] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const ctxApp = useSelector((store) => store.appReducerContext);
  const [serverCart, setServerCart] = useState([]);

  const hasMoreDataHandler = useCallback(() => {
    setPageNo(pageNo + 1);
    http.get({
      url: purchaseHis + `?page=` + (pageNo + 1),
      before: () => {},
      successed: (res) => {
        console.log({ res });
        const mergableData = [...paymentData, ...res];
        setPaymentData(mergableData);
      },
      failed: () => {},
    });
  });

  const gotoOrderDetailHandler = (item, e) => {
    e.preventDefault();
    router.push({ pathname: `/orderDetails/` + item.id });
  };

  const cartProductDetails = (cartData) => {
    let product, packages, today_deal;

    if (ctxAuth.isLoggedIn && cartData.length > 0) {
      // let url = cartData.map((item) => item.product_id || item.promotion_code).join(",");
      let url = cartData.map((item) => item.id).join(",");

      http.get({
        // url: productMultiArrayNew + url,
        url: productMultiArrayNewCart + url,
        before: () => {},
        successed: (res) => {
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
            let checkPeakProduct = cartData.find(
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


          let array = [];
          if (res.promotions) {
            packages = res.promotions.forEach((itemContain) => {
              let itemFindQty = cartData.find(
                (item) => itemContain.PROMOTION_CODE == item.promotion_code
              );

              if (
                cartData.filter(
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

          var data = [...product, ...array];
          console.log(productDataConverter(data), "yuyrrrra");

          productDataConverter(data).map((item) => {
            // here barcode
            let getCart;

            if (item.promotion_code != null && item.promotion_code != "") {
              getCart = cartData.find(
                (item3) => item3.promotion_code == item.promotion_code
              );
            } else {
              getCart = cartData.find(
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
        },
        failed: () => {},
      });
    }
  };

  const handleReOrder = (e, id) => {
    e.preventDefault();

    http.get({
      url: "reorder?order_id=" + id,
      before: () => {},
      successed: (res) => {
        if (res.result == true) {
          toast(res.message);
        }
        http.get({
          url: getCart,
          before: () => {},
          successed: (res) => {
            console.log(res, "rescart");
            let data = [];
            res?.forEach((item) => {
              item?.cart_items?.forEach((item2) => {
                data.push(item2);
              });
            });
            cartProductDetails(data);

            // console.log(data,'dds')

            // dispatch({ type: "SERVER_CART_COLLECTION", items: data });
          },
          failed: () => {},
        });
      },
      failed: () => {},
    });
  };

  return (
    <>
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
        <div class="order-information-main">
          <form action="" class="">
            <div class="common-fieldset-main">
              <fieldset class="common-fieldset">
                <legend class="rounded">purchase history</legend>

                <InfiniteScroll
                  dataLength={paymentData.length}
                  next={hasMoreDataHandler}
                  hasMore={true}
                  endMessage={<p>End Of Data</p>}
                >
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped payment-history">
                      <thead>
                        <tr>
                          <th scope="col">Sl No.</th>
                          <th scope="col">date</th>
                          <th scope="col">invoice No</th>
                          {/*<th scope="col">order no.</th>*/}
                          <th scope="col">type</th>
                          <th scope="col">amount</th>
                          <th scope="col">status</th>
                          <th scope="col">Details</th>
                          <th scope="col">Reorder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentData.map((item, index) => (
                          <tr>
                            <th scope="row" class="text-center">
                              {index + 1}
                            </th>
                            <td class="text-center">{item.date}</td>
                            <td>{item.code}</td>
                            {/*<td>002222281</td>*/}
                            <td>{item.payment_type}</td>
                            <td>{item.grand_total}</td>
                            <td>{item.payment_status}</td>
                            <td>
                              <Link
                                href="/orderDetails/[id]"
                                as={`/orderDetails/${item?.id}`}
                              >
                                <a href>View</a>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="primary-btn"
                                onClick={(e) => handleReOrder(e, item.id)}
                              >
                                Reorder
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </InfiniteScroll>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
