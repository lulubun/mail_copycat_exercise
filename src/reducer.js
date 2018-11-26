import * as constants from './constants';
import * as messages from './emails';


const INITIAL_STATE = {
  messages: messages.messages,
  searchResults: null,
  oneEmail: null,
  opened: [],
  checked: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.SET_VALUE:
      const key = action.payload.key;
      const value = action.payload.value;
      if (key === 'oneEmail') {
        return {
          ...state,
          [key]: value,
          opened: state.opened.concat(value.id),
        };
      }
      return {
        ...state,
        [key]: value,
      };
    case constants.SET_OPENED:
      const currentChecked = state.checked;
      const markOpen = action.payload;
      const oldChecked= state.opened;
      let newChecked;
      if (markOpen && markOpen === true) {
        newChecked = oldChecked.concat(currentChecked)
      } else {
        newChecked = currentChecked.reduce((acc, c) => {
          const newAcc = acc;
          return newAcc.filter((chk) => chk !== c);
        }, [])
      }
    return {
      ...state,
      opened: newChecked,
      checked: null,
    };
    case constants.RESET_ALL:
      return {
        ...state,
        messages: messages.messages,
        searchResults: null,
        oneEmail: null,
        checked: null,
      };
    default: return state;
  }
};