import Router from 'next/router';
import { DEPARTMENTS } from '../types';
import DepartmentRepository from '../../repositories/department'


// Gets token from the API and stores it in the redux store and in cookie
function getAllDepartment (id){
    return async (dispatch) => {
        try {
            
            let response = await DepartmentRepository.getAllDepartment();
            console.log("dept",response.data)
            dispatch({type: DEPARTMENTS, payload: response.data});
            
        } catch (err) {
        alert(err);
        }
    }

};


export default {
    getAllDepartment,
   
};
