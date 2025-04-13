import { useState, useRef } from "react";


import PublicListsComponent from "../../../components/container/PublicLists";

const CombinedBrowsePage = () => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const LIST_CATEGORIES = {
    WEDDING: 'wedding',
    HONEYMOON:'honeymoon',
    BABY: 'baby',
    EVENT: 'event',
  }

  const categoriesArr = LIST_CATEGORIES
    ? Object.entries(LIST_CATEGORIES).map(([key, value]) => ({
        key,
        value,
      }))
    : [];

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    if (dropdownRef.current) {
      dropdownRef.current.removeAttribute("open"); // Close the dropdown
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-200">
      {/* Categories Section */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Wishlists Check here
      </h2>
      <div className="sm:hidden relative mb-3 z-50">
        {" "}
        {/* Only show on mobile screens */}
        <details ref={dropdownRef} className="dropdown dropdown-bottom w-full">
           {/* Dropdown Trigger Button */}
        <summary className="btn btn-primary w-full">
          {selectedCategory ? selectedCategory : "Select Category"}
        </summary>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-2"
          >
            {/* "All" Option */}
            <li>
              <a
                onClick={() => handleCategoryClick(null)}
                className={!selectedCategory ? "active" : ""}
              >
                All
              </a>
            </li>

            {/* Other Categories */}
            {categoriesArr.map((category) => (
              <li key={category.key}>
                <a
                  onClick={() => handleCategoryClick(category.value)}
                  className={
                    selectedCategory === category.value ? "active" : ""
                  }
                >
                  {category.value}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
        <div
          className={`card border shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center h-16 p-4 rounded-lg text-center ${
            selectedCategory === null
              ? "bg-primary text-white" // Highlighted style for "All"
              : "bg-base-100 text-primary" // Default style
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          <h3 className="text-md font-semibold capitalize">All</h3>
        </div>
        {categoriesArr.map((category) => (
          <div
            key={category.key}
            className={`card border border-primary shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center h-16 p-4 rounded-lg text-cente ${
              selectedCategory === category.value
                ? "bg-primary text-white" // Highlighted style
                : "bg-base-100 text-primary" // Default style
            }`}
            onClick={() => handleCategoryClick(category.value as string)}
          >
            <h3 className="text-lg font-semibold capitalize">
              {category.value as string}
            </h3>
          </div>
        ))}
      </div>

      {/* Public Lists Section */}
      <PublicListsComponent category={selectedCategory} />
    </div>
  );
};

export default CombinedBrowsePage;
