import Router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function RecipeProductShorting({handleClick}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.bredCumbData);

  const clickCategory = (
    url,
    name1,
    id1,
    name2,
    id2,
    name3,
    id3,
    name4,
    id4
  ) => {
    dispatch({
      type: "setBredCumbdata",
      payload: { name1: name1, link1: id1, name2: name2, link2: id2,name3: name3, link3: id3,name4: name4, link4: id4 },
    });
    // set("dataBreadcumb",JSON.stringify({dept:name,cat1:"",subCat:"",subCat2:""}))
    Router.push(url);
  };
  
  return (
    <section class="shop-product-sorting">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="sorting-flex-main">
              <div class="breadcrumb-main">
                <nav aria-label="breadcrumb" class="breadcrumbs medium-font">
                  <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                      <a  onClick={clickCategory.bind(
                         null,
                         "/recipe",
                         "",
                         "",
                         "",
                         "",
                         "",
                         "",
                         "",
                         ""
                       )}
                       role="button" tabindex="0"
                       href>
                        recipe
                      </a>
                    </li>
                  {store?.breadCumb?.name1 != "" && (
                     <li class="breadcrumb-item">
                     <a
                       onClick={clickCategory.bind(
                         null,
                         "/recipe?cat_id=" + store.breadCumb.link1,
                         store?.breadCumb?.name1,
                         store?.breadCumb?.link1,
                         "",
                         "",
                         "",
                         "",
                         "",
                         ""
                       )}
                       role="button" tabindex="0"
                       href
                     >
                       {store.breadCumb.name1}
                     </a>
                    
                     
                   </li>
                  )}
                    
                  </ol>
                </nav>
              </div>
              {/* <div class="price-range-main"></div> */}
              {/* <div class="sortby-main"></div> */}
              {/* <div class="sortby-main"></div> */}
              <div class="viewall-main">
                <h4> view as</h4>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link "
                      id="row-view-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#row-view-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="row-view-tab-pane"
                      aria-selected="true"
                    >
                      <img
                        src="../assets/images/icon/cr.svg"
                        alt=""
                        class="img-fluid"
                      />
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="fourC-view-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#fourC-view-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="fourC-view-tab-pane"
                      aria-selected="false"
                      onClick={(event) => handleClick(event, "four")}
                    >
                      <img
                        src="../assets/images/icon/c4.svg"
                        alt=""
                        class="img-fluid"
                      />
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="fiveC-view-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#fiveC-view-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="fiveC-view-tab-pane"
                      aria-selected="false"
                      onClick={(event) => handleClick(event, "five")}
                    >
                      <img
                        src="../assets/images/icon/c5.svg"
                        alt=""
                        class="img-fluid"
                      />
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="sixC-view-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#sixC-view-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="sixC-view-tab-pane"
                      aria-selected="true"
                      onClick={(event) => handleClick(event, "six")}
                    >
                      <img
                        src="../assets/images/icon/c6.svg"
                        alt=""
                        class="img-fluid"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeProductShorting;
