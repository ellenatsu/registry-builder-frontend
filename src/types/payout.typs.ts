export interface Payout {
    id: string; // UUID of the donation
    status: 'CREATED' | 'COMPLETED' | 'CANCELLED' | 'FAILED'; // Status as per ENUM
    payee_user_id: string;
    list_id: string; // Reference to the List 
    amount: number; 
    platform_fee: number;
    order_reference_id: string; // Reference to the Order model's ID
    user_deleted: boolean; // Whether the list was deleted
    createdAt: string; // Date when the donation was created
    updatedAt: string; // Date when the donation was last updated
}

export interface reqListData {
    list_id: string;
    coupon_id?: string;
  };

export interface CollectableMoney{
  listId: string;
  listName: string;
  totalDonations: number;
  totalPayouts: number;
  collectableMoney: number;
};