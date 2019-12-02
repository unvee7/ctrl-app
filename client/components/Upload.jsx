const React = require('react');
const $ = require('jquery');
const axios = require('axios');

import { connect } from 'react-redux';
import { addFileActionCreator, toggleModalActionCreator } from '../redux/actions/uploadActionCreators.js';
import store from '../redux/store.js';
import { populatePending, populateSuccess, populateError } from '../redux/actions/populateActions.js';
import { addNewPhoto, toggleModal, refreshPhotos } from '../redux/thunks/addNewPhoto.js';

import PhotosContext from '../components/contexts/photosContext.jsx';

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
    this.addNewPhoto = this.addNewPhoto.bind(this);
  }

  addNewPhoto(formData) {
    axios({
      method: 'post',
      url: '/api/newOne',
      type: 'multipart/form-data',
      data: formData,
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  submitHandler(e, cb = null) {
    // e.preventDefault();
    // create 'multipart/form-data' for request type
    const formData = new FormData();
    var imagefile = document.getElementById('uploadedFile');
    formData.append('file', imagefile.files[0]);
    formData.append('tags', this.state.tags);
    formData.append('createdBy', 'sonny');

    // api call with formdata param
    this.addNewPhoto(formData);
    if (cb) {
      cb()
    }
    // // hide modal
    // this.props.toggle(this.props.isActive);
    // // this.props.setPendingTo(true);
    // console.log(this.props);
    // let photos = await axios.get('http://localhost:2000/api/all');
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
    // console.log(this.props)
    // const { tags } = this.state;
    // if (this.props.isActive) {
    //   $('.appContainer').addClass('blur');
    //   return <div className='modalBackground' onClick={this.toggleHandler}>
    //       <div className='uploader'>
    //         <h1>Upload.</h1>
    //       <img src='./imgs/x.png' className='exit' onClick={this.toggleHandler}/>
    //         <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={this.submitHandler}>
    //           <input id='uploadedFile' type='file' name='file' accept='image/*' onChange={this.changeHandler} />
    //           <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' value={tags} onChange={this.changeHandler} ></textarea>
    //           <button type='submit' className='submit' > Upload</button>
    //         </form>
    //         </div>
    //       </div>

    return (<PhotosContext.Consumer>
      {context => {
        if (context.modalIsActive){
          return (
            <div className='modalBackground' onClick={(e) => context.toggleModal(e)} name='upload'>
            <div className='uploader'>
              <h1>Upload.</h1>
            <img src='./imgs/x.png' className='exit' onClick={(e) => context.toggleModal(e)} name='upload'/>
              <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={() => this.submitHandler()}>
                <input id='uploadedFile' type='file' name='file' accept='image/*' onChange={this.changeHandler} />
                <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' value={this.state.tags} onChange={this.changeHandler} ></textarea>
                <button type='submit' className='submit' > Upload</button>
              </form>
              </div>
            </div>
          )
        } else {
          return <div></div>
        }

      }}
      </PhotosContext.Consumer>)

    }
  }


// const mapStateToProps = (state) => {
//   return {
//     isActive: state.uploadModal.isActive,
//     photoCount: state.wallPhotos.photoCount
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     upload: (form, numPhotos) => dispatch(addNewPhoto(form, numPhotos)),
//     toggle: (bool) => dispatch(toggleModal(bool))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Upload);

export default Upload;