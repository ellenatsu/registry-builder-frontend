import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getListDetail, toggleArchiveList } from "../../services/list.service";
import { useUserStore } from "../../stores/userStore";
import { Item } from "../../types/item.type";
import { List } from "../../types/list.type";
import {
  IMAGE_PREVIEW_DEFAULT,
  LIST_CATEGORIES,
  LIST_VISIBILITY,
} from "../../constants/constants";
import { handleError } from "../../utils/errorUtils";
import ItemsListContainer from "../../components/container/ItemsListContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ShareListModal from "../../components/modal/ShareListModal";
import { Helmet } from "react-helmet-async";

const emptylist = {
  id: "",
  creator_id: "",
  name: "",
  target_amount: 0,
  total_raised: 0,
  description: "",
  thank_you_message: "",
  category: LIST_CATEGORIES.OTHER,
  visibility: LIST_VISIBILITY.PRIVATE,
  cover_image: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  archived: false,
  deleted: false,
};

const ListDetailPage: React.FC = () => {
  const { id: listId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<Item[]>([]);
  const [listData, setListData] = useState<List>(emptylist);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const [isDataReady, setIsDataReady] = useState(false);

  const { userData, token } = useUserStore();
  const curUserId = userData?.id;

  if (!listId) {
    toast.error(
      "Oops, error occurs, please check your link and try again later!"
    );
    return;
  }
  const { data: response, isPending } = useQuery({
    queryKey: ["listDetail", listId], // Use an array as the query key
    queryFn: () => getListDetail(listId, token), // Pass the function, not its invocation
    staleTime: 600000, // Set stale time to 10 minutes for caching
  });

  //set list data
  useEffect(() => {
    if (response) {

      setListData(response.data.list);
      setProgressPercentage(
        Math.round(((response.data.list?.total_raised ?? 0) / response.data.list?.target_amount) * 100 * 100) / 100
      );
      
      setItems(response.data.items);

      // Simulate layout adjustment for smoother rendering
      setTimeout(() => {
        setIsDataReady(true);
      }, 100); // Optional: Small delay to allow layout adjustments
    }
  }, [response]);


  //handle archive toggle
  const archiveMutation = useMutation({
    mutationFn: () => toggleArchiveList(listId, token ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDetail", listId] });
      queryClient.invalidateQueries({ queryKey: ["userLists", token] });
      navigate("/dashboard/wishlist");
    },
    onError: (error: any) => {
      handleError("archive list", error);
    },
  });

  const handleItemUpdate = (updatedItems: Item[]) => {
    setItems(updatedItems);
  };

  if (!isPending && (!listData || !listId))
    return <>Cannot find this list resource!</>;

  return !isDataReady ? (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="animate-pulse">
        {/* Skeleton layout for title */}
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>

        {/* Skeleton layout for items */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center gap-2 pb-8">
      {isPending && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {/* Dynamic SEO Metadata */}
      {!isPending && (
        <Helmet>
          <title>{listData.name} - FundMyWish</title>
          <meta name="description" content={listData.description} />
          
          {/* Open Graph (Facebook, LinkedIn) */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={listData.name} />
          <meta property="og:description" content={listData.description} />
          <meta property="og:url" content={`https://www.fundmywish.ca/wishlist/${listId}`} />
          <meta property="og:image" content={listData.cover_image || IMAGE_PREVIEW_DEFAULT} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={listData.name} />
          <meta name="twitter:description" content={listData.description} />
          <meta name="twitter:image" content={listData.cover_image || IMAGE_PREVIEW_DEFAULT} />
        </Helmet>
      )}
      {listData.cover_image && (
        <div className="w-full rounded">
          <img
            src={listData.cover_image}
            alt={listData.name || "Cover Image"}
            className="w-full h-80 object-cover "
          />
        </div>
      )}
      {/* Title, creator info, category and action buttons */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-3">
        <div className="md:col-span-2 md:p-4 p-2">
          <h1 className="text-6xl font-bold">{listData?.name}</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              {/* Category and Visibility */}
              <div className="flex items-center mt-2 gap-2">
                <div className="badge badge-primary">#{listData?.category}</div>
              </div>
            </div>

            {/* Show Edit and share buttons if the current user is the owner */}
            {curUserId === listData?.creator_id && listId && (
              <div className="flex gap-2 justify-center p-5">
                <button
                  className="btn btn-outline btn-info btn-sm"
                  onClick={() => toast.error("Sorry! Edit function is coming soon, right now unavailable!")}
                >
                  Edit
                </button>
                {token && (
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => archiveMutation.mutate()}
                  >
                    {listData?.archived ? "Unarchive" : "Archive"}
                  </button>
                )}
              </div>
            )}
          </div>


          {/* Main content: Description and Items */}
          <div className="mt-2 md:p-2 ">
            {/* Items Container */}
            <ItemsListContainer
              items={items}
              onItemUpdate={handleItemUpdate}
              isOwner={curUserId === listData?.creator_id}
              isCreateMode={false}
              displayNumber={5}
            />
          </div>

          <p className="text-neutral w-full text-center mt-10">
            Wishlist created at{" "}
            {new Date(listData?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Right Sidebar - Progress and Donation Actions */}
        <div className="md:fixed md:bottom-0 md:right-8 w-full md:w-[30%] p-4 bg-gradient-to-t from-gray-100 to-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex flex-col justify-between gap-6 h-full">
            {/* Radial Progress Indicator */}
            <div className="flex flex-col items-center gap-4">
              <div className="md:w-[200px] md:h-[200px] w-[150px] h-[150px]">
              <CircularProgressbarWithChildren value={progressPercentage}>
                <img
                  style={{ width: 40, marginTop: -5 }}
                  src="/images/icons/gift-icon.jpg"
                  alt="gift"
                />
                <div style={{ fontSize: 12, marginTop: -5 }}>
                  <strong>{progressPercentage}%</strong> Funded
                </div>
                </CircularProgressbarWithChildren>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  ${listData?.total_raised} raised
                </p>
                <p className="text-md text-gray-500">
                  ${listData?.target_amount} goal
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-3 mx-3">
              {/* Share Wishlist Button */}
              <ShareListModal
                listId={listId}
                className="btn btn-primary w-full"
              />

              {/* Donate Button */}
              {curUserId === listData?.creator_id ? (
                <div
                  className="btn btn-outline w-full"
                  onClick={() => navigate(`/dashboard/transaction/${listId}`)}
                >
                  Check Donations and Payouts
                </div>
              ) : (
                <div
                  className="btn btn-outline w-full"
                  onClick={() =>
                    navigate("/wishlist/make-donation", {
                      state: {
                        listId: listId,
                        thankYouNote: listData.thank_you_message,
                        ownerName: "wishlist owner",
                      },
                    })
                  }
                >
                  Donate Now
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetailPage;
