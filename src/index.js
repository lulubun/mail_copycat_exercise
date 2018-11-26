import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import allState from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
    allState,
    applyMiddleware(thunk),
    )

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
