import * as constants from './constants';

export const setValue = (key, res) => {
  return ({
      type: constants.SET_VALUE,
      payload: {
        key,
        value: res
      },
  })
}

export const resetAll = () => {
  return ({
      type: constants.RESET_ALL,
  })
}

export const setOpened = (bool) => {
  return ({
      type: constants.SET_OPENED,
      payload: bool,
  })
}