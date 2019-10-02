import React from 'react';
import Bricks from 'bricks.js';
import store from '../redux/store.js';
import populateError from '../redux/actions/populateError.js';
import populateSuccess from '../redux/actions/populateSuccess';
import populatePending from '../redux/actions/populateSuccess.js';
import fetchPhotos from '../redux/actions/fetchPhotos.js';
import { bindActionCreators } from 'redux';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import { connect } from 'react-redux';

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // ^ use Ref to have access to the wall DOM element before rendering to append new bricks to it
    // this.state = {
    //   initPhotos: [],
    //   browserWindow: window.innerWidth

    // }
    this.prepWall = this.prepWall.bind(this);
    this.buildWall = this.buildWall.bind(this);
  }

  // getData(cb) {
  //   $.ajax({
  //     url: 'http://localhost:2000/api/all',
  //     type: 'GET',
  //     dataType: 'json',
  //     success: (data) => {
  //       cb(data.photos)
  //     },
  //     error: (err) => {
  //       throw new Error(err)
  //     }
  //   })
  // }

  prepWall() {
    console.log('prepwall called');
    console.log(this.props);
    return (
      this.props.photos.map( brick => (
        <Brick key={brick.id} brick={brick}/>
      ))
    )
  }

  buildWall() {
    console.log('buildWall called')
    // const node = this.myRef.current;
    const brickSizes = [
      { columns: 5, gutter: 20 },
      // { mq: '768px', columns: 3, gutter: 20 },
      // { mq: '1024px', columns: 5, gutter: 20 },
      { mq: '1224px', columns: 5, gutter: 20 }
      // { mq: '1824px', columns: 7, gutter: 20 },
      // { mq: '2024px', columns: 8, gutter: 20 }
    ];

    const instance = Bricks({
      packed: 'data-packed',
      sizes: brickSizes,
      position: true,
      container: this.myRef.current
    });

    instance
      .on('pack',   () => console.log('ALL grid items packed. '))
      .on('update', () => console.log('NEW grid items packed.'))
      .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))

    setTimeout(instance.pack, 700);
    // instance.pack();
  }

  componentWillMount() {

    // $.ajax({
    //   url: 'http://localhost:2000/api/all',
    //   type: 'GET',
    //   dataType: 'json',
    //   success: (data) => {
    //     initState.initPhotos = data.photos
    //   },
    //   error: (err) => {
    //     throw new Error(err)
    //   }
    // })

    // const {fetchPhotos} = this.props;
    // store.dispatch(fetchPhotos());
    this.props.populate();
  }

  componentDidMount() {

    // this.getData( (entries => {
    //   this.setState({
    //     initPhotos: entries
    //   })
    // }))

    console.log('component mounted');
    const resize = () => {
      // $('brick').css('width', '20% !important');
      // $('wall').css('width', 'calc(100% - 80px)');
      this.buildWall();
    }

    window.addEventListener('resize', () => {
      setTimeout(resize, 200);
    });

   this.buildWall();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.browserWindow !== prevState.browserWindow) {
  //     console.log('not the same');
  //     instance.resize();
  //   } else {
  //     console.log('YEP. theyre the same');
  //     instance.resize();
  //   }
  // }

  render() {
    console.log('app rendered')
    return (
      <div className='wall' ref={this.myRef}>
        {this.prepWall()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // error: populateError()(state.error),
    // photo: populateSuccess()(state.initPhotos),
    // pending: populatePending()(state.pending)
    error: state.error,
    photos: state.photos,
    pending: state.pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    populate: () => dispatch(fetchPhotos())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Wall);
// module.exports = connect(mapStateToProps)(Wall);