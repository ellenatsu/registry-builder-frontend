export interface List {
    id: string;           // List ID
    creator_id: string;      // creator user ID (creator of the list)
    name: string;         // Name of the list
    target_amount: number; // Target amount for the list funding
    total_raised: number; //amount already raised(calculated field)
    description?: string; // Optional description of the list
    thank_you_message?: string; // Optional thank you message after funding
    category: string;
    visibility: string;
    cover_image: string;
    createdAt: Date;      // List creation date
    updatedAt: Date;      // List updated date
    archived: boolean;
    deleted: boolean;
  }

  export interface RawList {     
    name: string;
    target_amount: number;
    description?: string;
    thank_you_message?: string;
    category: string;
    visibility: string;
    cover_image: string;
  }
  

  //for template list
  export interface TemplateList {
    id: string;
    name: string;
    targetAmount: number;
    description: string;
    itemIds: string[];
  }