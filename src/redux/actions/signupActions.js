export const setDefault = obj => {
  return {
    type: 'SET_DEFAULT'
  }
}

export const setField = obj => {
  return {
    type: 'SET_FIELD',
    payload: obj
  }
}