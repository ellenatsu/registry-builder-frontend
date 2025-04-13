import axios from "axios";
import { RawList } from "../types/list.type";
import { handleError } from "../utils/errorUtils";
import { publicListsPerPage } from "../constants/constants";
import { LocalItem } from "../types/item.type";

const API_LIST_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/lists`;

// Get all items with list
const getItemsByListId = async (listId: string, token: string) => {
  try {
    const response = await axios.get(`${API_LIST_URL}/${listId}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError("get all items for the list", error);
  }
};

const getListDetail = async (listId: string, token: string | null) => {

    if (token) {
      try {
        const response = await axios.get(`${API_LIST_URL}/${listId}/auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        handleError("get list data", error);
      }
    } else {
      try {
        const response = await axios.get(`${API_LIST_URL}/${listId}/public`);
        return response.data;
      } catch (error) {
        handleError("get list data", error);
      }
    }
};

const getTransactionsByList = async (listId: string, token: string) => {
  try {
    const response = await axios.get(`${API_LIST_URL}/${listId}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("get list's transactions data", error);
  }
};

//*************create, edit, delete list */
//new way to create list
const createListWithItems = async (
  name: string,
  target_amount: number,
  category: string,
  visibility: string,
  items: LocalItem[],
  token: string
) => {
  const requiredItems = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity_requested: item.quantity,
    picture: item.picture,
  }));

  try {
    const response = await axios.post(
      `${API_LIST_URL}/create-raw`,
      { name, target_amount, category, visibility, items: requiredItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError("create list", error);
  }
};
// Create a new list
const createList = async (listData: any, token: string) => {
  try {
    const response = await axios.post(`${API_LIST_URL}/create`, listData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError("create list", error);
  }
};

// Edit an existing list
const editList = async (
  listId: string,
  updatedData: RawList,
  itemIds: string[],
  token: string
) => {
  try {
    console.log("edit list", updatedData);
    const requstBody = {
      ...updatedData,
      item_ids: itemIds,
    };
    const response = await axios.put(
      `${API_LIST_URL}/${listId}/edit`,
      requstBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError("edit the list", error);
  }
};

//archive list
const toggleArchiveList = async (listId: string, token: string) => {
  try {
    const response = await axios.patch(
      `${API_LIST_URL}/${listId}/archive`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError("delete the list", error);
  }
};

// Delete a list
const deleteList = async (listId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_LIST_URL}/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError("delete the list", error);
  }
};

//****get public list categories, and lists and have query and pagination */

const getListDefaultData = async () => {
  const response = await axios.get(`${API_LIST_URL}/default-data`);
  return response.data;
  //data: {images: defaultImages, categories: LIST_CATEGORIES},
};
const getListCategories = async () => {
  const response = await axios.get(`${API_LIST_URL}/list-category`);
  return response.data;
  //data: LIST_CATEGORIES,
};

const getPublicLists = async (
  category: string,
  page: number,
  search?: string
) => {
    const response = await axios.get(`${API_LIST_URL}/public`, {
      params: { category, page, limit: publicListsPerPage, search },
    });
    return response.data;
};

export {
  getListDetail,
  getItemsByListId,
  getTransactionsByList,
  createListWithItems,
  createList,
  editList,
  toggleArchiveList,
  deleteList,
  getListDefaultData,
  getPublicLists,
  getListCategories,
};
