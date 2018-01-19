import { STATUS, ADD_USER } from './Actions';
import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

//Firebase
import firebase from './firebase/firebase.js';


const initialState = {
    status: null,
    users:{       
    },
    userId: ""
}

const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {
        case 'ADD_USER':
        const userId = uuidv4();
        const userRef = firebase.database().ref('users');
        const user = {
            userId:userId,
            name: action.users.name,
            email: action.users.email,
            description:action.users.description,
            phoneNum: action.users.phoneNum
        }
        console.log(user);
        userRef.push(user);

        return Object.assign({}, state, { ...state, 
            users:{  ...state.users,
                [userId]:{ 
                   name: action.users.name,
                   email: action.users.email,
                   description:action.users.description,
                   phoneNum: action.users.phoneNum
                }                
            },
            userId: userId
        })

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


