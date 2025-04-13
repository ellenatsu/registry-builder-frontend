import axios from "axios";
import { RawItem } from "../types/item.type";
import { handleError } from "../utils/errorUtils";

const API_ITEM_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/items`;


// Create a new item
const createItem = async (itemData: RawItem,  token: string) => {
    try {
        const response = await axios.post(`${API_ITEM_URL}/create`, itemData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError("create the item",error);
    }

};

// Edit an item
const editItem = async (itemId: string, updatedData: any, token: string) => {
    try {
        const response = await axios.put(`${API_ITEM_URL}/${itemId}/edit`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError("edit the item",error);
    }
};

// Delete an item
const deleteItem = async (itemId: string, token: string) => {
    try {
        const response = await axios.delete(`${API_ITEM_URL}/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError("delete the item",error);
    }
};

//for popular items, fetch popular items
const getAllPopularItems = async () => {
    try {
        const response = await axios.get(`${API_ITEM_URL}/popular-items/all`);
        return response.data;  //field: popularItems
    } catch (error) {
        handleError("fetch popular items",error);
    }
}


export {
    createItem,
    editItem,
    deleteItem,
    getAllPopularItems
}