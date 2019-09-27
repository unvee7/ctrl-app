const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search.jsx');
const Upload = require('./Upload.jsx');
const Wall = require('./Wall.jsx');
const Navigation = require('./Navigation.jsx');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPhotos: [],
    }
  }

  render() {
    let upload;
    if (this.state.uploadToggled) {
      $('.appContainer').addClass('blur');
      upload = <Upload toggleOff={this.toggleUpload} />
    } else {
      $('.appContainer').removeClass('blur');
    }
    return (
      <div>
        {upload}
        <div className='appContainer'>
          <Navigation />
          <Wall />
        </div>
      </div>
    )
  }
}

module.exports = App;