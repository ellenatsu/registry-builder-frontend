import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useItemsStore } from "../../stores/useItemsStore";

const ShoppingBag: React.FC = () => {
  const items = useItemsStore((state) => state.items);
  const updateItem = useItemsStore((state) => state.updateItem);
  const removeItem = useItemsStore((state) => state.removeItem);
  const [open, setOpen] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg z-50"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faShoppingBag} />
        {totalQuantity > 0 && <span className="ml-2">{totalQuantity}</span>}
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setOpen(false)}>
          <div className="relative w-80 bg-white p-4 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3 className="text-xl font-bold mb-4">Your Registry Bag</h3>
            <div className="mt-4">
              <p className="font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
            {items.length === 0 ? (
              <p>No items added.</p>
            ) : (
              <ul className="space-y-2">
                 {items.map((item) => (
                  <li key={item.localId} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      {/* Item Image (fallback if none) */}
                      <img
                        src={item.picture || "https://via.placeholder.com/60"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        {/* Name + Price */}
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold line-clamp-1">
                            {item.name}
                          </span>
                          <span className="text-sm">
                            ${Number(item.price || 0).toFixed(2)}
                          </span>
                        </div>

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

                          <span className="w-5 text-center">
                            {item.quantity}
                          </span>

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
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingBag;
