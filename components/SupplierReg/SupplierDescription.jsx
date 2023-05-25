import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { http } from "../../services/httpService";
import {
  addSupplier, getCategories, getCategory, getJobs,
  getSupplierRequest,
  updateSupplierRegistration,
} from "../lib/endpoints";
import SupplierFileUpload from "./FileUpload";
import ProductListingFormRearrange from "./ProductListingFormRearrange";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

const SupplierDescription = ({supplierData}) => {
  const router = useRouter();
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const getCookieInfoSupplier = getCookie("supplier");
  console.log({ getCookieInfoSupplier });

  const [clicked, setClicked] = useState(false);
  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState();
  const [selectedOptions2, setSelectedOptions2] = useState();
  const [selectedOptions3, setSelectedOptions3] = useState();
  const [supplierEditedInfo, setSupplierEditedInfo] = useState();

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
    mailing_address: "",
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
  const [allData, setAllData] = useState([]);
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
      (inputValues.company_name?.length == 0 && inputTouched.company_name) ||
      (inputValues.company_name?.length == 0 && !inputTouched.company_name)
    ) {
      setCompanyNameError("Company Name is required.");
    } else {
      setCompanyNameError("");
    }
    if (
      (inputValues.email?.length == 0 && inputTouched.email) ||
      (inputValues.email?.length == 0 && !inputTouched.email)
    ) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }

    if (
      (inputValues.phone?.length == 0 && inputTouched.phone) ||
      (inputValues.phone?.length == 0 && !inputTouched.phone)
    ) {
      setMobileError("Phone number is required.");
    } else {
      setMobileError("");
    }
    if (
      (inputValues.address?.length == 0 && inputTouched.address) ||
      (inputValues.address?.length == 0 && !inputTouched.address)
    ) {
      setAddressError("Address is required.");
    } else {
      setAddressError("");
    }
    if (
      (inputValues.tin_no?.length == 0 && inputTouched.tin_no) ||
      (inputValues.tin_no?.length == 0 && !inputTouched.tin_no)
    ) {
      setBusinessTinError("Tin number is required.");
    } else {
      setBusinessTinError("");
    }
    if (
      (inputValuesKeyContactPerson?.department1.length == 0 &&
        inputTouched.department1) ||
      (inputValuesKeyContactPerson?.department1.length == 0 &&
        !inputTouched.department1)
    ) {
      setKeyContactManagementNameError("feild is required");
    } else {
      setKeyContactManagementNameError("");
    }
    if (
      (inputValuesKeyContactPerson?.designation1.length == 0 &&
        inputTouched.designation1) ||
      (inputValuesKeyContactPerson?.designation1.length == 0 &&
        !inputTouched.designation1)
    ) {
      setKeyContactManagementDesignationError("designation feild is required");
    } else {
      setKeyContactManagementDesignationError("");
    }
    if (
      (inputValuesKeyContactPerson?.phone1.length == 0 &&
        inputTouched.phone1) ||
      (inputValuesKeyContactPerson?.phone1.length == 0 && !inputTouched.phone1)
    ) {
      setKeyContactManagementCellError("feild is required");
    } else {
      setKeyContactManagementCellError("");
    }
    if (
      (inputValuesKeyContactPerson?.email1.length == 0 &&
        inputTouched.email1) ||
      (inputValuesKeyContactPerson?.email1.length == 0 && !inputTouched.email1)
    ) {
      setKeyContactManagementEmailError("feild is required");
    } else {
      setKeyContactManagementEmailError("");
    }
    if (
      (inputValuesKeyContactPerson?.department4.length == 0 &&
        inputTouched.department4) ||
      (inputValuesKeyContactPerson?.department4.length == 0 &&
        !inputTouched.department4)
    ) {
      setKeyContactRegularNameError("feild is required.");
    } else {
      setKeyContactRegularNameError("");
    }
    if (
      (inputValuesKeyContactPerson?.designation4.length == 0 &&
        inputTouched.designation4) ||
      (inputValuesKeyContactPerson?.designation4.length == 0 &&
        !inputTouched.designation4)
    ) {
      setKeyContactRegularDesignationError("feild is required.");
    } else {
      setKeyContactRegularDesignationError("");
    }
    if (
      (inputValuesKeyContactPerson?.phone4.length == 0 &&
        inputTouched.phone4) ||
      (inputValuesKeyContactPerson?.phone4.length == 0 && !inputTouched.phone4)
    ) {
      setKeyContactRegularCellError("feild is required.");
    } else {
      setKeyContactRegularCellError("");
    }
    if (
      (inputValuesKeyContactPerson?.email4.length == 0 &&
        inputTouched.email4) ||
      (inputValuesKeyContactPerson?.email4.length == 0 && !inputTouched.email4)
    ) {
      setKeyContactRegularEmailError("feild is required.");
    } else {
      setKeyContactRegularEmailError("");
    }
    if (
      inputValuesExperience?.organization1.length == 0 ||
      inputValuesExperience?.number_of_sku1.length == 0 ||
      inputValuesExperience?.monthly_sale_turnover1.length == 0
    ) {
      setExperienceError("feild is required.");
    } else {
      setExperienceError("");
    }
  }
  function saveOnlineApplication(data) {
    console.log("hola2", { data });
    http.post({
      url: addSupplier,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        if (res.supplier_id) {
          setCookie("supplier", res.supplier_id, {
            maxAge: new Date().setFullYear(new Date().getFullYear() + 1),
          });
          toast.success("Supplier Added Successfully.");
          getSupplierEditInfo();
        }

        console.log("form", res);
        ClearData();
        setIsLoading(false);
      },
      failed: () => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  const UpdateOnlineApplication = (data) => {
    http.post({
      url: updateSupplierRegistration,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        console.log("form", res);
        ClearData();
        setIsLoading(false);
        getSupplierEditInfo();
        toast.success("Supplier Update Successfully.");
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  };
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

    // let products = JSON.parse(localStorage.getItem("supProducts"));
    // if (products == null) {
    //   setMessage("Please ensert at list 1 product.");
    //   console.log("Please ensert at list 1 product.");
    //   return;
    // }

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
    // inputValues.products = [];
    inputValues.experiences = experience;
    inputValues.type_of_merchandise_provider = merchandiseProvider;
    console.log("val", inputValues);
    //
    saveOnlineApplication(inputValues);

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
  }
  const handleUpdateInfo = () => {
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

    // let products = JSON.parse(localStorage.getItem("supProducts"));
    // if (products == null) {
    //   setMessage("Please ensert at list 1 product.");
    //   console.log("Please ensert at list 1 product.");
    //   return;
    // }

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
    // inputValues.products = [];
    inputValues.experiences = experience;
    inputValues.type_of_merchandise_provider = merchandiseProvider;
    console.log("val", inputValues);
    //
    UpdateOnlineApplication(inputValues);

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
  };
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
    // setInputValue1({
    //   name: "",
    //   address: "",
    //   tel: "",
    //   email: "",
    //   fax: "",
    //   contact: {
    //     designation: "",
    //     phone: "",
    //     email: "",
    //   },
    // });
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
  const getSupplierEditInfo = useCallback(() => {
    http.get({
      url: getSupplierRequest,
      before: () => {},
      successed: (res) => {
        //alert(JSON.stringify(res));
        console.log(res,'tott');
        // if (res.success) {
       if(res.success != false) {
         setSupplierEditedInfo(res);
       }
        // }
        console.log(res, "hola");
      },
      failed: () => {},
    });
  }, []);

  useEffect(() => {
    if (supplierEditedInfo != undefined) {
      setInputValue({
        email: supplierEditedInfo?.email,
        phone: supplierEditedInfo?.phone,
        company_name: supplierEditedInfo?.company_name,
        parent_company_name: supplierEditedInfo?.parent_company_name,
        web_address: supplierEditedInfo?.web_address,
        trade_license: supplierEditedInfo?.trade_license,
        address: supplierEditedInfo?.address,
        business_type: supplierEditedInfo?.business_type,
        nature_of_business: supplierEditedInfo?.nature_of_business,
        number_of_employes: supplierEditedInfo?.number_of_employes,
        vat_no: supplierEditedInfo?.vat_no,
        incorporation_no: supplierEditedInfo?.incorporation_no,
        is_ISO_certified:
          supplierEditedInfo?.is_ISO_certified == 1 ? true : false,
        is_quality_standard:
          supplierEditedInfo?.is_quality_standard == 1 ? true : false,
        tin_no: supplierEditedInfo?.tin_no,
      });

      console.log({ supplierEditedInfo });
      // setInputValue1({
      //   name: "",
      //   address: "",
      //   tel: "",
      //   email: "",
      //   fax: "",
      //   contact: {
      //     designation: "",
      //     phone: "",
      //     email: "",
      //   },
      // });
      // console.log(JSON.parse(supplierEditedInfo?.experiences));
      // var data = JSON.stringify(supplierEditedInfo.experiences);
      // console.log({ data }, "ummmah");
      // console.log(supplierEditedInfo?.experiences.replace(/(^"|"$)/g, ""));
      // console.log(supplierEditedInfo.experiences, "val");

      var data = JSON.parse(supplierEditedInfo?.experiences);
      console.log({ data }, "ohhhh");

      setInputValuesExperience({
        organization1: data[0]?.organization,
        number_of_sku1: data[0]?.number_of_sku,
        monthly_sale_turnover1: data[0]?.monthly_sale_turnover,
        organization2: data[1]?.organization,
        number_of_sku2: data[1]?.number_of_sku,
        monthly_sale_turnover2: data[1]?.monthly_sale_turnover,
        organization3: data[2]?.organization,
        number_of_sku3: data[2]?.number_of_sku,
        monthly_sale_turnover3: data[2]?.monthly_sale_turnover,
        organization4: data[3]?.organization,
        number_of_sku4: data[3]?.number_of_sku,
        monthly_sale_turnover4: data[3]?.monthly_sale_turnover,
      });

      var merchandis_provider = JSON.parse(
        supplierEditedInfo?.type_of_merchandise_provider
      );
      console.log({ data }, "ohhhh");

      setInputValuesMerchandiseProvider({
        category1: merchandis_provider[0]?.category,
        no_of_sku1: merchandis_provider[0]?.no_of_sku,
        market_share1: merchandis_provider[0]?.market_share,
        yearly_promotion1: merchandis_provider[0]?.yearly_promotion,
        target_turnover1: merchandis_provider[0]?.target_turnover,
        avg_gp1: merchandis_provider[0]?.avg_gp,
        remarks1: merchandis_provider[1]?.remarks,
        category2: merchandis_provider[1]?.category,
        no_of_sku2: merchandis_provider[1]?.no_of_sku,
        market_share2: merchandis_provider[1]?.market_share,
        yearly_promotion2: merchandis_provider[1]?.yearly_promotion,
        target_turnover2: merchandis_provider[1]?.target_turnover,
        avg_gp2: merchandis_provider[1]?.avg_gp,
        remarks2: merchandis_provider[1]?.remarks,
        category3: merchandis_provider[2]?.category,
        no_of_sku3: merchandis_provider[2]?.no_of_sku,
        market_share3: merchandis_provider[2]?.market_share,
        yearly_promotion3: merchandis_provider[2]?.yearly_promotion,
        target_turnover3: merchandis_provider[2]?.target_turnover,
        avg_gp3: merchandis_provider[2]?.avg_gp,
        remarks3: merchandis_provider[2]?.remarks,
      });
      var ContactPerson = JSON.parse(supplierEditedInfo?.contacts);

      setInputValuesKeyContactPerson({
        department1: ContactPerson[0]?.department,
        designation1: ContactPerson[0]?.designation,
        phone1: ContactPerson[0]?.phone,
        email1: ContactPerson[0]?.email,
        department2: ContactPerson[1]?.department,
        designation2: ContactPerson[1]?.designation,
        phone2: ContactPerson[1]?.phone,
        email2: ContactPerson[1]?.email,
        department3: ContactPerson[2]?.department,
        designation3: ContactPerson[2]?.designation,
        phone3: ContactPerson[2]?.phone,
        email3: ContactPerson[2]?.email,
        department4: ContactPerson[3]?.department,
        designation4: ContactPerson[3]?.designation,
        phone4: ContactPerson[3]?.phone,
        email4: ContactPerson[3]?.email,
      });
    }
  }, [supplierEditedInfo]);

  useEffect(() => {
    if (!isSuccess) {
      checkValidation();
    }
  }, [
    inputValues,
    inputValuesKeyContactPerson,
    inputValuesExperience,
    inputTouched,
  ]);
  useEffect(() => {
    if (getCookieInfoSupplier) {
      getSupplierEditInfo();
    }
  }, [getCookieInfoSupplier]);

  const GetCategories = (id = 0) => {
    let obj = [];
    http.get({
      url: getCategories + "?parent_id=" + id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
         res &&
        res.length > 0 &&
        res.map((item) => {
          {
            obj.push({ value: item.id, label: item.name });
          }
        });

        // setCategories(categoriesData);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
    return obj;
  };


  useEffect(() => {
    setAllCategory(GetCategories())
  },[])





  return (
    <section class="supplier-description">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="supplier-desc-bg">
             <p>{
               supplierData?.description
             }</p>
              <div class="supplier-tabs-bg">
                <h3>Want to become a Wholesale Club supplier?</h3>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="Supplier-reg-form-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Supplier-reg-form"
                      type="button"
                      role="tab"
                      aria-controls="Supplier-reg-form"
                      aria-selected="true"
                    >
                      supplier registration form
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link "
                      id="list-product-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#list-product-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="list-product-tab-pane"
                      aria-selected="false"
                    >
                      list your product
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="Supplier-reg-form"
                  role="tabpanel"
                  aria-labelledby="Supplier-reg-form-tab"
                  tabindex="0"
                >
                  {/* <!-- login start  --> */}
                  {!ctxAuth.isLoggedIn && (
                    <div class="supplier-login-main">
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">sign in</legend>
                          <div class="new-supplier-qsn">
                            <p>
                              new supplier registration? sign in to see supplier
                              registration form & fill in your information
                            </p>
                            <button
                              onClick={() => {
                                router.push("/auth");
                              }}
                            >
                              Sign in
                            </button>
                          </div>
                          {/* <form action="">
                          <div class="row g-3 align-items-center mt-10">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <label for="" class="col-form-label">
                                email or Phone
                              </label>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                              <input
                                type="text"
                                id=""
                                class="form-control"
                                aria-describedby=""
                                placeholder="Please enter your email or Phone no"
                              />
                            </div>
                          </div>
                          <div class="row g-3 align-items-center mt-10">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <label for="" class="col-form-label">
                                Password
                              </label>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                              <input
                                type="password"
                                id=""
                                class="form-control"
                                aria-describedby=""
                                placeholder="Please enter your password"
                              />
                            </div>
                          </div>
                          <div class="row g-3 align-items-center mt-10">
                            <div class="col-8 offset-4 text-end">
                              <button class="btn supplier-reg-btn w-100">
                                sign in
                              </button>
                            </div>
                          </div>
                          <div class="row g-3 align-items-center mt-10">
                            <div class="col-8 offset-4 text-center">
                              <p>New to WholeSale Club?</p>
                              <button class="btn supplier-crt-btn w-100">
                                create account
                              </button>
                            </div>
                          </div>
                        </form> */}
                        </fieldset>
                      </div>
                    </div>
                  )}
                  {ctxAuth.isLoggedIn && (
                    <>
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">
                            company name & general info
                          </legend>

                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  company name <sup class="text-danger">*</sup>
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="company name"
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
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  parent company (full name)
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="parent company name"
                                  onChange={(e) => handleChange(e)}
                                  name="parent_company_name"
                                  value={inputValues.parent_company_name}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <label for="" class="form-label">
                                address <sup class="text-danger">*</sup>
                              </label>
                              <textarea
                                id=""
                                cols=""
                                rows=""
                                class="form-control"
                                placeholder="address"
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
                                <div style={{ color: "red" }}>
                                  {addressError}
                                </div>
                              )}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <label for="" class="form-label">
                                mailing address (if different)
                              </label>
                              <textarea
                                id=""
                                cols=""
                                rows=""
                                class="form-control"
                                placeholder="mailing address"
                                onChange={(e) => handleChange(e)}
                                name="mailing_address"
                                value={inputValues.mailing_address}
                              ></textarea>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                              <label for="" class="form-label">
                                tel <sup class="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="parent company name"
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
                                <div style={{ color: "red" }}>
                                  {mobileError}
                                </div>
                              )}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                              <label for="" class="form-label">
                                fax{" "}
                              </label>
                              <input
                                type="text"
                                class="form-control "
                                placeholder="fax"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="fax"
                                value={inputValues.fax}
                              />
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                              <label for="" class="form-label">
                                e-mail <sup class="text-danger">*</sup>
                              </label>
                              <input
                                type="email"
                                class="form-control mb-0"
                                placeholder="parent company name"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleTouched(e)}
                                name="email"
                                value={inputValues.email}
                              />
                              {emailError != "" &&
                                !clicked &&
                                inputTouched.email && (
                                  <div style={{ color: "red" }}>
                                    {emailError}
                                  </div>
                                )}
                              {emailError != "" && clicked && (
                                <div style={{ color: "red" }}>{emailError}</div>
                              )}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                              <label for="" class="form-label">
                                web address/URL{" "}
                              </label>
                              <input
                                type="text"
                                class="form-control  mb-0"
                                placeholder="fax"
                                onChange={(e) => handleChange(e)}
                                name="web_address"
                                value={inputValues.web_address}
                              />
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">key contact person</legend>
                          <div class="table-responsive">
                            <table class="table table-bordered key-person mb-0">
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
                                      class="form-select form-control mb-0 d-none"
                                      aria-label="Default select example"
                                    >
                                      <option selected>management</option>
                                      <option value="1">marketing</option>
                                      <option selected>management</option>
                                      <option value="1">marketing</option>
                                    </select>
                                    management <sup class="text-danger">*</sup>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      onBlur={(e) => handleTouchedKeyContact(e)}
                                      name="designation1"
                                      value={
                                        inputValuesKeyContactPerson.designation1
                                      }
                                    />
                                    {keyContactManagementDesignationError !=
                                      "" &&
                                      !clicked &&
                                      inputTouched.designation1 && (
                                        <div style={{ color: "red" }}>
                                          {keyContactManagementDesignationError}
                                        </div>
                                      )}
                                    {keyContactManagementDesignationError !=
                                      "" &&
                                      clicked && (
                                        <div style={{ color: "red" }}>
                                          {keyContactManagementDesignationError}
                                        </div>
                                      )}
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="department2"
                                      value={
                                        inputValuesKeyContactPerson.department2
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="designation2"
                                      value={
                                        inputValuesKeyContactPerson.designation2
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="phone2"
                                      value={inputValuesKeyContactPerson.phone2}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="email"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="department3"
                                      value={
                                        inputValuesKeyContactPerson.department3
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="designation3"
                                      value={
                                        inputValuesKeyContactPerson.designation3
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="phone3"
                                      value={inputValuesKeyContactPerson.phone3}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="email"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
                                      name="email3"
                                      value={inputValuesKeyContactPerson.email3}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    regularly <sup class="text-danger">*</sup>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeKeyContact(e)
                                      }
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
                                  <td colspan="5" class="text-start">
                                    <span class="text-upper ">
                                      if merchandise supplied by distributor
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      distributor name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="name"
                                      value={inputValuesDistributor.name}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      address
                                    </label>
                                    <textarea
                                      id=""
                                      cols=""
                                      rows=""
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="address"
                                      value={inputValuesDistributor.address}
                                    ></textarea>
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      tel
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="tel"
                                      value={inputValuesDistributor.tel}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      fax
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="fax"
                                      value={inputValuesDistributor.fax}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      email
                                    </label>
                                    <input
                                      type="email"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="email"
                                      value={inputValuesDistributor.email}
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      web address /URL
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor(e)
                                      }
                                      name="web_address"
                                      value={inputValuesDistributor.web_address}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      key contact person name
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor1(e)
                                      }
                                      name="name"
                                      value={inputValuesDistributor1.name}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      designation
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor1(e)
                                      }
                                      name="designation"
                                      value={
                                        inputValuesDistributor1.designation
                                      }
                                    />
                                  </td>

                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      cell
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeDistributor1(e)
                                      }
                                      name="phone"
                                      value={inputValuesDistributor1.phone}
                                    />
                                  </td>
                                  <td class="text-start">
                                    <label for="" class="form-label">
                                      e-mail
                                    </label>
                                    <input
                                      type="email"
                                      class="form-control mb-0"
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
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">business details</legend>
                          <div
                            class="form-group mb-3"
                            onChange={(e) => handleChange(e)}
                          >
                            <label for="" class="form-label d-block">
                              type of business
                            </label>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                value="corporate"
                                name="business_type"
                                checked={
                                  inputValues.business_type === "corporate"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox1"
                              >
                                corporate/limited
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                value="partnership"
                                name="business_type"
                                checked={
                                  inputValues.business_type === "partnership"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox2"
                              >
                                partnership
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="other"
                                name="business_type"
                                checked={inputValues.business_type === "other"}
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox3"
                              >
                                other (specify)
                              </label>
                            </div>
                          </div>
                          <div
                            class="form-group"
                            onChange={(e) => handleChange(e)}
                          >
                            <label for="" class="form-label d-block">
                              nature of business
                            </label>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                value="manufacturer"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business ===
                                  "manufacturer"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox1"
                              >
                                manufacturer
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                value="distributor"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business ===
                                  "distributor"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox2"
                              >
                                distributor
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="trader"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business === "trader"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox3"
                              >
                                trader
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="importer"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business === "importer"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox3"
                              >
                                importer
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="whole_saller"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business ===
                                  "whole_saller"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox3"
                              >
                                whole seller
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="other"
                                name="nature_of_business"
                                checked={
                                  inputValues.nature_of_business === "other"
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox3"
                              >
                                other (specify)
                              </label>
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  year established/incorporation
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="incorporation_no"
                                  value={inputValues.incorporation_no}
                                />
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  annual turnover
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="annual_turnover"
                                  value={inputValues.annual_turnover}
                                />
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  number of full-time employees
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="number_of_employes"
                                  value={inputValues.number_of_employes}
                                />
                              </div>
                            </div>
                            {/* </div> */}
                            {/* <div class="row mt-3"> */}
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  license no,: country where registerd
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="trade_license"
                                  value={inputValues.trade_license}
                                />
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  VAT no
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="vat_no"
                                  value={inputValues.vat_no}
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
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  TIN/TaxID <sup class="text-danger">*</sup>
                                </label>
                                <input
                                  type="text"
                                  class="form-control mb-0"
                                  onChange={(e) => handleChange(e)}
                                  onBlur={(e) => handleTouched(e)}
                                  name="tin_no"
                                  value={inputValues.tin_no}
                                />
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              <div class="form-group">
                                <label for="" class="form-label">
                                  incorporation No
                                </label>
                                <input
                                  type="text"
                                  class="form-control mb-0"
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
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">
                            technical capability & information on goods/services
                            offered
                          </legend>
                          <div
                            class="form-group mb-3"
                            onChange={(e) => handleChangeRdo(e)}
                          >
                            <label for="" class="form-label d-block">
                              for good's only, do those offered for supply
                              conform to national/international quality
                              standard?
                            </label>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                value={true}
                                name="is_quality_standard"
                                checked={
                                  inputValues.is_quality_standard === true
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox1"
                              >
                                yes
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                value={false}
                                name="is_quality_standard"
                                checked={
                                  inputValues.is_quality_standard === false
                                }
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox2"
                              >
                                no
                              </label>
                            </div>
                          </div>
                          <div
                            class="form-group mb-3"
                            onChange={(e) => handleChangeRdo(e)}
                          >
                            <label for="" class="form-label d-block">
                              quality assurance certification ( e.g. ISO 9000 or
                              quivalent)?
                            </label>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                value={true}
                                name="is_ISO_certified"
                                checked={inputValues.is_ISO_certified === true}
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox1"
                              >
                                yes
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                value={false}
                                name="is_ISO_certified"
                                checked={inputValues.is_ISO_certified === false}
                              />
                              <label
                                class="form-check-label"
                                for="inlineCheckbox2"
                              >
                                no
                              </label>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="" class="form-label">
                              other certifications (if applicable)
                            </label>
                            <input
                              type="text"
                              class="form-control mb-0"
                              onChange={(e) => handleChange(e)}
                              name="other_certifications"
                              value={inputValues.other_certifications}
                            />
                          </div>
                        </fieldset>
                      </div>
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">experiance</legend>

                          <div class="table-responsive">
                            <table class="table table-bordered key-person">
                              <thead>
                                <tr>
                                  <th scope="col">sl no</th>
                                  <th scope="col">
                                    organization <br></br>
                                    (1 st priority modern trade)
                                  </th>
                                  <th scope="col">number of SKU</th>

                                  <th scope="col">monthly sales turnover</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    1 <sup class="text-danger">*</sup>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      // onBlur={(e) => handleTouched(e)}
                                      name="organization1"
                                      value={
                                        inputValuesExperience.organization1
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      // onBlur={(e) => handleTouched(e)}
                                      name="number_of_sku1"
                                      value={
                                        inputValuesExperience.number_of_sku1
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="designation2"
                                      value={inputValuesExperience.designation2}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="number_of_sku2"
                                      value={
                                        inputValuesExperience.number_of_sku2
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="designation3"
                                      value={inputValuesExperience.designation3}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="number_of_sku3"
                                      value={
                                        inputValuesExperience.number_of_sku3
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="designation4"
                                      value={inputValuesExperience.designation4}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
                                      name="number_of_sku4"
                                      value={
                                        inputValuesExperience.number_of_sku4
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeExperience(e)
                                      }
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

                          <div class="table-responsive">
                            <table class="table table-bordered key-person">
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
                                      placeholder={
                                        (allCategory.length > 0 &&
                                            allCategory.find(
                                            (itemObj) =>
                                              itemObj.value ==
                                              parseInt(
                                                inputValuesMerchandiseProvider.category1
                                              )
                                          )?.label) ||
                                        "Select Category"
                                      }
                                      value={selectedOptions1}
                                      onChange={(e) => handleChange1(e)}
                                      isSearchable={true}
                                    />
                                    {/* <select
                                      class="form-select form-select-sm form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      placeholder={
                                        (allCategory.length > 0 &&
                                            allCategory.find(
                                            (itemObj) =>
                                              itemObj.value ==
                                              parseInt(
                                                inputValuesMerchandiseProvider.category2
                                              )
                                          )?.label) ||
                                        "Select Category"
                                      }
                                      value={selectedOptions2}
                                      onChange={(e) => handleChange2(e)}
                                      isSearchable={true}
                                    />
                                    {/* <select
                                      class="form-select form-select-sm form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      placeholder={
                                        (allCategory.length > 0 &&
                                            allCategory.find(
                                            (itemObj) =>
                                              itemObj.value ==
                                              parseInt(
                                                inputValuesMerchandiseProvider.category3
                                              )
                                          )?.label) ||
                                        "Select Category"
                                      }
                                      value={selectedOptions3}
                                      onChange={(e) => handleChange3(e)}
                                      isSearchable={true}
                                    />
                                    {/* <select
                                      class="form-select form-select-sm form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
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
                                      onChange={(e) =>
                                        handleChangeMerchandiseProvider(e)
                                      }
                                      name="yearly_promotion3"
                                      value={
                                        inputValuesMerchandiseProvider.yearly_promotion3
                                      }
                                      class="form-control mb-0"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
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
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeMerchandiseProvider(e)
                                      }
                                      name="avg_gp3"
                                      value={
                                        inputValuesMerchandiseProvider.avg_gp3
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control mb-0"
                                      onChange={(e) =>
                                        handleChangeMerchandiseProvider(e)
                                      }
                                      name="remarks3"
                                      value={
                                        inputValuesMerchandiseProvider.remarks3
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="7" class="text-start">
                                    <div
                                      class="form-group mb-0"
                                      onChange={(e) => handleChange(e)}
                                    >
                                      <label for="" class="form-label d-block">
                                        {" "}
                                        type of products
                                      </label>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox1"
                                          value="local"
                                          name="type_of_products"
                                          checked={
                                            inputValues.type_of_products ===
                                            "local"
                                          }
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox1"
                                        >
                                          local
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox2"
                                          value="foreign"
                                          name="type_of_products"
                                          checked={
                                            inputValues.type_of_products ===
                                            "foreign"
                                          }
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox2"
                                        >
                                          foreign
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox2"
                                          value="other"
                                          name="type_of_products"
                                          checked={
                                            inputValues.type_of_products ===
                                            "other"
                                          }
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox2"
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

                          {getCookieInfoSupplier && (
                            <SupplierFileUpload isEnable={isSuccess} />
                          )}
                        </fieldset>
                      </div>

                      {getCookieInfoSupplier ? (
                        <button
                          className="btn update-reg-btn"
                          onClick={handleUpdateInfo}
                        >
                          Update Registration
                        </button>
                      ) : (
                        <button
                          className="btn submit-btn m-0"
                          onClick={handleSubmit}
                        >
                          Submit Registration
                        </button>
                      )}
                    </>
                  )}

                  {/* <!-- login close  --> */}
                </div>
                <div
                  class="tab-pane fade "
                  id="list-product-tab-pane"
                  role="tabpanel"
                  aria-labelledby="list-product-tab"
                  tabindex="0"
                >
                  {/* <!-- login start  --> */}
                  {!ctxAuth.isLoggedIn && (
                    <div class="supplier-login-main">
                      <div class="common-fieldset-main">
                        <fieldset class="common-fieldset">
                          <legend class="rounded">sign in</legend>
                          <div class="new-supplier-qsn">
                            <p>
                              new supplier registration? sign in to see supplier
                              registration form & fill in your information
                            </p>
                            <button
                              onClick={() => {
                                router.push("/auth");
                              }}
                            >
                              Sign in
                            </button>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  )}

                  {/* <!-- login close  --> */}
                  {ctxAuth.isLoggedIn &&  (ctxAuth?.user?.user?.supplier_id?.id || getCookie('supplier'))  ?
                    <ProductListingFormRearrange
                      // setAllCategory={setAllCategory}
                      // setAllData={setAllData}
                    /> : <h4 className={'text-center my-5'}> Be a supplier first to add your product</h4>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button>Final Submit</button> */}
    </section>
  );
};

export default SupplierDescription;
