import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = () => {
  // set initial cartContext
  const initial = {
    TotalItems: 0,
    TotalAmmount: 0,
    Items: [],
    EstimateSaving:0
  };
  //get local storage items
  let getCartFromLocalStorage;
  if (typeof window != "undefined") {
    getCartFromLocalStorage = localStorage.getItem("CARTV1WHOLESALE25");
  }
  let TotalItems = 0,
    TotalAmmount = 0,
    Items = [];
  if (getCartFromLocalStorage) {
    let cartModel = JSON.parse(getCartFromLocalStorage);
    TotalItems = cartModel.TotalItems;
    TotalAmmount = cartModel.TotalAmmount;
    Items = cartModel.Items;
    console.log("Items: ", getCartFromLocalStorage.TotalItems);
    console.log("TotalAmmount: ", getCartFromLocalStorage.TotalAmmount);
  }

  //return items in context
  return {
    ...initial,
    TotalItems,
    TotalAmmount,
    Items,
  };
};
//#endregion initial state
// const user = useSelector((state) => {
//   return state.authReducerContext.user
//
// })
export default (state = initialState(), action) => {
  //calculation Discount ammount of price
  const calcDiscountAmmount = (item) => {
    //  let productPrice = item.MRP - (item.MRP * item.discount) / 100;


    let productPrice = 0;
    // console.log(item,'xxxx')
    let member_type = localStorage.getItem('USERWHOLESALE25') != null &&  JSON.parse(localStorage.getItem('USERWHOLESALE25')).user.membership_type

    if((member_type != null && member_type != "") && parseFloat(item.silver_member_price)  > 0 && item.type!="package" && item.isPeak != true){

       productPrice = parseFloat(item.silver_member_price);
    }
    else if(item.type=="package"){


      productPrice =  parseFloat(item.price);
    }
    else {


      productPrice =  parseFloat(item.discountPrice);
    }
   
    return productPrice;
  };

  //calculation without discounted price
  const calcAmmount = (item) => {

    let productPrice = parseFloat(item.price);
     
    return productPrice;
  };

  //add to cart variant item
  if (action.type == "VARIANT_ADD_CART") {
    let cartModel = { Items: [] };
    const getLocalCart = localStorage.getItem("CARTV1WHOLESALE25");
    if (getLocalCart) {
      cartModel = JSON.parse(getLocalCart);
    }
    const cartCtxItems = [...cartModel.Items];
    // let stateTotalItems = state.TotalItems;
    // let stateTotalAmmount = state.TotalAmmount;
    // if (cartCtxItems.find((item) => item.barcode === action.item.barcode)) {
    //   return {
    //     ...state,
    //     TotalItems: stateTotalItems,
    //     TotalAmmount: stateTotalAmmount,
    //     Items: cartCtxItems,
    //   };
    // } else {
    if (action.item.ingredientQuantity) {
      action.item.quantity = action.item.ingredientQuantity;
    }
    else {
      // if (action.item.quantity > 1) {
      //   action.item.quantity = action.item.quantity;
      // }
      // else action.item.quantity = 1;
      action.item.quantity = 1
    }

    //! promotion
    if (action.promotion) {
      action.item.type = action.item.promotion;
      action.item.promotion_code = action.item.promotion_code;
    } else {
      action.item.type = "product";
      action.item.promotion_code = null;
    }

    //! end promotion

    const stateItems = cartCtxItems;
    if(action.item.color != undefined || action.item.size!=undefined ){
      stateItems.push(action.item);
    }
    let stateTotalItems = state.TotalItems;
    stateTotalItems += 1;
    let stateTotalAmmount = state.TotalAmmount;
    if (action.item.discount > 0) {
      let main_price = action.item.price

      let productPrice =
        calcDiscountAmmount(action.item) * parseFloat(action.item.quantity);

      stateTotalAmmount += productPrice;
      action.item.discountPrice = productPrice
      action.item.price = productPrice
      action.item.member_price = action.item.base_price == undefined ? main_price - action.item.discountPrice : action.item.base_price - action.item.discountPrice
    } else {
      stateTotalAmmount +=
        calcAmmount(action.item) * parseFloat(action.item.quantity);
    }
    //store localStorage
    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: stateTotalItems,
        TotalAmmount: stateTotalAmmount,
        Items: stateItems,
      })
    );
    //update context state
    return {
      ...state,
      TotalItems: stateTotalItems,
      TotalAmmount: stateTotalAmmount,
      Items: stateItems,
    };
  }

  //add to cart reducer  action
  if (action.type === "Store_Cart_Item") {

    const cartCtxItems = [...state.Items];
    let stateTotalItems = state.TotalItems;
    let stateTotalAmmount = state.TotalAmmount;

    if (
      cartCtxItems.find(
        (item) => item.id === action.item.id && item.offer === action.item.offer
      )
    ) {


      let ctxItems = cartCtxItems.find(
          (item) => item.id === action.item.id && item.offer === action.item.offer
      );
      ctxItems.quantity = action.item.quantity;
      if(ctxItems.offer == 'todays_deal'){

        ctxItems.price = action.item.price
      }


      return {
        ...state,
        TotalItems: stateTotalItems,
        TotalAmmount: stateTotalAmmount,
        Items: cartCtxItems,
      };

    } else {

      if (action.item.ingredientQuantity) {
        action.item.quantity = action.item.ingredientQuantity;
      } else {
        if (action.item.quantity > 1) {
          action.item.quantity = action.item.quantity;
        } else action.item.quantity = 1;
      }
      const stateItems = [...state.Items];
      // stateItems.push(action.item);
      let stateTotalItems = state.TotalItems;
      stateTotalItems += 1;
      let stateTotalAmmount = state.TotalAmmount;
      //! promotion
      if (action.item.promotion) {
        action.item.type = action.item.promotion;
        action.item.promotion_code = action.item.promotion_code;
      } else {
        action.item.type = "product";
        action.item.promotion_code = 0;
      }



      let item;

      //! end promotion
      if ((action.item.discount > 0 || action.item.silver_member_price > 0) && (action.item.offer == '' || action.item.offer == null)) {


        const main_price = action.item.price
        const productPrice2 = calcDiscountAmmount(action.item) * parseFloat(action.item.quantity);

        stateTotalAmmount += productPrice2;

        item = action.item;

        item.discountPrice =  calcDiscountAmmount(action.item);
        item.price =  main_price;
        item.member_price = action.item.isPeak == true ? 0 : action.item.base_price == undefined && main_price>=action.item.discountPrice ? main_price - action.item.discountPrice : action.item.base_price - action.item.discountPrice
        // action.item.discountPrice =  calcDiscountAmmount(action.item);
        // action.item.price =  main_price;
        // action.item.member_price = action.item.base_price == undefined && main_price>=action.item.discountPrice ? main_price - action.item.discountPrice : action.item.base_price - action.item.discountPrice

      } else {
        stateTotalAmmount += calcAmmount(action.item) * parseFloat(action.item.quantity);
        item = action.item;
      }

      stateItems.push(item);


      // //! end promotion
      // if ((action.item.discount > 0 || action.item.silver_member_price > 0) && (action.item.offer == '' || action.item.offer == null)) {
      //
      //
      //   const main_price = action.item.price
      //   const productPrice2 =
      //     calcDiscountAmmount(action.item) * parseFloat(action.item.quantity);
      //
      //   stateTotalAmmount += productPrice2;
      //   action.item.discountPrice =  calcDiscountAmmount(action.item);
      //   action.item.price =  main_price;
      //   action.item.member_price = action.item.base_price == undefined && main_price>=action.item.discountPrice ? main_price - action.item.discountPrice : action.item.base_price - action.item.discountPrice
      //
      // } else {
      //
      //   stateTotalAmmount +=
      //     calcAmmount(action.item) * parseFloat(action.item.quantity);
      // }
      //
      // stateItems.push(action.item);


      //store localStorage
      localStorage.setItem(
        "CARTV1WHOLESALE25",
        JSON.stringify({
          TotalItems: stateTotalItems,
          TotalAmmount: stateTotalAmmount,
          Items: stateItems,
        })
      );
      //update context state
      return {
        ...state,
        TotalItems: stateTotalItems,
        TotalAmmount: stateTotalAmmount,
        Items: stateItems,
      };
    }
  }

  if (action.type === "Store_Cart_WEIGHT_Item") {
    const cartCtxItems = [...state.Items];
    let stateTotalItems = state.TotalItems;
    let stateTotalAmmount = state.TotalAmmount;
    //! promotion
    if (action.item.promotion) {
      action.item.type = action.item.promotion;
      action.item.promotion_code = action.item.promotion_code;
    } else {
      action.item.type = "product";
      action.item.promotion_code = 0;
    }
    //! end promotion
    if (cartCtxItems.find((item) => item.id === action.item.id)) {
      return {
        ...state,
        TotalItems: stateTotalItems,
        TotalAmmount: stateTotalAmmount,
        Items: cartCtxItems,
      };
    } else {
      if (action.item.ingredientQuantity) {
        action.item.quantity = action.item.ingredientQuantity;
      } else {
        action.item.quantity = action.qty;
      }
      action.item.quantity = action.qty;
      const stateItems = [...state.Items];
      stateItems.push(action.item);
      let stateTotalItems = state.TotalItems;
      stateTotalItems += 1;
      let stateTotalAmmount = state.TotalAmmount;
      //! promotion
      if (action.item.promotion) {
        action.item.type = action.item.promotion;
        action.item.promotion_code = action.item.promotion_code;
      } else {
        action.item.type = "product";
        action.item.promotion_code = 0;
      }
      //! end promotion
      console.log(action.item + "action.item");

      if (action.item.discount > 0) {
        let main_price = action.item.price

        let productPrice =
          calcDiscountAmmount(action.item) * parseFloat(action.item.quantity);
        toast.success(productPrice);
        stateTotalAmmount += productPrice;
        action.item.discountPrice = productPrice
        action.item.price = productPrice
        action.item.member_price = action.item.base_price == undefined ? main_price - action.item.discountPrice : action.item.base_price - action.item.discountPrice

      } else {
        console.log(
          "prantho" + calcAmmount(action.item) + JSON.stringify(action.item)
        );
        stateTotalAmmount +=
          calcAmmount(action.item) * parseFloat(action.item.quantity);
      }
      //store localStorage
      localStorage.setItem(
        "CARTV1WHOLESALE25",
        JSON.stringify({
          TotalItems: stateTotalItems,
          TotalAmmount: stateTotalAmmount,
          Items: stateItems,
        })
      );
      //update context state
      return {
        ...state,
        TotalItems: stateTotalItems,
        TotalAmmount: stateTotalAmmount,
        Items: stateItems,
      };
    }
  }

  //remove a single item
  // #region Some
  else if (action.type === "REMOVE_SINGLE_ITEM") {
    let cartcontextItems = [...state.Items];
    //local storage update
    let getCartFromLocalStorage = localStorage.getItem("CARTV1WHOLESALE25");
    getCartFromLocalStorage = JSON.parse(getCartFromLocalStorage);
    let index;
    if (action.item?.type == "package") {
      index = getCartFromLocalStorage.Items.findIndex(
        (item2) => item2.id === action.item.id
      );
    } else if (action.item.offer && action.item.offer.length > 0) {
      index = getCartFromLocalStorage.Items.findIndex(
        (item2) => item2.offer == action.item.offer
      );
    } else {
      index = getCartFromLocalStorage.Items.findIndex(
        (item2) => item2.barcode === action.item.barcode
      );
    }
    getCartFromLocalStorage.Items.splice(index, 1);

    let totalAmmount = 0;
    //context update
    let stateItems;

    if (action.item.type == "package") {
      stateItems = cartcontextItems.filter(
        (item) => item.id !== action.item.id
      );
    } else if (action.item.offer.length > 0) {
      stateItems = cartcontextItems.filter(
        (item) => item.offer != action.item.offer
      );
    } else if (
      cartcontextItems.filter((i) => i.barcode == action.item.barcode).length >=
      2
    ) {
      // let index = cartcontextItems.findIndex(
      //   (item2) => item2.barcode == action.item.barcode && item2.offer == ""
      // );
      // stateItems = cartcontextItems.splice(index, 1);

      let filterdArray = [];
      cartcontextItems.filter((item) => {
        if (item.offer == "" && item.barcode == action.item.barcode) {
          return;
        } else {
          filterdArray.push(item);
        }
        stateItems = filterdArray;
      });
    } else
      stateItems = cartcontextItems.filter(
        (item) => item.barcode !== action.item.barcode
      );

    let stateTotalItems = state.TotalItems;
    stateTotalItems -= 1;
    stateItems.forEach((element) => {
      let mrpPriceOfSingleProduct;

      if ((element.discount > 0 || element.silver_member_price > 0) && (element.offer == '' || element.offer == null)) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });

    //update local storage
    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: stateTotalItems,
        TotalAmmount: totalAmmount,
        Items: stateItems,
      })
    );
    //return context update
    return {
      ...state,
      TotalItems: stateTotalItems,
      TotalAmmount: totalAmmount,
      Items: stateItems,
    };
  }
  //#endregion Some

  //update Quantity
  else if (action.type === "UPDATE_QTY") {

    let CtxItems = [...state.Items];

    let findCtxItem;

    if (action.item.type == "package") {
      findCtxItem = CtxItems.find((itemfind) => itemfind.id === action.item.id);
    } else {
      findCtxItem = CtxItems.find(
        (itemfind) =>
          itemfind.barcode === action.item.barcode &&
          itemfind.offer === action.item.offer
      );
    }

    if (action.qty === 0) {
      let getCartFromLocalStorage = localStorage.getItem("CARTV1WHOLESALE25");
      getCartFromLocalStorage = JSON.parse(getCartFromLocalStorage);
      const index = getCartFromLocalStorage.Items.findIndex(
        (item2) => item2.id === action.item.id
      );
      getCartFromLocalStorage.Items.splice(index, 1);
      if (action.item.type == "package") {
        CtxItems = CtxItems.filter((item) => item.id !== action.item.id);
      } else {
        CtxItems = CtxItems.filter(
          (item) => item.barcode !== action.item.barcode
        );
      }
    }
    if (findCtxItem) {
      findCtxItem.quantity = action.qty;
    }

    let totalAmmount = 0;

    CtxItems.forEach((element) => {
      let mrpPriceOfSingleProduct;

      if (parseFloat(element.discount) > 0 || (parseFloat(element.silver_member_price) > 0) && (element.offer == '' || element.offer == null)) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      // if (element.is_weight == 1) {
      //   totalAmmount =
      //     totalAmmount +
      //     +(
      //       mrpPriceOfSingleProduct *
      //       (parseFloat(element.quantity) / parseFloat(element.selectedWeight))
      //     );
      // } else totalAmmount += mrpPriceOfSingleProduct * element.quantity;
      totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });

    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: CtxItems.length,
        TotalAmmount: totalAmmount,
        Items: CtxItems,
      })
    );
    return {
      ...state,
      TotalItems: CtxItems.length,
      TotalAmmount: totalAmmount,
      Items: CtxItems,
    };
  }

  //adding single item
  else if (action.type === "ADD_SINGLE_PRODUCT") {
    const cartCtxItems = [...state.Items];
    cartCtxItems.push(action.item);
    action.item.quantity = action.qty;
    let totalAmmount = 0;

    cartCtxItems.forEach((element) => {
      let mrpPriceOfSingleProduct;
      if (element.discount > 0) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });

    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: cartCtxItems.length,
        TotalAmmount: totalAmmount,
        Items: cartCtxItems,
      })
    );
    return {
      ...state,
      TotalItems: cartCtxItems.length,
      TotalAmmount: totalAmmount,
      Items: cartCtxItems,
    };
  } else if (action.type == "CART_IMPORT_FROM_DATABASE") {
    let CtxItems = action.items;
    let totalAmmount = 0;

    CtxItems.forEach((element) => {
      let mrpPriceOfSingleProduct;
      if (element.discount > 0) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      if (element.is_weight == 1) {
        totalAmmount =
          totalAmmount +
          mrpPriceOfSingleProduct *
            (parseFloat(element.quantity) / parseFloat(element.selectedWeight));
      } else totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });

    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: CtxItems.length,
        TotalAmmount: totalAmmount,
        Items: CtxItems,
      })
    );
    return {
      ...state,
      TotalItems: CtxItems.length,
      TotalAmmount: totalAmmount,
      Items: CtxItems,
    };
  }

  //Update Editable quantity update
  else if (action.type === "UPDATE_EDITABLE_QTY") {
    let CtxItems = [...state.Items];
    let findCtxItem;
    if (action.item.type == "package") {
      findCtxItem = CtxItems.find((itemfind) => itemfind.id === action.item.id);
    } else {
      findCtxItem = CtxItems.find(
        (itemfind) =>
          itemfind.barcode === action.item.barcode &&
          itemfind.offer === action.item.offer
      );
    }
    if (action.qty === "") {
      action.qty = parseFloat(0);
    }
    findCtxItem.quantity = parseFloat(action.qty);
    let totalAmmount = 0;

    CtxItems.forEach((element) => {
      let mrpPriceOfSingleProduct;
      if (element.discount > 0) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      // if (element.is_weight == 1) {
      //   totalAmmount =
      //     totalAmmount +
      //     mrpPriceOfSingleProduct *
      //       (parseFloat(element.quantity) / parseFloat(element.selectedWeight));
      // } else totalAmmount += mrpPriceOfSingleProduct * element.quantity;
      totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });

    localStorage.setItem(
      "CARTV1WHOLESALE25",
      JSON.stringify({
        TotalItems: CtxItems.length,
        TotalAmmount: totalAmmount,
        Items: CtxItems,
      })
    );
    return {
      ...state,
      TotalItems: CtxItems.length,
      TotalAmmount: totalAmmount,
      Items: CtxItems,
    };
  }

  // clear cart & LocalStorage
  else if (action.type === "CLEAR_CART_ITEMS") {
    localStorage.removeItem("CARTV1WHOLESALE25");

    return {
      ...state,
      TotalItems: 0,
      TotalAmmount: 0,
      Items: [],
    };
  } else if (action.type === "UPDATE_PRODUCT_PRICE") {
    let CtxItems = [...state.Items];
    const UpdateCtxItems = CtxItems.map(function (element) {
      // return console.log(element)
      const findElement = action.items.find((item) => item.id === element.id);
      if (findElement.UnitSalePrice !== element.MRP) {
        element.MRP = findElement.UnitSalePrice;
      }
      if (findElement.Discount !== element.discount) {
        element.discount = findElement.Discount;
      }
      return element;
    });
    // console.log({UpdateCtxItems})
    let totalAmmount = 0;
    let totalItems = state.TotalItems;

    UpdateCtxItems.forEach((element) => {
      let mrpPriceOfSingleProduct;
      if (element.discount > 0) {
        mrpPriceOfSingleProduct = calcDiscountAmmount(element);
      } else {
        mrpPriceOfSingleProduct = calcAmmount(element);
      }
      totalAmmount += mrpPriceOfSingleProduct * element.quantity;
    });
    return {
      ...state,
      TotalItems: totalItems,
      TotalAmmount: totalAmmount,
      Items: UpdateCtxItems,
    };
  } else if (action.type == "CART_UPDATED") {
    console.log(action.payload);
    return {
      ...state,
      TotalItems: action.payload.TotalItems,
      TotalAmmount: action.payload.TotalAmmount,
      Items: action.payload.Items,
    };
  }else if(action.type=='ESTIMATED_SAVING'){
    return {
      ...state,
      EstimateSaving: action.payload.estimatedAmount
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
