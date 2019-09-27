const React = require('react');

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.brick._id,
      file: props.brick.file,
      tags: props.brick.tags,
      createdBy: props.brick.createBy,
      dateAdded: props.brick.dateAdded,
      views: props.brick.views,
      downloads: props.brick.downloads
    }
  }

  toggleSearch(e) {
    // toggle <Search />
  }

  clickedBrick() {
    return (
      <div className='singleViewFlexbox'>
          <img className='' src={this.state.file}> </img>
          <div className='details'>
            <div className='exitX'></div>
            <h1> # {this.state.id} </h1>
            <h2>Tags</h2>
            <p> {this.state.tags} </p>
            <h2>Add Tag</h2>
            <form>
              <div className='addTagsContainer'>
                <textarea name='addTags' type='textarea' placeholder='Separate tags with a comma (,)' rows='5'></textarea>
                <button type='button' action='' name='button'> + </button>
              </div>
            </form>
          </div>
        </div>
    )
  }

  render() {
    return (
      <div className='brick'>
        <img src={this.state.file}/>
      </div>
    )
  }
}

module.exports = Brick;