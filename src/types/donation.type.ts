export interface Donation {
    id: string; // UUID of the donation
    status: 'CREATED' | 'COMPLETED' | 'CANCELLED' | 'FAILED'; // Status as per ENUM
    donor_name: string; // Name of the donor
    donor_email: string; // Email of the donor
    registered_user_id?: string | null; // Nullable, present only if the user was authenticated
    list_id?: string | null; // The ID of the list the donation belongs to
    donation_amount: number; // Donation amount in decimal
    order_reference_id: string; // Reference to the Order model's ID
    list_deleted: boolean; // Whether the list was deleted
    createdAt: string; // Date when the donation was created
    updatedAt: string; // Date when the donation was last updated
}
  