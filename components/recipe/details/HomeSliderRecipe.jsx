import React from "react";
import Slider from "../../../utils/Slider/Slider";
import CommonSliderTemplate from "../../Home/MainSlider/CommonSliderTemplate";
import SliderMain2 from "../../Home/MainSlider/SliderMain2";

function HomeSliderRecipe({ recipe,sliders }) {
  const options = {
    rewind: true,
    type: "loop",
    drag: "free",
    autoplay: true,
    rewindSpeed: 1000,
    speed: 1000,
    pauseOnHover: true,
    perPage: 1,
    width: "100%",
    breakpoints: {
      375: {
        perPage: 1,
      },
      576: {
        perPage: 2,
      },
      991: {
        perPage: 3,
      },
      992: {
        perPage: 4,
      },
      1024: {
        perPage: 4,
      },
      1200: {
        perPage: 5,
      },
    },
  };
  return (
    <section class="home-slider-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="position-relative">
              {recipe && Object.keys(recipe).length > 0 && (
                <>
                  <div class="ingredients-box">
                    <h3>{recipe.name} </h3>
                    <p>prep: {recipe.prep_time} min</p>
                    <p>cook : {recipe.cook_time} mins</p>
                    <p>additional : 2 hrs</p>
                    <p>total : {recipe.prep_time + recipe.cook_time} mins</p>
                    <p> servings : 24</p>
                    <p>yield : 24 deviled egg halves</p>
                  </div>
                  <div class="homeslider-wrapper">
                    {sliders?.length > 0 && (
                      <Slider
                        options={options}
                        Template={CommonSliderTemplate}
                        data={sliders}
                      />
                    )}

                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSliderRecipe;
