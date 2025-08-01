// src/pages/QrCallbackPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import axios from 'axios';


function QrCallbackPage() {
  const [paymentStatus, setPaymentStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
 // Assuming this function is in your store

  useEffect(() => {
    const chargeId = searchParams.get('omise_charge_id');
    
    if (chargeId) {
      // Poll your backend to check the payment status
      const checkStatus = async () => {
        try {
          const response = await axios.get(`http://localhost:9090/api/payment/status/${chargeId}`);
          if (response.data.status === 'COMPLETED') {
            setPaymentStatus('success');
            // Create the appointment now that payment is confirmed
            await handleCreateAppointment();
            // Redirect to the confirmation page
            setTimeout(() => navigate('/confirmation'), 2000);
          } else {
            setPaymentStatus('failed');
            // Redirect to the payment page with an error
            setTimeout(() => navigate('/payment', { state: { error: 'Payment not successful.' } }), 2000);
          }
        } catch (error) {
          console.error('Failed to verify payment status:', error);
          setPaymentStatus('failed');
          setTimeout(() => navigate('/payment', { state: { error: 'Failed to verify payment.' } }), 2000);
        }
      };
      
      checkStatus();
    } else {
      setPaymentStatus('failed');
      setTimeout(() => navigate('/payment', { state: { error: 'Missing payment details.' } }), 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen font-prompt">
      {paymentStatus === 'verifying' && (
        <span className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
          <div className="animate-spin h-7 w-7 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          Verifying payment...
        </span>
      )}
      {paymentStatus === 'success' && (
        <span className="flex items-center gap-2 text-green-700 text-lg font-semibold">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Payment successful!
        </span>
      )}
      {paymentStatus === 'failed' && (
        <span className="flex items-center gap-2 text-red-700 text-lg font-semibold">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          Payment failed.
        </span>
      )}
    </div>
  );
}

export default QrCallbackPage;