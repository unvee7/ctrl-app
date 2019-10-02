import populateSuccess from './populateSuccess.js';
import populatePending from './populatePending.js';
import populateError from './populateError.js';
import fetch from 'node-fetch';

// this is a function that returns a function
// this is your Thunk action creator

const fetchPhotos = () => {
  console.log('fetch Photos called')
  return dispatch => {
    dispatch(populatePending());
    fetch('http://localhost:2000/api/all')
    .then(res => {
      console.log('fetch successful')
      console.log(res.photos)
      return res.json();
    })
    .then(res => {
      console.log(res.photos);
      dispatch(populateSuccess(res.photos));
      return res.photos;
    })
    .catch(error => {
      console.log('fetch NOT successful')
      dispatch(populateError(error));
    })
  }

  //  $.ajax({
  //     url: 'http://localhost:2000/api/all',
  //     type: 'GET',
  //     dataType: 'json',
  //     success: (data) => {
  //       dispatch(populateSuccess(data.photos))
  //       dispatch()
  //     },
  //     error: (err) => {
  //       throw new Error(err)
  //     }
  //   })
  // }
}

export default fetchPhotos;