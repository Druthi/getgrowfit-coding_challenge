import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import App from '../App';



class Main extends Component {
  render() {
    return (
      <div className="Main">
         <Link to="/">Home</Link>
        <h1>Main</h1>        
             
      </div>
    );
  }
}

export default Main;