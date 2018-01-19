import * as Actions from './Actions';
import { ADD_TO_USERS, GET_USERS  } from './Actions';
import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

//Firebase
import firebase from './firebase/firebase.js';


const initialState = {
    status: null,
    users:{}
    
}

const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {
                    
        case 'ADD_TO_USERS':
            console.log(action.users);
            const users = action.users;
            return Object.assign({}, state, { ...state, 
                users: { ...state.users, users }            
                });
        

        case 'GET_USERS':
            console.log(action.users);
            return Object.assign({}, state, { ...state, 
                users: action.users
                    //[userId]:{ 
                    //   name: action.users.name,
                    //   email: action.users.email,
                    //   description:action.users.description,
                    //   phoneNum: action.users.phoneNum
                    //}                
                });
        

        case 'PULL_FIRE':
        return Object.assign({}, state, { ...state,
                users: action.users
        });

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


