const initialState = () => {
  const initial = {
    product: {},
    viewProducts: [],
    isJoinMemberShip: false,
    isRegisterMemberShip: false,
    isRenewMemberShip: false,

  };

  return {
    ...initial,
  };
};
export default (state = initialState(), action) => {
  // export const authReduce = (state = initialState(), action) => {
    let currentProduct=[];
    if (typeof window != "undefined") {
      currentProduct = JSON.parse(localStorage.getItem("viewProducts"));
    }
  if (action.type === "setViewProduct") {
    
    if (typeof window != "undefined") {
      let selectedItem=[]; 
      if(currentProduct!=null){
        selectedItem = currentProduct.filter(
          (item) => item.id == action.payload[0].id
        );
        if (selectedItem.length==0) {
          currentProduct.push(action.payload[0]);
          localStorage.setItem("viewProducts", JSON.stringify(currentProduct));
        }
      }
      else{
        currentProduct=[];
        if (selectedItem.length==0) {
          currentProduct.push(action.payload[0]);
          localStorage.setItem("viewProducts", JSON.stringify(currentProduct));
        }
      }
    }
    return {
      ...state,
      product: action.payload[0],
      viewProducts: currentProduct,
    };
  } 
  else if (action.type === "removeViewProduct") {
    
    if (typeof window != "undefined") {
      currentProduct=[];
    }
    return {
      ...state,
      product: action.payload,
      viewProducts: currentProduct,
    };
  } 
  else if (action.type === "getViewProduct") {
    //   let localProduct=[];
    // if (typeof window != "undefined") {
    //   localProduct = JSON.parse(localStorage.getItem("viewProducts"));
    // }
    return {
      ...state,
      viewProducts: currentProduct,
    };
  } else if (action.type === "JOIN_MEMBER_SHIP_LOGIN") {
    
  return {
    ...state,
    viewProducts: currentProduct,
    isJoinMemberShip: action.payload,
  };
}  else if (action.type === "REGISTER_MEMBER_SHIP_LOGIN") {
  // let localProduct=[];
  // if (typeof window != "undefined") {
  //   localProduct = JSON.parse(localStorage.getItem("viewProducts"));
  // }
return {
  ...state,
  viewProducts: currentProduct,
  isRegisterMemberShip: action.payload,
};
}  else if (action.type === "RENEW_MEMBER_SHIP_LOGIN") {
  // let localProduct=[];
  // if (typeof window != "undefined") {
  //   localProduct = JSON.parse(localStorage.getItem("viewProducts"));
  // }
return {
  ...state,
  viewProducts: currentProduct,
  isRenewMemberShip: action.payload,
};
} 
  else {
    return state;
  }
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
