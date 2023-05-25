import Link from 'next/link';
import React from 'react'

function SingleBrandTemplate({ item }) {
    return (
        <div class="single-recipe">
          <div class="image-box">
            <Link href={`shop?brand_id=${item.id}`} as={`shop?brand_id=${item.id}`}>
              <a>
                <img src={item?.logo} alt="" class="img-fluid" />
              </a>
            </Link>
            {/* <a href="#">
              <img src={item?.thumbnail_image} alt="" class="img-fluid" />
            </a> */}
    
            <div class="recipe-title">
              <h3>
                <Link href={`shop?brand_id=${item.id}`} as={`shop?brand_id=${item.id}`}>
                  <a >{item.name}</a>
                </Link>
              </h3>
              {/* <p>cook time: 50 mins</p> */}
            </div>
          </div>
        </div>
      );
}

export default SingleBrandTemplate