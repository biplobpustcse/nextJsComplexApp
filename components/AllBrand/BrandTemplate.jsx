import React from "react";
import SingleBrandTemplate from "./SingleBrandTemplate";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

function BrandTemplate({ items, Templete }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const handleRedirect = (item) => {
    dispatch({
      type: "setBredCumbdata",
      payload: {
        name1: 'Brand',
        link1: '/all-brand',
        name2: item.name,
        link2:  '/shop?brand_id='+item.id,
        name3: '',
        link3: '',
        name4: '',
        link4: '',
        name5: '',
        id5: '',
      },
    });
    router.push('/shop?brand_id='+item.id)
  }
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
                        <a  onClick={() => handleRedirect(item)}>
                          <SingleBrandTemplate item={item} />
                        </a>
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

export default BrandTemplate;
