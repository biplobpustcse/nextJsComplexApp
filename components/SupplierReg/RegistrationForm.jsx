import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";
import { addSupplier, postMembership } from "../lib/endpoints";
import SupplierFileUpload from "./FileUpload";
import ProductLisitingForm from "./ProductLisitingForm";

function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState();
  const [selectedOptions2, setSelectedOptions2] = useState();
  const [selectedOptions3, setSelectedOptions3] = useState();

  const [keyContactManagementNameError, setKeyContactManagementNameError] =
    useState("");
  const [
    keyContactManagementDesignationError,
    setKeyContactManagementDesignationError,
  ] = useState("");
  const [keyContactManagementCellError, setKeyContactManagementCellError] =
    useState("");
  const [keyContactManagementEmailError, setKeyContactManagementEmailError] =
    useState("");

  const [keyContactRegularNameError, setKeyContactRegularNameError] =
    useState("");
  const [
    keyContactRegularDesignationError,
    setKeyContactRegularDesignationError,
  ] = useState("");
  const [keyContactRegularCellError, setKeyContactRegularCellError] =
    useState("");
  const [keyContactRegularEmailError, setKeyContactRegularEmailError] =
    useState("");

  const [experienceError, setExperienceError] = useState("");

  const [businessTinError, setBusinessTinError] = useState("");

  const [isSubminForm, setIsSubminForm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  //initialize
  const [inputValues, setInputValue] = useState({
    email: "",
    phone: "",
    fax: "",
    company_name: "",
    parent_company_name: "",
    web_address: "",
    trade_license: "",
    address: "",
    business_type: "corporate",
    nature_of_business: "manufacturer",
    number_of_employes: "",
    annual_turnover: "",
    vat_no: "",
    incorporation_no: "",
    is_ISO_certified: false,
    is_quality_standard: false,
    tin_no: "",
    other_certifications: "",
    type_of_products: "local",
  });
  const [inputValuesDistributor, setInputValuesDistributor] = useState({
    name: "",
    address: "",
    tel: "",
    email: "",
    fax: "",
    web_address: "",
  });
  const [inputValuesDistributor1, setInputValuesDistributor1] = useState({
    designation: "",
    phone: "",
    email: "",
  });
  const [inputValuesMerchandiseProvider, setInputValuesMerchandiseProvider] =
    useState({
      category1: "",
      no_of_sku1: "",
      market_share1: "",
      yearly_promotion1: "",
      target_turnover1: "",
      avg_gp1: "",
      remarks1: "",
      category2: "",
      no_of_sku2: "",
      market_share2: "",
      yearly_promotion2: "",
      target_turnover2: "",
      avg_gp2: "",
      remarks2: "",
      category3: "",
      no_of_sku3: "",
      market_share3: "",
      yearly_promotion3: "",
      target_turnover3: "",
      avg_gp3: "",
      remarks3: "",
    });
  const [inputValuesExperience, setInputValuesExperience] = useState({
    organization1: "",
    number_of_sku1: "",
    monthly_sale_turnover1: "",
    organization2: "",
    number_of_sku2: "",
    monthly_sale_turnover2: "",
    organization3: "",
    number_of_sku3: "",
    monthly_sale_turnover3: "",
    organization4: "",
    number_of_sku4: "",
    monthly_sale_turnover4: "",
  });
  const [inputValuesKeyContactPerson, setInputValuesKeyContactPerson] =
    useState({
      name1: "",
      department1: "",
      designation1: "",
      phone1: "",
      email1: "",
      name2: "",
      department2: "",
      designation2: "",
      phone2: "",
      email2: "",
      name3: "",
      department3: "",
      designation3: "",
      phone3: "",
      email3: "",
      name4: "",
      department4: "",
      designation4: "",
      phone4: "",
      email4: "",
    });

  //initialize touched
  const [inputTouched, setInputTouched] = useState({
    company_name: "",
    address: "",
    phone: "",
    email: "",
    Address: "",
    tin_no: "",
  });
  const [inputTouchedKeyContact, setInputTouchedKeyContact] = useState({
    department1: "",
    designation1: "",
    phone1: "",
    email1: "",
    department4: "",
    designation4: "",
    phone4: "",
    email4: "",
  });
  const [inputTouchedExperience, setInputTouchedExperience] = useState({
    organization1: "",
    number_of_sku1: "",
    monthly_sale_turnover1: "",
  });

  //event
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleChangeKeyContact(event) {
    const { name, value } = event.target;
    setInputValuesKeyContactPerson({
      ...inputValuesKeyContactPerson,
      [name]: value,
    });
  }
  function handleChangeDistributor(event) {
    const { name, value } = event.target;
    setInputValuesDistributor({ ...inputValuesDistributor, [name]: value });
  }
  function handleChangeDistributor1(event) {
    const { name, value } = event.target;
    setInputValuesDistributor1({ ...inputValuesDistributor1, [name]: value });
  }
  function handleChangeMerchandiseProvider(event) {
    const { name, value } = event.target;
    setInputValuesMerchandiseProvider({
      ...inputValuesMerchandiseProvider,
      [name]: value,
    });
  }
  function handleChange1(data) {
    setInputValuesMerchandiseProvider({
      ...inputValuesMerchandiseProvider,
      ["category1"]: data.value,
    });
  }
  function handleChange2(data) {
    setInputValuesMerchandiseProvider({
      ...inputValuesMerchandiseProvider,
      ["category2"]: data.value,
    });
  }
  function handleChange3(data) {
    setInputValuesMerchandiseProvider({
      ...inputValuesMerchandiseProvider,
      ["category3"]: data.value,
    });
  }
  function handleChangeExperience(event) {
    const { name, value } = event.target;
    setInputValuesExperience({ ...inputValuesExperience, [name]: value });
  }
  function handleChangeRdo(event) {
    const { name, value } = event.target;
    let valuenew = value == "true" ? true : false;
    setInputValue({ ...inputValues, [name]: valuenew });
  }

  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }
  function handleTouchedKeyContact(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }

  function checkValidation() {
    if (
      (inputValues.company_name.length == 0 && inputTouched.company_name) ||
      (inputValues.company_name.length == 0 && !inputTouched.company_name)
    ) {
      setCompanyNameError("Company Name is required.");
    } else {
      setCompanyNameError("");
    }
    if (
      (inputValues.email.length == 0 && inputTouched.email) ||
      (inputValues.email.length == 0 && !inputTouched.email)
    ) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }

    if (
      (inputValues.phone.length == 0 && inputTouched.phone) ||
      (inputValues.phone.length == 0 && !inputTouched.phone)
    ) {
      setMobileError("Phone number is required.");
    } else {
      setMobileError("");
    }
    if (
      (inputValues.address.length == 0 && inputTouched.address) ||
      (inputValues.address.length == 0 && !inputTouched.address)
    ) {
      setAddressError("Address is required.");
    } else {
      setAddressError("");
    }
    if (
      (inputValues.tin_no.length == 0 && inputTouched.tin_no) ||
      (inputValues.tin_no.length == 0 && !inputTouched.tin_no)
    ) {
      setBusinessTinError("Tin number is required.");
    } else {
      setBusinessTinError("");
    }
    if (
      (inputValuesKeyContactPerson.department1.length == 0 &&
        inputTouched.department1) ||
      (inputValuesKeyContactPerson.department1.length == 0 &&
        !inputTouched.department1)
    ) {
      setKeyContactManagementNameError("feild is required");
    } else {
      setKeyContactManagementNameError("");
    }
    if (
      (inputValuesKeyContactPerson.designation1.length == 0 &&
        inputTouched.designation1) ||
      (inputValuesKeyContactPerson.designation1.length == 0 &&
        !inputTouched.designation1)
    ) {
      setKeyContactManagementDesignationError("designation feild is required");
    } else {
      setKeyContactManagementDesignationError("");
    }
    if (
      (inputValuesKeyContactPerson.phone1.length == 0 && inputTouched.phone1) ||
      (inputValuesKeyContactPerson.phone1.length == 0 && !inputTouched.phone1)
    ) {
      setKeyContactManagementCellError("feild is required");
    } else {
      setKeyContactManagementCellError("");
    }
    if (
      (inputValuesKeyContactPerson.email1.length == 0 && inputTouched.email1) ||
      (inputValuesKeyContactPerson.email1.length == 0 && !inputTouched.email1)
    ) {
      setKeyContactManagementEmailError("feild is required");
    } else {
      setKeyContactManagementEmailError("");
    }
    if (
      (inputValuesKeyContactPerson.department4.length == 0 &&
        inputTouched.department4) ||
      (inputValuesKeyContactPerson.department4.length == 0 &&
        !inputTouched.department4)
    ) {
      setKeyContactRegularNameError("feild is required.");
    } else {
      setKeyContactRegularNameError("");
    }
    if (
      (inputValuesKeyContactPerson.designation4.length == 0 &&
        inputTouched.designation4) ||
      (inputValuesKeyContactPerson.designation4.length == 0 &&
        !inputTouched.designation4)
    ) {
      setKeyContactRegularDesignationError("feild is required.");
    } else {
      setKeyContactRegularDesignationError("");
    }
    if (
      (inputValuesKeyContactPerson.phone4.length == 0 && inputTouched.phone4) ||
      (inputValuesKeyContactPerson.phone4.length == 0 && !inputTouched.phone4)
    ) {
      setKeyContactRegularCellError("feild is required.");
    } else {
      setKeyContactRegularCellError("");
    }
    if (
      (inputValuesKeyContactPerson.email4.length == 0 && inputTouched.email4) ||
      (inputValuesKeyContactPerson.email4.length == 0 && !inputTouched.email4)
    ) {
      setKeyContactRegularEmailError("feild is required.");
    } else {
      setKeyContactRegularEmailError("");
    }
    if (
      inputValuesExperience.organization1.length == 0 ||
      inputValuesExperience.number_of_sku1.length == 0 ||
      inputValuesExperience.monthly_sale_turnover1.length == 0
    ) {
      setExperienceError("feild is required.");
    } else {
      setExperienceError("");
    }
  }
  function saveOnlineApplication(data) {
    console.log({ data }, "submittedData");
    http.file({
      url: addSupplier,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        if (res.success) {
          toast.success("Registration Success");
          setCookie("supplier", res.supplier_id, {
            maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
          });
        }
        console.log("form", res);
        ClearData();
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
      companyNameError != "" ||
      emailError != "" ||
      mobileError != "" ||
      addressError != "" ||
      businessTinError != "" ||
      keyContactManagementNameError != "" ||
      keyContactManagementCellError != "" ||
      keyContactManagementDesignationError != "" ||
      keyContactManagementEmailError != "" ||
      keyContactRegularCellError != "" ||
      keyContactRegularDesignationError != "" ||
      keyContactRegularEmailError != "" ||
      keyContactRegularNameError != "" ||
      experienceError != ""
    ) {
      console.log("failed");
      setIsSuccess(false);
      return;
    }

    let products = JSON.parse(localStorage.getItem("supProducts"));
    if (products == null) {
      setMessage("Please ensert at list 1 product.");
      console.log("Please ensert at list 1 product.");
      return;
    }

    let keyContactPerson = [
      {
        department: inputValuesKeyContactPerson.department1,
        designation: inputValuesKeyContactPerson.designation1,
        phone: inputValuesKeyContactPerson.phone1,
        email: inputValuesKeyContactPerson.email1,
      },
      {
        department: inputValuesKeyContactPerson.department2,
        designation: inputValuesKeyContactPerson.designation2,
        phone: inputValuesKeyContactPerson.phone2,
        email: inputValuesKeyContactPerson.email2,
      },
      {
        department: inputValuesKeyContactPerson.department3,
        designation: inputValuesKeyContactPerson.designation3,
        phone: inputValuesKeyContactPerson.phone3,
        email: inputValuesKeyContactPerson.email3,
      },
      {
        department: inputValuesKeyContactPerson.department4,
        designation: inputValuesKeyContactPerson.designation4,
        phone: inputValuesKeyContactPerson.phone4,
        email: inputValuesKeyContactPerson.email4,
      },
    ];
    let experience = [
      {
        organization: inputValuesExperience.organization1,
        number_of_sku: inputValuesExperience.number_of_sku1,
        monthly_sale_turnover: inputValuesExperience.monthly_sale_turnover1,
      },
      {
        organization: inputValuesExperience.organization2,
        number_of_sku: inputValuesExperience.number_of_sku2,
        monthly_sale_turnover: inputValuesExperience.monthly_sale_turnover2,
      },
      {
        organization: inputValuesExperience.organization3,
        number_of_sku: inputValuesExperience.number_of_sku3,
        monthly_sale_turnover: inputValuesExperience.monthly_sale_turnover3,
      },
      {
        organization: inputValuesExperience.organization4,
        number_of_sku: inputValuesExperience.number_of_sku4,
        monthly_sale_turnover: inputValuesExperience.monthly_sale_turnover4,
      },
    ];
    let merchandiseProvider = [
      {
        category: inputValuesMerchandiseProvider.category1,
        no_of_sku: inputValuesMerchandiseProvider.no_of_sku1,
        market_share: inputValuesMerchandiseProvider.market_share1,
        yearly_promotion: inputValuesMerchandiseProvider.yearly_promotion1,
        target_turnover: inputValuesMerchandiseProvider.target_turnover1,
        avg_gp: inputValuesMerchandiseProvider.avg_gp1,
        remarks: inputValuesMerchandiseProvider.remarks1,
      },
      {
        category: inputValuesMerchandiseProvider.category2,
        no_of_sku: inputValuesMerchandiseProvider.no_of_sku2,
        market_share: inputValuesMerchandiseProvider.market_share2,
        yearly_promotion: inputValuesMerchandiseProvider.yearly_promotion2,
        target_turnover: inputValuesMerchandiseProvider.target_turnover2,
        avg_gp: inputValuesMerchandiseProvider.avg_gp2,
        remarks: inputValuesMerchandiseProvider.remarks2,
      },
      {
        category: inputValuesMerchandiseProvider.category3,
        no_of_sku: inputValuesMerchandiseProvider.no_of_sku3,
        market_share: inputValuesMerchandiseProvider.market_share3,
        yearly_promotion: inputValuesMerchandiseProvider.yearly_promotion3,
        target_turnover: inputValuesMerchandiseProvider.target_turnover3,
        avg_gp: inputValuesMerchandiseProvider.avg_gp3,
        remarks: inputValuesMerchandiseProvider.remarks3,
      },
    ];
    inputValues.merchandise_distributor = inputValuesDistributor;
    inputValues.merchandise_distributor.contact = inputValuesDistributor1;
    inputValues.contacts = keyContactPerson;
    inputValues.products = products;
    inputValues.experiences = experience;
    inputValues.type_of_merchandise_provider = inputValuesMerchandiseProvider;
    console.log("val", inputValues);
    //
    saveOnlineApplication(inputValues);

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }
  function ClearData() {
    setInputValue({
      email: "",
      phone: "",
      company_name: "",
      parent_company_name: "",
      web_address: "",
      trade_license: "",
      address: "",
      business_type: "",
      nature_of_business: "",
      number_of_employes: "",
      vat_no: "",
      incorporation_no: "",
      is_ISO_certified: false,
      is_quality_standard: false,
      tin_no: "",
    });
    setInputValue1({
      name: "",
      address: "",
      tel: "",
      email: "",
      fax: "",
      contact: {
        designation: "",
        phone: "",
        email: "",
      },
    });
    setInputValuesExperience({
      organization1: "",
      number_of_sku1: "",
      monthly_sale_turnover1: "",
      organization2: "",
      number_of_sku2: "",
      monthly_sale_turnover2: "",
      organization3: "",
      number_of_sku3: "",
      monthly_sale_turnover3: "",
      organization4: "",
      number_of_sku4: "",
      monthly_sale_turnover4: "",
    });
    setInputValuesKeyContactPerson({
      department1: "",
      designation1: "",
      phone1: "",
      email1: "",
      department2: "",
      designation2: "",
      phone2: "",
      email2: "",
      department3: "",
      designation3: "",
      phone3: "",
      email3: "",
      department4: "",
      designation4: "",
      phone4: "",
      email4: "",
    });
  }
  useEffect(() => {
    debugger;
    if (!isSuccess) {
      checkValidation();
    }
  }, [
    inputValues,
    inputValuesKeyContactPerson,
    inputValuesExperience,
    inputTouched,
  ]);
  return (
    <div className="supplier-reg-layout">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="supplier-reg-bg">
              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">
                          company name & general info
                        </legend>

                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label for="" className="form-label">
                                company name{" "}
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="company_name"
                                value={inputValues.company_name}
                              />
                              {companyNameError != "" &&
                                !clicked &&
                                inputTouched.company_name && (
                                  <div style={{ color: "red" }}>
                                    {companyNameError}
                                  </div>
                                )}
                              {companyNameError != "" && clicked && (
                                <div style={{ color: "red" }}>
                                  {companyNameError}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label for="" className="form-label">
                                parent company (full name)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                onChange={(e) => handleChange(e)}
                                name="parent_company_name"
                                value={inputValues.parent_company_name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              address <sup className="text-danger">*</sup>
                            </label>
                            <textarea
                              id=""
                              cols=""
                              rows=""
                              className="form-control"
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="address"
                              value={inputValues.address}
                            ></textarea>
                            {addressError != "" &&
                              !clicked &&
                              inputTouched.address && (
                                <div style={{ color: "red" }}>
                                  {addressError}
                                </div>
                              )}
                            {addressError != "" && clicked && (
                              <div style={{ color: "red" }}>{addressError}</div>
                            )}
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              mailing address (if different)
                            </label>
                            <textarea
                              id=""
                              cols=""
                              rows=""
                              className="form-control"
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              name="web_address"
                              value={inputValues.web_address}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              tel <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="phone"
                              value={inputValues.phone}
                            />
                            {mobileError != "" &&
                              !clicked &&
                              inputTouched.phone && (
                                <div style={{ color: "red" }}>
                                  {mobileError}
                                </div>
                              )}
                            {mobileError != "" && clicked && (
                              <div style={{ color: "red" }}>{mobileError}</div>
                            )}
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              fax{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="fax"
                              value={inputValues.fax}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              e-mail <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="email"
                              className="form-control mb-0"
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              onBlur={(e) => handleTouched(e)}
                              name="email"
                              value={inputValues.email}
                            />
                            {emailError != "" &&
                              !clicked &&
                              inputTouched.email && (
                                <div style={{ color: "red" }}>{emailError}</div>
                              )}
                            {emailError != "" && clicked && (
                              <div style={{ color: "red" }}>{emailError}</div>
                            )}
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <label for="" className="form-label">
                              web address/URL{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control  mb-0"
                              placeholder=""
                              onChange={(e) => handleChange(e)}
                              name="web_address"
                              value={inputValues.web_address}
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">key contact person</legend>
                        <div className="table-responsive ">
                          <table className="table table-bordered key-person mb-0">
                            <thead>
                              <tr>
                                <th scope="col">department</th>
                                <th scope="col">name</th>
                                <th scope="col">designation</th>
                                <th scope="col">cell number</th>
                                <th scope="col">email</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <select
                                    className="form-select form-control mb-0 d-none"
                                    aria-label="Default select example"
                                  >
                                    <option selected>management</option>
                                    <option value="1">marketing</option>
                                    <option selected>management</option>
                                    <option value="1">marketing</option>
                                  </select>
                                  management{" "}
                                  <sup className="text-danger">*</sup>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="department1"
                                    value={
                                      inputValuesKeyContactPerson.department1
                                    }
                                  />
                                  {keyContactManagementNameError != "" &&
                                    !clicked &&
                                    inputTouched.department1 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementNameError}
                                      </div>
                                    )}
                                  {keyContactManagementNameError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementNameError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="designation1"
                                    value={
                                      inputValuesKeyContactPerson.designation1
                                    }
                                  />
                                  {keyContactManagementDesignationError != "" &&
                                    !clicked &&
                                    inputTouched.designation1 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementDesignationError}
                                      </div>
                                    )}
                                  {keyContactManagementDesignationError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementDesignationError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="phone1"
                                    value={inputValuesKeyContactPerson.phone1}
                                  />
                                  {keyContactManagementCellError != "" &&
                                    !clicked &&
                                    inputTouched.phone1 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementCellError}
                                      </div>
                                    )}
                                  {keyContactManagementCellError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementCellError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="email1"
                                    value={inputValuesKeyContactPerson.email1}
                                  />
                                  {keyContactManagementEmailError != "" &&
                                    !clicked &&
                                    inputTouched.email1 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementEmailError}
                                      </div>
                                    )}
                                  {keyContactManagementEmailError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactManagementEmailError}
                                      </div>
                                    )}
                                </td>
                              </tr>
                              <tr>
                                <td>marketing</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="department2"
                                    value={
                                      inputValuesKeyContactPerson.department2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="designation2"
                                    value={
                                      inputValuesKeyContactPerson.designation2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="phone2"
                                    value={inputValuesKeyContactPerson.phone2}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="email2"
                                    value={inputValuesKeyContactPerson.email2}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>financial</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="department3"
                                    value={
                                      inputValuesKeyContactPerson.department3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="designation3"
                                    value={
                                      inputValuesKeyContactPerson.designation3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="phone3"
                                    value={inputValuesKeyContactPerson.phone3}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    name="email3"
                                    value={inputValuesKeyContactPerson.email3}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  regularly <sup className="text-danger">*</sup>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="department4"
                                    value={
                                      inputValuesKeyContactPerson.department4
                                    }
                                  />
                                  {keyContactRegularNameError != "" &&
                                    !clicked &&
                                    inputTouched.department4 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularNameError}
                                      </div>
                                    )}
                                  {keyContactRegularNameError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularNameError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="designation4"
                                    value={
                                      inputValuesKeyContactPerson.designation4
                                    }
                                  />
                                  {keyContactRegularDesignationError != "" &&
                                    !clicked &&
                                    inputTouched.designation4 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularDesignationError}
                                      </div>
                                    )}
                                  {keyContactRegularDesignationError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularDesignationError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="phone4"
                                    value={inputValuesKeyContactPerson.phone4}
                                  />
                                  {keyContactRegularCellError != "" &&
                                    !clicked &&
                                    inputTouched.phone4 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularCellError}
                                      </div>
                                    )}
                                  {keyContactRegularCellError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularCellError}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeKeyContact(e)}
                                    onBlur={(e) => handleTouchedKeyContact(e)}
                                    name="email4"
                                    value={inputValuesKeyContactPerson.email4}
                                  />
                                  {keyContactRegularEmailError != "" &&
                                    !clicked &&
                                    inputTouched.email4 && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularEmailError}
                                      </div>
                                    )}
                                  {keyContactRegularEmailError != "" &&
                                    clicked && (
                                      <div style={{ color: "red" }}>
                                        {keyContactRegularEmailError}
                                      </div>
                                    )}
                                </td>
                              </tr>
                              <tr>
                                <td colspan="5" className="text-start">
                                  <span className="text-upper ">
                                    if merchandise supplied by distributor
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="5" className="text-start">
                                  <label for="" className="form-label">
                                    distributor name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="name"
                                    value={inputValuesDistributor.name}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colspan="5" className="text-start">
                                  <label for="" className="form-label">
                                    address
                                  </label>
                                  <textarea
                                    id=""
                                    cols=""
                                    rows=""
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="address"
                                    value={inputValuesDistributor.address}
                                  ></textarea>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="3" className="text-start">
                                  <label for="" className="form-label">
                                    tel
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="tel"
                                    value={inputValuesDistributor.tel}
                                  />
                                </td>
                                <td colspan="2" className="text-start">
                                  <label for="" className="form-label">
                                    fax
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="fax"
                                    value={inputValuesDistributor.fax}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colspan="3" className="text-start">
                                  <label for="" className="form-label">
                                    email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="email"
                                    value={inputValuesDistributor.email}
                                  />
                                </td>
                                <td colspan="2" className="text-start">
                                  <label for="" className="form-label">
                                    web address /URL
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeDistributor(e)}
                                    name="web_address"
                                    value={inputValuesDistributor.web_address}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colspan="5" className="text-start">
                                  <label for="" className="form-label">
                                    key contact person name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeDistributor1(e)
                                    }
                                    name="name"
                                    value={inputValuesDistributor1.name}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" className="text-start">
                                  <label for="" className="form-label">
                                    designation
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeDistributor1(e)
                                    }
                                    name="designation"
                                    value={inputValuesDistributor1.designation}
                                  />
                                </td>
                                <td colspan="1" className="text-start">
                                  <label for="" className="form-label">
                                    cell
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeDistributor1(e)
                                    }
                                    name="phone"
                                    value={inputValuesDistributor1.phone}
                                  />
                                </td>
                                <td colspan="2" className="text-start">
                                  <label for="" className="form-label">
                                    e-mail
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeDistributor1(e)
                                    }
                                    name="email"
                                    value={inputValuesDistributor1.email}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </fieldset>
                    </div>
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">business details</legend>
                        <div
                          className="form-group mb-3"
                          onChange={(e) => handleChange(e)}
                        >
                          <label for="" className="form-label d-block">
                            type of business
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineradio1"
                              value="corporate"
                              name="business_type"
                              checked={
                                inputValues.business_type === "corporate"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineradio1"
                            >
                              corporate/limited
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio2"
                              value="partnership"
                              name="business_type"
                              checked={
                                inputValues.business_type === "partnership"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio2"
                            >
                              partnership
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio3"
                              value="other"
                              name="business_type"
                              checked={inputValues.business_type === "other"}
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio3"
                            >
                              other (specify)
                            </label>
                          </div>
                        </div>
                        <div
                          className="form-group"
                          onChange={(e) => handleChange(e)}
                        >
                          <label for="" className="form-label d-block">
                            nature of business
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio4"
                              value="manufacturer"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business ===
                                "manufacturer"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio4"
                            >
                              manufacturer
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio5"
                              value="distributor"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business === "distributor"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio5"
                            >
                              distributor
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio6"
                              value="trader"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business === "trader"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio6"
                            >
                              trader
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio7"
                              value="importer"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business === "importer"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio7"
                            >
                              importer
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio8"
                              value="whole_saller"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business ===
                                "whole_saller"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio8"
                            >
                              whole seller
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio9"
                              value="other"
                              name="nature_of_business"
                              checked={
                                inputValues.nature_of_business === "other"
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio9"
                            >
                              other (specify)
                            </label>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group">
                              <label for="" className="form-label">
                                year established/incorporation
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="incorporation_no"
                                value={inputValues.incorporation_no}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group">
                              <label for="" className="form-label">
                                annual turnover
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="annual_turnover"
                                value={inputValues.annual_turnover}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group">
                              <label for="" className="form-label">
                                number of full-time employees
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="number_of_employes"
                                value={inputValues.number_of_employes}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label for="" className="form-label">
                                license no,: country where registerd{" "}
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="trade_license"
                                value={inputValues.trade_license}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label for="" className="form-label">
                                VAT no
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="vat_no"
                                value={inputValues.vat_no}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label for="" className="form-label">
                                TIN/TaxID <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control mb-0"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="tin_no"
                                value={inputValues.tin_no}
                              />
                              {businessTinError != "" &&
                                !clicked &&
                                inputTouched.tin_no && (
                                  <div style={{ color: "red" }}>
                                    {businessTinError}
                                  </div>
                                )}
                              {businessTinError != "" && clicked && (
                                <div style={{ color: "red" }}>
                                  {businessTinError}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="form-group">
                              <label for="" className="form-label">
                                incorporation No
                              </label>
                              <input
                                type="text"
                                className="form-control mb-0"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="incorporation_no"
                                value={inputValues.incorporation_no}
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">
                          technical capability & information on goods/services
                          offered
                        </legend>
                        <div
                          className="form-group mb-3"
                          onChange={(e) => handleChangeRdo(e)}
                        >
                          <label for="" className="form-label d-block">
                            for good's only, do those offered for supply conform
                            to national/international quality standard?
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio10"
                              value={true}
                              name="is_quality_standard"
                              checked={inputValues.is_quality_standard === true}
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio10"
                            >
                              yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio11"
                              value={false}
                              name="is_quality_standard"
                              checked={
                                inputValues.is_quality_standard === false
                              }
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio11"
                            >
                              no
                            </label>
                          </div>
                        </div>
                        <div
                          className="form-group mb-3"
                          onChange={(e) => handleChangeRdo(e)}
                        >
                          <label for="" className="form-label d-block">
                            quality assurance certification ( e.g. ISO 9000 or
                            quivalent)?
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio12"
                              value={true}
                              name="is_ISO_certified"
                              checked={inputValues.is_ISO_certified === true}
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio12"
                            >
                              yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineRadio13"
                              value={false}
                              name="is_ISO_certified"
                              checked={inputValues.is_ISO_certified === false}
                            />
                            <label
                              className="form-check-label"
                              for="inlineRadio13"
                            >
                              no
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="" className="form-label">
                            other certifications (if applicable)
                          </label>
                          <input
                            type="text"
                            className="form-control mb-0"
                            onChange={(e) => handleChange(e)}
                            name="other_certifications"
                            value={inputValues.other_certifications}
                          />
                        </div>
                      </fieldset>
                    </div>
                    <div className="common-fieldset-main">
                      <fieldset className="common-fieldset">
                        <legend className="rounded">experiance</legend>

                        <div className="table-responsive">
                          <table className="table table-bordered key-person">
                            <thead>
                              <tr>
                                <th scope="col">sl no</th>
                                <th scope="col">
                                  organization <br />
                                  (1 st priority modern trade)
                                </th>
                                <th scope="col">number of SKU</th>

                                <th scope="col">monthly sales turnover</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  1 <sup className="text-danger">*</sup>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    // onBlur={(e) => handleTouched(e)}
                                    name="organization1"
                                    value={inputValuesExperience.organization1}
                                  />

                                  {experienceError != "" && clicked && (
                                    <div style={{ color: "red" }}>
                                      {experienceError}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    // onBlur={(e) => handleTouched(e)}
                                    name="number_of_sku1"
                                    value={inputValuesExperience.number_of_sku1}
                                  />
                                  {experienceError != "" && clicked && (
                                    <div style={{ color: "red" }}>
                                      {experienceError}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    // onBlur={(e) => handleTouched(e)}
                                    name="monthly_sale_turnover1"
                                    value={
                                      inputValuesExperience.monthly_sale_turnover1
                                    }
                                  />
                                  {experienceError != "" && clicked && (
                                    <div style={{ color: "red" }}>
                                      {experienceError}
                                    </div>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="designation2"
                                    value={inputValuesExperience.designation2}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="number_of_sku2"
                                    value={inputValuesExperience.number_of_sku2}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="monthly_sale_turnover2"
                                    value={
                                      inputValuesExperience.monthly_sale_turnover2
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="designation3"
                                    value={inputValuesExperience.designation3}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="number_of_sku3"
                                    value={inputValuesExperience.number_of_sku3}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="monthly_sale_turnover3"
                                    value={
                                      inputValuesExperience.monthly_sale_turnover3
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="designation4"
                                    value={inputValuesExperience.designation4}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="number_of_sku4"
                                    value={inputValuesExperience.number_of_sku4}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="monthly_sale_turnover4"
                                    value={
                                      inputValuesExperience.monthly_sale_turnover4
                                    }
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered key-person">
                            <thead>
                              <tr>
                                <th scope="col">category</th>
                                <th scope="col">number of SKU</th>
                                <th scope="col">market share (%)</th>
                                <th scope="col">yearly promotion</th>
                                <th scope="col">target turn over</th>
                                <th scope="col">avg gp (%)</th>
                                <th scope="col">remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ReactSelect
                                    options={allCategory}
                                    placeholder="Select Category"
                                    value={selectedOptions1}
                                    onChange={(e) => handleChange1(e)}
                                    isSearchable={true}
                                  />
                                  {/* <select
                                    className="form-select form-select-sm form-control mb-0"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option selected>
                                      Open this select menu
                                    </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select> */}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="no_of_sku1"
                                    value={
                                      inputValuesMerchandiseProvider.no_of_sku1
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="market_share1"
                                    value={
                                      inputValuesMerchandiseProvider.market_share1
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="yearly_promotion1"
                                    value={
                                      inputValuesMerchandiseProvider.yearly_promotion1
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="target_turnover1"
                                    value={
                                      inputValuesMerchandiseProvider.target_turnover1
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="avg_gp1"
                                    value={
                                      inputValuesMerchandiseProvider.avg_gp1
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="remarks1"
                                    value={
                                      inputValuesMerchandiseProvider.remarks1
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ReactSelect
                                    options={allCategory}
                                    placeholder="Select Category"
                                    value={selectedOptions2}
                                    onChange={(e) => handleChange2(e)}
                                    isSearchable={true}
                                  />
                                  {/* <select
                                    className="form-select form-select-sm form-control mb-0"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option selected>
                                      Open this select menu
                                    </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select> */}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="no_of_sku2"
                                    value={
                                      inputValuesMerchandiseProvider.no_of_sku2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="market_share2"
                                    value={
                                      inputValuesMerchandiseProvider.market_share2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="yearly_promotion2"
                                    value={
                                      inputValuesMerchandiseProvider.yearly_promotion2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="target_turnover2"
                                    value={
                                      inputValuesMerchandiseProvider.target_turnover2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="avg_gp2"
                                    value={
                                      inputValuesMerchandiseProvider.avg_gp2
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="remarks2"
                                    value={
                                      inputValuesMerchandiseProvider.remarks2
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <ReactSelect
                                    options={allCategory}
                                    placeholder="Select Category"
                                    value={selectedOptions3}
                                    onChange={(e) => handleChange3(e)}
                                    isSearchable={true}
                                  />
                                  {/* <select
                                    className="form-select form-select-sm form-control mb-0"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option selected>
                                      Open this select menu
                                    </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select> */}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="no_of_sku3"
                                    value={
                                      inputValuesMerchandiseProvider.no_of_sku3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="market_share3"
                                    value={
                                      inputValuesMerchandiseProvider.market_share3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="yearly_promotion3"
                                    value={
                                      inputValuesMerchandiseProvider.yearly_promotion3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) =>
                                      handleChangeMerchandiseProvider(e)
                                    }
                                    name="target_turnover3"
                                    value={
                                      inputValuesMerchandiseProvider.target_turnover3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="avg_gp3"
                                    value={
                                      inputValuesMerchandiseProvider.avg_gp3
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-0"
                                    onChange={(e) => handleChangeExperience(e)}
                                    name="remarks3"
                                    value={
                                      inputValuesMerchandiseProvider.remarks3
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colspan="7" className="text-start">
                                  <div
                                    className="form-group mb-0"
                                    onChange={(e) => handleChange(e)}
                                  >
                                    <label
                                      for=""
                                      className="form-label d-block"
                                    >
                                      {" "}
                                      type of products
                                    </label>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="inlineRadio15"
                                        value="local"
                                        name="type_of_products"
                                        checked={
                                          inputValues.type_of_products ===
                                          "local"
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        for="inlineRadio15"
                                      >
                                        local
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="inlineRadio16"
                                        value="foreign"
                                        name="type_of_products"
                                        checked={
                                          inputValues.type_of_products ===
                                          "foreign"
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        for="inlineRadio16"
                                      >
                                        foreign
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="inlineRadio17"
                                        value="other"
                                        name="type_of_products"
                                        checked={
                                          inputValues.type_of_products ===
                                          "other"
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        for="inlineRadio17"
                                      >
                                        other (specify)
                                      </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className=" d-grid gap-2 d-md-flex justify-content-md-center mb-2">
                          <button
                            type="submit"
                            className="btn btn-outline-success upload"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning cancel"
                          >
                            Cancel
                          </button>
                        </div>
                        <SupplierFileUpload isEnable={isSuccess} />
                      </fieldset>
                    </div>
                  </div>
                  <ProductLisitingForm setAllCategory={setAllCategory} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
