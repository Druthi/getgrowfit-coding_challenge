import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import react-router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LoginForm from './components/LoginForm';
import Main from './components/Main';

//Store
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Reducers';
import { addUser, status } from './Actions';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )  
);

console.log(store.getState());

const unsubscribe = store.subscribe(() =>
console.log(store.getState())
);


store.dispatch(addUser('Drthi'))
store.dispatch(addUser('Drthijf'))
store.dispatch(addUser('uufbhi'))
store.dispatch(status(null))


unsubscribe;



const router = (
    <Router history={browserHistory}>
      <Route path ="/" component={App} />
      <Route path ="LoginForm" component={LoginForm} />
      <Route path="/Main" component={Main} />
    </Router>
  )

  ReactDOM.render(router, document.getElementById('root'));



  
  
 

