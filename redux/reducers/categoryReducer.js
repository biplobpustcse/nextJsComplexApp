
import {
    CATEGORIES,
    FEATURECATEGORIES,
    TOPCATEGORIES,
    HOMECATEGORIES,
    SUBCATEGORIES,
    DEPARTMENTCATEGORIES,
    SET_ALL_MENUS, SET_ALL_RECIPIES, SET_ALL_CELEBRATION, SET_ALL_CELEBRATION_DAY, SET_ALL_COLLECTION
} from '../types';


const initialState = {
    categories:[],
    featureCategories:[],
    topCategories:[],
    homeCategories:[],
    subCategories:[],
    departmentCategories:[],
    category:{},
    allMenus : [],
    allRecipies : [],
    allCelebrationList : [],
    allCelebrationDay : [],
    allCollection : []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES:
            return {...state,
                ...{ categories: action.payload },};
        case FEATURECATEGORIES:
            return {...state,
                ...{ featureCategories: action.payload },};//return { product: action.payload };
        case TOPCATEGORIES:
            return {...state,
                ...{ topCategories: action.payload },};
        case HOMECATEGORIES:
            return {...state,
                ...{ homeCategories: action.payload },};
        case SUBCATEGORIES:
            return {...state,
                ...{ subCategories: action.payload },};
        case DEPARTMENTCATEGORIES:
            return {...state,
                ...{ departmentCategories: action.payload },};
        case SET_ALL_MENUS:
            return {...state,
            allMenus: action.payload.data
            };
        case SET_ALL_RECIPIES:
            return {...state,
                allRecipies: action.payload.data
            } ;
        case SET_ALL_CELEBRATION:
            return {...state,
                allCelebrationList: action.payload.data
        } ;
        case SET_ALL_CELEBRATION_DAY:
            return {...state,
                allCelebrationDay: action.payload.data
        };
        case SET_ALL_COLLECTION:
            return {...state,
                allCollection: action.payload.data
            }

        default:
            return state;
    }
};