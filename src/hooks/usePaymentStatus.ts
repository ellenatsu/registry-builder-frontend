import { useState, useEffect } from 'react';

// sendToClient(externalOrderId, {
//   type: 'payment_update',
//   status: PAYMENT_STATUS.VERIFIED_DATABASE_FAILED,
//   data: {
//     paymentId: externalOrderId,
//     listId: donation.list_id,
//     message: 'Database update failed.',
//   },
// });
interface PaymentDetails {
  paymentId: string;
  listId: string;
  message: string;
}

interface UsePaymentStatusResult {
  status: string;    //from PAYMENT_STATUS enum
  details: PaymentDetails | null;
}

export const usePaymentStatus = (paymentId: string): UsePaymentStatusResult => {
  const [status, setStatus] = useState<string>('loading');
  const [details, setDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    if (!paymentId) return;
  
    const connectWebSocket = () => {
      const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_WEBSOCKET_URL}`);
  
      ws.onopen = () => {
        console.log("Subscribing to WebSocket with Payment ID:", paymentId);
        ws.send(JSON.stringify({ type: 'subscribe_payment', paymentId }));
      };
  
      ws.onerror = () => {
        console.error('WebSocket connection failed. Retrying...');
        setTimeout(connectWebSocket, 2000); // Retry connection after delay
      };
  
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'payment_update') {
          // Check if the payment ID matches
          if (message.data.paymentId === paymentId) {
              setStatus(message.status); // Update status from the message
              setDetails(message.data); // Pass the entire `data` object as details
          }
      } else {
          console.warn('Unhandled message type:', message.type);
      }
      };
  
      return ws;
    };
  
    const ws = connectWebSocket();
    return () => ws.close();
  }, [paymentId]);
  

  return {
    status,
    details,
  };
};
