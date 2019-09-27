const React = require('react');

class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }

  render() {
    return (
      <div className='navItem'> Download</div>
    )
  }
}

module.exports = Download;