const getToken = async () => {
  let user = localStorage.getItem("USERWHOLESALE25");
  if (user) {
    return JSON.parse(user).access_token;
  }
  return null;
};

export { getToken };
