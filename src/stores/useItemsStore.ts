import { create } from "zustand";
import { LocalItem } from "../types/item.type";

interface ItemsState {
    items: LocalItem[];
    addItem: (newItem: LocalItem) => void;
    updateItem: (updated: LocalItem) => void;
    removeItem: (localId: string) => void;
    setItems: (items: LocalItem[]) => void;
  }
  
  export const useItemsStore = create<ItemsState>((set, get) => ({
    items: [],
    addItem: (newItem) => {
      const { items } = get();
      // If newItem has a sourceId, check for duplicates
      if (newItem.sourceId) {
        const duplicate = items.find(item => item.sourceId === newItem.sourceId);
        if (duplicate) {
          // Merge by incrementing quantity
          set({
            items: items.map(item =>
              item.sourceId === newItem.sourceId
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          });
          return;
        }
      }
      set({ items: [...items, newItem] });
    },
    updateItem: (updated) =>
      set((state) => ({
        items: state.items.map(item =>
          item.localId === updated.localId ? updated : item
        )
      })),
    removeItem: (localId) =>
      set((state) => ({
        items: state.items.filter(item => item.localId !== localId)
      })),
    setItems: (items) => set({ items }),
  }));