import React from "react";
import Link from "next/link";
import Router from "next/router";

function ShopCategoryNav({ categories }) {
  const clickDepartment = (url) => {
    Router.push(url);
  };
  
  return (
    <section class="shopsorting-category-nav">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <ul class="nav">
              {categories &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <li class="nav-item">
                      {/* <Link
                            href="/shop?catId=[id]"
                            as={`/shop?catId=${item.id}`}
                          >
                            <a class="nav-link ">{item.name}</a>
                          </Link> */}
                      <a
                        onClick={clickDepartment.bind(
                          null,
                          "/shop?cat_id=" + item.id
                        )}
                        class="nav-link "
                        href
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              {/* <li class="nav-item">
              <a class="nav-link " href="#">coffee</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">coffee mate</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">drinking water</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">energy drinks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">instant powered drinks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">juice</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">liquid coffe</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">liquid tea</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">soda powder</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">soft drinks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">juice</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">drinking water</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">energy drinks</a>
            </li> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopCategoryNav;
