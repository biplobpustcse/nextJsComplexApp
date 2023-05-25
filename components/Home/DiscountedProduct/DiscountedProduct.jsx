import React from 'react';
import { useEffect } from 'react';
import { get } from '../../../services/httpService';
import Link from 'next/link';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
const DiscountedProduct = () => {
  let [data, setData] = React.useState([]);
  const router = useRouter();
  const dispatch = useDispatch()
  const handleRedirect = (item,url) => {
    router.push(url)
  }

  useEffect(() => {
    (async () => {
      await get({
        url: 'departments/all?is_home_department=1',
        successed: (res) => {
          setData(res);
        },
      });
    })();
  }, []);



  return (

        data.length > 0 ?

            <section className="pantry-main">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="pantry-bg">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="common-title-flex mb-tweenty">
                            <div className="left-box">
                              <h3 className="common-title ">{data[0]?.name}</h3>
                            </div>
                            <div className="center-box"></div>
                            <div className="right-box">
                              <div
                                  onClick={() => handleRedirect(data[0], "/department-wise-product?dept_id=" + data[0]?.id)}>
                                <a  className="see-all-products">
                                  see all <i className="fa-solid fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {data &&
                        data[0]?.categories &&
                        data[0]?.categories.data.slice(0, 6).map(({name, thumbnail_icon}, index) => {
                          return (
                              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2 discount-col ">
                                <div className="card small-product-card">
                                  <div className="card-body">
                                    <div className="small-image-box">
                                      <img
                                          src={thumbnail_icon}
                                          alt=""
                                          className="img-fluid"
                                      />
                                    </div>
                                    <div className="product-title">
                                      <a href="#" className="">
                                        <h4>{name}</h4>
                                      </a>
                                    </div>
                                    {/* <div class="discount-tag-square">
                              <div class="text">
                                <h4 class="up-to">up to</h4>
                                <h4 class="disc">20%</h4>
                                <h4>off</h4>
                              </div>
                            </div> */}
                                  </div>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            : ''


  );
};

export default DiscountedProduct;
