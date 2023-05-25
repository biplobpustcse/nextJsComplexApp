import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductInfoModel from "../Product/ProductInfoModel";

function SingleCelebration({ item }) {
  const getCartContext = useSelector((store) => store.cartReducerContext);
  const [visibleCartBox, setVisibleCartBox] = useState(false);
  return (
    <>
      {/* // <div class="single-celebration">
    //   <div class="celebration-flex">
    //     <div class="left-box">
    //       <img src={item.image} alt="" class="img-fluid" />
    //     </div>
    //     <div class="right-box">
    //       <div class="image-box">
    //         <img src={item.image} alt="" class="img-fluid" />
    //       </div>
    //       <div class="description-box">
    //         <h5>{item.name}</h5>
    //         <div class="price-box">
    //           <div class="old-price">&#2547; {item.price}</div>
    //           <div class="current-price">
    //             &#2547; {item.price} <span>/per PCs</span>
    //           </div>
    //         </div>
    //       </div>
    //       <button class="btn addtocart-btn">add to cart</button>
    //     </div>
    //   </div>
    // </div> */}
      <ProductInfoModel item={item} />
    </>
  );
}

export default SingleCelebration;
