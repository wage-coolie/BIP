import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// impoting Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
// Importing Popper for bootstrap dependency
import Popper from '@popperjs/core';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


