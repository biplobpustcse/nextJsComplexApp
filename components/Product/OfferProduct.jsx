import React, {useEffect, useState} from 'react';
import {http} from "../../services/httpService";

const OfferProduct = () => {
    const [products,setProducts] = useState();
    useEffect(() => {
        if(products == undefined){
            http.get({
                url: 'product-all-promotion?type=peak-off-peak',
                before: () => {
                },
                successed: (res) => {
                    console.warn(res)
                    setProducts(res);
                },
                failed: () => {
                },
            });
        }

    },[products])
    return (
        <div className={'row'}>
            {
              products != undefined &&   products.map(promotions => {
                  return  promotions.peakOffPeak.map((product) => {
                            return  <div className={' card  m-2 col-md-4'}>{product.PRODUCT.data[0].name} </div>
                    })
                })
            }
        </div>
    );
};

export default OfferProduct;