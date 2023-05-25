import React from "react";
import { API } from "../config";
import axios from "axios";

export const getAllJobs = async () => {
  console.log(`${API}/jobs/all`);
  const result = await axios
    .get(`${API}/jobs/all`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => ({ error: JSON.stringify(error) }));
  console.log("res", result);
  return result;
};
export const getSingleJob = async (id) => {
  console.log(`${API}/jobs/all`);
  const result = await axios
    .get(`${API}/jobs/all?id=${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => ({ error: JSON.stringify(error) }));
  console.log("res", result);
  return result;
};

// export default carrer
//  class Carrer {
//     getAllJobs() {
//         const reponse = axios.get(`${API}/jobs/all`)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => ({ error: JSON.stringify(error) }));
//         return reponse;
//     }

//     getSingleJob(id) {
//         const reponse = axios.get(`${API}/jobs/all?id=${id}`)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => ({ error: JSON.stringify(error) }));
//         return reponse;
//     }

// }
