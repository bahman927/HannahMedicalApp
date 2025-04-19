// src/utils/storageHelper.js

export const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadState = (key) => {
  const storedValue = localStorage.getItem(key);
  // console.log("authState in loadState = ", storedValue)
  return storedValue ? JSON.parse(storedValue) : null;
};

export const clearStorage = () => {
  
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("name");
};
