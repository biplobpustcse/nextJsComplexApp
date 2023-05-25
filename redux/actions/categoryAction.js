import Router from "next/router";
import {
  CATEGORIES,
  FEATURECATEGORIES,
  TOPCATEGORIES,
  HOMECATEGORIES,
  SUBCATEGORIES,
  DEPARTMENTCATEGORIES,
  SET_ALL_RECIPIES,
  SET_ALL_MENUS,
  SET_ALL_CELEBRATION,
  SET_ALL_CELEBRATION_DAY,
  SET_ALL_COLLECTION,
} from "../types";
import { API } from "../../config";
import axios from "axios";
import CategoryRepository from "../../repositories/category";

// Gets token from the API and stores it in the redux store and in cookie
function getAllCategories(id) {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getAllCategories();
      console.log("categ", response.data);
      dispatch({ type: CATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}
function getFeaturedCategories() {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getFeaturedCategories();
      dispatch({ type: FEATURECATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}
function getTopCategories() {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getTopCategories();
      dispatch({ type: TOPCATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}
function getHomeCategories() {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getHomeCategories();
      dispatch({ type: HOMECATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}

function getSubCategories(id) {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getSubCategories();
      dispatch({ type: SUBCATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}
function getDepartmentCategories(id) {
  return async (dispatch) => {
    try {
      let response = await CategoryRepository.getDepartmentCategories();
      dispatch({ type: DEPARTMENTCATEGORIES, payload: response.data });
    } catch (err) {
      alert(err);
    }
  };
}

export  const setMenus = (data) => async (dispatch) => {

    dispatch({
      type : SET_ALL_MENUS,
      payload : {
        'data' : data
      }
    })

}
export  const SetAllRecipies = (data) => async (dispatch) => {

    dispatch({
      type : SET_ALL_RECIPIES,
      payload : {
        'data' : data
      }
    })

}
export  const CelebrationList = (data) => async (dispatch) => {

    dispatch({
      type : SET_ALL_CELEBRATION,
      payload : {
        'data' : data
      }
    })

}
export  const CelebrationDay = (data) => async (dispatch) => {

    dispatch({
      type : SET_ALL_CELEBRATION_DAY,
      payload : {
        'data' : data
      }
    })

}
export  const CollectionList = (data) => async (dispatch) => {

    dispatch({
      type : SET_ALL_COLLECTION,
      payload : {
        'data' : data
      }
    })

}

export default {
  getAllCategories,
  getFeaturedCategories,
  getTopCategories,
  getHomeCategories,
  getSubCategories,
  getDepartmentCategories,
};
