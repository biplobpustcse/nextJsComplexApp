import { Router } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import OfferTemplate from "../offerTemplate";

const PackageComponent = ({ products, Templete, Templete2 }) => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (products.length > 0) {
      setLoader(false);
    }
    setLoader(false);

  }, [products.length]);
  return (
    <section className="product-view-main">
      <div className="container-fluid">
        <div
          className="tab-content"
          id="myTabContent"
          style={{ minHeight: "100vh" }}
        >
          <div className="row">
            <div className="col-12">
              <Templete>
                {products.length > 0 ? (
                  products?.map((product) => {
                    return <Templete2 product={product} />;
                  })
                ) : (
                  <>
                    {loader && (
                      <div className="loader-testing">
                        <InfinitySpin width="300" color="#004a96" />
                      </div>
                    )}
                  </>
                )}

              </Templete>
              {/*{*/}
              {/*  products.length == 0 && <h2 className='text-center'>No Package Found</h2>*/}
              {/*}*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageComponent;
