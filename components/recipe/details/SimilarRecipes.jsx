import React from "react";
import SingleProductTemplate from "../SingleProductTemplate";

function SimilarRecipes({ items }) {
  return (
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <div class="product-view-main all-ingredients">
        <div class="common-fieldset-main">
          <fieldset class="common-fieldset">
            <legend class="rounded">similar recipes</legend>
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <>
                    <SingleProductTemplate item={item} />
                  </>
                );
              })}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default SimilarRecipes;
