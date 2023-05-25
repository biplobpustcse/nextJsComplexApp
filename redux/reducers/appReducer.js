const initialState = () => {
  const initial = {
    compareItems: [],
    quoteItems: [],
    stockItems: [],
    address: {},
    store: {},
    isPaymentActive: false,
    cartCollection: [],
    today_discount_limit_amount : ""
  };
  return {
    ...initial,
  };
};

export default (state = initialState(), action) => {
  if (action.type === "STORE_COMPARE_ITEM") {
    const compareItems = [...state.compareItems];
    compareItems.push(action.item);
    //store localStorage
    return {
      ...state,
      compareItems: compareItems,
    };
  } else if (action.type === "STORE_QUOTE_ITEM") {
    const quoteItems = [...state.quoteItems];
    quoteItems.push(action.item);
    return {
      ...state,
      quoteItems: quoteItems,
    };
  } else if (action.type == "STORE_REQUEST_ITEM") {
    const stockItems = [...state.stockItems];
    stockItems.push(action.item);
    return {
      ...state,
      stockItems: stockItems,
    };
  } else if (action.type === "UPDATE_REQUEST_ITEM") {
    let CtxStockItems = [...state.stockItems];
    const findCtxItem = CtxStockItems.find(
      (itemfind) => itemfind.barcode === action.item.barcode
    );
    if (action.item.quantity === 0) {
      CtxStockItems = CtxStockItems.filter(
        (item) => item.barcode !== action.item.barcode
      );
    }
    findCtxItem.quantity = action.item.quantity;
    return {
      ...state,
      stockItems: CtxStockItems,
    };
  } else if (action.type === "UPDATE_QUOTE_ITEM") {
    let CtxQuoteItems = [...state.quoteItems];
    const findCtxItem = CtxQuoteItems.find(
      (itemfind) => itemfind.barcode === action.item.barcode
    );
    if (action.item.quantity === 0) {
      CtxQuoteItems = CtxQuoteItems.filter(
        (item) => item.barcode !== action.item.barcode
      );
    }
    findCtxItem.quantity = action.item.quantity;

    return {
      ...state,
      quoteItems: CtxQuoteItems,
    };
  } else if (action.type === "IMPORT_STOCK_LIST") {
    let stockItems = [...state.stockItems];
    // action.items.forEach((element) => {
    //   stockItems.push(element);
    // });

    return {
      ...state,
      stockItems: action.items,
    };
  } else if (action.type === "IMPORT_QUOTE_LIST") {
    let quoteItems = [...state.quoteItems];
    // action.items.forEach((element) => {
    //   quoteItems.push(element);
    // });
    return {
      ...state,
      quoteItems: action.items,
    };
  } else if (action.type === "SERVER_CART_COLLECTION") {
    return {
      ...state,
      cartCollection: action.items,
    };
  } else if (action.type === "SERVER_CART_COLLECTION_REMOVE_ITEM") {
    let cartCollection = [...state.cartCollection];
    let stateItems = cartCollection.filter(
      (item) => item.barcode !== action.item.barcode
    );
    return {
      ...state,
      cartCollection: stateItems,
    };
  } else if (action.type === "REMOVE_SERVER_CART_COLLECTION") {
    return {
      ...state,
      cartCollection: [],
    };
  } else if (action.type === "CLEAR_QUOTE_LIST") {
    return {
      ...state,
      quoteItems: [],
    };
  } else if (action.type === "CLEAR_REQUEST_LIST") {
    return {
      ...state,
      stockItems: [],
    };
  } else if (action.type === "SHIPPING_ADDRESS") {
    return {
      ...state,
      address: action.item,
    };
  } else if (action.type === "STORE_ADDRESS") {
    return {
      ...state,
      store: action.item,
    };
  } else if (action.type === "SHIPPING_ADDRESS_CLEAR") {
    return {
      ...state,
      address: {},
    };
  } else if (action.type === "STORE_ADDRESS_CLEAR") {
    return {
      ...state,
      store: {},
    };
  } else if (action.type === "UPDATE_COMPARE_LIST") {
    return {
      ...state,
      compareItems: action.payload,
    };
  } else if (action.type === "ACTIVE_PAYMENT_STATE") {
    return {
      ...state,
      isPaymentActive: action.payload,
    };
  }

  else if (action.type === "TODAY_DISCOUNT_LIMIT_AMOUNT") {
    return {
      ...state,
      today_discount_limit_amount: action.payload,
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
