import { combineReducers } from 'redux';

//import Action
import { ADD_TO_USERS, GET_USERS  } from './Actions';

//Import Firebase
import firebase from './firebase/firebase.js';


const initialState = {
    users:{}    
}

//Reducers for acting on actions of Adding users to store and firebase,
//getting users from firebase and aditing to firebase.
const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {
                    
        case 'ADD_TO_USERS':
            console.log(action.user);
            const users = action.users;
            return Object.assign({}, state, { ...state, 
                users: { ...state.users, users }            
                });
        

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


