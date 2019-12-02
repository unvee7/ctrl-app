import React from 'react';
import ReactDOM from 'react-dom';
import Bricks from 'bricks.js';
import _ from 'lodash';
const Brick = require('./Brick.jsx');
const $ = require('jquery');
import axios from 'axios';
import PhotosContext from '../components/contexts/photosContext.jsx';


///// I THINK instance.pack is not being called on
// READ INTO WHAT EXACTLY PACK() is doing


// THIS COMPONENT NEEDS STATE!!!! MAKE SERVER REQUEST IN COMPONENT DID MOUNT?? HOW WILL THAT WORK WITH BRICK.js???

class Wall extends React.Component {
  constructor(props){
    super(props); // you need super to use 'this' keyword in this component.. i think
    this.state = {
      photos : [],
      pending : true,
      instance : null,
      wall : null
    }
    this.myRef = React.createRef();
    this.setUpWall = this.setUpWall.bind(this);
    this.main = this.main.bind(this);
    this.getData = this.getData.bind(this);
  }

  setUpWall() {
    // build an instance of the wall via an existing node in the dom (wall)

    const brickSizes = [
      { columns: 5, gutter: 20 },
      // { mq: '768px', columns: 3, gutter: 20 },
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

    this.setState({
      instance: newInstance,
      wall : <div className='wall'></div>
      // wall: _.reverse(this.state.photos).map( brick => (<Brick key={brick.id} brick={brick}/>))
    })

  }

  main() {
    // setTimeout(this.state.instance.pack, 500)
    // this.state.instance.pack();
    let wall = <div className='wall'> {
        _.reverse(this.state.photos).map( brick => (<Brick key={brick.id} brick={brick}/>))
      } </div>

    return wall;
    // _.reverse(this.state.photos).map( brick => {
    //   frag.appendChild(<Brick key={brick.id} brick={brick}/>)
    // })

  }

  async getData() {
    await axios.get('http://localhost:2000/api/all')
      .then( res => {
        // console.log(res);
        return this.setState({
          photos : res.data.photos,
        })
      })
      // .then(()=> {
      //   this.setUpWall()
      // })
      // .then(() => {
      //   this.main()
      // })
      .then( () => {
        return this.setState({
          wall : this.main()
        })
      })
      .then( ()=> {
        return this.setState({
          pending : false
        })
      })
      .then( () => {
        this.state.instance.pack()
        return setTimeout(this.state.instance.pack, 500)
      })
      // this.main();
  }

  componentWillMount() {
    // this.setUpWall();
    // document.addEventListener('DOMContentLoaded', event => main())

    // check if react has been rendered at least once
    if (!this.state.pending) {
      this.state.instance.pack()

    }
  }

  componentDidMount() {
    this.setUpWall();
    this.getData();
  }

render() {
  return (<PhotosContext.Consumer>
    {context => {
      if (!this.state.pending) {
        return this.state.wall;
      } else {
        return <div className='wall' ref={this.myRef}>
          <h1>LOADING imgaes</h1>
        </div>;
      }

    }}
    </PhotosContext.Consumer>)
  }
}

// const mapStateToProps = (state) => {
//   // console.log('state mapped #1');
//   // console.log(state)
//   return {

//     error: state.populate.error,
//     photos: state.populate.photos,
//     pending: state.populate.pending,
//     photoCount: state.populate.photoCount
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPendingTo: (bool) => dispatch(populatePending(bool)),
//     getPhotos: (photos) => dispatch(populateSuccess(photos))
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Wall);
export default Wall;



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