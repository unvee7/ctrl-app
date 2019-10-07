import Redux from 'redux';
import $ from 'jquery';

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
  pending: true,
  photos: [],
  error: null
}

const initPhotosReducer = (state = initState, action) => {
// return state;
  switch(action.type) {
    case 'POPULATE_PENDING':
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

export default initPhotosReducer;