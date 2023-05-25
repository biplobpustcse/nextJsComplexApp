import React from "react";
import Router from "next/router";
const RelatedCategoriesIn = ({ categories }) => {
  const clickDepartment = (url) => {
    Router.push(url);
  };

  return (
    <section class="more-categories-in mb-ten">
      <div class="container-fluid">
        <div class="row">
          <div className="col-12">
            <div className="bg">
              <h3>related categories</h3>
              <ul class="nav">
                {categories &&
                  categories.length > 0 &&
                  categories.map((item) => (
                    <li class="nav-item">
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
                  ))}

                {/* <li class="nav-item">
                  <a class="nav-link " href="#">
                    Baby Mother Care
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="#">
                    Beauty Personal Care
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="#">
                    Beverages
                  </a>
                </li>
                <li class="nav-item" href="#">
                  <a class="nav-link ">Coffee</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedCategoriesIn;
