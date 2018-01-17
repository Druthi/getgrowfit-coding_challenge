import { STATUS, ADD_USER } from './Actions';
import { combineReducers } from 'redux';

const initialState = {
    status: null,
    users: []
}

const addProfile = (state = initialState, action)  => {
    switch(action.type) {
        case 'ADD_USER':
        return Object.assign({}, state, {
            users: [
              ...state.users,
              {
                name: action.name,
                email: action.email
              }
            ]
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


