const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');
const Upload = require('./Upload.jsx');
// const Wall = require('./Wall.jsx');
import Wall from './Wall.jsx';
const Navigation = require('./Navigation.jsx');
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