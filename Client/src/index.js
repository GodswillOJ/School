import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';  // Corrected import
import { api } from 'state/api'; 

const store = configureStore({
  // set up an api
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  // added a middleware
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
// setup a listener
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

document.title = 'GO_Dashboard';
