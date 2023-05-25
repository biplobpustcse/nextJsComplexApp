import Router from "next/router";
import { PRODUCTSLODE, PRODUCTLODE } from "../types";
import { API } from "../../config";
import axios from "axios";
import ProductRepository from "../../repositories/product";

// Gets token from the API and stores it in the redux store and in cookie
function productList(type) {
  if (type !== "products") {
    throw new Error("Wrong API call!");
  }
  return async (dispatch) => {
    try {
      let data = await ProductRepository.getProducts();
      dispatch({ type: PRODUCTSLODE, payload: data });
    } catch (err) {
      alert(err);
    }
  };

  //    return (dispatch) => {
  //         axios.get(`${API}/products`)
  //         .then ((response) => {
  //             console.log('dddd',response.data)
  //             dispatch({type: PRODUCTSLODE, payload: response.data});
  //         })
  //         .catch((error) => {
  //             switch (error.response.status) {
  //                 case 422:
  //                     let message = '';
  //                     for (const [key, value] of Object.entries(error.response.data)) {
  //                         message += `${key.toUpperCase()}: ${value.join(', ')}\n`
  //                     }
  //                     alert(message);
  //                     break;
  //                 case 401:
  //                     alert(error.response.data.error.user_authentication);
  //                     break;
  //                 case 500:
  //                     alert('Interval server error! Reload the page and try again!');
  //                     break;
  //                 default:
  //                     alert(error.response.data);
  //                     break;
  //             }
  //         });
  //     };
}
function productById(id) {
  return async (dispatch) => {
    try {
      let data = await ProductRepository.getProductById(id);
      dispatch({ type: PRODUCTLODE, payload: data });
    } catch (err) {
      alert(err);
    }
  };
  // return (dispatch) => {
  //     axios.get(`${API}/products/${id}`)
  //     .then ((response) => {

  //         dispatch({type: PRODUCTLODE, payload: response.data});
  //     })
  //     .catch((error) => {
  //         switch (error.response.status) {
  //             case 422:
  //                 let message = '';
  //                 for (const [key, value] of Object.entries(error.response.data)) {
  //                     message += `${key.toUpperCase()}: ${value.join(', ')}\n`
  //                 }
  //                 alert(message);
  //                 break;
  //             case 401:
  //                 alert(error.response.data.error.user_authentication);
  //                 break;
  //             case 500:
  //                 alert('Interval server error! Reload the page and try again!');
  //                 break;
  //             default:
  //                 alert(error.response.data);
  //                 break;
  //         }
  //     });
  // };
}

export default {
  productList,
  productById,
};
