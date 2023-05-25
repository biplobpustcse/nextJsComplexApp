import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import cartReducer from "./cart";
import categoryReducer from "./categoryReducer";
import departmentReducer from "./departmentReducer";
import authRedux from "./authRedux";
import cartRedux from "./cartRedux";
import wishlistRedux from "./wishlistRedux";
import shopBreadCumb from "./shopBreadCumb";
import productMaxPriceReducer from "./productMaxPriceReducer";
import HomeDataReducer from "./HomeDataReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  authentication: authReducer,
  products: productReducer,
  cart: cartReducer,
  category: categoryReducer,
  department: departmentReducer,
  authReducerContext: authRedux,
  wishReducerContext: wishlistRedux,
  appReducerContext: appReducer,
  cartReducerContext: cartRedux,
  bredCumbData: shopBreadCumb,
  productPrice: productMaxPriceReducer,
  HomeData: HomeDataReducer,
});

export default rootReducer;
