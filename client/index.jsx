import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './components/App.jsx';
require('./css/style.css');
import store from './redux/store.js'
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App')
);
