const React = require('react');
import Bricks from 'bricks.js';
const Brick = require('./Brick.jsx');
const $ = require('jquery');

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      allBricks: [],
      browserWindow: window.innerWidth

    }
    this.prepWall = this.prepWall.bind(this);
    this.buildWall = this.buildWall.bind(this);
  }

  getData(cb) {
    $.ajax({
      url: 'http://localhost:2000/api/all',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        cb(data.photos)
      },
      error: (err) => {
        throw new Error(err)
      }
    })
  }

  prepWall() {
    console.log('prepwall called');
    return (
      this.state.allBricks.map( brick => (
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

  componentDidMount() {

    this.getData( (entries => {
      this.setState({
        allBricks: entries
      })
    }))

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

module.exports = Wall;