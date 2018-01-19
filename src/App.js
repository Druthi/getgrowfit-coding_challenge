import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import LoginForm from './components/LoginForm';
import firebase, { auth, provider } from './firebase/firebase.js';
import { connect } from 'react-redux';
import * as Actions from './Actions';
import { bindActionCreators } from 'redux';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      didMount:false      
    }
  }

  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user:user
        });
   //     const x = this.props.addProfile;
   //     const person = pickBy(
   //       x,
   //       ({ email }) => email === user.email
   //     );
   //     if(person !== null || person !== undefined)
   //     
      });
      
      console.log(this.state.user);
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
      console.log(this.state.user.email);
  }


  componentDidMount() {
  //  auth.onAuthStateChanged((user) => {
  //    if (user) {
  //      this.setState({ user });
  //    } 
  //  });
  // 
  //console.log(this.state.didMount);
  //if(this.state.didMount == false) {
  //  const userRef = firebase.database().ref('users');
  //  userRef.on('value', (snapshot) => {
  //    let users = snapshot.val();
  //    console.log(users);
  //    if(users){
  //      let newState = {};
  //      for (let user in users) {
  //        newState[users[user].userId] = {
  //          name: users[user].name,
  //          email: users[user].email,
  //          description: users[user].description,
  //          phoneNum: users[user].phoneNum
  //        }      
  //      }
  //      this.props.pullFire(newState);
  //      console.log(newState);
  //    }
  //  });
  //  this.setState({ ...this.state,
  //    didMount:true
  //  });  
  //}  
  this.props.getUsers();    
}  

    

  render() {
    return (
      <div className="App">        
          {this.state.user ?
          <LoginForm user={this.state.user} logout={this.logout}/>              
          :
          <button onClick={this.login}>Log In</button>            
          }
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return  bindActionCreators(Actions, dispatch)
  
}

const mapStateToProps = (state) => {
  return {
    addProfile: state.addProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
