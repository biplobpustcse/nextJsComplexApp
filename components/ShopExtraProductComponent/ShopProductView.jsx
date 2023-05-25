import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import { addCart } from "../lib/endpoints";
import ProductInfoModel from "../Product/ProductInfoModel";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

const ShopProductView = ({ gridViewWise, data }) => {
  const ctxApp = useSelector((store) => store.appReducerContext);
  const stockItems = ctxApp.stockItems;
  const quoteItems = ctxApp.quoteItems;
  const filterAllProduct = [];
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);


  const productMainInfoData = data;

  data = productDataConverter(data);

  const [productData, setProductData] = useState(data);
  // variant product
  const [variantProduct, setVariantProduct] = useState();
  //selected color & size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const filterDataHandler = () => {
    data.forEach((element) => {
      const filter = filterAllProduct.filter((item) => item.id == element.id);
      const filterQuoteItem = quoteItems.filter(
        (item) => item.id == element.id
      );
      const filterStockItem = stockItems.filter(
        (item) => item.id == element.id
      );
      const filterCartItem = getCartContext.Items.filter(
        (item) => item.id == element.id
      );
      if (
        filter.length == 0 &&
        filterQuoteItem.length == 0 &&
        filterStockItem.length == 0 &&
        filterQuoteItem.length == 0
      ) {
        filterAllProduct.push(element);
      }


      // if (filter.length == 0 && stockItems.length > 0) {
      //   debugger;
      //   stockItems.forEach((element2) => {
      //     if (element.id != element2.id) {
      //       filterAllProduct.push(element);
      //     } else {
      //       if (quoteItems.length > 0) {
      //         quoteItems.forEach((element3) => {
      //           if (element.id != element3.id) {
      //             filterAllProduct.push(element);
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
    });
    // if (stockItems.length == 0 && quoteItems.length == 0) {
    //   debugger;
    //   data.forEach((element) => {
    //     filterAllProduct.push(element);
    //   });
    // }


  };

  const addAllToCartHandler = () => {
    filterDataHandler();
    console.log({ filterAllProduct });
    filterAllProduct.forEach((itemContain) => {
      console.log({ itemContain });
      if (
        itemContain.is_variant == 1 &&
        itemContain.is_weight == 0 &&
        itemContain.variant[0]?.stock > 0
      ) {
        if (itemContain.offer) {
          itemContain.offer = itemContain.offer;
        } else {
          itemContain.offer = "";
        }
        itemContain.barcode = itemContain.variant[0]?.barcode;
        itemContain.discountPrice =
          itemContain.variant[0]?.base_discounted_price;
        itemContain.price = itemContain.variant[0]?.base_price;
        itemContain.color = itemContain.colors[0];
        itemContain.size = itemContain.sizes[0];
        itemContain.promotion = itemContain?.promotion_type;
        itemContain.promotion_code = itemContain?.promotion_code;
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
                dispatch({
                  type: "VARIANT_ADD_CART",
                  item: itemContain,
                  promotion: itemContain?.promotion_type,
                  promotion_code: itemContain?.promotion_code,
                });
              } else {
                toast.error("Stock Out");
              }
            },
          });
        } else if (!ctxAuth.isLoggedIn) {
          dispatch({
            type: "VARIANT_ADD_CART",
            item: itemContain,
            promotion: itemContain?.promotion_type,
            promotion_code: itemContain?.promotion_code,
          });
        }
      } else if (itemContain.is_weight == 1 && itemContain.stock > 0) {
        if (itemContain.offer) {
          itemContain.offer = itemContain.offer;
        } else {
          itemContain.offer = "";
        }
        let qty = itemContain.weight[0].weight;
        itemContain.promotion = itemContain?.promotion_type;
        (itemContain.promotion_code = itemContain?.promotion_code),
          (itemContain.barcode = itemContain?.barcode);
        if (ctxAuth.isLoggedIn) {
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
              quantity: qty,
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
                dispatch({
                  type: "Store_Cart_WEIGHT_Item",
                  item: itemContain,
                  qty: qty,
                  promotion: itemContain?.promotion_type,
                  promotion_code: itemContain?.promotion_code,
                });
              } else {
                toast.error("Stock Out");
              }
            },
          });
        } else if (!ctxAuth.isLoggedIn) {
          dispatch({
            type: "Store_Cart_WEIGHT_Item",
            item: itemContain,
            qty: qty,
            promotion: itemContain?.promotion_type,
            promotion_code: itemContain?.promotion_code,
          });
        }
      } else if (itemContain.stock > 0) {
        if (itemContain.offer) {
          itemContain.offer = itemContain.offer;
        } else {
          itemContain.offer = "";
        }
        let quantity = 1;

        itemContain.barcode = itemContain?.barcode;
        itemContain.promotion = itemContain?.promotion_type;
        itemContain.promotion_code = itemContain?.promotion_code;
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
              quantity: quantity,
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
                dispatch({
                  type: "Store_Cart_Item",
                  qty: quantity,
                  item: itemContain,
                  promotion: itemContain?.promotion_type,
                  promotion_code: itemContain?.promotion_code,
                });
                console.log({ itemContain }, "man");
              } else {
                toast.error("Stock Out");
              }
            },
            failed: () => {
              toast.error("Stock Out");
            },
          });
        } else if (!ctxAuth.isLoggedIn) {
          dispatch({
            type: "Store_Cart_Item",
            qty: quantity,
            item: itemContain,
            promotion: itemContain?.promotion_type,
            promotion_code: itemContain?.promotion_code,
          });
        }
      }
    });
  };

  return (
    <section class="product-view-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="myTabContent">
              {gridViewWise == 1 && (
                  <OneColGridTemplate>
                    {productData.map((item) => (
                        <div class="single-product">
                          <ProductInfoModel item={item} />
                        </div>
                    ))}
                  </OneColGridTemplate>
              )}

              {gridViewWise == 4 && (
                <div
                  class="tab-pane fade"
                  id="fourC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="fourC-view-tab"
                  tabindex="0"
                  style={{ display: "contents" }}
                >
                  <div class="four-col-grid-container">
                    {/* <InfiniteScroll
                      dataLength={productData.length}
                      next={hasMoreDataHandler}
                      hasMore={true}
                      endMessage={<p>End Of Data</p>}
                    > */}
                    {productData.map((item) => (
                      <div class="single-product">
                        <ProductInfoModel item={item} />
                      </div>
                    ))}
                    {/* </InfiniteScroll> */}
                  </div>
                </div>
              )}
              {gridViewWise == 5 && (
                <div
                  class="tab-pane fade show active"
                  id="fiveC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="fiveC-view-tab"
                  tabindex="0"
                  style={{ display: "contents" }}
                >
                  <div class="row">
                    <div class="col-12">
                      <div class="five-col-grid-container">
                        {productData.map((item) => (
                          <div class="single-product">
                            <ProductInfoModel
                              item={item}
                              setProductData={setProductData}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {gridViewWise == 6 && (
                <div
                  class="tab-pane fade"
                  id="sixC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="sixC-view-tab"
                  tabindex="0"
                  style={{ display: "contents" }}
                >
                  <div class="six-col-grid-container">
                    {productData.map((item) => (
                      <div class="single-product">
                        <ProductInfoModel item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {productData.length > 0 && (
                <div className="add-all-item text-center">
                  <button
                    className="btn view-all-product-btn"
                    onClick={addAllToCartHandler}
                  >
                    Add all item to cart
                  </button>
                </div>
              )}
              {/* {productData.length <= 0 ||
                productData ==
                  undefined(
                    <div className="add-all-item text-center">
                      <button className="btn view-all-product-btn">
                        No Product Found 😭😭😭
                      </button>
                    </div>
                  )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopProductView;
