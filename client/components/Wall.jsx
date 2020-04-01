import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Bricks from 'bricks.js';
import _ from 'lodash';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import axios from 'axios';
import PhotosContext from '../components/contexts/photosContext.jsx';

const Wall = () => {
  // CONTEXT
  const { modalIsActive, pending, setPending, toggleModal } = useContext(PhotosContext);

  // HOOKS
  // const [photos, setPhotos] = useState([]);
  // const emptyWall = <div className='wall' > <h1>LOADING imgaes</h1> </div>
  // const [wall, setWall] = useState(emptyWall);

  const [wallData, setWallData] = useState(
    {
      photos: [],
      wall: <div className='wall' > <h1>LOADING imgaes</h1> </div>,
      wallInstance: null
    }
  )

  const setUpWall = () => {
    // build an instance of the wall via an existing node in the dom (wall)

    const brickSizes = [
      { columns: 5, gutter: 20 },
      { mq: '1224px', columns: 5, gutter: 20 }
    ];

    const newInstance = Bricks({
      packed: 'data-packed',
      sizes: brickSizes,
      position: true,
      container: '.wall'
    });

    newInstance
      .on('pack',   () => {
        console.log('ALL grid items packed. #5')
        // this.props.setPendingTo(false);
      })
      .on('update', () => {
        console.log('NEW grid items packed.')
      })
      .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))

    return newInstance;
  }

  const main = () => {
    let wall = <div className='wall'> {
        _.reverse(wallData.photos).map( brick => (<Brick key={brick.id} brick={brick}/>))
      } </div>

    return wall;

  }
// ADD ASYNC AWAIT
  const getData = async () => {
    await axios.get('http://localhost:2000/api/all')
      .then( res => {
        console.log('axios call')
        setWallData({
          photos: res.data.photos,
          wall: main(),
          wallInstance: setUpWall()
        })
      }).then( () => {
        setPending(false)
      })
      .then( ()=> {
        setTimeout(wallData.wallInstance.pack, 500);
      })
  }

  // this gets called every time it renders and the method calls inside are triggering rerenders so its in an endless loop
  // useEffect( () => {
  //   console.log('useEffect')
  // })


  if (pending) {
    getData();
  }

  return wallData.wall;

}

export default Wall;