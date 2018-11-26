import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';

class OneMailView extends Component {
  render() {
    const { email } = this.props;
    return (
      <div
        className="One-mail-view"
      >
        <h2>{email.subject}</h2>
        <div
          style={{
            display: 'inline',
          }}
        >
          <h6>{email.sender}</h6>
          <h6 className={'right-text'}>{moment(email.date).format('llll')}</h6>
        </div>
        {$(email.body).html()}
      </div>
    );
  }
}
  


export default OneMailView;
