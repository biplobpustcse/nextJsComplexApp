
import { DEPARTMENTS } from '../types';


const initialState = {
    departments:[],
    
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DEPARTMENTS:
            return {...state,
                ...{ departments: action.payload },};
        default:
            return state;
    }
};