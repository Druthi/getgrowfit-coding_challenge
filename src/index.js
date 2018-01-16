import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import react-router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LoginForm from './components/LoginForm';
import Main from './components/Main';


const router = (
    <Router history={browserHistory}>
      <Route path ="/" component={App} />
      <Route path ="LoginForm" component={LoginForm} />
      <Route path="/Main" component={Main} />
    </Router>
  )

  ReactDOM.render(router, document.getElementById('root'));




