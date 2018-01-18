import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import firebase, { auth, provider } from '../firebase/firebase.js';
import { Well, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import { bindActionCreators } from 'redux';
import Main from './Main';



class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      inputValue: {
        name: "",
        email: ""
      }
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
    //console.log(this.state.inputValue);
  }
  onEmailChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        email: e.target.value
      }
    });
    //console.log(this.state.inputValue.email);
  }
 
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.inputValue);
    this.props.addUser(this.state.inputValue);
    this.setState({
      inputValue: {
        name:"",
        email:""
      }
    });
  }
  
  render() { 
    const { inputValue } = this.state;   
    return (    
      <div className="LoginForm">        
        <Link to="/">Home</Link>        
        <h1>LoginForm</h1> 
        <Button onClick={this.props.logout}>Log out</Button>
        <Form onClick={this.onSubmit}>
          <p>Name</p>
          <FormGroup>
            <FormControl type="text" placeholder='Enter Name' value={inputValue.name} onChange={this.onNameChange}   />
          </FormGroup>
          <p>Email</p>
          <FormGroup>
            <FormControl type="text" placeholder='example@gmail.com' value={inputValue.email} onChange={this.onEmailChange}   size="large" />
          </FormGroup>
          <Button >Submit</Button>
        </Form>           
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    status: state.status
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);