// THese are action creators =)
const newAddedFile = (file) => {
  console.log(file)
  return {
    type: 'NEW_FILE',
    file: file.file,
    tags: file.tags,
    createdBy: file.user
  }
}

const modalIsActive = (bool) => {
  return {
    type: 'MODAL_IS_ACTIVE',
    isActive: bool
  }
}

export { newAddedFile, modalIsActive };