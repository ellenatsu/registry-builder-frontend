import { create } from "zustand";
import { User } from "../types/user.type";
import { fetchUserProfile, updateUser } from "../services/user.service";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  userData: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isNewUser: boolean;
  preferredCategory: string | null;
  dest: string | null;
  setUserData: (data: User) => void;
  setToken: (token: string) => void;
  setIsNewUser: (isNewUser: boolean) => void;
  setPreferredCategory: (category: string) => void;
  setDest: (dest: string) => void;
  fetchUserData: () => Promise<void>;
  updateUser: (updatedData: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userData: null,
      isAuthenticated: false,
      isNewUser: false,
      token: null,
      preferredCategory: null,
      dest: null,

      // Set the user data in the global state
      setUserData: (data: User) => {
        set({ userData: data, isAuthenticated: true });
      },

      setToken: (token: string) => set({ token, isAuthenticated: !!token }),

      setIsNewUser: (isNewUser: boolean) => set({ isNewUser: isNewUser }),

      //set return to url and user preferred category
      setPreferredCategory: (category:string ) => set({ preferredCategory: category }),
      setDest: (dest:string) => set({ dest: dest }),

      // Fetch user data from the backend based on the Auth0 token
      fetchUserData: async () => {
        const token = get().token;
        if (!token) {
          console.error("Token retrieval failed");
          return;
        }
        try {
          const response = await fetchUserProfile(token);
          set({ userData: response.data, isAuthenticated: true, token });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },

      // Update user data in the backend
      updateUser: async (updatedData: any) => {
        const token = get().token;
        if (!token) {
          console.error("No token found");
          return;
        }
        try {
          const response = await updateUser(updatedData, token);
          set({ userData: response.data });
        } catch (error) {
          console.error("Error updating user:", error);
        }
      },
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => sessionStorage), // Secure session storage
    }
  )
);
