import React from 'react';
import Upload from '../components/Upload.jsx';
import AppContainer from '../components/AppContainer.jsx';
import PhotosContext from '../components/contexts/photosContext.jsx'
import axios from 'axios';

// YOU can have multiple contexts, dont have to provide all CONTEXT in root App component

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      modalIsActive: false,
      pending: true
    }
    // this.getPhotos = this.getPhotos.bind(this);
    this.setPending = this.setPending.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // async getPhotos(){
  //   console.log('got photos')
  //   await axios.get('http://localhost:2000/api/all')
  //   // .then(res => {
  //   //   console.log(res)
  //   //   return res.data.json();
  //   // })
  //   .then(res => {
  //     console.log(res.photos);
  //     this.setState({
  //       photos: res.data.photos
  //     })
  //     // return res.photos;
  //   })
  // };

  setPending(pending){
    console.log('set Pending')
  };


  toggleModal(e) {
    if(e.target !== e.currentTarget) return;
    console.log('toggle lightbox')
    console.log(e.target.getAttribute('name'))
    if (e.target.getAttribute('name') === 'upload') {
      this.setState({
        modalIsActive: !this.state.modalIsActive
      })
    }
  };

  componentWillMount() {
    // this.getPhotos();
  }

  render() {
    return (
      <PhotosContext.Provider
        value={{
          modalIsActive: this.state.modalIsActive,
          pending: this.state.pending,
          getPhotos: this.getPhotos,
          setPending: this.setPending,
          toggleModal: this.toggleModal
        }}
      >
        <Upload />
        <AppContainer />
      </PhotosContext.Provider>
    )
  }
}


export default App;

// module.exports = App;