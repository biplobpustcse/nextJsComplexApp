import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import { getAllProduct, removeWishItem } from "../lib/endpoints";
import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { productDataConverter } from "../../services/dataService";

const Wishlist = () => {
  const ctxWish = useSelector((store) => store.wishReducerContext);
  const ctxAuth = useSelector((store) => store.authReducerContext);

  let [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const wishListRemoveHandler = (item, evt) => {
    evt.preventDefault();
    http.get({
      url:
        removeWishItem +
        `product_id=${item.id}&user_id=${ctxAuth.user.user.id}`,
      before: () => {},
      successed: (res) => {
        dispatch({ type: "REMOVE_WISH_ITEM", item: item });
      },
      failed: () => {},
    });
     let wishLists = localStorage.getItem("wishList")
       ? JSON.parse(localStorage.getItem("wishList"))
      : [];
    setProducts(wishLists);
  };

  function openModal(item, evt) {
    evt.preventDefault();
    dispatch({
      type: "removeViewProduct",
      payload: {},
    });
    console.log("item", item);
    getViewProductInfo(item);
  }

  const getViewProductInfo = useCallback((item) => {
    http.get({
      url: getAllProduct + item.id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setIsLoading(false);
        dispatch({
          type: "setViewProduct",
          payload: res,
        });
      },
      failed: () => {},
    });
  }, []);
  useEffect(() => {
    
    console.log("ctxWish", ctxWish);
    let wishLists = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : [];
    // if (wishLists && wishLists.length > 0) {
    //   let wishListIds = [];
    //   wishLists.map((item) => {
    //     wishListIds.push(item.id);
    //   });
      //console.log("wishListIds", encodeURIComponent(wishListIds));
      setProducts(wishLists);
      // http.get({
      //   url: `products?product_ids=${encodeURIComponent(wishListIds)}`,
      //   before: () => {
      //     setIsLoading(true);
      //   },
      //   successed: (res) => {
      //     setIsLoading(false);
      //     // setProducts(res);
         
      //   },
      //   failed: () => {},
      // });
    // }
  }, [ctxWish]);

  return (
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
      <div class="order-information-main">
        <form action="" class="">
          <div class="common-fieldset-main">
            <fieldset class="common-fieldset">
              <legend class="rounded">
                <i class="fas fa-heart me-2"></i>
                wishlist
              </legend>
              <div class="table-responsive wishlist">
                <table class="table">
                  <thead>
                    <tr class="">
                      <td>Product Name</td>
                      <td class="text-center">Image</td>
                      <td class="text-center">Price</td>
                      <td class="text-center">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((item) => (
                        <tr>
                          <td>
                            <Link
                              href={"/product/[id]"}
                              as={"/product/" + item.id}
                            >
                              <a
                                style={{ color: "#004a96", cursor: "pointer" }}
                              >
                                {item.name}
                              </a>
                            </Link>
                          </td>
                          <td class="text-center">
                            <img
                              src={item.thumbnail_image}
                              alt=""
                              height="70"
                            />
                          </td>
                          <td class="text-center">{item.base_price} ৳</td>
                          <td class="text-center">
                            <a
                              href
                              class=""
                              data-bs-toggle="modal"
                              data-bs-target="#quickviewModal"
                              onClick={() => openModal.bind(this, item)}
                            >
                              <i class="far fa-eye"></i>
                            </a>
                            <a
                              href
                              class="text-danger"
                              onClick={wishListRemoveHandler.bind(this, item)}
                            >
                              <i class="fas fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Wishlist;
