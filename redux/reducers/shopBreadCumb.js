const initialState = () => {
  const initial = {
    breadCumb: { dept: "", cat1: "", subCat: "", subCat2: "", subCat3: "" },
  };

  let data;
  let breadCumb = {};

  if (typeof window != "undefined") {
    data = localStorage.getItem("dataBreadcumb");
    if (data) {
      breadCumb = JSON.parse(data);
    }
  }

  return {
    ...initial,
    breadCumb: breadCumb,
  };
};

export default (state = initialState(), action) => {
  // export const authReduce = (state = initialState(), action) => {
  if (action.type === "setBredCumbdata") {
    let user;
    if (typeof window != "undefined") {
      localStorage.setItem("dataBreadcumb", JSON.stringify(action.payload));
    }
    return {
      ...state,
      breadCumb: action.payload,
    };
  }
  if (action.type === "GET_BREAD_CUMB_DATA") {
    return {
      ...state,
      breadCumb: action.payload,
    };
  } else {
    return state;
  }
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
