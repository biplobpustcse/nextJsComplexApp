import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { http, baseUrl, frontendBaseUrl } from "../../services/httpService";
// import Script from 'next/script'
import {
  addCart,
  addCartMultiple,
  applyCoupon,
  delete_Cart,
  getCart,
  getFuc___Area,
  getFuc___District,
  getFuc___Division,
  getFuc___Upazilla,
  getPaymentURL,
  orderCreate,
  postAddress,
  productMultiArrayNewCart,
  removeCoupon,
} from "../lib/endpoints";
import { toast } from "react-toastify";
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import Axios from "axios";
import Head from "next/head";
import useBkash from "../../hooks/useBkash";
import { Button, Tooltip } from "@mui/material";
import { productDataConverter } from "../../services/dataService";
import cartIdProductDetailsToRedux from "../../services/cartProductToRedux";
import { InfinitySpin } from "react-loader-spinner";

const ViewCart = ({
  getSavedAddress,
  storeList,
  typeOfPayments,
  coupons,
  cartItems,
}) => {
  console.log({ storeList });
  const router = useRouter();
  const [trackCollection, setTrackCollection] = useState(false);
  const [successOrderStatus, setSuccessOrderStatus] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [cartCollection, setCartCollection] = useState(
    cartItems.forEach((element) => {
      element.cart_items.forEach((item) => {
        item;
      });
    }) || []
  );
  const [open, setOpen] = useState(false);
  const [couponApplySuccessfully, setCouponApplySuccessfully] = useState(false);
  const handleOpen = () => {
    var myModal = new bootstrap.Modal(
      document.getElementById("staticBackdropModal2")
    );
    myModal.show();
  };
  const handleClose = () => {
    var genericModalEl = document.getElementById("staticBackdropModal2");
    var modal = bootstrap.Modal.getInstance(genericModalEl);
    modal.hide();
    setOpen(false);
  };
  const handleBillingModalClose = () => {
    var genericModalEl = document.getElementById("staticBackdropModalBilling");
    var modal = bootstrap.Modal.getInstance(genericModalEl);
    modal.hide();
  };
  const [openPayment, setOpenPayment] = useState(false);
  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => {
    setSuccessOrderStatus(false);
    setOpenPayment(false);
  };
  const [subTotalSum, setSubTotalSum] = useState(0);
  const [subTotalTax, setSubTotalTax] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [viewOtherAddress, setViewOtherAddress] = useState(false);
  const [viewShippingAddress, setViewShippingAddress] = useState(false);
  const [defaultSameAddress, setDefaultSameAddress] = useState(false);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  console.log({ cartCollection });
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const appContext = useSelector((store) => store.appReducerContext);
  const dispatch = useDispatch();
  const [selectedFucDivision, setSelectedFucDivision] = useState({
    id: "",
    name: "",
  });
  const [selectedDivision, setSelectedDivision] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedArea, setSelectedArea] = useState({
    id: "",
    name: "",
  });
  const [qty, setQty] = useState("");
  const [savedAddresses, setSavedAddresses] = useState(
    getSavedAddress.data || []
  );
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [homeDelivary, setHomeDelivary] = useState(true);
  const [storeDelivary, setStoreDelivary] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [fucMainDivision, setFucMainDivision] = useState([]);
  const [fuc_division, setFucDivision] = useState();
  const [name, setName] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [phone, setPhone] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setAddress] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [area, setarea] = useState();
  const [areas, setAreas] = useState([]);
  const [track, setTrack] = useState(false);
  const [findDefaultAddress, setFindDefaultAddress] = useState(
    savedAddresses?.find((item) => item.set_default == 1) || {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const [finalMessage, setFinalMessage] = useState(false);
  const [combineOrderID, setCombineOrderID] = useState();
  const [paymentProcess, setPaymentProcess] = useState(true);
  const [loadingQtyInc, setLoadingQtyInc] = useState(false);
  const [loadingQtyDec, setLoadingQtyDec] = useState(false);

  const [selectedStore, setSelectedStore] = useState({});
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(0);

  const [membershipDiscount, setMembershipDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  let { init, startPayment } = useBkash();
  const [initialRenderDone, setInitialRenderDone] = useState(false);

  const nameChangeHandler = ({ target }) => {
    setName(target.value);
  };
  const addressChangeHandler = ({ target }) => {
    setAddress(target.value);
  };
  const phoneChangeHandler = ({ target }) => {
    setPhone(target.value);
  };
  const postCodeChangeHnadler = ({ target }) => {
    setPostalCode(target.value);
  };
  const editAddressHandler = () => {
    setIsChecked((prevState) => !prevState);
    setDefaultSameAddress(!defaultSameAddress);
  };
  const selectedPaymentHandler = (item, { target }) => {
    setSelectedPayment(item);
  };
  const confirmOrderHandler = () => {
    setSuccessOrderStatus(true);
    handleOpenPayment();
  };
  const applyCouponHandler = (item) => {
    setCoupon(item.code);
    setCouponApplySuccessfully(false);
  };
  const couponOnChangeHandler = ({ target }) => {
    setCoupon(target.value);
    setCouponApplySuccessfully(false);
  };

  const saveAddressHandler = () => {
    if (
      name == "" ||
      address == "" ||
      phone == "" ||
      district == "" ||
      division == "" ||
      postalCode == "" ||
      area == undefined
    ) {
      toast.error("All field are required");
      return;
    }
    http.post({
      url: postAddress,
      payload: {
        user_id: ctxAuth.user.user.id,
        name: name,
        address: address,
        Divisionid: fuc_division.id,
        Districtid: division.id,
        Upazillaid: district.id,
        AreaDeliveryChargeId: area.id,
        postal_code: postalCode,
        phone: phone,
      },
      before: () => {},
      successed: (res) => {
        // getSavedDistricts(ctxAuth.user.user.id);
        setName("");
        setAddress("");
        setPhone("");
        setDistricts([]);
        setDivisions([]);

        setPostalCode("");
        setSavedAddresses((state) => {
          return [
            ...state,
            {
              ...res.address,
            },
          ];
        });
        console.log(res.address, "address");
        setSelectedShippingAddress(res.address);
        handleClose();
      },
      failed: () => {},
    });
  };

  const saveBillingAddressHandler = () => {
    if (
      name == "" ||
      address == "" ||
      phone == "" ||
      district == "" ||
      division == "" ||
      postalCode == "" ||
      area == undefined
    ) {
      toast.error("All field are required");
      return;
    }
    http.post({
      url: postAddress,
      payload: {
        user_id: ctxAuth.user.user.id,
        name: name,
        address: address,
        Divisionid: fuc_division.id,
        Districtid: division.id,
        Upazillaid: district.id,
        AreaDeliveryChargeId: area.id,
        postal_code: postalCode,
        phone: phone,
      },
      before: () => {},
      successed: (res) => {
        // getSavedDistricts(ctxAuth.user.user.id);
        setName("");
        setAddress("");
        setPhone("");
        setDistricts([]);
        setDivisions([]);
        setPostalCode("");
        setFindDefaultAddress(res.address);
        // setViewOtherAddress((state) => {
        //   return {...state,...res.address}
        // })
        setSavedAddresses((state) => {
          return [
            ...state,
            {
              ...res.address,
            },
          ];
        });
        // setSelectedShippingAddress(res.address);
        handleBillingModalClose();
      },
      failed: () => {},
    });
  };

  const getDivision = useCallback((id) => {
    http.get({
      url: getFuc___District + id,
      before: () => {},
      successed: (res) => {
        console.log(res);
        setDivisions(res);
      },
      failed: () => {},
    });
  }, []);
  const getDivisionMain = () => {
    http.get({
      url: getFuc___Division,
      before: () => {},
      successed: (res) => {
        setFucMainDivision(res);
      },
      failed: () => {},
    });
  };
  const postCouponHandler = () => {
    if (coupon != "") {
      http.post({
        url: applyCoupon,
        payload: {
          user_id: ctxAuth.user.user.id,
          owner_id: "",
          coupon_code: coupon,
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            setCouponDiscount(res.discount || 0);
            setCoupon("");
            setCouponApplySuccessfully(true);
            // setCookie("coupon", res.discount);
            localStorage.setItem("coupon", coupon);
            setCookie("coupon", {
              type: res.discount_type,
              amount: res.discount,
            });
          } else {
            toast.error(res.message);
            setCoupon("");
          }
        },
        failed: () => {},
      });
    } else {
      toast.error("Invalid coupon");
    }
  };
  const removeCouponHandler = () => {
    http.post({
      url: removeCoupon,
      before: () => {},
      successed: (res) => {
        if (res.result == true) {
          setCouponDiscount(0);
          setCoupon("");
          setCouponApplySuccessfully(false);
          localStorage.removeItem("coupon");
          deleteCookie("coupon");
          getCartCollection();
        }
      },
      failed: () => {},
    });
  };
  const reApplyCoupon = () => {
    if (localStorage.getItem("coupon")) {
      http.post({
        url: removeCoupon,
        before: () => {},
        successed: (res) => {
          if (res.result == true) {
            http.post({
              url: applyCoupon,
              payload: {
                user_id: ctxAuth.user.user.id,
                owner_id: "",
                coupon_code: localStorage.getItem("coupon"),
              },
              before: () => {},
              successed: (res) => {
                if (res.result) {
                  setCouponDiscount(res.discount || 0);
                  setCoupon("");
                  setCouponApplySuccessfully(true);
                  // setCookie("coupon", res.discount);
                  setCookie("coupon", {
                    type: res.discount_type,
                    amount: res.discount,
                  });
                  getCartCollection();
                } else {
                  toast.error(res.message);
                  setCoupon("");
                }
              },
              failed: () => {},
            });
          }
        },
        failed: () => {},
      });
    } else {
      if (getCookie("coupon")) {
        deleteCookie("coupon");
        setCouponApplySuccessfully(false);
      }
    }
  };
  const fixedDefaultAddressHandler = (item) => {
    setFindDefaultAddress(item);
    // if(defaultSameAddress == false){
    //   setSelectedShippingAddress(item);
    // }
  };
  const fixedShippingAddressHandler = (item) => {
    // setFindDefaultAddress(item);
    // if(defaultSameAddress == false){
    setSelectedShippingAddress(item);
    // }
  };
  const getDistrict = useCallback((id) => {
    http.get({
      url: getFuc___Upazilla + id,
      before: () => {},
      successed: (res) => {
        console.log({ res }, "address");
        setDistricts(res);
      },
      failed: () => {},
    });
  }, []);
  const getArea = useCallback((id) => {
    http.get({
      url: getFuc___Area + id,
      before: () => {},
      successed: (res) => {
        console.log({ res }, "address");
        setAreas(res);
      },
      failed: () => {},
    });
  }, []);
  useEffect(() => {
    // if (fuc_division) {
    //   getDivision(fuc_division.id);
    // }
    // if (division) {
    //   getDistrict(division.id);
    // }
    // if (district) {
    //   getArea(district.id);
    // }
    if (selectedDivision.name.length > 0) {
      getDistrict(selectedDivision.id);
    }
  }, [selectedDivision.name.length, fuc_division, division, district]);
  useEffect(() => {
    getDivisionMain();

    // getDivision();
  }, []);

  const viewAddressHandler = () => {
    setViewOtherAddress(!viewOtherAddress);
  };

  const viewShippingAddressHandler = () => {
    setViewShippingAddress(!viewShippingAddress);
  };

  const viewCreateAddress = () => {
    var myModal = new bootstrap.Modal(
      document.getElementById("staticBackdropModalBilling")
    );
    myModal.show();
  };

  const qtyIncHandler = (item2, e) => {
    item2.Isloading2 = true;
    e.preventDefault();
    setLoadingQtyInc(true);
    let quantity;
    let getItem;
    if (item2.type != "package") {
      if (item2.offer == "" || item2.offer == undefined) {
        getItem = getCartContext.Items.find(
          (item) => item.id == item2.product_id && item.barcode == item2.barcode
        );
      } else if (item2.offer != "" || item2.offer != undefined) {
        getItem = getCartContext.Items.find(
          (item) => item.id == item2.product_id && item.offer == item2.offer
        );
      }
    } else {
      getItem = getCartContext.Items.find(
        (item) => item.id == item2.promotion_code
      );
    }

    if (item2.type != "package") {
      if (getItem.is_weight == 0) {
        let uomKgYard = getItem.uomkgyardQty ? getItem.uomkgyardQty : 1;
        if (getItem.fraction_allow == 1) {
          quantity = getItem.quantity + parseFloat(uomKgYard);
        } else {
          quantity = parseFloat(getItem.quantity) + parseFloat(uomKgYard);
        }
      } else if (getItem.is_weight == 1 && item2.offer == undefined) {
        quantity =
          parseInt(getItem.quantity) + parseInt(getItem.selectedWeight);
      } else if (
        getItem.is_weight == 1 &&
        item2.offer != "" &&
        item2.offer != undefined
      ) {
        quantity = parseInt(getItem.quantity) + 1;
      } else {
        quantity = parseInt(getItem.quantity) + 1;
      }
    } else {
      quantity = parseInt(getItem.quantity) + 1;
    }

    getItem.quantity = quantity; //redux state update
    item2.quantity = quantity; //direct object update
    /*  if (ctxAuth.isLoggedIn) {
            dispatch({ type: "UPDATE_QTY", item: item2, qty: item2.quantity });
            // requestCartToServer();*/
    requestSingleAddCartToServer(getItem, item2);
    // } else if (!ctxAuth.isLoggedIn) {
    //   dispatch({ type: "UPDATE_QTY", item: item2, qty: item2.quantity });
    // }
  };

  const requestSingleAddCartToServer = (element, item2) => {
    if (getCartContext.Items.length > 0) {
      http.post({
        url: addCart,
        payload: {
          id: element.type != "product" ? "" : element.id,
          bar_code: element.type != "product" ? "" : element.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: element.quantity,
          product_referral_code: "",
          type: element.type,
          promotion_code:
            element.promotion_code == 0 ? "" : element.promotion_code,
          instruction: "",
          deal_offer: element.offer || "",
          deal_offer_amount: element.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result == true) {
            dispatch({
              type: "UPDATE_QTY",
              item: element,
              qty: element.quantity,
            });
            item2.Isloading2 = false;
            item2.Isloading = false;
            setLoadingQtyInc(false);
            setLoadingQtyDec(false);
            //if coupon exist then reAppy the coupon to maintain perfect calculation of coupon discount
            if (getCookie("coupon")) {
              reApplyCoupon();
            } else {
              getCartCollection();
            }
          } else {
            item2.Isloading2 = false;
            item2.Isloading = false;
            setLoadingQtyInc(false);
            setLoadingQtyDec(false);
            toast.error(res?.message);
          }
        },
        failed: () => {},
      });
    }
  };

  const qtyDecHandler = (item2, index, e) => {
    e.preventDefault();

    setLoadingQtyDec(true);
    item2.Isloading = true;
    let quantity;
    let item;
    let getItem;

    if (item2.type != "package") {
      if (item2.offer == "" || item2.offer == undefined) {
        getItem = getCartContext.Items.find(
          (item) => item.id == item2.product_id && item.barcode == item2.barcode
        ); //redux state
      } else if (item2.offer != "" || item2.offer != undefined) {
        getItem = getCartContext.Items.find(
          (item) => item.id == item2.product_id && item.offer == item2.offer
        ); //redux state
      }
    } else {
      getItem = getCartContext.Items.find(
        (item) => item.id == item2.promotion_code
      ); //redux state
    }

    if (item2.type != "package") {
      if (getItem?.is_weight == 0) {
        let uomKgYard = getItem.uomkgyardQty ? getItem.uomkgyardQty : 1;
        if (getItem?.fraction_allow == 1) {
          quantity = getItem.quantity - parseFloat(uomKgYard);
        } else {
          quantity = parseFloat(getItem.quantity) - parseFloat(uomKgYard);
        }
      } else if (getItem.is_weight == 1 && item2.offer == undefined) {
        quantity =
          parseInt(getItem.quantity) - parseInt(getItem.selectedWeight);
      } else if (
        getItem.is_weight == 1 &&
        item2.offer != "" &&
        item2.offer != undefined
      ) {
        quantity = parseInt(getItem.quantity) - 1;
      } else {
        quantity = parseInt(getItem.quantity) - 1;
      }
    } else {
      quantity = parseInt(getItem.quantity) - 1;
    }

    if (quantity <= 0) {
      toast.error("Qty must be greater than 0");
      setLoadingQtyDec(false);
    } else {
      item2.quantity = quantity; //direct item object
      getItem.quantity = item2.quantity; //redux state

      // dispatch({ type: "UPDATE_QTY", item: item2, qty: item2.quantity });
      requestSingleAddCartToServer(getItem, item2);
    }
  };

  const qtyChangeHandler = (itemContain, { target }) => {
    const item = getCartContext.Items.find(
      (item) =>
        item.id == itemContain.product_id && item.barcode == itemContain.barcode
    );

    // let item;
    // if (itemContain.is_variant == 0) {
    //   item = findItem;
    // } else if (itemContain.is_variant == 1) {
    //   item = findVarientItem;
    // }
    let quantity = 1;
    if (target.value === "") {
      quantity = 0;
      setQty(0);
    } else {
      // setQty(target.value);
      if (parseFloat(target.value) % 1 != 0 && item.fraction_allow == 1) {
        if (parseFloat(target.value) >= parseFloat(item.weight_min_qty)) {
          quantity = parseFloat(target.value);
          setQty(parseFloat(target.value));
          // alert(parseFloat(target.value))
          itemContain.quantity = quantity;
        } else {
          quantity = parseFloat(item.weight_min_qty);
          setQty(parseFloat(item.weight_min_qty));
          itemContain.quantity = quantity;
        }
      } else if (parseFloat(target.value) % 1 == 0) {
        if (parseFloat(target.value) >= parseFloat(item.weight_min_qty)) {
          quantity = parseFloat(target.value);
          setQty(parseFloat(target.value));
          // alert(parseFloat(target.value))
          itemContain.quantity = quantity;
        } else {
          quantity = parseFloat(item.weight_min_qty);
          setQty(parseFloat(item.weight_min_qty));
          itemContain.quantity = quantity;
        }
      } else {
        toast.error("Fraction not allowed");
        return;
      }
    }
    if (ctxAuth.isLoggedIn) {
      let type = "";
      if (item.promotion) {
        type = item.promotion;
      } else {
        type = "product";
      }
      // if (quantity == 0) {
      //   quantity = 1;
      // }
      http.post({
        url: addCart,
        payload: {
          id: item.id,
          bar_code: item.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: quantity,
          product_referral_code: "",
          type: type,
          promotion_code: item.promotion_code,
          instruction: "",
          deal_offer: item.offer || "",
          deal_offer_amount: item.offer_amount || "",
        },
        before: () => {},
        successed: (res) => {
          if (res.result) {
            dispatch({
              type: "UPDATE_EDITABLE_QTY",
              item: item,
              qty: quantity,
            });
            //if coupon exist then reAppy the coupon to maintain perfect calculation of coupon discount
            reApplyCoupon();
            getCartCollection();
          } else {
            itemContain.quantity = item.quantity;
            dispatch({
              type: "UPDATE_EDITABLE_QTY",
              item: item,
              qty: item.quantity,
            });
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
          before: () => {},
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

  // const qtyChangeHandler = (itemContain, { target }) => {
  //   if (target.value === "") {
  //     setQty(0);
  //   } else {
  //     setQty(target.value);
  //   }
  //   const getItem = getCartContext.Items.find(
  //     (item) => item.id == itemContain.product_id
  //   );
  //   dispatch({
  //     type: "UPDATE_EDITABLE_QTY",
  //     item: getItem,
  //     qty: target.value,
  //   });
  //
  //   requestCartToServer();
  // };
  //
  // const blurHandler = (itemContain) => {
  //   if (qty === 0) {
  //     alert("Quantity Can't be less than 1");
  //     const getItem = getCartContext.Items.find(
  //       (item) => item.id == itemContain.product_id
  //     );
  //     dispatch({
  //       type: "UPDATE_EDITABLE_QTY",
  //       item: getItem,
  //       qty: 1,
  //     });
  //     requestCartToServer();
  //
  //     setQty(1);
  //   }
  // };

  // const { error, loading, triggerBkash } = useBkash({
  //   onSuccess: (data) => {
  //     console.log(data); // this contains data from api response from onExecutePayment
  //   },
  //   onClose: () => {
  //     console.log('Bkash iFrame closed');
  //   },
  //   bkashScriptURL: 'https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js', // https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js
  //   amount: 1000,
  //   onCreatePayment: async (paymentRequest) => {
  //     // call your API with the payment request here
  //     return await fetch('<your backend api>/create/', {
  //       method: 'POST',
  //       body: JSON.stringify(paymentRequest),
  //     }).then((res) => res.json());
  //
  //     // must return the following object:
  //     // {
  //     // 	paymentID: string;
  //     // 	createTime: string;
  //     // 	orgLogo: string;
  //     // 	orgName: string;
  //     // 	transactionStatus: string;
  //     // 	amount: string;
  //     // 	currency: string;
  //     // 	intent: string;
  //     // 	merchantInvoiceNumber: string;
  //     // }
  //   },
  //   onExecutePayment: async (paymentID) => {
  //     // call your executePayment API here
  //     return await fetch('<your backend api>/execute/${paymentID}', {
  //       method: 'POST',
  //     }).then((res) => res.json());
  //
  //     // it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
  //   },
  // });

  const confirmToOrderCreateHandler = useCallback(() => {
    if (Object.keys(findDefaultAddress).length == 0) {
      toast.error("Billing address is required");
      return;
    }
    if (shippingChargeStatus.status == false) {
      toast.error("Your Minimum Order Amount is " + selectedShippingAddress.Minimum_Order_Value + " TK" + " Please Order More");
      return;
    }
    if (storeDelivary == false) {
      if (
        selectedShippingAddress == 0 ||
        selectedShippingAddress == "" ||
        Object.keys(selectedShippingAddress).length == 0
      ) {
        toast.error("Shipping address is required");
        return;
      }
    }

    if (
      selectedPayment.payment_type == undefined ||
      selectedPayment.payment_type == ""
    ) {
      toast.error("Please Select a payment method");
      return;
    }

    setProcessing(true);
    let combineOrderId;
    let bkash_token;
    let order_total_amount;
    if (selectedPayment.payment_type != undefined) {
      let pickup_point = "",
        shipping_type,
        address_id = "",
        billing_address_id = "";
      if (homeDelivary) {
        shipping_type = "home_delivery";
        billing_address_id = findDefaultAddress.id;
        address_id = selectedShippingAddress.id;
      } else {
        if (Object.keys(selectedStore).length == 0) {
          toast.error("please select a store");
          return;
        }
        shipping_type = "pickup_point";
        pickup_point = selectedStore;
        billing_address_id = findDefaultAddress.id;
      }

      const token = JSON.parse(localStorage.getItem("USERWHOLESALE25"));

      Axios.post(
        baseUrl + "/" + orderCreate,
        {
          user_id: ctxAuth.user.user.id,
          payment_type: selectedPayment.payment_type_key,
          payment_option: selectedPayment.payment_type_key,
          amount:
            subTotalSum +
            subTotalTax -
            (discountAmount + membershipDiscount + couponDiscount),
          shipping_type: shipping_type,
          pickup_point: pickup_point,
          address_id: address_id,
          billing_address_id: billing_address_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token?.access_token,
          },
        }
      )
        .then((res) => {
          setProcessing(false);

          if (res.data.result == true) {
            deleteCookie("coupon");
            localStorage.removeItem("coupon");
            localStorage.removeItem("CARTV1WHOLESALE25");
            if (
              selectedPayment.payment_type != "cash_payment" &&
              shipping_type != "pickup_point"
            ) {
              setCombineOrderID(res.data.combined_order_id);
              combineOrderId = res.data.combined_order_id;
              order_total_amount = res.data.data.grand_total;
              Axios.post(
                baseUrl +
                  "/" +
                  getPaymentURL +
                  "?platform=web&url=" +
                  frontendBaseUrl +
                  "/orderDetails/" +
                  res.data.data.id,
                {
                  // payment_type: res.data.data.payment_type,
                  payment_type: "cart_payment",
                  combined_order_id: res.data.combined_order_id,
                  amount: res.data.data.grand_total,
                  user_id: res.data.data.user_id,
                  payment_option: res.data.data.payment_type,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token?.access_token,
                  },
                }
              ).then((val) => {
                bkash_token = val.data.token;
                confirmOrderHandler();

                dispatch({ type: "CLEAR_CART_ITEMS" });

                if (selectedPayment.payment_type == "nagad") {
                  window.open(val.data.url, "_blank");
                  router.push("/");
                  return;
                }
                if (selectedPayment.payment_type.includes("sslcommerz")) {
                  window.open(val.data.url, "_blank");
                  router.push("/");
                  return;
                }

                if (selectedPayment.payment_type != "cash_payment") {
                  startPayment({
                    payAmount: order_total_amount,
                    paymentType: "bkash",
                    token: bkash_token,
                    checkOutUrl: baseUrl + "/bkash/api/checkout",
                    executeUrl: baseUrl + "/bkash/api/execute",
                    onSuccess: (data) => {
                      http.post({
                        url: "bkash/api/process",
                        payload: {
                          combined_order_id: combineOrderId,
                          payment_details: data,
                          payment_type: "cart_payment",
                        },
                        before: () => {},
                        successed: () => {
                          document.getElementById(
                            "bKashFrameWrapper"
                          ).style.display = "none";
                          toast.success("Payment Successfull", "success");
                          router.push("/purchaseHistory");
                        },
                        failed: () => {},
                      });
                    },
                    onError: (data) => {
                      toast.error("Payment Failed", "error");
                      router.push("/purchaseHistory");
                    },
                  });
                }
              });
            } else {
              confirmOrderHandler();
              dispatch({ type: "CLEAR_CART_ITEMS" });
              var myModal = new bootstrap.Modal(
                document.getElementById("staticBackdropModal3")
              );
              myModal.show();
              router.push("/purchaseHistory");
            }
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error, "err");
        });
    } else {
      toast.error("Select Payment First");
    }
  }, [findDefaultAddress, selectedShippingAddress, selectedPayment]);
  const requestCartToServer = () => {
    const arrOfCarts = [];
    if (getCartContext.Items.length > 0) {
      getCartContext.Items.forEach((element) => {
        arrOfCarts.push({
          id: element.type != "product" ? "" : element.id,
          bar_code: element.type != "product" ? "" : element.barcode,
          user_id: ctxAuth.user.user.id,
          quantity: element.quantity,
          product_referral_code: "",
          type: element.type,
          promotion_code:
            element.promotion_code == 0 ? "" : element.promotion_code,
          instruction: "",
          deal_offer: element.offer || "",
          deal_offer_amount: element.offer_amount || "",
        });
      });
      http.post({
        url: addCartMultiple,
        payload: arrOfCarts,
        before: () => {},
        successed: () => {},
        failed: () => {},
      });
    }
  };

  const cartListItem = (serverData = []) => {
    let product = [];
    let packages, today_deal;
    let array = [];

    if (ctxAuth.isLoggedIn && serverData.length > 0) {
      // let url = ctxApp.cartCollection.map((item) => item.product_id || item.promotion_code).join(",");
      let url = serverData.map((item) => item.id).join(",");

      http.get({
        // url: productMultiArrayNew + url,
        url: productMultiArrayNewCart + url,
        before: () => {},
        successed: (res) => {
          console.log({ res }, "ghfgh6");
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
            let checkPeakProduct = serverData.find(
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

          if (res.promotions) {
            packages = res.promotions.forEach((itemContain) => {
              let itemFindQty = serverData.find(
                (item) => itemContain.PROMOTION_CODE == item.promotion_code
              );

              if (
                getCartContext.Items.filter(
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
        },
        failed: () => {},
      });
    }

    let data = [...product, ...array];

    return data;
  };

  const getCartCollection = useCallback(() => {
    setTrackCollection(false);

    setTimeout(
      function () {
        http.get({
          url: getCart,
          before: () => {},
          successed: (res) => {
            setIsLoading(false);

            const arrayOfCartItems = [];
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

            setCartCollection(arrayOfCartItems);

            // getCartContext.Items.forEach((reduxItem) => {
            //     let existStock =  arrayOfCartItems.find((cartItem) => reduxItem.barcode == cartItem.barcode )
            //     if(existStock == undefined) {
            //         dispatch({
            //             type : 'REMOVE_SINGLE_ITEM',
            //             item : reduxItem
            //         })
            //     }
            // })

            let sumTotal = 0,
              sumTax = 0,
              sumMembershipDis = 0;
            arrayOfCartItems.forEach((item) => {
              sumTotal +=
                item.peak_of_peak_dis > 0 ||
                (item.offer != null && item.offer != "")
                  ? (parseFloat(item.price) +
                      parseFloat(item.membership_discount)) *
                    parseFloat(item.quantity)
                  : parseFloat(item.price) * parseFloat(item.quantity);
              sumTax += parseFloat(item.tax) * parseFloat(item.quantity);
              // sumMembershipDis +=
              //   parseFloat(item.quantity) * item.membership_discount != undefined &&
              //     item.membership_discount != null
              //     ? parseFloat(item.membership_discount)
              //     : 0;
            });

            setSubTotalSum(sumTotal);
            setSubTotalTax(sumTax);
            // setMembershipDiscount(sumMembershipDis);

            var totalDiscount = 0;
            res.forEach((item) => {
              item.cart_items.forEach((value) => {
                totalDiscount +=
                  (value?.peak_of_peak_dis > 0
                    ? parseFloat(value?.peak_of_peak_dis || 0)
                    : value?.offer != null && value?.offer != ""
                    ? parseFloat(value?.deal_offer_amount || 0)
                    : parseFloat(value?.membership_discount || 0) +
                      parseFloat(value?.discount || 0) +
                      parseFloat(value?.deal_offer_amount || 0)) *
                  parseFloat(value?.quantity);
              });
            });

            getCookie("coupon")
              ? setCouponDiscount(
                  parseFloat(JSON.parse(getCookie("coupon")).amount)
                )
              : setCouponDiscount(0);

            if (isNaN(totalDiscount)) {
              totalDiscount = 0;
            }

            !getCookie("coupon")
              ? setDiscountAmount(parseFloat(totalDiscount))
              : setDiscountAmount(0);

            setLoadingQtyInc(false);
            setLoadingQtyDec(false);
          },
          failed: () => {},
        });
      },
      [500]
    );
  }, []);

  const removeCartItemHandler = (item) => {
    let getItem;

    if (item?.type !== "package") {
      if (item.offer == "" || item.offer == undefined || item.offer == null) {
        getItem = getCartContext.Items.find(
          (data) => data.id == item.product_id && data.barcode == item.barcode
        ); //redux state
      } else if (item.offer != "" || item.offer != undefined || item != null) {
        getItem = getCartContext.Items.find(
          (data) => data.id == item.product_id && data.offer == item.offer
        ); //redux state
      }
    } else if (item?.type == "package") {
      getItem = getCartContext.Items.find(
        (data) => data.id == item.promotion_code
      ); //redux state
    }

    http.post({
      url: delete_Cart + item.id,
      before: () => {},
      successed: (res) => {
        if (res.result) {
          if (getItem != undefined) {
            dispatch({ type: "REMOVE_SINGLE_ITEM", item: getItem });
            reApplyCoupon();
            getCartCollection();
          }
        }

        if (cartItems.length == 0) {
          deleteCookie("coupon");
          setSelectedShippingAddress(0);
          setDiscountAmount(0);
        }
      },
      failed: () => {},
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const arrayOfCartItems = [];
    cartItems.forEach((element) => {
      element.cart_items.forEach((item) => {
        arrayOfCartItems.push(item);
      });
    });
    setCartCollection(arrayOfCartItems);
    setHomeDelivary(true);
  }, []);

  useEffect(() => {
    if (isChecked) {
      setSelectedShippingAddress(findDefaultAddress);
      setName(findDefaultAddress?.name);
      setAddress(findDefaultAddress.address);
      setPhone(findDefaultAddress.phone);
      setPostalCode(findDefaultAddress.postal_code);
      setSelectedAddress(findDefaultAddress);

      setFucDivision({
        Divisionid: findDefaultAddress.Divisionid,
        name: findDefaultAddress.Division,
      });
      setSelectedFucDivision({
        id: findDefaultAddress.Divisionid,
        name: findDefaultAddress.Division,
      });

      setDivision({
        Districtid: findDefaultAddress.Districtid,
        name: findDefaultAddress.District,
      });
      setSelectedDivision({
        id: findDefaultAddress.Districtid,
        name: findDefaultAddress.District,
      });

      setDistrict({
        Upazillaid: findDefaultAddress.Upazillaid,
        name: findDefaultAddress.Upazilla,
      });
      setSelectedDistrict({
        id: findDefaultAddress.Upazillaid,
        name: findDefaultAddress.Upazilla,
      });

      setarea({
        AreaDeliveryChargeId: findDefaultAddress.AreaDeliveryChargeId,
        name: findDefaultAddress.AreaDeliveryCharge,
      });
      setSelectedArea({
        id: findDefaultAddress.AreaDeliveryChargeId,
        name: findDefaultAddress.AreaDeliveryCharge,
      });

      setSelectedShippingAddress(findDefaultAddress);
    } else {
      setName("");
      setAddress("");
      setPhone("");
      setPostalCode("");
      setSelectedAddress("");

      setDivision({
        state_id: "",
        name: "",
      });
      setDistrict({
        state_id: "",
        name: "",
      });
      setSelectedDivision({
        id: "",
        name: "",
      });
      setSelectedDistrict({
        id: "",
        name: "",
      });
      setSelectedShippingAddress("");
    }
  }, [isChecked]);
  useEffect(() => {
    if (findDefaultAddress && track == false) {
      setSelectedShippingAddress(findDefaultAddress);
      setTrack(true);
    }

    console.log({ findDefaultAddress });
  }, [findDefaultAddress]);

  useEffect(() => {
    getCartCollection();
  }, []);

  let [shippingChargeStatus, setShippingChargeStatus] = useState({
    status: false,
    shippingCharge: 0,
  });
  useEffect(() => {
    let total = subTotalSum + subTotalTax;
    if (Object.keys(selectedShippingAddress).length === 0) {
      return;
    }
    console.log(selectedShippingAddress);
    console.log(
      parseFloat(selectedShippingAddress.Minimum_Order_Value) < total
    );
    console.log(
      total < parseFloat(selectedShippingAddress.Maximum_Order_Value)
    );

    if (
      parseFloat(selectedShippingAddress.Minimum_Order_Value) < total &&
      total < parseFloat(selectedShippingAddress.Maximum_Order_Value)
    ) {
      setShippingChargeStatus({
        status: true,
        shippingCharge: parseFloat(selectedShippingAddress.Delivery_Charge),
      });
    } else if (
      total > parseFloat(selectedShippingAddress.Maximum_Order_Value)
    ) {
      setShippingChargeStatus({
        status: true,
        shippingCharge: parseFloat(
          selectedShippingAddress.MaxOrdValueDelivery_Charge
        ),
      });
    } else {
      setShippingChargeStatus({
        status: false,
        shippingCharge: 0,
      });
      toast.error("You are not eligible for delivery");
    }

    //  Minimum_Order_Value: '2000',
    //   Maximum_Order_Value: '10000',
    //   MaxOrdValueDelivery_Charge: '0',
  }, [selectedShippingAddress]);

  // useEffect(() => {
  //     if(cartCollection.length > 0 && trackCollection == false){
  //         alert('1')
  //         //dispatch({type: "SERVER_CART_COLLECTION",items: cartCollection})
  //         dispatch({type:"CLEAR_CART_ITEMS"})
  //         let allDetialsDataFromServer =  cartListItem(cartCollection)
  //         alert(allDetialsDataFromServer.length)
  //
  //         if (allDetialsDataFromServer.length > 0 ) {
  //
  //             productDataConverter(allDetialsDataFromServer).map((item) => {
  //
  //                 // here barcode
  //                 let getCart;
  //
  //                 //     =  ctxApp.cartCollection.find(
  //                 //     (item3) =>item3.barcode==item.barcode ||  item3.promotion_code==item.promotion_code
  //                 // );;
  //
  //
  //                 if(item.promotion_code != null && item.promotion_code != ""){
  //
  //                     getCart = appContext.cartCollection.find(
  //                         (item3) =>  item3.promotion_code == item.promotion_code
  //                     );
  //                 }
  //                 else
  //                 {
  //                     getCart = appContext.cartCollection.find(
  //                         (item3) =>  item3.barcode == item.barcode && item3.offer == item.offer
  //                     );
  //                 }
  //
  //                 const findItem = getCartContext.Items.find(
  //                     (item2) => (item2.barcode == item.barcode) || (item.id == item2.id)
  //                 );
  //                 // if (findItem == undefined && ctxAuth.isLoggedIn) {
  //
  //
  //                 if (item.is_variant == 1) {
  //
  //
  //                     const findItem = item.variant.find(
  //                         (item2) => item2.barcode == item.barcode
  //                     );
  //                     // item.discountPrice = parseFloat(
  //                     //   findItem?.base_discounted_price.toString().replace(/,/g, "")
  //                     // );
  //                     // item.price = parseFloat(
  //                     //   findItem?.base_price.toString().replace(/,/g, "")
  //                     // );
  //                     item.promotion = findItem?.promotion_type;
  //                     item.promotion_code = findItem?.promotion_code;
  //                     item.quantity = getCart?.quantity;
  //                     if (item.offer) {
  //                         item.offer = item.offer;
  //                     } else {
  //                         item.offer = "";
  //                     }
  //                     if(getCart){
  //                         item.price = getCart.price;
  //                     }
  //
  //                     dispatch({
  //                         type: "VARIANT_ADD_CART",
  //                         item: item,
  //                         promotion: item?.promotion_type,
  //                         promotion_code: item?.promotion_code,
  //                     });
  //                 } else if (item.is_weight == 1) {
  //
  //
  //                     item.promotion = item?.promotion_type;
  //                     // item.selectedWeight = item.weight[0].weight;
  //                     item.promotion_code = item?.promotion_code;
  //                     item.quantity = getCart?.quantity;
  //                     if (item.offer) {
  //                         item.offer = item.offer;
  //                     } else {
  //                         item.offer = "";
  //                     }
  //
  //                     // item.offer = getCart.offer
  //                     if(getCart){
  //                         item.price = getCart.price;
  //                     }
  //
  //                     dispatch({
  //                         type: "Store_Cart_WEIGHT_Item",
  //                         item: item,
  //                         qty: item.quantity,
  //                         promotion: item?.promotion_type,
  //                         promotion_code: item?.promotion_code,
  //                     });
  //                 } else if(item.is_variant == 0) {
  //
  //                     // item.price =
  //                     //   "main_price" in item
  //                     //     ? parseFloat(item.main_price)
  //                     //     : parseFloat(item?.base_price);
  //
  //
  //
  //                     item.promotion = item?.promotion_code != null && item?.promotion_code != "" ? "package" : item?.promotion_type;
  //                     item.promotion_code = item?.promotion_code;
  //                     item.quantity = getCart?.quantity;
  //
  //                     if(getCart.offer){
  //
  //                         item.offer = getCart.offer
  //                         item.discount = item.today_deal_price
  //                         item.price = item.discountPrice
  //
  //                     }
  //                     if (item.offer) {
  //                         item.offer = item.offer;
  //
  //                     } else {
  //                         item.offer = "";
  //                     }
  //
  //                     if(getCart){
  //                         // item.price = getCart.price;
  //                         item.quantity = getCart?.quantity;
  //
  //                     }
  //
  //
  //                     console.log(item,'iopio')
  //
  //
  //
  //                     dispatch({
  //                         type: "Store_Cart_Item",
  //                         qty: item?.quantity,
  //                         item: item,
  //                         promotion: item?.promotion_type,
  //                         promotion_code: item?.promotion_code,
  //                     });
  //                 }
  //                 // }
  //             });
  //
  //
  //
  //
  //             // console.log({ makeCartFundamental });
  //             // let storedCart = {};
  //             // let cartV1 = localStorage.getItem("CARTV1WHOLESALE25");
  //             // if (cartV1) {
  //             //   storedCart = JSON.parse(cartV1);
  //             // }
  //             // let count = 0;
  //             // const mergedArray = [...storedCart.Items, ...makeCartFundamental];
  //             // let truncateItems = [];
  //             // mergedArray.forEach((item) => {
  //             //   mergedArray.forEach((item2) => {
  //             //     if (item.barcode == item2.barcode) {
  //             //       count = 1;
  //             //     }
  //             //   });
  //             //   if (count == 0) {
  //             //     truncateItems.push(item);
  //             //   }
  //             //   count = 0;
  //             // });
  //             // truncateItems = storedCart.Items.filter(
  //             //   (val) => !makeCartFundamental.includes(val.barcode)
  //             // );
  //             // dispatch({ type: "CART_IMPORT_FROM_DATABASE", items: truncateItems });
  //             // console.log({ truncateItems });
  //
  //         }
  //
  //         setTrackCollection(true)
  //     }
  //
  //     // return () => {
  //     //     setTrackCollection(false)
  //     // }
  //
  // },[cartCollection,trackCollection])

  useEffect(() => {
    var total = cartCollection.reduce(function (sum, value) {
      if (value.offer == null || value.offer == "") {
        console.log(value.price);
        return sum + parseFloat(value.price) * parseFloat(value.quantity);
      } else {
        return sum;
      }
    }, 0);

    if (
      parseFloat(appContext.today_discount_limit_amount) > parseFloat(total)
    ) {
      if (cartCollection.length > 0) {
        let data = cartCollection.find((item) => {
          return item.offer != "" && item.offer != null;
        });

        if (
          data != undefined &&
          appContext.today_discount_limit_amount > total
        ) {
          removeCartItemHandler(data);
        }

        // dispatch({type : "TODAY_DISCOUNT_LIMIT_AMOUNT",payload :   null })
      }
    }
  }, [getCartContext.Items.length, cartCollection]);

  const calculatePriceOfWeight = (item) => {
    let weight = getCartContext?.items?.find((data) => {
      if (data.barcode == item.barcode) {
        return data.selectedWeight;
      }
    });

    return weight;
  };

  useEffect(() => {
    //only for first render
    if (initialRenderDone == false && cartCollection.length > 0) {
      setInitialRenderDone(true);
      dispatch({
        type: "CLEAR_CART_ITEMS",
      });
      cartIdProductDetailsToRedux(getCartContext, ctxAuth, dispatch);
    }
  }, [initialRenderDone, cartCollection]);

  //
  // function listenMessage(msg) {
  //   alert(msg);
  // }

  return (
    <>
      <Head>
        {/*<script src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"></script>*/}
        <script type="text/javascript"></script>
        <script
          src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"
          defer
        ></script>
        {/*<script src="https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js"></script>*/}
      </Head>
      <button
        id="bKash_button"
        style={{
          display: "none",
        }}
      >
        pay with bkash
      </button>
      {isLoading && (
        <div className="loader-testing">
          <InfinitySpin color="#004a96" />
        </div>
      )}
      <section className="newcart-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-9">
              <div className="cart-bg">
                <div className="table-title-flex">
                  <h4>shopping cart ({cartCollection.length}) </h4>
                  <p className="charge-location">
                    <i class="icofont-google-map"></i> delivery charge info
                  </p>
                </div>
                <div class="table-responsive shopping-cart-table">
                  <table class="table table-bordered mb-0">
                    <thead className="table-gray">
                      <tr>
                        <th scope="col">Sl No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">product name</th>
                        <th scope="col">unit price</th>
                        <th scope="col">qunatity</th>
                        <th scope="col">total</th>
                        <th scope="col">discount</th>
                        <th scope="col">action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartCollection.map((item, index) => {
                        let weight = getCartContext.Items?.find((data) => {
                          if (data.barcode == item.barcode) {
                            return data;
                          }
                        });

                        return (
                          <tr>
                            <th scope="row" className="text-center">
                              {index + 1}
                            </th>
                            <td>
                              <img
                                src={item.product_thumbnail_image}
                                alt={item.product_name}
                              />
                            </td>
                            <td className="product-name-td">
                              <h6> {item.product_name}</h6>
                              <p className="m-0">
                                {/*{item.quantity}*/}
                                {item.unit}
                              </p>
                              {item.type != "package" && (
                                <Link
                                  className="link-details"
                                  href={"/product/" + item.product_id}
                                >
                                  view details
                                </Link>
                              )}
                            </td>
                            <td className="text-center">
                              <h6 className="price">
                                {item.peak_of_peak_dis > 0
                                  ? item.price
                                  : item?.offer != null && item?.offer != ""
                                  ? item.price + item.membership_discount
                                  : item.price}
                              </h6>
                            </td>

                            <td>
                              <form>
                                <div className="form-group">
                                  {item.Isloading == true ? (
                                    <a href type="button" className="minus-btn">
                                      <img
                                        src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/images/loading.gif"
                                        alt=""
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      href
                                      type="button"
                                      className="minus-btn"
                                      onClick={qtyDecHandler.bind(
                                        this,
                                        item,
                                        index
                                      )}
                                    >
                                      -
                                    </a>
                                  )}
                                  {weight?.is_weight == 1 ||
                                  item.type != "product" ? (
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="number"
                                      value={item.quantity}
                                      disabled={true}
                                      // onChange={qtyChangeHandler.bind(null, item)}
                                      // onBlur={blurHandler.bind(null, item)}
                                      // step="0.01"
                                    />
                                  ) : (
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="number"
                                      value={item.quantity}
                                      onChange={qtyChangeHandler.bind(
                                        null,
                                        item
                                      )}
                                      onBlur={blurHandler.bind(null, item)}
                                      step="0.01"
                                    />
                                  )}
                                  {item.Isloading2 == true ? (
                                    <a href type="button" className="plus-btn">
                                      <img
                                        src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/images/loading.gif"
                                        alt=""
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      href
                                      type="button"
                                      className="plus-btn"
                                      onClick={qtyIncHandler.bind(this, item)}
                                      // onClick={qtyIncHandler.bind(this, item)}
                                    >
                                      +
                                    </a>
                                  )}
                                </div>
                              </form>
                            </td>

                            <td className="text-center">
                              <h6 className="price">
                                {/*{*/}
                                {/*  weight?.selectedWeight == undefined &&*/}
                                {/*  (item.price * item.quantity).toFixed(2)*/}
                                {/*}*/}

                                {/*{*/}
                                {/*  weight?.selectedWeight != undefined &&*/}
                                {/*  (  item.price **/}
                                {/*  (parseFloat(item.quantity) / parseFloat(weight?.selectedWeight)) )*/}
                                {/*}*/}

                                {(parseFloat(item.peak_of_peak_dis) > 0 ||
                                (item.offer != null && item?.offer != "")
                                  ? parseFloat(
                                      item.price + item.membership_discount
                                    )
                                  : parseFloat(item.price)) *
                                  parseFloat(item.quantity)}
                              </h6>
                            </td>
                            <td className="text-center">
                              {item?.type == "package"
                                ? parseFloat(item?.discount) *
                                  parseFloat(item?.quantity)
                                : getCookie("coupon")
                                ? parseFloat(item?.discount)
                                : parseFloat(item?.peak_of_peak_dis) > 0
                                ? (
                                    (parseFloat(item?.discount) +
                                      parseFloat(item?.deal_offer_amount) +
                                      parseFloat(item?.peak_of_peak_dis)) *
                                    parseFloat(item?.quantity)
                                  ).toFixed(2)
                                : item.offer != null && item?.offer != ""
                                ? (
                                    parseFloat(item?.deal_offer_amount) *
                                    parseFloat(item?.quantity)
                                  ).toFixed(2)
                                : (
                                    (parseFloat(item?.membership_discount) +
                                      parseFloat(item?.discount) +
                                      parseFloat(item?.deal_offer_amount) +
                                      parseFloat(item?.peak_of_peak_dis)) *
                                    parseFloat(item?.quantity)
                                  ).toFixed(2)}
                            </td>

                            {/* <td className="text-center">
                              <a
                                href
                                type="button"
                                className="minus-btn"
                                onClick={qtyDecHandler.bind(this, item)}
                              >
                                -
                              </a>
                              <input
                                type="text"
                                className="form-control"
                                id="number"
                                value={item.quantity}
                                // onChange={qtyChangeHandler.bind(null, item)}
                                // onBlur={blurHandler.bind(null, item)}
                              />
                              <a
                                href
                                type="button"
                                className="plus-btn"
                                onClick={qtyIncHandler.bind(this, item)}
                              >
                                +
                              </a>
                            </td> */}

                            <td className="text-center">
                              <a
                                className="delete-product"
                                href
                                onClick={removeCartItemHandler.bind(null, item)}
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="continue-shopping-btn-wrapper">
                  <a
                    className="btn make_payment"
                    type="button"
                    id="button-addon2 "
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
              <div className="cart-bg">
                <div class="cart-sidebar-main">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="rounded">summary</legend>

                      <div class="table-responsive">
                        <table class="table table-borderless  mb-0">
                          <tbody>
                            <tr>
                              <td>sub total</td>
                              <td>&#2547; {subTotalSum.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>
                                shipping charge
                                <Tooltip
                                  title="Shipping Charge"
                                  placement="top-start"
                                  arrow
                                >
                                  <button className="btn tooltip-btn">
                                    <i class="fa-solid fa-info"></i>
                                  </button>
                                </Tooltip>
                              </td>

                              <td>
                                &#2547;{" "}
                                {/* {selectedShippingAddress?.Delivery_Charge || 0} */}
                                {parseFloat(
                                  shippingChargeStatus.shippingCharge
                                ) || 0}
                              </td>
                            </tr>
                            <tr>
                              <td>discount</td>
                              <td>&#2547; {couponDiscount || 0}</td>
                            </tr>
                            <tr>
                              <td>VAT</td>
                              <td>&#2547; {subTotalTax.toFixed(2)}</td>
                            </tr>
                            <tr class="top-border">
                              <td>total</td>
                              <td class="text-bold">
                                &#2547;
                                {(
                                  subTotalSum +
                                  subTotalTax -
                                  (couponDiscount || 0) +
                                  // -
                                  // (discountAmount +
                                  //   membershipDiscount +
                                  //   couponDiscount)
                                  parseFloat(
                                    shippingChargeStatus.shippingCharge || 0
                                  )
                                ).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="estimated-saving">
                  <div className="d-flex justify-content-between">
                    <p>Estimated savings</p>
                    <p>
                      &#2547;{" "}
                      {parseFloat(discountAmount + couponDiscount).toFixed(2) ||
                        0}
                    </p>
                  </div>
                  {/*<div className="d-flex justify-content-between">*/}
                  {/*  <p>Membership Discount</p>*/}
                  {/*  <p>&#2547; {membershipDiscount || 0}</p>*/}
                  {/*</div>*/}
                </div>
                <div className="appy-coupon d-none">
                  <div class="common-fieldset-main">
                    {couponApplySuccessfully == false &&
                    !getCookie("coupon") ? (
                      <fieldset className="common-fieldset">
                        <legend className="rounded">apply coupon</legend>
                        <form action="">
                          <div className="form-group">
                            <label className="form-label">
                              only one coupon can be used per order at this
                              time.
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={coupon}
                              onChange={couponOnChangeHandler}
                            />
                          </div>
                          <div className="btn-wrapper">
                            <button
                              className="btn make_payment w-100"
                              type="button"
                              id="button-addon2"
                              onClick={postCouponHandler}
                            >
                              Apply
                            </button>
                          </div>
                        </form>

                        {couponApplySuccessfully && (
                          <div>Coupon Applied Successfully</div>
                        )}
                      </fieldset>
                    ) : (
                      <fieldset className="common-fieldset">
                        <legend className="rounded">remove coupon</legend>
                        <button
                          className="btn w-100 btn-danger"
                          type="button"
                          id="button-addon3"
                          onClick={removeCouponHandler}
                        >
                          Remove
                        </button>
                      </fieldset>
                    )}
                  </div>
                </div>
                {/* <div className="nonmember-offer">
                  <div className="member-message">
                    Dear <span className="name">Mr. Yousuf</span> you could have
                    save about <span className="amount">TK. 51.97</span> .Get
                    your membership card for instant saving.
                    <br />
                    Thank you for shopping with WholesaleClub.
                  </div>
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          become a wholesale club member
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <a href="">
                                <img
                                  src="../assets/images/club/c1.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                              <p className="price-per-year">
                                1500 tk /per year
                              </p>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <a href="">
                                <img
                                  src="../assets/images/club/c1.png"
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                              <p className="price-per-year">
                                1500 tk /per year
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="billing-address">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="text-center rounded">
                        Billing Address
                      </legend>
                      <p>
                        <strong>NB: </strong>Default a Address For Selecting
                        Billing Info Address
                      </p>
                      {findDefaultAddress != null &&
                        findDefaultAddress?.name != undefined && (
                          <p>
                            {findDefaultAddress.name},
                            {findDefaultAddress.address},
                            {findDefaultAddress.phone},
                            {findDefaultAddress.AreaDeliveryCharge},
                            {findDefaultAddress.Upazilla},
                            {findDefaultAddress.District},
                            {findDefaultAddress.Division},
                          </p>

                          // <p>Wholesale Club, Wholesale Club, Wholesale Club, Wholesale Club, Wholesale Club</p>
                        )}

                      <div class="btn-wrapper">
                        <a
                          className="btn click-here-btn"
                          onClick={viewAddressHandler}
                        >
                          Change{" "}
                        </a>
                        <a
                          className={"btn click-here-btn"}
                          onClick={viewCreateAddress}
                        >
                          Add New
                        </a>

                        {/*<label for="streetAddress" class="form-label">*/}
                        {/*  change Billing Address?*/}
                        {/*</label>*/}
                      </div>
                      {viewOtherAddress && (
                        <div className="address-select">
                          <select
                            class="form-select form-control"
                            aria-label="Default select example"
                            onChange={(e) => {
                              fixedDefaultAddressHandler(
                                JSON.parse(
                                  e.target[e.target.selectedIndex].getAttribute(
                                    "data-address"
                                  )
                                )
                              );
                            }}
                          >
                            <option selected disabled>
                              Select Address
                            </option>
                            {savedAddresses.map((item) => (
                              <option
                                value={item.id}
                                data-address={JSON.stringify(item)}
                                // onClick={fixedDefaultAddressHandler.bind(
                                //   null,
                                //   item
                                // )}
                              >
                                {item.name},{item.address},{item.phone},
                                {item.AreaDeliveryCharge},{item.District},
                                {item.Upazilla},{item.Division}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </fieldset>
                  </div>
                </div>
                <div className="select-payment">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="rounded">select delivery Options</legend>
                      <div class="form-check form-check-inline">
                        {homeDelivary ? (
                          <input
                            className="form-check-input"
                            type="radio"
                            id="inlineCheckbox1"
                            value="home"
                            name="checkbox"
                            checked={true}
                            onClick={() => {
                              setStoreDelivary(false);
                              setHomeDelivary(true);
                            }}
                          />
                        ) : (
                          <input
                            className="form-check-input"
                            type="radio"
                            id="inlineCheckbox1"
                            value="home"
                            name="checkbox"
                            onClick={() => {
                              setStoreDelivary(false);
                              setHomeDelivary(true);
                            }}
                          />
                        )}

                        <label class="form-check-label" for="inlineCheckbox1">
                          home delivery
                        </label>
                      </div>
                      <div class="form-check form-check-inline d-none">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="inlineCheckbox2"
                          value="store"
                          name="checkbox"
                          onClick={() => {
                            setStoreDelivary(true);
                            setHomeDelivary(false);
                            setIsChecked(false);
                            setSelectedShippingAddress(0);
                          }}
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          store pickup
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
                {homeDelivary && (
                  <div className="shipping-address">
                    <div class="common-fieldset-main">
                      <fieldset class="common-fieldset">
                        <legend class="text-center rounded">
                          Select shipping Address
                        </legend>
                        {selectedShippingAddress.name != undefined && (
                          <p>
                            {selectedShippingAddress.name},
                            {selectedShippingAddress.address},
                            {selectedShippingAddress.phone},
                            {selectedShippingAddress.AreaDeliveryCharge},
                            {selectedShippingAddress.District},
                            {selectedShippingAddress.Division},
                            {selectedShippingAddress.Upazilla},
                          </p>
                        )}
                        {/*<p>*/}
                        {/*  House: 02, Road No: 07, Block: E, Bashundhara, Vatara,*/}
                        {/*  Dhaka-1219, Dhaka*/}
                        {/*</p>*/}
                        {findDefaultAddress.name != undefined && (
                          <div class="mb-3">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                value=""
                                id="sameAddress"
                                onClick={editAddressHandler}
                                defaultChecked={isChecked}
                              />
                              <label class="form-check-label" for="sameAddress">
                                Same as Billing Address
                              </label>
                            </div>
                          </div>
                        )}

                        <div class="">
                          <div class="btn-wrapper">
                            <a
                              class="btn click-here-btn"
                              onClick={viewShippingAddressHandler}
                            >
                              Change{" "}
                            </a>

                            <a
                              className="btn click-here-btn"
                              onClick={handleOpen}
                            >
                              Add New
                            </a>
                          </div>

                          {/* <label for="streetAddress" class="form-label">
                            add new shipping Address?
                          </label> */}
                          {/* <a class="btn click-here-btn" onClick={handleOpen}>
                            Add New
                          </a> */}

                          {viewShippingAddress && (
                            <div className="address-select">
                              <select
                                class="form-select form-control"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  fixedShippingAddressHandler(
                                    JSON.parse(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-address")
                                    )
                                  );
                                  // setSelectedShippingAddress(JSON.parse(e.target[e.target.selectedIndex].getAttribute('data-address')))
                                }}
                              >
                                <option selected disabled>
                                  Select Address
                                </option>
                                {savedAddresses.map((item) => (
                                  <option
                                    value={item.id}
                                    data-address={JSON.stringify(item)}
                                    // onClick={fixedDefaultAddressHandler.bind(
                                    //   null,
                                    //   item
                                    // )}
                                  >
                                    {item.name},{item.address},{item.phone},
                                    {item.AreaDeliveryCharge},{item.District},
                                    {item.Upazilla},{item.Division}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        {/*{selectedShippingAddress?.name != undefined &&*/}
                        {/*  selectedShippingAddress?.name.length != 0 && defaultSameAddress && (*/}
                        {/*    <div class="row  mt-3">*/}
                        {/*      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="firstName" class="form-label">*/}
                        {/*            Name*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="Name"*/}
                        {/*            value={selectedShippingAddress?.name}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="firstName" class="form-label">*/}
                        {/*            Division Name*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="District Name"*/}
                        {/*            value={selectedShippingAddress?.Division}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="firstName" class="form-label">*/}
                        {/*            District Name*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="District Name"*/}
                        {/*            value={selectedShippingAddress?.District}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="postCode" class="form-label">*/}
                        {/*            Post Code*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="number"*/}
                        {/*            class="form-control"*/}
                        {/*            id="postCode"*/}
                        {/*            value={selectedShippingAddress?.postal_code}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*      </div>*/}
                        {/*      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="postCode" class="form-label">*/}
                        {/*            Area Name*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="postCode"*/}
                        {/*            value={*/}
                        {/*              selectedShippingAddress?.AreaDeliveryCharge*/}
                        {/*            }*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="firstName" class="form-label">*/}
                        {/*            City Name*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="City Name"*/}
                        {/*            value={selectedShippingAddress?.Upazilla}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div class="mb-3">*/}
                        {/*          <label for="streetAddress" class="form-label">*/}
                        {/*            Address*/}
                        {/*          </label>*/}
                        {/*          <input*/}
                        {/*            type="text"*/}
                        {/*            class="form-control"*/}
                        {/*            id="streetAddress"*/}
                        {/*            value={selectedShippingAddress?.address}*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                      </fieldset>
                    </div>
                  </div>
                )}
                {storeDelivary && (
                  <div className="billing-address">
                    <div class="common-fieldset-main">
                      <fieldset class="common-fieldset">
                        <legend class="text-center rounded">Store</legend>

                        <div className="address-select">
                          <select
                            class="form-select form-control"
                            aria-label="Default select example"
                            onChange={(e) => {
                              setSelectedStore(e.target.value);
                            }}
                          >
                            <option selected>Select Our Store</option>
                            {storeList.data.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                )}

                <div className="select-payment">
                  <div class="common-fieldset-main">
                    <fieldset class="common-fieldset">
                      <legend class="rounded">select payment Options</legend>
                      {typeOfPayments.map((item) =>
                        item.payment_type != "cash_on_store_pickup" &&
                        homeDelivary ? (
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="inlineCheckbox2"
                              value="option1"
                              name="checkbox2"
                              onClick={selectedPaymentHandler.bind(this, item)}
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox1"
                            >
                              {item.name}
                            </label>
                          </div>
                        ) : item.payment_type == "cash_on_store_pickup" &&
                          !homeDelivary ? (
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineCheckbox2"
                              value="option1"
                              name="checkbox2"
                              onClick={selectedPaymentHandler.bind(this, item)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineCheckbox1"
                            >
                              {item.name}
                            </label>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </fieldset>
                  </div>
                </div>

                <div class="w-100">
                  <button
                    type="submit"
                    class="orderNowButton"
                    id="submit_btn"
                    onClick={confirmToOrderCreateHandler}
                    disabled={processing}
                   
                  >
                    {processing ? "processing" : "order now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade product-request-modal"
          id="staticBackdropModal2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel2"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div class="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">
                          Update shipping address
                        </legend>
                        <div class="row" id="shipping-address-wrapper">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div class="mb-3">
                              <label
                                for="shipping-firstName"
                                class="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="shipping-firstName"
                                value={name}
                                onChange={nameChangeHandler}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Division Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  setDivisions([]);
                                  getDivision(
                                    e.target[
                                      e.target.selectedIndex
                                    ].getAttribute("data-division")
                                  );
                                  setFucDivision(JSON.parse(e.target.value));
                                  setDistricts([]);
                                  setAreas([]);
                                }}
                              >
                                <option selected disabled={true}>
                                  Select Your Division
                                </option>
                                {fucMainDivision.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-division={item.id}
                                  >
                                    {item.DivisionName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Upazila Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setDistrict(JSON.parse(e.target.value));
                                    getArea(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-upazilla")
                                    );
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your Upazilla
                                </option>
                                {districts.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-upazilla={item.id}
                                  >
                                    {item.UpazilaName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div class="mb-3">
                              <label for="shipping-postCode" class="form-label">
                                Post Code
                              </label>
                              <input
                                type="number"
                                class="form-control"
                                id="shipping-postCode"
                                value={postalCode}
                                onChange={postCodeChangeHnadler}
                              />
                            </div>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div class="mb-3">
                              <label
                                for="shipping-firstName"
                                class="form-label"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="shipping-firstName"
                                value={phone}
                                onChange={phoneChangeHandler}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                District Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setDivision(JSON.parse(e.target.value));
                                    getDistrict(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-district")
                                    );
                                    setAreas([]);
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your District
                                </option>
                                {divisions.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-district={item.id}
                                  >
                                    {item.DistrictName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Area Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setarea(JSON.parse(e.target.value));
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your Area
                                </option>
                                {areas.map((item) => (
                                  <option value={JSON.stringify(item)}>
                                    {item.AreaName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div class="mb-3">
                              <label
                                for="shipping-streetAddress"
                                class="form-label"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="shipping-streetAddress"
                                onChange={addressChangeHandler}
                                value={address}
                              />
                            </div>
                          </div>
                          <button
                            onClick={saveAddressHandler}
                            className="btn save-address"
                          >
                            Save Address
                          </button>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade product-request-modal"
          id="staticBackdropModalBilling"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">
                          Create billing address
                        </legend>
                        <div className="row" id="shipping-address-wrapper">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-firstName"
                                className="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="shipping-firstName"
                                value={name}
                                onChange={nameChangeHandler}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Division Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setDivisions([]);
                                    getDivision(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-division")
                                    );
                                    setFucDivision(JSON.parse(e.target.value));
                                    setDistricts([]);
                                    setAreas([]);
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your Division
                                </option>
                                {fucMainDivision.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-division={item.id}
                                  >
                                    {item.DivisionName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Upazila Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setDistrict(JSON.parse(e.target.value));
                                    getArea(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-upazilla")
                                    );
                                    setAreas([]);
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your Upazilla
                                </option>
                                {districts.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-upazilla={item.id}
                                  >
                                    {item.UpazilaName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="shipping-postCode"
                                className="form-label"
                              >
                                Post Code
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="shipping-postCode"
                                value={postalCode}
                                onChange={postCodeChangeHnadler}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-firstName"
                                className="form-label"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="shipping-firstName"
                                value={phone}
                                onChange={phoneChangeHandler}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                District Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  if (e.target.value != "") {
                                    setDivision(JSON.parse(e.target.value));
                                    getDistrict(
                                      e.target[
                                        e.target.selectedIndex
                                      ].getAttribute("data-district")
                                    );
                                    setDistricts([]);
                                  }
                                }}
                              >
                                <option selected value="">
                                  Select Your District
                                </option>
                                {divisions.map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    data-district={item.id}
                                  >
                                    {item.DistrictName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="shipping-district"
                                className="form-label"
                              >
                                Area Name
                              </label>
                              <select
                                className="form-select"
                                aria-label="district"
                                id="shipping-district"
                                onChange={(e) => {
                                  setarea(JSON.parse(e.target.value));
                                }}
                              >
                                <option selected>Select Your Area</option>
                                {areas.map((item) => (
                                  <option value={JSON.stringify(item)}>
                                    {item.AreaName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="shipping-streetAddress"
                                className="form-label"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="shipping-streetAddress"
                                onChange={addressChangeHandler}
                                value={address}
                              />
                            </div>
                          </div>
                          <button
                            onClick={saveBillingAddressHandler}
                            className="btn save-address"
                          >
                            Save Address
                          </button>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade product-request-modal"
          id="staticBackdropModal3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel3"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div class="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="common-fieldset-main mb-0">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">order status</legend>
                        <div className="order-status-flex">
                          <div className="order-check">
                            <img
                              src="/assets/images/payment/accept.svg"
                              class="check-img img-fluid"
                            />
                          </div>
                          <div className="success">
                            <h3>Your order placement is successfull</h3>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade product-request-modal"
          id="staticBackdropModal4"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel4"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => router.push("/purchaseHistory")}
              ></button>

              <div class="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="common-fieldset-main mb-0">
                      {/*<iframe*/}
                      {/*  // sandbox='allow-scripts allow-modal'*/}
                      {/*  height={500}*/}
                      {/*  id={"payment_ifram"}*/}
                      {/*  style={{ display: "none", width: "100%" }}*/}
                      {/*  src="http://103.248.13.236:8085/wcl/api/v2/bkash/api/webpage/eyJraWQiOiJmalhJQmwxclFUXC9hM215MG9ScXpEdVZZWk5KXC9qRTNJOFBaeGZUY3hlamc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4ZGU4ZjBlMC1mY2RjLTQyNzMtYjY4YS1iNDAwOWNjZjc3ZDEiLCJhdWQiOiI2NmEwdGZpYTZvc2tkYjRhMDRyY24wNjNhOSIsImV2ZW50X2lkIjoiYjI0YmM4N2EtMzY5OC00OGVhLTlkZjctYmZlMzgwYWY1YjBkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzU5NDc0MDQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9rZjVCU05vUGUiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdGRlbW8iLCJleHAiOjE2NzU5NTEwMDQsImlhdCI6MTY3NTk0NzQwNH0.Wp-HX1yMNqDoOzw1JM3wtj9QAqMx9teAhZp76BWmlz4l_evSOafS-1LGaGqG7SvkrFBpb1I6S2csrwt3q4DXSiM3j6JYa4et--km3BchqS6MslTb-daaRgxPrPiGXUt9V5nSQTwraEl6Ffd_8X6WUrO-Xwiqv2frEJzzpzSElKJfYIFSn_jvSSU7O5qoByQlHjE5iEq9IjZlw9VqqbTlNRZPXw0U27CdM_or-dCRPLgL2GbQM1vS-VfnHj6_WNj46IrSTAmg8uIqyiaJE2757Ds3mMginOZs5po6_YAvDJpT_d5yhj8-Z3ByvkS5lixj4uD-rmTPdqzB5XzJYinebQ/MTMxLjc0"*/}
                      {/*  frameborder="0"*/}
                      {/*></iframe>*/}

                      {finalMessage ? (
                        <fieldset className="common-fieldset">
                          <legend className="rounded">order status</legend>
                          <div className="order-status-flex">
                            <div className="order-check">
                              <img
                                src="/assets/images/payment/accept.svg"
                                class="check-img img-fluid"
                              />
                            </div>
                            <div className="success">
                              <h3>Your order placement is successfull</h3>
                            </div>
                          </div>
                        </fieldset>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewCart;
