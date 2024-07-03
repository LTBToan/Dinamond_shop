export function generateId(length, prefix) {
  let result = prefix + '';
  const numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let counter = prefix.length;
  while (counter < length) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    counter += 1;
  }
  return result;
}

const generatedIds = new Set();

export function generateUniqueId(prefix, length) {
  if (prefix.length >= length) {
    throw new Error("Prefix length must be less than the total length.");
  }

  const maxNumber = Math.pow(10, length - prefix.length) - 1;
  const numbers = "0123456789";

  let result = "";
  let counter = 0;
  let unique = false;

  while (!unique) {
    result = prefix;
    for (let i = 0; i < length - prefix.length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    if (!generatedIds.has(result) && parseInt(result.slice(prefix.length)) <= maxNumber) {
      unique = true;
      generatedIds.add(result);
    }

    counter += 1;
    if (counter > maxNumber * 10) { // Prevent infinite loop
      throw new Error("Unable to generate a unique ID.");
    }
  }

  return result;
}

export function generatePassword(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?/";
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

export function generateCode(length) {
  let result = '';
  const characters = "0123456789";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}