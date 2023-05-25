import React from 'react'
import { API } from '../config';
import axios from 'axios';

class Category {
    async getAllCategories(id) {
        const reponse = await axios.get(`${API}/categories?parent_id=${id}`, {
                headers: {

                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new Category();