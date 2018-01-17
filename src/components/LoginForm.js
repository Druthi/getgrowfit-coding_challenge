import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import firebase, { auth, provider } from '../firebase/firebase.js';
import { Well, Form, FormGroup, FormControl, Button } from 'react-bootstrap';




class LoginForm extends Component {

  constructor(props) {
    super(props);
  //  this.state={
  //    inputValue:{
  //      name: "",
  //      email: ""
  //    }
  //  }
  }

  //onNameChange = () => {
  //  const { inputValue } = this.state;
  //  this.props.onNameChange(inputValue.name);
  //  this.setState({ name: ""});
  //}
//
  //onEmailChange = () => {
  //  const { inputValue } = this.state;
  //  this.props.onEmailChange(inputValue.email);
  //  this.setState({ email: ""});
  //}

  
  
  render() {
    //const { inputValue } = this.state;
    
    return (    
      <div className="LoginForm">        
        <Link to="/">Home</Link>        
        <h1>LoginForm</h1> 
        <Button onClick={this.props.logout}>Log out</Button>
        <Form>
          <p>Name</p>
          <FormGroup>
            <FormControl type="text" placeholder='Recipe Name' onChange={this.onNameChange}   />
          </FormGroup>
          <p>Email</p>
          <FormGroup>
            <FormControl type="text" placeholder='example@gmail.com' onChange={this.onEmailChange}   size="large" />
          </FormGroup>
        </Form>      
        
      </div>
    );
  }
}

export default LoginForm;