import React, { useCallback, useEffect, useState } from "react";
import { http } from "../../../services/httpService";
import { businessType } from "../../../utils/dictionaries";
import { getPantry } from "../../lib/endpoints";
import Link from "next/link";
// import Image from 'next/image'

const Pantry = ({ data, setting }) => {
  const [pantry, setData] = useState(data.slice(0, 9));
  //const isVisible = setting.find((item) => item.type == businessType.Pantry);
  //#region clientSidePentry
  // const [pantryImage, setPantryImage] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const getPantryData = useCallback(() => {
  //   http.get({
  //     url: getPantry,
  //     before: () => {
  //       setIsLoading(true);
  //     },
  //     successed: (res) => {
  //       setIsLoading(false);
  //       setPantryImage(res);
  //     },
  //     failed: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   getPantryData();
  // }, []);
  //#endregion
  return (
    <>
      {pantry.length > 0 && (
        <section className="pantry-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="pantry-bg">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="common-title-flex mb-tweenty">
                        <div className="left-box">
                          <h3 className="common-title">fillup your pantry</h3>
                        </div>
                        <div className="center-box"></div>
                        <div className="right-box">
                          <Link href="/pantry" as={"/pantry"}>
                            <a className="see-all-products">
                              see all
                              <i className="fa-solid fa-chevron-right"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-loop">
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="big-image-box">
                            <img
                              src={pantry[0]?.pantry ?? pantry[0]?.banner}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="product-title">
                            <Link href={"/shop?cat_id=" + pantry[0].id ?? "#"}>
                              <h4>{pantry[0].name}</h4>
                            </Link>
                          </div>
                          {/* <div className="discount-tag-square">
                      <div className="text">
                        <h4 className="disc">20%</h4>
                        <h4>discount</h4>
                      </div>
                    </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                      <div className="row">
                        {pantry.length > 1 &&
                          pantry.map((item, index) => {
                            if (index > 0) {
                              return (
                                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 small-product-card-col">
                                  <div className="card small-product-card">
                                    <div className="card-body">
                                      <div className="small-image-box">
                                        <img
                                          src={item.pantry ?? item.banner}
                                          alt=""
                                          className="img-fluid"
                                        />

                                        {/* <Image
                                          src={item.pantry ?? item.banner}
                                          alt=""
                                          className="img-fluid"
                                        /> */}
                                      </div>
                                      <div className="product-title">
                                        {/* <a href="#" className=""> */}
                                        <Link href={"/shop?cat_id=" + item?.id}>
                                          <h4>{item.name}</h4>
                                        </Link>
                                        {/* </a> */}
                                      </div>
                                      {/* <div className="discount-tag-square">
                                <div className="text">
                                  <h4 className="disc">20%</h4>
                                  <h4>discount</h4>
                                </div>
                              </div> */}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Pantry;
