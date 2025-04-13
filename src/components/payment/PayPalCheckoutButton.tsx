import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import {
  capturePayPalOrder,
  payOrderWithPayPal,
} from "../../services/order.service";
import toast from "react-hot-toast";
import { paypalClientID } from "../../config/paypal";

const PayPalCheckoutButton = ({
  orderId,
  onSuccess,
}: {
  orderId: any;
  onSuccess: () => void;
}) => {
  //const [{ isPending }] = usePayPalScriptReducer();

  const createPaypalOrder = async () => {
    //call create order service
    try {
      const response = await payOrderWithPayPal(orderId); 
      return response.data.paypal_order_id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Capture order after payment approval
  const onApprove = async (data: { orderID: string }) => {
    try {
      const orderCompleted = await capturePayPalOrder(data.orderID); // Capture order via backend
      if (orderCompleted) onSuccess(); // Notify success, redirect to success page and notify user to check email receipt
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: `${paypalClientID}`,
          currency: "CAD",
          components: "buttons",
        }}
      >
       
        <PayPalButtons
          createOrder={createPaypalOrder} // Pass your custom createOrder function
          onApprove={onApprove} // Pass your custom onApprove function
          onCancel={() => {
            toast.error("Order cancelled!");
          }}
          onError={() => {
            console.error(
              "An error occurred, failed to process payment. Please retry later."
            );
          }}
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            disableMaxWidth: true,
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPalCheckoutButton;
