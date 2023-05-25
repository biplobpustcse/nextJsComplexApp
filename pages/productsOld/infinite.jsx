import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "../../components/Sidebar/Sidebar";

const PageInfineteScroll = () => {
  const totalCount = 200;
  let start = 0; //page let page_limit=10;
  const apiPath = "http://123.136.26.211:8085/wholesaleclub/api/v2"; //"https://api.escuelajs.co/api/v1/products";
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [page_limit, setPageLimit] = useState(0);
  const [product, setState] = useState(0);

  const openModal = (data) => {
    setState(data);
  };
  console.log("jj", pageNo, page_limit);
  const getProductList = () => {
    //var st=page_limit == 0? start: page_limit+1;
    var st = pageNo + 1;
    setPageNo(st);
    console.log(pageNo, page_limit);
    var end = page_limit + 10; //for Page let pageNo=Math.ceil(products.length / page_limit)+1;
    setPageLimit(end);
    console.log(st, end);
    const queryParam = "?offset=" + st + "&limit=" + end;
    const finalUrl = apiPath + "/products?page=" + st; //+ queryParam;
    console.log(finalUrl);
    axios
      .get(finalUrl)
      .then((res) => {
        const apiRes = res?.data.data;
        console.log("apiRes", apiRes.data);
        console.log("productsrr", products);
        const mergeDate = [...products, ...apiRes];
        console.log(mergeDate);
        setProducts(mergeDate);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  const fetchMoreData = () => {
    if (products.length < totalCount) {
      getProductList();
    }
  };
  console.log(product);
  let productDetais = "";
  if (product) {
    productDetais = (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4">
                  <img
                    data-image="red"
                    style={{ width: 250, height: 300 }}
                    className="active"
                    src={product?.images[0]}
                    alt=""
                  />
                </div>

                <div className="col-8">
                  <div className="product-description">
                    <span>{product?.category.name}</span>
                    <h1>{product?.title}</h1>
                    <p>{product?.description}</p>
                  </div>

                  <div className="product-configuration">
                    <div className="cable-config">
                      <span>Cable configuration</span>

                      <div className="cable-choose">
                        <button>Straight</button>
                        <button>Coiled</button>
                        <button>Long-coiled</button>
                      </div>

                      <a href="#">How to configurate your headphones</a>
                    </div>
                  </div>

                  <div className="product-price">
                    <span>{product?.price}$</span>
                    <a
                      href="#"
                      onClick={() => addToCart(product)}
                      className="cart-btn"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length < totalCount}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row">
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <div className="card" key={product.id}>
                  <Link href={{ pathname: "/products/" + product.id }}>
                    {/* <img className='center' src={product.images[0]} alt={product.image} style={{ width: 100 }}/> */}
                    <img
                      className="center"
                      src={product.thumbnail_image}
                      alt={product.thumbnail_image}
                      style={{ width: 100 }}
                    />
                  </Link>

                  <h3>{product.title}</h3>
                  <p className="price">$ {product.price}</p>
                  <p>
                    {product.id} {product.description}
                  </p>
                  <p>
                    <button
                      onClick={() => openModal(product)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Add to Cart
                    </button>
                  </p>
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </>
    // <div className="profile-page">
    //     <div className="container">

    //         <InfiniteScroll
    //             dataLength={products.length}
    //             next={fetchMoreData}
    //             hasMore={products.length<totalCount}
    //             loader={<h4>Loading...</h4>}
    //             endMessage={
    //                 <p style={{ textAlign: 'center' }}>
    //                   <b>Yay! You have seen it all</b>
    //                 </p>
    //               }
    //         >
    //             <div className="row">
    //            {products && products.length>0 && products.map((product) => {
    //             return (
    //                     <div className="card"  key={product.id}>
    //                         <Link
    //                             href={{ pathname: "/products/"+ product.id }}
    //                         >
    //                             {/* <img className='center' src={product.images[0]} alt={product.image} style={{ width: 100 }}/> */}
    //                             <img className='center' src={product.thumbnail_image} alt={product.thumbnail_image} style={{ width: 100 }}/>
    //                         </Link>

    //                         <h3>{product.title}</h3>
    //                         <p className="price">$ {product.price}</p>
    //                         <p>{product.id} {product.description}</p>
    //                         <p><button onClick={()=>openModal(product)} data-toggle="modal" data-target="#exampleModal">Add to Cart</button></p>
    //                     </div>

    //             )
    //         })}
    //         </div>
    //         </InfiniteScroll>
    //         {
    //           productDetais

    //         }

    //     </div>
    // </div>
  );
};

PageInfineteScroll.getInitialProps = function (ctx) {
  initialize(ctx);
};
export default connect((state) => state)(PageInfineteScroll);
