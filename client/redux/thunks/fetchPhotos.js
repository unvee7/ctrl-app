import { populatePending, populateSuccess, populateError } from '../actions/populateActions.js';
import fetch from 'node-fetch';
import axios from 'axios';
// import _ from 'lodash';

// this is a function that returns a function
// this is your Thunk action creator !!
// https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/

const fetchPhotos = (cb) => {
  console.log('fetch Photos called: #3' )
  return dispatch => {
    axios.get('http://localhost:2000/api/all')
    .then(dispatch(populatePending(false)))
    .then(({ data }) => {
      console.log('api called for data vvv #4')
      console.log(data)
      dispatch(populateSuccess(data.photos));
      console.log('callback called in server')
    })
    .then(() => {
      cb()
      // pack the grid items =)
    })
  }
}

export default fetchPhotos;