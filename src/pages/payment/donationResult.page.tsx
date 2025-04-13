import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { PAYMENT_STATUS } from "../../constants/constants";

const DonationSuccessPage: React.FC = () => {
  const location = useLocation();

  const state = location.state as {
    success: boolean;
    details?: any;
    listId: string;
  };
  const { success, listId, details } = state;

  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  return (
    <div className="p-8 max-w-3xl mx-auto rounded-lg shadow-lg text-center">
      {/* Success Icon and Message */}
      {success ? (
        <div className="mb-6 flex flex-col items-center p-2">
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Thank You for Your Donation!
          </h2>
          <p className="text-lg text-gray-700">
            Your contribution has been successfully received.
          </p>
          {/* Processing Information */}
          <div className="bg-gray-100 p-4 rounded-lg text-gray-800 text-sm w-full">
            <p className="font-semibold text-gray-900">Please note:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                It usually takes{" "}
                <span className="font-bold">3-5 business day</span> for the
                funds to be verified and fully processed and available for the fundraiser to
                collect.
              </li>
              <li>
                In cases where the transaction is marked as{" "}
                <span className="font-bold">high risk</span> by the
                payment platform, processing may take
                <span className="font-bold"> longer than 5 buisness days</span> for
                security verification.
              </li>
            </ul>
          </div>
          <p className="text-gray-700 mt-4">
            We appreciate your understanding and your generous support! 💖
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Please check Your Email
          </h3>
          <p className="text-gray-600">
            A receipt has been sent to the email address you provided. Please
            keep it as proof of your donation.
          </p>
        </div>
      ) : details?.status === PAYMENT_STATUS.VERIFIED_DATABASE_FAILED ? (
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Thank You for Your Generosity!
          </h2>
          <p className="text-lg text-gray-700">
            Your donation has been successfully received, but still, please wait
            for couple of days before the money fully processed and can be
            collected by the fund raiser.
            <span>
              add a note here! couple of days ? normally 1 business day, if
              transaction marked as high risk by transaction platform, it might
              take 3-5 days.
            </span>
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Sorry we currently experiencing error at server,
          </h3>
          <p className="text-gray-600">
            thus we cannot update your payment and we will send the receipt to
            the email address you provided later. Your payment number is{" "}
            {details?.paymentId}, please contact us if needed. Sorry about the
            inconvenience.
          </p>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            An error occurred for payment #{details?.paymentId}
          </h2>
          <p className="text-lg text-gray-700">
            Please double check your chosen donation amount and try again. If
            the problem persists, please contact us.
          </p>
        </div>
      )}

      {/* Conditional Account Creation Section */}
      {!isAuthenticated && (
        <div className="mt-8 flex flex-col p-2 gap-2">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate('/auth?dest=/dashboard')
            }
          >
            Create an account
          </button>
          <p className="text-gray-600">
            Would you like to keep track of your donations and create your own
            wishlist?
          </p>
          <strong>
            Please use the same email address to create account. Same email
            google account or email and password both work fine!
          </strong>
        </div>
      )}

      {/* Return to List Button */}
      <div className="mt-8">
        <button
          className="btn btn-outline"
          onClick={() => navigate(`/wishlist/${listId}`)}
        >
          Return to the List
        </button>
      </div>
    </div>
  );
};
export default DonationSuccessPage;
