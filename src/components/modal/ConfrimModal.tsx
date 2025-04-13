import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { validateUUID } from "../../utils/validateUtils";

interface ConfirmModalProps {
  isOpen: boolean;
  type: "list" | "payout" | "link";
  name: string;
  onClose: () => void;
  onConfirm: (inputValue?: string) => void;
  disable: boolean;
  extraData?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  type,
  name,
  onConfirm,
  onClose,
  disable,
  extraData,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleConfirm = async () => {
    //some validation for link
    if (type === "link") {
      if (!validateUUID(inputValue)) {
        toast.error("please check donation ID again, it's not a valid ID!");
        return;
      }
    }
    try {
      onConfirm(inputValue);
    } catch (error) {
      toast.error("An error occurred, please try again later.");
    } finally {
      onClose();
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Confirm{" "}
              {type === "list"
                ? "Delete"
                : type === "payout"
                ? "Collect"
                : "Link"}
            </h3>
            <p className="py-4">
              {type === "list" ? (
                <div className="flex flex-col items-center p-2 gap-3 text-center">
                  <strong>
                    Are you sure you want to delete this wishlist:
                  </strong>
                  <div className="border-2 p-3 rounded-md shadow-sm w-full font-extrabold">
                    {name}
                  </div>
                  <div className="text-lg">
                    Delete this wishlist will make donations untrackable and
                    cause possibly problem to collect donations.
                  </div>
                  <div>
                    Please consider to use{" "}
                    <span className="text-red-800"> Archive </span> instead.
                  </div>
                </div>
              ) : type === "payout" ? (
                <div className="flex flex-col items-center p-2 gap-3 text-center">
                  <div>
                    Are you sure you want to withdraw all available amount{" "}
                    <p>$ {name} CAD</p> to this Paypal Email?
                  </div>
                  <div className="border-2 p-3 rounded-md shadow-sm w-full font-extrabold">
                    {extraData
                      ? extraData
                      : "No Valid Paypal Email detected, please link your Paypal first."}
                  </div>
                  <div className="text-lg">
                    The platform fee and PayPal processing fee are estimated at
                    1.5% and 2%, respectively. The final platform fee will be
                    confirmed on your email receipt. Please contact us if you
                    have any questions or concerns.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span>
                    please go to your email inbox, find donation ID at receipt
                    email we sent you.
                  </span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="enter donation ID"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              )}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className={`btn ${
                  type === "list" ? "btn-error" : "btn-primary"
                }`}
                onClick={handleConfirm}
                disabled={
                  disable ||
                  (type === "link" && !inputValue) ||
                  (type === "payout" && !extraData)
                }
              >
                Confirm{" "}
                {type === "list"
                  ? "Delete"
                  : type === "payout"
                  ? "Collect"
                  : "Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
