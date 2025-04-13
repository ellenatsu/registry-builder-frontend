import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { fetchDashboardData } from "../../services/dashboard.service";
import { List } from "../../types/list.type";
import { Donation } from "../../types/donation.type";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Payout } from "../../types/payout.typs";
import { useAuthToken } from "../../hooks/useAuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const DashboardHomePage: React.FC = () => {
  const token = useAuthToken();
  const navigate = useNavigate();
  //timestamp
  const [refreshTime, setRefreshTime] = useState<string>("");
  //setup datas
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const [totalListCnt, setTotalListCnt] = useState<number>(0);
  const [recentLists, setRecentLists] = useState<List[]>([]);
  const [receivedDonations, setReceivedDonations] = useState<Donation[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [recentMadeDonations, setRecentMadeDonations] = useState<any[]>([]); //donation + list info

  const {
    data: response,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["dashboardHome", token], // Use an array as the query key
    queryFn: () => fetchDashboardData(token), // Pass the function, not its invocation
    enabled: !!token, // Ensure the query runs only if the token is available
    staleTime: 600000,
  });

  useEffect(() => {
    if (response !== undefined) {
      const {
        totalRaised,
        totalListCount,
        recentLists,
        recentReceivedDonations,
        recentPayouts,
        recentMadeDonations,
      } = response.data;
      setTotalRaised(totalRaised);
      setTotalListCnt(totalListCount);
      setRecentLists(recentLists);
      setReceivedDonations(recentReceivedDonations);
      setRecentMadeDonations(recentMadeDonations);
      setPayouts(recentPayouts);

      setRefreshTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }
  }, [response]);

  // Refresh handler
  const handleRefresh = async () => {
    const loadingToast = toast.loading("Refreshing data...");
    await refetch(); // Manually refetch data
    toast.dismiss(loadingToast);
    setRefreshTime(dayjs().format("YYYY-MM-DD HH:mm:ss")); // Update refresh time
  };

  // Redirect to auth if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  return (
    <div className="p-8 bg-gray-50">
      {isPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="badge badge-primary badge-outline badge-lg flex items-center gap-2 p-4">
          <p className="text-sm md:text-base">
            <span className="hidden md:inline">
              Data refreshed at {refreshTime}
            </span>
            <span className="md:hidden">Refreshed at {refreshTime}</span>
          </p>
          <button onClick={handleRefresh} className="btn btn-sm btn-ghost">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      </div>

      {/* Balance & Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-secondary p-6 rounded-xl shadow"
          onClick={() => navigate("/dashboard/wallet")}
        >
          <h2 className="text-base">Already Raised Fund</h2>
          <p className="text-4xl font-bold mt-2">${totalRaised}</p>
        </div>
        <div className=" p-6 rounded-xl shadow flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-base">Total wishlist created</h2>
            <p
              className="text-4xl font-bold mt-2"
              onClick={() => navigate("/dashboard/wishlist")}
            >
              {totalListCnt}
            </p>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h3 className="text-xl font-semibold mb-4">
          Recent Updates in wishlist
        </h3>
        <ul className="space-y-2">
          {recentLists && recentLists.length > 0 ? (
            recentLists.slice(0, 3).map((list: List) => (
              <li
                key={list.id}
                className="flex justify-between items-center p-2 border-b border-gray-300"
              >
                <div>
                  <p className="text-lg font-semibold text-primary">
                    {list.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(list.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  to={`/wishlist/${list.id}`}
                  className="text-sm text-pink-600 underline hover:text-pink-800"
                >
                  View Details
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No Lists made recently</p>
          )}
        </ul>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Payout Section */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4">Received Money</h3>
          <ul className="space-y-2">
            {payouts.length > 0 ? (
              payouts.map((payout, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-green-500">
                      {" "}
                      + ${Number(payout.amount)}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(payout.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 mt-4">
                No recent withdrawal available.
              </p>
            )}
          </ul>
        </div>

        {/* Donations Stats */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4">Received Donation</h3>
          <ul className="space-y-2">
            {receivedDonations && receivedDonations.length > 0 ? (
              receivedDonations.slice(0, 3).map((donation: Donation) => (
                <li
                  key={donation.id}
                  className="flex justify-between items-center text-netural mb-4"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      ${donation.donation_amount}
                      <span className="text-gray-800">
                        {" "}
                        from {donation.donor_name}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Donated on{" "}
                      {new Date(donation.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 mt-4">
                No donation received recently
              </p>
            )}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4">Made Donation</h3>
          <ul className="space-y-2">
            {recentMadeDonations && recentMadeDonations.length > 0 ? (
              recentMadeDonations.slice(0, 3).map((donation: Donation) => (
                <li
                  key={donation.id}
                  className="flex justify-between items-center text-netural mb-4"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      ${donation.donation_amount}
                      <span className="text-gray-800">
                        {" "}
                        from {donation.donor_name}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Donated on{" "}
                      {new Date(donation.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No donations made recently</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
