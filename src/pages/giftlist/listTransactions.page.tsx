import { getTransactionsByList } from "../../services/list.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Donation } from "../../types/donation.type";

import { Payout } from "../../types/payout.typs";
import { useAuthToken } from "../../hooks/useAuthToken";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";




const ListTransactionsPage: React.FC = () => {
  const { id: listId } = useParams();
  const token = useAuthToken();
  const [listName, setListName] = useState<string>('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  if (!token) {
    return null;
  }
  if (!listId) {
    toast.error(
      "Oops, error occurs, please check your link and try again later!"
    );
    return;
  }

  //react query fetch donations and payouts together data
  const { data: response, isPending } = useQuery({
    queryKey: ["donationsByList", token, listId],
    queryFn: () => getTransactionsByList(listId, token),
    staleTime: 600000, // Set stale time to 10 minutes for caching
  });

  //set list data
  useEffect(() => {
    if (response) {
      setListName(response.data.list.name);
      setDonations(response.data.donations);
      setPayouts(response.data.payouts);
    }
  }, [response]);



  return (
    <div className="w-full p-6">
      <div className="text-3xl w-full items-center font-bold p-4">All Donations and Withdrawal for {listName}</div>
      <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Received Withdrawal</h1>
        <div className="flex items-center flex-col">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : payouts && payouts.length > 0 ? (
                (payouts as Payout[]).map((payout: Payout) => (
                  <tr key={payout.id}>
                    <td>
                      {new Date(payout.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      ${Number(payout.amount) + Number(payout.platform_fee)}
                    </td>
                    <td>{payout.status}</td>
                    <td>{payout.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No withdrawal found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-6 max-w-4xl mt-10 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Donations</h1>
        
        {/* <span className="badge badge-md"> Note: You can check donations for one list in list detail page.</span> */}

        <div className="flex items-center flex-col">
          <table className="table table-md mt-5">
            <thead>
              <tr className="text-sm">
                <th>Date</th>
                <th>donor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Donation ID</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : donations && donations.length > 0 ? (
                donations.map((donation: Donation) => (
                  <tr key={donation.id}>
                    <td>
                      {new Date(donation.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td>{donation.donor_name}</td>
                    <td>${donation.donation_amount}</td>
                    <td>{donation.status}</td>
                    <td>{donation.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No completed donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default ListTransactionsPage;
