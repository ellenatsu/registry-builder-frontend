import React, { useState } from "react";
import { Item } from "../../types/item.type";
import { IMAGE_PLACEHOLDER } from "../../constants/constants";
import { deleteItem } from "../../services/item.service";
import { useUserStore } from "../../stores/userStore";
import DeleteButton from "./../common/DeleteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";



interface ItemListContainerProps {
  items: Item[];
  onItemUpdate: (updatedItems: Item[]) => void; // Prop to update items in the parent
  isCreateMode: boolean; //true: create/edit list page, false: display page
  isOwner: boolean; //true: owner, can access edit/delete button
  displayNumber?: number; //number of items to display
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({
  items,
  onItemUpdate,
  isCreateMode = false,
  isOwner = false,
  displayNumber = 5,
}) => {
  const { token } = useUserStore();
  //preload cloundinary uploader
  
  //set 10 items to display first
  const [visibleItems, setVisibleItems] = useState<number>(displayNumber);

  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + displayNumber); // Load 10 more items each time
  };

  // Handle edit item
  const handleEditItem = (item: Item) => {
    console.log("Edit item", item);
  };

  // Handle delete item
  const handleDeleteSuccess = async (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    onItemUpdate(updatedItems); // Update the parent state with the new items
  };


 

  
  return (
    <div className="mb-6 md:p-4 w-full min-h-[20vh] flex flex-col">
      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <div className="divide-y divide-gray-200 w-full items-center gap-2">
          {items.slice(0, visibleItems).map((item, index) => (
            <div key={index} className="flex flex-row justify-between items-center py-4">
              {/* Item Image */}
              <div className="flex flex-row items-center justify-start gap-2">
                <img
                  src={item.picture || IMAGE_PLACEHOLDER}
                  alt="Product"
                  className="w-16 h-16 rounded"
                />
                {/* Item Details */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-800">Price: ${item.price}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Quantity: {item.quantity_requested}
              </p>

              <p className="text-lg font-semibold">
                ${item.price * item.quantity_requested}
              </p>

              {isOwner && isCreateMode && (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="btn btn-sm btn-outline"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  {token && (
                    <DeleteButton
                      id={item.id}
                      token={token}
                      type="item"
                      onDelete={deleteItem}
                      onSuccess={() => {
                        handleDeleteSuccess(item.id);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          {visibleItems < items.length && (
            <div className="flex justify-center p-3 mt-4">
              <button
                className="btn btn-outline btn-sm"
                onClick={loadMoreItems}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}




     
    </div>
  );
};

export default ItemListContainer;
