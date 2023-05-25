import Cookies from "js-cookie";
import { postRemoveWishItem } from "../../components/lib/endpoints";
import { http } from "../../services/httpService";
import { setCookie } from 'cookies-next';


const initialState = () => {
  const initial = {
    Items: []
  };

  let wishLists=[];
  if (typeof window != "undefined") {
    wishLists = localStorage.getItem("wishList");
    if (wishLists) {
      wishLists = JSON.parse(wishLists);
    }
  }
  console.log("wishLists", wishLists);
  return {
    ...initial,
    Items: wishLists,
  };
};







export default (state = initialState(), action) => {
  if (action.type === "STORE_WISH_ITEM") {
    console.log("action", action.item)
    const wishedItems = [...state.Items, action.item];
   // wishedItems.push(action.item);
    localStorage.setItem("wishList", JSON.stringify(wishedItems));

    return {
      ...state,
      Items: wishedItems,
    };
  } else if (action.type === "REMOVE_WISH_ITEM") {
    const wishedItems = [...state.Items];
    const findItem = state.Items.filter((item2) => item2.id !== action.item.id);
    localStorage.setItem("wishList", JSON.stringify(findItem));
    return {
      ...state,
      Items: findItem,
    };
  } else if (action.type === "UPDATE_WISH_LIST") {
    return {
      ...state,
      Items: action.payload,
    };
  } else {
    console.log("state", state);
    return state;
  }
};

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
