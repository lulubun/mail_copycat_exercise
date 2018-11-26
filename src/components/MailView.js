import React, { Component } from 'react';
import './App.css';
import MailList from './MailList'
import * as selectors from '../selectors';
import * as actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import OneMailView from './OneMailView';

class MailView extends Component {
  render() {
    const { searchResults, allMail, setValue, oneEmail, opened } = this.props;
    const mails = searchResults || allMail;
    return (
      <div
        className="Mail-view"
      >
      {oneEmail ? <OneMailView email={oneEmail} setValue={setValue} /> :
      <MailList mails={mails} isSearching={searchResults} setValue={setValue} opened={opened} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchResults: selectors.getSearchResults(),
  allMail: selectors.getMail(),
  oneEmail: selectors.getOneEmail(),
  opened: selectors.getOpened(),
});
  
const mapDispatchToProps = (dispatch) => ({
  setValue: (key, val) => dispatch(actions.setValue(key, val)),
})
  


export default connect(mapStateToProps, mapDispatchToProps)(MailView);
