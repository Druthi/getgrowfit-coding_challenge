import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Routing
import { Link } from 'react-router';

//Firebase
import firebase, { auth, provider } from '../firebase/firebase.js';

//Styling with React-Bootstrap
import { Well, Form, FormGroup, FormControl, Button, Accordion, Modal } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import { bindActionCreators } from 'redux';

//import component
import Main from './Main';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      showModal:true,
      editModil:false,
      inputValue: {
        name: "",
        email: "",
        description:"",
        phoneNum: ""
      }
    }
  }

  //Stores the input value in the Name field and updates (react) state
  onNameChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        name: e.target.value
      }
    });
  }

  //Stores the input value in the Email field and updates (react) state
  onEmailChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        email: e.target.value
      }
    });
  }

  //Stores the input value in the Description field and updates (react) state
  onDescriptionChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        description: e.target.value
      }
    });
  }
  
  //Stores the input value in the Phone Number field and updates (react) state
  onPhoneNumChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        phoneNum: e.target.value
      }
    });
  }

  //Modal closes when close() runs
  close = () => {
    this.setState({ showModal: false, editModal: false });
  }

  //Modal opens when open()runs
  open = () => {
    this.setState({ showModal: true, editModal: true });
  }
 
  //Sets the redux store with all the input field values
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state.inputValue);
    this.setState({
      inputValue: {
        name:"",
        email:"",
        description:"",
        phoneNum: ""
      }
    });
  } 
  
  render() { 
    const { inputValue } = this.state;  
    return (    
      <div className="LoginForm">        
        <Link to="/">Home</Link>        
        <h1>LoginForm</h1>
          <Modal show={this.state.editModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Name</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Enter Name' value={inputValue.name} onChange={this.onNameChange}   />
                </FormGroup>
                <p>Email</p>
                <FormGroup controlId="formInlineEmail">
                  <FormControl type="email" value={inputValue.email} onChange={this.onEmailChange} placeholder="jane.doe@example.com" />
                </FormGroup> 
                <p>Description</p>
                <FormGroup>
                  <FormControl bsSize="large" type="text" placeholder='Enter Description' value={inputValue.description} onChange={this.onDescriptionChange}   size="large" />
                </FormGroup> 
                <p>Phone Number</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Enter phone number' value={inputValue.phoneNum} onChange={this.onPhoneNumChange}   size="large" />
                </FormGroup> 
                <p>Date of Birth</p>             
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={this.onSubmit}>Submit</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Name</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Enter Name' value={inputValue.name} onChange={this.onNameChange}   />
                </FormGroup>
                <p>Email</p>
                <FormGroup controlId="formInlineEmail">
                  <FormControl type="email" value={inputValue.email} onChange={this.onEmailChange} placeholder="jane.doe@example.com" />
                </FormGroup> 
                <p>Description</p>
                <FormGroup>
                  <FormControl bsSize="large" type="text" placeholder='Enter Description' value={inputValue.description} onChange={this.onDescriptionChange}   size="large" />
                </FormGroup> 
                <p>Phone Number</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Enter phone number' value={inputValue.phoneNum} onChange={this.onPhoneNumChange}   size="large" />
                </FormGroup> 
                <p>Date of Birth</p>             
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={this.onSubmit}>Submit</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
          <p>{this.props.addProfile.users.name}</p>
          <p>{this.props.addProfile.users.email}</p>
          <p>{this.props.addProfile.users.description}</p>
          <p>{this.props.addProfile.users.phoneNum}</p>

                
        <Button onClick={this.props.logout}>Log out</Button>
                 
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    addProfile: state.addProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);