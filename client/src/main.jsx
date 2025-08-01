import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import './index.css';
import authStore from './stores/authStore.js'

//rutclose
// authStore.getState().checkAuth();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
