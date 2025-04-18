import { AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
    token: null, 
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            //return { token: action.payload };
            return {token: action.payload, //action.payload?.access_token
                    user:  action.payload};//?.user
        case DEAUTHENTICATE:
            return { token: null };
        default:
            return state;
    }
};
