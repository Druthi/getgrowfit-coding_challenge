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
    const err = this.validation(this.state.inputValue); 
    const { inputValue } = this.state;  
    if(!err){
      const userId = uuidv4();    
      const tempValue = Object.assign({}, { 
            name: inputValue.name,
            email: inputValue.email,
            description: inputValue.description,
            phoneNum: inputValue.phoneNum,
            dob: inputValue.dob,
            userId:userId
      });
      console.log(Object.entries(tempValue));
  
      this.props.addToUsers(tempValue);
    
      this.setState({
        showModal:false,
        inputValue: {
          name:"",
          email:"",
          description:"",
          phoneNum: "",
          don: ""
        },
        tempValue:tempValue,
        userId:userId
      });
    }      
  }    
      
   

  //Edit Info
  editInfo = (userId) => {

  const tempValueCopy = Object.assign({}, this.state.tempValue);
  this.setState({
    ...this.state,
    inputValue : tempValueCopy,
    editModal:true
  });
  } 

  //On Editing the user info, the firebase database is updated
  finalEdit = (userIdd) => {
    const { inputValue, tempValue, userId } = this.state;  

    const tempObj = Object.assign({}, { 
      name: inputValue.name,
      email: inputValue.email,
      description: inputValue.description,
      phoneNum: inputValue.phoneNum,
      userId:userId
  });

    const ArrBig = Object.entries(this.props.users);
    ArrBig.map((value)=>{
      if( !undefined){
      //const temp = value[1];
      //const x = "user";
      if(value[1].user.userId == userIdd)
      console.log(value[1]);
      debugger;
      
      //if(tempuserId == userIdd )
      console.log("It worked!");
      //}
    }});
    //Object.entries(this.props.users).map(([userId, { name, email, description, phoneNum}]) => {
    // console.log(email);
    //})
    //this.props.editUser(tempObj, userId);

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

  //  let ref = firebaseDb.ref('recipes');
  //  return ref
  //    .child(fId)
  //    .update(data)
  //    .then(() => ref.once('value'))
  //    .then(snapshot => snapshot.val())
  //    .catch(error => ({
  //      errorCode: error.code,
  //      errorMessage: error.message
  //    }));
  }

 


    
  render() { 
    const { inputValue, tempValue, userId } = this.state; 
    return (    
      <div className="LoginForm"> 
        <Link to="/Main">Main</Link>               
        <h1>LoginForm</h1>
          <Modal show={this.state.editModal} onHide={this.close}>
            <Modal.Header closeButton>
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
                  <FormControl type="date" placeholder='Enter phone number' value={inputValue.date} onChange={this.onDateChange} />
                </FormGroup>             
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={() => this.finalEdit(userId)}>Submit</Button>
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
            <p>{this.state.errors.name}</p>
            <p>{this.state.errors.email}</p>
            <p>{this.state.errors.description}</p>
            <p>{this.state.errors.phoneNum}</p>
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


