// THese are action creators =)
import store from '../store.js';
const newAddedFile = (num) => {
  console.log('action creators dispatched')
  console.log(store)
  console.log(num)
  return {
    type: 'NEW_FILE',
    photoCount: num
  }
}

const modalIsActive = (bool) => {
  return {
    type: 'MODAL_IS_ACTIVE',
    isActive: bool
  }
}

export { newAddedFile, modalIsActive };