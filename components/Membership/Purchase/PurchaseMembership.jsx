import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { baseUrl, http } from "../../../services/httpService";
import { postJobs, postMembership } from "../../lib/endpoints";
import Axios from "axios";
import SupplierSlider from "../../SupplierReg/SupplierSlider";

function PurchaseMembership({setIsShowForm, cardDetail }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.HomeData);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cardError, setCardError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isSubminForm, setIsSubminForm] = useState("");
 const [message, setMessage] = useState("");

  const [pageContent,setPageContent]  = useState()
  const [type, setType] = useState("");

  // const [catNameError, setCatNameError] = useState("");
  // const [collectionAmtError, setCollectionAmtError] = useState("");
  // const [renewFeeError, setRenewFeeError] = useState("");
  // const [reprintFeeError, setReprintFeeError] = useState("");
  // const [branchIdError, setBranchIdError] = useState("");
  // const [professionError, setProfessionError] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const [inputValues, setInputValue] = useState({
    CategoryId: 0,
    FirstName: "",
    LastName: "",
    Mobile: "",
    Address: "",
    CatName: "",
    CollectionAmt: 0,
    RenewFee: 0,
    ReprintFee: 0,
    FullName: "",
    TitleId: 4,
    BranchId: "",
    ProfessionId: 6,
    AC_CUSID: "",
    MembershipTypeId: "",
    MembershipTypeName: "",
  });
  const [inputTouched, setInputTouched] = useState({
    CategoryId: 0,
    FirstName: "",
    LastName: "",
    Mobile: "",
    Address: "",
    CatName: "",
    CollectionAmt: "",
    RenewFee: 0,
    ReprintFee: 0,
    FullName: "",
    ExpiredDate: "",
    TitleId: 0,
    BranchId: "",
    ProfessionId: 0,
    AC_CUSID: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log("test",event.target)
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleChange1(event) {
    const name = event.target.name;
    const value = parseInt(event.target.value);
    console.log("test",value)
    setInputValue({ ...inputValues, [name]: value });
  }

 
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }

  function checkValidation() {
    if (
      (inputValues.FirstName.length == 0 && inputTouched.FirstName) ||
      (inputValues.FirstName.length == 0 && !inputTouched.FirstName)
    ) {
      setFirstNameError("First Name is required.");
    } else {
      setFirstNameError("");
    }
    if (
      (inputValues.LastName.length == 0 && inputTouched.LastName) ||
      (inputValues.LastName.length == 0 && !inputTouched.LastName)
    ) {
      setLastNameError("Last Name is required.");
    } else {
      setLastNameError("");
    }
    // if (
    //   (inputValues.cardNo.length == 0 && inputTouched.cardNo) ||
    //   (inputValues.cardNo.length == 0 && !inputTouched.cardNo)
    // ) {
    //   setCardError("CardNo number is required.");
    // } else {
    //   setCardError("");
    // }
    // email validation
    if (
      (inputValues.Mobile.length == 0 && inputTouched.Mobile) ||
      (inputValues.Mobile.length == 0 && !inputTouched.Mobile)
    ) {
      setMobileError("Phone number is required.");
    } else {
      setMobileError("");
    }
    //

    //
    if (
      (inputValues.Address.length == 0 && inputTouched.Address) ||
      (inputValues.Address.length == 0 && !inputTouched.Address)
    ) {
      setAddressError("Address is required.");
    } else {
      setAddressError("");
    }
   
  }
  useEffect(() => {
    if (!isSuccess) {
      checkValidation();
    }
  }, [inputValues, inputTouched]);

  function saveOnlineApplication(data) {
   
    http.post({
      url: postMembership,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setMessage(res.message)
        setIsShowForm(false)
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    if (
      firstNameError != "" ||
      cardError != "" ||
      mobileError != "" ||
      addressError != ""
    ) {
      setIsSuccess(false);
      return;
    }

    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    if (!user) {
      router.push({ pathname: "/auth" });
    }

    inputValues.CategoryId = cardDetail.categoryid;
    inputValues.CatName = cardDetail.category_name;
    inputValues.CollectionAmt = cardDetail.price;
    inputValues.RenewFee = cardDetail.renew_price;
    inputValues.ReprintFee = cardDetail.reprint_fee;
    inputValues.FullName = inputValues.FirstName + " " + inputValues.LastName;
    inputValues.AC_CUSID = user?.user.id;
    inputValues.MembershipTypeId = "1";
    inputValues.MembershipTypeName = "Regular";
    inputValues.BranchId = 1;

    const current = new Date();
    saveOnlineApplication(inputValues);

    setIsSuccess(true);

    setInputValue({
      CategoryId: 0,
      FirstName: "",
      LastName: "",
      Mobile: "",
      Address: "",
      CatName: "",
      CollectionAmt: 0,
      RenewFee: 0,
      ReprintFee: 0,
      FullName: "",
      TitleId: 4,
      BranchId: "",
      ProfessionId: 6,
      AC_CUSID: "",
    });
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
    
  }
  const getMemberShipPageContent = () => {
    http.get({
      url: 'membership-page-content',
      before: () => {

      },
      successed: (res) => {
        setPageContent(res)
      },
      failed: () => {

      },
    });

  }

  useEffect(() => {
    let user = localStorage.getItem("USERWHOLESALE25");

    if (!user) {
      router.push({ pathname: "/auth" });
    } else {
      dispatch({ type: "JOIN_MEMBER_SHIP_LOGIN", payload: false });
    }

    getMemberShipPageContent()
  }, []);
  return (
      <>
        <SupplierSlider  supplierData={{banner : pageContent?.banner , title : pageContent?.title}}/>
        <section className="supplier-description">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="supplier-desc-bg">
                  <p>{
                    pageContent?.description
                  }</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="job-apply-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="common-gap">
                  <div className="subtitle">
                    <span>Join Membership Form</span>
                  </div>
                  {/* <div class="main-title">
              <h2>Data Entry Cum Product Analyst</h2>
            </div> */}
                  <form
                      action=""
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                  >
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded"> Membership</legend>
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                First Name <sup className="text-danger">*</sup>
                              </label>

                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Please enter your first name"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="FirstName"
                                  value={inputValues.FirstName}
                              />
                              {firstNameError != "" &&
                              !clicked &&
                              inputTouched.FirstName && (
                                  <div style={{color: "red"}}>
                                    {firstNameError}
                                  </div>
                              )}
                              {firstNameError != "" && clicked && (
                                  <div style={{color: "red"}}>{firstNameError}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                Last Name <sup className="text-danger">*</sup>
                              </label>

                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="please enter your last name"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="LastName"
                                  value={inputValues.LastName}
                              />
                              {lastNameError != "" &&
                              !clicked &&
                              inputTouched.LastName && (
                                  <div style={{color: "red"}}>
                                    {lastNameError}
                                  </div>
                              )}
                              {lastNameError != "" && clicked && (
                                  <div style={{color: "red"}}>{lastNameError}</div>
                              )}
                            </div>
                          </div>
                          {/* <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="form-group">
                          <label for="" class="form-label">
                            Card No <sup class="text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="please enter your card No"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleTouched(e)}
                            name="cardNo"
                            value={inputValues.cardNo}
                          />
                          {cardError != "" &&
                            !clicked &&
                            inputTouched.cardNo && (
                              <div style={{ color: "red" }}>{cardError}</div>
                            )}
                          {cardError != "" && clicked && (
                            <div style={{ color: "red" }}>{cardError}</div>
                          )}
                        </div>
                      </div> */}
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                Phone number <sup className="text-danger">*</sup>
                              </label>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="please enter Mobile number"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="Mobile"
                                  value={inputValues.Mobile}
                              />
                              {mobileError != "" &&
                              !clicked &&
                              inputTouched.Mobile && (
                                  <div style={{color: "red"}}>{mobileError}</div>
                              )}
                              {mobileError != "" && clicked && (
                                  <div style={{color: "red"}}>{mobileError}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                Address <sup className="text-danger">*</sup>
                              </label>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="please enter address"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="Address"
                                  value={inputValues.Address}
                              />
                              {addressError != "" &&
                              !clicked &&
                              inputTouched.Address && (
                                  <div style={{color: "red"}}>{addressError}</div>
                              )}
                              {addressError != "" && clicked && (
                                  <div style={{color: "red"}}>{addressError}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label htmlFor="" className="form-label">
                                Select profession <sup className="text-danger">*</sup>
                              </label>
                              <select
                                  className="form-select"
                                  value={inputValues.ProfessionId}
                                  name="ProfessionId"
                                  onChange={(e) => handleChange(e)}
                              >
                                <option value="6">Student</option>
                                <option value="7">Service</option>
                                <option value="8">Business</option>
                                <option value="9">House Wife</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group" onChange={(e) => handleChange1(e)}>
                              <label htmlFor="" className="form-label">
                                Select Gender <sup className="text-danger">*</sup>
                              </label>
                              <div className="form-check">
                                <input
                                    id="flexRadioDefault1"
                                    className="form-check-input"
                                    type="radio"
                                    value="4"
                                    name="TitleId"
                                    checked={inputValues.TitleId === 4}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                >
                                  Male
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                    id="flexRadioDefault2"
                                    className="form-check-input"
                                    type="radio"
                                    value="5"
                                    name="TitleId"
                                    checked={inputValues.TitleId === 5}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault2"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                          <p className="text-success">{message}</p>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-4">
                            <button
                                className="btn btn-success apply-online-btn"
                                type="submit"
                            >
                              continue
                            </button>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
  );
}

export default PurchaseMembership;
