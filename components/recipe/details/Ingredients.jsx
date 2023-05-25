import React from "react";

function Ingredients({ items }) {
  return (
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <div class="ingredient-description">
        <div class="common-fieldset-main">
          <fieldset class="common-fieldset">
            <legend class="rounded">ingredients</legend>
            <ul class="">
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  return <li>{item?.product.data[0].name}</li>;
                })}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
