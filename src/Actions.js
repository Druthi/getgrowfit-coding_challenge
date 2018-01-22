//Firebase
import firebase from './firebase/firebase.js';


//Action Types
export const GET_USERS = 'GET_USERS';



//// Action Creators

//Fetch data from firebase
export function getUsers() {
  return dispatch => {
  firebase.database().ref('users').on('value', snap => {
       const usersFire = snap.val();
      console.log(usersFire);
       let users = {};
         
       for (let user in usersFire) {
        let temp = usersFire[user].user;
        users[temp.userId] = {          
          name: temp.name,
          email: temp.email,
          description: temp.description,
          phoneNum: temp.phoneNum,
          dob: temp.dob,
          userId: temp.userId,
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
  }
}

//Edit Firebase and Store
export function editUsers(user, fireId) {  
  return dispatch => {
      firebase.database().ref(`/users/${fireId}`).update(user);
  }
}
  
    
  