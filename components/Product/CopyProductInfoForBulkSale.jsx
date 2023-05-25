import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import Link from "next/link";
import {
  deleteBazarItem,
  deleteCompareItem,
  getAllProduct,
  getCompareList,
  postQuote,
  postReqStock,
  postWishItem,
  quoteDelete,
  removeWishItem,
  stockDelete,
} from "../lib/endpoints";
import { toast } from "react-toastify";

const CopyProductInfoForBulkSale = ({ item = [], setProductData }) => {
  console.log({ item }, "yahuu");
  let itemContain = item;
  const router = useRouter();
  // ref dropdown variant product
  const dropDownRef = useRef(null);
  const dropDownMainRef = useRef();
  // product quantity & loader
  const [qty, setQty] = useState("");
  const [stockQty, setStockQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // variant product
  const [variantProduct, setVariantProduct] = useState();
  //selected color & size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  //clicked Cart
  const [clickedCart, setClickedCart] = useState(false);
  //redux state check
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const ctxWish = useSelector((store) => store.wishReducerContext);
  const ctxApp = useSelector((store) => store.appReducerContext);
  const [isOpenVariant, setIsOpenVarient] = useState(false);
  const dispatch = useDispatch();
  //visible Qty Checker
  const [visibleCartBox, setVisibleCartBox] = useState(false);
  const [visibleQuoteBox, setVisibleQuoteBox] = useState(false);
  const [visibleStockBox, setVisibleStockBox] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [isWished, setIsWished] = useState(false);
  const getCartCtxItems = getCartContext.Items;
  const findItem = getCartCtxItems.find((item2) => item2.id === itemContain.id);
  const findWishItem = ctxWish.Items.find(
    (item2) => item2.id === itemContain.id
  );
  console.log(ctxApp.stockItems, "stockItems");
  console.log({ selectedWeight });
  // const findBarcodeQty = getCartCtxItems.find(
  //   (item2) => item2.barcode === itemContain.barcode
  // );
  const findVarientItem = getCartCtxItems.find(
    (item2) =>
      item2.id == itemContain.id &&
      item2.color == selectedColor &&
      item2.size == selectedSize
  );

  const findQuoteItem = ctxApp.quoteItems.find(function (item2) {
    let barcode;
    if (item.is_variant == 0) {
      barcode = item.barcode;
    } else if (item.is_variant == 1) {
      barcode = variantProduct?.barcode;
    }
    return item2.id == item.id && item2.barcode == barcode;
  });
  const findReqStockItem = ctxApp.stockItems.find(function (item2) {
    let barcode;
    if (item.is_variant == 0) {
      barcode = item.barcode;
    } else if (item.is_variant == 1) {
      barcode = variantProduct?.barcode;
    }
    return item2.id == item.id && item2.barcode == barcode;
  });

  const dispatchPostQuote = (res) => {
    dispatch({
      type: "STORE_QUOTE_ITEM",
      item: {
        id: res.product_id,
        quantity: res.quantity_count,
        barcode: res.barcode,
        variant: res.variant,
        quote_id: res.id,
      },
    });
  };
  const dispatchUpdateQuoteQty = (res) => {
    dispatch({
      type: "UPDATE_QUOTE_ITEM",
      item: {
        id: res.product_id,
        quantity: res.quantity_count,
        barcode: res.barcode,
        variant: res.variant,
        quote_id: res.id,
      },
    });
  };
  const addToQuoteHandler = (item2, evt) => {
    evt.preventDefault();
    if (ctxAuth.isLoggedIn) {
      let variant;
      if (
        variantProduct != undefined &&
        item2.is_variant == 1 &&
        variantProduct.variant.length > 0
      ) {
        variant = variantProduct.variant;
      } else {
        variant = "";
      }
      postQuoteHandler(
        item2,
        item2.wholesale_min_qty + 1,
        dispatchPostQuote,
        variant
      );
    } else {
      router.push("/auth");
    }
  };
  const quoteIncHandler = () => {
    postQuoteHandler(
      findQuoteItem,
      parseInt(findQuoteItem.quantity) + 1,
      dispatchUpdateQuoteQty,
      findQuoteItem.variant
    );
  };
  const quoteDecHandler = () => {
    if (item.wholesale_min_qty == findQuoteItem.quantity - 1) {
      const res = {
        product_id: findQuoteItem.id,
        quantity_count: 0,
        barcode: findQuoteItem.barcode,
        variant: findQuoteItem.variant,
      };
      dispatchUpdateQuoteQty(res);
      http.get({
        url: quoteDelete + findQuoteItem.quote_id,
        before: () => { },
        successed: () => { },
        failed: () => { },
      });

      // (async () => {
      //   await Axios.get(baseUrl + quoteDelete + findQuoteItem.quote_id);
      //   // element.innerHTML = "Delete successful";
      // })();
    } else {
      postQuoteHandler(
        findQuoteItem,
        parseInt(findQuoteItem.quantity) - 1,
        dispatchUpdateQuoteQty,
        findQuoteItem.variant
      );
    }
  };

  const deleteCompareHandler = (item) => {
    http.post({
      url: deleteCompareItem,
      payload: {
        product_id: item.id,
      },
      before: () => { },
      successed: (res) => {
        http.get({
          url: getCompareList,
          before: () => { },
          successed: (res) => {
            setProductData(productDataConverter(res.result.data));
          },
          failed: () => { },
        });
      },
      failed: () => { },
    });
  };
  const deleteBazarlistHandler = (item) => {
    http.post({
      url: deleteBazarItem + item.id,
      payload: {
        user_id: ctxAuth.user.user.id,
      },
      before: () => { },
      successed: (res) => {
        http.get({
          url: getBazarlist,
          before: () => { },
          successed: (res) => {
            setProductData(productDataConverter(res.result.data));
          },
          failed: () => { },
        });
      },
      failed: () => { },
    });
  };
  const postQuoteHandler = (item2, qty, funcCall, variant) => {
    http.file({
      url: postQuote,
      payload: {
        user_id: ctxAuth.user.user.id,
        product_id: item2.id,
        quantity: qty,
        variant: variant,
      },
      before: () => { },
      successed: (res) => {
        if (res.barcode != undefined) {
          funcCall(res);
          toast.success('Quote add successfully')
        } else {
          toast.error(res.message);
        }

        //setVisibleQuoteBox(true);
      },
      failed: () => {
        console.log("failed");
      },
    });
  };

  //? request stock
  //?end request stock

  const storeCartHandler = (itemContain, e) => {
    e.preventDefault();
    if (itemContain.is_variant == 1 && item.is_weight == 0) {
      // if (anyThing != undefined) {
      //   console.log({ anyThing });
      // }

      // if (
      //   !isOpenVariant &&
      //   selectedColor.length > 0 &&
      //   selectedSize.length > 0
      // ) {
      //   setIsOpenVarient(true);
      //   return;
      // }
      // const findVariant = variantProduct?.find(
      //   (item) => item.product_id == itemContain.id
      // );

      itemContain.barcode = variantProduct?.barcode;
      itemContain.discountPrice = parseFloat(
        variantProduct?.base_discounted_price.toString().replace(/,/g, "")
      );

      itemContain.price = parseFloat(
        variantProduct?.base_price.toString().replace(/,/g, "")
      );

      itemContain.color = selectedColor;
      itemContain.size = selectedSize;
      itemContain.promotion = itemContain?.promotion_type;
      (itemContain.promotion_code = itemContain?.promotion_code),
        dispatch({
          type: "VARIANT_ADD_CART",
          item: itemContain,
          promotion: itemContain?.promotion_type,
          promotion_code: itemContain?.promotion_code,
        });
      setIsOpenVarient(false);
    } else if (itemContain.is_weight == 1 && itemContain.is_variant == 0) {
      let qty = selectedWeight;
      itemContain.promotion = itemContain?.promotion_type;
      (itemContain.promotion_code = itemContain?.promotion_code),
        (itemContain.barcode = itemContain?.barcode);
      dispatch({
        type: "Store_Cart_WEIGHT_Item",
        item: itemContain,
        qty: qty,
        promotion: itemContain?.promotion_type,
        promotion_code: itemContain?.promotion_code,
      });
    } else {
      itemContain.barcode = itemContain?.barcode;
      itemContain.promotion = itemContain?.promotion_type;
      (itemContain.promotion_code = itemContain?.promotion_code),
        dispatch({
          type: "Store_Cart_Item",
          item: itemContain,
          promotion: itemContain?.promotion_type,
          promotion_code: itemContain?.promotion_code,
        });
    }
    // getCartContext.storeCartItems(itemContain);
  };

  const sizeChangeHandler = ({ target }) => {
    setSelectedSize(target.value);
  };
  const weightChangeHandler = ({ target }) => {
    setSelectedWeight(target.value);
    console.log(target.value);
  };
  const colorChangeHandler = ({ target }) => {
    setSelectedColor(target.value);
  };
  const dispatchPostReqStock = (res) => {
    dispatch({
      type: "STORE_REQUEST_ITEM",
      item: {
        id: res.product_id,
        quantity: res.quantity_count,
        barcode: res.barcode,
        variant: res.variant,
        stock_id: res.id,
      },
    });
  };
  const dispatchUpdateReqStockQty = (res) => {
    dispatch({
      type: "UPDATE_REQUEST_ITEM",
      item: {
        id: res.product_id,
        quantity: res.quantity_count,
        barcode: res.barcode,
        variant: res.variant,
        stock_id: res.id,
      },
    });
  };

  const requestStockHandler = (item, evt) => {
    evt.preventDefault();
    if (ctxAuth.isLoggedIn) {
      let variant;
      if (item.is_variant == 1 && variantProduct.variant.length > 0) {
        variant = variantProduct.variant;
      } else {
        variant = "";
      }
      postRequestQty(item, 1, dispatchPostReqStock, variant);
    } else {
      router.push("/auth");
    }
    // alert("Development On Going");
  };

  const stockQtyChangeHandler = ({ target }) => { };
  const stockblurHandler = () => { };
  const stockIncHandler = () => {
    if (findReqStockItem) {
      postRequestQty(
        findReqStockItem,
        findReqStockItem.quantity + 1,
        dispatchUpdateReqStockQty,
        findReqStockItem.variant
      );
    }

    // http.file({
    //   url:
    // })
  };
  const stockDecHandler = () => {
    if (findReqStockItem.quantity - 1 == 0) {
      const res = {
        product_id: findReqStockItem.id,
        quantity_count: 0,
        barcode: findReqStockItem.barcode,
        variant: findReqStockItem.variant,
      };
      dispatchUpdateReqStockQty(res);
      http.get({
        url: stockDelete + findReqStockItem.stock_id,
        before: () => { },
        successed: () => { },
        failed: () => { },
      });
    } else {
      postRequestQty(
        findReqStockItem,
        findReqStockItem.quantity - 1,
        dispatchUpdateReqStockQty,
        findReqStockItem.variant
      );
    }
  };

  const postRequestQty = (item2, qty, funcCall, variant) => {
    http.file({
      url: postReqStock,
      payload: {
        user_id: ctxAuth.user.user.id,
        product_id: item2.id,
        variant: variant,
        quantity: qty,
      },
      before: () => { },
      successed: (res) => {
        funcCall(res);
        // setStockQty(res.quantity_count);
        // if (res.quantity_count > 0) setVisibleStockBox(true);
        // else {
        //   setVisibleStockBox(false);
        // }
      },
      failed: (res) => { },
    });
  };
  console.log({ findReqStockItem });

  // const getVarianrtProductInfo = useCallback((barCode) => {
  //   http.get({
  //     url: getVariantInfo + `?product_id=` + item.id + `&barcode=` + barCode,
  //     before: () => {},
  //     successed: (res) => {
  //       console.log("resvarient", res);
  //       setVariantProduct(res);
  //     },
  //     failed: () => {},
  //   });
  // }, []);

  const qtyIncHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    let item;
    if (item2.is_variant == 0 && item2.is_weight == 0) {
      quantity = findItem.quantity + 1;
      item = findItem;
    } else if (item2.is_variant == 1 && item2.is_weight == 0) {
      quantity = findVarientItem.quantity + 1;
      item = findVarientItem;
    } else if (item2.is_weight == 1) {
      quantity = findItem.quantity + parseInt(selectedWeight);
      item = findItem;
    }
    dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
    // getCartContext.updateQuantity(findItem, quantity);
  };

  const wishListHandler = (item, evt) => {
    evt.preventDefault();
    if (ctxAuth.isLoggedIn) {
      http.get({
        url:
          postWishItem +
          `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
        before: () => { },
        successed: (res) => {
          dispatch({ type: "STORE_WISH_ITEM", item: item });
        },
        failed: () => { },
      });
    } else {
      router.push({ pathname: "/auth" });
    }
  };

  const wishListRemoveHandler = (item, evt) => {
    evt.preventDefault();
    http.get({
      url:
        removeWishItem +
        `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
      before: () => { },
      successed: (res) => {
        dispatch({ type: "REMOVE_WISH_ITEM", item: item });
      },
      failed: () => { },
    });
  };

  const qtyDecHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    let item;
    console.log("item2: ", item2);

    if (item2.is_variant == 0 && item2.is_weight == 0) {
      quantity = findItem.quantity - 1;
      item = findItem;
    } else if (item2.is_variant == 1 && item2.is_weight == 0) {
      quantity = findVarientItem.quantity - 1;
      item = findVarientItem;
    } else if (item2.is_weight == 1) {
      quantity = findItem.quantity + parseInt(selectedWeight);
      item = findItem;
    }
    dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
    // getCartContext.updateQuantity(findItem, quantity);
    if (item.quantity === 0) {
      setVisibleCartBox(false);
    }
  };

  const qtyChangeHandler = (itemContain, { target }) => {
    let item;
    if (itemContain.is_variant == 0) {
      item = findItem;
    } else if (itemContain.is_variant == 1) {
      item = findVarientItem;
    }
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
    if (itemContain.is_variant == 0) {
      item = findItem;
    } else if (itemContain.is_variant == 1) {
      item = findVarientItem;
    }
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

  const stateChangerVariant = () => {
    setIsOpenVarient(false);
  };

  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) setSelectedSize(item.sizes[0]);
    if (item.colors && item.colors.length > 0) setSelectedColor(item.colors[0]);
    if (item.weight && item.weight.length > 0)
      setSelectedWeight(item.weight[0]?.weight);
  }, []);

  useEffect(() => {
    let variant;
    if (item.is_variant == 1) {
      if (selectedColor.length > 0 && selectedSize.length > 0) {
        variant = selectedColor + `-` + selectedSize;
      } else if (selectedColor.length > 0 && selectedSize.length == 0) {
        variant = selectedColor;
      } else {
        variant = selectedSize;
      }
      const findVarient = item.variant.find((p) => p.variant == variant);
      //getVarianrtProductInfo(findVarient?.barcode);
      setVariantProduct(findVarient);
    }
  }, [
    item.is_variant,
    selectedColor,
    selectedSize,
    selectedColor.length,
    selectedSize.length,
  ]);
  function openModal(item) {
    dispatch({
      type: "removeViewProduct",
      payload: {},
    });
    getViewProductInfo(item);
  }
  const getViewProductInfo = useCallback((item) => {
    http.get({
      url: getAllProduct + item.id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        dispatch({
          type: "setViewProduct",
          payload: res,
        });
      },
      failed: () => { },
    });
  }, []);

  useEffect(() => {
    if (item.is_variant == 0 && findItem) {
      setVisibleCartBox(true);
    } else {
      setVisibleCartBox(false);
    }
    if (item.is_variant == 1 && findVarientItem) {
      setVisibleCartBox(true);
    } else {
      setVisibleCartBox(false);
    }
  }, [findItem, findVarientItem, item.is_variant]);

  useEffect(() => {
    if (findQuoteItem) {
      setVisibleQuoteBox(true);
    } else {
      setVisibleQuoteBox(false);
    }
  }, [findQuoteItem]);

  useEffect(() => {
    if (findReqStockItem) {
      setVisibleStockBox(true);
    } else {
      setVisibleStockBox(false);
    }
  }, [findReqStockItem]);

  useEffect(() => {
    if (findWishItem) {
      setIsWished(true);
    } else setIsWished(false);
  }, [findWishItem]);
  // useOutSideAlerter(dropDownRef, () => {
  //  // setIsOpenVarient(false);
  // });

  // console.log({ variantProduct });
  // console.log({ findVarientItem });
  // console.log({ findItem });
  console.log({ findQuoteItem });
  return (
    <>
      {
        <div className="bulk-single">
          <div class="card ">
            <div class="card-body">
              <div className="card-left">
                {router.pathname == "/compare" && (
                  <div className="card-head position-relative">
                    <i
                      class="fa-solid fa-xmark"
                      onClick={deleteCompareHandler.bind(null, item)}
                    ></i>
                    {/* <i class="fa-solid fa-trash-can" onClick={deleteCompareHandler.bind(null, item)}></i> */}
                  </div>
                )}
                {router.pathname == "/bazarlist" && (
                  <div className="card-head position-relative">
                    <i
                      class="fa-solid fa-xmark"
                      onClick={deleteBazarlistHandler.bind(null, item)}
                    ></i>
                    {/* <i class="fa-solid fa-trash-can" onClick={deleteBazarlistHandler.bind(null, item)}></i> */}
                  </div>
                )}
                <div class="image-box">
                  <img src={item?.image} alt="" class="img-fluid" />
                  <div class="quickview-main">
                    <ul class="nav justify-content-center">
                      <li class="nav-item">
                        <a
                          onClick={() => openModal(item)}
                          class="nav-link"
                          href="javascript:void(0);"
                          data-bs-toggle="modal"
                          data-bs-target="#quickviewModal"
                        >
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href>
                          {!findWishItem && (
                            <i
                              class="fa-regular fa-heart"
                              title="Add to Wish"
                              onClick={wishListHandler.bind(this, item)}
                            ></i>
                          )}
                          {findWishItem && (
                            <i
                              class="fa-solid fa-heart-circle-plus"
                              title="Remove Wish"
                              onClick={wishListRemoveHandler.bind(this, item)}
                            ></i>
                          )}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-right">
                <div class="description-box">
                  <p>{item?.ProWiseShortMSG}</p>
                  <h4 class="product-title">
                    <Link href="/product/[id]" as={`/product/${item?.id}`}>
                      <a class="">{item?.name}</a>
                    </Link>
                    {/* <a href="" class="">
                  {item?.name}
                </a> */}
                  </h4>
                  {item.is_variant == 0 && item.is_weight == 0 && (
                    <h3 class="product-price">
                      {item.discount > 0 && (
                        <>
                          &#2547; {item?.discountPrice} <span>/per PCs</span>
                          <del> &#2547; {item.price}</del>
                        </>
                      )}
                      {item.discount == 0 && (
                        <>
                          &#2547; {item?.price} <span>/per PCs</span>
                        </>
                      )}
                    </h3>
                  )}
                  {item?.is_variant == 1 &&
                    item.is_weight == 0 &&
                    variantProduct != undefined && (
                      <h3 class="product-price">
                        {variantProduct?.base_discounted_price > 0 && (
                          <>
                            &#2547; {variantProduct?.base_discounted_price}{" "}
                            <span>/per PCs</span>
                            <del> &#2547; {variantProduct?.base_price}</del>
                          </>
                        )}
                        {variantProduct?.base_discounted_price == 0 && (
                          <>
                            &#2547; {variantProduct?.base_price}{" "}
                            <span>/per PCs</span>
                          </>
                        )}
                      </h3>
                    )}

                  <div class="moredetails-main"
                    style={{ display: item.is_variant == 1 || item.is_weight == 1 ? 'block' : 'none' }}
                  >
                    <div class="more-options">
                      More details
                      <div class="all-more">
                        <div class="first-more" style={{ display: 'none' }}>
                          <button
                            type="button"
                            class="btn dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            tabindex="0"
                            onClick={() => stateChangerVariant()}
                          >
                            <span class="visually-hidden">Toggle Dropdown</span>
                          </button>
                          <div class="dropdown-menu">
                            <h4 class="product-name">VVE Hilsha fish (1.6+kg)</h4>
                            <div class="all-offer">
                              <p>
                                buy 1 get <span class="disc-qty">5%</span>
                                discount
                              </p>
                              <p>
                                buy 2 get <span class="disc-qty">8%</span>
                                discount
                              </p>
                              <p>
                                buy 1 get<span class="disc-qty">10%</span>
                                discount
                              </p>
                              <p>
                                buy 2 get <span class="disc-qty">5%</span>
                                discount
                              </p>
                            </div>
                          </div>
                        </div>
                        {item.is_variant == 1 &&
                          item.is_weight == 0 &&
                          ((item.sizes && item?.sizes.length) > 0 ||
                            (item.colors && item?.colors.length > 0)) && (
                            <div class="second-more">
                              <button
                                type="button"
                                className={
                                  isOpenVariant
                                    ? `btn dropdown-toggle dropdown-toggle-split dropdown-toggle-up show`
                                    : `btn dropdown-toggle dropdown-toggle-split dropdown-toggle-up`
                                }
                                ref={dropDownMainRef}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                tabindex="0"
                              // onClick={() => {
                              //   setIsOpenVarient(true);
                              // }}
                              >
                                <span class="visually-hidden">Toggle Dropdown</span>
                              </button>

                              <div
                                className={
                                  isOpenVariant
                                    ? `dropdown-menu show`
                                    : `dropdown-menu`
                                }
                                ref={dropDownRef}
                              >
                                {item.colors && item.colors.length > 0 && (
                                  <select
                                    name=""
                                    id=""
                                    class="form-select"
                                    aria-label="Default select example"
                                    tabindex="0"
                                    defaultValue={selectedColor}
                                    onChange={colorChangeHandler}
                                  >
                                    {item.colors.map((p) => (
                                      <option value={p}>{p}</option>
                                    ))}
                                  </select>
                                )}
                                {item.sizes && item.sizes.length > 0 && (
                                  <select
                                    name=""
                                    id=""
                                    class="form-select"
                                    aria-label="Default select example"
                                    tabindex="0"
                                    defaultValue={selectedSize}
                                    onChange={sizeChangeHandler}
                                  >
                                    {item.sizes.map((p) => (
                                      <option value={p}>{p}</option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            </div>
                          )}
                        {item.is_weight == 1 && (
                          <div class="second-more">
                            <button
                              type="button"
                              className={
                                isOpenVariant
                                  ? `btn dropdown-toggle dropdown-toggle-split dropdown-toggle-up show`
                                  : `btn dropdown-toggle dropdown-toggle-split dropdown-toggle-up`
                              }
                              ref={dropDownMainRef}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              tabindex="0"
                            // onClick={() => {
                            //   setIsOpenVarient(true);
                            // }}
                            >
                              <span class="visually-hidden">Toggle Dropdown</span>
                            </button>

                            <div
                              className={
                                isOpenVariant
                                  ? `dropdown-menu show`
                                  : `dropdown-menu`
                              }
                              ref={dropDownRef}
                            >
                              {item.weight && item?.weight.length > 0 && (
                                <select
                                  name=""
                                  id=""
                                  class="form-select"
                                  aria-label="Default select example"
                                  tabindex="0"
                                  defaultValue={selectedWeight}
                                  onChange={weightChangeHandler}
                                >
                                  {item.weight.map((p) => (
                                    <option value={p.weight}>{p.name}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="addtocart-section">
                  {!findQuoteItem && (
                    <div class="add-req-flex">
                      {/* {item.is_variant == 1 && variantProduct?.stock > 0 && (
                    <button
                      class="btn addtocart-btn"
                      onClick={storeCartHandler.bind(this, item)}
                    >
                      add to cart
                    </button>
                  )}
                  {item.is_variant == 1 && variantProduct?.stock <= 0 && (
                    <button
                      class="btn requestto-stock-btn"
                      tabindex="0"
                      onClick={requestStockHandler.bind(this, item)}
                    >
                      request stock
                    </button>
                  )}
                  {item.is_variant == 0 && item.stock > 0 && (
                    <button
                      class="btn addtocart-btn"
                      onClick={storeCartHandler.bind(this, item)}
                    >
                      add to cart
                    </button>
                  )}

                  {item.is_variant == 0 && item.stock <= 0 && (
                    <button
                      class="btn requestto-stock-btn"
                      tabindex="0"
                      onClick={requestStockHandler.bind(this, item)}
                    >
                      request stock
                    </button>
                  )} */}
                      {
                        <button
                          class="btn req-quote-btn"
                          tabindex="0"
                          onClick={addToQuoteHandler.bind(this, item)}
                        >
                          request Price / quote
                        </button>
                      }
                    </div>
                  )}
                  {/* {visibleCartBox && (
                <>
                  {item.is_variant == 0 && findItem && (
                    <div class="quantity-box">
                      <button
                        class="btn qty-minus-btn"
                        onClick={qtyDecHandler.bind(this, item)}
                      >
                        <i class="icofont-minus"></i>
                      </button>
                      <input
                        type="number"
                        class="form-control"
                        value={findItem?.quantity}
                        onChange={qtyChangeHandler.bind(null, item)}
                        onBlur={blurHandler.bind(null, item)}
                        step="0.01"
                      />
                      <button
                        class="btn qty-plus-btn"
                        onClick={qtyIncHandler.bind(this, item)}
                      >
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  )}
                  {item.is_variant == 1 && findVarientItem && (
                    <div class="quantity-box">
                      <button
                        class="btn qty-minus-btn"
                        onClick={qtyDecHandler.bind(this, item)}
                      >
                        <i class="icofont-minus"></i>
                      </button>
                      <input
                        type="number"
                        class="form-control"
                        value={findVarientItem?.quantity}
                        onChange={qtyChangeHandler.bind(null, item)}
                        onBlur={blurHandler.bind(null, item)}
                        step="0.01"
                      />
                      <button
                        class="btn qty-plus-btn"
                        onClick={qtyIncHandler.bind(this, item)}
                      >
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  )}
                </>
              )} */}
                  {visibleQuoteBox && findQuoteItem && (
                    <div class="quantity-box" style={{ background: "#137bc2" }}>
                      <button class="btn qty-minus-btn" onClick={quoteDecHandler}>
                        <i class="icofont-minus"></i>
                      </button>
                      <input
                        type="text"
                        class="form-control"
                        value={findQuoteItem?.quantity}
                      // onChange={qtyChangeHandler.bind(null, item)}
                      // onBlur={blurHandler.bind(null, item)}
                      />
                      <button class="btn qty-plus-btn" onClick={quoteIncHandler}>
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  )}
                  {/* {visibleStockBox && findReqStockItem && (
                <div class="quantity-box" style={{ background: "#c13b3b" }}>
                  <button class="btn qty-minus-btn" onClick={stockDecHandler}>
                    <i class="icofont-minus"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    value={findReqStockItem?.quantity}
                    onChange={stockQtyChangeHandler}
                    onBlur={stockblurHandler.bind(null, item)}
                  />
                  <button class="btn qty-plus-btn" onClick={stockIncHandler}>
                    <i class="icofont-plus"></i>
                  </button>
                </div>
              )} */}

                  {/* {item.is_variant == 1 &&
                variantProduct?.stock <= 0 &&
                visibleSecondCartBox && (
                  <div class="quantity-box">
                    <button
                      class="btn qty-minus-btn"
                      onClick={reqStockDecHandler.bind(this, item)}
                    >
                      <i class="icofont-minus"></i>
                    </button>
                    <input type="text" class="form-control" value={stockQty} />
                    <button
                      class="btn qty-plus-btn"
                      onClick={reqStockIncHandler.bind(this, item)}
                    >
                      <i class="icofont-plus"></i>
                    </button>
                  </div>
                )} */}
                  {/* {item.is_variant == 0 && visibleSecondCartBox && (
                <div class="quantity-box">
                  <button
                    class="btn qty-minus-btn"
                    onClick={reqStockDecHandler.bind(this, item)}
                  >
                    <i class="icofont-minus"></i>
                  </button>
                  <input type="text" class="form-control" value={stockQty} />
                  <button
                    class="btn qty-plus-btn"
                    onClick={reqStockIncHandler.bind(this, item)}
                  >
                    <i class="icofont-plus"></i>
                  </button>
                </div>
              )} */}
                  {/* {visibleThirdCartBox && (
                <div class="quantity-box">
                  <button class="btn qty-minus-btn">
                    <i class="icofont-minus"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    value={item?.wholesale_min_qty}
                  />
                  <button class="btn qty-plus-btn">
                    <i class="icofont-plus"></i>
                  </button>
                </div>
              )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CopyProductInfoForBulkSale;
