// these are action creators
const populatePending = (bool) => ({
  type: 'POPULATE_PENDING',
  pending: bool
});

const populateSuccess = (photos) => ({
  type: 'POPULATE_SUCCESS',
  photos: photos
});

const populateError = (error) => ({
  type: 'POPULATE_ERROR',
  error: error
});

export { populatePending, populateSuccess, populateError };

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
