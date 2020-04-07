import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Bricks from 'bricks.js';
import _ from 'lodash';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import axios from 'axios';
import ModalContext from './contexts/modalContext.jsx';
import Masonry from 'react-masonry-css'


const Wall = () => {
  // CONTEXT
  const { modalIsActive, pending, setPending, toggleModal} = useContext(ModalContext);
  //HOOOKS
  const [wallData, setWallData] = useState(
    {
      photos: [],
    }
  )
  const [userData, setUserData] = useState(
    {
      user: 'sonny',
    }
  )

// ADD ASYNC AWAIT
  const getData = async () => {
    await axios({
        method: 'get',
        url: 'http://localhost:2000/api/all/' + wallData.photos.length,
      })
      .then( res => {
        console.log(wallData.photos.length);
        console.log('axios call')
        setWallData({
          photos: [...wallData.photos, ...res.data.photos]
        })
      })
  }

  const scrollHandler = (e) => {
    console.log('scroll HAND')
    let element = e.target
    console.log(element);
    console.log(element.scrollHeight + ' - ' + element.scrollTop + ' === ' + (element.scrollHeight - element.scrollTop) + ' || NEEDS TO BE ' + element.clientHeight)
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      getData();
    }
  }

  // this gets called every time it renders and the method calls inside are triggering rerenders so its in an endless loop
  useEffect( () => {
    console.log('useEffect')
    getData();
    console.log(wallData.user)
  }, [userData])

  let bricks = wallData.photos.map( brick => (<Brick key={brick.id} brick={brick}/>));
  console.log(wallData)
  return (
    <div id='wall' className='wall' onScroll={e => scrollHandler(e)}>
      <Masonry
        breakpointCols={5}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        { bricks }
      </Masonry>
      <button className='load' onclick={e => scrollHandler(e)}> load more </button>
    </div>
  )

}

export default Wall;