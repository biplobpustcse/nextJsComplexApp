import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useOutSideAlerter } from '../../hooks/useOutSideAlerter';
import { useOutSIdeAlerterProduct } from '../../hooks/useOutSIdeAlerterProduct';
import { productDataConverter } from '../../services/dataService';
import { baseUrl, http } from '../../services/httpService';
import { HotSaleSlider } from '../../utils/slider';
import {
  addCart,
  deleteBazarItem,
  deleteCompareItem,
  delete_Cart,
  getAllProduct,
  getBazarlist,
  getCart,
  getCompareList,
  getVariantInfo,
  postQuote,
  postRemoveWishItem,
  postReqStock,
  postWishItem,
  quoteDelete,
  removeWishItem,
  stockDelete,
} from '../lib/endpoints';
import { getToken } from '../lib/token';

const ResturantInfoModel = ({ item = [], setProductData, section }) => {
  // console.log(JSON.stringify(item), "itemContain");
  console.log({ item }, 'yahuu');
  let itemContain = item;
  const router = useRouter();
  // ref dropdown variant product
  const dropDownRef = useRef(null);
  const dropDownMainRef = useRef();
  // product quantity & loader
  const [qty, setQty] = useState('');
  const [stockQty, setStockQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ctxApp = useSelector((store) => store.appReducerContext);

  // variant product
  const [variantProduct, setVariantProduct] = useState();
  //selected color & size
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  //clicked Cart
  const [clickedCart, setClickedCart] = useState(false);
  //redux state check
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const ctxWish = useSelector((store) => store.wishReducerContext);
  const [cartCollection, setCartCollection] = useState(
    ctxApp.cartCollection || []
  );
  console.log(ctxApp.cartCollection, 'collection');

  const [isOpenVariant, setIsOpenVarient] = useState(false);
  const dispatch = useDispatch();
  //visible Qty Checker
  const [visibleCartBox, setVisibleCartBox] = useState(false);
  const [visibleQuoteBox, setVisibleQuoteBox] = useState(false);
  const [visibleStockBox, setVisibleStockBox] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [isSucceessToRequServer, setIsSuccessToRequServer] = useState(false);

  const [isWished, setIsWished] = useState(false);
  const getCartCtxItems = getCartContext.Items;
  const findItem = getCartCtxItems.find((item2) => item2.id === itemContain.id);
  const findWishItem = ctxWish.Items.find(
    (item2) => item2.id === itemContain.id
  );
  console.log({ ctxApp });
  console.log(ctxApp.stockItems, 'stockItems');
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
    if (item.is_variant == 1) {
      barcode = variantProduct?.barcode;
    } else {
      barcode = item.barcode;
    }
    return item2.id == item.id && item2.barcode == barcode;
  });
  const findReqStockItem = ctxApp.stockItems.find(function (item2) {
    let barcode;

    if (item.is_variant == 1) {
      barcode = variantProduct?.barcode;
    } else {
      barcode = item.barcode;
    }
    return item2.id == item.id && parseInt(item2.barcode) == parseInt(barcode);
  });

  // const getCartCollection = useCallback(() => {
  //   http.get({
  //     url: getCart,
  //     before: () => {},
  //     successed: (res) => {
  //       console.log({ res }, "uribaba");

  //       var data = [];
  //       res.forEach((element) => {
  //         element.cart_items.forEach((item) => {
  //           data.push(item);
  //         });
  //       });
  //       setCartCollection(data || []);
  //       console.log({ data });
  //     },
  //     failed: () => {},
  //   });
  // }, []);

  const dispatchPostQuote = (res) => {
    dispatch({
      type: 'STORE_QUOTE_ITEM',
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
      type: 'UPDATE_QUOTE_ITEM',
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
        variant = '';
      }
      postQuoteHandler(
        item2,
        item2.wholesale_min_qty + 1,
        dispatchPostQuote,
        variant
      );
    } else {
      router.push('/auth');
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
        before: () => {},
        successed: () => {},
        failed: () => {},
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
      before: () => {},
      successed: (res) => {
        http.get({
          url: getCompareList,
          before: () => {},
          successed: (res) => {
            setProductData(productDataConverter(res.result.data));
          },
          failed: () => {},
        });
      },
      failed: () => {},
    });
  };
  const deleteBazarlistHandler = (item) => {
    http.post({
      url: deleteBazarItem + item.id,
      payload: {
        user_id: ctxAuth.user.user.id,
      },
      before: () => {},
      successed: (res) => {
        http.get({
          url: getBazarlist,
          before: () => {},
          successed: (res) => {
            setProductData(productDataConverter(res.result.data));
          },
          failed: () => {},
        });
      },
      failed: () => {},
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
      before: () => {},
      successed: (res) => {
        if (res.barcode != undefined) {
          funcCall(res);
          toast.success('Quote add successfully');
        } else {
          toast.error(res.message);
        }

        //setVisibleQuoteBox(true);
      },
      failed: () => {
        console.log('failed');
      },
    });
  };

  //? request stock
  //?end request stock

  const storeCartHandler = (itemContain, e) => {
    e.preventDefault();
    const loggedIn = ctxAuth.isLoggedIn;
    if (itemContain.is_variant == 1 && item.is_weight == 0) {
      if (itemContain.offer) {
        itemContain.offer = itemContain.offer;
      } else {
        itemContain.offer = '';
      }
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
        variantProduct?.base_discounted_price.toString().replace(/,/g, '')
      );

      itemContain.price = parseFloat(
        variantProduct?.base_price.toString().replace(/,/g, '')
      );

      itemContain.color = selectedColor;
      itemContain.size = selectedSize;
      itemContain.promotion = itemContain?.promotion_type;
      itemContain.promotion_code = itemContain?.promotion_code;
      console.log(itemContain, 'itemm');

      let quantity = 1;
      setQty(1);
      let type = '';
      if (ctxAuth.isLoggedIn) {
        if (itemContain.promotion) {
          type = itemContain.promotion;
        } else {
          type = 'product';
        }

        http.post({
          url: addCart,
          payload: {
            id: itemContain.id,
            bar_code: itemContain.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: quantity,
            product_referral_code: '',
            type: type || '',
            promotion_code: itemContain.promotion_code,
            instruction: '',
            deal_offer: itemContain.offer || '',
            deal_offer_amount: itemContain.offer_amount || '',
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: 'VARIANT_ADD_CART',
                item: itemContain,
                promotion: itemContain?.promotion_type,
                promotion_code: itemContain?.promotion_code,
              });
            } else {
              toast.error('Stock Out');
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: 'VARIANT_ADD_CART',
          item: itemContain,
          promotion: itemContain?.promotion_type,
          promotion_code: itemContain?.promotion_code,
        });
      }
    } else if (itemContain.is_weight == 1) {
      if (itemContain.offer) {
        itemContain.offer = itemContain.offer;
      } else {
        itemContain.offer = '';
      }
      let qty = selectedWeight;
      console.log(JSON.stringify(itemContain) + 'itemContain');
      // itemContain.discountPrice = parseFloat(
      //   itemContain?.base_discounted_price
      // );
      // itemContain.price = parseFloat(itemContain?.base_price);
      // alert(itemContain.base_discounted_price)
      // alert(itemContain.base_price);
      itemContain.promotion = itemContain?.promotion_type;
      itemContain.selectedWeight = selectedWeight;
      itemContain.promotion_code = itemContain?.promotion_code;
      itemContain.barcode = itemContain?.barcode;
      let type = '';
      if (ctxAuth.isLoggedIn) {
        if (itemContain.promotion) {
          type = itemContain.promotion;
        } else {
          type = 'product';
        }
        http.post({
          url: addCart,
          payload: {
            id: itemContain.id,
            bar_code: itemContain.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: qty,
            product_referral_code: '',
            type: type || '',
            promotion_code: itemContain.promotion_code,
            instruction: '',
            deal_offer: itemContain.offer || '',
            deal_offer_amount: itemContain.offer_amount || '',
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: 'Store_Cart_WEIGHT_Item',
                item: itemContain,
                qty: qty,
                promotion: itemContain?.promotion_type,
                promotion_code: itemContain?.promotion_code,
              });
            } else {
              toast.error('Stock Out');
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: 'Store_Cart_WEIGHT_Item',
          item: itemContain,
          qty: qty,
          promotion: itemContain?.promotion_type,
          promotion_code: itemContain?.promotion_code,
        });
      }
    } else if (itemContain.is_variant == 0) {
      if (itemContain.offer) {
        itemContain.offer = itemContain.offer;
      } else {
        itemContain.offer = '';
      }
      itemContain.barcode = itemContain?.barcode;
      itemContain.promotion = itemContain?.promotion_type;
      itemContain.promotion_code = itemContain?.promotion_code;

      // itemContain.discountPrice = parseFloat(
      //   itemContain?.base_discounted_price.toString().replace(/,/g, "")
      // );

      // itemContain.price = parseFloat(
      //   itemContain?.base_price.toString().replace(/,/g, "")
      // );

      let quantity = 1;
      if (itemContain.fraction_allow == 1) {
        let uomKgYard = itemContain.uomkgyardQty ? itemContain.uomkgyardQty : 1;
        quantity = itemContain.quantity + parseFloat(uomKgYard);
      } else {
        quantity =
          parseFloat(itemContain.quantity) + parseFloat(selectedWeight);
      }
      if (ctxAuth.isLoggedIn) {
        let type = '';
        if (itemContain.promotion) {
          type = itemContain.promotion;
        } else {
          type = 'product';
        }
        http.post({
          url: addCart,
          payload: {
            id: itemContain.id,
            bar_code: itemContain.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: 1,
            product_referral_code: '',
            type: type || '',
            promotion_code:
              itemContain.promotion_code == null
                ? ''
                : itemContain.promotion_code,
            instruction: '',
            deal_offer: itemContain.offer || '',
            deal_offer_amount: itemContain.offer_amount || '',
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: 'Store_Cart_Item',
                qty: quantity,
                item: itemContain,
                promotion: itemContain?.promotion_type,
                promotion_code: itemContain?.promotion_code,
              });
              console.log({ itemContain }, 'man');
            } else {
              toast.error('Stock Out');
            }
            setIsSuccessToRequServer(true);
          },
          failed: () => {
            toast.error('Stock Out');
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: 'Store_Cart_Item',
          qty: quantity,
          item: itemContain,
          promotion: itemContain?.promotion_type,
          promotion_code: itemContain?.promotion_code,
        });
      }
    }
    // getCartContext.storeCartItems(itemContain);
  };

  // const sendCartRequestToServer = (element, qty) => {
  //   http.post({
  //     url: addCart,
  //     payload: {
  //       id: element.id,
  //       bar_code: element.barcode,
  //       user_id: ctxAuth.user.user.id,
  //       quantity: qty,
  //       product_referral_code: "",
  //       type: element.type,
  //       promotion_code: element.promotion_code,
  //       instruction: "",
  //       deal_offer: element.offer || "",
  //       deal_offer_amount: element.offer_amount || "",
  //     },
  //     before: () => {},
  //     successed: () => {
  //       setIsSuccessToRequServer(true);
  //     },
  //     failed: () => {},
  //   });
  // };

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
      type: 'STORE_REQUEST_ITEM',
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
      type: 'UPDATE_REQUEST_ITEM',
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
        variant = '';
      }
      postRequestQty(item, 1, dispatchPostReqStock, variant);
    } else {
      router.push('/auth');
    }
    // alert("Development On Going");
  };

  const stockQtyChangeHandler = ({ target }) => {};
  const stockblurHandler = () => {};
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
        before: () => {},
        successed: () => {},
        failed: () => {},
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
      before: () => {},
      successed: (res) => {
        funcCall(res);
        // setStockQty(res.quantity_count);
        // if (res.quantity_count > 0) setVisibleStockBox(true);
        // else {
        //   setVisibleStockBox(false);
        // }
      },
      failed: (res) => {},
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
  console.log({ findItem });

  const qtyIncHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    let item;
    // if (item2.is_variant == 0 && item2.is_weight == 0) {
    if (item2.is_variant == 0) {
      // quantity = findItem.quantity + 1;
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
      // } else if (item2.is_variant == 1 && item2.is_weight == 0) {
    } else if (item2.is_variant == 1) {
      // quantity = findVarientItem.quantity + 1;
      quantity =
        item2.is_quantity_multiplied == 1
          ? findVarientItem.quantity + item2.min_qty
          : findVarientItem.quantity + 1;
      item = findVarientItem;
    } else if (item2.is_weight == 1) {
      quantity = parseInt(findItem.quantity) + parseInt(selectedWeight);
      item = findItem;
    }

    if (ctxAuth.isLoggedIn) {
      let type = '';
      if (item2.promotion) {
        type = itemContain.promotion;
      } else {
        type = 'product';
      }

      http.post({
        url: addCart,
        payload: {
          id: item2.id,
          bar_code: item2.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: quantity,
          product_referral_code: '',
          type: type,
          promotion_code: item2.promotion_code,
          instruction: '',
          deal_offer: item2.offer || '',
          deal_offer_amount: item2.offer_amount || '',
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
          } else {
            toast.error('Stock Out');
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
    }

    // getCartContext.updateQuantity(findItem, quantity);
  };

  const wishListHandler = (item, evt) => {
    evt.preventDefault();
    if (ctxAuth.isLoggedIn) {
      http.get({
        url:
          postWishItem +
          `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
        before: () => {},
        successed: (res) => {
          dispatch({ type: 'STORE_WISH_ITEM', item: item });
          toast.success('Wish add successfully');
        },
        failed: () => {},
      });
    } else {
      router.push({ pathname: '/auth' });
    }
  };

  const wishListRemoveHandler = (item, evt) => {
    evt.preventDefault();
    http.get({
      url:
        removeWishItem +
        `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
      before: () => {},
      successed: (res) => {
        dispatch({ type: 'REMOVE_WISH_ITEM', item: item });
        toast.success('Wish remove successfully');
      },
      failed: () => {},
    });
  };

  const qtyDecHandler = (item2, e) => {
    e.preventDefault();
    let quantity;
    let item;
    console.log('item2: ', item2);

    // if (item2.is_variant == 0 && item2.is_weight == 0) {
    //   quantity = findItem.quantity - 1;
    //   item = findItem;
    // } else if (item2.is_variant == 1 && item2.is_weight == 0) {
    //   quantity = findVarientItem.quantity - 1;
    //   item = findVarientItem;
    // } else if (item2.is_weight == 1) {
    //   quantity = parseInt(findItem.quantity) - parseInt(selectedWeight);
    //   item = findItem;
    // }
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
      let type = '';
      if (item2.promotion) {
        type = itemContain.promotion;
      } else {
        type = 'product';
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
            product_referral_code: '',
            type: type,
            promotion_code: item2.promotion_code,
            instruction: '',
            deal_offer: item2.offer || '',
            deal_offer_amount: item2.offer_amount || '',
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
            } else {
              toast.error('Stock Out');
            }
          },
        });
      } else if (quantity <= 0) {
        console.log({ cartCollection });
        const getItem = ctxApp.cartCollection.find(
          (item) => parseInt(item.barcode) == item2.barcode
        );
        if (getItem != undefined) {
          http.post({
            url: delete_Cart + getItem.id,
            payload: {},
            before: () => {},
            successed: () => {
              dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
            },
            failed: () => {},
          });
        }
        if (getItem == undefined) {
          dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
        }
      }
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({ type: 'UPDATE_QTY', item: item, qty: quantity });
    }
    // if (item.quantity <= 0) {
    //   dispatch({ type: "REMOVE_SINGLE_ITEM", item: item });
    // }

    // getCartContext.updateQuantity(findItem, quantity);
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_SINGLE_ITEM', item: item });
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
    let quantity = 1;
    if (target.value === '') {
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
          parseFloat(target.value) >= parseFloat(itemContain.weight_min_qty)
        ) {
          quantity = parseFloat(target.value);
          setQty(parseFloat(target.value));
        } else {
          quantity = parseFloat(itemContain.weight_min_qty);
          setQty(parseFloat(itemContain.weight_min_qty));
        }
      } else {
        toast.error('Fraction not allowed');
        return;
      }
    }
    if (ctxAuth.isLoggedIn) {
      let type = '';
      if (itemContain.promotion) {
        type = itemContain.promotion;
      } else {
        type = 'product';
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
          product_referral_code: '',
          type: type,
          promotion_code: itemContain.promotion_code,
          instruction: '',
          deal_offer: itemContain.offer || '',
          deal_offer_amount: itemContain.offer_amount || '',
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({
              type: 'UPDATE_EDITABLE_QTY',
              item: item,
              qty: quantity,
            });
          } else {
            toast.error('Stock Out');
          }
        },
      });
    } else if (!ctxAuth.isLoggedIn) {
      dispatch({
        type: 'UPDATE_EDITABLE_QTY',
        item: item,
        qty: quantity,
      });
    }

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
        let type = '';
        if (itemContain.promotion) {
          type = itemContain.promotion;
        } else {
          type = 'product';
        }
        http.post({
          url: addCart,
          payload: {
            id: itemContain.id,
            bar_code: itemContain.barcode,
            user_id: ctxAuth.user.user.id,
            quantity: 1,
            product_referral_code: '',
            type: type,
            promotion_code: itemContain.promotion_code,
            instruction: '',
            deal_offer: itemContain.offer || '',
            deal_offer_amount: itemContain.offer_amount || '',
          },
          before: () => {},
          successed: (res) => {
            if (res.result) {
              dispatch({
                type: 'UPDATE_EDITABLE_QTY',
                item: item,
                qty: 1,
              });
            } else {
              toast.error('Stock Out');
            }
          },
        });
      } else if (!ctxAuth.isLoggedIn) {
        dispatch({
          type: 'UPDATE_EDITABLE_QTY',
          item: item,
          qty: 1,
        });
      }

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
      type: 'removeViewProduct',
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
          type: 'setViewProduct',
          payload: res,
        });
      },
      failed: () => {},
    });
  }, []);

  useEffect(() => {
    if (item.is_variant == 0 && findItem) {
      setVisibleCartBox(true);
    } else if (item.is_variant == 0) {
      setVisibleCartBox(false);
    }
  }, [findItem, item.is_variant == 0]);

  useEffect(() => {
    if (item.is_variant == 1 && findVarientItem) {
      setVisibleCartBox(true);
    } else if (item.is_variant == 1) {
      setVisibleCartBox(false);
    }
  }, [findVarientItem, getCartCtxItems, item.is_variant == 1]);

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
  console.log({ cartCollection });

  // useEffect(() => {
  //   if (ctxApp.cartCollection.length > 0) {
  //     setCartCollection(ctxApp.cartCollection);
  //   }
  // }, [ctxApp.cartCollection.length]);
  // useEffect(() => {
  //   getCartCollection();
  // }, [getCartCtxItems.length]);
  // console.log({ cartCollection });
  let [showDesc, setShowDesc] = useState(false);

  return (
    <>
      <div className="single-food-main">
        <div class="image-box">
          <div
            className="hover-btn"
            onClick={() => {
              setShowDesc(!showDesc);
            }}
          >
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <img
            src={
              item?.image != null || item?.image != ''
                ? item?.image
                : item?.photos.length > 0
                ? item?.photos[0]
                : ''
            }
            alt=""
            class="img-fluid"
          />
          {/* 
          {itemContain?.hasDiscount && (
            <div className="label-block label-right">
              <div className="product-badget">
                {itemContain?.discount_show == "amount" ||
                itemContain?.discount_show == null
                  ? parseFloat(itemContain?.price) -
                    parseFloat(itemContain?.discountPrice) +
                    " Tk"
                  : (itemContain?.discountPrice / itemContain?.price) * 100 +
                    " %"}{" "}
                off
              </div>
            </div>
          )} */}
        </div>{' '}
        <div className="content-box">
          {/* <div className={item.is_variant == 0 &&  item.manage_stock == 1 && item?.is_request_stock == 0 && item.stock <= 0 ? "description-box stock-out" : "description-box"}> */}
          <>
            <h5>
              <Link href={`/product/${itemContain?.id}`}>
                {itemContain?.name}
              </Link>
            </h5>
            {item.is_variant == 0 && item.is_weight == 0 && (
              <h6 class="product-price">
                {item.discount > 0 && (
                  <>
                    &#2547; {item?.discountPrice} <span>/per {item?.unit}</span>
                    <del> &#2547; {item.price}</del>
                  </>
                )}
                {item.discount == 0 && (
                  <>
                    &#2547; {item?.price} <span>/per {item?.unit}</span>
                  </>
                )}
              </h6>
            )}
            {item?.is_variant == 1 &&
              item.is_weight == 0 &&
              variantProduct != undefined && (
                <h6 class="product-price">
                  {variantProduct?.base_discounted_price > 0 && (
                    <>
                      &#2547; {variantProduct?.base_discounted_price}{' '}
                      <span>/per {variantProduct?.unit}</span>
                      <del> &#2547; {variantProduct?.base_price}</del>
                    </>
                  )}
                  {variantProduct?.base_discounted_price == 0 && (
                    <>
                      &#2547; {variantProduct?.base_price}{' '}
                      <span>/per {variantProduct?.unit}</span>
                    </>
                  )}
                </h6>
              )}

            {item.is_weight == 1 && (
              <h6 class="product-price">
                {item.discount > 0 && (
                  <>
                    &#2547; {item?.discountPrice} <span>/per {item?.unit}</span>
                    <del> &#2547; {item.price}</del>
                  </>
                )}
                {item.discount == 0 && (
                  <>
                    &#2547; {item?.price} <span>/per {item?.unit}</span>
                  </>
                )}
              </h6>
            )}

            <div
              class="moredetails-main"
              style={{
                display:
                  item.is_variant == 1 || item.is_weight == 1
                    ? 'block'
                    : 'none',
              }}
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
                          isOpenVariant ? `dropdown-menu show` : `dropdown-menu`
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
          </>
          <div class="addtocart-section">
            {!visibleCartBox && !findQuoteItem && !findReqStockItem && (
              <div class="add-req-flex">
                {item.is_variant == 1 && variantProduct?.stock > 0 && (
                  <button
                    class="btn addtocart-btn"
                    onClick={storeCartHandler.bind(this, item)}
                  >
                    add to cart
                  </button>
                )}
                {item.is_variant == 1 &&
                  item?.is_request_stock == 1 &&
                  variantProduct?.stock <= 0 && (
                    <button
                      class="btn requestto-stock-btn"
                      tabindex="0"
                      onClick={requestStockHandler.bind(this, item)}
                    >
                      request stock
                    </button>
                  )}
                {item.is_variant == 0 &&
                  (item.is_negative == 1 || item.manage_stock == 0) && (
                    <button
                      class="btn addtocart-btn"
                      onClick={storeCartHandler.bind(this, item)}
                    >
                      add to cart
                    </button>
                  )}

                {item.is_variant == 0 &&
                  item.manage_stock == 1 &&
                  item.stock > 0 &&
                  item.is_negative == 0 && (
                    <button
                      class="btn addtocart-btn"
                      onClick={storeCartHandler.bind(this, item)}
                    >
                      add to cart
                    </button>
                  )}

                {item.is_variant == 0 &&
                  item.manage_stock == 1 &&
                  item?.is_request_stock == 1 &&
                  item.stock <= 0 && (
                    <button
                      class="btn requestto-stock-btn"
                      tabindex="0"
                      onClick={requestStockHandler.bind(this, item)}
                    >
                      request stock
                    </button>
                  )}
                {item.is_variant == 0 &&
                  item.manage_stock == 1 &&
                  item?.is_request_stock == 0 &&
                  item.stock <= 0 &&
                  item.is_negative == 0 && (
                    <button
                      class="btn requestto-stock-btn"
                      tabindex="0"
                      // onClick={requestStockHandler.bind(this, item)}
                    >
                      out of stock
                    </button>
                  )}
                {item?.quote_applicable == 1 && (
                  <button
                    class="btn addto-quote-btn"
                    tabindex="0"
                    onClick={addToQuoteHandler.bind(this, item)}
                  >
                    add to quote
                  </button>
                )}
                {/* {router.pathname == "/bulkSale" && (
                    <button class="btn addto-quote-btn" tabindex="0">
                      Request Price Or Quote
                    </button>
                  )} */}
              </div>
            )}
            {visibleCartBox && (
              <>
                {item.is_variant == 0 && findItem && (
                  <div class="quantity-box">
                    <button
                      class="btn qty-minus-btn"
                      onClick={qtyDecHandler.bind(this, item)}
                    >
                      <i class="icofont-minus"></i>
                    </button>
                    {item.is_weight == 1 ? (
                      <input
                        type="number"
                        class="form-control"
                        value={findItem?.quantity}
                        disabled={true}
                        // onChange={qtyChangeHandler.bind(null, item)}
                        // onBlur={blurHandler.bind(null, item)}
                        // step="0.01"
                      />
                    ) : (
                      <input
                        type="number"
                        className="form-control"
                        value={findItem?.quantity}
                        onChange={qtyChangeHandler.bind(null, item)}
                        onBlur={blurHandler.bind(null, item)}
                        step="0.01"
                      />
                    )}
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
            )}
            {visibleQuoteBox && findQuoteItem && (
              <div class="quantity-box" style={{ background: '#137bc2' }}>
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
            {visibleStockBox && findReqStockItem && (
              <div class="quantity-box" style={{ background: '#c13b3b' }}>
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
            )}

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
    </>
  );
};

export default ResturantInfoModel;
