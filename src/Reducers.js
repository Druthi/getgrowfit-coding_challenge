import { STATUS, ADD_USER } from './Actions';
import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';


const initialState = {
    status: null,
    users:{
       
    } 
}

const addProfile = (state = initialState, action)  => {
    console.log(action);
    switch(action.type) {
        case 'ADD_USER':
        const userId = uuidv4();
        return Object.assign({}, state, { ...state, 
            users:{ ...state.users,
                [userId]:{ ...state.users,
                    name: action.users.name,
                    email: action.users.email,
                    description:action.users.description,
                    phoneNum: action.users.phoneNum
                }                
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


