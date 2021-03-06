const React = require('react');
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
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
          {console.log(this.state.file)}
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
        {/* <LazyLoadImage
          src={`data:image/png;base64,${this.state.file}`} // use normal <img> attributes as props
          effect="blur"
        /> */}
        <img src={`data:image/png;base64,${this.state.file}`}/>
      </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   // need to set up routes on server
//   let id = ownProps.match.params.post_id;
//   return {
//     photo: state.photo.find((photo) => post.id === id)
//   }
// }

// export default connect(mapStateToProps)(Brick);
module.exports = Brick;