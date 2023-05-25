import router from "next/router";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../../services/httpService";
import {
  postJobs,
  postMembership,
  postMembershipResendOtp,
  postRegisterMembership,
} from "../../lib/endpoints";
import SupplierSlider from "../../SupplierReg/SupplierSlider";

function RegisterMembership() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [memberShipNumberError, SetMemberShipNumberError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [optNumber, setOtpNumber] = useState("");
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowReset, setIsShowReset] = useState(false);
  const [pageContent,setPageContent] = useState()
  const [inputValues, setInputValue] = useState({
    membership_number: "",
    FirstName: "",
    LastName: "",
    Mobile: "",
  });
  const [inputTouched, setInputTouched] = useState({
    membership_number: "",
    FirstName: "",
    LastName: "",
    Mobile: "",
  });

  function handleChangeOtp(e) {
    setOtpNumber(e.target.value);
  }
  function handleResendOtp(e) {
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    http.post({
      url: postMembershipResendOtp,
      payload: { user_id: user?.user.id },
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        console.log("otpRe", res);
        setIsLoading(false);
        setIsShowReset(true);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  function handleVewrifyOtp(e) {
    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    http.post({
      url: postMembershipResendOtp,
      payload: { otp: optNumber, user_id: user?.user.id },
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        console.log(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }

  function checkValidation() {
    if (
      (inputValues.membership_number.length == 0 &&
        inputTouched.membership_number) ||
      (inputValues.membership_number.length == 0 &&
        !inputTouched.membership_number)
    ) {
      SetMemberShipNumberError("Membership Number is required.");
    } else {
      SetMemberShipNumberError("");
    }
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
    if (
      (inputValues.Mobile.length == 0 && inputTouched.Mobile) ||
      (inputValues.Mobile.length == 0 && !inputTouched.Mobile)
    ) {
      setMobileError("Mobile number is required.");
    } else if (
      (inputValues.Mobile.length != 11 && inputTouched.Mobile) ||
      (inputValues.Mobile.length != 11 && !inputTouched.Mobile)
    ) {
      setMobileError("Invalid mobile number.");
    } else {
      setMobileError("");
    }
  }

  function saveOnlineApplication(data) {
    http.post({
      url: postRegisterMembership,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsSubmitForm(true);
        console.log("otp", res);
        setMessage(res.message);
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
    console.log("error", firstNameError);
    if (
      firstNameError != "" ||
      memberShipNumberError != "" ||
      mobileError != "" ||
      memberShipNumberError != ""
    ) {
      setIsSuccess(false);
      return;
    }

    let user = JSON.parse(localStorage.getItem("USERWHOLESALE25"));
    if (!user) {
      router.push({ pathname: "/auth" });
    }
    console.log("val", inputValues);

    saveOnlineApplication(inputValues);

    setIsSuccess(true);
    setClicked(false);
    setInputValue({
      membership_number: "",
      FirstName: "",
      LastName: "",
      Mobile: "",
    });
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }

  const getMemberShipPageContent = () => {
    http.get({
      url: 'registerd-membership-page-content',
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
    if (!isSuccess) {
      checkValidation();
    }
  }, [inputValues, inputTouched]);
  useEffect(() => {
    let user = localStorage.getItem("USERWHOLESALE25");

    if (!user) {
      router.push({ pathname: "/auth" });
    } else {
      dispatch({ type: "REGISTER_MEMBER_SHIP_LOGIN", payload: false });
    }

    getMemberShipPageContent()
  }, []);
  return (
      <>
        <SupplierSlider  supplierData={{banner : pageContent?.banner , title : pageContent?.title}}/>

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
                        <legend className="rounded"> Register Membership</legend>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="" className="form-label">
                                  Membership Number <sup className="text-danger">*</sup>
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="please enter your membership number"
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleTouched(e)}
                                    name="membership_number"
                                    value={inputValues.membership_number}
                                    readOnly={!isSubmitForm ? "" : "readonly"}
                                />
                                {memberShipNumberError != "" &&
                                !clicked &&
                                !isSubmitForm &&
                                inputTouched.membership_number && (
                                    <div style={{color: "red"}}>
                                      {memberShipNumberError}
                                    </div>
                                )}
                                {memberShipNumberError != "" && clicked && (
                                    <div style={{color: "red"}}>
                                      {memberShipNumberError}
                                    </div>
                                )}
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="" className="form-label">
                                  First Name <sup className="text-danger">*</sup>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="please enter your first name"
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleTouched(e)}
                                    name="FirstName"
                                    value={inputValues.FirstName}
                                    readOnly={!isSubmitForm ? "" : "readonly"}
                                />
                                {firstNameError != "" &&
                                !clicked &&
                                !isSubmitForm &&
                                inputTouched.FirstName && (
                                    <div style={{color: "red"}}>
                                      {firstNameError}
                                    </div>
                                )}
                                {firstNameError != "" && clicked && (
                                    <div style={{color: "red"}}>
                                      {firstNameError}
                                    </div>
                                )}
                              </div>
                            </div>
                            <div className="col-6">
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
                                    readOnly={!isSubmitForm ? "" : "readonly"}
                                />
                                {lastNameError != "" &&
                                !clicked &&
                                !isSubmitForm &&
                                inputTouched.LastName && (
                                    <div style={{color: "red"}}>
                                      {lastNameError}
                                    </div>
                                )}
                                {lastNameError != "" && clicked && (
                                    <div style={{color: "red"}}>
                                      {lastNameError}
                                    </div>
                                )}
                              </div>
                            </div>

                            <div className="col-6">
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
                                    readOnly={!isSubmitForm ? "" : "readonly"}
                                />
                                {mobileError != "" &&
                                !clicked &&
                                !isSubmitForm &&
                                inputTouched.Mobile && (
                                    <div style={{color: "red"}}>
                                      {mobileError}
                                    </div>
                                )}
                                {mobileError != "" && clicked && (
                                    <div style={{color: "red"}}>{mobileError}</div>
                                )}
                              </div>
                            </div>

                            <div className="col-12 col-md-6 m-auto mt-3 text-center">
                              {!isShowReset && (
                                  <button
                                      className="btn apply-online-btn mb-5"
                                      type="submit"
                                      style={{marginRight: "10px"}}
                                  >
                                    Send OTP
                                  </button>
                              )}

                              {isShowReset && (
                                  <button
                                      className="btn addto-quote-btn mb-5"
                                      type="button"
                                      onClick={handleResendOtp}
                                      // style={{marginLeft:"10px"}}
                                  >
                                    Resend OTP
                                  </button>
                              )}
                              {isShowReset && (
                                  <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="please enter OTP"
                                        onChange={(e) => handleChangeOtp(e)}
                                        name="optNumber"
                                        value={optNumber}
                                        readOnly={isSubmitForm ? "" : "readonly"}
                                    />

                                    <button
                                        className="btn verify-otp-btn"
                                        type="button"
                                        style={{marginLeft: "10px"}}
                                        onClick={handleVewrifyOtp}
                                    >
                                      Verify OTP
                                    </button>
                                  </div>
                              )}
                            </div>

                            <p className="text-success">{message}</p>
                            {/* <div class="col-6 mt-4">
                          <button
                            class="btn btn-secondary btn-lg btn-block"
                            type="button"
                            onClick={handleResendOtp}
                          // style={{marginLeft:"10px"}}
                          >
                            Resend OTP
                          </button>
                        </div> */}
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

export default RegisterMembership;
