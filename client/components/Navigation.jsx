const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');
const Wall = require('./Wall.jsx');
const Download = require('./Download.jsx');

import { connect } from 'react-redux';
import Upload from './Upload.jsx';
import { addFileActionCreator, toggleModalActionCreator } from '../redux/actions/uploadActionCreators.js';

import PhotosContext from '../components/contexts/photosContext.jsx';


function Navigation() {
  return (
    <PhotosContext.Consumer>
      {context => (
        <div className='header grid'>
         <img className='mark' src='./imgs/ctrl.svg'></img>
         <div className='nav' >
         <div className='navItem' onClick={(e) => context.toggleModal(e)} name='upload'> Upload </div>
           <div className='navItem' onClick={(e) => context.toggleModal(e)} name='download'> Download </div>
           <div className='navItem'> Art </div>
           <div className='navItem'> Polaroid </div>
           <div className='navItem'> About </div>
           <Search />
         </div>
       </div>
      )}
    </PhotosContext.Consumer>
  )

}

// const mapStateToProps = (state) => {
//   return {
//     isActive: state.addNewPhoto.isActive
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   // this is where the action creators are mapped to the component for it to use
//   return {
//     toggle: (bool) => dispatch(toggleModalActionCreator(bool))
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Navigation);

export default Navigation;
// module.exports = Navigation;