import { PRODUCTSLODE,PRODUCTLODE } from '../types';

const initialState = {
    productList:[],
    product:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTSLODE:
            return {...state,
                ...{ productList: action.payload },};
        case PRODUCTLODE:
            return {...state,
                ...{ product: action.payload },};//return { product: action.payload };
        default:
            return state;
    }
};