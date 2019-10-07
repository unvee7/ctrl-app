import Redux from 'redux';
import $ from 'jquery';

const initState = {
  file: '',
  tags: '',
  createdBy: 'dev',
  isActive: false
}

const uploadModalReducer = (state = initState, action) => {
  if (action.type === 'NEW_FILE') {
    return {
      ...state,
      file: action.file,
      tags: action.tags,
      createdBy: action.user,

    }
  } else if (action.type === 'MODAL_IS_ACTIVE') {
    console.log('modal action dispatched')
    console.log(action)
    return {
      ...state,
      isActive: !action.isActive
    }
  } else {
    return state;
  }
}

export default uploadModalReducer;