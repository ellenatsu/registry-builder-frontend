import { useNavigate } from "react-router-dom";
import { getPublicLists } from "../../services/list.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  publicListsPerPage,
} from "../../constants/constants";
import { List } from "../../types/list.type";
import { handleError } from "../../utils/errorUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
interface PublicListsProps {
  category: string | null;
}

const PublicListsComponent = ({ category }: PublicListsProps) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: response,
    refetch,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["publicLists", category, currentPage],
    queryFn: () => getPublicLists(category || "", currentPage, searchQuery),
    staleTime: 600000,
  });

  const lists: List[] = response?.data || [];
  
  useEffect(() => {
    if (isError) {
      handleError("trying to get public lists", error);
    }
  }, [isError]);

  return (
    <div className="container mx-auto md:p-6 bg-base-200 ">
      {/* Search Bar */}
      <form
        className="flex justify-end mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
          refetch();
        }}
      >
        <div className=" flex justify-end">
          <label className="input input-bordered input-md flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search list name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </label>
        </div>
      </form>

      {/* List Display */}
      {isPending && (
        <span className="loading loading-spinner loading-lg text-primary mb-5 block text-center"></span>
      )}

      {lists.length === 0 ? (
        <div className="min-h-8 flex flex-col justify-center items-center">
          <p className="text-center text-gray-500">
            No lists found. Only Public lists would display here.
          </p>
        </div>
      ) : (
        <div>
          <div className="p-3 md:p-6 rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
            {Array.from({ length: publicListsPerPage }, (_, index) => {
              const list = lists[index]; // Use index for display slots

              return list ? (<div
                key={list.id}
                className="card bg-base-100 border border-primary shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer p-4 rounded-lg"
                onClick={() => navigate(`/wishlist/${list.id}`)}
              >
                {/* <figure className="h-[40vh]  overflow-hidden rounded-t-lg">
                  <img
                    src={list.cover_image && list.cover_image.trim() !== "" ? list.cover_image : IMAGE_PLACEHOLDER}
                    alt={list.name}
                    className="w-full h-full object-cover"
                  />
                </figure> */}
                <div className="card-body p-4 flex flex-col space-y-2">
                  <h3 className="card-title capitalize text-lg font-bold">{list.name}</h3>
                  <div className="">
                    <progress
                      className="progress bg-gray-400 progress-primary w-full"
                      value={Math.min((list.total_raised / list.target_amount) * 100, 100)}
                      max="100"
                    ></progress>
                    <p className="text-sm text-gray-600 mt-1">
                      ${list.total_raised} raised of ${list.target_amount}
                    </p>
                  </div>
                </div>
              </div>
              ) : (
                <div
                  key={`placeholder-${index}`}
                  className="card  p-4  flex flex-col items-center justify-center h-full w-full"
                ></div>
              );
            })}
          </div>

          <div className="flex justify-center mt-5">
            <div className="join">
              <button
                className="join-item btn btn-xs"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isPending}
              >
                «
              </button>
              <button className="join-item btn btn-xs">
                Page {currentPage}
              </button>
              <button
                className="join-item btn btn-xs"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={lists.length < publicListsPerPage || isPending}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PublicListsComponent;
