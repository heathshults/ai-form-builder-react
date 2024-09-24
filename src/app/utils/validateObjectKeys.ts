// ==================== worker functions ==================== //
// Check if the keys of the target object match the source object.
const validateKeys = (obj, keys) => 
  Object.keys(obj).every(key => keys.includes(key));

// Check if all keys are present in the target object.
const allKeysArePresent = (obj, keys) => {
  const objKeys = Object.keys(obj);
  return keys.every(key => objKeys.includes(key));
};
// ==================== end worker functions ==================== //


// ==================== validator consumer functions ==================== //
export const keysMatch = (obj, keys) =>
  validateKeys(obj, keys) && allKeysArePresent(obj, keys);

// All keys in the target object are present in the source object.
export const objectKeysAreValid  = (obj, source) =>
  validateKeys(obj, Object.keys(source));

// All keys in the source object are present in the target object.
export const objectKeysArePresent  = (obj, source) =>
  allKeysArePresent(obj, Object.keys(source));

// Check if the keys of the target object match the source object.
export const objectKeysMatch  = (obj, source) =>
  objectKeysMatch (obj, Object.keys(source));
// ==================== end validator consumer functions ==================== //


/* how to use obj validation functions

  const target = { id: 1, name: 'apple', price: 1.2 };
  const source = { id: 1, name: 'apple', price: 1.2 };
 
  objectKeysAreValid (target, source); // true
  objectKeysAreValid (target, { ...source, quantity: 10 }); // true

  objectKeysArePresent (target, source); // true
  objectKeysArePresent (target, { ...source, quantity: 10 }); // false

  objectKeysMatch (target, source); // true
  objectKeysMatch (target, { ...source, quantity: 10 }); // false

*/

/* how to use obj validation functions with an array

  const obj = { id: 1, name: 'apple', price: 1.2 };
  const keys = ['id', 'name', 'price'];

  keysAreValid(obj, keys); // true
  keysAreValid(obj, [...keys, 'quantity']); // true

  allKeysArePresent(obj, keys); // true
  allKeysArePresent(obj, [...keys, 'quantity']); // false

  keysMatch(obj, keys); // true
  keysMatch(obj, [...keys, 'quantity']); // false
  
  */