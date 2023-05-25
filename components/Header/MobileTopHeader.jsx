import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { getCategories } from "../lib/endpoints";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function MobileTopHeader() {
  const store = useSelector((state) => state.authReducerContext);
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const getCookieInfo = getCookie("auth");

  // const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategoriesData] = useState([]);
  // const [selectCategory, setSelectCategory] = useState();

  const goToLoginHandler = (e) => {
    e.preventDefault();
    router.push("/auth");
  };
  const getCookieInfoSupplier = getCookie("supplier");

  const goToProfileHandler = () => {
    router.push("/profile");
  };

  // const goToMyItemHandler = () => {
  //     if (getCookieInfo) {
  //         router.push("/purchase-items");
  //     } else {
  //         router.push("/auth");
  //     }
  // };

  const logoutHandler = (e) => {
    e.preventDefault();
    deleteCookie("auth");
    if (getCookieInfoSupplier) {
      deleteCookie("supplier");
    }
    dispatch({ type: "CLEAR_QUOTE_LIST" });
    dispatch({ type: "CLEAR_REQUEST_LIST" });
    dispatch({ type: "USER_LOGOUT" });
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

  // const handleSearch = (e) => {
  // if (e.target.value != null) {
  // router.push({
  // pathname: "/shop",
  // query: { ...query, search: e.target.value },
  // });

  //  if(selectCategory!=""){

  //  }
  //  else{
  //   router.push({ pathname: "/shop", query: { search: e.target.value } });

  //  }
  // }
  // };

  const handleSelect = (e) => {
    console.log("select", e.target.value);
    //setSelectCategory(e.target.value)
    router.push({
      pathname: "/shop",
      query: { ...query, cat_id: e.target.value },
    });
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

  return (
    <section className="header-top-mobile">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <button
          className="offcanvas-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <i class="fa-solid fa-bars"></i>
        </button>

        <div className="container-fluid justify-content-center">
          <div className="row g-0 align-items-center">
            <div className=" col-md-12 m-auto">
              <div className="d-flex justify-content-center" id="logoClick">
                <Link href={"/"}>
                  <a className="navbar-brand">
                    <img
                      src="../assets/images/logo.png"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav class="navbar topsocial-nav">
        <div class="container-fluid">
          <div class="d-flex w-100">
            <ul class="navbar-nav topcart-nav">
              <li className="nav-item dropdown">
                {getCookieInfo && (
                  <a
                    className="nav-link dropdown-toggle"
                    href
                    data-bs-toggle="dropdown"
                    // onClick={goToProfileHandler}
                  >
                    <img src="../assets/images/icon/user.svg" alt="" />
                    {/* Profile */}
                  </a>
                )}

                {!getCookieInfo && (
                  <a
                    className="nav-link dropdown-toggle"
                    href
                    data-bs-toggle="dropdown"
                    // onClick={goToLoginHandler}
                  >
                    <img src="../assets/images/icon/user.svg" alt="" />
                  </a>
                )}

                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  {getCookieInfo && (
                    <a
                      className="dropdown-item"
                      href
                      data-bs-toggle="dropdown"
                      onClick={goToProfileHandler}
                    >
                      {/* <img src="../assets/images/icon/user.svg" alt="" /> */}
                      Profile
                    </a>
                  )}
                  {!getCookieInfo && (
                    <a
                      className="dropdown-item"
                      href
                      data-bs-toggle="dropdown"
                      onClick={goToLoginHandler}
                    >
                      Login
                    </a>
                  )}
                  {store.isLoggedIn && (
                    <li>
                      <Link href="/dashboard">
                        <a className="dropdown-item" href="#">
                          {" "}
                          dashboard
                        </a>
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

                  {store.isLoggedIn && (
                    <li>
                      <Link href={"/coupons"}>
                        <a className="dropdown-item" href="#">
                          {" "}
                          voucher/coupon
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
                      <Link href={"/wishlist"} >
                        <a className="dropdown-item" href>
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

                  <li>
                    <Link href={"/membership"}>
                      <a className="dropdown-item" href>
                        {" "}
                        membership
                      </a>
                    </Link>
                  </li>

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
                      <a className="dropdown-item" href onClick={logoutHandler}>
                        logout
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                </button> */}
        <div className="shadow-sm">
          <Sidebar />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </section>
  );
}
