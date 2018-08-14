// https://developer.chrome.com/extensions/windows
// script for the window popup opened from the context menu example

import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import '../css/extension.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
