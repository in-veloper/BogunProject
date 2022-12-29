// /* eslint-disable react/react-in-jsx-scope */
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );



import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import "bulma/css/bulma.css";
import { createRoot } from 'react-dom/client';
import axios from "axios";
 
axios.defaults.withCredentials = true;
 
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
// ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // document.getElementById('root')
);