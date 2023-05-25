import { toast } from "react-toastify";
import { getToken } from "../components/lib/token";

// export const baseUrl = "http://127.0.0.1:8000/api/v2";
// export const baseUrl = 'http://103.248.13.236:8085/wholesaleclub/api/v2';
// export const baseUrl = "http://139.99.69.81:8085/api/v2";
export const baseUrl = "https://backend.wholesaleclubltd.com/api/v2";
// export const baseUrl = "http://103.248.13.236:8085/wcl/api/v2";
export const frontendBaseUrl = "https://wholesaleclubltd.com"
// export const frontendBaseUrl = "http://127.0.0.1:8077/"

export const get = async ({
  url,
  headers = {},
  before = () => {},
  successed = (data) => {},
  failed = (data) => {},
  always = (data) => {},
  map = (data) => {
    if (data.data) {
      return data.data;
    } else return data;
  },
}) => {
  const token = await getToken();
  // this is for token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  before();

  const response = await fetch(`${baseUrl}/${url}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    always(data);
    failed(data, data.message);
    throw new Error(data.message || "Login failed");
    toast.error("Something Went Wrong.");
  }

  // if (data.IsError) {
  //   always(data);
  //   failed(data, data.Msg);
  //   throw new Error(`${data.Msg || "Login failed"}`);
  // }

  const transformedData = map(data);

  always(data);
  successed(transformedData);
  return transformedData;
};

export const post = async ({
  url,
  headers = {},
  payload = {},
  before = () => {},
  successed = (data) => {},
  failed = (data) => {},
  always = (data) => {},
  map = (data) => {
    if (data.data) {
      return data.data;
    } else return data;
  },
  dataPath = "",
}) => {
  const token = await getToken();
  // this is for token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  before();
  console.log("json", JSON.stringify(payload));
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",

      ...headers,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    always(data);
    failed(data, data.message);
    throw new Error(data.message || "Login failed");
    toast.error("Something Went Wrong.");
  }

  // if (data.IsError) {
  //   always(data);
  //   failed(data, data.Msg);
  //   throw new Error(`${data.Msg || "Login failed"}`);
  // }

  const transformData = map(data);

  always(data);
  successed(transformData);
  return transformData;
};

export const file = async ({
  url,
  headers = {},
  payload = {},
  before = () => {},
  successed = (data) => {},
  failed = (data) => {},
  always = (data) => {},
  map = (data) => {
    if (data.data) {
      return data.data;
    } else return data;
  },
}) => {
  before();

  const formData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    formData.append(key, value);
  }
  // formData.append('_method', 'PUT')
  const token = await getToken();

  // this is for token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      // "content-type": "application/json",
      ...headers,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    failed(data);
    toast.error("Something Went Wrong.");
  }
  if (response.ok) {
    const transformData = map(data);
    successed(transformData);
  }
  // if (data.statusCode >= 200 && data.statusCode < 300) {

  // }
  // if (data.statusCode >= 400 && data.statusCode < 500) {
  //   failed(data);
  // }
  // if (data.statusCode >= 500 && data.statusCode < 600) {
  //   failed(data);
  //   throw new Error(`${data.message || "Error Occured"}`);
  // }

  always(data);
  return data;
};

export const get1 = async ({
  url,
  headers = {},
  before = () => {},
  successed = (data) => {},
  failed = (data) => {},
  always = (data) => {},
  map = (data) => {
    return data;
  },
}) => {
  before();
  const token = await getToken();
  // this is for token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    always(data);
    failed(data, data.message);
    throw new Error(data.message || "Login failed");
    toast.error("Something Went Wrong.");
  }

  if (data.IsError) {
    always(data);
    failed(data, data.Msg);
    throw new Error(`${data.Msg || "Login failed"}`);
  }

  const transformedData = map(data);

  always(data);
  successed(transformedData);
  return transformedData;
};

export const http = { get, post, file, get1, baseUrl ,frontendBaseUrl};
