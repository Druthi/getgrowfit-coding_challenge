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
        //const obj = Object.assign(this.props.ingrid);
        //console.log(obj);
        console.log(this.props.addProfile.name);

        return (
            <div className="DisplayInfo">                
                   <p>Name: {this.props.addProfile.users[this.props.addProfile.userId].name} </p>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(DisplayInfo);