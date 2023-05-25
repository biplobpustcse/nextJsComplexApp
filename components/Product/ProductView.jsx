// import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, http, post } from "../../services/httpService";
import {
    ProductPromotionAdd,
    SidebarJS,
    SliderReactJs,
    ZoomImage1,
} from "../../utils/slider";
import SliderThumline from "../../utils/Slider/SliderThumline";
import {
    addCart, delete_Cart,
    monthlyBazar,
    postCompare,
    postQuote,
    postReqStock,
    postWishItem,
    quoteDelete,
    removeWishItem,
    stockDelete,
} from "../lib/endpoints";
import ProductQusAnsTemplate from "./ProductQusAnsTemplate";
import ProductRating from "./ProductQusAnsTemplate";
import ProductRatingTemplate from "./ProductRatingTemplate";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";
import CountingComponent from "./CountingComponent";
import { toast } from "react-toastify";
import {useRouter} from "next/router";
import Link from "next/link";

function ProductView({ store, isDetails }) {
    const router = useRouter()
    let [coupon, setCoupon] = useState(null);
    const getCartContext = useSelector((store) => store.cartReducerContext);
    const ctxAuth = useSelector((store) => store.authReducerContext);
    const ctxWish = useSelector((store) => store.wishReducerContext);
    const ctxApp = useSelector((store) => store.appReducerContext);
    const getCartCtxItems = getCartContext.Items;
    const dispatch = useDispatch();
    const [isOpenVariant, setIsOpenVarient] = useState(false);
    const [message, setMessage] = useState("");
    const [findCompareItem, setFindCompareItem] = useState(false);
    const findCompare = ctxApp.compareItems.find(
        (item) => item.product_id == store.product.id
    );
    const findWishItem = ctxWish.Items.find(
        (item2) => item2.id === store.product.id
    );
    const [variant, setVariant] = useState();
    //visible Qty Checker
    const [visibleCartBox, setVisibleCartBox] = useState(false);

    const [visibleQuoteBox, setVisibleQuoteBox] = useState(false);
    const [visibleStockBox, setVisibleStockBox] = useState(false);
    const [qty, setQty] = useState("");
    const [stockQty, setStockQty] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState("");
    // variant product
    const [variantProduct, setVariantProduct] = useState();
    //selected color & size
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    //clicked Cart
    const findVarientItem = getCartCtxItems.find(
        (item2) =>
            item2.id == store.product.id &&
            item2.color == selectedColor &&
            item2.size == selectedSize
    );
    const findItem = getCartCtxItems.find(
        (item2) => item2.id === store.product.id
    );

    const findQuoteItem = ctxApp.quoteItems.find(function (item2) {
        let barcode;
        if (store.product.is_variant == 0) {
            barcode = store.product.barcode;
        } else if (store.product.is_variant == 1) {
            barcode = variantProduct?.barcode;
        }
        return item2.id == store.product.id && item2.barcode == barcode;
    });
    const findReqStockItem = ctxApp.stockItems.find(function (item2) {
        let barcode;
        if (store.product.is_variant == 0) {
            barcode = store.product.barcode;
        } else if (store.product.is_variant == 1) {
            barcode = variantProduct?.barcode;
        }
        return item2.id == store.product.id && item2.barcode == barcode;
    });
    const weightChangeHandler = ({ target }) => {
        setSelectedWeight(target.value);
        console.log(target.value);
    };
    let getCoupon = () => {
        post({
            url: "product-coupon?product_id=3",
            successed: (data) => {
                if (data.length > 0) {
                    setCoupon(data[0]);
                }
            },
        });
    };

    const dispatchPostQuote = (res) => {
        dispatch({
            type: "STORE_QUOTE_ITEM",
            item: {
                id: res.product_id,
                quantity: res.quantity_count,
                barcode: res.barcode,
                variant: res.variant,
                quote_id: res.id,
                instruction: message,
            },
        });
    };
    console.log({ getCartCtxItems });
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
        if (store.product.wholesale_min_qty == findQuoteItem.quantity - 1) {
            const res = {
                product_id: findQuoteItem.id,
                quantity_count: 0,
                barcode: findQuoteItem.barcode,
                variant: findQuoteItem.variant,
            };
            dispatchUpdateQuoteQty(res);
            http.get({
                url: quoteDelete + findQuoteItem.quote_id,
                before: () => {
                },
                successed: () => {
                },
                failed: () => {
                },
            });

            console.log({ visibleCartBox });

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
    const postQuoteHandler = (item2, qty, funcCall, variant) => {
        http.file({
            url: postQuote,
            payload: {
                user_id: ctxAuth.user.user.id,
                product_id: item2.id,
                quantity: qty,
                variant: variant,
                instruction: message,
            },
            before: () => {
            },
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
    useEffect(() => {
        getCoupon();
    }, []);
    const storeCartHandler = (itemContain, e) => {
        e.preventDefault();
        if (itemContain.offer) {
            itemContain.offer = itemContain.offer;
        } else {
            itemContain.offer = "";
        }
        if (itemContain.is_variant == 1) {
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
            itemContain.instruction = message;
            itemContain.promotion = itemContain?.promotion_type;
            (itemContain.promotion_code = itemContain?.promotion_code);
            let quantity = 1;
            setQty(1)
            let type = "";
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
                        quantity: quantity,
                        product_referral_code: "",
                        type: type || "",
                        promotion_code: itemContain.promotion_code,
                        instruction: "",
                        deal_offer: itemContain.offer || "",
                        deal_offer_amount: itemContain.offer_amount || "",
                    },
                    before: () => {
                    },
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

            // dispatch({
            //   type: "VARIANT_ADD_CART",
            //   item: itemContain,
            //   promotion: itemContain?.promotion_type,
            //   promotion_code: itemContain?.promotion_code,
            // });
            setIsOpenVarient(false);
        } else if (itemContain.is_weight == 1) {
            let qty = selectedWeight;
            itemContain.discountPrice = parseFloat(
                itemContain?.base_discounted_price
            );

            itemContain.price = parseFloat(itemContain?.base_price);

            itemContain.promotion = itemContain?.promotion_type;
            (itemContain.promotion_code = itemContain?.promotion_code),
                (itemContain.barcode = itemContain?.barcode);
            let type = "";
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
                    before: () => {
                    },
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

            // dispatch({
            //   type: "Store_Cart_WEIGHT_Item",
            //   item: itemContain,
            //   qty: qty,
            //   promotion: itemContain?.promotion_type,
            //   promotion_code: itemContain?.promotion_code,
            // });
        } else {
            itemContain.barcode = itemContain?.barcode;
            itemContain.promotion = itemContain?.promotion_type;
            itemContain.promotion_code = itemContain?.promotion_code;

            itemContain.discountPrice = parseFloat(
                itemContain?.base_discounted_price.toString().replace(/,/g, "")
            );

            itemContain.price = parseFloat(
                itemContain?.base_price.toString().replace(/,/g, "")
            );
            let quantity = 1;
            if (itemContain.fraction_allow == 1) {
                let uomKgYard = itemContain.uomkgyardQty ? itemContain.uomkgyardQty : 1;
                quantity = itemContain.quantity + parseFloat(uomKgYard);
            } else {
                quantity =
                    parseFloat(itemContain.quantity) + parseFloat(selectedWeight);
            }

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
                        promotion_code:
                            itemContain.promotion_code == null
                                ? ""
                                : itemContain.promotion_code,
                        instruction: "",
                        deal_offer: itemContain.offer || "",
                        deal_offer_amount: itemContain.offer_amount || "",
                    },
                    before: () => {
                    },
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
            // dispatch({
            //   type: "Store_Cart_Item",
            //   item: itemContain,
            //   qty: quantity,
            //   promotion: itemContain?.promotion_type,
            //   promotion_code: itemContain?.promotion_code,
            // });
        }
        // getCartContext.storeCartItems(itemContain);
    };
    const sizeChangeHandler = ({ target }) => {
        setSelectedSize(target.value);
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
                before: () => {
                },
                successed: () => {
                },
                failed: () => {
                },
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
            before: () => {
            },
            successed: (res) => {
                funcCall(res);
                // setStockQty(res.quantity_count);
                // if (res.quantity_count > 0) setVisibleStockBox(true);
                // else {
                //   setVisibleStockBox(false);
                // }
            },
            failed: (res) => {
            },
        });
    };
    const qtyIncHandler = (item2, e) => {
        // cart logic

        // if (item2.is_variant == 1 && item2.is_weight == 0) {

        //   if(item2.is_quantity_multiplied == 1){
        //     if(findVarientItem.quantity + item2.min_qty > item2.quantity){
        //       alert("You can not add more than "+item2.quantity+" items");
        //       return;
        //     }
        // } else if (item2.is_weight == 1 && item2.is_variant == 0) {
        // } else if (
        //   item2.is_variant == 0 &&
        //   item2.is_weight == 1 &&
        //   item2.fraction_allow == 1
        // ) {
        // } else {
        // }

        // cart logic
        e.preventDefault();
        let quantity;
        let item;
        if (item2.is_variant == 0) {
            if (item2.is_weight == 0) {
                let uomKgYard = findItem.uomkgyardQty ? findItem.uomkgyardQty : 1;
                if (item2.fraction_allow == 1) {
                    quantity = findItem.quantity + parseFloat(uomKgYard);
                } else {
                    quantity = parseFloat(findItem.quantity) + parseFloat(uomKgYard);
                }
            } else {
                quantity = parseInt(findItem.quantity) + parseInt(selectedWeight);
            }

            item = findItem;
        } else if (item2.is_variant == 1) {
            quantity =
                item2.is_quantity_multiplied == 1
                    ? findVarientItem.quantity + item2.min_qty
                    : findVarientItem.quantity + 1;
            item = findVarientItem;
        }


        if (ctxAuth.isLoggedIn) {
            let type = "";
            if (item2.promotion) {
                type = itemContain.promotion;
            } else {
                type = "product";
            }

            http.post({
                url: addCart,
                payload: {
                    id: item2.id,
                    bar_code: item2.barcode,
                    user_id: ctxAuth.user.user.id,
                    quantity: quantity,
                    product_referral_code: "",
                    type: type,
                    promotion_code: item2.promotion_code,
                    instruction: "",
                    deal_offer: item2.offer || "",
                    deal_offer_amount: item2.offer_amount || "",
                },
                before: () => {
                },
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
        // dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
        // getCartContext.updateQuantity(findItem, quantity);
    };
    const qtyDecHandler = (item2, e) => {
        e.preventDefault();
        let quantity;
        let item;
        if (item2.is_variant == 0) {
            if (item2.is_weight == 0) {
                let uomKgYard = findItem.uomkgyardQty ? findItem.uomkgyardQty : 1;
                if (item2.fraction_allow == 1) {
                    quantity = parseFloat(findItem.quantity) - parseFloat(uomKgYard);
                } else {
                    quantity = parseFloat(findItem.quantity) - parseFloat(uomKgYard);
                }
            } else {
                quantity = parseInt(findItem.quantity) - parseInt(selectedWeight);
            }
            item = findItem;
        } else if (item2.is_variant == 1) {
            quantity =
                item2.is_quantity_multiplied == 1
                    ? findVarientItem.quantity - item2.min_qty
                    : findVarientItem.quantity - 1;
            item = findVarientItem;
        }


        if (ctxAuth.isLoggedIn) {
            let type = "";
            if (item2.promotion) {
                type = item2.promotion;
            } else {
                type = "product";
            }
            //later need to fix this for delete opreation.
            // let qtyTest = 0;
            // if (quantity <= 0) {
            //   qtyTest = 1;
            // } else {
            //   qtyTest = quantity;
            // }
            if (quantity >= 1) {
                http.post({
                    url: addCart,
                    payload: {
                        id: item2.id,
                        bar_code: item2.barcode,
                        user_id: ctxAuth.user.user.id,
                        quantity: quantity,
                        product_referral_code: "",
                        type: type,
                        promotion_code: item2.promotion_code,
                        instruction: "",
                        deal_offer: item2.offer || "",
                        deal_offer_amount: item2.offer_amount || "",
                    },
                    before: () => {
                    },
                    successed: (res) => {
                        if (res.result) {
                            dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
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
                        before: () => {
                        },
                        successed: () => {
                            dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
                        },
                        failed: () => {
                        },
                    });
                }
                if (getItem == undefined) {
                    dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
                }
            }
        } else if (!ctxAuth.isLoggedIn) {
            dispatch({ type: "UPDATE_QTY", item: item, qty: quantity });
        }

        // dispatch({
        //   type: "UPDATE_QTY",
        //   item: item,
        //   qty: quantity <= 1 ? 0 : quantity,
        // });
        if (quantity <= 0 || item.quantity <= 0) {
            setVisibleCartBox(false);
        }
        // getCartContext.updateQuantity(findItem, quantity);
    };

    const qtyChangeHandler = (itemContain, { target }) => {
        let item;
        if (itemContain.is_variant == 0) {
            item = findItem;
        } else if (itemContain.is_variant == 1) {
            item = findVarientItem;
        }
        // if (target.value === "") {
        //   setQty(0);
        // } else {
        //   if (parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty)) {
        //     setQty(parseFloat(target.value));
        //   } else {
        //     setQty(parseFloat(itemContain.weight_min_qty));
        //   }
        // }


        let quantity = 1;
        if (target.value === "") {
            quantity = 0;
            setQty(0);
        } else {
            // setQty(target.value);
            if (
                parseFloat(target.value) % 1 != 0 &&
                itemContain.fraction_allow == 1
            ) {

                if (
                    parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty)
                ) {
                    quantity = parseFloat(target.value);
                    setQty(parseFloat(target.value));
                } else {
                    quantity = parseFloat(itemContain.weight_min_qty);
                    setQty(parseFloat(itemContain.weight_min_qty));
                }
            } else if (parseFloat(target.value) % 1 == 0) {

                if (
                    parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty) || itemContain.weight_min_qty == null
                ) {


                    quantity = parseFloat(target.value);
                    setQty(parseFloat(target.value));
                } else {


                    quantity = parseFloat(itemContain.weight_min_qty);
                    setQty(parseFloat(itemContain.weight_min_qty));
                }
            } else {
                toast.error("Fraction not allowed");
                return;
            }
        }



        if (ctxAuth.isLoggedIn) {
            let type = "";
            if (itemContain.promotion) {
                type = itemContain.promotion;
            } else {
                type = "product";
            }
            // if (quantity == 0) {
            //   quantity = 1;
            // }
            http.post({
                url: addCart,
                payload: {
                    id: itemContain.id,
                    bar_code: itemContain.barcode,
                    user_id: ctxAuth.user.user.id,
                    quantity: quantity,
                    product_referral_code: "",
                    type: type,
                    promotion_code: itemContain.promotion_code,
                    instruction: "",
                    deal_offer: itemContain.offer || "",
                    deal_offer_amount: itemContain.offer_amount || "",
                },
                before: () => {
                },
                successed: (res) => {
                    if (res.result) {
                        dispatch({
                            type: "UPDATE_EDITABLE_QTY",
                            item: item,
                            qty: quantity,
                        });
                    } else {
                        toast.error("Stock Out");
                    }
                },
            });
        } else if (!ctxAuth.isLoggedIn) {
            dispatch({
                type: "UPDATE_EDITABLE_QTY",
                item: item,
                qty: quantity,
            });
        }

        // dispatch({
        //   type: "UPDATE_EDITABLE_QTY",
        //   item: item,
        //   qty: qty,
        // });

        // getCartContext.updateEditableQuantity(itemContain, target.value);
    };

    const blurHandler = (itemContain, e) => {
        let item;
        if (itemContain.is_variant == 0) {
            item = findItem;
        } else if (itemContain.is_variant == 1) {
            item = findVarientItem;
        }
        if (parseFloat(e.target.value) <= parseFloat(itemContain.weight_min_qty)) {
            setQty(itemContain.weight_min_qty);
        }
        if (qty === 0) {
            // setQtyAlert(true);
            toast.error("Quantity Can't be less than 1");
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
                        type: type,
                        promotion_code: itemContain.promotion_code,
                        instruction: "",
                        deal_offer: itemContain.offer || "",
                        deal_offer_amount: itemContain.offer_amount || "",
                    },
                    before: () => { },
                    successed: (res) => {
                        if (res.result) {
                            dispatch({
                                type: "UPDATE_EDITABLE_QTY",
                                item: item,
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
                    item: item,
                    qty: 1,
                });
            }

            //getCartContext.updateEditableQuantity(itemContain, 1);
            setQty(1);
        }
    };
    useEffect(() => {
        if (store.product.sizes && store.product.sizes.length > 0)
            setSelectedSize(store.product.sizes[0]);
        if (store.product.colors && store.product.colors.length > 0)
            setSelectedColor(store.product.colors[0]);
        if (store.product.weight && store.product.weight.length > 0)
            setSelectedWeight(store.product.weight[0]?.weight);
    }, []);

    useEffect(() => {
        let variant;
        if (store.product.is_variant == 1) {
            if (selectedColor.length > 0 && selectedSize.length > 0) {
                variant = selectedColor + `-` + selectedSize;
            } else if (selectedColor.length > 0 && selectedSize.length == 0) {
                variant = selectedColor;
            } else {
                variant = selectedSize;
            }
            const findVarient = store.product.variant.find(
                (p) => p.variant == variant
            );
            //getVarianrtProductInfo(findVarient?.barcode);
            setVariantProduct(findVarient);
        }
    }, [
        store.product.is_variant,
        selectedColor,
        selectedSize,
        selectedColor.length,
        selectedSize.length,
    ]);
    // useEffect(() => {
    //     if (store.product.is_variant == 1 && findVarientItem) {
    //         setVisibleCartBox(true);
    //     } else {
    //         setVisibleCartBox(false);
    //     }
    // }, [findVarientItem, store.product.is_variant]);
    //
    // useEffect(() => {
    //     if (store.product.is_variant == 0 && findItem) {
    //         setVisibleCartBox(true);
    //     } else {
    //         setVisibleCartBox(false);
    //     }
    // }, [findItem]);


    useEffect(() => {
        if (store.product.is_variant == 0 && findItem) {
            setVisibleCartBox(true);
        } else if (store.product.is_variant == 0) {
            setVisibleCartBox(false);
        }

    }, [findItem, store.product.is_variant == 0]);

    useEffect(() => {

        if (store.product.is_variant == 1 && findVarientItem) {
            setVisibleCartBox(true);
        } else if (store.product.is_variant == 1) {
            setVisibleCartBox(false);
        }
    }, [findVarientItem, getCartCtxItems, store.product.is_variant == 1])

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

    // useEffect(() => {
    //   setVisibleCartBox(true);
    //   setVisibleQuoteBox(true);
    // }, []);
    const StyledRating = withStyles({
        iconFilled: {
            color: "#004a96",
        },
        iconHover: {
            color: "#004a96",
        },
    })(Rating);

    // const CountdownWrapper = () => {
    //   return (
    //     <Countdown
    //       date={Date.now() + store?.product?.flash_deal?.end_date}
    //       renderer={renderer}
    //     />
    //   );
    // };
    const addToCompareHandler = (item) => {
        if (ctxAuth.isLoggedIn) {
            http.post({
                url: postCompare,
                payload: {
                    product_id: item.id,
                },
                before: () => {
                },
                successed: (res) => {
                    dispatch({ type: "STORE_COMPARE_ITEM", item: res.result });
                },
                failed: () => {
                },
            });
        } else {
            router.push("/auth");
        }
    };
    const getDateFromScnds = new Date(
        store?.product?.flash_deal?.end_date * 1000
    );
    const { days, hours, minutes, seconds } = CountingComponent(getDateFromScnds);
    // const MemoCountdown = React.memo(CountdownWrapper);
    // const renderer = ({ days, hours, minutes, seconds }) => {
    //   return (
    //     <>
    //       <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
    //       <span>{seconds}</span>
    //     </>
    //   );
    // };

    const wishListHandler = (item, evt) => {
        evt.preventDefault();
        if (ctxAuth.isLoggedIn) {
            http.get({
                url:
                    postWishItem +
                    `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
                before: () => {
                },
                successed: (res) => {
                    dispatch({ type: "STORE_WISH_ITEM", item: item });
                    toast.success("Product Added to Wishlist");
                },
                failed: () => {
                },
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
            before: () => {
            },
            successed: (res) => {
                dispatch({ type: "REMOVE_WISH_ITEM", item: item });
                toast.success("Product Removed from Wishlist");
            },
            failed: () => {
            },
        });
    };
    const onChangeMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };
    const monthlyListHandler = (item, evt) => {
        evt.preventDefault();
        if (ctxAuth.isLoggedIn) {
            http.post({
                url: monthlyBazar,
                payload: {
                    user_id: ctxAuth.user.user.id,
                    product_id: item.id,
                    quantity: !findItem
                        ? 1
                        : findItem?.quantity == 0
                            ? 1
                            : findItem.quantity,
                    message: message,
                },
                before: () => {
                },
                successed: (res) => {
                    setMessage("");
                    console.log(res)
                    
                    toast.success(res?.message || "Product Added to Bazarlist");
                },
                failed: () => {
                    setIsValid(true);
                },
            });
        } else {
            router.push({ pathname: "/auth" });
        }
    };

    console.log(store.product, "haha");
    console.log({ findItem });
    // console.log(store.product.variant[0],store.)

    useEffect(() => {
        if (findCompare) {
            setFindCompareItem(true);
        } else {
            setFindCompareItem(false);
        }
    }, [findCompare]);

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
                    <div className="">
                        <SliderThumline item={store?.product?.photos} product={store?.product} />
                        {/* {store?.product?.photos?.length > 0 && (
              <SliderThumline item={store?.product?.photos} />
            )} */}
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
                    <div className="product-info-section-wrapper">
                        <div className="product-name-section position-relative">
                            <h4>{store?.product?.name}</h4>
                            <ul className="nav">
                                <li className="nav-item">
                                    <StyledRating
                                        name="simple-controlled"
                                        value={store?.product?.rating}
                                        size="small"
                                        readOnly
                                    />
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link disabled">
                                        {store?.product?.rating} ({store?.product?.rating_count}{" "}
                                        reviews &{" "}
                                        {store?.product?.qus_count + store?.product?.ans_count}{" "}
                                        answared questions)
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Write a Review
                                    </a>
                                </li>
                            </ul>

                            <div className="fixed-share-main">
                                <div className="share-toggleer">
                                    <a href="" className="share-parent">
                                        <i className="icofont-share"></i>
                                    </a>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <i className="icofont-facebook"></i>
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <i className="icofont-twitter"></i>
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <i className="icofont-instagram"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="brand-tag">
                                Brand: <span>{store?.product?.brand?.name}</span>{" "}
                            </div>

                            {/* <div className="price-tag">price : </div> */}
                            {store?.product.is_variant == 1 &&
                                variantProduct != undefined && (
                                    <>
                                        {variantProduct?.base_discounted_price > 0 && (
                                            <>
                                                <div className="price-flex d-flex">
                                                    <div className="current-price me-3">
                                                        Price : &#2547;{" "}
                                                        {variantProduct?.base_discounted_price} (BDT)
                                                    </div>
                                                    <div className="old-price">
                                                        Price : &#2547; {variantProduct?.base_price} (BDT)
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            {store?.product.is_variant == 0 && (
                                <>
                                    {store?.product?.discount > 0 && (
                                        <>
                                            <div className="old-price">
                                                &#2547; {store?.product?.base_price} (BDT)
                                            </div>
                                            <div className="current-price">
                                                Price : &#2547; {store?.product?.base_discounted_price} (BDT)
                                            </div>
                                        </>
                                    )}
                                    {store?.product?.discount <= 0 && (
                                        <>
                                            <div className="current-price">
                                                Price : &#2547; {store?.product?.base_price} (BDT)
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {
                                store?.product?.quote_applicable == 1 && <div className="brand-tag">
                                WholeSale Min Quantity:{" "}
                                <span>{store?.product?.wholesale_min_qty}</span>{" "}
                            </div>
                            }
                           

                            {/* <div className="old-price">&#2547; 1780 (BDT)</div> */}
                        </div>
                        {store?.product?.flash_deal?.end_date && (
                            <div className="qv-hotsale">
                                <div className="qv-hotsale-title">hot sale</div>
                                <div id="countdown">
                                    <div id="qv-tiles">
                                        {store?.product?.flash_deal?.end_date && (
                                            // <Countdown date={Date.now() + date} renderer={renderer} />
                                            // <MemoCountdown />
                                            <>
                                                <span>{days}</span>:<span>{hours}</span>:
                                                <span>{minutes}</span>:<span>{seconds}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={(coupon ? "" : "d-none") + " promotion-tags-main "}>
                            <h6 className="promotion-title">available offers</h6>
                            <div className="promotion-content">
                                <div className="tag-list">
                                    <div className="promotion-tag-item  has-arrow promotion-toggle-btn">
                                        <div className="tag-name">
                                            Min spend {coupon?.discount_type == "percent" ? "%" : "৳"}
                                            {coupon?.discount}
                                        </div>
                                    </div>
                                </div>
                                <div className="offer-dropdown-main shadow d-none">
                                    {coupon?.details?.map((item, index) => {
                                        return (
                                            <div className="voucher-main">
                                                <div className="voucher-item-left">
                                                    <img
                                                        src="../assets/images/logo.png"
                                                        alt=""
                                                        className="img-fluid"
                                                    />
                                                </div>
                                                <div className="voucher-item-right">
                                                    <div className="voucher-conditions">
                                                        <div className="discont">
                                                            {coupon?.discount_type == "percent" ? "%" : "৳"}{" "}
                                                            {item?.max_discount} Off
                                                        </div>
                                                        {item?.min_buy && (
                                                            <div className="condition">
                                                                Min spend ৳ {item?.min_buy}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <button className="voucher-item-button  " type="button">
                                                    Collect
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {store?.product.is_variant == 1 &&
                            (store?.product.sizes && store?.product?.sizes.length) > 0 && (
                                <div className="row g-3 align-items-center mb-3 select-option">
                                    <>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                            <label for="inputPassword6" className="col-form-label">
                                                select size
                                            </label>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                defaultValue={selectedSize}
                                                onChange={sizeChangeHandler}
                                            >
                                                {store?.product?.sizes?.map((item) => {
                                                    return <option value={item}>{item}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </>
                                </div>
                            )}

                        {store?.product.is_variant == 1 &&
                            (store?.product.colors && store?.product?.colors.length) > 0 && (
                                <div className="row g-3 align-items-center mb-3 select-option">
                                    <>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                            <label for="inputPassword6" className="col-form-label">
                                                select color
                                            </label>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                defaultValue={selectedColor}
                                                onChange={colorChangeHandler}
                                            >
                                                {store?.product?.colors.map((item) => {
                                                    return <option value={item}>{item}</option>;
                                                })}
                                            </select>
                                        </div>
                                        {" "}
                                    </>
                                </div>
                            )}

                        {/* <div className="will-pay">
            <p>
              {" "}
              You will pay <span className="text-danger">৳ 300 .</span>
              Buy <span className="text-danger">4</span> and save
              <span className="text-danger">৳ 30.</span>
            </p>
          </div> */}
                        <hr />

                        {store?.product?.is_weight == 1 &&
                            store?.product?.fraction_allow == 0 ? (
                            <select
                                name=""
                                id=""
                                onChange={weightChangeHandler}
                                className="form-control"
                            >
                                <option value="" disabled>
                                    Select Quantity
                                </option>
                                {store?.product?.weight?.map((item, index) => {
                                    return (
                                        <option
                                            selected={item.weight == selectedWeight}
                                            value={item.weight}
                                        >
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : null}

                        <div className="short-msg">
                            <label for="" className="form-label">
                                short message{" "}
                                {/* {isDetails.weight_note && (
                <span className="text-danger">{isDetails.weight_note}</span>
              )} */}
                                {isDetails.ProWiseShortMSG && (
                                    <span className="text-danger">
                                        {isDetails.ProWiseShortMSG}
                                    </span>
                                )}
                            </label>
                            <textarea
                                className="form-control"
                                name=""
                                id=""
                                cols="30"
                                rows="2"
                                value={message}
                                placeholder="Enter your Short message / Instruction"
                                onChange={onChangeMessage}
                            ></textarea>
                        </div>
                        <div className="addtocart-section my-3">
                            {!visibleCartBox && !findQuoteItem && !findReqStockItem && (
                                <div className="add-req-flex">
                                    {store?.product.is_variant == 1 &&
                                        variantProduct?.stock > 0 && (
                                            <button
                                                className="btn addtocart-btn"
                                                onClick={storeCartHandler.bind(this, store?.product)}
                                            >
                                                add to cart
                                            </button>
                                        )}
                                    {store?.product.is_variant == 1 &&
                                        variantProduct?.stock <= 0 && (
                                            <button
                                                className="btn requestto-stock-btn"
                                                onClick={requestStockHandler.bind(this, store?.product)}
                                            >
                                                request stock
                                            </button>
                                        )}
                                    {store?.product.is_variant == 0 && (store?.product.is_negative == 1 || store?.product.manage_stock == 0) && (
                                        <button
                                            className="btn addtocart-btn"
                                            onClick={storeCartHandler.bind(this, store?.product)}
                                        >
                                            add to cart
                                        </button>
                                    )}
                                    {store?.product.is_variant == 0 && (store?.product.manage_stock == 1 && store?.product.stock > 0 && store?.product.is_negative == 0) && (
                                        <button
                                            className="btn addtocart-btn"
                                            onClick={storeCartHandler.bind(this, store?.product)}
                                        >
                                            add to cart
                                        </button>
                                    )}
                                    {store?.product.is_variant == 0 && (store?.product.manage_stock == 1 && store?.product?.is_request_stock == 1 && store?.product.stock <= 0) &&
                                        (
                                            <button
                                                className="btn requestto-stock-btn"
                                                onClick={storeCartHandler.bind(this, store?.product)}
                                            >
                                                request stock
                                            </button>
                                        )}
                                    {store?.product.is_variant == 0 && (store?.product.manage_stock == 1 && store?.product?.is_request_stock == 0 && store?.product.stock <= 0 &&  store?.product.is_negative == 0 ) &&
                                        (
                                            <button
                                                className="btn requestto-stock-btn"
                                            // onClick={storeCartHandler.bind(this, store?.product)}
                                            >
                                                out of stock
                                            </button>
                                        )}
                                    {/*{store?.product.is_variant == 0 &&*/}
                                    {/*store?.product.variant[0].stock <= 0 && (*/}
                                    {/*    <button*/}
                                    {/*        className="btn requestto-stock-btn"*/}
                                    {/*        onClick={requestStockHandler.bind(this, store?.product)}*/}
                                    {/*    >*/}
                                    {/*        request stock*/}
                                    {/*    </button>*/}
                                    {/*)}*/}
                                    {
                                        store?.product?.quote_applicable == 1 &&
                                        <button
                                            className="btn addto-quote-btn"
                                            tabIndex="0"
                                            onClick={addToQuoteHandler.bind(this, store?.product)}
                                        >
                                            add to quote
                                        </button>
                                    }


                                </div>
                            )}
                            {visibleCartBox && (
                                <>
                                    {store?.product.is_variant == 0 && findItem && (
                                        <div className="quantity-box ">
                                            <button
                                                className="btn qty-minus-btn"
                                                onClick={qtyDecHandler.bind(this, store?.product)}
                                            >
                                                <i className="icofont-minus"></i>
                                            </button>
                                            <input
                                                type={
                                                    store?.product?.fraction_allow ? "number" : "text"
                                                }
                                                className="form-control"
                                                value={findItem?.quantity}
                                                onChange={qtyChangeHandler.bind(null, store?.product)}
                                                onBlur={blurHandler.bind(null, store?.product)}
                                                step="0.01"
                                            />
                                            <button
                                                className="btn qty-plus-btn"
                                                onClick={qtyIncHandler.bind(this, store?.product)}
                                            >
                                                <i className="icofont-plus"></i>
                                            </button>
                                        </div>
                                    )}
                                    {store?.product.is_variant == 1 && findVarientItem && (
                                        <div className="quantity-box ">
                                            <button
                                                className="btn qty-minus-btn"
                                                onClick={qtyDecHandler.bind(this, store?.product)}
                                            >
                                                <i className="icofont-minus"></i>
                                            </button>
                                            <input
                                                type={isDetails.fraction_allow ? "number" : "text"}
                                                className="form-control"
                                                value={findVarientItem?.quantity}
                                                onChange={qtyChangeHandler.bind(null, store?.product)}
                                                onBlur={blurHandler.bind(null, store?.product)}
                                                step="0.01"
                                            />
                                            <button
                                                className="btn qty-plus-btn"
                                                onClick={qtyIncHandler.bind(this, store?.product)}
                                            >
                                                <i className="icofont-plus"></i>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                            {visibleQuoteBox && findQuoteItem && (
                                <div
                                    className="quantity-box "
                                    style={{ background: "#137bc2" }}
                                >
                                    <button
                                        className="btn qty-minus-btn"
                                        onClick={quoteDecHandler}
                                    >
                                        <i className="icofont-minus"></i>
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={findQuoteItem?.quantity}
                                    />
                                    <button
                                        className="btn qty-plus-btn"
                                        onClick={quoteIncHandler}
                                    >
                                        <i className="icofont-plus"></i>
                                    </button>
                                </div>
                            )}
                            {visibleStockBox && findReqStockItem && (
                                <div
                                    className="quantity-box "
                                    style={{ background: "#c13b3b" }}
                                >
                                    <button
                                        className="btn qty-minus-btn"
                                        onClick={stockDecHandler}
                                    >
                                        <i className="icofont-minus"></i>
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={findReqStockItem?.quantity}
                                    />
                                    <button
                                        className="btn qty-plus-btn"
                                        onClick={stockIncHandler}
                                    >
                                        <i className="icofont-plus"></i>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="monthly-list-flex">
                            <a
                                href=""
                                className="btn save-month-btn"
                                onClick={monthlyListHandler.bind(this, store?.product)}
                            >
                                save monthly list
                            </a>
                            {!findWishItem && (
                                <a
                                    href
                                    className="btn save-month-btn"
                                    onClick={wishListHandler.bind(this, store?.product)}
                                >
                                    <i className="fa-regular fa-heart"></i> add to wishlist
                                </a>
                            )}
                            {findWishItem && (
                                <a
                                    href
                                    className="btn save-month-btn"
                                    onClick={wishListRemoveHandler.bind(this, store?.product)}
                                >
                                    <i className="fa-solid fa-heart-circle-plus"></i> remove
                                    wishlist
                                </a>
                            )}
                            {!findCompareItem && (
                                <a
                                    href
                                    className="btn save-month-btn"
                                    onClick={addToCompareHandler.bind(null, store?.product)}
                                >
                                    add to compare
                                </a>
                            )}
                            {findCompareItem && (
                                <a href className="btn save-month-btn">
                                    Added to Compare List
                                </a>
                            )}
                        </div>
                        <div className="sku-main-flex">
                            <div className="sku">sku : {store?.product?.sku}</div>
                            <div className="available-stock">
                                <div className="form-check  ps-0">
                                    {variant &&
                                        Object.keys(variant).length > 0 &&
                                        variant?.stock > 0 && (
                                            <>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked"
                                                    checked
                                                />
                                            </>
                                        )}
                                    {variant &&
                                        Object.keys(variant).length > 0 &&
                                        variant?.stock == 0 && (
                                            <>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked"
                                                    checked
                                                />
                                            </>
                                        )}

                                    <label className="form-check-label" for="flexCheckChecked">
                                        stock available
                                    </label>
                                </div>
                            </div>
                            {
                                !router.pathname.includes('product') &&  <Link href={'/product/{id}'+store?.product?.id} as={'/product/'+store?.product?.id}><a className="view-details">VIEW DETAILS</a></Link>
                            }

                        </div>
                    </div>
                </div>
            </div>

            {isDetails && (
                <>
                    <div className="row mt-10">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="product-details"
                                        data-bs-toggle="tab"
                                        data-bs-target="#product-details-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="product-details-pane"
                                        aria-selected="true"
                                    >
                                        product details
                                    </button>
                                </li>

                                {isDetails.specification && (
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="specification"
                                            data-bs-toggle="tab"
                                            data-bs-target="#specification-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="specification-pane"
                                            aria-selected="false"
                                        >
                                            specifications
                                        </button>
                                    </li>
                                )}

                                {isDetails.ingredients && (
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="ingredients"
                                            data-bs-toggle="tab"
                                            data-bs-target="#ingredients-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="ingredients-pane"
                                            aria-selected="false"
                                        >
                                            ingredients
                                        </button>
                                    </li>
                                )}

                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="reviews-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#reviews-tab-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="reviews-tab-pane"
                                        aria-selected="false"
                                    >
                                        Customer reviews & questions
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="product-details-pane"
                                    role="tabpanel"
                                    aria-labelledby="product-details"
                                    tabindex="0"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: store?.product?.description,
                                        }}
                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="specification-pane"
                                    role="tabpanel"
                                    aria-labelledby="specification"
                                    tabindex="0"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: store?.product?.specification,
                                        }}
                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="ingredients-pane"
                                    role="tabpanel"
                                    aria-labelledby="ingredients"
                                    tabindex="0"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: store?.product?.ingridients,
                                        }}
                                    />
                                </div>

                                <div
                                    className="tab-pane fade show"
                                    id="reviews-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="reviews-tab"
                                    tabindex="0"
                                >
                                    <ProductRatingTemplate product={store?.product} />
                                    <ProductQusAnsTemplate product={store?.product} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div
                                className="accordion accordion-flush"
                                id="accordionFlushExample"
                            >
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            additional information
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: store?.product?.additional_information,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="row mt-10">
                <div className="col-12">
                    <div className="product-disclaimer">
                        <p>Disclaimers : {isDetails.disclaimer}</p>
                    </div>
                </div>
            </div>
            {<ProductPromotionAdd />}
            {/* <SidebarJS/> */}
        </>
    );
}

export default ProductView;
