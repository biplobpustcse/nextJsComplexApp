import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const CommonSidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const getCookieInfoSupplier = getCookie("supplier");
  const logoutHandler = () => {
    // deleteCookie("auth");
    // if (getCookieInfoSupplier) {
    //   deleteCookie("supplier");
    // }
    // dispatch({ type: "USER_LOGOUT" });
    // dispatch({ type: "REMOVE_SERVER_CART_COLLECTION" });
    // router.push("/");

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
  console.log({ ctxAuth });
  return (
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
      <div class="profile-sidebar shadow-sm">
        <h2>hello, {ctxAuth.user?.user?.name}</h2>
        <div class="profile-menubox">
          <ul class="nav flex-column">
            <li class="nav-item">
              <Link href={"/dashboard"}>
                <a
                  class={
                    router.pathname == "/dashboard"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-solid fa-bars"></i>
                  <span className="">dashboard</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href={"/profile"}>
                <a
                  class={
                    router.pathname == "/profile"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="far fa-user"></i>
                  <span className="">profile</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href={"/wishlist"}>
                <a
                  class={
                    router.pathname == "/wishlist"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fas fa-heart"></i>
                  <span className="">wishlist</span>
                </a>
              </Link>
            </li>

            <li class="nav-item">
              <Link href={"/shipping"}>
                <a
                  class={
                    router.pathname == "/shipping"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fas fa-map-marker-alt"></i>
                  <span className="">shipping address</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href={"/purchaseHistory"}>
                <a
                  class={
                    router.pathname == "/purchaseHistory"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-solid fa-bag-shopping"></i>
                  <span className="">Purchase History</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href={"/coupons"}>
                <a
                  class={
                    router.pathname == "/coupons"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-sharp fa-solid fa-ticket"></i>
                  <span className="">Coupons</span>
                </a>
              </Link>
            </li>
            {/* <li class="nav-item">
              <Link href={"/orders"}>
                <a
                  class={
                    router.pathname == "/orders"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span className="">Orders</span>
                </a>
              </Link>
            </li> */}

            <li class="nav-item">
              <Link href={"/paymentHistory"}>
                <a
                  class={
                    router.pathname == "/paymentHistory"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-solid fa-credit-card"></i>
                  <span className="">Payment History</span>
                </a>
              </Link>
            </li>

            <li class="nav-item">
              <Link href={"/referral"}>
                <a
                  class={
                    router.pathname == "/referral"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href
                >
                  <i class="fa-solid fa-network-wired"></i>
                  <span className="">Referral</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href={"/password"}>
                <a
                  class={
                    router.pathname == "/password"
                      ? `nav-link active`
                      : `nav-link`
                  }
                  href=""
                >
                  <i class="fas fa-unlock-alt"></i>
                  <span className="">change password</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href onClick={logoutHandler}>
                <i class="fas fa-power-off"></i>
                <span className="">logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonSidebar;
