import axios from "axios";
import { handleError } from "../utils/errorUtils";

const ORDER_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/orders`;

//TODO: fetch platform fixed rate here.

// Create an order
const createOrder = async (
  donation_amount:number, 
  donor_name:string, 
  donor_email: string, 
  listId: string, 
  token?:string, ) => {
  
  const requestData = {
    donation_amount, 
    donor_name, 
    donor_email, 
    listId,  
  };

  
  try {
    if(token !== undefined){
        //if user logged in call create-auth-order  /api/orders/paypal/create-guest-order
        const response = await axios.post(
            `${ORDER_API_ENDPOINT}/stripe/create-guest-order`, 
             requestData,
             {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        if(response.data.success) return response.data; // {order_id, order_data, client_secret}
    }else{
        //else: call create-guest-order
       const response = await axios.post(
        `${ORDER_API_ENDPOINT}/stripe/create-guest-order`, 
        requestData
      );
       if(response.data.success) return response.data;

    }
}catch(error){
    handleError('create stripe order', error);
}
}

//pay order with paypal
const payOrderWithPayPal = async (orderID: string) => {
  try {
    const response = await axios.post(
        `${ORDER_API_ENDPOINT}/paypal/pay-order`,
        { orderID },
    );
    return response.data; 
  } catch (error) {
    handleError("Error capturing PayPal order:", error);
    throw error;
  }
}

// Capture an order
const capturePayPalOrder = async (orderID: string) => {
  try {
    const response = await axios.post(
        `${ORDER_API_ENDPOINT}/paypal/capture-order`, 
        { orderID },
    );
    return response.data.success; //no detail returned.
  } catch (error) {
    handleError("Error capturing PayPal order:", error);
    throw error;
  }
};

export {
  createOrder,
  payOrderWithPayPal,
  capturePayPalOrder,
}
