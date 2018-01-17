import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCW1IZgy6UWEA1Biaz6irTcgDVhK5ubmM4",
  authDomain: "getgrowfit-coding.firebaseapp.com",
  databaseURL: "https://getgrowfit-coding.firebaseio.com",
  projectId: "getgrowfit-coding",
  storageBucket: "",
  messagingSenderId: "153324733924"
};

firebase.initializeApp(config);
console.log(firebase);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;


