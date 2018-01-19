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
        phoneNum: ""
      },
      tempValue: {},
      userId:0,
      errors: {
        name: false,
        email: false,
        description:false,
        phoneNum: false
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
    if(e.target.value )
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
    const { inputValue } = this.state;    
    const userId = uuidv4();    
    const tempValue = Object.assign({}, { 
          name: inputValue.name,
          email: inputValue.email,
          description: inputValue.description,
          phoneNum: inputValue.phoneNum,
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
        phoneNum: ""
      },
      tempValue:tempValue,
      userId:userId
    });
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
        
        <Well>
          <DisplayInfo
            name={tempValue.name}
            description={tempValue.description}
            email={tempValue.email}
            phoneNum={tempValue.phoneNum}
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


