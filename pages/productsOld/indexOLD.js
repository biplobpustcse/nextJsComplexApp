import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import { Component } from 'react';
import actions from '../../redux/actions/productAction'
import Link from 'next/link';
import addtocart from '../../redux/actions/cart';





class IndexOLD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: ''
        };
        this.openModal = this.openModal.bind(this);
        this.addToCart = this.addToCart.bind(this);
       
    }
    openModal(data) {
        this.setState({
            product:data
          })
         
      }
      addToCart(data){
        this.props.addtocart(data)
        // addtocart();
        //dispatch(this.props.addtocart(data));
      }
     
    componentDidMount () {
        console.log(this.props)
        this.props.productList()
        //this.props.productList('products');
        //dispatch(productList('products'));
      }
        
    render() {
        console.log(this.props)
        let products;
        
        if (this.props.products.productList !== undefined) {
            products=this.props.products.productList.map(product => {
                            return (
                                <div className="card"  key={product.id}>
                                    <Link
                                        href={{ pathname: "/products/"+ product.id }}
                                     >
                                        <img className='center' src={product.image} alt={product.image} style={{ width: 100 }}/>
                                    </Link>

                                    <h3>{product.title}</h3>
                                    <p className="price">$ {product.price}</p>
                                    <p>{product.description}</p>
                                    <p><button onClick={()=>this.openModal(product)} data-toggle="modal" data-target="#exampleModal">Add to Cart</button></p>
                                </div>
                                
                            );
                        })
          }
          else{
              products=<div><p>NO Products Found.</p></div>
          }
        return (
            <Layout title="products">
                <div className="profile-page">
                    <div className="container">
                        <div className="row">
                            {products}
                            
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                {/* <img data-image="black" src="images/black.png" alt=""/>
                                                <img data-image="blue" src="images/blue.png" alt=""/> */}
                                                <img data-image="red" style={{ width: 250,height:300}} className="active" src={this.state.product.image} alt=""/>
                                            </div>
                                            
                                            <div className="col-8">
                                            
                                                <div className="product-description">
                                                <span>{this.state.product.category}</span>
                                                <h1>{this.state.product.title}</h1>
                                                <p>{this.state.product.description}</p>
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
                                                <span>{this.state.product.price}$</span>
                                                <a href="#" onClick={()=>this.addToCart(this.state.product)} className="cart-btn">Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>

                    </div>
            </Layout>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    productList: message => dispatch(actions.productList('products')),
    addtocart: id => dispatch(addtocart.addtocart(id)),
    })

    IndexOLD.getInitialProps = function(ctx) {
    initialize(ctx);
};
export default connect(state => state,mapDispatchToProps)(IndexOLD);