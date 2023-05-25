const initialState = () => {
    const initial = {
        price: [0,0],
    };

    return {
      ...initial
    };
  };
  
  export default (state = initialState(), action) => {
    // export const authReduce = (state = initialState(), action) => {
    if (action.type === "SET_PRODUCT_PRICE") {
      return {
        ...state,
        price: action.payload,
      };
    }
    if (action.type === "GET_PRODUCT_PRICE") {
        
        return {
          ...state,
          price: action.payload,
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
  