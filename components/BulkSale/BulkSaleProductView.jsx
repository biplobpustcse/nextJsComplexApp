import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductInfoModel from "../Product/ProductInfoModel";
import { productDataConverter } from "../../services/dataService";
import { http } from "../../services/httpService";
import { postQuote } from "../lib/endpoints";
import { useSelector } from "react-redux";
import CopyProductInfoForBulkSale from "../Product/CopyProductInfoForBulkSale";
import router from "next/router";
import OneColGridTemplate from "../Shop/OneColGridTemplate";

const BulkSaleProductView = ({ gridViewWise, data, bulkProducts }) => {
  const ctxAuth = useSelector((store) => store.authReducerContext);
  data.forEach((element) => {
    element.partyProduct = true;
  });
  bulkProducts = productDataConverter(bulkProducts);
  bulkProducts.forEach((element) => {
    element.partyProduct = false;
  });
  const [isActiveQuote, setIsActiveQuote] = useState(false);
  const [isActiveItem, setIsActiveItem] = useState([]);

  const [productData, setProductData] = useState([...data, ...bulkProducts]);
  const requestPartyQuoteHandler = (item) => {
    if (ctxAuth.isLoggedIn) {
      http.file({
        url: postQuote,
        payload: {
          user_id: ctxAuth.user.user.id,
          product_id: item.id,
          quantity: item.guest_person,
          variant: "",
          type: "party",
        },
        before: () => { },
        successed: (res) => {
          setIsActiveQuote(true);
          setIsActiveItem((preElement) => [...preElement, item.id]);
          // funcCall(res);
          //setVisibleQuoteBox(true);
        },
        failed: () => {
          console.log("failed");
        },
      });
    } else {
      router.push("/auth");
    }
  };

  console.log({ productData });

  console.log({ isActiveItem });

  // useEffect(()=>{
  //   if(isActiveItem.filter(item2=>item2.id==item.id)){

  //   }
  // },[])
  return (
    <section class="bulk-sale-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade"
                id="row-view-tab-pane"
                role="tabpanel"
                aria-labelledby="row-view-tab"
                tabindex="0"
              >
                {
                  gridViewWise == 1 && (
                    <OneColGridTemplate>

                      {productData.map((item) => (
                        <>
                          {item.partyProduct == false && (
                            <>
                              <CopyProductInfoForBulkSale item={item} />
                            </>
                          )}
                          {item.partyProduct == true && (
                            <div className="bulk-single">
                              <div className="card">
                                <div className="card-body">
                                  <>

                                    <div className="card-left">
                                      <div className="image-box">
                                        <img
                                          src={item.banner_image}
                                          alt=""
                                          className="img-fluid"
                                        />
                                        {/* <div class="quickview-main">
                              <ul class="nav justify-content-center">
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    href="javascript:void(0);"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickviewModal"
                                  >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" href="#">
                                    <i class="fa-regular fa-heart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                                      </div>
                                    </div>

                                    <div className="card-right">
                                      <div className="description-box">
                                        <h4 className="product-title">
                                          <a
                                            className=""
                                            href=""
                                            onClick={(e) => {
                                              e.preventDefault()
                                              router.push("/bulkSale/" + item.id);
                                            }}
                                          >
                                            {item.booking_name}
                                          </a>
                                        </h4>
                                        <p className="product-description">
                                          {item.short_description}
                                        </p>
                                        <h3 className="product-price">
                                          {item.guest_person}
                                          <span>/person</span>
                                        </h3>
                                        {/* <span class="text-danger">
                                      Min order 20kg
                                    </span> */}
                                      </div>
                                      {isActiveItem.filter(
                                        (item2) => item2 == item.id
                                      ).length == 0 && (
                                          <button
                                            className="btn req-quote-btn"
                                            onClick={requestPartyQuoteHandler.bind(
                                              null,
                                              item
                                            )}
                                          >
                                            request price / quote
                                          </button>
                                        )}
                                      {isActiveQuote &&
                                        isActiveItem.filter(
                                          (item2) => item2 == item.id
                                        ).length > 0 && (
                                          <button className="btn req-quote-btn">
                                            Already Quoted this Items
                                          </button>
                                        )}
                                    </div>
                                  </>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </OneColGridTemplate>
                  )
                }
              </div>

              {gridViewWise == 4 && (
                <div
                  class="tab-pane fade"
                  id="fourC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="fourC-view-tab"
                  tabindex="0"
                  style={{ display: "contents" }}
                >
                  <div class="four-col-grid-container">
                    {productData.map((item) => (
                      <>
                        {item.partyProduct == false && (
                          <>
                            <CopyProductInfoForBulkSale item={item} />
                          </>
                        )}
                        {item.partyProduct == true && (
                          <div class="bulk-single">
                            <div class="card">
                              <div class="image-box">
                                <img
                                  src={item.banner_image}
                                  alt=""
                                  class="img-fluid"
                                />
                                {/* <div class="quickview-main">
                              <ul class="nav justify-content-center">
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    href="javascript:void(0);"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickviewModal"
                                  >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" href="#">
                                    <i class="fa-regular fa-heart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                              </div>
                              <div class="card-body">
                                <>
                                  <div class="description-box">
                                    <h4 class="product-title">
                                      <a
                                        class=""
                                        href=""
                                        onClick={() => {
                                          router.push("/bulkSale/" + item.id);
                                        }}
                                      >
                                        {item.booking_name}
                                      </a>
                                    </h4>
                                    <p class="product-description">
                                      {item.short_description}
                                    </p>
                                    <h3 class="product-price">
                                      {item.guest_person}
                                      <span>/person</span>
                                    </h3>
                                    {/* <span class="text-danger">
                                      Min order 20kg
                                    </span> */}
                                  </div>
                                  {isActiveItem.filter(
                                    (item2) => item2 == item.id
                                  ).length == 0 && (
                                      <button
                                        class="btn req-quote-btn"
                                        onClick={requestPartyQuoteHandler.bind(
                                          null,
                                          item
                                        )}
                                      >
                                        request price / quote
                                      </button>
                                    )}
                                  {isActiveQuote &&
                                    isActiveItem.filter(
                                      (item2) => item2 == item.id
                                    ).length > 0 && (
                                      <button class="btn req-quote-btn">
                                        Already Quoted this Items
                                      </button>
                                    )}
                                </>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}

              {gridViewWise == 5 && (
                <div
                  class="tab-pane fade show active"
                  id="fiveC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="fiveC-view-tab"
                  tabindex="0"
                >
                  <div class="row">
                    <div class="col-12">
                      <div class="five-col-grid-container">
                        {productData.map((item) => (
                          <>
                            {item.partyProduct == false && (
                              <>
                                <CopyProductInfoForBulkSale item={item} />
                              </>
                            )}
                            {item.partyProduct == true && (
                              <div class="bulk-single">
                                <div class="card">
                                  <div class="image-box">
                                    <img
                                      src={item.banner_image}
                                      alt=""
                                      class="img-fluid"
                                    />
                                    {/* <div class="quickview-main">
                              <ul class="nav justify-content-center">
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    href="javascript:void(0);"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickviewModal"
                                  >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" href="#">
                                    <i class="fa-regular fa-heart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                                  </div>

                                  <div class="card-body">
                                    <>
                                      <div class="description-box">
                                        <h4 class="product-title">
                                          <Link href={"bulkSale/" + item.id}>
                                            <a href class="">
                                              {item.booking_name}
                                            </a>
                                          </Link>
                                        </h4>
                                        <p class="product-description">
                                          {item.short_description}
                                        </p>
                                        <h3 class="product-price">
                                          {item.guest_person}
                                          <span>/person</span>
                                        </h3>
                                        <span class="text-danger">
                                          Min order 20kg
                                        </span>
                                      </div>
                                      {isActiveItem.filter(
                                        (item2) => item2 == item.id
                                      ).length == 0 && (
                                          <button
                                            class="btn req-quote-btn"
                                            onClick={requestPartyQuoteHandler.bind(
                                              null,
                                              item
                                            )}
                                          >
                                            request price / quote
                                          </button>
                                        )}
                                      {isActiveQuote &&
                                        isActiveItem.filter(
                                          (item2) => item2 == item.id
                                        ).length > 0 && (
                                          <button class="btn req-quote-btn">
                                            Already Quoted this Items
                                          </button>
                                        )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {gridViewWise == 6 && (
                <div
                  class="tab-pane fade"
                  id="sixC-view-tab-pane"
                  role="tabpanel"
                  aria-labelledby="sixC-view-tab"
                  tabindex="0"
                  style={{ display: "contents" }}
                >
                  <div class="six-col-grid-container">
                    {productData.map((item) => (
                      <>
                        {item.partyProduct == false && (
                          <>
                            <CopyProductInfoForBulkSale item={item} />{" "}
                          </>
                        )}
                        {item.partyProduct == true && (
                          <div class="bulk-single">
                            <div class="card">
                              <div class="image-box">
                                <img
                                  src={item.banner_image}
                                  alt=""
                                  class="img-fluid"
                                />
                                {/* <div class="quickview-main">
                              <ul class="nav justify-content-center">
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    href="javascript:void(0);"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickviewModal"
                                  >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" href="#">
                                    <i class="fa-regular fa-heart"></i>
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                              </div>

                              <div class="card-body">
                                <>
                                  <div class="description-box">
                                    <h4 class="product-title">
                                      <Link href={"bulkSale/" + item.id}>
                                        <a href class="">
                                          {item.booking_name}
                                        </a>
                                      </Link>
                                    </h4>
                                    <p class="product-description">
                                      {item.short_description}
                                    </p>
                                    <h3 class="product-price">
                                      {item.guest_person}
                                      <span>/person</span>
                                    </h3>
                                    {/* <span class="text-danger">
                                      Min order 20kg
                                    </span> */}
                                  </div>
                                  {isActiveItem.filter(
                                    (item2) => item2 == item.id
                                  ).length == 0 && (
                                      <button
                                        class="btn req-quote-btn"
                                        onClick={requestPartyQuoteHandler.bind(
                                          null,
                                          item
                                        )}
                                      >
                                        request price / quote
                                      </button>
                                    )}
                                  {isActiveQuote &&
                                    isActiveItem.filter(
                                      (item2) => item2 == item.id
                                    ).length > 0 && (
                                      <button class="btn req-quote-btn">
                                        Already Quoted this Items
                                      </button>
                                    )}
                                </>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkSaleProductView;
