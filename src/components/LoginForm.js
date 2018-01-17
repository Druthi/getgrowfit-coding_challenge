import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import firebase, { auth, provider } from '../firebase/firebase.js';



class LoginForm extends Component {
  
  render() {
    return (
      <div className="LoginForm">        
        <Link to="/">Home</Link>        
        <h1>LoginForm</h1> 
        <button onClick={this.props.logout}>Log out</button> 
          
        
      </div>
    );
  }
}

export default LoginForm;