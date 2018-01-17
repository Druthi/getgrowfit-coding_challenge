import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import firebase, { auth, provider } from '../firebase/firebase.js';
import { Well, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';



class LoginForm extends Component {

  state = {
    inputValue: {
      name: "",
      ingridients: ""
    }
  }

  onNameChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        name: e.target.value
      }
    });
  }

  onEmailChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        email: e.target.value
      }
    });
  }
  
  render() {    
    return (    
      <div className="LoginForm">        
        <Link to="/">Home</Link>        
        <h1>LoginForm</h1> 
        <Button onClick={this.props.logout}>Log out</Button>
        <Form>
          <p>Name</p>
          <FormGroup>
            <FormControl type="text" placeholder='Enter Name' value={this.state.name} onChange={this.onNameChange}   />
          </FormGroup>
          <p>Email</p>
          <FormGroup>
            <FormControl type="text" placeholder='example@gmail.com' value={this.state.email} onChange={this.onEmailChange}   size="large" />
          </FormGroup>
        </Form>      
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(LoginForm);