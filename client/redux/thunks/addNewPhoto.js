import { newAddedFile, modalIsActive } from '../actions/uploadAction.js';
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
      .then(res => {
        console.log('this is where we dispatch')
        return fetchPhotos(null);
      })
      .then( () => {
        return dispatch(newAddedFile(numPhotos))
      })
      .catch(err => {
        console.log(err.response);
      });

  }
}

const toggleModal = (bool) => {
  return modalIsActive(bool)
}

export { addNewPhoto, toggleModal };