import React from 'react';


export default React.createContext({
  photos: [],
  modalIsActive: false,
  pending: true,
  getPhotos: () => {},
  setPending: (bool) => {},
  toggleModal: (e) => {}
})




// export const PhotosContext = createContext({});

// class PhotosContextProvider extends Component() {
//   constructor(props) {
//     super(props)
//     this.state = {
//       photos: [],
//       modalIsActive: false,
//       pending: true
//     }
//   }


//   render() {
//     return (
//       <PhotosContextProvider value={{...this.state}}>
//         {this.props.children}
//       </PhotosContextProvider>
//     )
//   }
// }

// export default PhotosContextProvider;