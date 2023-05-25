import React from "react";

function RecipeSmSliderTemplate({ children }) {
  return (
    <section class="recipe-sm-slider">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="recipe-sm-slider-wrapper">
              {children}

              {/* <div class="single-slide-box">
              <a href="">
                <div class="image-box">
                  <img src="../assets/images/recipe/1.webp" alt="" class="img-fluid"/>
                </div>
                <div class="product-title">
                  <h3>desert</h3>
                </div>
              </a>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeSmSliderTemplate;
