import Router from "next/router";
import { UPDATECART, GETCART } from "../types";

export const calculateAmount = (obj) =>
  Object.values(obj)
    .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
    .toFixed(2);
function addtocart(product) {
  console.log(product);
  return (dispatch) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let currentCart =
      localCart !== null
        ? localCart
        : { cartItems: [], amount: 0, cartTotal: 0 };

    let existItem = currentCart.cartItems.find(
      (item) => item.id === product.id
    );
    if (existItem) {
      existItem.quantity += product.quantity;
    } else {
      if (!product.quantity) {
        product.quantity = 1;
      }
      currentCart.cartItems.push(product);
    }
    currentCart.amount = calculateAmount(currentCart.cartItems);
    currentCart.cartTotal++;
    console.log("cart", currentCart);
    dispatch({ type: UPDATECART, payload: currentCart });
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };
}

function increaseQty(product) {
  return (dispatch) => {
    console.log("pro", product);
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let currentCart =
      localCart !== null
        ? localCart
        : { cartItems: [], amount: 0, cartTotal: 0 };

    let selectedItem = currentCart.cartItems.find(
      (item) => item.id === product.id
    );
    if (selectedItem) {
      selectedItem.quantity++;
      currentCart.cartTotal++;
      currentCart.amount = calculateAmount(currentCart.cartItems);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    dispatch({ type: UPDATECART, payload: currentCart });
  };
}
function decreaseQty(product) {
  return (dispatch) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let currentCart =
      localCart !== null
        ? localCart
        : { cartItems: [], amount: 0, cartTotal: 0 };

    let selectedItem = currentCart.cartItems.find(
      (item) => item.id === product.id
    );

    if (selectedItem) {
      selectedItem.quantity--;
      currentCart.cartTotal--;
      currentCart.amount = calculateAmount(currentCart.cartItems);
    }
    let index = currentCart.cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (selectedItem.quantity === 0) {
      currentCart.cartItems.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    dispatch({ type: UPDATECART, payload: currentCart });
  };
}
function removeQty(product) {
  return (dispatch) => {
    console.log("pro", product);
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let currentCart =
      localCart !== null
        ? localCart
        : { cartItems: [], amount: 0, cartTotal: 0 };

    let index = currentCart.cartItems.findIndex(
      (item) => item.id === product.id
    );
    currentCart.cartTotal = currentCart.cartTotal - product.quantity;
    currentCart.cartItems.splice(index, 1);
    currentCart.amount = calculateAmount(currentCart.cartItems);
    if (currentCart.cartItems.length === 0) {
      currentCart.cartItems = [];
      currentCart.amount = 0;
      currentCart.cartTotal = 0;
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    dispatch({ type: UPDATECART, payload: currentCart });
  };
}
// function updateQty(e,product) {
//     return (dispatch) => {
//         const localCart = JSON.parse(localStorage.getItem('cart'));
//         let currentCart = localCart !==null ? localCart: {cartItems:[],amount:0,cartTotal:0};

//         let selectedItem = currentCart.cartItems.find(
//             (item) => item.id === product.id
//         );
//         if (selectedItem) {
//             selectedItem.quantity=e;
//             currentCart.cartTotal--;
//             currentCart.amount = calculateAmount(currentCart.cartItems);
//         }
//         currentCart.cartTotal = currentCart.cartTotal - product.quantity;
//         currentCart.cartItems.splice(index, 1);
//         currentCart.amount = calculateAmount(currentCart.cartItems);
//         if (currentCart.cartItems.length === 0) {
//             currentCart.cartItems = [];
//             currentCart.amount = 0;
//             currentCart.cartTotal = 0;
//         }

//         console.log('decCart',currentCart);
//         localStorage.setItem('cart',JSON.stringify(currentCart));
//         dispatch({ type: UPDATECART, payload: currentCart });

//     };

// }

function getCart() {
  const localCart = JSON.parse(localStorage.getItem("cart"));
  console.log("local", localCart);
  return (dispatch) => {
    dispatch({ type: GETCART, payload: localCart });
  };
}

export default {
  addtocart,
  getCart,
  increaseQty,
  decreaseQty,
  removeQty,
};
