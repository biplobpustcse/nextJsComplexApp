import Link from "next/link";
import React from "react";

function SingleBrandTemplate({ item }) {
  return (
    <div className="single-brand">
      <div class="card">
      <div class="card-body">
        <div class="image-box">
          <Link href={`shop?brand_id=${item.id}`}>
            <a>
              <img src={item.logo} alt={item.logo} class="img-fluid" />
            </a>
          </Link>
        </div>
        <div class="product-title">
          <Link href={`shop?brand_id=${item.id}`}>
            <a>
              <h4>{item.name}</h4>
            </a>
          </Link>
          <h6>{item.links.product_count} items</h6>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SingleBrandTemplate;
