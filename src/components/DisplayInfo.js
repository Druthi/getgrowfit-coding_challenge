import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Well, Button, Panel, Accordion } from 'react-bootstrap';
import App from '../App';

//Redux
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import { bindActionCreators } from 'redux';


class DisplayInfo extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        console.log(this.props.addProfile);
        //const obj = Object.assign(this.props.ingrid);
        //console.log(obj);
        

        return (
            <div className="DisplayInfo">  
                <h1>WELCOME {this.props.name}</h1>              
                   <p>Name:{this.props.name}</p>
                   <p>Email:{this.props.email}</p>
                   <p>description:{this.props.description}</p>
                   <p>Phone Number:{this.props.phoneNum}</p>
                   <p>Date of Birth:{this.props.dob}</p>
            </div>
        );
    }
}


//Connect component to store
    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(Actions, dispatch);
      }
    
    const mapStateToProps = (state) => {
        return {
            addProfile: state.addProfile
        }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(DisplayInfo);