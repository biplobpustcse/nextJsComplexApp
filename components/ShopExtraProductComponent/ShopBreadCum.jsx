import React from "react";

const ShopBreadCum = ({ data }) => {
  return (
    <div class="breadcrumb-main">
      <nav aria-label="breadcrumb" class="breadcrumbs medium-font">
        <ol class="breadcrumb">
          {data.map((item) => (
            <li class="breadcrumb-item">
              <a href="#" role="button" tabindex="0">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ShopBreadCum;
