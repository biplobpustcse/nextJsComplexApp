import { connect, useDispatch, useSelector } from "react-redux";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions/categoryAction";
import ShortCartMain from "../cart/ShortCartMain";

import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getCategories } from "../lib/endpoints";
import { useRouter } from "next/router";
import { Select2JS } from "../../utils/slider";
import { categoryShopDataConverter } from "../../services/dataService";
import Link from "next/link";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";

//{ appName, isAuthenticated, deauthenticate }
const TopHeader = (props) => {
  const store = useSelector((state) => state.authReducerContext);
  console.log("store: ", store);
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, pathname } = useRouter();
  const getCookieInfo = getCookie("auth");

  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategoriesData] = useState([]);
  const [selectCategory, setSelectCategory] = useState();

  const goToLoginHandler = (e) => {
    e.preventDefault();
    router.push("/auth");
  };
  const goToReorderHandler = () => {
    if (getCookieInfo) {
      router.push("/purchaseHistory");
    } else {
      router.push("/auth");
    }
  };
  const gotoMonthlyHandler = () => {
    if (getCookieInfo) {
      router.push("/bazarlist");
    } else {
      router.push("/auth");
    }
  };
  const goToProfileHandler = () => {
    router.push("/dashboard");
  };

  const goToMyItemHandler = () => {
    if (getCookieInfo) {
      router.push("/purchase-items");
    } else {
      router.push("/auth");
    }
  };
  const getCookieInfoSupplier = getCookie("supplier");
  const logoutHandler = (e) => {
    e.preventDefault();
    deleteCookie("auth");
    if (getCookieInfoSupplier) {
      deleteCookie("supplier");
    }
    dispatch({ type: "CLEAR_QUOTE_LIST" });
    dispatch({ type: "CLEAR_REQUEST_LIST" });
    dispatch({ type: "USER_LOGOUT" });
    dispatch({ type: "CLEAR_CART_ITEMS" });
    dispatch({ type: "REMOVE_SERVER_CART_COLLECTION" });

    router.push("/");
  };
  console.log({ store });

  const gotoCheckoutHandler = () => {
    if (store.isLoggedIn == true) {
      if (getCartContext.Items.length > 0) {
        router.push("/checkout");
      } else {
        toast.error("Buy Some First");
      }
    } else {
      toast.error("Login First.");
      router.push("/auth");
    }
  };
  const GetAllCategories = useCallback(() => {
    http.get({
      url: getCategories + `?parent_id=0`,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setCategoriesData(res);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  useEffect(() => {
    GetAllCategories();
  }, [GetAllCategories]);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "/assets/js/reactCustom.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);
  useEffect(() => {
    let s = $(".editPhoneLocationSelect");
    s.select2({
      placeholder: "Select an option",
      allowClear: true,
    });
    s.on("change", handleSelect);
  }, []);
  let [search, setSearch] = useState("");
  const handleSearch = ({ target }) => {
    if (target.value != "" || target.value != null) {
      // setTimeout(() => {
      if (router.pathname != "/shop") {
        router.push({
          pathname: "/shop",
          query: { search: target.value },
        });
      } else {
        router.push(
          {
            pathname: "/shop",
            query: { search: target.value },
          },
          undefined,
          { shallow: true }
        );
      }
      setSearch(target.value);
      // }, [2500]);
    }
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: "shop",
        link1: target.value,
        name2: "",
        link2: "",
        name3: "",
        link3: "",
        name4: "",
        link4: "",
        name5: "",
        id5: "",
      },
    });
  };

  const handleSelect = (e) => {
    console.log("select", e.target.value);
    //setSelectCategory(e.target.value)
    setTimeout(() => {
      router.push({
        pathname: "/shop",
        query: { ...query, cat_id: e.target.value },
      });
    }, [1500]);
  };

  const list =
    categories.length > 0 &&
    categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  useEffect(() => {
    if (pathname != "/shop") {
      setSearch('');
    }
  }, [query]);
  return (
    <section className="header-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          {/* <Link href={"/"}>
            <a className="navbar-brand" href>
              <img
                src="../assets/images/logo.png"
                alt=""
                className="img-fluid"
              />
            </a>
          </Link> */}

          {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}

          {/* <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <span class="navbar-toggler-icon"></span>
          </button> */}

          <div className="row g-0 align-items-center">
            {/* <div className="row g-0 align-items-center offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"> */}
            <div className=" col-md-4 col-lg-2 me-auto">
              <div className="d-lg-flex" id="logoClick">
                <Link href={"/"} as={"/"}>
                  <a className="navbar-brand" href>
                    <img
                      src="../assets/images/logo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </Link>
                {/* <Link href="/" as={`/`}>
                  <a className="navbar-brand">
                    <img
                      src="../assets/images/logo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </Link> */}
              </div>
            </div>
            <div className=" col-md-8 col-lg-10 position-static">
              <div className="d-lg-flex align-items-center w-100">
                <div className="search-box flex-grow-1 px-4 d-lg-block">
                  <form action="">
                    <div className="d-flex position-relative">
                      <div className="w-100">
                        <input
                          className="form-control main-search w-100"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                          onChange={handleSearch}
                          value={search}
                        />
                      </div>
                      <div className="catagory-lists-select">
                        <SimpleBar style={{ maxHeight: 300 }}>
                          <select
                            className="form-control select2 editPhoneLocationSelect"
                            onClick={(e) => handleSelect(e)}
                            value={selectCategory}
                          >
                            <option value="0">All catagories</option>
                            {list}
                          </select>
                        </SimpleBar>
                        {/* <select
                          className="form-control select2 editPhoneLocationSelect"
                          onClick={(e) => handleSelect(e)}
                          value={selectCategory}
                        >
                          <option value="0">All catagories</option>
                          {list}
                        </select> */}
                        {/* <Select options={optionData} /> */}
                      </div>
                      <button className="btn btn-success" type="submit">
                        <i className="fas fa-search"> </i>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="d-lg-flex align-items-center">
                  <ul className="navbar-nav topsocial-nav inline-links flex-row">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <img src="../assets/images/icon/facebook.svg" alt="" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        {" "}
                        <img
                          src="../assets/images/icon/instagram.svg"
                          alt=""
                        />{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <img src="../assets/images/icon/youtube.svg" alt="" />
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav topcart-nav flex-row">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <img src="../assets/images/icon/reorder.svg" alt="" />
                        reorder
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end fade-down">
                        <li>
                          <a
                            className="dropdown-item"
                            href
                            onClick={goToMyItemHandler}
                          >
                            {" "}
                            My Items
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href
                            onClick={goToReorderHandler}
                          >
                            {" "}
                            reorder
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href
                            onClick={gotoMonthlyHandler}
                          >
                            {" "}
                            monthly list
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <ul className="dropdown-menu dropdown-menu-end fade-down">
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/wishlist"}>
                              <a className="dropdown-item" href>
                                wishlists
                              </a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <img src="../assets/images/icon/cart.svg" alt="" />
                        cart
                        <span>{getCartContext.Items.length}</span>
                      </a>

                      {getCartContext.Items.length > 0 &&
                        router.pathname != "/checkout" && <ShortCartMain />}
                    </li>
                    <li className="nav-item dropdown">
                      {getCookieInfo && (
                        <a
                          className="nav-link dropdown-toggle"
                          href
                          data-bs-toggle="dropdown"
                          onClick={goToProfileHandler}
                        >
                          <div>
                            <img src="../assets/images/icon/user.svg" alt="" />
                            {store?.user?.user?.name}
                          </div>
                        </a>
                      )}
                      {!getCookieInfo && (
                        <a
                          className="nav-link dropdown-toggle"
                          href
                          data-bs-toggle="dropdown"
                          onClick={goToLoginHandler}
                        >
                          <img src="../assets/images/icon/user.svg" alt="" />
                          Login
                        </a>
                      )}
                      {store.isLoggedIn && (
                        <ul className="dropdown-menu dropdown-menu-end fade-down">
                          {store.isLoggedIn && (
                            <li>
                              <Link href="/dashboard">
                                <a className="dropdown-item" href="#">
                                  {" "}
                                  dashboard
                                </a>
                                {/* hello */}
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <a className="dropdown-item" href="#">
                                {" "}
                                notification{" "}
                              </a>
                            </li>
                          )}

                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/profile"}>
                                <a className="dropdown-item" href="#">
                                  {" "}
                                  profile
                                </a>
                              </Link>
                            </li>
                          )}
                          {/* {store.isLoggedIn && (
                        <li>
                          <Link href={"/orders"}>
                            <a className="dropdown-item" href="#">
                              {" "}
                              orders
                            </a>
                          </Link>
                        </li>
                      )} */}

                          {/* <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          download
                        </a>
                      </li> */}

                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/coupons"}>
                                <a className="dropdown-item" href="#">
                                  {" "}
                                  broucher/coupon
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/shipping"}>
                                <a className="dropdown-item" href="#">
                                  {" "}
                                  address
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/wishlist"}>
                                <a className="dropdown-item" href="#">
                                  {" "}
                                  wishlist
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/compare"}>
                                <a className="dropdown-item" href>
                                  {" "}
                                  compare
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/bazarlist"}>
                                <a className="dropdown-item" href>
                                  {" "}
                                  bazar list
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/membership"}>
                                <a className="dropdown-item" href>
                                  {" "}
                                  membership
                                </a>
                              </Link>
                            </li>
                          )}
                          {store.isLoggedIn == true && (
                            <li>
                              <a
                                className="dropdown-item"
                                href
                                onClick={gotoCheckoutHandler}
                              >
                                {" "}
                                Checkout
                              </a>
                            </li>
                          )}
                          {store.isLoggedIn && (
                            <li>
                              <Link href={"/password"}>
                                <a className="dropdown-item" href>
                                  {" "}
                                  password change
                                </a>
                              </Link>
                            </li>
                          )}

                          {store.isLoggedIn == true && (
                            <li>
                              <a
                                className="dropdown-item"
                                href
                                onClick={logoutHandler}
                              >
                                logout
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-0 align-items-center d-none">
            <div className=" col-md-4 col-lg-2 ">
              <div className="d-flex" id="logoClick">
                <Link href={"/"}>
                  <a className="navbar-brand" href>
                    <img
                      src="../assets/images/logo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </Link>
                {/* <Link href="/" as={`/`}>
                  <a className="navbar-brand">
                    <img
                      src="../assets/images/logo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </Link> */}
              </div>
            </div>
            <div className=" col-md-8 col-lg-10 position-static">
              <div className="d-flex w-100">
                <div className="search-box flex-grow-1 px-4 d-lg-block">
                  <form action="">
                    <div className="d-flex position-relative">
                      <div className="w-100">
                        <input
                          className="form-control main-search w-100"
                          type="search"
                          placeholder="I am searching for ..."
                          aria-label="Search"
                          onChange={handleSearch}
                        />
                      </div>
                      <div className="catagory-lists-select">
                        <SimpleBar style={{ maxHeight: 300 }}>
                          <select
                            className="form-control select2 editPhoneLocationSelect"
                            onClick={(e) => handleSelect(e)}
                            value={selectCategory}
                          >
                            <option value="0">All catagories</option>
                            {list}
                          </select>
                        </SimpleBar>
                        {/* <select
                          className="form-control select2 editPhoneLocationSelect"
                          onClick={(e) => handleSelect(e)}
                          value={selectCategory}
                        >
                          <option value="0">All catagories</option>
                          {list}
                        </select> */}
                        {/* <Select options={optionData} /> */}
                      </div>
                      <button className="btn btn-success" type="submit">
                        <i className="fas fa-search"> </i>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="d-flex">
                  <ul className="navbar-nav topsocial-nav inline-links flex-row">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <img src="../assets/images/icon/facebook.svg" alt="" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        {" "}
                        <img
                          src="../assets/images/icon/instagram.svg"
                          alt=""
                        />{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <img src="../assets/images/icon/youtube.svg" alt="" />
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav topcart-nav flex-row">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <img src="../assets/images/icon/reorder.svg" alt="" />
                        reorder
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end fade-down">
                        <li>
                          <a
                            className="dropdown-item"
                            href
                            onClick={goToMyItemHandler}
                          >
                            {" "}
                            My Items
                          </a>
                        </li>
                        <li>
                          <Link href={"/purchaseHistory"}>
                            <a className="dropdown-item" href="#">
                              {" "}
                              reorder
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/bazarlist"}>
                            <a className="dropdown-item" href>
                              {" "}
                              monthly list
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <ul className="dropdown-menu dropdown-menu-end fade-down">
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/wishlist"}>
                              <a className="dropdown-item" href>
                                wishlists
                              </a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <img src="../assets/images/icon/cart.svg" alt="" />
                        cart
                      </a>
                      {getCartContext.Items.length > 0 && <ShortCartMain />}
                    </li>
                    <li className="nav-item dropdown">
                      {getCookieInfo && (
                        <a
                          className="nav-link dropdown-toggle"
                          href
                          data-bs-toggle="dropdown"
                          onClick={goToProfileHandler}
                        >
                          <img src="../assets/images/icon/user.svg" alt="" />
                          Profile
                        </a>
                      )}
                      {!getCookieInfo && (
                        <a
                          className="nav-link dropdown-toggle"
                          href
                          data-bs-toggle="dropdown"
                          onClick={goToLoginHandler}
                        >
                          <img src="../assets/images/icon/user.svg" alt="" />
                          Login
                        </a>
                      )}

                      <ul className="dropdown-menu dropdown-menu-end fade-down">
                        {store.isLoggedIn && (
                          <li>
                            <Link href="/dashboard">
                              <a className="dropdown-item" href="#">
                                {" "}
                                dashboard
                              </a>
                              {/* hello */}
                            </Link>
                          </li>
                        )}
                        <li>
                          <a className="dropdown-item" href="#">
                            {" "}
                            notification{" "}
                          </a>
                        </li>

                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/profile"}>
                              <a className="dropdown-item" href="#">
                                {" "}
                                profile
                              </a>
                            </Link>
                          </li>
                        )}
                        {/* {store.isLoggedIn && (
                        <li>
                          <Link href={"/orders"}>
                            <a className="dropdown-item" href="#">
                              {" "}
                              orders
                            </a>
                          </Link>
                        </li>
                      )} */}

                        {/* <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          download
                        </a>
                      </li> */}

                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/coupons"}>
                              <a className="dropdown-item" href="#">
                                {" "}
                                broucher/coupon
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/shipping"}>
                              <a className="dropdown-item" href="#">
                                {" "}
                                address
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/wishlist"}>
                              <a className="dropdown-item" href="#">
                                {" "}
                                wishlist
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/compare"}>
                              <a className="dropdown-item" href>
                                {" "}
                                compare
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/bazarlist"}>
                              <a className="dropdown-item" href>
                                {" "}
                                bazar list
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/membership"}>
                              <a className="dropdown-item" href>
                                {" "}
                                membership
                              </a>
                            </Link>
                          </li>
                        )}
                        {store.isLoggedIn == true && (
                          <li>
                            <a
                              className="dropdown-item"
                              href
                              onClick={gotoCheckoutHandler}
                            >
                              {" "}
                              Checkout
                            </a>
                          </li>
                        )}
                        {store.isLoggedIn && (
                          <li>
                            <Link href={"/password"}>
                              <a className="dropdown-item" href>
                                {" "}
                                password change
                              </a>
                            </Link>
                          </li>
                        )}

                        {store.isLoggedIn == true && (
                          <li>
                            <a
                              className="dropdown-item"
                              href
                              onClick={logoutHandler}
                            >
                              logout
                            </a>
                          </li>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Select2JS />
    </section>
  );
};

TopHeader.getInitialProps = function (ctx) {
  initialize(ctx);
};

export default connect((state) => state, actions)(TopHeader);
