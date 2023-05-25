import React, {useEffect} from "react";
import {toast} from "react-toastify";

function PeakOffPeakComponent({ products, Templete, Templete2 ,section}) {
  // useEffect(( ) => {
  //   if(products.length == 0){
  //     toast.error('No product found')
  //   }
  // },[])
  return (
    <section class="product-view-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="tab-content"
              id="myTabContent"
              style={{ minHeight: "80vh" }}
            >
              <Templete>
                {products &&
                  products.length > 0 &&
                  products.map((item) => {
                    return (
                      <>
                        {" "}
                        <div class="single-product">
                          <Templete2 item={item}  section={section}/>
                        </div>
                      </>
                    );
                  })}
              </Templete>
              {/*{*/}
              {/*  products.length == 0 && <h2 className='text-center'>No Product Found</h2>*/}
              {/*}*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeakOffPeakComponent;
