const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');
const Wall = require('./Wall.jsx');
const Download = require('./Download.jsx');

import { connect } from 'react-redux';
import Upload from './Upload.jsx';
import { addFileActionCreator, toggleModalActionCreator } from '../redux/actions/uploadActionCreators.js';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModalHandler = this.toggleModalHandler.bind(this);
  }

  toggleModalHandler(e) {
    if (e.target.getAttribute('name') === 'upload') {
      this.props.toggle(this.props.isActive)
    } else {
      console.log('nope')
    }

    console.log('modal handerl lcick')
  }

  render() {
    return (
        <div className='header grid'>
          <img className='mark' src='./imgs/ctrl.svg'></img>
          <div className='nav' >
          <div className='navItem' onClick={(e) => this.toggleModalHandler(e)} name='upload'> Upload </div>
            <div className='navItem' onClick={(e) => this.toggleModalHandler(e)} name='download'> Download </div>
            <div className='navItem'> Art </div>
            <div className='navItem'> Polaroid </div>
            <div className='navItem'> About </div>
            <Search />
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isActive: state.addNewPhoto.isActive
  }
}

const mapDispatchToProps = (dispatch) => {
  // this is where the action creators are mapped to the component for it to use
  return {
    toggle: (bool) => dispatch(toggleModalActionCreator(bool))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);

// export default Navigation;
// module.exports = Navigation;