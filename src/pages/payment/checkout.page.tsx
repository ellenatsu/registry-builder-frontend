import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { stripePromise } from "../../config/stripe";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../../components/payment/StripeCheckoutForm";
import PayPalCheckoutButton from "../../components/payment/PayPalCheckoutButton";


const CheckouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    listId,
    orderId,
    donation_amount,
    order_amount,
    platform_fee,
    transaction_fee,
    client_secret,
  } = location.state || {};



  if (!orderId ) {
    return <p>Invalid navigation. Please go back to the donation page.</p>;
  }

  //for stripe
  const stripeOptions = {
    clientSecret: client_secret,
    // Fully customizable with appearance API.
    appearance: {},
  };

  //for paypal
  const handleSuccess = () => {
    toast.success("Your donation paid successfully! Thank you!");
    // Redirect to success page after successful payment
    navigate("/donation-success", { state: { listId, success: true } });
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8">
      <div className="flex-1 max-h-screen overflow-y-auto p-4 bg-white shadow-md rounded-md">
        <div className="card bg-base-100 shadow-lg rounded-lg p-3">
          <div className="flex flex-col gap-2 justify-center mt-3">
            <PayPalCheckoutButton orderId={orderId} onSuccess={handleSuccess} />

            {client_secret ? (
              <div className="w-full justify-center items-center">
                <Elements stripe={stripePromise} options={stripeOptions}>
                  {/* Render Stripe Form */}
                  <StripeCheckoutForm />
                </Elements>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-red-600 mb-4">
                  Payment Options Unavailable
                </h2>
                <p className="text-gray-700">
                  Sorry! We are currently experiencing issues processing Apple
                  Pay, Google Pay, Alipay, and WeChat Pay. Please use PayPal or
                  try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Order Summary */}
      <div className="w-full lg:w-1/3 flex items-center justify-center">
        <div className="card bg-base-100 shadow-md w-full">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between font-semibold">
              <span>Donation Amount:</span>
              <span> ${donation_amount}</span>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span> ${platform_fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Fee:</span>
                <span> ${transaction_fee.toFixed(2)}</span>
              </div>
              <hr className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>CAD ${order_amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckouPage;
