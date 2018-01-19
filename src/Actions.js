//Firebase
import firebase, { auth, provider } from './firebase/firebase.js';


// action types

export const ADD_USER = 'ADD_USER';
export const STATUS = 'STATUS';
export const PULL_FIRE = 'PULL_FIRE';
export const GET_USERS = 'GET_USERS'
export const ADD_TO_USERS = 'ADD_TO_USERS';

  



// action creators

export function addUser(users) {
    return { type: ADD_USER, users }
}

export function status(status) {
    return { type: STATUS, status }
}


export function getUsers() {
    return dispatch => {
    firebase.database().ref('users').on('value', snap => {
         const users = snap.val();
          dispatch({
            type: GET_USERS,
            users
          })
        });
    }
  }
  
 
 // Update Firebase 

  export function addToUsers(user) {
    return dispatch => {
      const usersRef = firebase.database().ref('users');
      usersRef.push({
        user
      })
      .then(() => {
        dispatch({
          type: ADD_TO_USERS,
          user
        });
      })
    }
  }
  
    
  