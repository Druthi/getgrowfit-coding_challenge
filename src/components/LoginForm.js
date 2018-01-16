import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


class LoginForm extends Component {
  render() {
    return (
      <div className="LoginForm">
        
          <Link to="/">Home</Link>
        
        <h1>LoginForm</h1>      
      </div>
    );
  }
}

export default LoginForm;