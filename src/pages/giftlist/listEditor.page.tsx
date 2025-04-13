import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ListForm from "../../components/form/ListForm";
import {
  createList,
  editList,
  getItemsByListId,
} from "../../services/list.service";
import toast from "react-hot-toast";
import { RawList } from "../../types/list.type";
import { Item, } from "../../types/item.type";
import { LIST_CATEGORIES, LIST_VISIBILITY } from "../../constants/constants";
import { validateText, validateURL } from "../../utils/validateUtils";
import { handleError } from "../../utils/errorUtils";
import { useAuthToken } from "../../hooks/useAuthToken";

import { Form } from "antd";


const emptylist = {
  name: "",
  target_amount: 0,
  description: "",
  thank_you_message: "",
  category: LIST_CATEGORIES.OTHER,
  visibility: LIST_VISIBILITY.PRIVATE,
  cover_image: "",
};

const ListEditorPage: React.FC = () => {
  //if it's edit mode there is a list id
  const { id: listId } = useParams();
  const token = useAuthToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  // State for List and Items
  const [newList, setNewList] = useState<RawList>(emptylist);
  const isEditing = listId ? true : false;
  const [items, setItems] = useState<Item[]>([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalRaisedAmount, setTotalRaisedAmount] = useState(0);



  //avoid re-renders on first render
  const firstRender = useRef(true);
  const [formInstance] = Form.useForm(); // ✅ Hooks should be called at the top level

  if (!token) {
    return <div>Loading...</div>;
  }

  // Update state with the computed values when needed
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const totalAmount = items.reduce(
      (acc, item) =>
        acc + parseFloat((item.price * item.quantity_requested).toFixed(2)),
      0
    );
    setTotalAmount(totalAmount);
  }, [items]);

  //edit mode to fetch list data
  const {
    data: response,
    error,
    isError,
  } = useQuery({
    queryKey: ["list", listId],
    queryFn: async () =>
      listId ? getItemsByListId(listId, token) : { data: {} },
    staleTime: 60000,
    enabled: true, // ✅ Always enabled to maintain hook order
  });

  useEffect(() => {
    if (response?.data) {
      setNewList({
        name: response.data.name || "",
        target_amount: response.data.target_amount || 0,
        description: response.data.description || "",
        thank_you_message: response.data.thank_you_message || "",
        category: response.data.category || LIST_CATEGORIES.OTHER,
        visibility: response.data.visibility || LIST_VISIBILITY.PRIVATE,
        cover_image: response.data.cover_image || "",
      });
      setItems(response.data.items || []);
      setTotalRaisedAmount(response.data.total_raised || 0);
    }
  }, [response]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      handleError("get list and items", error);
    }
  }, [isError]);


  //mutation to create and edit
  const createListMutation = useMutation({
    mutationFn: ({ listData, token }: { listData: any; token: string }) =>
      createList(listData, token),
    onSuccess: (response) => {
      // Invalidate user’s lists
      queryClient.invalidateQueries({ queryKey: ["userLists", token] });
      //toast and navigate
      toast.success("List created successfully!");
      navigate(`/wishlist/create-success/${response.data.id}`);
    },
    onError: (error: any) => {
      handleError("create list", error);
    },
  });

  // Mutation for editing a list
  const editListMutation = useMutation({
    mutationFn: ({
      listId,
      updatedData,
      itemIds,
      token,
    }: {
      listId: string;
      updatedData: RawList;
      itemIds: string[];
      token: string;
    }) => editList(listId, updatedData, itemIds, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLists", token] });
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["listDetail", listId] });
      toast.success("List updated successfully!");
      navigate(`/wishlist/${listId}`);
    },
    onError: (error: any) => {
      handleError("edit list", error);
    },
  });



  //create or edit list
  const handleSubmitList = async () => {
    try {
      await formInstance.validateFields();
    } catch (err) {
      return;
    }
    //validation check
    if (!validateText(newList.name)) {
      toast.error("Invalid list name");
      return;
    }
    if (newList.description && !validateText(newList.description)) {
      toast.error("Invalid list description");
      return;
    }
    if (newList.thank_you_message && !validateText(newList.thank_you_message)) {
      toast.error("Invalid thank you message");
      return;
    }
    if (newList.cover_image && !validateURL(newList.cover_image)) {
      toast.error("Invalid cover image");
      return;
    }

    if (totalAmount === 0 || items.length === 0) {
      toast.error("You must add items to the list before creating it.");
      return;
    }

    newList.target_amount = totalAmount;
    const itemIds = items.map((item) => item.id); // Collect the item IDs

    //edit list
    if (isEditing && listId) {
      editListMutation.mutate({ listId, updatedData: newList, itemIds, token });
    } else {
      //Create list
      const listData = {
        ...newList,
        item_ids: itemIds,
      };
      createListMutation.mutate({ listData, token });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="w-full text-center font-bold text-3xl">
        {listId ? "Edit" : "Create"} Registry
      </h2>

      <div className="mt-4">
        <ListForm initialData={newList} />
        {/* <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Add items
          </h2>
          
          <ItemsListContainer
            items={items}
            onItemUpdate={listId ? handleItemUpdate : setItems}
            isOwner={true}
            isCreateMode={true}
            displayNumber={100}
          />
        </div> */}

        <div className="p-6 w-full max-w-2xl mx-auto">
          {/* Money Summary */}
          <div className="mb-6 py-3">
            <p>
              <strong>Target Amount:</strong> ${totalAmount.toFixed(2)}
            </p>
            {listId && <p>Already Rasised: {totalRaisedAmount}</p>}
          </div>

          {/* Confirm Button */}
          <div className="text-center">
            <div
              className=" btn btn-outline btn-wide"
              onClick={handleSubmitList}
            >
              Confirm
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ListEditorPage;
