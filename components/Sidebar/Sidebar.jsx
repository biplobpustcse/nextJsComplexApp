import { connect, useSelector } from "react-redux";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions/departmentAction";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { http } from "../../services/httpService";
import {
  businessSettings,
  collectionList,
  getAllRecipyCategory,
  getDepartments,
  getEventList,
  getUpComingCelebrations,
  menuAll,
} from "../lib/endpoints";
import { SidebarJS } from "../../utils/slider";
import Router, {useRouter} from "next/router";
import { get, set } from "../../utils/localstorage";
import { useDispatch } from "react-redux";
import Menu from "./Menu";
import ProductRequestModal from "./ProductRequestModal";
import { getCookie } from "cookies-next";
import {toast} from "react-toastify";
import {setMenus} from "../../redux/actions/categoryAction";

const Sidebar = (props) => {
  const recipyCategorylist = useSelector((state) => {
    return state.category?.allRecipies
  })
  const celebrationList = useSelector((state) => {
    return state.category?.allCelebrationList
  })
  const celebrationDay = useSelector((state) => {
    return state.category?.allCelebrationDay
  })
  const collectionListData = useSelector((state) => {
    return state.category?.allCollection
  })
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [refClick, setRefClick] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartmentsData] = useState([]);
  // const [isVisibileError, setIsVisibleError] = useState(false);
  const [businessSettingss, setBusinessSettingss] = useState([]);
  const [Allmenu, setAllMenu] = useState([]);
  const [settingType, setSettingType] = useState({});
  const ctxAuth = useSelector((store) => store.authReducerContext);

  const [isShowProdReqestModal, setisShowProdReqestModal] = useState(false);
  const router = useRouter()
  const OpenModal = () => {
    if(ctxAuth.isLoggedIn == false) {
      toast.error('Login to sent a product request')
      return ;
    }
    var myModal = new bootstrap.Modal(
      document.getElementById("staticBackdropModal")
    );
    myModal.show();
    setisShowProdReqestModal(true);
  };

  const clickDepartment = (url) => {
    Router.push(url);
  };
  const clickDepartment1 = (
      event,
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
    id5
  ) => {
    console.log(event,'rere')
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
        link5: id5,
      },
    });

      //for collapse issue problem
      document.getElementsByClassName('sidebar-body')[0].scrollTop =  event.offsetTop ;


    if(Router.pathname == '/shop'){
      Router.push(url, undefined, { shallow: true })
    }else{
      Router.push(url);

    }
  };

  const getBusinessSettings = useCallback(() => {
    http.get({
      url: businessSettings,
      before: () => { },
      successed: (res) => {

        setSettingType(res[203]);
      },
      failed: () => { },
    });
  }, []);

  const getMenuSettings = useCallback(() => {
    http.get({
      url: menuAll,
      before: () => { },
      successed: (res) => {
        setAllMenu(res);
        dispatch(setMenus(res[0]))
        setDepartmentsData(res[0]?.departments.data);
      },
      failed: () => { },
    });
  }, []);
  useEffect(() => {

    getBusinessSettings();
    // GetSidebarMenus();
  }, [ getBusinessSettings]);

  useEffect(() => {
    getMenuSettings();
  },[])

  console.log({ Allmenu });

  // ===================================================================================

  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [celebrationDay, SetCelebrationDay] = useState([]);
  // const [celebrationList, setCelebrationList] = useState([]);
  const getCookieInfo = getCookie("auth");
  // const [recipyCategorylist, setRecipyCategoryList] = useState([]);
  // const [collectionListData, setCollectionListData] = useState([]);

  // const getRecipyCatgry = useCallback(() => {
  //   http.get({
  //     url: getAllRecipyCategory,
  //     before: () => { },
  //     successed: (res) => {
  //       setRecipyCategoryList(res.result);
  //     },
  //     failed: () => { },
  //   });
  // }, []);
  // const GetAllCelebrationDay = useCallback(() => {
  //   http.get({
  //     url: getEventList,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       SetCelebrationDay(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);

  // const getCelebrationList = useCallback(() => {
  //   http.get({
  //     url: getUpComingCelebrations,
  //     before: () => { },
  //     successed: (res) => {
  //       setCelebrationList(res);
  //     },
  //     failed: () => { },
  //   });
  // }, []);
  useEffect(() => {
    // GetAllCelebrationDay();
    // getCelebrationList();
    // getRecipyCatgry();
  }, []);

  // const getCollectionList = useCallback(() => {
  //   http.get({
  //     url: collectionList,
  //     before: () => { },
  //     successed: (res) => {
  //       setCollectionListData(res.result);
  //     },
  //     failed: () => { },
  //   });
  // }, []);
  // useEffect(() => {
  //   getCollectionList();
  // }, []);

  // ===================================================================================
  const handleRedirect = (url) => {
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
    router.push(url)
  }
  return (
    <section id="sidebar" className="shadow-sm">
      <nav className="sidebar">
        <div className="sidebar-top">
          <div class="threelink-flex">
            <div class="box">
              <Link href={`/bekary`}>
                <a>
                  <img
                    src="../assets/images/icon/restaurant.png"
                    alt=""
                    class="img-fluid"
                  />
                  <span class="title">restaurent</span>
                </a>
              </Link>
            </div>
            <div class="box">
              <Link href={`/brand-shop`}>
                <a>
                  <img
                    src="../assets/images/icon/shopping-bag.png"
                    alt=""
                    class="img-fluid"
                  />
                  <span class="title">brand shop</span>
                </a>
              </Link>
            </div>
            <div class="box">
              <Link href={`/bulkSale`}>
                <a>
                  <img
                    src="../assets/images/icon/wholesale.png"
                    alt=""
                    class="img-fluid"
                  />
                  <span class="title">bulk sale</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="nav-header">
            <h3>
              {/*<Link href="/shop?essential=1">monthly essential items</Link>*/}
              <div  onClick={(e) => clickDepartment1(
                  e,
                  "/shop?essential=1",
                  "monthly essential",
                  "/shop?essential=1",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  ""
              )}>monthly essential items</div>
            </h3>
          </div>
        </div>

        <div className="sidebar-body">
          {settingType?.value == "dept" && (
            <ul className="nav flex-column " id="nav_accordion" ref={ref}>
              {departments &&
                departments.length > 0 &&
                departments.map((department) => {
                  return (
                    <li className="nav-item has-submenu" key={department.id}>
                      <a
                        onClick={(e) => clickDepartment1(
                          e,
                          "/shop?dept_id=" + department.id,
                          department.name,
                          department.id,
                          "",
                          "",
                          "",
                          "",
                          "",
                          "",
                          "",
                          ""
                        )}
                        className={
                          department.name != ""
                            ? `nav-link parent-link`
                            : `nav-link`
                        }
                        href
                      >
                        <img src={department.icon} alt="" class="img-fluid" />

                        {department.name}
                      </a>

                      <ul className="submenu collapse">
                        {department.categories.length > 0 &&
                          department.categories.map((category) => {
                            return (
                              <li className="has-submenu" key={category.name}>
                                <a
                                  onClick={(e) => clickDepartment1(
                                    e,
                                    "/shop?cat_id=" + category.id,
                                    department.name,
                                    department.id,
                                    category.name,
                                    category.id,
                                    "",
                                    "",
                                    "",
                                    "",
                                    "",
                                    ""
                                  )}
                                  className={
                                    category.children.length > 0
                                      ? `nav-link parent-link`
                                      : `nav-link`
                                  }
                                  href="#"
                                >
                                  {category.name}{" "}
                                </a>
                                <ul className="submenu collapse ">
                                  {category.children.length > 0 &&
                                    category.children.map((children) => {
                                      return (
                                        <li
                                          className="has-submenu"
                                          key={children.name}
                                        >
                                          <a
                                            onClick={(e) => clickDepartment1(
                                                e,
                                              "/shop?cat_id=" + children.id,
                                              department.name,
                                              department.id,
                                              category.name,
                                              category.id,
                                              children.name,
                                              children.id,
                                              "",
                                              "",
                                              "",
                                              ""
                                            )}
                                            className={
                                              children?.children.length > 0
                                                ? `nav-link parent-link`
                                                : `nav-link`
                                            }
                                            href="#"
                                          >
                                            {children.name}{" "}
                                          </a>
                                          <ul className="submenu collapse">
                                            {children?.children.length > 0 &&
                                              children?.children.map(
                                                (children1) => {
                                                  return (
                                                    <li key={children1.name}>
                                                      <a
                                                        onClick={(e) => clickDepartment1(
                                                          e,
                                                          "/shop?cat_id=" +
                                                          children1.id,
                                                          department.name,
                                                          department.id,
                                                          category.name,
                                                          category.id,
                                                          children.name,
                                                          children.id,
                                                          children1.name,
                                                          children1.id,
                                                          "",
                                                          ""
                                                        )}
                                                        className="nav-link"
                                                        href="#"
                                                      >
                                                        {children1.name}{" "}
                                                      </a>
                                                    </li>
                                                  );
                                                }
                                              )}
                                          </ul>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          )}
          {settingType?.value == "dept_group" && (
            <ul className="nav flex-column " id="nav_accordion" ref={ref}>
              {Allmenu[0]?.dept_group.data &&
                Allmenu[0]?.dept_group.data.length > 0 &&
                Allmenu[0]?.dept_group.data.map((group) => {
                  return (
                    <li className="nav-item has-submenu" key={group.id}>
                      <a
                        onClick={(e) => clickDepartment1(
                          e,
                          "/shop?group_id=" + group.id,
                          group.name,
                          group.id,
                          "",
                          "",
                          "",
                          "",
                          "",
                          "",
                          "",
                          ""
                        )}
                        className={
                          group.name != "" ? `nav-link parent-link` : `nav-link`
                        }
                        href
                      >
                        {group.name}
                      </a>

                      <ul className="submenu collapse">
                        {group.departments.data.length > 0 &&
                          group.departments.data.map((department) => {
                            return (
                              <li className="has-submenu" key={department.name}>
                                <a
                                  onClick={(e) => clickDepartment1(
                                    e,
                                    "/shop?dept_id=" + group.id,
                                    group.name,
                                    group.id,
                                    department.name,
                                    department.id,
                                    "",
                                    "",
                                    "",
                                    "",
                                    "",
                                    ""
                                  )}
                                  className={
                                    department.categories.length > 0
                                      ? `nav-link parent-link`
                                      : `nav-link`
                                  }
                                  href="#"
                                >
                                  {department.name}{" "}
                                </a>
                                <ul className="submenu collapse ">
                                  {department.categories.length > 0 &&
                                    department.categories.map((children) => {
                                      return (
                                        <li
                                          className="has-submenu"
                                          key={children.name}
                                        >
                                          <a
                                            onClick={(e) => clickDepartment1(
                                              e,
                                              "/shop?cat_id=" + children.id,
                                              group.name,
                                              group.id,
                                              department.name,
                                              department.id,
                                              children.name,
                                              children.id,
                                              "",
                                              "",
                                              "",
                                              ""
                                            )}
                                            className={
                                              children?.children.length > 0
                                                ? `nav-link parent-link`
                                                : `nav-link`
                                            }
                                            href="#"
                                          >
                                            {children.name}{" "}
                                          </a>
                                          <ul className="submenu collapse">
                                            {children?.children.length > 0 &&
                                              children?.children.map(
                                                (children1) => {
                                                  return (
                                                    <li key={children1.name}>
                                                      <a
                                                        onClick={(e) => clickDepartment1(
                                                          e,
                                                          "/shop?cat_id=" +
                                                          children1.id,
                                                          group.name,
                                                          group.id,
                                                          department.name,
                                                          department.id,
                                                          children.name,
                                                          children.id,
                                                          children1.name,
                                                          children1.id,
                                                          "",
                                                          ""
                                                        )}
                                                        className={
                                                          children1?.children
                                                            .length > 0
                                                            ? `nav-link parent-link`
                                                            : `nav-link`
                                                        }
                                                        href="#"
                                                      >
                                                        {children1.name}{" "}
                                                      </a>
                                                      <ul className="submenu collapse">
                                                        {children1?.children
                                                          .length > 0 &&
                                                          children1?.children.map(
                                                            (children2) => {
                                                              return (
                                                                <li
                                                                  key={
                                                                    children2.name
                                                                  }
                                                                >
                                                                  <a
                                                                    onClick={(e) => clickDepartment1(
                                                                      e,
                                                                      "/shop?cat_id=" +
                                                                      children1.id,
                                                                      group.name,
                                                                      group.id,
                                                                      department.name,
                                                                      department.id,
                                                                      children.name,
                                                                      children.id,
                                                                      children1.name,
                                                                      children1.id,
                                                                      children2.name,
                                                                      children2.id
                                                                    )}
                                                                    className="nav-link"
                                                                    href="#"
                                                                  >
                                                                    {
                                                                      children2.name
                                                                    }{" "}
                                                                  </a>
                                                                </li>
                                                              );
                                                            }
                                                          )}
                                                      </ul>
                                                    </li>
                                                  );
                                                }
                                              )}
                                          </ul>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          )}
          <ul className="nav flex-column " id="nav_accordion" ref={ref}>
            {Allmenu[0]?.parent_menu &&
              Allmenu[0]?.parent_menu.length > 0 &&
              Allmenu[0]?.parent_menu.map((mainCat) => {
                return (
                  <li className="nav-item has-submenu" key={mainCat.id}>
                    <a
                      onClick={clickDepartment1.bind(
                        null,
                        "/shop?cat_id=" + mainCat.id,
                        mainCat.name,
                        mainCat.id,
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                      )}
                      className={
                        mainCat.name != "" ? `nav-link parent-link` : `nav-link`
                      }
                      href
                    >
                      {mainCat.name}
                    </a>
                  </li>
                );
              })}
          </ul>
          <Menu />
          <ul class="nav flex-column main-header-menu-mobile" id="nav_accordion">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Shop By Brands
              </a>
            </li>
            <li class="nav-item has-submenu">
              <a class="nav-link parent-link" href="#">
                Membership
              </a>
              <ul class="submenu collapse">
                <li>
                  <Link href="/membership" as={`/membership`}>
                    <a class="dropdown-item nav-link"> join wholesale club </a>
                  </Link>
                </li>
                <li>
                  <Link href="/membership/register" as={`/membership/register`}>
                    <a class="dropdown-item nav-link">
                      {" "}
                      register your membership{" "}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/membership/renew" as={`/membership/renew`}>
                    <a class="dropdown-item nav-link"> renew your membership </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supplier-registration"
                    as={`/supplier-registration`}
                  >
                    <a class="dropdown-item nav-link">
                      {" "}
                      wholesale club suppliers{" "}
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-submenu">
              <a class="nav-link parent-link" href="#">
                Offers
              </a>
              <ul class="submenu collapse">
                {getCookieInfo && (
                  <li>
                    <Link href={"/coupons"}>
                      <a className="dropdown-item nav-link"> coupon</a>
                    </Link>
                  </li>
                )}

                <li>
                  <Link href={"/offer"}>
                    <a className="dropdown-item nav-link">All Offers Items</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/offer/peak-of-peak"}>
                    <a className="dropdown-item nav-link">Peak off peak</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/offer/package"}>
                    <a className="dropdown-item nav-link">Package Offers</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/coupons"}>
                    <a className="dropdown-item nav-link">Daily Deals</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/coupons"}>
                    <a className="dropdown-item nav-link">Flash Sale</a>
                  </Link>
                </li>

                {collectionListData.map((item) => (
                  <li>
                    <Link href="/offer/[id]" as={`/offer/${item?.id}`}>
                      <a className="dropdown-item nav-link">{item.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li class="nav-item has-submenu">
              <a class="nav-link parent-link" href="#">
                recipes
              </a>
              <ul class="submenu collapse">
                <li>
                  <Link href="/recipe">
                    <a class="dropdown-item nav-link"> all Categories </a>
                  </Link>
                </li>
                <li>
                  <Link href="/recipe">
                    <a class="dropdown-item nav-link"> all recipe category </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-submenu">
              <a class="nav-link parent-link" href="#">
                celebration Day
              </a>
              <ul class="submenu collapse">
                {celebrationList != undefined && celebrationList?.length > 0 && (
                  <>
                    <h6 className="dropdown-item-title">
                      Upcoming Celebration Day
                    </h6>
                    {celebrationList.map((item) => (
                      <li>
                        <Link href={`/celebration?id=` + item.id}>
                          <a class="dropdown-item nav-link">{item.event_title}</a>
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
                            <a class="dropdown-item nav-link">
                              {day.event_title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                )}

                {celebrationDay && celebrationDay.length > 0 && (
                  <>
                    <h6 className="dropdown-item-title">More Days</h6>
                    {celebrationDay.map((day) => {
                      return (
                        <li key={day.id}>
                          <Link href={`/celebration?id=` + day.id}>
                            <a class="dropdown-item nav-link">
                              {day.event_title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </li>
            <li class="nav-item has-submenu">
              <a class="nav-link parent-link" href="#">
                more
              </a>
              <ul class="submenu collapse">
                <li>
                  <Link href={"/wishlist"}>
                    <a className="dropdown-item nav-link" href>
                      {" "}
                      wishlist
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/compare"}>
                    <a className="dropdown-item nav-link" href="#">
                      {" "}
                      compare{" "}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/bekary`}>
                    <a className="dropdown-item nav-link"> restaurent</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/all-brand"}>
                    <a className="dropdown-item nav-link" href="#">
                      {" "}
                      brand shop
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/bulkSale"}>
                    <a className="dropdown-item nav-link" href="#">
                      {" "}
                      bulk sale
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/career" as={`/career`}>
                    <a class="dropdown-item nav-link"> career </a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sidebar-bottom">

            <div className="nav-header">
              {/* <h3>Product Request</h3> */}
              <button className="btn product-request-btn" onClick={OpenModal}>
                Product Request
              </button>
              {/* <a className="product-request-btn" onClick={OpenModal}>Product Request</a> */}
            </div>

        </div>
      </nav>
      {departments?.length > 0 && <SidebarJS />}

      {ctxAuth.isLoggedIn ? <ProductRequestModal /> : ""}
    </section>
   
  );
};
Sidebar.getInitialProps = function (ctx) {
  initialize(ctx);
};

export default connect((state) => state)(Sidebar);
