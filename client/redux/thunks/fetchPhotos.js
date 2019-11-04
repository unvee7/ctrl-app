import { populatePending, populateSuccess, populateError } from '../actions/populateActions.js';
import fetch from 'node-fetch';
import axios from 'axios';
// import _ from 'lodash';

// this is a function that returns a function
// this is your Thunk action creator !!
// https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/

const fetchPhotos = (cb) => {
  return dispatch => {
    axios.get('http://localhost:2000/api/all')
    .then(({ data }) => {
      dispatch(populateSuccess(data.photos));
    })
    .then(() => {
      // console.log('bout to pack that')
      if (cb) {
        return cb();
      }
      // pack the grid items =)
    })
    .then(dispatch(populatePending(false)))
    .catch((err) => {
      throw new Error(err)
    })

  }
}

export default fetchPhotos;