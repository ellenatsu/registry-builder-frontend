import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { usePaymentStatus } from '../../hooks/usePaymentStatus';
import { PAYMENT_STATUS } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface StripeResultModalProps {
  clientSecret: string;
  onClose: () => void;
}

const StripeResultModal: React.FC<StripeResultModalProps> = ({
  clientSecret,
  onClose,
}) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const [intentId, setIntentId] = useState<string>('');


  useEffect(() => {
    if (!stripe) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        toast.error('Failed to retrieve payment details.');
        return;
      }
      setIntentId(paymentIntent.id);
    });
  }, [stripe, clientSecret]);

  const { status: wsStatus, details } = usePaymentStatus(intentId);
  useEffect(() => {
    if (wsStatus === PAYMENT_STATUS.VERIFIED_DATABASE_UPDATED) {
      navigate('/donation-success', { state: { success: true, details } });
      onClose();
    } else if (wsStatus === PAYMENT_STATUS.VERIFIED_DATABASE_FAILED || wsStatus === PAYMENT_STATUS.VERIFIED_AMOUNT_MISMATCH) {
      navigate('/donation-success', { state: { success: false, details } });
      onClose();
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

export default StripeResultModal;
