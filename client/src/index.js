import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './app/store';
import { Provider as StateProvider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { productsApi } from './services/productsApi';

// Retrieve products data from the endpoint
store.dispatch(productsApi.endpoints.getProducts.initiate());

// Root element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StateProvider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StateProvider>
);
