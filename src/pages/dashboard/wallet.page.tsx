import { handleError } from "../../utils/errorUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDynamicBalance,
  getWalletSummary,
  initMaunalPayout,
} from "../../services/payout.service";
import { CollectableMoney, Payout, reqListData } from "../../types/payout.typs";
import { useAuthToken } from "../../hooks/useAuthToken";
import { initPaypalAuth } from "../../services/paypalAuth.service";
import PayoutCollectForm from "../../components/form/PayoutCollectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type PayoutResult = {
  list_id: String;
  success: Boolean;
  message: String;
};
const ensureNumber = (value: any) => {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }

  const convertedValue = Number(value);
  return isNaN(convertedValue) ? 0 : convertedValue;
};

const WalletPage = () => {
  //for balance
  const [collectableMoneyArr, setCollectableMoneyArr] = useState<
    CollectableMoney[]
  >([]);
  const [collectableMoney, setCollectableMoney] = useState<number>(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthToken();

  if (!token) {
    return null;
  }

  //fetch payout summary data
  const {
    data: summaryRes,
    error: summaryErr,
    isPending: summaryIsPending,
    isError: summaryIsError,
  } = useQuery({
    queryKey: ["walletSummary", token],
    queryFn: () => getWalletSummary(token),
    staleTime: 60000, // Set stale time to 1 minutes for caching
  });

  if (summaryIsError) handleError("Fetching wallet summary", summaryErr);

  useEffect(() => {
    if (summaryRes?.data) {
      setCollectableMoneyArr(summaryRes.data.collectableMoneyArr || []);

      const totalCollectableAmount = summaryRes.data.collectableMoneyArr.reduce(
        (sum: number, list: CollectableMoney) => sum + list.collectableMoney,
        0
      );
      setCollectableMoney(totalCollectableAmount || 0);
    }
  }, [summaryRes]);
  //        collectableMoneyArr, recentPayouts,
  // {listId, listName,totalDonations,totalPayouts,collectableMoney,};
  const paypalEmail = summaryRes?.data.paypalEmail ?? "";
  const recentPayouts: Payout[] = summaryRes?.data.recentPayouts ?? [];

  // Mutation for PayPal auth initialization
  const initPaypalMutation = useMutation({
    mutationFn: (token: string) => initPaypalAuth(token),
    onMutate: () => {
      // Optional: Show a toast or loading indicator
      toast.loading("Initializing PayPal authorization...");
    },
    onSuccess: (response) => {
      toast.dismiss(); // Dismiss the loading toast
      if (response?.authUrl) {
        window.location.href = response.authUrl; // Redirect to PayPal auth
      } else {
        toast.error("Authorization URL not received.");
      }
    },
    onError: (error) => {
      toast.dismiss(); // Dismiss the loading toast
      console.log("init paypal auth", error);
      toast.error("Failed to initiate PayPal authorization. Please try again.");
    },
  });

  const handleLinkPaypal = async () => {
    if (!token) {
      toast.error("Token is missing. Please log in again.");
      return;
    }
    initPaypalMutation.mutate(token);
  };

  //manual payout
  const payoutMutation = useMutation({
    mutationFn: ({
      listData,
      token,
    }: {
      listData: reqListData[];
      token: string;
    }) => initMaunalPayout(listData, token),
    onSuccess: (response) => {
      console.log("Payout success response:", response.data);
      handlePayoutResponse(response.data);
      queryClient.invalidateQueries({ queryKey: ["walletSummary", token] });
    },
    onError: (error: any) => {
      console.error("request payout", error);
      toast.error("Payout failed. Please try again.");
    },
  });

  const handlePayoutResponse = (response: any) => {
    const results = response?.data || [];

    if (!Array.isArray(results) || results.length === 0) {
      toast.error("Unexpected response format. No payout results found.");
      return;
    }

    // Separate successful and failed lists
    const failedLists = results.filter(
      (result: PayoutResult) => !result.success
    );
    const successfulLists = results.filter(
      (result: PayoutResult) => result.success
    );

    // Generate user-friendly messages
    if (failedLists.length === 0) {
      toast.success("All lists processed. You will receive money very soon.");
    } else if (successfulLists.length > 0 && failedLists.length > 0) {
      const failedListIds = failedLists
        .map((item: PayoutResult) => item.list_id)
        .join(", ");
      toast.error(
        `Some lists processed successfully, but the following lists failed: ${failedListIds}. Please try again later or contact our support.`
      );
    } else {
      toast.error(
        "All payouts failed. Please try again later or contact our support."
      );
    }
  };

  const handleCollect = async (listData: reqListData[]) => {
    const payoutAmount: number = ensureNumber(collectableMoney);
    if (payoutAmount <= 0) {
      toast.error("There is no money to withdraw. Please try again.");
      return;
    }
    if (!paypalEmail) {
      toast.error("please link your paypal account first!");
      return;
    }

    payoutMutation.mutate({ listData, token });
    toast.success(
      "Your fund withdrawal request has been submitted. You will receive an email from us once the payout is sent."
    );
  };

  //results: [{list_id,list_name,donation_amount,payout_amount,collectable_amount}]
  const refreshMutation = useMutation({
    mutationFn: (token: string) => getDynamicBalance(token),
    onSuccess: (response) => {
      if (response?.data && Array.isArray(response.data)) {
       
          toast.success("Refreshed successfully!");
          // Update state with fresh data from mutation

          const transformedData = response.data.map((item: any) => ({
            listId: item.list_id,
            listName: item.list_name,
            totalDonations: item.donation_amount,
            totalPayouts: item.payout_amount,
            collectableMoney: item.collectable_amount,
          }));
          setCollectableMoneyArr(transformedData || []);
          setCollectableMoney(response.data.collectableMoney || 0);

          queryClient.invalidateQueries({ queryKey: ["walletSummary", token] });
        
      } else {
        console.error("Unexpected response format:", response);
        toast.error("Failed to refresh balance. Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("refresh balance", error);
      toast.error("Failed to refresh balance. Please try again.");
    },
  });
  const handleRefresh = async () => {
    //refresh to get dynamic calculation.
    refreshMutation.mutate(token);
  };

  return (
    <div className="p-4">
      {summaryIsPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold">
          Your Paypal Email used to receive fund
        </h3>
        <input
          className="input-md rounded-lg min-w-[500px] max-w-[800px] w-auto px-4 py-2 border border-gray-300 truncate"
          type="text"
          placeholder={paypalEmail || ""}
          disabled={true}
        />
        <div className="flex flex-row items-center gap-3 mt-4">
          <p className="text-sm text-gray-600">
            {paypalEmail
              ? "Update your PayPal account"
              : "Link your PayPal account"}
          </p>
          <button onClick={handleLinkPaypal} className="flex-shrink-0">
            <img
              className="h-10 w-auto"
              src="https://www.paypalobjects.com/devdoc/log-in-with-paypal-button.png"
              alt="PayPal login button"
            />
          </button>
        </div>
      </div>

      {/* Collectable Money Section */}

      <div className="bg-base-100 p-6 rounded-lg shadow-md ">
        {/* List Balances */}
        <h3 className="font-semibold text-xl mb-4">Withdraw Now</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold">Available Total Balance:</p>
          <p className="text-3xl text-success font-bold">${collectableMoney}</p>
          <div className="badge badge-primary badge-outline badge-md flex items-center gap-2 p-4">
            <p className="text-sm md:text-base">
              <span className="hidden md:inline">
                Amount doesn't seem right? Refresh
              </span>
            </p>
            <button onClick={handleRefresh} className="btn btn-sm btn-ghost">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
          </div>
        </div>
        <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Note:</h4>
          <p className="text-sm text-gray-700">
            A one-time withdrawal incurs a{" "}
            <span className="font-bold">1.5%</span> platform fee. If you withdraw fund at once when target is reached, it's{" "}  
            <span className="font-bold">free</span>. Please contact us if you think there is an issue with the balance.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">For your security:</span> We verify
            all withdraw requests with PayPal. Most withdrawals are processed
            within 2 business day. However, in rare cases where additional
            review is needed, this may take up to{" "}
            <span className="font-bold">3-5 business days</span>.
          </p>
        </div>

        {payoutMutation.isPending && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-white"></div>
              <span className="text-white text-lg font-medium">
                Processing withdraw requests, please wait...
              </span>
            </div>
          </div>
        )}

        <PayoutCollectForm
          paypalEmail={paypalEmail}
          collectableMoneyArr={collectableMoneyArr}
          handleCollect={handleCollect}
        />
      </div>

      {/* Recent Payouts Section */}
      <div className="mt-5 bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Recent Withdrawal</h3>
        <div className="flex items-center flex-col">
          <table className="table table-md mt-5">
            <thead>
              <tr className="text-sm">
                <th>Date</th>
                <th>Amount</th>
                <th>Wishlist</th>
                <th>Status</th>
                <th>Order ID</th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts && recentPayouts.length > 0 ? (
                recentPayouts.map((payout) => (
                  <tr key={payout.id}>
                    <td>{new Date(payout.updatedAt).toLocaleDateString()}</td>
                    <td>${Number(payout.amount)}</td>
                    <td>
                      <a href={`/wishlist/${payout.list_id}`}>View wishlist</a>
                    </td>
                    <td>{payout.status}</td>
                    <td>{payout.order_reference_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No completed withdrawal found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            className="btn btn-outline mt-5 mb-5"
            onClick={() => navigate("/dashboard/transaction")}
          >
            Check more withdrawal history
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
