import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const ShopCatTemplate = ({ section, data, url = null }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleRedirect = (url, item, section) => {
    if (section == 'department') {
      dispatch({
        type: 'setBredCumbdata',
        payload: {
          name1: item.name,
          link1: item.id,
          name2: '',
          link2: '',
          name3: '',
          link3: '',
          name4: '',
          link4: '',
          name5: '',
          id5: '',
        },
      });
    } else {
      dispatch({
        type: 'setBredCumbdata',
        payload: {
          name1: item.name,
          link1: url + item.id,
          name2: '',
          link2: '',
          name3: '',
          link3: '',
          name4: '',
          link4: '',
          name5: '',
          id5: '',
        },
      });
    }

    if (section == 'department' || item?.is_department == 1) {
      router.push('/shop?dept_id=' + item.id);
    } else {
      router.push(url + item.id);
    }
  };
  return (
    <>
      {data.length > 0 &&
        data.map((item) => (
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 card-loop shop-by-dept">
            {/*<div href={url ? url + item.id : "#"} target="_self"  onClick={() => handleRedirect(url,item.id)}>*/}
            <div onClick={() => handleRedirect(url, item, section)}>
              <a>
                <div class="card">
                  <div class="card-body">
                    <div class="image-box">
                      <img
                        src={
                          section == 'category' || section == 'department'
                            ? item?.thumbnail_icon
                            : item?.icon
                        }
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <div class="product-title">
                      <h4>{item.name}</h4>
                      <h6>{item?.count} items</h6>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShopCatTemplate;
