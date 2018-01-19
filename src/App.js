//React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

//Styling with React Bootstrap
import { Button } from 'react-bootstrap';

//Components
import LoginForm from './components/LoginForm';

//Firebase
import firebase, { auth, provider } from './firebase/firebase.js';

//Redux
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
      });      
      //console.log(this.state.user);
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
    //console.log(this.state.user.email);
  }

//On refreshing page, user is still logged in.
//When the component is rendered, all the data in firebase is updated to the store
  componentDidMount() {
  //  auth.onAuthStateChanged((user) => {
  //    if (user) {
  //      this.setState({ user });
  //    } 
  //  });
  // 
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


//Connect to Redux Store
const mapDispatchToProps = (dispatch) => {
  return  bindActionCreators(Actions, dispatch)
  
}

const mapStateToProps = (state) => {
  return {
    addProfile: state.addProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
