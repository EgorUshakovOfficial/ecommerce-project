import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './app/store';
import { Provider as StateProvider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import api from './services';
import { fetchAccessToken } from './app/state/authenticationSlice';
import { fetchCartItems } from './app/state/cartSlice';
import { fetchUser } from './app/state';


(async () => {
  // Retrieve products data from the endpoint
  await store.dispatch(api.products.endpoints.getProducts.initiate());

  // Retrieve access token from the endpoint
  await store.dispatch(fetchAccessToken.initiate())

  // Access token
  const accessToken = store.getState().authentication.accessToken;

  // Check if access token exists
  if (accessToken !== null){
    // Retrieve user's profile information
    await store.dispatch(fetchUser.initiate({accessToken}));

    // User Id number
    const userId = store.getState().user.data.id;

    // Retrieve shopping session associated with the user
    await store.dispatch(api.shopping.endpoints.getShoppingSession.initiate({user: userId}))

    // Retrieve cart items associated with the user
    await store.dispatch(fetchCartItems.initiate())
  }

  // Root element
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <StateProvider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </StateProvider>
  );
})();

