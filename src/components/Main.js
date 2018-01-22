import React, { Component } from 'react';
import { Link } from 'react-router';





class Main extends Component {
  
  render() {
    return (
      <div className="Main">
         <Link to="/LoginForm">Login Form</Link>
        <h1>Main</h1>        
             
      </div>
    );
  }
}

export default Main;