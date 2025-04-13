import toast from "react-hot-toast";
import { AxiosError } from "axios";

// export const toastMessages = {
//   authError: "Authentication required. Please log in.",
//   validationError: "Invalid input. Please check the form fields.",
//   serverError: "Something went wrong. Please try again later.",
//   notFound: "Requested resource not found.",
//   success: "Operation successful.",
// };


export const handleError = (context: string, error: unknown) => {
    console.log(`Error occurred during: ${context}`);
  
    if (error instanceof AxiosError) {
      const status = error.response?.status;
  
      // Check for response with success false
      if (error.response?.data?.success === false) {
        console.error(`Error in ${context}:`, error.response.data.message);
        toast.error(error.response.data.message || "Input validation failed.");
        return;
      }
  
      if (status) {
        // Auth error (Unauthorized or Forbidden)
        if (status === 401 || status === 403) {
          console.error(`Authentication Error in ${context}:`, error.response?.data.message);
          toast.error("Authentication failed. Please log in again or check your permissions.");
          return;
        }
  
        // Validation error (from express-validator)
        if (status === 400 && error.response?.data.errors) {
          console.error(`Validation Error in ${context}:`, error.response.data.errors);
          error.response.data.errors.forEach(
            (validationError: { msg: string; param: string }) => {
              toast.error(`${validationError.param}: ${validationError.msg}`);
            }
          );
          return;
        }
  
        // Resource not found shouldn't really toast...
        if (status === 404) {
          console.error(`${context} not found`);
          toast.error(`${context} not found`);
          return;
        }
  
        // Server or database error (500+)
        if (status >= 500) {
          console.error(`Server error in ${context}`);
          toast.error("Something went wrong. Please try again later or contact support.");
          return;
        }
      } else {
        // No status, likely a network error or unknown issue
        console.error(`Unknown error in ${context}: Network issue or other.`);
        toast.error("An unknown error occurred. Please check your network and try again later.");
      }
    } else {
      // Network error or unexpected case
      console.error(`Network error in ${context}`);
      toast.error("Network error. Please check your connection or try again later.");
    }
  };
  