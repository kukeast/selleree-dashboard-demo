import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
  {/* <HashRouter basename="/selleree-dashboard-demo"> */}
    <App />
  </HashRouter>,
  document.getElementById('root')
);