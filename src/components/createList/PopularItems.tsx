import React, { useState, useMemo } from "react";
import { PopularItem, SelectedItem } from "../../types/item.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { useItemsStore } from "../../stores/useItemsStore";
import { POPULAR_ITEM_CATEGORY_BABY, POPULAR_ITEM_CATEGORY_OPTIONS_BABY, POPULAR_ITEM_CATEGORY_OPTIONS_WEDDING, POPULAR_ITEM_CATEGORY_WEDDING } from "../../constants/constants";

interface PopularItemsProps {
  displayFor: string;
  popularItems: PopularItem[];
  onNext: () => void;
  onBack: () => void;
}

const PopularItems: React.FC<PopularItemsProps> = ({
  displayFor,
  popularItems,
  onNext,
  onBack,
}) => {
  const categories = displayFor === 'baby' ? POPULAR_ITEM_CATEGORY_BABY : POPULAR_ITEM_CATEGORY_WEDDING;
  const categoryLabelOptions = displayFor === 'baby' ? POPULAR_ITEM_CATEGORY_OPTIONS_BABY : POPULAR_ITEM_CATEGORY_OPTIONS_WEDDING;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Local state for selected items in this component (for visual feedback)
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // Global store for shopping bag updates (you can decide to use one or both)
  const addItem = useItemsStore((state) => state.addItem);

  // Filter and sort items based on search query, category, and sort order
  const filteredItems = useMemo(() => {
    let items = popularItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" ||
        item.itemCategory
          .map((cat) => cat.toLowerCase())
          .includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
    items.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    return items;
  }, [popularItems, searchQuery, activeCategory, sortOrder]);

  const toggleSelectItem = (item: PopularItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((selected) => selected.id === item.id);
      if (existing) {
        return prev.filter((selected) => selected.id !== item.id);
      } else {
        const newItem: SelectedItem = { ...item, selectedQuantity: 1 };
        return [...prev, newItem];
      }
    });
    // Also add to global store (this example simply adds without duplicate-checking,
    // but your store already handles merging by sourceId).
    const newLocalItem = {
      localId: uuidv4(),
      sourceId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      picture: item.picture,
    };
    addItem(newLocalItem);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start mb-4">
        <button onClick={onBack} className="btn btn-link text-black">
          <FontAwesomeIcon icon={faArrowLeft} />Back
        </button>
      </div>
      {/* Skip Note */}
      <div className="bg-blue-100 border border-blue-300 text-blue-800 rounded p-3 text-center mb-4">
        Already got everything?{" "}
        <span
          onClick={() => onNext()}
          className="font-bold underline cursor-pointer hover:text-blue-900"
        >
          Go to review
        </span>
      </div>

      <h2 className="text-xl font-bold mb-4">Browse Popular Gifts</h2>
      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        />
        <div className="flex items-center gap-2">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryLabelOptions.find((opt) => opt.value === category)?.label}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isSelected = selectedItems.some(
            (selected) => selected.id === item.id
          );
          return (
            <div
              key={item.id}
              className={`relative border rounded hover:shadow-lg overflow-hidden
                          flex flex-col w-full h-80 p-2 
                          ${isSelected ? "border-green-500" : ""}`}
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center mb-2">
                {item.picture ? (
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
        
              {/* Name (allow 2 lines, then truncate) */}
              <h3 className="text-sm font-semibold line-clamp-2 overflow-ellipsis overflow-hidden mb-1">
                {item.name}
              </h3>
        
              {/* Spacer to push price/button to bottom */}
              <div className="flex-1" />
        
              {/* Price & Button pinned at bottom */}
              <div className="flex px-5 items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                  ${Number(item.price || 0).toFixed(2)}
                </span>
                <button
                  onClick={() => toggleSelectItem(item)}
                  className="bg-white border border-gray-300 rounded-full p-1 flex items-center gap-1"
                >
                  {isSelected ? (
                    <>
                      <span className="text-green-500">Added</span>
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                    </>
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-blue-500" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full justify-center flex mt-8">
        <div className="btn btn-outline" onClick={onNext}>
          Next
        </div>
      </div>
    </div>
  );
};

export default PopularItems;
