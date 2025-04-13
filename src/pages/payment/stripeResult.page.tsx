import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { usePaymentStatus } from "../../hooks/usePaymentStatus";
import { useNavigate } from "react-router-dom";
import { PAYMENT_STATUS } from "../../constants/constants";


const StripeResultPage: React.FC = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  
  const [intentId, setIntentId] = useState<string>('');

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    const payment_intent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );


    if (!stripe || !clientSecret) {
      console.log("Stripe not initialized or clientSecret missing.");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        console.log("Failed to retrieve PaymentIntent."); 
        return;
      }
      console.log('paymentintent id from url is:', payment_intent);
      console.log("PaymentIntent retrieved is:", paymentIntent);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);
  const { status: wsStatus, details } = usePaymentStatus(intentId);

  useEffect(() => {
    console.log("WebSocket status:", wsStatus);
    const dataDetails = {
      status: wsStatus,
      ...details
    }
    if (wsStatus === PAYMENT_STATUS.VERIFIED_DATABASE_UPDATED) {
      console.log("Navigating to donation success...");
      navigate('/donation-success', { state: { success: true, dataDetails, listId: details?.listId } });
    } else if (wsStatus === PAYMENT_STATUS.VERIFIED_DATABASE_FAILED || wsStatus === PAYMENT_STATUS.VERIFIED_AMOUNT_MISMATCH) {
      console.log("Navigating to donation failure...");
      navigate('/donation-success', { state: { success: false, dataDetails, listId: details?.listId } });
    }
  }, [wsStatus, navigate, details]);

  return (
    <div className="flex items-center justify-center h-screen">
    <div>
      <p className="text-lg font-semibold">Processing and verifying your payment...</p>
      <div className="loader" />
    </div>
  </div>
  );
};

export default StripeResultPage;
