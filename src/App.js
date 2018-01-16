import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import LoginForm from './components/LoginForm';


class App extends Component {
  render() {
    return (
      <div className="App">
         <h1>
          <Link to="/LoginForm"><Button>Login</Button></Link>
        </h1>
      </div>
    );
  }
}

export default App;
