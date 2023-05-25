import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getBrandStore } from "../lib/endpoints";
import { useRouter } from "next/router";
// import { Slider } from "@material-ui/core";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { get } from "../../utils/localstorage";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

function ShopProductShorting2({
  handleClick,
  setPrice,
  price,
  showPrice,
  showBrands,
  showRevalance,
  viewAsFormat,
  totalVisible,
}) {
  // const[price,setPrice] =  useState([40,100])
  const dispatch = useDispatch();

  const storeData = useSelector((state) => state);

  const store = storeData.bredCumbData;
  const store1 = storeData.productPrice;
  console.log({ store1 });

  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [dataBreadcumb, setDataBreadcumb] = useState({});
  const [breadcumb, setBreadCumb] = useState([])
  const [renderPage, setRenderPage] = useState(false)
  const { query } = useRouter();
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState();
  const [track, setTrack] = useState(true)
  const [checked, setChecked] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [maxprice, setMaxprice] = useState([]);
  let maxpriceq = 1000;

  const GetBrands = useCallback(() => {
    http.get({
      url: getBrandStore,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        let optionList = [];
        if (res && res.length > 0) {
          res.map((item) => {
            optionList.push({
              value: item.id,
              label: item.name + "(" + "\t" + item.links.product_count + ")",
            });
          });
        }
        setBrands(optionList);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    if (showBrands) {
      GetBrands();
    }
  }, [GetBrands]);



  function handleSelect(data) {
    var updatedList = [];
    if (data.length > 0) {
      data.map((item) => {
        updatedList.push(item.value);
      });
    }
    var data1 = updatedList.map((i) => Number(i));
    setSelectedOptions(data);
    var brand_id = data1.toString();

    router.push({
      pathname: router.pathname,
      query: { ...query, brand_id: brand_id },
    }, undefined, { shallow: true });
  }

  // const handleCheck = (event) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }

  //   setChecked(updatedList);
  //   var data = updatedList.map((i) => Number(i));
  //   setCheckedBrands(data);
  //   console.log("brand", router.pathname);
  //   var brand_id = data.toString();
  //   router.push({
  //     pathname: router.pathname,
  //     query: { ...query, brand_id: brand_id },
  //   });
  // };
  const clickRelavance = (event) => {
    console.log(router.pathname, "no");
    if (event == "top_selling" && router.pathname != "/offer/peak-of-peak") {
      delete query.order_by;
      delete query.discound;
      router.push({
        pathname: router.pathname,
        query: { ...query, top_selling: 1 },
      });
    } else if (
      router.pathname == "/offer/peak-of-peak" &&
      event == "top_selling"
    ) {
      delete query.discound;
      delete query.top_selling;

      router.push({
        pathname: router.pathname,
        query: { ...query, order_by: event },
      });
    } else if (event == "discound") {
      delete query.order_by;
      delete query.top_selling;
      router.push({
        pathname: router.pathname,
        query: { ...query, discound: 1 },
      });
    } else {
      delete query.discound;
      delete query.top_selling;


      router.push({
        pathname: router.pathname,
        query: { ...query, order_by: event },
      });
    }
  };
  const updatePriec = (event, newValue) => {
    // var item2 = item;

    setPrice(newValue)

    // setData(item);
  };

  const clickDepartment1 = (
    url,
    name1,
    id1,
    name2,
    id2,
    name3,
    id3,
    name4,
    id4,
    name5,
    id5,

  ) => {


    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: name1,
        link1: id1,
        name2: name2,
        link2: id2,
        name3: name3,
        link3: id3,
        name4: name4,
        link4: id4,
        name5: name5,
        id5: id5,
      },
    });
    // set("dataBreadcumb",JSON.stringify({dept:name,cat1:"",subCat:"",subCat2:""}))
    router.push(url);
  };


  useEffect(() => {

    if (track && (store1.price != '0,0')) {
      setPrice(store1.price)
      setTrack(false)
    }

  }, [store1])


  useEffect(() => {
    if (renderPage == false) {
      setBreadCumb(JSON.parse(localStorage.getItem('dataBreadcumb')) == undefined ? [] : JSON.parse(localStorage.getItem('dataBreadcumb')))
      setRenderPage(true)
    }
    // alert(JSON.stringify(breadcumb))
  }, [breadcumb])




  return (
    <section class="shop-product-sorting-2 ss">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="sorting-flex-main">
              
            {router.pathname == "/purchase-items" && (
                <div class="breadcrumb-main">
                  <nav aria-label="breadcrumb" class="breadcrumbs medium-font">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="#" role="button" tabindex="0">
                          Home
                        </a>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#" role="button" tabindex="0">
                          Frequently Your Purchase Items
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>
              )}


              {
                router.pathname != "/purchase-items" && (
                  <div class="breadcrumb-main">
                    <nav aria-label="breadcrumb" class="breadcrumbs medium-font">
                      <ol class="breadcrumb">
                        <li className="breadcrumb-item">
                          <a
                            onClick={clickDepartment1.bind(
                              null,
                              "/",
                              "",
                              "",
                              "",
                              "",
                              "",
                              "",
                              "",
                              "",
                              "",
                              ""
                            )}
                            role="button"
                            tabIndex="0"
                            href
                          >
                            Home
                          </a>
                        </li>

                        {/*single page breadcumb manange*/}
                        {router.pathname == "/all-brand" &&
                          store?.breadCumb?.name1 != "" && (
                            <li className="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/all-brand",
                                  "Brand",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabIndex="0"
                                href
                              >
                                Brand
                              </a>
                            </li>
                          )}

                        {router.pathname == "/brand-shop" &&
                          store?.breadCumb?.name1 != "" && (
                            <li className="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/brand-shop",
                                  "brand",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabIndex="0"
                                href
                              >
                                Brand
                              </a>
                            </li>
                          )}

                        {router.pathname == "/offer/peak-of-peak" &&
                          store?.breadCumb?.name1 != "" && (
                            <li className="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/offer/peak-of-peak",
                                  "Peak Off Peak",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabIndex="0"
                                href
                              >
                                Cut Off Price
                              </a>
                            </li>
                          )}

                        {router.pathname == "/offer/package" &&
                          store?.breadCumb?.name1 != "" && (
                            <li className="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/offer/package",
                                  "Package",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabIndex="0"
                                href
                              >
                                Package
                              </a>
                            </li>
                          )}
                        {/*single page breadcumb manange*/}

                        {
                          router.pathname == "/all-featured-department"
                          && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  store.breadCumb.link1,
                                  store?.breadCumb?.name1,
                                  store.breadCumb.link1,
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name1}
                              </a>
                            </li>
                          )
                        }
                        {
                          (
                            router.query.hasOwnProperty('flash_deal')
                            ||
                            router.query.hasOwnProperty('section_id')
                            ||
                            router.pathname == '/all-category'
                            ||
                            router.pathname == '/pantry'
                            ||
                            router.pathname.includes('department-wise-category')
                          )


                          && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  store.breadCumb.link1,
                                  store?.breadCumb?.name1,
                                  store.breadCumb.link1,
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name1}
                              </a>
                            </li>
                          )
                        }








                        {store?.breadCumb?.name1 != "" &&
                          router.pathname != "/offer/peak-of-peak" &&
                          router.pathname != "/offer/package" &&
                          router.pathname != "/brand-shop" &&
                          router.pathname != "/all-brand" &&
                          router.pathname != "/all-featured-department" &&
                          router.pathname != "/all-featured-department" &&
                          // router.pathname != "/shop" &&
                          router.pathname != "/all-category" &&
                          router.pathname != "/pantry" &&
                          !router.query.hasOwnProperty('flash_deal') &&
                          !router.pathname.includes('department-wise-category') &&
                          !router.query.hasOwnProperty('section_id') && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?dept_id=" + store.breadCumb.link1,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name1}
                              </a>
                            </li>
                          )}




                        {store?.breadCumb?.name2 != "" &&
                          router.pathname != "/offer/peak-of-peak" &&
                          router.pathname != "/offer/package" &&
                          router.pathname != "/all-brand" &&
                          router.pathname != "/all-featured-department" &&
                          !router.query.hasOwnProperty('dept_id') &&
                          !router.query.hasOwnProperty('section_id') && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?cat_id=" + store.breadCumb.link2,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  store?.breadCumb?.name2,
                                  store?.breadCumb?.link2,
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name2}
                              </a>
                            </li>
                          )}


                        {store?.breadCumb?.name2 != "" &&
                          router.pathname != "/offer/peak-of-peak" &&
                          router.pathname != "/offer/package" &&
                          router.pathname != "/all-brand" &&
                          router.pathname != "/all-featured-department" &&
                          !router.query.hasOwnProperty('section_id') &&
                          router.query.hasOwnProperty('dept_id') &&
                          (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?dept_id=" + store.breadCumb.link2,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  store?.breadCumb?.name2,
                                  store?.breadCumb?.link2,
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name2}
                              </a>
                            </li>
                          )}



                        {store?.breadCumb?.name3 != "" &&
                          router.pathname != "/offer/peak-of-peak" &&
                          router.pathname != "/offer/package" &&
                          router.pathname != "/all-brand" &&
                          router.pathname != "/all-featured-department" &&
                          !router.query.hasOwnProperty('section_id') && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?cat_id=" + store.breadCumb.link3,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  store?.breadCumb?.name2,
                                  store?.breadCumb?.link2,
                                  store?.breadCumb?.name3,
                                  store?.breadCumb?.link3,
                                  "",
                                  "",
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name3}
                              </a>
                            </li>
                          )}
                        {store?.breadCumb?.name4 != "" &&
                          router.pathname != "/offer/peak-of-peak" && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?cat_id=" + store.breadCumb.link4,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  store?.breadCumb?.name2,
                                  store?.breadCumb?.link2,
                                  store?.breadCumb?.name3,
                                  store?.breadCumb?.link3,
                                  store?.breadCumb?.name4,
                                  store?.breadCumb?.link4,
                                  "",
                                  ""
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name4}
                              </a>
                            </li>
                          )}
                        {store?.breadCumb?.name5 != "" &&
                          router.pathname != "/offer/peak-of-peak" && (
                            <li class="breadcrumb-item">
                              <a
                                onClick={clickDepartment1.bind(
                                  null,
                                  "/shop?cat_id=" + store.breadCumb.link5,
                                  store?.breadCumb?.name1,
                                  store?.breadCumb?.link1,
                                  store?.breadCumb?.name2,
                                  store?.breadCumb?.link2,
                                  store?.breadCumb?.name3,
                                  store?.breadCumb?.link3,
                                  store?.breadCumb?.name4,
                                  store?.breadCumb?.link4,
                                  store?.breadCumb?.name5,
                                  store?.breadCumb?.link5
                                )}
                                role="button"
                                tabindex="0"
                                href
                              >
                                {store.breadCumb.name5}
                              </a>
                            </li>
                          )}
                        {router.query != "cat_id" && router.query == "brand_id" && (
                          <li class="breadcrumb-item">
                            <a
                              onClick={clickDepartment1.bind(
                                null,
                                "/shop?brand_id=" + store.breadCumb.link1,
                                store?.breadCumb?.name1,
                                store?.breadCumb?.link1,
                                store?.breadCumb?.name2,
                                store?.breadCumb?.link2,
                                store?.breadCumb?.name3,
                                store?.breadCumb?.link3,
                                store?.breadCumb?.name4,
                                store?.breadCumb?.link4,
                                store?.breadCumb?.name5,
                                store?.breadCumb?.link5
                              )}
                              role="button"
                              tabindex="0"
                              href
                            >
                              {store.breadCumb.name5}
                            </a>
                          </li>
                        )}




                      </ol>
                    </nav>
                  </div>
                )
              }

              {showPrice && (
                <div class="price-range-main">
                  {
                    <div id="slider">
                      {store1?.price[1] > 0 && (
                        // <Slider
                        //   value={price}
                        //   getAriaLabel={() => "Temperature range"}
                        //   max={store1?.price[1]}
                        //   valueLabelDisplay="on"
                        //   onChange={updatePriec}
                        //   aria-label="Default"
                        // />
                        <>

                          {/*<Box sx={{ width: 300 }}>*/}
                          <Slider
                            value={price}
                            getAriaLabel={() => "Temperature range"}
                            max={store1?.price[1]}
                            valueLabelDisplay="on"
                            onChange={updatePriec}
                            aria-label="Default"
                          />
                          {/*</Box>*/}
                        </>

                      )}
                    </div>
                  }
                </div>
              )}

              {router.pathname != "/offer/package"
                ? showBrands && (
                  <div className="sortby-main sortby-main-first">
                    <div className="dropdown">
                      <ul>
                        <MultiSelect
                          options={brands}
                          value={selectedOptions || []}
                          onChange={handleSelect}
                          placeholder={'Select Brand'}
                          labelledBy="Select Brand"
                        />
                      </ul>
                    </div>
                  </div>
                )
                : ""}

              <div class="sortby-main">
                {showRevalance && (
                  <div class="dropdown text-center">
                    <button
                      class="btn sortby-dropdown dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      sort by relevence
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          onClick={clickRelavance.bind(null, "high2low")}
                          class="dropdown-item"
                          href
                        >
                          Price - High to Low
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={clickRelavance.bind(null, "low2high")}
                          class="dropdown-item"
                          href
                        >
                          Price - Low to High
                        </a>
                      </li>
                      {router.pathname != "/offer/package" ? (
                        router.pathname != "/offer/peak-of-peak" ? (
                          <li>
                            <a
                              onClick={clickRelavance.bind(null, "discound")}
                              className="dropdown-item"
                              href
                            >
                              Discount
                            </a>
                          </li>
                        ) : (
                          <li>
                            <a
                              onClick={clickRelavance.bind(
                                null,
                                "highes_rated"
                              )}
                              className="dropdown-item"
                              href
                            >
                              Highest Rated
                            </a>
                          </li>
                        )
                      ) : (
                        ""
                      )}
                      {router.pathname != "/offer/package" ? (
                        <li>
                          <a
                            onClick={clickRelavance.bind(null, "top_selling")}
                            className="dropdown-item"
                            href
                          >
                            Top Selling
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {viewAsFormat == 1 && (
                <div class="viewall-main">
                  <h4> view as</h4>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link "
                        id="row-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#row-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="row-view-tab-pane"
                        aria-selected="true"
                        onClick={(event) => handleClick(event, "one")}
                      >
                        <img
                          src="../assets/images/icon/cr.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="fourC-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#fourC-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="fourC-view-tab-pane"
                        aria-selected="false"
                        onClick={(event) => handleClick(event, "four")}
                      >
                        <img
                          src="../assets/images/icon/c4.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="fiveC-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#fiveC-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="fiveC-view-tab-pane"
                        aria-selected="false"
                        onClick={(event) => handleClick(event, "five")}
                      >
                        <img
                          src="../assets/images/icon/c5.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="sixC-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#sixC-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="sixC-view-tab-pane"
                        aria-selected="true"
                        onClick={(event) => handleClick(event, "six")}
                      >
                        <img
                          src="../assets/images/icon/c6.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {viewAsFormat == 2 && (
                <div class="viewall-main">
                  <h4> view as</h4>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link "
                        id="row-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#row-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="row-view-tab-pane"
                        aria-selected="true"
                        onClick={(event) => handleClick(event, "row")}
                      >
                        <img
                          src="../assets/images/icon/cr.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class={"nav-link"}
                        id="twoC-view-tab-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#twoC-view-tab-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="twoC-view-tab-tab-pane"
                        aria-selected="false"
                        onClick={(event) => handleClick(event, "two")}
                      >
                        <img
                          src="../assets/images/icon/c2.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>

                    <li class="nav-item" role="presentation">
                      <button
                        class={"nav-link active"}
                        id="threeC-view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#threeC-view-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="threeC-view-tab-pane"
                        aria-selected="true"
                        onClick={(event) => handleClick(event, "three")}
                      >
                        <img
                          src="../assets/images/icon/c3.svg"
                          alt=""
                          class="img-fluid"
                        />
                      </button>
                    </li>
                    {router.pathname == "/purchase-items" && (
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link "
                          id="fourC-view-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#fourC-view-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="fourC-view-tab-pane"
                          aria-selected="false"
                          onClick={(event) => handleClick(event, "four")}
                        >
                          <img
                            src="../assets/images/icon/c4.svg"
                            alt=""
                            class="img-fluid"
                          />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Select2JS /> */}
    </section>
  );
}

export default ShopProductShorting2;
