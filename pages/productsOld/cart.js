import actions from '../../redux/actions/cart';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import React, { useEffect,useState } from "react"; 

function Cart (props) {
    const [productQty, setProductQty] = useState('');
    useEffect(() => {
        props.getCart();
      }, []);

    function updateQty(e,product){
        
        // let selectedItem = props.cart.cartItems.find(
        //     (item) => item.id === product.id
        // );
        console.log(e.target.value,product)
        // // // console.log('product',product)
        // // setProductQty(e.target.value);
        // selectedItem.quantity = e.target.value;
    }
      console.log('updates',props.cart.cartItems)
      let cart=props.cart;

      let CartDetails;
      console.log('props',props.cart);
      if(props.cart.cartItems.length ==0){
        return CartDetails=<div>no item.</div>;
      }
      CartDetails=props.cart.cartItems.map(product => {
        return (
            <div className="item" key={product.id}>
                <div className="buttons" onClick={()=>props.removeQty(product)}>
                    <span className="delete-btn"><i className="fa-solid fa-xmark"></i></span>
                    <span className="like-btn"></span>
                </div>
        
            <div className="image">
                <img src={product.image} alt={product.title} style={{ width: 80,height:80 }} />
            </div>
        
            <div className="description">
                <span>{product.category}</span>
            <span>{product.title}</span>
           
            </div>
        
            <div className="quantity">
                <button className="plus-btn" type="button" onClick={()=>props.increaseQty(product)} name="button">
                <i className="fa-solid fa-plus"></i>
                </button>
                <input type="text" name="name" value={product.quantity} onChange={(e)=>updateQty(e,product)}  />
                {/* <h5>{product.quantity}</h5> */}
                <button className="minus-btn" type="button" onClick={()=>props.decreaseQty(product)} name="button">
                    <i className="fa-solid fa-minus"></i>
                </button>
            </div>
        
            <div className="total-price">{product.price}</div>
        </div>
            
        );
    });
    return (
        <Layout title="products">
            <div className="profile-page">
                <div className="container">
                    <div className="row">
                    <div className="shopping-cart">
    
                        <div className="title">
                            Shopping Bag
                        </div>
                        
                            {CartDetails}
                            
                            <div className='float-right'> Total: {props.cart.amount}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}
// const mapDispatchToProps = dispatch => ({
//     getCart: message => dispatch(actions.getCart()),
//     increaseQty: data => dispatch(actions.increaseQty(data)),
//     })
Cart.getInitialProps = function(ctx) {
    initialize(ctx);
};
export default connect(state => state, actions)(Cart);