import { STATUS, ADD_USER } from './Actions';
import { combineReducers } from 'redux';

const initialState = {
    status: null,
    users: {
        name:"",
        email:""
    }
}

const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {
        case 'ADD_USER':
        return Object.assign({}, state, { ...this.state, 
            users:{
                name: action.users.name,
                email: action.users.email
            }
          })
          
        case 'STATUS':
        return Object.assign({}, state, {
            status: action.status
          })

        default:
        return state
    }    
};

export const rootReducer =  combineReducers({
    addProfile
});


