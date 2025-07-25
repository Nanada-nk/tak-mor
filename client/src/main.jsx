import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import './index.css';

// หมายเหตุ: ToastContainer ถูกย้ายไปอยู่ใน App.jsx แล้ว ซึ่งเป็นวิธีที่ถูกต้องค่ะ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ครอบแอปพลิเคชันทั้งหมดด้วย GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
