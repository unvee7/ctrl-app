import { addFileActionCreator, toggleModalActionCreator } from '../actions/uploadActionCreators.js';
import { populatePending, populateSuccess, populateError } from '../actions/populateActions.js';

import axios from 'axios';

const addNewPhoto = (formData, numPhotos) => {
  return dispatch => {
    axios({
      method: 'post',
      url: '/api/newOne',
      type: 'multipart/form-data',
      data: formData,
      })

      .then( () => {
        return dispatch(addFileActionCreator(numPhotos))
      })
      .catch(err => {
        console.log(err.response);
      });

  }
}

const toggleModal = (bool) => {
  return toggleModalActionCreator(bool)
}

const refreshPhotos = () => {
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

export { addNewPhoto, toggleModal, refreshPhotos }