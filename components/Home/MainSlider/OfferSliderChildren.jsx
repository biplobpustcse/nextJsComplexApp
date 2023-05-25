import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function OfferSliderChildren({ item }) {
  const router = useRouter();
  return (
    <>
      {item.name && item.thumbnail_image && (
        <div className="card">
          <Link href={"/product/[id]"} as={"/product/" + item.id}>
            <div className="card-body">
              <div className="image-box">
                <img src={item.thumbnail_image} alt="" className="img-fluid" />
              </div>
              <div className="content-box">
                <div className="offer-product-name">
                  <h5>
                    <a>{item?.brand_name}</a>
                  </h5>
                  {/*<small>{item?.brand_name}</small>*/}
                  <div className="price">
                    &#2547; {parseInt(item.stroked_price)}
                    {/* {parseInt(item.stroked_price) !== item.main_price && ( */}
                      <del>{item.main_price}</del>
                    {/* )} */}
                  </div>
                </div>
              </div>
              {parseInt(item.stroked_price) !== item.main_price && (
                <div className="p-disc-tag">{item.discount}</div>
              )}
            </div>
          </Link>
        </div>
      )}
      {item.slogan && (
        <Link href={item?.url ?? "#"} passHref>
          <a href="#">
            <div className="card">
              <div className="card-body">
                <h6>{item.name}</h6>
              </div>
            </div>
          </a>
        </Link>
      )}
      {item.dynamicPromo && (
        <div className="card">
          <div className="card-body">
            <h6>
              <Link href="#">{item.dynamicPromo}</Link>{" "}
            </h6>
          </div>
        </div>
      )}
    </>
  );
}

export default OfferSliderChildren;
