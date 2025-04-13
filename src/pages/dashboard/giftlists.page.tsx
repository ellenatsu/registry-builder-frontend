import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserLists } from "../../services/user.service";
import { List } from "../../types/list.type";
import { handleError } from "../../utils/errorUtils";
import { useAuthToken } from "../../hooks/useAuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const GiftListsPage: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();
  const token = useAuthToken();
  if (!token) {
    return;
  }

  const {
    data: response,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["userLists", token], // Use an array as the query key
    queryFn: () => getUserLists(token), // Pass the function, not its invocation
    staleTime: 600000, // Set stale time to 10 minutes for caching
  });

  useEffect(() => {
    if (response) {
      setLists(response.data);
    }
  }, [response]);

  useEffect(() => {
    if (isError) {
      handleError("get user's lists", error);
    }
  }, [isError]);

  //for archive
  // Filter lists based on the showArchived flag
  const filteredLists = showArchived
    ? lists
    : lists?.filter((list) => !list.archived);

  return (
    <div className="w-full p-6 ">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Your Wishlists
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/wishlist/create")}
            className="btn btn-primary flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Create new Wishlist
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? "Hide Archived Wishlists" : "Show Archived Wishlists"}
          </button>
        </div>
      </div>

      {isPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {!isPending && filteredLists.length === 0 ? (
        <p>No{showArchived ? " " : " active "}wishlists found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredLists &&
            filteredLists.map((list) => (
              <li
                key={list.id}
                className="p-4 bg-white shadow-md rounded-md flex justify-between"
              >
                <div
                  className={`flex flex-row w-full justify-between ${
                    list.archived ? "text-gray-500" : "text-black"
                  }`}
                >
                  <div className="">
                    <h3 className="text-xl font-bold">
                      {list.name}
                      <span>
                        {list.archived && (
                          <div className="badge badge-secondary badge-sm">
                            Archived
                          </div>
                        )}
                      </span>
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-green-800 font-semibold badge badge-lg">
                      Raised Amount ${list.total_raised}
                    </span>
                    {/* <span className="text-gray-800 font-semibold">
                      Target Amount: ${list.target_amount}
                    </span> */}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => navigate(`/wishlist/${list.id}`)}
                    >
                      View Wishlist detail
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        navigate(`/dashboard/transaction/${list.id}`)
                      }
                    >
                      View Wishlist transactions
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GiftListsPage;
