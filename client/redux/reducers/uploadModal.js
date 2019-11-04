import Redux from 'redux';
import $ from 'jquery';

const initState = {
  isActive: false,
  photoCount: 0
}

const uploadModalReducer = (state = initState, action) => {
  if (action.type === 'NEW_FILE') {
    console.log('thisistheACTIONv')
    console.log(action)
    return {
      ...state,
      photoCount: ++action.photoCount
    }
  } else if (action.type === 'MODAL_IS_ACTIVE') {
    // console.log('modal action dispatched')
    // console.log(action)
    return {
      ...state,
      isActive: !action.isActive
    }
  } else {
    return state;
  }
}

export default uploadModalReducer;