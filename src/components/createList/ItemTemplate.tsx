import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useItemsStore } from "../../stores/useItemsStore";
import templatesData from "../../data/json/itemTemplates.json";
import { LocalItem, PopularItem } from "../../types/item.type";

// Define the Template type based on your JSON structure
export interface Template {
  id: string;
  name: string;
  targetAmount: number;
  description: string;
  itemIds: string[];
}

const ItemTemplate: React.FC<{
  displayFor: string;
  onNext: () => void;
  popularItems: PopularItem[];
}> = ({ displayFor, onNext, popularItems }) => {
  console.log(displayFor);
  const templateData =
    displayFor.toLocaleLowerCase() === "baby"
      ? templatesData.baby
      : templatesData.wedding;
  const {
    priceRanges,
    templatesByRange,
  }: {
    priceRanges: { label: string; value: string }[];
    templatesByRange: { [key: string]: Template[] };
  } = templateData;

  // Set default price range as the first one
  const defaultRange = priceRanges.length ? priceRanges[0].value : null;
  const [selectedRange, setSelectedRange] = useState<string | null>(
    defaultRange
  );
  const itemsStore = useItemsStore();

  //fetch all popular items for each template
  const fetchTemplateItems = (template: Template): PopularItem[] => {
    const itemIdArr = template.itemIds;
    const items = popularItems.filter((item) => itemIdArr.includes(item.id));
    return items;
  };

  // When user clicks "Use This Template"
  const handleUseTemplate = (
    templateItems: PopularItem[],
    templateName: string
  ) => {
    templateItems.forEach((item) => {
      itemsStore.addItem({
        localId: uuidv4(),
        name: item.name,
        price: item.price,
        quantity: 1,
        picture: item.picture,
      } as LocalItem);
    });
    toast.success(`Template "${templateName}" added to your shopping bag!`);
    onNext();
  };

  return (
    <div className="w-full p-6">
      {/* Skip Note */}
      <div className="bg-blue-100 border border-blue-300 text-blue-800 rounded p-3 text-center mb-4">
        Not feeling the template?{" "}
        <span
          onClick={() => onNext()}
          className="font-bold underline cursor-pointer hover:text-blue-900"
        >
          Skip to next step
        </span>
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">
        Choose a Registry Template
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Select a budget range to instantly load a curated set of gifts for your
        registry. You can edit or remove items afterward.
      </p>

      {/* Price Range Selection */}
      <div className="flex justify-center gap-4 mb-6">
        {priceRanges.map((range: { label: string; value: string }) => (
          <button
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
            className={`px-4 py-2 rounded-md border ${
              selectedRange === range.value
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {selectedRange && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templatesByRange[selectedRange]?.map((template: Template) => {
              const templateItems = fetchTemplateItems(template);
              return (
                <div
                  key={template.id}
                  className="border p-4 rounded-md hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Total Approx: ${template.targetAmount}
                    </h4>
                    <p className="text-base font-semibold mb-1">
                      {template.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {template.description}
                    </p>
                    <div className="border-t pt-2">
                      <p className="font-semibold text-sm mb-2">
                        Items Included:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templateItems.map((item) => (
                            <div key={item.id} className="flex flex-col items-center">
                            {/* Image */}
                            <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                              {item.picture ? (
                                <img
                                  src={item.picture}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                  No Image
                                </div>
                              )}
                            </div>
                      
                            {/* Optional: Name */}
                            <p className="mt-2 text-sm text-center line-clamp-1">{item.name}</p>
                    
                          </div>
                        ))}
                        </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() =>
                        handleUseTemplate(templateItems, template.name)
                      }
                      className="btn btn-outline"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTemplate;
