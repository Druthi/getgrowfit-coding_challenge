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
       const usersFire = snap.val();
      console.log(usersFire);
       let users = {};
       for (let user in usersFire) {
        users[usersFire[user].user.userId] = {          
          name: usersFire[user].user.name,
          email: usersFire[user].user.email,
          description: usersFire[user].user.description,
          phoneNum: usersFire[user].user.phoneNum,
          dob: usersFire[user].user.dob,
          userId: usersFire[user].user.userId,
          fireId: user
        }         
      } 
      console.log(users);   
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
   //.then(() => {
   //  dispatch({
   //    type: ADD_TO_USERS,
   //    user
   //  });
   //})
  }
}

//Edit Firebase and Store
export function editUsers(user, fireId) {  
  return dispatch => {

      let ref = firebase.database().ref('users')
        .child(fireId)
        .update(user);
    
    //const usersRef = firebase.database().child(user.userId).update(user);
    //usersRef.push({
    //  user
    //})
    //.then(() => {
    //  dispatch({
    //    type: EDIT_USER,
    //    user
    //  });
    //})
  }//
}
  
    
  