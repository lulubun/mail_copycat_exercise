import React, { Component } from 'react';
import Header from './Header';
import './App.css';
import LeftNavigation from './LeftNavigation';
import MailView from './MailView';

class App extends Component {
  render() {
    return (
      <div
        className="App"
      >
        <Header />
        <div className='app-body'>
          <LeftNavigation />
          <MailView />
        </div>
      </div>
    );
  }
}

export default App;
