import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../services/httpService";
import {
  deleteAddress,
  getCitys,
  getDistricts,
  getDivisions,
  getFuc___Area,
  getFuc___District,
  getFuc___Division,
  getFuc___Upazilla,
  getSavedAdrs,
  postAddress,
  postDefaultAddress,
  updateAddress,
} from "../lib/endpoints";
import { toast } from "react-toastify";
import { set } from "../../utils/localstorage";

const Shipping = ({ data }) => {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [addressId, setAddressId] = useState("");
  const [savedAddresses, setSavedAddresses] = useState(data);
  const [selectedFucDivision, setSelectedFucDivision] = useState({
    id: "4",
    name: "Dhaka",
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
  const [selectedAddress, setSelectedAddress] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState("");
  const [fuc_division, setFucDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [area, setarea] = useState();
  const [areas, setAreas] = useState([]);
  const [district, setDistrict] = useState();
  const [fucMainDivision, setFucMainDivision] = useState([]);
  const [phone, setPhone] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setAddress] = useState();
  const [isDefault, setIsDefault] = useState(false);

  const addressChangeHandler = ({ target }) => {
    setAddress(target.value);
  };
  const nameChangeHandler = ({ target }) => {
    setName(target.value);
  };
  const phoneChangeHandler = ({ target }) => {
    setPhone(target.value);
  };
  const postCodeChangeHnadler = ({ target }) => {
    setPostalCode(target.value);
  };

  const deleteAddressHandler = (item) => {
    http.get({
      url: deleteAddress + item.id,
      before: () => {},
      successed: (res) => {
        getSavedDistricts(ctxAuth.user.user.id);
      },
      failed: () => {},
    });
  };

  const gotoPreviousHandler = (evt) => {
    evt.preventDefault();
    router.back();
  };
  const editAddressHandler = (item) => {
    setIsUpdate(true);

    if (item.name == null) {
      setName("");
    } else setName(item.name);
    setAddress(item.address);
    setPhone(item.phone);
    setPostalCode(item.postal_code);
    setSelectedAddress(item);
    setAddressId(item.id);
    setEmail(item.email);
    setSelectedFucDivision({ id: item.Divisionid, name: item.Division });
    getDivision(item.Divisionid);
    setSelectedDivision({ id: item.Districtid, name: item.District });
    getDistrict(item.Districtid);
    setSelectedDistrict({ id: item.Upazillaid, name: item.Upazilla });
    getArea(item.Upazillaid);
    setSelectedArea({
      id: item.AreaDeliveryChargeId,
      name: item.AreaDeliveryCharge,
    });

    setFucDivision({ id: item.Divisionid });
    setDivision({ id: item.Districtid });
    setDistrict({ id: item.Upazillaid });
    setarea({ id: item.AreaDeliveryChargeId });
  };

  const saveHandler = (evt) => {
    evt.preventDefault();

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
        email: email,
      },
      before: () => {},
      successed: (res) => {
        getSavedDistricts(ctxAuth.user.user.id);
        setAddress("");
        setPhone("");
        setFucMainDivision([]);
        setDistricts([]);
        setDivisions([]);
        setAreas([]);
        setPostalCode("");
        setName("");
        console.log(res);
        getDivisionMain();
      },
      failed: () => {
        toast.error("Something Went Wrong.");
      },
    });
  };

  const updateHandler = (evt) => {
    evt.preventDefault();

    http.post({
      url: updateAddress,
      payload: {
        user_id: ctxAuth.user.user.id,
        id: addressId,
        address: address,
        Divisionid: fuc_division.id,
        Districtid: division.id,
        Upazillaid: district.id,
        AreaDeliveryChargeId: area.id,
        postal_code: postalCode,
        phone: phone,
        name: name,
        email: email,
      },
      before: () => {},
      successed: (res) => {
        if (res.result) {
          getSavedDistricts(ctxAuth.user.user.id);
          setAddress("");
          setPhone("");
          setDistricts([]);
          setDivisions([]);
          setPostalCode("");
          setIsUpdate(false);
          setName("");
          setarea("");
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
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
  const getDistrict = useCallback((id) => {
    console.log(id, "id");
    http.get({
      url: getFuc___Upazilla + id,
      before: () => {},
      successed: (res) => {
        console.log({ res });
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

  useEffect(() => {
    getDivisionMain();

    // getDivision();
  }, []);
  useEffect(() => {
    getDivision(parseInt(selectedFucDivision?.id) ?? 4);
  }, []);

  useEffect(() => {
    // if(isUpdate){
    //   if (fuc_division) {
    //     getDivision(fuc_division.id);
    //   }
    //   if (division) {
    //     getDistrict(division.id);
    //   }
    //   if (district) {
    //     getArea(district.id);
    //   }
    //   if (selectedDivision.name.length > 0) {
    //     getDistrict(selectedDivision.id);
    //   }
    // }
  }, [selectedDivision.name.length, fuc_division, division, district]);

  const postDefaultHandler = (item) => {
    http.post({
      url: postDefaultAddress,
      payload: {
        user_id: ctxAuth.user.user.id,
        id: item.id,
      },
      before: () => {},
      successed: () => {
        getSavedDistricts();
      },
      failed: () => {},
    });
  };

  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <div class="common-fieldset-main">
          <fieldset class="common-fieldset">
            <legend class="rounded">
              <i class="fas fa-shipping-fast"></i> Shipping address
            </legend>
            <div class="table-responsive address-table">
              <table class="table">
                <thead>
                  <tr class="">
                    <td>Address</td>

                    <td>Edit</td>
                    <td>Delete</td>
                    <td>Make Default</td>
                  </tr>
                </thead>
                <tbody>
                  {savedAddresses.length > 0 &&
                    savedAddresses.map((item) => (
                      <tr>
                        <td>
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            {item.name}-{item.email ?? 'N/A'}-{item.address},
                            {item.Division},
                            {item.District},{item.Upazilla},
                            {item.AreaDeliveryCharge},{item.postal_code} ,
                            {item.phone}, {item.country_name}
                          </label>
                        </td>

                        <td>
                          <i
                            class="fa fa-pencil"
                            id={item.id}
                            onClick={editAddressHandler.bind(null, item)}
                          ></i>
                        </td>
                        <td>
                          <i
                            class="fa fa-trash"
                            onClick={deleteAddressHandler.bind(null, item)}
                          ></i>
                        </td>
                        <td onClick={postDefaultHandler.bind(null, item)}>
                          {/* Default It */}
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={item.set_default == 1 ? true : false}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">
                <i class="icofont-google-map me-2"></i> Shipping address
              </legend>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Name <sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    name="entry_firstname"
                    value={name}
                    class="form-control"
                    placeholder="Name"
                    aria-label="Address"
                    onChange={nameChangeHandler}
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Address <sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    name="entry_firstname"
                    value={address}
                    class="form-control"
                    placeholder="Address"
                    aria-label="Address"
                    onChange={addressChangeHandler}
                  />
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Email <sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    name="entry_firstname"
                    value={email}
                    class="form-control"
                    placeholder="Email"
                    aria-label="Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Last Name <sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    name="entry_lastname"
                    class="form-control"
                    value=""
                    placeholder="Last name"
                    aria-label="Last name"
                  />
                </div> */}
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    division Name <sup class="text-danger">*</sup>
                  </label>

                  <select
                    name="entry_city"
                    class="form-control"
                    onChange={(e) => {
                      getDivision(
                        e.target[e.target.selectedIndex].getAttribute(
                          "data-division"
                        )
                      );
                      setFucDivision(JSON.parse(e.target.value));
                    }}
                    // onClick={() => {
                    //   getDivisionMain();
                    // }}
                  >
                    <option>Select Division</option>
                    {fucMainDivision.map((item) => (
                      <option
                        value={JSON.stringify(item)}
                        data-division={item.id}
                        selected={
                          item.DivisionName == selectedFucDivision?.name
                        }
                        // onClick={() => {
                        //   setFucDivision(item);
                        // }}
                      >
                        {item.DivisionName}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    district Name <sup class="text-danger">*</sup>
                  </label>

                  <select
                    name="entry_city"
                    class="form-control"
                    onChange={(e) => {
                      // console.log(e.target[e.target.selectedIndex].getAttribute('data-district'),'ddy')
                      getDistrict(
                        e.target[e.target.selectedIndex].getAttribute(
                          "data-district"
                        )
                      );
                      setDivision(JSON.parse(e.target.value));
                    }}
                  >
                    <option>Select District</option>
                    {divisions.map((item) => (
                      <option
                        value={JSON.stringify(item)}
                        data-district={item.id}
                        selected={item.DistrictName == selectedDivision?.name}
                        // onClick={() => {
                        //   setDivision(item);
                        // }}
                      >
                        {item.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Upazila Name <sup class="text-danger">*</sup>
                  </label>

                  <select
                    name="entry_city"
                    class="form-control"
                    onChange={(e) => {
                      getArea(
                        e.target[e.target.selectedIndex].getAttribute(
                          "data-area"
                        )
                      );
                      setDistrict(JSON.parse(e.target.value));
                    }}
                  >
                    <option value="">Select Upazila</option>
                    {districts.map((item) => (
                      <option
                        value={JSON.stringify(item)}
                        data-area={item.id}
                        selected={item.UpazilaName == selectedDistrict?.name}
                        // onClick={() => {
                        //   setDistrict(item);
                        // }}
                      >
                        {item.UpazilaName}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Area Name <sup class="text-danger">*</sup>
                  </label>

                  <select
                    name="entry_city"
                    class="form-control"
                    onChange={(e) => {
                      setarea(JSON.parse(e.target.value));
                    }}
                  >
                    <option value="">Select Area</option>
                    {areas.map((item) => (
                      <option
                        value={JSON.stringify(item)}
                        selected={item.AreaName == selectedArea?.name}
                        // onClick={() => {
                        //   setarea(item);
                        // }}
                      >
                        {item.AreaName}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Phone<sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    name="entry_street_address"
                    value={phone}
                    onChange={phoneChangeHandler}
                    class="form-control"
                    placeholder="phone"
                  />
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Post Code <sup class="text-danger">*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Post Code"
                    name="entry_postcode"
                    aria-label="Last name"
                    value={postalCode}
                    onChange={postCodeChangeHnadler}
                  />
                </div>

                {/* <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label for="" class="col-form-label">
                    Is Default Address
                    <sup class="text-danger">*</sup>{" "}
                  </label>
                  <select name="is_default" id="" class="form-control">
                    <option
                      value="0"
                      onClick={() => {
                        setIsDefault(false);
                      }}
                    >
                      No
                    </option>
                    <option
                      value="1"
                      onClick={() => {
                        setIsDefault(true);
                      }}
                    >
                      Yes
                    </option>
                  </select>
                </div> */}
              </div>

              <div class="shipping-button-wrapper">
                <button
                  type="submit"
                  class="btn profile-update-btn"
                  style={{ marginRight: "10px" }}
                  onClick={gotoPreviousHandler}
                >
                  previous location
                </button>
                {!isUpdate && (
                  <button
                    type="submit"
                    class="btn profile-update-btn"
                    onClick={saveHandler}
                  >
                    add new
                  </button>
                )}

                {isUpdate && (
                  <button
                    type="submit"
                    class="btn profile-update-btn"
                    onClick={updateHandler}
                  >
                    Update Previous
                  </button>
                )}
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
