import { API } from '../config';
import axios from 'axios';
import Router from 'next/router';

class ProductRepository {
    

   async getProducts() {
        const reponse = await axios.get(`${API}/products`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductById(id) {
        const reponse = await axios.get(`${API}/products/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new ProductRepository();