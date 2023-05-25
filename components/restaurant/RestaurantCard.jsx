import Link from "next/link";
import React from "react";
import { useState } from "react";

const RestaurantCard = ({ product }) => {
  let [showDesc, setShowDesc] = useState(false);
  return (
    <>
      {" "}
      <div className="single-food-main">
        <div className="image-box">
          <img
            src="https://backend.wholesaleclubltd.com/uploads/all/d8baOQPesvUl3tPwXjLv3daVa3fYC0QlpMmjFkK9.jpg"
            alt=""
            class="img-fluid"
          />
          <div
            className="hover-btn"
            onClick={() => {
              setShowDesc(!showDesc);
            }}
          >
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          {showDesc && (
            <div className="hover-content">
              <p>{product?.description}</p>
            </div>
          )}
        </div>
        <div className="content-box">
          <h5>
            <Link href="#">product?.name</Link>
          </h5>
          <h6 class="product-price">
            <span>
              &#2547; product?.discountPrice <span>/per product?.unit</span>
            </span>
          </h6>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
