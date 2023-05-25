import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import {
  addCart,
  getDistricts,
  getDivisions,
  getFuc___Area,
  getFuc___District,
  getFuc___Division,
  getFuc___Upazilla,
  getSavedAdrs,
  postAddress,
} from "../lib/endpoints";

const Address = ({ nextPaymentPageHandler, data, storeList }) => {
  const router = useRouter();
  const ctxAuth = useSelector((store) => store.authReducerContext);
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
  const [savedAddresses, setSavedAddresses] = useState(data);
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
  const findDefaultAddress = savedAddresses?.find(
    (item) => item.set_default == 1
  );
  const [selectedShippingAddress, setSelectedShippingAddress] = useState({});
  const [selectedStore, setSelectedStore] = useState({});
  const getCartContext = useSelector((store) => store.cartReducerContext);
  console.log({ selectedShippingAddress });
  console.log({ selectedStore });
  console.log({ findDefaultAddress });
  const nameChangeHandler = ({ target }) => {
    setName(target.value);
  };
  const approachToNextHandler = () => {
    debugger;
    if (isChecked == false && selectedStore.id == undefined) {
      nextStepHandler();
    } else {
      let flag = false;
      let pickUpShipping = "";
      let pickUpStore = "";
      if (selectedShippingAddress.address != undefined) {
        pickUpShipping = selectedShippingAddress.id;

        dispatch({
          type: "SHIPPING_ADDRESS",
          item: pickUpShipping,
        });
        dispatch({ type: "STORE_ADDRESS", item: "" });
      } else if (selectedStore.address != undefined) {
        pickUpStore = selectedStore.id;
        dispatch({ type: "STORE_ADDRESS", item: selectedStore.id });
        dispatch({ type: "SHIPPING_ADDRESS", item: "" });
      }
      if (homeDelivary && selectedShippingAddress?.address != undefined) {
        flag = true;
      } else if (storeDelivary && selectedStore?.name != undefined) {
        flag = true;
      }
      if (flag == true) {
        getCartContext.Items.forEach((element) => {
          http.post({
            url: addCart,
            payload: {
              id: element.id,
              bar_code: element.barcode,
              user_id: ctxAuth.user.user.id,
              quantity: element.quantity,
              product_referral_code: "",
              address_id: pickUpShipping,
              type: element.type,
              promotion_code: element.promotion_code,
              instruction: "",
              deal_offer: element.offer,
              deal_offer_amount: element.offer_amount,
              pickup_point: pickUpStore,
            },
            before: () => {},
            successed: () => {
              nextPaymentPageHandler();
              dispatch({ type: "ACTIVE_PAYMENT_STATE", payload: true });
            },
            failed: () => {},
          });
        });
      } else {
        toast.error("Select Delivary Approach First.");
      }
    }
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
  };
  const nextStepHandler = () => {
    if (isChecked == false) {
      saveHandler();
    }
  };
  const saveHandler = () => {
    http.post({
      url: postAddress,
      payload: {
        user_id: ctxAuth.user.user.id,
        name: name,
        address: address,
        Divisionid: fuc_division?.id,
        Districtid: division.id,
        Upazillaid: district.id,
        AreaDeliveryChargeId: area.id,
        postal_code: postalCode,
        phone: phone,
      },
      before: () => {},
      successed: (res) => {
        getSavedDistricts(ctxAuth.user.user.id);
        setName("");
        setAddress("");
        setPhone("");
        setDistricts([]);
        setDivisions([]);
        setPostalCode("");
        setSelectedShippingAddress(res);
        let flag = false;
        let pickUpShipping = "";
        let pickUpStore = "";
        if (res.address != undefined) {
          pickUpShipping = res.address.id;
          dispatch({
            type: "SHIPPING_ADDRESS",
            item: pickUpShipping,
          });
          dispatch({ type: "STORE_ADDRESS", item: "" });
        } else if (selectedStore.address != undefined) {
          pickUpStore = selectedStore.id;
          dispatch({ type: "STORE_ADDRESS", item: selectedStore.id });
          dispatch({ type: "SHIPPING_ADDRESS", item: "" });
        }
        if (homeDelivary && res?.address != undefined) {
          flag = true;
        } else if (storeDelivary && selectedStore?.name != undefined) {
          flag = true;
        }
        if (flag == true) {
          getCartContext.Items.forEach((element) => {
            http.post({
              url: addCart,
              payload: {
                id: element.id,
                bar_code: element.barcode,
                user_id: ctxAuth.user.user.id,
                quantity: element.quantity,
                product_referral_code: "",
                address_id: pickUpShipping,
                type: element.type,
                promotion_code: element.promotion_code,
                instruction: "",
                deal_offer: element.offer,
                deal_offer_amount: element.offer_amount,
                pickup_point: pickUpStore,
              },
              before: () => {},
              successed: () => {
                nextPaymentPageHandler();
                dispatch({ type: "ACTIVE_PAYMENT_STATE", payload: true });
              },
              failed: () => {},
            });
          });
        } else {
          toast.error("Select Delivary Approach First.");
        }
      },
      failed: () => {},
    });
  };
  console.log({ selectedShippingAddress });
  const getSavedDistricts = useCallback((id) => {
    http.get({
      url: getSavedAdrs,
      before: () => {},
      successed: (res) => {
        setSavedAddresses(res);
      },
      failed: () => {},
    });
  }, []);
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
    if (fuc_division) {
      getDivision(fuc_division.id);
    }
    if (division) {
      getDistrict(division.id);
    }
    if (district) {
      getArea(district.id);
    }
    if (selectedDivision.name.length > 0) {
      getDistrict(selectedDivision.id);
    }
  }, [selectedDivision.name.length, fuc_division, division, district]);
  // useEffect(() => {
  //   if (division) {
  //     getDistrict(division.state_id);
  //   }
  //   if (selectedDivision.name.length > 0) {
  //     getDistrict(selectedDivision.id);
  //   }
  // }, [division, selectedDivision.name.length]);

  useEffect(() => {
    if (isChecked) {
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
    getDivisionMain();
    // getDivision();
  }, []);

  return (
    <>
      <fieldset>
        <div class="form-card">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div class="checkout-fieldset-main">
                <fieldset class="common-fieldset">
                  <legend class="text-center rounded mb-5">
                    Billing Address
                  </legend>
                  <p>
                    <strong>NB: </strong>Default a Address For Selecting Billing
                    Info Address
                  </p>
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                      <div class="mb-3">
                        <label for="firstName" class="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="Name"
                          value={findDefaultAddress?.name}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="firstName" class="form-label">
                          Division Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="District Name"
                          value={findDefaultAddress?.Division}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="firstName" class="form-label">
                          District Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="District Name"
                          value={findDefaultAddress?.District}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="postCode" class="form-label">
                          Post Code
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="postCode"
                          value={findDefaultAddress?.postal_code}
                        />
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                      <div class="mb-3">
                        <label for="postCode" class="form-label">
                          Area Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="postCode"
                          value={findDefaultAddress?.AreaDeliveryCharge}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="firstName" class="form-label">
                          City Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="City Name"
                          value={findDefaultAddress?.Upazilla}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="streetAddress" class="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="streetAddress"
                          value={findDefaultAddress?.address}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="streetAddress" class="form-label">
                          New Billing Address?
                        </label>
                        <a
                          href
                          class="btn click-here-btn"
                          onClick={() => {
                            router.push("/shipping");
                          }}
                        >
                          Click Here
                        </a>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div class="checkout-fieldset-main">
                <fieldset class="common-fieldset">
                  <legend class="text-center rounded mb-5">
                    Shipping Address
                  </legend>
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="firstName" class="form-label">
                          Delivery Option
                        </label>
                        <select class="form-select" id="delivery-option">
                          <option
                            value="home"
                            onClick={() => {
                              setStoreDelivary(false);
                              setHomeDelivary(true);
                            }}
                          >
                            Home Delivery
                          </option>
                          <option
                            value="store"
                            onClick={() => {
                              setStoreDelivary(true);
                              setHomeDelivary(false);
                              setIsChecked(false);
                            }}
                          >
                            Collect From Store
                          </option>
                        </select>
                      </div>
                      {storeDelivary && (
                        <div class="mb-3" id="select-store-wrapper">
                          <label for="firstName" class="form-label">
                            Store
                          </label>
                          <select class="form-select">
                            <option selected>Select Our Store</option>
                            {storeList.map((item) => (
                              <option
                                value="1"
                                onClick={() => {
                                  setSelectedStore(item);
                                }}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  {homeDelivary && (
                    <div class="row" id="shipping-address-wrapper">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="mb-3">
                          <label for="shipping-firstName" class="form-label">
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
                        <div class="mb-3">
                          <label for="shipping-district" class="form-label">
                            District Name
                          </label>
                          <select
                            class="form-select"
                            aria-label="district"
                            id="shipping-district"
                          >
                            <option selected>Select Your District</option>
                            {divisions.map((item) => (
                              <option
                                value={item}
                                selected={
                                  item.DistrictName == selectedDivision?.name
                                }
                                onClick={() => {
                                  setDivision(item);
                                }}
                              >
                                {item.DistrictName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="shipping-district" class="form-label">
                            Area Name
                          </label>
                          <select
                            class="form-select"
                            aria-label="district"
                            id="shipping-district"
                          >
                            <option selected>Select Your Area</option>
                            {areas.map((item) => (
                              <option
                                value={item}
                                selected={item.AreaName == selectedArea?.name}
                                onClick={() => {
                                  setarea(item);
                                }}
                              >
                                {item.AreaName}
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
                          <label for="shipping-district" class="form-label">
                            Division Name
                          </label>
                          <select
                            class="form-select"
                            aria-label="district"
                            id="shipping-district"
                            onClick={() => {
                              getDivisionMain();
                            }}
                          >
                            <option selected>Select Your Division</option>
                            {fucMainDivision.map((item) => (
                              <option
                                value={item}
                                selected={
                                  item.DivisionName == selectedFucDivision?.name
                                }
                                onClick={() => {
                                  setFucDivision(item);
                                }}
                              >
                                {item.DivisionName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="shipping-district" class="form-label">
                            Upazila Name
                          </label>
                          <select
                            class="form-select"
                            aria-label="district"
                            id="shipping-district"
                          >
                            <option selected>Select Your Upazilaa</option>
                            {districts.map((item) => (
                              <option
                                value={item}
                                selected={
                                  item.UpazilaName == selectedDistrict?.name
                                }
                                onClick={() => {
                                  setDistrict(item);
                                }}
                              >
                                {item.UpazilaName}
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
                        <div class="mb-3">
                          <label for="shipping-firstName" class="form-label">
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
                      </div>

                      {findDefaultAddress && (
                        <div class="col-12">
                          <div class="form-check mb-3">
                            <input
                              class="form-check-input"
                              type="checkbox"
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
                    </div>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <input
          type="button"
          name="next"
          class="next action-button"
          value="Next Step"
          onClick={() => {
            approachToNextHandler();
          }}
        />
      </fieldset>
    </>
  );
};

export default Address;
