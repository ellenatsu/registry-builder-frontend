import React, { useState } from "react";

interface DonationAmountInputProps {
  onAmountChange: (amount: number) => void;
  initialAmount?: number;
}

const DonationAmountInput: React.FC<DonationAmountInputProps> = ({
  onAmountChange,
  initialAmount = 50,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    initialAmount
  );
  const [customAmount, setCustomAmount] = useState<string>("");

  // Preset amounts to choose from
  const presetAmounts = [15, 30, 50, 70, 80, 100, 150];

  // Handle selecting a preset amount
  const handleSelectAmount = (amount: number | null) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom input when a predefined amount is selected
    onAmountChange(amount || 0);
  };
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCustomAmount(value);

    // Parse and send a valid number or default to 0
    const numericValue = parseFloat(value);
    onAmountChange(isNaN(numericValue) ? 0 : numericValue);
    setSelectedAmount(null); // Deselect predefined buttons when entering custom amount
  };

  return (
    <div className="flex flex-col gap-1 mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {presetAmounts.map((presetAmount) => (
          <button
            key={presetAmount}
            className={`btn ${
              selectedAmount === presetAmount ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSelectAmount(presetAmount)}
          >
            ${presetAmount}
          </button>
        ))}
        {/* "Other" Button */}
        <button
          className={`btn ${
            selectedAmount === null && customAmount !== "" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleSelectAmount(null)}
        >
          Other
        </button>
      </div>

      {selectedAmount === null && (
        <div className="form-control pt-1">
          <label className="label">Enter a custom amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="input input-bordered"
            value={customAmount}
            onChange={handleCustomAmountChange}
          />
        </div>
      )}
    </div>
  );
};

export default DonationAmountInput;
