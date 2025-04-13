import axios from "axios";
import { handleError } from "../utils/errorUtils";

const API_USER_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/email`;
const sendContactUsEmail = async (email: string, subject: string, message: string ) => {
    try {
        const response = await axios.post(`${API_USER_URL}/contact-us`,{email, subject, message});
        return response.data;
      } catch (error) {
        handleError("send contact-us form", error);
      }
  };
  
  export { sendContactUsEmail };