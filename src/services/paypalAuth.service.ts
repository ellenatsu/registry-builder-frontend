import axios from "axios";

const PAYPAL_AUTH_API_ENDPOINT = `${
  import.meta.env.VITE_BACKEND_SERVER_URL
}/api/paypal-auth`;

const initPaypalAuth = async (token: string) => {

  const response = await axios.post(`${PAYPAL_AUTH_API_ENDPOINT}/initiate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


const bindPaypalEmail = async (code: string, token: string) => {
    const response = await axios.post(`${PAYPAL_AUTH_API_ENDPOINT}/bind-paypal`, {code}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
}

export { initPaypalAuth, bindPaypalEmail };