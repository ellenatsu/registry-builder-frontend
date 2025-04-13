import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserStore } from "../../stores/userStore";
import { handleError } from "../../utils/errorUtils";
import { Donation } from "../../types/donation.type";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUserDonations,
  fetchUserPayouts,
  linkDonation,
} from "../../services/transactions.service";
import { transactionsPerPage } from "../../constants/constants";
import { Payout } from "../../types/payout.typs";
import { useAuthToken } from "../../hooks/useAuthToken";
import ConfirmModal from "../../components/modal/ConfrimModal";
import toast from "react-hot-toast";

type ListInfo = {
  id: string;
  name: string;
  creator_id: string;
};

// Define DonationWithList type with Donation fields and an additional list field
type DonationWithList = Donation & {
  list: ListInfo;
};

const TransactionsPage: React.FC = () => {
  const token = useAuthToken();
  const { userData } = useUserStore();
  const curUserId = userData?.id;
  const queryClient = useQueryClient();
  const [donateCurPage, setDonateCurPage] = useState<number>(1);
  const [payoutCurPage, setPayoutCurPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [linkDonationModalOpen, setLinkDonationModalOpen] =
    useState<boolean>(false);

  if (!token) {
    return null;
  }

  //react query fetch donations and payouts data
  const {
    data: donationRes,
    error: donationError,
    isPending: donationIsPending,
    isError: donationIsError,
  } = useQuery({
    queryKey: ["userDonations", donateCurPage, searchQuery],
    queryFn: () => fetchUserDonations(token, donateCurPage, searchQuery),
    staleTime: 600000, // Set stale time to 10 minutes for caching
  });

  const donations: DonationWithList[] = donationRes?.data ?? [];
  if (donationIsError) console.log("All donations", donationError);

  const {
    data: payoutRes,
    error: payoutError,
    isPending: payoutIsPending,
    isError: payoutIsError,
  } = useQuery({
    queryKey: ["userPayouts", payoutCurPage],
    queryFn: () => fetchUserPayouts(token, payoutCurPage),
    staleTime: 600000, // Set stale time to 10 minutes for caching
  });

  const payouts: Payout[] = payoutRes?.data ?? [];
  if (payoutIsError) console.log("All payouts", payoutError);

  //mutation to link donation manually
  const linkDonationMutation = useMutation({
    mutationFn: (donationId: string) => linkDonation(token, donationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userDonations", donateCurPage, searchQuery],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboardHome", token] });
      toast.success("Donation linked successfully!");
      setLinkDonationModalOpen(false);
    },
    onError: (error: any) => {
      handleError("linked donation", error);
    },
  });

  return (
    <div className="w-full p-3">
      <div className="w-full p-5 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">All Donations</h1>
        <div className="flex justify-between w-full ">
          <a
            className="link link-warning"
            onClick={() => setLinkDonationModalOpen(true)}
          >
            Can't find the donation you made? You can try to link it here!
          </a>
          <div className=" flex justify-end">
            <label className="input input-bordered input-md flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search donor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
          </div>
        </div>
        {/* for link donation */}
        <ConfirmModal
          isOpen={linkDonationModalOpen}
          type="link"
          name={""}
          onClose={() => setLinkDonationModalOpen(false)}
          onConfirm={(donationId) =>
            linkDonationMutation.mutate(donationId ?? "")
          }
          disable={linkDonationMutation.isPending}
        />

        {/* <span className="badge badge-md"> Note: You can check donations for one list in list detail page.</span> */}

        <div className="overflow-x-auto w-full flex items-center flex-col p-4">
          <table className="table table-md mt-5">
            <thead>
              <tr className="text-sm">
                <th>Date</th>
                <th>Type</th>
                <th>donor</th>
                <th>Amount</th>
                <th>Wishlist</th>
                <th>Status</th>
                <th>Donation ID</th>
              </tr>
            </thead>
            <tbody>
              {donationIsPending ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : donations && donations.length > 0 ? (
                donations.map((donation: DonationWithList) => (
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
                    <td>
                      {donation.registered_user_id === curUserId
                        ? "Made"
                        : "Received"}
                    </td>
                    <td>{donation.donor_name}</td>
                    <td>${donation.donation_amount}</td>
                    <td>
                      {donation.list_deleted ? (
                        "list deleted"
                      ) : (
                        <a className="link" href={`/wishlist/${donation.list_id}`}>
                          {donation.list?.name}
                        </a>
                      )}
                    </td>
                    <td>{donation.status}</td>
                    <td>{donation.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No completed donation found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="join mt-5">
            <button
              className="join-item btn btn-xs"
              onClick={() => setDonateCurPage((prev) => Math.max(prev - 1, 1))}
              disabled={donateCurPage === 1 || donationIsPending}
            >
              «
            </button>
            <button className="join-item btn btn-xs">
              Page {donateCurPage}
            </button>
            <button
              className="join-item btn btn-xs"
              onClick={() => setDonateCurPage((prev) => prev + 1)}
              disabled={
                donations.length < transactionsPerPage || donationIsPending
              }
            >
              »
            </button>
          </div>
        </div>
      </div>
      <div className="w-full p-5  mx-auto mt-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Received Withdrawal</h1>
        <div className="overflow-x-auto w-full flex items-center flex-col">
          <table className="p-4 table table-xs">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {payoutIsPending ? (
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
                    <td>${Number(payout.amount)}</td>
                    <td>{payout.status}</td>
                    <td>{payout.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No Withdrawal found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="join mt-5">
            <button
              className="join-item btn btn-xs"
              onClick={() => setPayoutCurPage((prev) => Math.max(prev - 1, 1))}
              disabled={payoutCurPage === 1 || payoutIsPending}
            >
              «
            </button>
            <button className="join-item btn btn-xs">
              Page {payoutCurPage}
            </button>
            <button
              className="join-item btn btn-xs"
              onClick={() => setPayoutCurPage((prev) => prev + 1)}
              disabled={payouts.length < transactionsPerPage || payoutIsPending}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
