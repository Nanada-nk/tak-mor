import omise from 'omise';

// Initialize the Omise client with your keys.
// Make sure these environment variables are set in your .env file
// and are being loaded by your application.
const omiseClient = omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default omiseClient;