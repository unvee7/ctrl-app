// THese are action creators =)
const addFileActionCreator = (num) => {
  return {
    type: 'NEW_FILE',
    photoCount: num
  }
}

const toggleModalActionCreator = (bool) => {
  return {
    type: 'MODAL_IS_ACTIVE',
    isActive: bool
  }
}

export { addFileActionCreator, toggleModalActionCreator };