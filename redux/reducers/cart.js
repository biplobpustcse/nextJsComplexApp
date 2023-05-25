import { UPDATECART, GETCART } from "../types";

const initialState = {
  cartItems: [],
  amount: 0,
  cartTotal: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATECART:
      return {
        ...state,
        ...{ cartItems: action.payload.cartItems },
        ...{ amount: action.payload.amount },
        ...{ cartTotal: action.payload.cartTotal },
      };
    case GETCART:
      return {
        ...state,
        ...action.payload,
        // ...{ cartItems: action.payload.cartItems },
        // ...{ amount: action.payload.amount },
        // ...{ cartTotal: action.payload.cartTotal },
      };
    default:
      return state;
  }
};
