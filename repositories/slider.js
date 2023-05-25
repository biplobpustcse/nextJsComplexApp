import React from "react";
import { API } from "../config";
import axios from "axios";

export const getAllSlider = async() => {
   const result= await axios.get(`${API}/all-sliders`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => ({ error: JSON.stringify(error) }));
  return result;
};