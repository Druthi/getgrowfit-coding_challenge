import { combineReducers } from 'redux';


const initialState = {
    users:{}    
}

//Reducers for acting on actions of Adding users to store and firebase,
//getting users from firebase.
const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {

        case 'GET_USERS':
            console.log(action.users);
            return Object.assign({}, state, { ...state, 
                users: action.users               
                });
            
        default:
        return state;
    }    
};

export const rootReducer =  combineReducers({
    addProfile
});


