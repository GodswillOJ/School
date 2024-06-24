import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'state';
import cartReducer from 'state/cartFunctions/cartReducer'; // Adjust the import path as needed
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';

const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer, // Add the cartReducer here
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// setup a listener
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

document.title = 'GO_Dashboard';
