const React = require('react');
const $ = require('jquery');
const axios = require('axios');

import { connect } from 'react-redux';
import { addNewPhoto, toggleModal } from '../redux/thunks/addNewPhoto.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    var imagefile = document.getElementById('uploadedFile');
    formData.append('file', imagefile.files[0]);
    formData.append('tags', this.props.tags);
    formData.append('createdBy', 'sonny');

    this.props.upload(formData);
  }

  render() {
    if (!this.props.isActive) {
      return (
        <div className='navItem pointer' onClick={(e) => this.props.toggle(e, this.props.isActive)} > Upload</div>
      )
    } else {
      return (
        <div className='modalBackground' onClick={(e) => this.props.toggle(e, this.props.isActive)}>
          <div className='uploader'>
            <h1>Upload.</h1>
          <img src='./imgs/x.png' className='exit' onClick={(e) => this.props.toggle(e, this.props.isActive)}/>
            <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={this.submitHandler}>
              <input id='uploadedFile' type='file' name='file' accept='image/*' />
              <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' ></textarea>
              <button type='submit' className='submit'> Upload</button>
            </form>
            </div>
          </div>
        )
          }
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.newPhoto.file,
    tags: state.newPhoto.tags,
    createdBy: state.newPhoto.createdBy,
    isActive: state.newPhoto.isActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upload: (form) => dispatch(addNewPhoto(form)),
    toggle: (e, bool) => {
      // allow user to click inside modal without dispatching toggleModal
      if(e.target !== e.currentTarget) return;
      dispatch(toggleModal(bool))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

// module.exports = Upload;