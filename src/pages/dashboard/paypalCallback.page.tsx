import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";
import { bindPaypalEmail } from "../../services/paypalAuth.service";
import { handleError } from "../../utils/errorUtils";
import toast from "react-hot-toast";

const PayPalCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthToken();
  const code = searchParams.get("code");
  if (!code) {
    console.error("PayPal callback missing code parameter.");
    toast.error("Error authenticated with Paypal, please try again later.");
    navigate("/dashboard/wallet");
    return;
  }
  if (!token) {
    return;
  }

  // React Query mutation for delete operation
  const bindPaypalMutation = useMutation({
    mutationFn: (code:string) => bindPaypalEmail(code, token),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
            queryKey: ["walletSummary", token],
          });
        
      if (response.data.success) {
        toast.success("Paypal account linked successfully");
      } else {
        toast.error(response.data.message);
      }
      navigate("/dashboard/wallet");
    },
    onError: (error: any) => {
      handleError("Bind Paypal Email", error);
      navigate("/dashboard/wallet");
    },
  });

  useEffect(() => {
    const postCode = async () => {
      //post code
      bindPaypalMutation.mutate(code);
    };

    postCode();
  }, [searchParams, navigate]);

  return(
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
    <div className="flex flex-col items-center justify-center">
      {/* Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-primary mb-5"></span>
      {/* Loading Message */}
      <h2 className="text-2xl font-semibold text-primary mb-3">Verifying your account with Paypal...</h2>
      <p className="text-gray-600">Please wait a moment while we bind your paypal email.</p>
    </div>
  </div>
  )
};

export default PayPalCallback;
