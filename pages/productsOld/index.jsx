import React, { useEffect, useState } from "react";
import actions from "../../redux/actions/productAction";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import Link from "next/link";
import initialize from "../../utils/initialize";
import addtocart from "../../redux/actions/cart";
import Sidebar from "../../components/Sidebar/Sidebar";

const Product = (props) => {
  const [product, setState] = useState(0);
  useEffect(() => {
    props.productList();
  }, []);

  const openModal = (data) => {
    setState(data);
  };
  function addToCart(data) {
    props.addtocart(data);
  }

  const products = props.products.productList.data;
  console.log(products);

  products?.map((product) => {
    // const products = props.products.productList.map((product) => {
    return (
      <div className="card" key={product.id}>
        <Link href={{ pathname: "/products/" + product.id }}>
          <img
            className="center"
            src={product.image}
            alt={product.image}
            style={{ width: 100 }}
          />
        </Link>

        <h3>{product.title}</h3>
        <p className="price">$ {product.price}</p>
        <p>{product.description}</p>
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
  });
  console.log("props3443", props);

  return (
    <Layout title="products">
      <section className="layout-main">
        <Sidebar />
        {products}
      </section>
      {/* <div className="profile-page">
            <div className="container">
                <div className="row"> */}

      {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className="col-4">
                                       
                                        <img data-image="red" style={{ width: 250,height:300}} className="active" src={product.image} alt=""/>
                                    </div>
                                    
                                    <div className="col-8">
                                    
                                        <div className="product-description">
                                        <span>{product.category}</span>
                                        <h1>{product.title}</h1>
                                        <p>{product.description}</p>
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
                                        <span>{product.price}$</span>
                                        <a href="#" onClick={()=>addToCart(product)}  className="cart-btn">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                           
                            </div>
                        </div>
                    </div> */}
      {/*  </div>
            </div>
        </div> */}
    </Layout>
  );
};
const mapDispatchToProps = (dispatch) => ({
  productList: (message) => dispatch(actions.productList("products")),
  addtocart: (data) => dispatch(addtocart.addtocart(data)),
});
Product.getInitialProps = function (ctx) {
  initialize(ctx);
};
export default connect((state) => state, mapDispatchToProps)(Product);
