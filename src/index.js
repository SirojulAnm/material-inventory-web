import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://sirojulanam.com:8000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
