const React = require('react');
const $ = require('jquery');
const axios = require('axios');

import { connect } from 'react-redux';
import { addNewPhoto, toggleModal } from '../redux/thunks/addNewPhoto.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      createdBy: 'dev'
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    // create 'multipart/form-data' for request type
    const formData = new FormData();
    var imagefile = document.getElementById('uploadedFile');
    formData.append('file', imagefile.files[0]);
    formData.append('tags', this.state.tags);
    formData.append('createdBy', 'sonny');

    // api call with formdata param
    this.props.upload(formData, this.props.photoCount);
    // hide modal
    this.props.toggle(this.props.isActive);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleHandler(e) {
    if(e.target !== e.currentTarget) return;
    this.props.toggle(this.props.isActive)
  }

  render() {
    console.log(this.props)
    const { tags } = this.state;
    if (!this.props.isActive) {
      // $('.appContainer').removeClass('blur');
      return (
        <div className='navItem pointer' onClick={this.toggleHandler} > Upload</div>
      )
    } else {
      // $('.appContainer').addClass('blur');
      return (
        <div className='modalBackground' onClick={this.toggleHandler}>
          <div className='uploader'>
            <h1>Upload.</h1>
          <img src='./imgs/x.png' className='exit' onClick={this.toggleHandler}/>
            <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={this.submitHandler}>
              <input id='uploadedFile' type='file' name='file' accept='image/*' onChange={this.changeHandler} />
              <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' value={tags} onChange={this.changeHandler} ></textarea>
              <button type='submit' className='submit' > Upload</button>
            </form>
            </div>
          </div>
        )
          }
  }
}

const mapStateToProps = (state) => {
  return {
    isActive: state.addNewPhoto.isActive,
    photoCount: state.populate.photoCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upload: (form, numPhotos) => dispatch(addNewPhoto(form, numPhotos)),
    toggle: (bool) => dispatch(toggleModal(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);