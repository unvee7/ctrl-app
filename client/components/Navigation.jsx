import React, { useState, useEffect, useContext } from 'react';const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');


import PhotosContext from '../components/contexts/photosContext.jsx';


function Navigation() {
  const { modalIsActive, pending, setPending, toggleModal } = useContext(PhotosContext);

  // console.log('Navigation rendered')
  return (
    <div className='header grid'>
      <img className='mark' src='./imgs/ctrl.svg'></img>
      <div className='nav' >
      <div className='navItem' onClick={(e) => toggleModal(e)} name='upload'> Upload </div>
        <div className='navItem' onClick={(e) => toggleModal(e)} name='download'> Download </div>
        <div className='navItem'> Art </div>
        <div className='navItem'> Polaroid </div>
        <div className='navItem'> About </div>
        <Search />
      </div>
    </div>
  )

}

export default Navigation;
