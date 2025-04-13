import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = 
  import.meta.env.VITE_NODE_ENV === 'production' 
  ? import.meta.env.VITE_STRIPE_LIVE_PUBLIC_KEY 
  : import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY;

const stripePromise = loadStripe(stripePublicKey);  

export {stripePromise};