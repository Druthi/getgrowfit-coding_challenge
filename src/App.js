import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import LoginForm from './components/LoginForm';
import firebase, { auth, provider } from './firebase/firebase.js';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user:user
        });
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
      console.log(this.state.user);
  }

  //componentDidMount() {
  //  auth.onAuthStateChanged((user) => {
  //    if (user) {
  //      this.setState({ user });
  //    } 
  //  });
  //}

  //onNameChange = (e) => {
  //  this.setState({
  //    ...this.state,
  //    inputValue: {
  //      ...this.state.inputValue,
  //      name: e.target.value
  //    }
  //  });
  //}
//
  //onEmailChange = (e) => {
  //  this.setState({
  //    ...this.state,
  //    inputValue: {
  //      ...this.state.inputValue,
  //      name: e.target.value
  //    }
  //  });
  //}


  render() {
    return (
      <div className="App">        
          {this.state.user ?
          <LoginForm onNameChange={this.onNameChange} onEmailChange={this.onEmailChange} logout={this.logout}/>              
          :
          <button onClick={this.login}>Log In</button>            
          }
        
      </div>
    );
  }
}

export default App;
