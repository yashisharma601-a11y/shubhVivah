/**
 * ShubhVivah Centralized Validation Utilities
 * Strict validation rules for Names, Indian Mobile Numbers, and Email Addresses
 * Reusable across all frontend components and backend API route handlers.
 */

export const VALIDATION_MESSAGES = {
  NAME_INVALID: "Please enter a valid name.",
  PHONE_INVALID: "Please enter a valid 10-digit mobile number.",
  EMAIL_INVALID: "Please enter a valid email address.",
};

// 1. Name Validation
// - Required
// - Only alphabets and spaces
// - Min 2, max 50 chars
// - No numbers, special chars, or emojis
// - Not only spaces
export function validateName(name) {
  if (name === null || name === undefined) {
    return { isValid: false, error: VALIDATION_MESSAGES.NAME_INVALID, value: "" };
  }
  const trimmed = String(name).trim();
  if (!trimmed) {
    return { isValid: false, error: VALIDATION_MESSAGES.NAME_INVALID, value: "" };
  }
  // Matches letters (both English and accented) and single/multiple spaces, between 2 and 50 chars
  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: VALIDATION_MESSAGES.NAME_INVALID, value: trimmed };
  }
  return { isValid: true, error: "", value: trimmed };
}

// 2. Phone Number Validation
// - Required wherever applicable
// - Exactly 10 digits for Indian mobile numbers
// - First digit must be 6, 7, 8, or 9
// - No alphabets or special characters
// - Remove spaces/formatting automatically
export function validatePhone(phone) {
  if (phone === null || phone === undefined) {
    return { isValid: false, error: VALIDATION_MESSAGES.PHONE_INVALID, value: "" };
  }
  // Strip common prefixes (+91, 91, 0) if followed by 10 digits, or strip all non-digits
  let cleaned = String(phone).replace(/\s+/g, "").replace(/[-()]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(cleaned)) {
    return { isValid: false, error: VALIDATION_MESSAGES.PHONE_INVALID, value: cleaned };
  }
  return { isValid: true, error: "", value: cleaned };
}

// Helper for phone inputs: sanitizes user keystrokes to max 10 digits
export function sanitizePhoneInput(input) {
  if (!input) return "";
  const digitsOnly = String(input).replace(/\D/g, "");
  return digitsOnly.slice(0, 10);
}

// Helper for name inputs: prevents invalid characters if desired
export function sanitizeNameInput(input) {
  if (!input) return "";
  return String(input).replace(/[^A-Za-z\s]/g, "").slice(0, 50);
}

// 3. Email Validation
// - Required wherever applicable
// - Valid format, username, @, domain
// - No consecutive dots, valid domain extensions
// - Automatically trims and converts to lowercase
export function validateEmail(email) {
  if (email === null || email === undefined) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID, value: "" };
  }
  const trimmed = String(email).trim().toLowerCase();
  if (!trimmed) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID, value: "" };
  }

  // Check for consecutive dots
  if (trimmed.includes("..")) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID, value: trimmed };
  }

  // Standard robust email regex (RFC 5322 compatible subset)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID, value: trimmed };
  }

  // Ensure top-level domain has at least 2 characters
  const parts = trimmed.split(".");
  const tld = parts[parts.length - 1];
  if (!tld || tld.length < 2) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID, value: trimmed };
  }

  return { isValid: true, error: "", value: trimmed };
}
