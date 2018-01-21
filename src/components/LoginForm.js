import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Routing
import { Link } from 'react-router';

//Firebase
import firebase, { auth, provider } from '../firebase/firebase.js';

//Styling with React-Bootstrap
//import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Well, Form, FormGroup, FormControl, Button, Accordion, Modal } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import { bindActionCreators } from 'redux';

//import component
import Main from './Main';
import DisplayInfo from'./DisplayInfo';

import { pickBy } from 'lodash';
import uuidv4 from 'uuid/v4';

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
        phoneNum: "",
        dob:""
      },
      tempValue: {},
      userId:0,
      errors: {
        name: "",
        email: "",
        description:"",
        phoneNum: "",
        dob:""
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

  //Stores the input value in the Date of Birth field and updates (react) state
  onDateChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        dob: e.target.value
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

   //Email validation
   validateEmail = (value) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  //Validation
  validation = (inputValue) => {
    let isError = false;
    const errors = {};
    if(inputValue.name == ""){
      isError = true;
      errors.name = 'Name is required';
    }
    if(inputValue.email == ""){
      isError = true;
      errors.email = 'Email required';
    }    
    else if(this.validateEmail(inputValue.email) == false){
      isError = true;
      errors.email = 'Enter valid email Id';
    }
    if(inputValue.description == ""){
      isError = true;
      errors.description= 'Description is required';
    }
    if(inputValue.phoneNum == ""){
      isError = true;
      errors.phoneNum = 'Phone Number is required';
    }
    if(inputValue.dob == ""){
      isError = true;
      errors.dob = 'Date of Birth is required';
    }
    if(isError){
      this.setState({
        ...this.state,
        errors:errors
      });
    }
    return isError;
  }
 
  //Sets the redux store with all the input field values
  onSubmit = (e) => {    
    e.preventDefault();
    const { inputValue } = this.state;  
    const err = this.validation(inputValue);     
    if(!err){
      const userId = uuidv4();    
      let tempValue = Object.assign({}, {
        name: inputValue.name,
        email: inputValue.email,
        description: inputValue.description,
        phoneNum: inputValue.phoneNum,
        dob: inputValue.dob,
        userId:userId                 
      });      
  
      this.props.addToUsers(tempValue); //Action call to add to users
    
      this.setState({
        showModal:false,
        inputValue: {
          name:"",
          email:"",
          description:"",
          phoneNum: "",
          dob: ""
        },
        tempValue:tempValue,
        userId:userId
      });
    }      
  }    
      
   

  //Edit Info
  editInfo = (userId) => {
  this.setState({
    ...this.state,
    inputValue :this.state.tempValue,
    editModal:true
  });
  } 

  //On Editing the user info, the firebase database is updated
  finalEdit = (userId) => {
    const { inputValue, tempValue } = this.state; 
    console.log(inputValue);
    const err = this.validation(inputValue); //Checking if all input fields are valid
    if(!err){
      const tempObj = Object.assign({}, { 
        name: inputValue.name,
        email: inputValue.email,
        description: inputValue.description,
        phoneNum: inputValue.phoneNum,
        dob: inputValue.dob,
        userId:userId
      });
  
      for(let val in this.props.users){     
        if(val == userId)
        { 
          let temp = {};
          temp['user'] = tempObj;
          this.props.editUsers(temp, this.props.users[val].fireId); //Action call to edit Users
        }
      };  
  
      this.setState({
        ...this.state,
          inputValue: {
            name:"",
            email:"",
            description:"",
            phoneNum: ""
          },
          tempValue:tempObj,
          editModal:false
      }); 
    }    
  }

  //If user has already logged in before, his/her info 
  //will be displayed without modal asking for user details.
  componentWillMount () {
    const users = this.props.users;        
    for(let key in users){
      if(users[key].email == this.props.user.email){
        this.setState({
          ...this.state,
          tempValue:{
            name: users[key].name,
            email: users[key].email,
            description: users[key].description,
            phoneNum: users[key].phoneNum,
            dob: users[key].dob,
            userId:key
          },                  
          showModal:false,
          userId:key,
        });
      }
    }
  }

      
  render() {      
    const styles = {color:'red'};
    const { inputValue, tempValue, userId } = this.state; 
    return (    
      <div className="LoginForm"> 
        <Link to="/Main">Main</Link>               
        <h1>LoginForm</h1>
          <Modal show={this.state.editModal} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Edit User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Name</p>
                <FormGroup>
                  <FormControl type="text"  placeholder='Enter Name' value={inputValue.name} onChange={this.onNameChange}   />
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
                  <FormControl type="number" placeholder='Enter phone number' value={inputValue.phoneNum} onChange={this.onPhoneNumChange}   size="large" />
                </FormGroup> 
                <p>Date of Birth</p> 
                <FormGroup>
                  <FormControl type="date" placeholder='Enter phone number' value={inputValue.dob} onChange={this.onDateChange} />
                </FormGroup>             
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={() => this.finalEdit(userId)}>Submit</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header>
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
                  <FormControl type="number" placeholder='Enter phone number' value={inputValue.phoneNum} onChange={this.onPhoneNumChange}   size="large" />
                </FormGroup> 
                <p>Date of Birth</p> 
                <FormGroup>
                  <FormControl type="date" placeholder='Enter phone number' value={inputValue.date} onChange={this.onDateChange} />
                </FormGroup>             
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={this.onSubmit}>Submit</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
            <p style = {styles}>{this.state.errors.name}</p>
            <p style = {styles}>{this.state.errors.email}</p>
            <p style = {styles}>{this.state.errors.description}</p>
            <p style = {styles}>{this.state.errors.phoneNum}</p>
            <p style = {styles}>{this.state.errors.dob}</p>
        </Modal>
        
        <Well>
        <DisplayInfo
          name={tempValue.name}
          description={tempValue.description}
          email={tempValue.email}
          phoneNum={tempValue.phoneNum}
          dob={tempValue.dob}
          userId={tempValue.userId}
        />    
        </Well>                
        <Button onClick={this.props.logout}>Log out</Button>
        <Button onClick={() => this.editInfo(userId)}>Edit Info</Button>                 
      </div>
    );
  }
}

//Connecting component to redux store
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    users: state.addProfile.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


