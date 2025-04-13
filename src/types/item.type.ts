//for display already in backend items
export interface Item {
  id: string; 
  list_id: string; 
  name: string;
  price: number; 
  quantity_requested: number; 
  description?: string; 
  picture?: string; 
  link?: string; 
}

//for manually add item (not in backend yet)
export interface RawItem {
  name: string;
  price: number;
  quantity_requested: number;
  description?: string;
  picture?: string;
  link?: string;
}

//for popular items, just to fetch and display
export interface PopularItem {
  id: string;
  name: string;
  price: number;
  picture: string;
  itemCategory: string[];
  displayFor: string[];
}

//to store popular items user picked 
export interface SelectedItem extends PopularItem {
  selectedQuantity: number;
}

//type for items in local shopping bag (for zustand, before upload)
export interface LocalItem {
  localId: string;      // Unique identifier generated on the client
  sourceId?: string;    // Original id from popular items, if applicable
  name: string;
  price: number;
  quantity: number;     // Quantity chosen by the user
  picture?: string;
}
