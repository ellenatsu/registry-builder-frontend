import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useUserStore } from "../../stores/userStore";

import {
  PAYPAL_FEE_RATE,
  PAYPAL_FIXED_FEE,
  PLATFORM_FIXED_RATE,
} from "../../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { handleError } from "../../utils/errorUtils";
import {
  validateEmail,
  validateNumber,
  validateText,
} from "../../utils/validateUtils";
import DonationAmountInput from "../../components/form/DonationAmountInputProps";
import { createOrder } from "../../services/order.service";

// Types
interface FormData {
  donationAmount: number;
  platformFee: number;
  paypalFee: number;
  totalAmount: number;
}

const DonationInputPage: React.FC = () => {
  const location = useLocation();
  const { listId } = location.state || {}; // Access list ID from state

  const { userData, isAuthenticated, token } = useUserStore();
  const navigate = useNavigate();

  const [isAgreed, setIsAgreed] = useState(false); // New state for the checkbox

  const handleCheckboxChange = () => {
    setIsAgreed((prev) => !prev); // Toggle the checkbox state
  };

  // Ensure the list ID is valid
  useEffect(() => {
    if (!listId) {
      toast.error("Invalid list, please try again later.");
      navigate("/");
    }
  }, [listId, navigate]);

  // Use refs for name and email
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    donationAmount: 0,
    platformFee: 0,
    paypalFee: 0,
    totalAmount: 0,
  });

  // Function to handle amount change from input
  const handleAmountChange = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount,
      platformFee: amount * PLATFORM_FIXED_RATE,
    }));
  };

  // Recalculate fees whenever donationAmount  changes
  useEffect(() => {
    const { donationAmount } = formData;
    // Calculate the PayPal fee
    const calculatedPaypalFee =
      donationAmount * (1 + PLATFORM_FIXED_RATE) * PAYPAL_FEE_RATE +
      PAYPAL_FIXED_FEE;

    // Calculate the total amount after applying the discount and adding fees
    const calculatedTotalAmount =
      donationAmount * (1 + PLATFORM_FIXED_RATE) + calculatedPaypalFee;

    setFormData((prev) => ({
      ...prev,
      paypalFee: parseFloat(calculatedPaypalFee.toFixed(2)),
      totalAmount: Math.max(parseFloat(calculatedTotalAmount.toFixed(2)), 0),
    }));
  }, [formData.donationAmount]);

  //for coupon  -- now delete

  const createOrderMutation = useMutation({
    mutationFn: (data: {
      donor_name: string;
      donor_email: string;
      list_id: string;
    }) =>
      createOrder(
        formData.donationAmount,
        data.donor_name,
        data.donor_email,
        data.list_id,
        token ?? ""
      ),
    onSuccess: (response) => {
      console.log("response data is", response);
      if (response.data) {
        console.log("navigate to payment success page");
        navigate(`/checkout`, { state: { ...response.data, listId: listId } });
      }
      // Pass backend response to the checkout page
    },
    onError: (error: any) => {
      handleError("create order", error);
    },
  });

  //to process to checkout page
  const handleCheckout = () => {
    const donor_name = nameRef.current?.value || "";
    const donor_email = emailRef.current?.value || "";

    //validate input first
    if (!validateEmail(donor_email)) {
      toast.error("Invalid email address");
      return;
    }
    if (!validateText(donor_name)) {
      toast.error("Invalid name");
      return;
    }
    if (!validateNumber(formData.donationAmount, 0.01)) {
      toast.error("Invalid amount");
      return;
    }

    if (listId) {
      //mutation
      createOrderMutation.mutate({
        donor_name,
        donor_email,
        list_id: listId,
      });
    } else {
      toast.error("Invalid list ID");
    }
  };
  return (
    <div className="container mx-auto p-6">
      {/* Thank You Note */}
      {/* <div className="bg-blue-100 text-blue-800 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-bold">A Note from the {ownerName}</h2>
        <p>{thankYouNote !== "" ? thankYouNote : "Thank you for the gift!"}</p>
      </div> */}

      {/* Loading Overlay */}
      {createOrderMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
          <span className="loading loading-spinner loading-lg text-white"></span>
          <p className="text-white mt-4 text-lg">
            Creating your order, please wait...
          </p>
        </div>
      )}
      {/* Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Donation Details */}
        <div className="space-y-6">
          {/* Name Input */}
          <div className="rounded-md shadow-sm gap-2 p-6">
            <small className="text-gray-600">
              {isAuthenticated
                ? "Your account name is pre-filled, but you can change it."
                : ""}{" "}
              This name will be used to label this donation to this wishlist
              owner.
            </small>
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                ref={nameRef}
                defaultValue={userData?.name || ""}
                placeholder="Enter your name"
                className="text-primary p-1"
              />
            </label>

            <small className="text-gray-600">
              {isAuthenticated
                ? "Your account email is pre-filled, but you can change it."
                : ""}{" "}
              This email will be used to send you a donation receipt.
            </small>
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="email"
                ref={emailRef}
                defaultValue={userData?.email || ""}
                placeholder="Enter your email"
                className="text-primary p-1"
              />
            </label>
          </div>

          {/* Select Amount */}
          <div className="flex flex-col rounded-md shadow-sm p-6">
            <label className="text-lg font-semibold mb-2">
              Select an amount
            </label>
            <DonationAmountInput
              onAmountChange={handleAmountChange}
              initialAmount={formData.donationAmount}
            />
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="space-y-6 mt-5">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold">
                Estimate Order Summary
              </h2>
              <div className="flex justify-between font-semibold">
                <span>Donation Amount:</span>
                <span> ${formData.donationAmount}</span>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>Estimate Platform Fee:</span>
                  <span> ${formData.platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimate Transaction Fee:</span>
                  <span> ${formData.paypalFee.toFixed(2)}</span>
                </div>
                <hr className="my-4" />

                <div className="flex justify-between font-bold">
                  <span>Estimate Total Amount:</span>
                  <span>CAD ${formData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              className="checkbox checkbox-primary"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Privacy Policy
              </a>
              ,{" "}
              <a
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Terms of Service
              </a>
              , and acknowledge that the donation is non-refundable.
            </label>
          </div>

          {/* Checkout Buttons */}
          {listId && (
            <button
              className="btn btn-primary w-full p-3"
              onClick={handleCheckout}
              disabled={!isAgreed || createOrderMutation.isPending}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DonationInputPage;
