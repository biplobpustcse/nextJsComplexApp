const initialState = () => {
  const initial = {
    isLoggedIn: false,
    user: null,
    otpUserId: "",
    registration: { phone: "", password: "" },
  };

  let user;
  let storedUser = {};
  let isLoggedIn = false;
  if (typeof window != "undefined") {
    user = localStorage.getItem("USERWHOLESALE25");
    if (user) {
      storedUser = JSON.parse(user);
      isLoggedIn = true;
    }
  }

  return {
    ...initial,
    user: storedUser,
    isLoggedIn: isLoggedIn,
    otpUserId: "",
    registration: { phone: "", password: "" },
  };
};

export default (state = initialState(), action) => {
  // export const authReduce = (state = initialState(), action) => {
  if (action.type === "USER_LOGIN") {
    let user;
    if (typeof window != "undefined") {
      localStorage.setItem("USERWHOLESALE25", JSON.stringify(action.payload));
    }
    return {
      ...state,
      user: action.payload,
      isLoggedIn: true,
    };
  } else if (action.type === "USER_LOGOUT") {
    if (typeof window != "undefined") {
      localStorage.removeItem("USERWHOLESALE25");
    }
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    };
  } else if (action.type === "USER_OTP") {
    return {
      ...state,
      otpUserId: action.payload.user_id,
    };
  } else if (action.type === "USER_REGISTRATION") {
    return {
      ...state,
      registration: {
        phone: action.payload.phone,
        password: action.payload.password,
      },
    };
  } else if (action.type == "AUTH_UPDATED") {
    return {
      ...state,
      user: action.payload,
      isLoggedIn: true,
    };
  } else if (action.type == "PROFILE_NAME_UPDATE") {
    let user = state.user;
    user.user.name = action.payload;
    localStorage.setItem('USERWHOLESALE25',JSON.stringify(user))
    return {
      ...state,
      user: user,
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
