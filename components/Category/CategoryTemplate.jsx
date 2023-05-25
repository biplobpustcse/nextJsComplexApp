import React from "react";

import SingleCategoryTemplate from "./SingleCategoryTemplate";
import Link from "next/link";

function CategoryTemplate({ items, Templete,section }) {
  console.log({ items });
  return (
    <section class="all-brand-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="myTabContent">
              <Templete>
                {items &&
                  items.length > 0 &&
                  items.map((item) => {
                    return (
                      <>
                        {/*<Link href={"shop?cat_id" + item.id}>*/}
                        {/*  <a target="_self">*/}
                            <SingleCategoryTemplate item={item} section={section} />
                        {/*  </a>*/}
                        {/*</Link>*/}
                      </>
                    );
                  })}
              </Templete>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryTemplate;
