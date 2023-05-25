import React, { useCallback, useState } from "react";
import { http } from "../../../services/httpService";
import { getAllProduct, getBrandStore } from "../../lib/endpoints";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {useRouter} from "next/router";


const BrandShopBrand = ({ item }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleRedirect = (url,item) =>{
        dispatch({
            type: "setBredCumbdata",
            payload: {
                name1: item.name,
                link1: url,
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
        router.push(url)
    }
  return (
    <div class="card">
      <div class="card-body">
        <div class="brand-image-box">
          <a  onClick={() => handleRedirect('/shop?brand_id='+item.id,item)}  className="">
            <img src={item.logo} alt="" class="img-fluid" />
          </a>
        </div>
          <div className="card-right d-none">
              <div className="description-box">
                  <h4 className="product-title">
                      <div onClick={() => handleRedirect('/shop?brand_id='+item.id,item)}>
                          <a className="">{item?.name}</a>
                      </div>
                  </h4>
              </div>
          </div>
      </div>
    </div>
  );
};

export default BrandShopBrand;
