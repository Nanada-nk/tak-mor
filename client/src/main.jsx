import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import './index.css';

<<<<<<< HEAD

=======
//rutclose
// authStore.getState().checkAuth();
>>>>>>> feature/InternalMedicineByRuj
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
