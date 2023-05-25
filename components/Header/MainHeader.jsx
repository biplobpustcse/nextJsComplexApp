import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { SidebarCollapse, SidebarJS } from "../../utils/slider";
import {
  collectionList,
  getAllRecipyCategory,
  getEventList,
  getUpComingCelebrations,
} from "../lib/endpoints";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { http } from "../../services/httpService";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import {
  CelebrationDay,
  CelebrationList,
  CollectionList,
  SetAllRecipies,
} from "../../redux/actions/categoryAction";

const MainHeader = () => {
  const dispatch = useDispatch();
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [celebrationDay, SetCelebrationDay] = useState([]);
  const [celebrationList, setCelebrationList] = useState([]);
  const getCookieInfo = getCookie("auth");
  const [recipyCategorylist, setRecipyCategoryList] = useState([]);
  const [collectionListData, setCollectionListData] = useState([]);
  const ctxAuth = useSelector((store) => store.authReducerContext);

  const getRecipyCatgry = useCallback(() => {
    http.get({
      url: getAllRecipyCategory,
      before: () => {},
      successed: (res) => {
        dispatch(SetAllRecipies(res.result));
        setRecipyCategoryList(res.result);
      },
      failed: () => {},
    });
  }, []);
  const GetAllCelebrationDay = useCallback(() => {
    http.get({
      url: getEventList,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        SetCelebrationDay(res);
        dispatch(CelebrationDay(res));
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  const getCelebrationList = useCallback(() => {
    http.get({
      url: getUpComingCelebrations,
      before: () => {},
      successed: (res) => {
        dispatch(CelebrationList(res));
        setCelebrationList(res);
      },
      failed: () => {},
    });
  }, []);
  useEffect(() => {
    GetAllCelebrationDay();
    getCelebrationList();
    getRecipyCatgry();
  }, []);

  const getCollectionList = useCallback(() => {
    http.get({
      url: collectionList,
      before: () => {},
      successed: (res) => {
        setCollectionListData(res.result);
        dispatch(CollectionList(res.result));
      },
      failed: () => {},
    });
  }, []);
  useEffect(() => {
    getCollectionList();
  }, []);

  console.log("celebrationDay: ", celebrationDay);

  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm" id="">
        <div className="container-fluid ps-0">
          <button
            type="button"
            id="sidebarCollapse"
            className="sidebar-show-btn"
          >
            {/* {{display:inline-block,vertical-align:middle;}} */}
            <svg
              style={{ display: "inline-block", verticalAlign: "middle" }}
              width="25px"
              height="25px"
              version="1.1"
              viewBox="0 0 100 100"
              data-reactid=".rh6rjp52ee.4.0.0.0.0.0"
            >
              <path
                d="m12 20v8h76v-8zm0 26v8h76v-8zm0 26v8h76v-8z"
                data-reactid=".rh6rjp52ee.4.0.0.0.0.0.0"
              ></path>
            </svg>
            departments
          </button>
          <button
            className="navbar-toggler d-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#top_nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="top_nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/all-brand" as={`/all-brand`}>
                  <a class="nav-link"> shop by brands </a>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link href="/membership" as={`/membership`}>
                  <a
                    className="nav-link dropdown-toggle"
                    // data-bs-toggle="dropdown"
                  >
                    {" "}
                    membership{" "}
                  </a>
                </Link>
                {/* <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  membership
                </a> */}
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  <li>
                    <Link href="/membership" as={`/membership`}>
                      <a class="dropdown-item"> join wholesale club </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership/register"
                      as={`/membership/register`}
                    >
                      <a class="dropdown-item"> register your membership </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/membership/renew" as={`/membership`}>
                      <a class="dropdown-item"> renew your membership </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/supplier-registration"
                      as={`/supplier-registration`}
                    >
                      <a class="dropdown-item"> wholesale club suppliers </a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  offers
                </a>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      all promo products
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      packages{" "}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      price cut
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      peak
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      off-peak
                    </a>
                  </li> */}
                  {getCookieInfo && (
                    <li>
                      <Link href={"/coupons"} as={"/coupons"}>
                        <a
                          className="dropdown-item"
                          // href=""
                          // onClick={() => {
                          //   router.push("/coupons");
                          // }}
                        >
                          {" "}
                          coupon
                        </a>
                      </Link>
                    </li>
                  )}

                  {/*<li>*/}
                  {/*  <a*/}
                  {/*    className="dropdown-item"*/}
                  {/*    onClick={() => {*/}
                  {/*      router.push("/offer");*/}
                  {/*    }}*/}
                  {/*  >*/}
                  {/*    All Offers Items*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                  <li>
                    <Link
                      href={"/offer/peak-of-peak"}
                      as={"/offer/peak-of-peak"}
                    >
                      <a
                        className="dropdown-item"
                        // href=""
                        // onClick={() => {
                        //   router.push("/offer/peak-of-peak");
                        // }}
                      >
                        Price Cut Offer
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href=""
                      onClick={(evt) => {
                        evt.preventDefault();
                        router.push("/offer/package");
                      }}
                    >
                      Package Offers
                    </a>
                  </li>
                  {/*<li>*/}
                  {/*  <Link href={"/coupons"}>*/}
                  {/*    <a className="dropdown-item">Daily Deals</a>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link href={"/coupons"}>*/}
                  {/*    <a className="dropdown-item">Flash Sale</a>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}

                  {collectionListData.map((item) => (
                    <li>
                      <Link href="/offer/[id]" as={`/offer/${item?.id}`}>
                        <a className="dropdown-item">{item.name}</a>
                      </Link>
                    </li>
                  ))}
                  {/* <li>
                    <Link href={""}>
                      <a className="dropdown-item"> Buy Item Get Disscount</a>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link href={""}>
                      <a className="dropdown-item">
                        {" "}
                        Buy Ammount Get Disscount
                      </a>
                    </Link>
                  </li> */}

                  {/* <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      temporary offer
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      weekly offer
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      eid special offer
                    </a>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item dropdown d-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  recipes
                </a>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  <li>
                    <Link href="/recipe">
                      <a class="dropdown-item"> all Categories </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipe">
                      <a class="dropdown-item"> all recipe category </a>
                    </Link>
                  </li>

                  {/* {recipyCategorylist.map((item) => {
                    return (
                      <li>
                        <Link href="/recipe/[id]" as={`/recipe/${item?.id}`}>
                          <a className="dropdown-item" href>
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    );
                  })} */}
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      receipeis{" "}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      category list{" "}
                    </a>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item dropdown d-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  celebration day
                </a>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  {celebrationList != undefined &&
                    celebrationList?.length > 0 && (
                      <>
                        <h6 className="dropdown-item-title">
                          Upcoming Celebration Day
                        </h6>
                        {celebrationList.map((item) => (
                          <li>
                            <Link href={`/celebration?id=` + item.id}>
                              <a class="dropdown-item">{item.event_title}</a>
                            </Link>
                          </li>
                        ))}
                      </>
                    )}

                  {celebrationDay && celebrationDay.length > 0 && (
                    <>
                      <h6 className="dropdown-item-title">More Days</h6>
                      {celebrationDay.map((day) => {
                        return (
                          <li key={day.id}>
                            <Link href={`/celebration?id=` + day.id}>
                              <a class="dropdown-item">{day.event_title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  )}

                  {/*{celebrationDay && celebrationDay.length > 0 && (*/}
                  {/*  <>*/}
                  {/*    <h6 className="dropdown-item-title">More Days</h6>*/}
                  {/*    {celebrationDay.map((day) => {*/}
                  {/*      return (*/}
                  {/*        <li key={day.id}>*/}
                  {/*          <Link href={`/celebration?id=` + day.id}>*/}
                  {/*            <a class="dropdown-item">{day.event_title}</a>*/}
                  {/*          </Link>*/}
                  {/*        </li>*/}
                  {/*      );*/}
                  {/*    })}*/}
                  {/*  </>*/}
                  {/*)}*/}

                  {/* test */}
                  {/* <li>
                    <Link href={`/celebration?id=` + 5}>
                      <a class="dropdown-item"> celebration day 1 </a>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      celebration day 2{" "}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      celebration day 3{" "}
                    </a>
                  </li> */}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  more
                </a>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  <li>
                    <a
                      className="dropdown-item"
                      href=""
                      onClick={() => {
                        ctxAuth.isLoggedIn && router.push("/wishlist");
                        !ctxAuth.isLoggedIn && router.push("/auth");
                      }}
                    >
                      {" "}
                      wishlist
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        ctxAuth.isLoggedIn && router.push("/compare");
                        !ctxAuth.isLoggedIn && router.push("/auth");
                      }}
                    >
                      {" "}
                      compare{" "}
                    </a>
                  </li>
                  <li>
                    <Link href={`/bekary`}>
                      <a className="dropdown-item"> restaurent</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/all-brand"}>
                      <a className="dropdown-item" href="#">
                        {" "}
                        brand shop
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/bulkSale"}>
                      <a className="dropdown-item" href="#">
                        {" "}
                        bulk sale
                      </a>
                    </Link>
                  </li>
                  <li>
                    {/* <a className="dropdown-item" href="#"> carrer</a> */}
                    <Link href="/career" as={`/career`}>
                      <a class="dropdown-item"> career </a>
                    </Link>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      imported product
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      new arrivals
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      imported from usa
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      product request
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      upload shopping list
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
            <ul class="navbar-nav nav-right">
              <li class="nav-item">
                <a
                  target="_"
                  href="https://play.google.com/store/apps/details?id=com.wholesaleclubltd"
                  class="nav-link"
                >
                  {" "}
                  <img src="../assets/images/icon/g-play.png" alt="" />
                </a>
              </li>
              <li class="nav-item">
                <a
                  target="_"
                  href="https://apps.apple.com/app/wholesale-club/id6446449789"
                  class="nav-link"
                >
                  {" "}
                  <img src="../assets/images/icon/apple-play.png" alt="" />
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="icofont-phone"></i> 09611996677
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SidebarCollapse />
    </header>
  );
};

export default MainHeader;
