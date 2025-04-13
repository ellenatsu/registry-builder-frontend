import React, { useState } from 'react';
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const StripeCheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const paymentElementOptions = {
    layout: {
        type: 'accordion' as const,
        defaultCollapsed: false,
        radios: false,
      },
      appearance: {
        theme: 'stripe' as const,
      },
      paymentMethodOrder: ['apple_pay', 'google_pay', 'card', 'link'], // Add this line
  }

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/stripe/loading`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message || "An error occurred.");
    } else {
      toast.error("An unexpected error occurred.");
    }
    setLoading(false);
  };



  

  return (
    <form>
      <PaymentElement options={paymentElementOptions}/>
      <button onClick={handlePay} className='btn btn-primary mt-3 w-full' disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
