import React from 'react';
import ReactDOM from 'react-dom';

import Wall from './Wall.jsx';
import Navigation from './Navigation.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';
import Upload from '../components/Upload.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Upload />
        <div className='appContainer'>
          <Navigation />
          <Wall />
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
  return {
    populate: (cb) => dispatch(fetchPhotos(cb))
  }
}

export default connect(mapStateToProps)(App);

// module.exports = App;