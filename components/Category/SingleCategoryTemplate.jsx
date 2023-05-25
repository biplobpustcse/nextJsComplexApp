import Link from "next/link";
import React from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

function SingleCategoryTemplate({ item,section }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleRedirect = (item,section) => {
    let url = section == 'department' ? `/shop?dept_id=${item.id}` :  `/shop?cat_id=${item.id}`
    let previousBreadCumb = JSON.parse(localStorage.getItem('dataBreadcumb'))

    let newBreadCumb = {...previousBreadCumb,name2: item.name,link2: item.id}
    dispatch({
      type: "setBredCumbdata",
      payload: newBreadCumb,
    });

    router.push(url);
  }

  return (
    <div className="single-category-card single-product">
      <div class="card">
        <div class="card-body">
          <div class="image-box">
            <div onClick={() => handleRedirect(item,section)}>
              <a>
                <img src={item.thumbnail_icon} alt={item.thumbnail_icon} class="img-fluid" />
              </a>
            </div>
          </div>
          <div class="product-title">
            <div onClick={() => handleRedirect(item,section)}>
              <a>
                <h4>{item.name}</h4>
              </a>
            </div>
            <h6>{item.number_of_product} items</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategoryTemplate;
