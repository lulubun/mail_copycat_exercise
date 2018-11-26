import React from 'react';
import ReactDOM from 'react-dom';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});