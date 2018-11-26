import { createSelector } from 'reselect'

const getState = (state) => state

const getMail = () => createSelector(
  getState,
  (st) => st.messages
)

const getSearchResults = () => createSelector(
  getState,
  (st) => st.searchResults
)

const getOneEmail = () => createSelector(
  getState,
  (st) => st.oneEmail
)

const getOpened = () => createSelector(
  getState,
  (st) => st.opened
)
export {
  getMail,
  getSearchResults,
  getOneEmail,
  getOpened,
}