const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');
const Wall = require('./Wall.jsx');
const Download = require('./Download.jsx');

import { connect } from 'react-redux';
import Upload from './Upload.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className='header grid'>
          <img className='mark' src='./imgs/ctrl.svg'></img>
          <div className='nav' >
            <Upload />
            <Download />
            <div className='navItem'> Art </div>
            <div className='navItem'> Polaroid </div>
            <div className='navItem'> About </div>
            <Search />
          </div>
        </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     nav: true
//   }
// }

export default connect()(Navigation)
// export default Navigation;
// module.exports = Navigation;