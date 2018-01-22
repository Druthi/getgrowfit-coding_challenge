//React
import React, { Component } from 'react';

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
    }
  }

  login = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {    
        return auth.signInWithPopup(provider);
      }).then((result) => {
        const user = result.user; 
        console.log(user.email);       
        this.setState({
          user:user
        });   
      });     
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

 

//When the component is rendered, all the data in firebase is updated to the store
  componentDidMount() {    
  this.props.getUsers();    
}      

  render() {
    return (
      <div className="App">        
          {this.state.user ?
          <LoginForm user={this.state.user} logout={this.logout}/>              
          :
          <Button onClick={this.login}>Log In</Button>            
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
