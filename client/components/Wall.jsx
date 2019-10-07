import React from 'react';
import Bricks from 'bricks.js';
import store from '../redux/store.js';
import fetchPhotos from '../redux/thunks/fetchPhotos.js';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import { connect } from 'react-redux';

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.instance = null;
    this.populateWall = this.populateWall.bind(this);
    this.buildWall = this.buildWall.bind(this);
  }

  populateWall() {
    // console.log('populateWall called #6');
    if (!this.props.pending) {
      return (
        this.props.photos.map( brick => (
          <Brick key={brick.id} brick={brick}/>
        ))
      )
    }
  }

  buildWall() {
    // console.log('buildWall called: #8')
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
      .on('pack',   () => console.log('ALL grid items packed. '))
      .on('update', () => console.log('NEW grid items packed.'))
      .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))
  }

  componentWillMount() {
    console.log('component will mount / call populate #2')
  }

  componentDidMount() {
    console.log('component mounted: #7');
    this.buildWall();
    this.props.populate(this.instance.pack);
  }

  render() {
    console.log('app rendered with these vv props: #5')
    const loadingDiv = <div ref={this.myRef}> <h1>LOADING imgaes</h1></div>;
    const wall = <div className='wall' ref={this.myRef}>
      {this.populateWall()}
    </div>
    return this.props.pending ? loadingDiv : wall;

  }
}

const mapStateToProps = (state) => {
  console.log('state mapped #1');
  console.log(state)
  return {
    error: state.populate.error,
    photos: state.populate.photos,
    pending: state.populate.pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    populate: (cb) => dispatch(fetchPhotos(cb))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wall);
