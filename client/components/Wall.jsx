import React from 'react';
import ReactDOM from 'react-dom';
import Bricks from 'bricks.js';
import _ from 'lodash';
import axios from 'axios';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import { connect } from 'react-redux';
import { populatePending, populateSuccess, populateError } from '../redux/actions/populateActions.js';
import { addNewPhoto, toggleModal, refreshPhotos } from '../redux/thunks/addNewPhoto.js';
import store from '../redux/store.js';

///// I THINK instance.pack is not being called on
// READ INTO WHAT EXACTLY PACK() is doing

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.instance = null;
    this.createWallInstance = this.createWallInstance.bind(this);
    this.fetchPhotos = this.fetchPhotos.bind(this);
  }

  async fetchPhotos() {
    // console.log('populateWall() #0 ')
    let photos = await axios.get('http://localhost:2000/api/all');
    this.props.getPhotos(photos.data.photos);
    this.instance.pack();
  }

  createWallInstance() {
    // build an instance of the wall via an existing node in the dom (wall)
    console.log('createWallInstance() #4')
      const brickSizes = [
        { columns: 5, gutter: 20 },
        // { mq: '768px', columns: 3, gutter: 20 },
        { mq: '1224px', columns: 5, gutter: 20 }
      ];

      this.instance = Bricks({
        packed: 'data-packed',
        sizes: brickSizes,
        position: true,
        container: this.myRef.current
      });

      this.instance
        .on('pack',   () => {
          console.log('ALL grid items packed. #5')
          // this.props.setPendingTo(false);
        })
        .on('update', () => {
          console.log('NEW grid items packed.')
        })
        .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))

  }

  componentWillMount() {
    this.fetchPhotos();
  }

  componentDidMount() {
    this.createWallInstance();
    this.fetchPhotos();
    // this.instance.pack();


    setTimeout( ()=> {
      this.instance.pack();
    }, 1000)
  }

  render() {
    console.log('app rendered #2')
      if (!this.props.pending) {
        return <div className='wall' ref={this.myRef}>
          {_.reverse(this.props.photos).map( brick => (
            <Brick key={brick.id} brick={brick}/>
            )
          )}
      </div>;
      } else {
        return <div className='wall' ref={this.myRef}>
          <h1>LOADING imgaes</h1>
        </div>;
      }

  }
}

const mapStateToProps = (state) => {
  // console.log('state mapped #1');
  // console.log(state)
  return {

    error: state.populate.error,
    photos: state.populate.photos,
    pending: state.populate.pending,
    photoCount: state.populate.photoCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPendingTo: (bool) => dispatch(populatePending(bool)),
    getPhotos: (photos) => dispatch(populateSuccess(photos))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wall);



// window.addEventListener('DOMContentLoaded', (event) => {
//   this.instance.pack();
//   console.log('DOM fully loaded and parsed');
// });



// document.onreadystatechange = function () {
//   if (document.readyState === 'complete') {
//     setInterval( ()=> {
//       this.instance.pack();
//     }, 1000)
//     // this.instance.pack();
//   }
// }