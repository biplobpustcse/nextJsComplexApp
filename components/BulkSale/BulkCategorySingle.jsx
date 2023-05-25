import React from "react";

const BulkCategorySingle = ({ item }) => {
  return (
    <div class="single-slide-box">
      <a href="">
        <div class="image-box">
          <img src={item.banner} alt="" class="img-fluid" />
        </div>
        <div class="product-title">
          <h3>{item.name}</h3>
        </div>
      </a>
    </div>
  );
};

export default BulkCategorySingle;
