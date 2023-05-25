import React, {useRef} from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import { http } from "../../services/httpService";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  addSupplierProductImg,
  getCategories,
  getCountryList,
  getUomList,
  postProductSupplier,
  postSupplierProImage,
} from "../lib/endpoints";
import { toast } from "react-toastify";

const ProductListingFormRearrange = () => {
  const imgRef  = useRef()
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubcategories, setSubSubCategories] = useState([]);
  const [uOMs, setUOMs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const getCookieInfoSupplier = getCookie("supplier");

  //for react select
  const [selectedOptions1, setSelectedOptions1] = useState();
  const [selectedOptions2, setSelectedOptions2] = useState();
  const [selectedOptions3, setSelectedOptions3] = useState();
  const [selectedUomPotions, setSelectedUomPotions] = useState();
  const [selectedCountryPotions, setSelectedCountryPotions] = useState();

  const [isSubmitForm, setIsSubmitForm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [productNameError, setProductNameError] = useState("");
  const [brandNameError, setBrandNameError] = useState("");
  const [mRPError, setMRPError] = useState("");
  const [costError, setCostError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [subSubCategoryError, setSubSubCategoryError] = useState("");
  const [uomError, setUomError] = useState("");
  const [barcodeError, setBarcodeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [specificationError, setSpecificationError] = useState("");
  const [originError, setOriginError] = useState("");
  const [cartonSizeError, setCartonSizeError] = useState("");
  const [additionalInfoError, setAdditionalInfoError] = useState("");
  const [resumeError, setResumeError] = useState("");
  let productList = [];

  //initialize
  const [inputValues, setInputValue] = useState({
    product_name: "",
    brand_name: "",
    MRP: "",
    cost: "",
    category: "",
    sub_category: "",
    sub_sub_category: "",
    unit_of_measurement: "",
    barcode: "",
    weight: "",
    details: "",
    specification: "",
    image: "",
    origin: "",
    carton_size: "",
    additional_info: "",
  });
  const [inputTouched, setInputTouched] = useState({
    product_name: "",
    brand_name: "",
    MRP: "",
    cost: "",
    category: "",
    sub_category: "",
    sub_sub_category: "",
    unit_of_measurement: "",
    barcode: "",
    weight: "",
    details: "",
    specification: "",
    image: "",
    origin: "",
    carton_size: "",
    additional_info: "",
  });
  function saveOnlineImage(data) {
    http.file({
      url: addSupplierProductImg,
      payload: data,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setInputValue({
          ...inputValues,
          ["image"]: res.upload_image_id.toString(),
        });

        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }
  console.log({ getCookieInfoSupplier });
  const postProductRequest = () => {
    if (getCookieInfoSupplier) {
      http.post({
        url: postProductSupplier + parseInt(getCookieInfoSupplier),
        payload: {
          products: allProducts,
        },
        before: () => {},
        successed: (res) => {
          localStorage.removeItem("supProducts");
          setAllProducts([]);
          toast.success("Product Submit Success");
        },
        failed: () => {
          toast.error("Something Went Wrong.");
        },
      });
    } else {
      toast.error(" Registration as a Supplier.");
    }
  };
  const changeFileHandler = (event) => {
    if (event.target.files.length > 0) {
      saveOnlineImage({ image: event.target.files[0] });
    }
  };
  const validateSelectedFile = () => {
    const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB
    setTimeout(() => {
      if (inputValues.image.length == 0) {
        setResumeError("Please choose a file");
        setIsSuccess(false);
        return;
      }
    }, 1000);

    // const fileSizeKiloBytes = inputValues.file_name.size / 1024

    // if(fileSizeKiloBytes < MIN_FILE_SIZE){
    //   setResumeError("File size is less than minimum limit");
    //   setIsSuccess(false)
    //   return
    // }
    // if(fileSizeKiloBytes > MAX_FILE_SIZE){
    //   setResumeError("File size is greater than maximum limit");
    //   setIsSuccess(false)
    //   return
    // }

    setResumeError("");
  };
  //event
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  function handleTouched(event) {
    const { name, value } = event.target;
    setInputTouched({ ...inputTouched, [name]: true });
  }

  function handleChange1(data) {
    setInputValue({ ...inputValues, ["category"]: data.value });
    setSubCategories(GetCategories(data.value));
  }
  function handleChange2(data) {
    setInputValue({ ...inputValues, ["sub_category"]: data.value });
    setSubSubCategories(GetCategories(data.value));
  }
  function handleChange3(data) {
    setInputValue({ ...inputValues, ["sub_sub_category"]: data.value });
  }
  function handleChange4(data) {
    setInputValue({ ...inputValues, ["unit_of_measurement"]: data.value });
  }
  function handleChange5(data) {
    setInputValue({ ...inputValues, ["origin"]: data.value });
  }

  function checkValidation() {
    let validatePass  = true
    if (
      (inputValues.product_name.length == 0 && inputTouched.product_name) ||
      (inputValues.product_name.length == 0 && !inputTouched.product_name)
    ) {
      setProductNameError("Product name is required.");
      validatePass = false;
    } else {
      setProductNameError("");
    }
    if (
      (inputValues.brand_name.length == 0 && inputTouched.brand_name) ||
      (inputValues.brand_name.length == 0 && !inputTouched.brand_name)
    ) {
      setBrandNameError("Brand name is required.");
      validatePass = false;

    } else {
      setBrandNameError("");
    }
    if (
      (inputValues.MRP.length == 0 && inputTouched.MRP) ||
      (inputValues.MRP.length == 0 && !inputTouched.MRP)
    ) {
      setMRPError("Product Mrp must be gatter then zero.");
        validatePass = false;

    } else {
      setMRPError("");
    }
    if (
      (inputValues.cost.length == 0 && inputTouched.cost) ||
      (inputValues.cost.length == 0 && !inputTouched.cost)
    ) {
      setCostError("Product cost is required.");
      validatePass = false;

    } else {
      setCostError("");
    }
    // if (
    //   (inputValues.category.length == 0 && inputTouched.category) ||
    //   (inputValues.category.length == 0 && !inputTouched.category)
    // ) {
    //   setCategoryError("Category is required.");
    // } else {
    //   setCategoryError("");
    // }
    // if (
    //   (inputValues.sub_category.length == 0 &&
    //     inputTouched.sub_category &&
    //     subCategories.length > 0) ||
    //   (inputValues.sub_category.length == 0 &&
    //     !inputTouched.sub_category &&
    //     subCategories.length > 0)
    // ) {
    //   setSubCategoryError("Sub category is required.");
    // } else {
    //   setSubCategoryError("");
    // }
    // if (
    //   (inputValues.sub_sub_category.length == 0 &&
    //     inputTouched.sub_sub_category &&
    //     subSubcategories.length > 0) ||
    //   (inputValues.sub_sub_category.length == 0 &&
    //     !inputTouched.sub_sub_category &&
    //     subSubcategories.length > 0)
    // ) {
    //   setSubSubCategoryError("Sub sub category is required.");
    // } else {
    //   setSubSubCategoryError("");
    // }
    if (
      (inputValues.unit_of_measurement.length == 0 &&
        inputTouched.unit_of_measurement) ||
      (inputValues.unit_of_measurement.length == 0 &&
        !inputTouched.unit_of_measurement)
    ) {
      setUomError("Uom type is required.");
      validatePass = false;

    } else {
      setUomError("");
    }
    // if (
    //   (inputValues.barcode.length == 0 && inputTouched.barcode) ||
    //   (inputValues.barcode.length == 0 && !inputTouched.barcode)
    // ) {
    //   setBarcodeError("Barcode is required.");
    // } else {
    //   setBarcodeError("");
    // }

    // if (
    //   (inputValues.details.length == 0 && inputTouched.details) ||
    //   (inputValues.details.length == 0 && !inputTouched.details)
    // ) {
    //   setDetailsError("Product description type is required.");
    // } else {
    //   setDetailsError("");
    // }
    // if (
    //   (inputValues.specification.length == 0 && inputTouched.specification) ||
    //   (inputValues.specification.length == 0 && !inputTouched.specification)
    // ) {
    //   setSpecificationError("Product specification is required.");
    // } else {
    //   setSpecificationError("");
    // }
    if (
      (inputValues.origin.length == 0 && inputTouched.origin) ||
      (inputValues.origin.length == 0 && !inputTouched.origin)
    ) {
      setOriginError("Country origin is required.");
      validatePass = false;

    } else {
      setOriginError("");
    }
    if (
      (inputValues.carton_size.length == 0 && inputTouched.carton_size) ||
      (inputValues.carton_size.length == 0 && !inputTouched.carton_size)
    ) {
      setCartonSizeError("Carton size is required.");
      validatePass = false;

    } else {
      setCartonSizeError("");
    }
    // if (
    //   (inputValues.additional_info.length == 0 &&
    //     inputTouched.additional_info) ||
    //   (inputValues.additional_info.length == 0 && !inputTouched.additional_info)
    // ) {
    //   setAdditionalInfoError("Additional info is required.");
    // } else {
    //   setAdditionalInfoError("");
    // }
    //file error
    validateSelectedFile();
    return validatePass
  }

  function handleSubmit1(e) {
    e.preventDefault();
    setClicked(true);
    if(checkValidation() == false) {
      return ;
    }
    // if (
    //   productNameError != "" ||
    //   brandNameError != "" ||
    //   mRPError != "" ||
    //   costError != "" ||
    //   categoryError != "" ||
    //   subCategoryError != "" ||
    //   subSubCategoryError != "" ||
    //   uomError != "" ||
    //   barcodeError != "" ||
    //   weightError != "" ||
    //   detailsError != "" ||
    //   specificationError != "" ||
    //   originError != "" ||
    //   cartonSizeError != "" ||
    //   additionalInfoError != "" ||
    //   resumeError != ""
    // ) {
    //   alert('asdfasf')
    //   setIsSuccess(false);
    //   return;
    // }

    let list = [];
    list = JSON.parse(localStorage.getItem("supProducts"));
    list = list == null ? [] : list;
    list.push(inputValues);
    console.log(list,'yoo')
    setAllProducts(list);
    localStorage.setItem("supProducts", JSON.stringify(list));
    // setIsSubmitForm(true);
    setIsSuccess(true);
    setClicked(false);
    clearData(e);

    setTimeout(() => {
      setIsSuccess(false);
      setSelectedUomPotions('Select UOM')
      setSelectedCountryPotions('Select Countries')
      setSelectedOptions1('Select Category')
      setSelectedOptions2('Select  Sub-Category')
      setSelectedOptions3('Select  Sub-Sub-Category')
      imgRef.current.value = null
    }, 1000);
  }
  function clearData(e) {
    e && e.preventDefault();
    setInputTouched({
      product_name: false,
      brand_name: false,
      MRP: false,
      cost: false,
      category: false,
      sub_category: false,
      sub_sub_category: false,
      unit_of_measurement: false,
      barcode: false,
      weight: false,
      details: false,
      specification: false,
      image: false,
      origin: false,
      carton_size: false,
      additional_info: false,
    });
    setInputValue({
      product_name: "",
      brand_name: "",
      MRP: "",
      cost: "",
      category: "",
      sub_category: "",
      sub_sub_category: "",
      unit_of_measurement: "",
      barcode: "",
      weight: "",
      details: "",
      specification: "",
      image: "",
      origin: "",
      carton_size: "",
      additional_info: "",
    });
    // setCategories("");
    // setSubCategories("");
    // setSubSubCategories("");
    // setSelectedOptions1("");
    // setSelectedOptions2("");
    // setSelectedOptions3("");
    // setInputValue({ ...inputValues, ["product_name"]: "" });
    // setInputValue({ ...inputValues, ["brand_name"]: "" });
    // setInputValue({ ...inputValues, ["MRP"]: "" });
    // setInputValue({ ...inputValues, ["cost"]: "" });
    // setInputValue({ ...inputValues, ["category"]: "" });
    // setInputValue({ ...inputValues, ["sub_category"]: "" });
    // setInputValue({ ...inputValues, ["sub_sub_category"]: "" });
    // setInputValue({ ...inputValues, ["unit_of_measurement"]: "" });
    // setInputValue({ ...inputValues, ["barcode"]: "" });
    // setInputValue({ ...inputValues, ["weight"]: "" });
    // setInputValue({ ...inputValues, ["details"]: "" });
    // setInputValue({ ...inputValues, ["specification"]: "" });
    // setInputValue({ ...inputValues, ["image"]: "" });
    // setInputValue({ ...inputValues, ["origin"]: "" });
    // setInputValue({ ...inputValues, ["carton_size"]: "" });
    // setInputValue({ ...inputValues, ["additional_info"]: "" });
  }
  //getCategoryData
  const GetCategories = useCallback((id = 0) => {
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
  }, []);
  const GetUomList = useCallback(() => {
    let obj = [];
    http.get({
      url: getUomList,
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
        setUOMs(obj);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);
  const GetCountryList = useCallback(() => {
    let obj = [];
    http.get({
      url: getCountryList,
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
        console.log("res", obj);
        setCountries(obj);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);
  useEffect(() => {
    // if (!isSuccess) {
    //   checkValidation();
    // }
  }, [inputValues, inputTouched]);
  useEffect(() => {
    setCategories(GetCategories());
    // setAllCategory(GetCategories());
    GetCountryList();
    GetUomList();
    const localProducts = JSON.parse(localStorage.getItem("supProducts"));
    productList = localProducts;
    if (localProducts != undefined) {
      setAllProducts(productList);
    }
  }, []);
  useEffect((id = 0) => {
    // http.get({
    //   url: getCategories + "?parent_id=" + id,
    //   before: () => {
    //     setIsLoading(true);
    //   },
    //   successed: (res) => {
    //     setAllData(res);
    //     // setCategories(categoriesData);
    //     setIsLoading(false);
    //   },
    //   failed: () => {
    //     setIsLoading(false);
    //     setIsVisibleError(true);
    //   },
    // });
  }, []);

  return (
    <>
      <div class="common-fieldset-main">
        <fieldset class="common-fieldset">
          <legend class="rounded">Product Listing Form</legend>
          <div class="table-responsive ">
            <table class="table table-bordered key-person mb-0">
              <tbody>
                <tr>
                  <td class="text-start px-5">Company Name</td>
                  <td>Wholsesale Club Ltd</td>
                  <td class="text-start px-5">Company Code</td>
                  <td>002235</td>
                  <td class="text-start px-5">Company Logo</td>
                  <td>
                    <img
                      src="/assets/images/logo.png"
                      alt=""
                      class="company-logo"
                    />
                  </td>
                </tr>

                <tr>
                  <td class="text-start px-5">
                    Product Name <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="product_name"
                      value={inputValues.product_name}
                    />
                    {productNameError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.product_name && (
                        <div style={{ color: "red" }}>{productNameError}</div>
                      )}
                    {productNameError != "" && clicked && (
                      <div style={{ color: "red" }}>{productNameError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Brand Name <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="brand_name"
                      value={inputValues.brand_name}
                    />
                    {brandNameError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.brand_name && (
                        <div style={{ color: "red" }}>{brandNameError}</div>
                      )}
                    {brandNameError != "" && clicked && (
                      <div style={{ color: "red" }}>{brandNameError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Product MRP <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="MRP"
                      value={inputValues.MRP}
                    />
                    {mRPError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.MRP && (
                        <div style={{ color: "red" }}>{mRPError}</div>
                      )}
                    {mRPError != "" && clicked && (
                      <div style={{ color: "red" }}>{mRPError}</div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td class="text-start px-5">
                    Product Cost <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="cost"
                      value={inputValues.cost}
                    />
                    {costError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.cost && (
                        <div style={{ color: "red" }}>{costError}</div>
                      )}
                    {costError != "" && clicked && (
                      <div style={{ color: "red" }}>{costError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Category<sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <ReactSelect
                      options={categories}
                      placeholder="Select Category"
                      value={selectedOptions1}
                      onChange={(e) => handleChange1(e)}
                      isSearchable={true}
                    />
                    {categoryError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.category && (
                        <div style={{ color: "red" }}>{categoryError}</div>
                      )}
                    {categoryError != "" && clicked && (
                      <div style={{ color: "red" }}>{categoryError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Sub-Category<sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <ReactSelect
                      options={subCategories}
                      placeholder="Select Sub-Category"
                      value={selectedOptions2}
                      onChange={(e) => handleChange2(e)}
                      isSearchable={true}
                    />
                    {subCategoryError != "" && clicked && (
                      <div style={{ color: "red" }}>{subCategoryError}</div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td class="text-start px-5">
                    Sub-Sub-Category
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    {/* <select
                    class="form-select form-select-sm form-control mb-0"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select> */}
                    <ReactSelect
                      options={subSubcategories}
                      placeholder="Select Sub-Sub-Category"
                      value={selectedOptions3}
                      onChange={(e) => handleChange3(e)}
                      isSearchable={true}
                    />
                    {subSubCategoryError != "" && clicked && (
                      <div style={{ color: "red" }}>{subSubCategoryError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Unit of Measurement
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <ReactSelect
                      options={uOMs}
                      placeholder="Select UOM"
                      value={selectedUomPotions}
                      onChange={(e) => handleChange4(e)}
                      isSearchable={false}
                    />
                    {uomError != "" && clicked && (
                      <div style={{ color: "red" }}>{uomError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Country of Origin
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <ReactSelect
                      options={countries}
                      placeholder="Select Countries"
                      value={selectedCountryPotions}
                      onChange={(e) => handleChange5(e)}
                      isSearchable={true}
                    />
                    {originError != "" && clicked && (
                      <div style={{ color: "red" }}>{originError}</div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td class="text-start px-5">
                    Body Barcode<sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="barcode"
                      value={inputValues.barcode}
                    />
                    {barcodeError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.barcode && (
                        <div style={{ color: "red" }}>{barcodeError}</div>
                      )}
                    {barcodeError != "" && clicked && (
                      <div style={{ color: "red" }}>{barcodeError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Carton Size<sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="carton_size"
                      value={inputValues.carton_size}
                    />
                    {cartonSizeError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.carton_size && (
                        <div style={{ color: "red" }}>{cartonSizeError}</div>
                      )}
                    {cartonSizeError != "" && clicked && (
                      <div style={{ color: "red" }}>{cartonSizeError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Product Details Description
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="details"
                      value={inputValues.details}
                    />
                    {detailsError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.details && (
                        <div style={{ color: "red" }}>{detailsError}</div>
                      )}
                    {detailsError != "" && clicked && (
                      <div style={{ color: "red" }}>{detailsError}</div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td class="text-start px-5">
                    Product Specification
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="specification"
                      value={inputValues.specification}
                    />
                    {specificationError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.specification && (
                        <div style={{ color: "red" }}>{specificationError}</div>
                      )}
                    {specificationError != "" && clicked && (
                      <div style={{ color: "red" }}>{specificationError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Product Additional Information
                    <sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control mb-0"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="additional_info"
                      value={inputValues.additional_info}
                    />
                    {additionalInfoError != "" &&
                      !clicked &&
                      !isSubmitForm &&
                      inputTouched.additional_info && (
                        <div style={{ color: "red" }}>
                          {additionalInfoError}
                        </div>
                      )}
                    {additionalInfoError != "" && clicked && (
                      <div style={{ color: "red" }}>{additionalInfoError}</div>
                    )}
                  </td>
                  <td class="text-start px-5">
                    Image Upload<sup class="text-danger">*</sup>
                  </td>
                  <td>
                    <input
                      type="file"
                      class="form-control mb-0"
                      ref={imgRef}
                      onChange={(e) => changeFileHandler(e)}
                      onBlur={(e) => handleTouched(e)}
                      name="image"
                    />
                    {resumeError != "" && clicked && (
                      <div style={{ color: "red" }}>{resumeError}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-100 text-end">
            <button class="btn submit-btn" onClick={handleSubmit1}>
              Add Product
            </button>
          </div>
        </fieldset>
      </div>

      {allProducts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered key-person">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Product Name</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Product MRP</th>
                <th scope="col">Product Specification</th>
                <th scope="col">Product Additional Information</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.brand_name}</td>
                    <td className="text-success">{item.MRP}</td>
                    <td>{item.specification}</td>
                    <td>{item.additional_info}</td>
                  </tr>
                );
              })}
              {/* <tr>
              <td>1</td>
              <td>Trade Licence</td>
              <td>PDF</td>
              <td className="text-success">Success</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr>
            <tr>
              <td>2</td>
              <td>VAT Certification</td>
              <td>PDF</td>
              <td className="text-warning">Pending</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Trade Licence</td>
              <td>PDF</td>
              <td className="text-danger">Failed</td>
              <td>
                <a href="#">Download</a>
              </td>
              <td>Comment</td>
            </tr> */}
            </tbody>
          </table>
        </div>
      )}
      {allProducts.length > 0 && (
        <button  class="btn submit-btn"  onClick={postProductRequest}>Post Product </button>
      )}
    </>
  );
};

export default ProductListingFormRearrange;
