import { newAddedFile, modalIsActive } from '../actions/uploadAction.js';

const uploadNewPhoto = (formData) => {
  return dispatch => {
    console.log('trying to upload photo')
    axios({
      method: 'post',
      url: '/api/newOne',
      type: 'multipart/form-data',
      data: formData,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });

  }
}

const toggleModal = (bool) => {
  console.log('this is the boolean: ' + bool)
  return modalIsActive(bool)
}

export { uploadNewPhoto, toggleModal };