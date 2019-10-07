import React from 'react';
import ReactDOM from 'react-dom';

import Wall from './Wall.jsx';
import Navigation from './Navigation.jsx';
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='appContainer'>
          <Navigation />
          <Wall />
        </div>
      </div>
    )
  }
}

// module.exports = App;
export default App;