import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//  import store from "./Redux/store"  
import { CircularProgress } from '@material-ui/core';
import './index.css';
import { persistor, store } from "./Redux/store"
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
// import { persistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={<CircularProgress color='secondary'/>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

