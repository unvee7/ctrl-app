import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './components/App.jsx';
require('./css/style.css');
import { Provider } from 'react-redux';
import store from './redux/store.js';
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)

// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App')
);
