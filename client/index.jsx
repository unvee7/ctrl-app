const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const App = require('./components/App.jsx');
require('./css/style.css');
import {createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/roodReducer'

const store = createStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('App'));
