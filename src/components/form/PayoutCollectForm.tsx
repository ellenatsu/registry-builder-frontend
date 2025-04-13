import React, { useRef, useState } from "react";

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getCouponValidate } from "../../services/coupon.service";
import { validateCoupon } from "../../utils/validateUtils";
import { handleError } from "../../utils/errorUtils";
import { CollectableMoney, reqListData } from "../../types/payout.typs";
import ConfirmModal from "../modal/ConfrimModal";


type PayoutCollectFormProps = {
  paypalEmail: string;
  collectableMoneyArr: CollectableMoney[];
  handleCollect: (selectedLists: reqListData[]) => void;
};

const PayoutCollectForm: React.FC<PayoutCollectFormProps> = ({
  paypalEmail,
  collectableMoneyArr,
  handleCollect,
}) => {
  const [selectedLists, setSelectedLists] = useState<reqListData[]>([]);
  //use ref for coupon code
  const couponRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [collectAmount, setCollectAmount] = useState(0); 
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const toggleListSelection = (listId: string) => {
    setSelectedLists((prev) =>
      prev.some((item) => item.list_id === listId)
        ? prev.filter((item) => item.list_id !== listId)
        : [...prev, { list_id: listId }]
    );
  };

  const validateCouponMutation = useMutation({
    mutationFn: ({
      couponCode,
    }: {
      couponCode: string;
    }) => getCouponValidate(couponCode),
    onSuccess: (
      response: any,
      variables: { couponCode: string; listId: string }
    ) => {
      const { coupon_id, promotion_type } = response.data;

      // Apply coupon discount based on the type
      if (promotion_type === "WAIVE_FEE" || promotion_type === "FIXED_AMOUNT") {
        toast.success("Coupon applied successfully!");
        setSelectedLists((prev) =>
          prev.map((item) =>
            item.list_id === variables.listId ? { ...item, coupon_id } : item
          )
        );
      } else {
        toast.error("This coupon cannot apply here.");
      }
    },
    onError: (error: any) => {
      handleError("validate coupon", error);
    },
  });

  const handleVerifyCoupon = async (listId: string) => {
    const coupon = couponRefs.current[listId]?.value.trim();
    if (!coupon || !validateCoupon(coupon)) {
      alert("Please enter a valid coupon code.");
      return;
    }

    validateCouponMutation.mutate({ couponCode: coupon, listId });
  };

  const handleOpenConfirmModal = () => {
    //calculate total collectable money
    // Calculate total collectable money
  const total = collectableMoneyArr.reduce((sum, item) => {
    return selectedLists.some((selected) => selected.list_id === item.listId)
      ? sum + item.collectableMoney
      : sum;
  }, 0);

  setCollectAmount(total); // Store the calculated amount
  setConfirmModalOpen(true); // Open the modal
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-md">
      <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-200 text-left">Select</th>
            <th className="p-2 border border-gray-200 text-left">List Name</th>
            <th className="p-2 border border-gray-200 text-left">
              Collectable Money
            </th>
            <th className="p-2 border border-gray-200 text-left">
              Coupon  <div className="badge badge-sm badge-outline">1 per time, 3 max total</div>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {collectableMoneyArr.map((item) => (
            <tr key={item.listId} className="border-t border-gray-200">
              <td className="p-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => toggleListSelection(item.listId)}
                />
              </td>
              <td className="p-2">{item.listName}</td>
              <td className="p-2 text-green-600 font-bold">
                ${item.collectableMoney}
              </td>
              <td className="p-2">
                <input
                  ref={(el) => {couponRefs.current[item.listId] = el}}
                  type="text"
                  className="input input-bordered input-ghost input-sm mr-3"
                  placeholder="Enter Coupon"
                  disabled={
                    !selectedLists.some((list) => list.list_id === item.listId)
                  }
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm btn-outline"
                  onClick={() => handleVerifyCoupon(item.listId)}
                  disabled={
                    !selectedLists.some((list) => list.list_id === item.listId)
                  }
                >
                  Verify
                </button>
              </td>
  
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenConfirmModal}
          disabled={selectedLists.length === 0}
        >
          Collect
        </button>
      </div>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleCollect(selectedLists)}
        type="payout"
        name={collectAmount.toString()}
        disable={false}
        extraData={paypalEmail}
      />
    </div>
  );
};

export default PayoutCollectForm;
