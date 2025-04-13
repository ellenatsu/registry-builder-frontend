import validator from 'validator';

// Validate text (e.g., item name, description, thank you message.)
const validateText = (input: string): boolean => {
  return validator.matches(input, /^[a-zA-Z0-9\s.,'"!?\-()&]+$/);
};
  
 // Validate email using Validator.js
const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

// Validate number (e.g., quantity, price) using Validator.js
const validateNumber = (num: number, min: number, isInteger = false): boolean => {
  if (isInteger) {
    return validator.isInt(num.toString(), { min });
  }
  return validator.isFloat(num.toString(), { min });
};

// Validate URL (e.g., item link) using Validator.js
const validateURL = (url: string): boolean => {
  return validator.isURL(url);
};
  
//valid uuid
const validateUUID = (input: string): boolean => {
  return validator.isUUID(input, 4); // Validates as UUID version 4
};

const validateCoupon = (coupon: string): boolean => {
  return (
    validator.isLength(coupon, { min: 5, max: 20 }) &&
    /^[A-Z0-9-_]+$/i.test(coupon)
  );
};

export {
  validateEmail,
  validateNumber,
  validateText,
  validateURL,
  validateUUID,
  validateCoupon
}
  