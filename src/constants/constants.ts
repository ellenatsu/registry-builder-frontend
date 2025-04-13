//default ENUM
const DONATION_STATUS = {
  CREATED: "CREATED",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
};
const PAYOUT_STATUS = {
  CREATED: "CREATED",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
};

const PAYMENT_PROCESSOR = {
  PAYPAL: 'PAYPAL',
  STRIPE: 'STRIPE',
};

const enum PaymentMethod {
  PAYPAL = 'PAYPAL', // PayPal-hosted payments
  PAYPAL_CARD = 'PAYPAL_CARD', // Card payment via PayPal
  APPLE_PAY = 'APPLE_PAY', // Stripe-hosted Apple Pay
  GOOGLE_PAY = 'GOOGLE_PAY', // Stripe-hosted Google Pay
  ALIPAY = 'ALIPAY', // Stripe-hosted Alipay
  WECHAT_PAY = 'WECHAT_PAY', // Stripe-hosted WeChat Pay
  CANADA_PREDEBIT = 'CANADA_PREDEBIT', // Stripe-hosted Canadian Pre-debit Pay
}

//for websocket message for stripe 
const enum PAYMENT_STATUS {
  VERIFIED_DATABASE_UPDATED = 'verified_database_updated',
  VERIFIED_DATABASE_FAILED = 'verified_database_failed',
  VERIFIED_AMOUNT_MISMATCH = 'verified_amount_mismatch',
}

//for list category and visibility
const LIST_CATEGORIES = {
  WEDDING: 'wedding',
  HONEYMOON:'honeymoon',
  BABYREGISTRY: 'babyregistry',
  BIRTHDAY: 'birthday',
  HOLIDAY: 'holiday',
  ANNIVERSARY: 'anniversary', 
  OTHER: 'other',
}

const LIST_VISIBILITY = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}
//map for list category
const LIST_CATEGORY_OPTIONS = [
  { value: LIST_CATEGORIES.WEDDING, label: "Wedding" },
  { value: LIST_CATEGORIES.HONEYMOON, label: "Honeymoon" },
  { value: LIST_CATEGORIES.BABYREGISTRY, label: "Baby Registry" },
  { value: LIST_CATEGORIES.ANNIVERSARY, label: "Anniversary" },
  { value: LIST_CATEGORIES.BIRTHDAY, label: "Birthday" },
  { value: LIST_CATEGORIES.HOLIDAY, label: "Holiday" },
  { value: LIST_CATEGORIES.OTHER, label: "Other" },
];

//const categories for popular items category:
const POPULAR_ITEM_CATEGORY_WEDDING = ["homeKitchen", "garden", "electronics", "books", "personalCare", "toyGame", "personalizedGift", "homeDecor", "travel"];
const POPULAR_ITEM_CATEGORY_BABY = ["personalizedGift", "dailyCare", "furnitureGear", "toyBook", "clothing"];

const POPULAR_ITEM_CATEGORY_OPTIONS_WEDDING = [
  { value: "homeKitchen", label: "Home Kitchen" },
  { value: "garden", label: "Garden" },
  { value: "electronics", label: "Electronics" },
  { value: "books", label: "Books" },
  { value: "personalCare", label: "Personal Care" },
  { value: "toyGame", label: "Toy/Game" },
  { value: "personalizedGift", label: "Personalized Gift" },
  { value: "homeDecor", label: "Home Decor" },
  { value: "travel", label: "Travel" }
];

const POPULAR_ITEM_CATEGORY_OPTIONS_BABY = [
  { value: "personalizedGift", label: "Personalized Gift" },
  { value: "dailyCare", label: "Daily Care" },
  { value: "furnitureGear", label: "Furniture/Gear" },
  { value: "toyBook", label: "Toy/Book" },
  { value: "clothing", label: "Clothing" }
];

//default numbers
const transactionsPerPage = 10;
const publicListsPerPage = 12;

const TAX_RATES = {
  Alberta: 0.05,              // GST only
  BritishColumbia: 0.12,      // GST + PST
  Manitoba: 0.12,             // GST + PST
  NewBrunswick: 0.15,         // HST
  NewfoundlandAndLabrador: 0.15, // HST
  NorthwestTerritories: 0.05, // GST only
  NovaScotia: 0.15,           // HST
  Nunavut: 0.05,              // GST only
  Ontario: 0.13,              // HST
  PrinceEdwardIsland: 0.15,   // HST
  Quebec: 0.15,               // GST + QST (rounded)
  Saskatchewan: 0.11,         // GST + PST
  Yukon: 0.05                 // GST only
};


//number for fee
const PAYPAL_FEE_RATE = 0.029; // PayPal rate of 2.9%
const PAYPAL_FIXED_FEE = 0.3;  // Fixed PayPal fee in CAD
const PLATFORM_FIXED_RATE = 0.016; //can change later



//URLs for placeholder
const IMAGE_PLACEHOLDER =
  "https://res.cloudinary.com/drnmh0rkc/image/upload/image-holder/qzlfmcv0c3e4w9lrdswz";
const IMAGE_PREVIEW_DEFAULT = "https://res.cloudinary.com/drnmh0rkc/image/upload/v1738785760/image-holder/qphrkcjxyx4wtgqkbt0x.png";
const AVATAR_PLACEHOLDER =
  "https://res.cloudinary.com/drnmh0rkc/image/upload/v1729535669/image-holder/kngtydiqzlkthqgfaniy";


const OFFICIAL_INSTA_URL = "https://www.instagram.com/fundmywish/";
const OFFICIAL_FB_URL = "https://www.facebook.com/share/1BNW7fHmc1/?mibextid=wwXIfr";

export {
  DONATION_STATUS,
  PAYOUT_STATUS,
  PAYMENT_PROCESSOR,
  PaymentMethod,
  PAYMENT_STATUS,
  transactionsPerPage,
  publicListsPerPage,
  LIST_CATEGORIES,
  LIST_VISIBILITY,
  LIST_CATEGORY_OPTIONS,
  POPULAR_ITEM_CATEGORY_WEDDING,
  POPULAR_ITEM_CATEGORY_BABY,
  POPULAR_ITEM_CATEGORY_OPTIONS_WEDDING,
  POPULAR_ITEM_CATEGORY_OPTIONS_BABY,
  TAX_RATES,
  PAYPAL_FEE_RATE,
  PAYPAL_FIXED_FEE,
  PLATFORM_FIXED_RATE,
  IMAGE_PLACEHOLDER,
  IMAGE_PREVIEW_DEFAULT,
  AVATAR_PLACEHOLDER,
  OFFICIAL_INSTA_URL,
  OFFICIAL_FB_URL
};