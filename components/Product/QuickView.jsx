import React, { useState } from "react";
import {
  ProductAddtocart,
  ProductPromotionAdd,
  SliderReactJs,
} from "../../utils/slider";
import Slider from "../../utils/Slider/Slider";
import SliderThumline from "../../utils/Slider/SliderThumline";
import QuickViewSlider from "./ProductView";
// Default theme
import { useSelector } from "react-redux";
import ProductView from "./ProductView";

function QuickView() {
  const store = useSelector((state) => state.HomeData);
  const [isShowQuickView, setisShowQuickView] = useState(false);

  // const ProdcutViewAfterTime=
  setTimeout(() => {
    setisShowQuickView(true);
  }, [1200]);
  return (
    <div
      class="modal fade quickview-modal"
      id="quickviewModal"
      tabindex="-1"
      aria-labelledby="quickviewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        {Object.keys(store?.product).length > 0 && (
          <div class="modal-content">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="modal-body">
              <ProductView store={store} isDetails={false} />
            </div>
          </div>
        )}
      </div>

      {<ProductPromotionAdd />}
    </div>
  );
}

export default QuickView;
