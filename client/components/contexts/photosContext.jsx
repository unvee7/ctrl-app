import React, { useState } from 'react';

export default React.createContext({
  modalIsActive: false,
  pending: true,
  // might not need these vvv since properties above have methods in them..?
  setPending: (bool) => {},
  toggleModal: (e) => {}
})
