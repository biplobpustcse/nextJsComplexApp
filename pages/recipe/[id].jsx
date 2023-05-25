import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { compose } from "redux";
import SliderMain2 from "../../components/Home/MainSlider/SliderMain2";
import {
  getHomeSliders,
  getMoreItems,
  getRecipeById,
} from "../../components/lib/endpoints";
import AllIngredients from "../../components/recipe/details/AllIngredients";
import Direction from "../../components/recipe/details/Direction";
import HomeSliderRecipe from "../../components/recipe/details/HomeSliderRecipe";
import Ingredients from "../../components/recipe/details/Ingredients";
import IngredientsMain from "../../components/recipe/details/IngredientsMain";
import IngredientsMainProductTemplate from "../../components/recipe/details/IngredientsMainProductTemplate";
import ShareAndMore from "../../components/recipe/details/ShareAndMore";
import SimilarRecipes from "../../components/recipe/details/SimilarRecipes";
import RecipeProductShorting2 from "../../components/recipe/RecipeProductShorting2";
import MoreItemsToConsider from "../../components/Shop/MoreItemsToConsider";
import { baseUrl, http } from "../../services/httpService";

import { SecondFooter } from "../../components/Footer/SecondFooter";
import { SslFooter } from "../../components/Footer/SslFooter";
import RecentlyViewItem from "../../components/Shop/RecentlyViewItem";
import { productDataConverter } from "../../services/dataService";
import Axios from "axios";
import SecondFooter2 from "../../components/Footer/SecondFooter2";
import SslFooter2 from "../../components/Footer/SslFooter2";
import QuickView from "../../components/Product/QuickView";
import Custom404 from "../404";

function recipeDetails(props) {
  const [isVisibileError, setIsVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sliders, setSliders] = useState([
    props.recipyModelData.recipe?.banner_image,
  ]);
  const [recipe, setRecipe] = useState(props.recipyModelData || []);

  const router = useRouter();

  //Get Main Slider data
  // const GetHomeSliders = useCallback(() => {
  //   http.get({
  //     url: getHomeSliders,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setSliders(res);
  //       setIsLoading(false);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //       setIsVisibleError(true);
  //     },
  //   });
  // }, []);
  //Get Recipe detais data
  const GetRecipeDetails = useCallback((id) => {
    http.get({
      url: getRecipeById + id,
      before: () => {
        setIsLoading(true);
      },
      successed: (res) => {
        setRecipe(res);
        const updatedList = [];
        {
          updatedList.push(res.recipe?.banner_image);
        }
        setSliders(updatedList);
        setIsLoading(false);
      },
      failed: () => {
        setIsLoading(false);
        setIsVisibleError(true);
      },
    });
  }, []);

  // useEffect(() => {
  //   // GetHomeSliders();
  //   GetRecipeDetails(router.query.id);
  // }, [router.asPath]);

  console.log({ props });
  if (props.getError) {
    return <Custom404 />;
  }
  return (
    <>
      <HomeSliderRecipe recipe={recipe?.recipe} sliders={sliders} />

      <RecipeProductShorting2 />

      <IngredientsMain>
        <AllIngredients allData={recipe?.recipe_ingredients}>
          {recipe?.recipe_ingredients?.length > 0 &&
            recipe.recipe_ingredients.map((item) => {
              console.log({ item }, "yoooh");
              return (
                <>
                  <IngredientsMainProductTemplate item={item} />
                </>
              );
            })}
        </AllIngredients>
        {recipe?.similar_recipes?.length > 0 && (
          <SimilarRecipes items={recipe?.similar_recipes} />
        )}
        <Ingredients items={recipe?.recipe_ingredients} />
        <Direction item={recipe?.recipe?.instructions} />
        <ShareAndMore />
      </IngredientsMain>
      <MoreItemsToConsider
        HeaderText={"More Items To Consider"}
        data={props.moreItems.data}
        url={""}
      />
      <RecentlyViewItem />
      <QuickView />
      <SecondFooter />
      <SslFooter2 />
    </>
  );
}
// export default compose(withRouter)(recipeDetails);

export default recipeDetails;
export async function getServerSideProps(context) {
  const router = context.params?.id;
  let product,
    moreItems,
    relatedItems,
    offerItems,
    recipyModelData,
    getError = false;
  let endpoints = [
    baseUrl + "/" + getMoreItems,
    baseUrl + "/" + getRecipeById + router,
  ];
  try {
    await Axios.all(endpoints.map((endpoint) => Axios.get(endpoint, {}))).then(
      Axios.spread(({ data: moreProducts }, { data: recipeDate }) => {
        moreItems = moreProducts;
        recipyModelData = recipeDate;
      })
    );
  } catch (error) {
    moreItems = null;
    recipyModelData = null;
    getError = true;
  }

  return {
    props: { moreItems, recipyModelData, getError }, // will be passed to the page component as props
  };
}
