import Redux from 'redux';
import $ from 'jquery';

const initState = {
  pending: false,
  photos: [
    {
      id: '5d811d91535a841b23e4b56c',
      tags: ['sonny', 'test'],
      file: '003A3255.jpg',
      createdBy: 'sonny',
      dateAdded: 'Tue Sep 17 2019 13:53:21 GMT-0400 (EDT)',
      views: 0,
      downloads: 0
    }
  ],
  error: null
}

const initialPhotosReducer = (state = initState, action) => {

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
        initPhotos: action.payload
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
  // return state
}

export default initialPhotosReducer;