const populateError = (error) => ({
  type: 'POPULATE_ERROR',
  error: error
});

export default populateError;

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao