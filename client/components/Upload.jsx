import React, { useState, useEffect, useContext } from 'react';
const axios = require('axios');
import PhotosContext from '../components/contexts/photosContext.jsx';
import $ from 'jquery';

const Upload = () => {

  // global context
  const { modalIsActive, pending, setPending, toggleModal } = useContext(PhotosContext);

  // local state
  const [tags, setTags] = useState('');
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState('');


  const addNewPhoto = (formData) => {
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

  // const addMultipleNewPhotos = (formData) => {
  //   axios({
  //     method: 'post',
  //     url: '/api/multiple-files',
  //     type: 'multipart/form-data',
  //     data: formData,
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //     });
  // }

  const submitHandler = (e, cb = null) => {
    // e.preventDefault();
    // create 'multipart/form-data' for request type
    const formData = new FormData();
    var imagefile = document.getElementById('uploadedFile');

    formData.append('file', imagefile.files[0]);
    formData.append('tags', tags);
    formData.append('createdBy', 'sonny');

    // api call with formdata param
    addNewPhoto(formData);
    if (cb) {
      cb()
    }
  }

  // const submitMultipleFiles = (e, cb = null) => {
  //   const formData = new FormData();
  //   var imagefile = document.getElementById('uploadedMultipleFiles');

  //   formData.append('multiple-files', imagefile.files[0]);
  //   formData.append('tags', tags);
  //   formData.append('createdBy', 'sonny');

  //   // api call with formdata param
  //   addNewPhoto(formData);
  //   if (cb) {
  //     cb()
  //   }
  // }

  const changeTags = (e) => {
      e.preventDefault();
      setTags(e.target.value)
    }

  const changeFile = (e) => {
    e.preventDefault();
    setFile(e.target.value)
  }

  const toggleHandler = (e) => {
    if(e.target !== e.currentTarget) return;
    // this.props.toggle(this.props.isActive)
    toggleModal(modalIsActive)
  }

  // console.log('Uplooad rendered')

  if (modalIsActive){
    $('.appContainer').addClass('blur');
    let container = document.querySelector('.appContainer');
    container.classList.add('blur')
    return (
      <div className='modalBackground' onClick={(e) => toggleModal(e)} name='upload'>
      <div className='uploader'>
        <h1>Upload.</h1>
      <img src='./imgs/x.png' className='exit' onClick={(e) => toggleModal(e)} name='upload'/>
        <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={() => submitHandler()}>
          <input id='uploadedFile' type='file' name='file' accept='image/*' onChange={changeFile} />
          <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' value={tags} onChange={changeTags} ></textarea>
          <button type='submit' className='submit' > Upload</button>
        </form>
        </div>
      </div>
    )
  } else {
    $('.appContainer').removeClass('blur');
    return <div></div>
  }



  }

export default Upload;

{/* <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={() => submitMultipleFiles()}>
          <input id='uploadedMultipleFiles' type='file' name='multiple-files' multiple accept='image/*' onChange={changeFile} />
          <textarea name='tags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5' value={tags} onChange={changeTags} ></textarea>
          <button type='submit' className='submit' > Upload</button>
        </form> */}