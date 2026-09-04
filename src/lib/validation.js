export function validateEnquiry(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const phoneDigits = (data.phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!data.tripType) {
    errors.tripType = "Please select a trip type.";
  }

  if (!data.pickup || data.pickup.trim().length < 2) {
    errors.pickup = "Please enter a pickup location.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
