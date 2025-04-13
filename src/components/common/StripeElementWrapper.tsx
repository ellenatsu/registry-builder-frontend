import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../config/stripe";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

const StripeElementsWrapper = ({ children }: { children: ReactNode}) => {
  const location = useLocation();
  const clientSecret = new URLSearchParams(location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return <div>Error: Missing client secret.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};

export default StripeElementsWrapper;
