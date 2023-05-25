import React from 'react'
import { API } from '../config';
import axios from 'axios';

 class Department {
    async getAllDepartment(id) {
        const reponse = await axios.get(`${API}/departments/all`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async getFeaturedCategories(id) {
    //     const reponse = await axios.get(`${API}/categories/featured`)
    //     .then((response) => {
    //         return response.data;
    //     })
    //     .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }
    // async getTopCategories(id) {
    //     const reponse = await axios.get(`${API}/categories/top`)
    //     .then((response) => {
    //         return response.data;
    //     })
    //     .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }
    // async getHomeCategories(id) {
    //     const reponse = await axios.get(`${API}/home-categories`)
    //     .then((response) => {
    //         return response.data;
    //     })
    //     .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }
    // async getSubCategories(id) {
    //     const reponse = await axios.get(`${API}/sub-categories/${id}`)
    //     .then((response) => {
    //         return response.data;
    //     })
    //     .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }
    // async getDepartmentCategories(id) {
    //     const reponse = await axios.get(`${API}/getcategoriesbydepartment/${id}`)
    //     .then((response) => {
    //         return response.data;
    //     })
    //     .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }

}

export default new Department();
