import { addFileActionCreator, toggleModalActionCreator } from '../actions/uploadActionCreators.js';
import axios from 'axios';
import fetchPhotos from './fetchPhotos.js';

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

export { addNewPhoto, toggleModal };