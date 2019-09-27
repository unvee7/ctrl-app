const React = require('react');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }

  toggleSearch(e) {
    // toggle <Search />
  }

  render() {
    return (
      <div className='navItem'>
        <span className='searchBar' type='text' suppressContentEditableWarning={true} contentEditable='true'>Search</span>
      </div>
    )
  }
}

module.exports = Search;