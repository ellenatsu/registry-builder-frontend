
const paypalClientID = 
  import.meta.env.VITE_NODE_ENV === 'production' 
  ? import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID 
  : import.meta.env.VITE_PAYPAL_SANDBOX_CLIENT_ID;



export {paypalClientID};