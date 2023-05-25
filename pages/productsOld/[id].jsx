import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions/productAction";
import Layout from "../../components/Layout";
import { Component } from "react";

import { compose } from "redux";
import addtocart from "../../redux/actions/cart";

import React, { useEffect, useState } from "react";

import { withRouter } from "next/router";

function ProductDetails(props) {
  useEffect(() => {
    props.productById(props.router.query.id);
  }, []);
  let product = props.products.product;
  console.log(product);
  let productDetails;

  if (Object.keys(product).length !== 0) {
    productDetails = (
      <div className="row">
        <div className="col-4">
          <img
            data-image="red"
            style={{ width: 250, height: 300 }}
            className="active"
            src={product.image}
            alt=""
          />
        </div>

        <div className="col-8">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>

          <div className="product-configuration">
            <div className="cable-config">
              <span>Cable configuration</span>

              <div className="cable-choose">
                <button>Straight</button>
                <button>Coiled</button>
                <button>Long-coiled</button>
              </div>

              <a href="#">How to configurate your headphones</a>
            </div>
          </div>

          <div className="product-price">
            <span>{product.price}$</span>
            <a href="#" className="cart-btn">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    );
  }
  // else{
  //     productDetails=<div><p>NO Products Found.</p></div>
  // }
  return (
    <Layout title="products">
      <div className="profile-page">
        <div className="container">{productDetails}</div>
      </div>
    </Layout>
  );
}

ProductDetails.getInitialProps = function (ctx) {
  initialize(ctx);
};
export default compose(
  withRouter,
  connect((state) => state, actions)
)(ProductDetails);
// export default connect(state => state, actions)(ProductDetails);
