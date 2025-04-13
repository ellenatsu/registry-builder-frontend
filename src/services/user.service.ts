// src/services/userService.ts
import axios from "axios";
import { handleError } from "../utils/errorUtils";

const API_USER_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/user`;

//** profile related */
const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_USER_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError("fetch user data", error);
  }
};

const createUser = async (userData: any, token: string) => {
    const response = await axios.post(
      `${API_USER_URL}/sync-profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;

};

const updateUser = async (updatedData: any, token: string) => {
  try {
    const response = await axios.put(
      `${API_USER_URL}/update-profile`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError("update user", error);
  }
};

//temporarily not used

//** lists related */
const getUserLists = async (token: string) => {
  try {
    const response = await axios.get(`${API_USER_URL}/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError("get lists created by the user", error);
  }
};


export { fetchUserProfile, createUser, updateUser, getUserLists };
