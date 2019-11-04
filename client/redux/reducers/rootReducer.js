import { combineReducers } from 'redux';
import initPhotosReducer from './initialPhotos.js';
import uploadModalReducer from './uploadModal.js';

const rootReducer = combineReducers({
  populate: initPhotosReducer,
  addNewPhoto: uploadModalReducer
  // initPhotosReducer,
  // uploadModalReducer
})

export default rootReducer