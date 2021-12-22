import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter basename="/selleree-dashboard-demo">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);