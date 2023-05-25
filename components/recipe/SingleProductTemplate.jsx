import Link from "next/link";
import React from "react";

function SingleProductTemplate({ item }) {
  return (
    <div class="single-recipe">
      <div class="image-box">
        <Link href="/recipe/[id]" as={`/recipe/${item.id}`}>
          <a>
            <img src={item?.thumbnail_image} alt="" class="img-fluid" />
          </a>
        </Link>
        {/* <a href="#">
          <img src={item?.thumbnail_image} alt="" class="img-fluid" />
        </a> */}

        <div class="recipe-title">
          <h3>
            <Link href="/recipe/[id]" as={`/recipe/${item.id}`}>
              <a href="#">{item.name}</a>
            </Link>
          </h3>
          <p>cook time: {item.cook_time} mins</p>
        </div>
      </div>
    </div>
  );
}

export default SingleProductTemplate;
