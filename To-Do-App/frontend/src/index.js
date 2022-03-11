import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import Popper from '@popperjs/core';
import axios from 'axios'
axios.defaults.baseURL = 'https://aqueous-sands-71993.herokuapp.com/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

