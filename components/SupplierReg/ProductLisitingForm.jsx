import React, { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";
import { http } from "../../services/httpService";
import {
  addSupplier,
  addSupplierProductImg,
  getCategories,
  getCountryList,
  getDepartments,
  getUomList,
} from "../lib/endpoints";

function ProductLisitingForm({ setAllCategory }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubcategories, setSubSubCategories] = useState([]);
  const [uOMs, setUOMs] = useState([]);
  const [countries, setCountries] = useState([]);

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
    }, 500);

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
    if (
      (inputValues.product_name.length == 0 && inputTouched.product_name) ||
      (inputValues.product_name.length == 0 && !inputTouched.product_name)
    ) {
      setProductNameError("Product name is required.");
    } else {
      setProductNameError("");
    }
    if (
      (inputValues.brand_name.length == 0 && inputTouched.brand_name) ||
      (inputValues.brand_name.length == 0 && !inputTouched.brand_name)
    ) {
      setBrandNameError("Brand name is required.");
    } else {
      setBrandNameError("");
    }
    if (
      (inputValues.MRP.length == 0 && inputTouched.MRP) ||
      (inputValues.MRP.length == 0 && !inputTouched.MRP)
    ) {
      setMRPError("Product Mrp must be gatter then zero.");
    } else {
      setMRPError("");
    }
    if (
      (inputValues.cost.length == 0 && inputTouched.cost) ||
      (inputValues.cost.length == 0 && !inputTouched.cost)
    ) {
      setCostError("Product cost is required.");
    } else {
      setCostError("");
    }
    if (
      (inputValues.category.length == 0 && inputTouched.category) ||
      (inputValues.category.length == 0 && !inputTouched.category)
    ) {
      setCategoryError("Category is required.");
    } else {
      setCategoryError("");
    }
    if (
      (inputValues.sub_category.length == 0 && inputTouched.sub_category) ||
      (inputValues.sub_category.length == 0 && !inputTouched.sub_category)
    ) {
      setSubCategoryError("Sub category is required.");
    } else {
      setSubCategoryError("");
    }
    if (
      (inputValues.sub_sub_category.length == 0 &&
        inputTouched.sub_sub_category) ||
      (inputValues.sub_sub_category.length == 0 &&
        !inputTouched.sub_sub_category)
    ) {
      setSubSubCategoryError("Sub sub category is required.");
    } else {
      setSubSubCategoryError("");
    }
    if (
      (inputValues.unit_of_measurement.length == 0 &&
        inputTouched.unit_of_measurement) ||
      (inputValues.unit_of_measurement.length == 0 &&
        !inputTouched.unit_of_measurement)
    ) {
      setUomError("Uom type is required.");
    } else {
      setUomError("");
    }
    if (
      (inputValues.barcode.length == 0 && inputTouched.barcode) ||
      (inputValues.barcode.length == 0 && !inputTouched.barcode)
    ) {
      setBarcodeError("Barcode is required.");
    } else {
      setBarcodeError("");
    }
    // if (
    //   (inputValues.weight.length == 0 && inputTouched.weight) ||
    //   (inputValues.weight.length == 0 && !inputTouched.weight)
    // ) {
    //   setWeightError("Carton Size is required.");
    // } else {
    //   setWeightError("");
    // }
    if (
      (inputValues.details.length == 0 && inputTouched.details) ||
      (inputValues.details.length == 0 && !inputTouched.details)
    ) {
      setDetailsError("Product description type is required.");
    } else {
      setDetailsError("");
    }
    if (
      (inputValues.specification.length == 0 && inputTouched.specification) ||
      (inputValues.specification.length == 0 && !inputTouched.specification)
    ) {
      setSpecificationError("Product specification is required.");
    } else {
      setSpecificationError("");
    }
    if (
      (inputValues.origin.length == 0 && inputTouched.origin) ||
      (inputValues.origin.length == 0 && !inputTouched.origin)
    ) {
      setOriginError("Country origin is required.");
    } else {
      setOriginError("");
    }
    if (
      (inputValues.carton_size.length == 0 && inputTouched.carton_size) ||
      (inputValues.carton_size.length == 0 && !inputTouched.carton_size)
    ) {
      setCartonSizeError("Carton size is required.");
    } else {
      setCartonSizeError("");
    }
    if (
      (inputValues.additional_info.length == 0 &&
        inputTouched.additional_info) ||
      (inputValues.additional_info.length == 0 && !inputTouched.additional_info)
    ) {
      setAdditionalInfoError("Additional info is required.");
    } else {
      setAdditionalInfoError("");
    }
    //file error
    validateSelectedFile();
  }

  function handleSubmit1(e) {
    e.preventDefault();
    setClicked(true);
    if (
      productNameError != "" ||
      brandNameError != "" ||
      mRPError != "" ||
      costError != "" ||
      categoryError != "" ||
      subCategoryError != "" ||
      subSubCategoryError != "" ||
      uomError != "" ||
      barcodeError != "" ||
      weightError != "" ||
      detailsError != "" ||
      specificationError != "" ||
      originError != "" ||
      cartonSizeError != "" ||
      additionalInfoError != "" ||
      resumeError != ""
    ) {
      console.log("failed");
      setIsSuccess(false);
      return;
    }
    console.log("inputValues", inputValues);
    let list = [];
    list = JSON.parse(localStorage.getItem("supProducts"));
    list = list == null ? [] : list;
    debugger;
    list.push(inputValues);
    debugger;
    localStorage.setItem("supProducts", JSON.stringify(list));
    // setIsSubmitForm(true);
    setIsSuccess(true);
    setClicked(false);
    clearData(e);

    setTimeout(() => {
      setIsSuccess(false);
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
      category: inputValues.category,
      sub_category: inputValues.sub_category,
      sub_sub_category: inputValues.sub_sub_category,
      unit_of_measurement: inputValues.unit_of_measurement,
      barcode: "",
      weight: "",
      details: "",
      specification: "",
      image: inputValues.image,
      origin: inputValues.origin,
      carton_size: "",
      additional_info: "",
    });
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
    if (!isSuccess) {
      checkValidation();
    }
  }, [inputValues, inputTouched]);
  useEffect(() => {
    setCategories(GetCategories());
    setAllCategory(GetCategories());
    GetCountryList();
    GetUomList();
    const localProducts = JSON.parse(localStorage.getItem("supProducts"));
    productList = localProducts;
  }, []);
  console.log("invalues", inputValues);
  return (
    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
      <div className="common-fieldset-main">
        <fieldset className="common-fieldset">
          <legend className="rounded">Product Listing Form</legend>
          <div className="table-responsive ">
            <form
              action=""
              className="productForm-form"
              id="productForm"
              encType="multipart/form-data"
              onSubmit={handleSubmit1}
            >
              <table className="table table-bordered key-person mb-0">
                <thead>
                  <tr>
                    <th scope="col">department</th>
                    <th scope="col">name</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                  <td className="text-start px-5">Company Name</td>
                  <td>Mediasoft</td>
                </tr>
                <tr>
                  <td className="text-start px-5">Company Code</td>
                  <td>002235</td>
                </tr> */}
                  <tr>
                    <td className="text-start px-5">
                      Product Name <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Brand Name <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Product MRP <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                    <td className="text-start px-5">
                      Product Cost <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Category<sup className="text-danger">*</sup>
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Sub-Category
                      <sup className="text-danger">*</sup>
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
                    <td className="text-start px-5">
                      Sub-Sub-Category
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <ReactSelect
                        options={subSubcategories}
                        placeholder="Select Sub-Sub-Category"
                        value={selectedOptions3}
                        onChange={(e) => handleChange3(e)}
                        isSearchable={true}
                      />
                      {subSubCategoryError != "" && clicked && (
                        <div style={{ color: "red" }}>
                          {subSubCategoryError}
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Unit of Measurement
                      <sup className="text-danger">*</sup>
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Country of Origin
                      <sup className="text-danger">*</sup>
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
                    <td className="text-start px-5">
                      Body Barcode
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Carton Size
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Product Details Description
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                    <td className="text-start px-5">
                      Product Specification
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleTouched(e)}
                        name="specification"
                        value={inputValues.specification}
                      />
                      {specificationError != "" &&
                        !clicked &&
                        !isSubmitForm &&
                        inputTouched.specification && (
                          <div style={{ color: "red" }}>
                            {specificationError}
                          </div>
                        )}
                      {specificationError != "" && clicked && (
                        <div style={{ color: "red" }}>{specificationError}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Product Additional Information
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control mb-0"
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
                        <div style={{ color: "red" }}>
                          {additionalInfoError}
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start px-5">
                      Image Upload
                      <sup className="text-danger">*</sup>
                    </td>
                    <td>
                      <input
                        type="file"
                        className="form-control mb-0"
                        id="image"
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
              <div className=" d-grid gap-2 d-md-flex justify-content-md-center mt-2 mb-2">
                <button type="submit" className="btn btn-outline-info upload">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning cancel"
                  onClick={(e) => clearData(e)}
                >
                  Cance
                </button>
              </div>
            </form>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default ProductLisitingForm;
