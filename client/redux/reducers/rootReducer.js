import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   initialPhotos
// })

const testData = {
    id: '5d811d91535a841b23e4b56c',
    tags: ['sonny', 'test'],
    file: '003A3255.jpg',
    createdBy: 'sonny',
    dateAdded: 'Tue Sep 17 2019 13:53:21 GMT-0400 (EDT)',
    views: 0,
    downloads: 0
  }

const initState = {
  pending: false,
  photos: [],
  error: null
}

const rootReducer = (state = initState, action) => {
  // return state;
  switch(action.type) {
    case 'POPULATE_PENDING':
      console.log('populate pending found')
      return {
        ...state,
        pending: true
      }
    case 'POPULATE_SUCCESS':
      return {
        ...state,
        pending: false,
        photos: action.photos
      }
    case 'POPULATE_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default rootReducer