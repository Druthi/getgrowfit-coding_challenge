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
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';



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

unsubscribe;



const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path ="/" component={App} />
      <Route path ="LoginForm" component={LoginForm} />
      <Route path="/Main" component={Main} />
    </Router>
  </Provider>
  )

  ReactDOM.render(router, document.getElementById('root'));



  
  
 

