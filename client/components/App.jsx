import React, { useState } from 'react';
import Upload from '../components/Upload.jsx';
import AppContainer from '../components/AppContainer.jsx';
import modalContext from './contexts/modalContext.jsx'
import axios from 'axios';

// YOU can have multiple contexts, dont have to provide all CONTEXT in root App component

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     photos: [],
  //     modalIsActive: false,
  //     pending: true
  //   }
  //   // this.getPhotos = this.getPhotos.bind(this);
  //   this.setPending = this.setPending.bind(this);
  //   this.toggleModal = this.toggleModal.bind(this);
  // }

  const [modalStatus, setModal] = useState(false);
  const [appPending, setPending] = useState(true);

  // all this needs as state is 'modalisactive'
  let toggleModal = (e) => {
    if(e.target !== e.currentTarget) return;
    if (e.target.getAttribute('name') === 'upload') {
      setModal(!modalStatus)
    }
  };

  return (
    <modalContext.Provider
      value={{
        modalIsActive: modalStatus,
        pending: appPending,
        setPending: setPending,
        toggleModal: toggleModal,
      }}
    >
      <Upload />
      <AppContainer />
    </modalContext.Provider>
  )

}


export default App;

// module.exports = App;