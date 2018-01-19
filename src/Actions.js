//Firebase
import firebase, { auth, provider } from './firebase/firebase.js';


//Action Types
export const GET_USERS = 'GET_USERS';
export const ADD_TO_USERS = 'ADD_TO_USERS';
export const EDIT_USER = 'EDIT_USER';



//// Action Creators

//Fetch data from firebase
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
  
 
//Update Firebase 
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

//Edit Firebase and Store
export function editUsers(user, id) {  
  return dispatch => {
    const usersRef = firebase.database().child(id).update(user);
    usersRef.push({
      user
    })
    .then(() => {
      dispatch({
        type: EDIT_USER,
        user
      });
    })
  }
}
  
    
  