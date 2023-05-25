import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../services/httpService";
import { getAllProduct, postReqStock, stockDelete } from "../lib/endpoints";

const RequestCartProduct = ({ item }) => {
  const ctxAuth = useSelector((store) => store.authReducerContext);
  const dispatch = useDispatch();
  console.log({ item }, "requ");
  const [product, setProduct] = useState({});
  const [productPrice, setProductPrice] = useState();
  const getProductDetails = useCallback((id) => {
    http.get({
      url: getAllProduct + id,
      before: () => {},
      successed: (res) => {
        console.log("otest", { res });
        setProduct(res);
        if (res[0]?.is_variant == 1) {
          const findProduct = res[0].variant?.find(
            (item2) => item2.barcode == item.barcode
          );
          if (findProduct.base_discounted_price > 0) {
            setProductPrice(findProduct.base_discounted_price);
          } else {
            setProductPrice(findProduct.base_price);
          }
          console.log({ findProduct });
          //setProductPrice(findProduct.price);
        } else {
          if (res[0].base_discounted_price > 0) {
            setProductPrice(res[0].base_discounted_price);
          } else {
            setProductPrice(res[0].base_price);
          }
        }
      },
      failed: () => {},
    });
  }, []);
  useEffect(() => {
    getProductDetails(item.id);
  }, []);
  const dispatchUpdateReqStockQty = (res) => {
    dispatch({
      type: "UPDATE_REQUEST_ITEM",
      item: {
        id: res.product_id,
        quantity: res.quantity_count,
        barcode: res.barcode,
        variant: res.variant,
        stock_id: res.id,
      },
    });
  };
  const stockIncHandler = () => {
    postRequestQty(
      item,
      item.quantity + 1,
      dispatchUpdateReqStockQty,
      item.variant
    );
  };
  const stockDecHandler = () => {
    if (item.quantity - 1 == 0) {
      const res = {
        product_id: item.id,
        quantity_count: 0,
        barcode: item.barcode,
        variant: item.variant,
      };
      dispatchUpdateReqStockQty(res);
      http.get({
        url: stockDelete + item.stock_id,
        before: () => {},
        successed: () => {},
        failed: () => {},
      });
    } else {
      postRequestQty(
        item,
        item.quantity - 1,
        dispatchUpdateReqStockQty,
        item.variant
      );
    }
  };
  const stockDeleteHandler = () => {
    const res = {
      product_id: item.id,
      quantity_count: 0,
      barcode: item.barcode,
      variant: item.variant,
    };
    dispatchUpdateReqStockQty(res);
    http.get({
      url: stockDelete + item.stock_id,
      before: () => {},
      successed: () => {},
      failed: () => {},
    });
  };
  const postRequestQty = (item2, qty, funcCall, variant) => {
    http.file({
      url: postReqStock,
      payload: {
        user_id: ctxAuth.user.user.id,
        product_id: item2.id,
        variant: variant,
        quantity: qty,
      },
      before: () => {},
      successed: (res) => {
        funcCall(res);
        // setStockQty(res.quantity_count);
        // if (res.quantity_count > 0) setVisibleStockBox(true);
        // else {
        //   setVisibleStockBox(false);
        // }
      },
      failed: (res) => {},
    });
  };
  return (
    <div className="short-cart-main">
      <div className="qty-box">
        <form>
          <a href type="button" className="minus-btn" onClick={stockDecHandler}>
            -
          </a>
          <input
            type="text"
            className="form-control"
            id="number"
            value={item.quantity}
          />
          <a href type="button" className="plus-btn" onClick={stockIncHandler}>
            +
          </a>
        </form>
      </div>
      <div className="product-image">
        <img src="" alt="" className="img-fluid" />
      </div>
      <div className="product-description">
        <h5 className="prodcut-title">
          <a href="#" target="_blank">
            {product[0]?.name}
          </a>
        </h5>
        <h6 className="price">{productPrice}</h6>
      </div>
      <a className="delete-product" href>
        <i className="icofont-trash" onClick={stockDeleteHandler}></i>
      </a>
    </div>
  );
};

export default RequestCartProduct;
