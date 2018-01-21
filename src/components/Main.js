import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import App from '../App';




class Main extends Component {

 
//  componentWillMount() {
//    setTimeout(() => {
//      window.history.forward()
//    }, 0);
//    window.onunload=function(){null};
//  }
  
 //function noBack()
 // {
 //     window.history.forward()
 // }
 //noBack();
 //window.onload = noBack;
 //window.onpageshow = function(evt) { if (evt.persisted) noBack() }
 //window.onunload = function() { void (0) }

  
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