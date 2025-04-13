import React, { useState } from "react";
import { useItemsStore } from "../../stores/useItemsStore";
import { LocalItem } from "../../types/item.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ItemFormModal from "../modal/ItemFormModal";
import { useAuthToken } from "../../hooks/useAuthToken";

interface ReviewStepProps {
  onBack: () => void;
  onConfirm: (
    name: string,
    target_amount: number,
    visibility: string,
    items: LocalItem[],
    token: string
  ) => void;
}

const ReviewItems: React.FC<ReviewStepProps> = ({ onBack, onConfirm }) => {
  const items = useItemsStore((state) => state.items);
  const addItem = useItemsStore((state) => state.addItem);
  const updateItem = useItemsStore((state) => state.updateItem);
  const removeItem = useItemsStore((state) => state.removeItem);
  const token = useAuthToken();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // For registry details
  const [listName, setListName] = useState("");
  const [privacy, setPrivacy] = useState<"private" | "public">("private");


  // Control for opening the ItemFormModal for editing/adding items
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LocalItem | null>(null); // LocalItem type

  const handleEdit = (item: LocalItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleDelete = (localId: string) => {
    removeItem(localId);
  };

  const handleManualAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleItemFormSubmit = (updatedItem: LocalItem) => {
    if (editingItem && editingItem.localId) {
      // Editing an existing item
      updateItem(updatedItem);
    } else {
      addItem(updatedItem);
    }
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleListSubmit = () => {
    if (!token) return;
    //verify fields
    if (!listName) {
      return alert("Please enter the couple's name.");
    }
    if (items.length === 0) {
      return alert("Please add at least one item to the registry.");
    }
    //
    onConfirm(listName,total,privacy,items,token);
  };

  return (
    <div className="p-6">
      {/* Back Button near top */}
      <div className="flex justify-start mb-4">
        <button onClick={onBack} className="btn btn-link text-black">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        Review & Confirm Your Registry
      </h2>

      {/* List of Items */}
      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
          <p className="text-center text-gray-600">No items added yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.localId}
              className="flex flex-col md:flex-row items-center border rounded p-4 gap-4"
            >
              {/* Image Area */}
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                {item.picture ? (
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                )}
              </div>
              {/* Item Details */}
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm">
                  Price: ${Number(item.price || 0).toFixed(2)}
                </p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      const newQty = item.quantity - 1;
                      if (newQty < 1) {
                        removeItem(item.localId);
                      } else {
                        updateItem({ ...item, quantity: newQty });
                      }
                    }}
                    className="px-2 py-1 border rounded"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateItem({ ...item, quantity: item.quantity + 1 })
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-sm btn-outline"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.localId)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Manual Add Button */}
      <div className="flex justify-center mb-6">
        <button className="btn btn-outline" onClick={handleManualAdd}>
          Add Item Manually
        </button>
      </div>

      {/* Registry Details */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-1">Wishlist's Name</label>
        <input
          type="text"
          placeholder="Enter couple's name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="input input-bordered w-full"
        />
          <p className="text-sm text-gray-500 mt-1">
            You can name your registry with your name, for example, "John & Jane's Wedding Registry".  
          </p>
      
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-1">Registry Privacy</label>
        <div className="flex gap-4">
          <button
            onClick={() => setPrivacy("private")}
            className={`btn ${
              privacy === "private" ? "btn-primary" : "btn-outline"
            }`}
          >
            Private
          </button>
          <button
            onClick={() => setPrivacy("public")}
            className={`btn ${
              privacy === "public" ? "btn-primary" : "btn-outline"
            }`}
          >
            Public
          </button>
        </div>
      </div>

      {/* Summary Price */}
      <div className="mb-6 text-center">
        <p className="font-semibold">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-center">
        <button onClick={handleListSubmit} className="btn btn-primary">
          Confirm & Create Registry
        </button>
      </div>

      {/* Item Form Modal for manual add/edit */}
      {isModalOpen && (
        <ItemFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleItemFormSubmit}
          initialData={
            editingItem || {
              localId: "",
              name: "",
              price: 0,
              quantity: 1,
              picture: "",
            }
          }
        />
      )}
    </div>
  );
};

export default ReviewItems;
