/**
 * 
 * @param {string} key
 */
const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * 
 * @param {{string, any}}
 */
const setLocalStorage = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 
 * @param {string} key
 */
const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
}

/**
 * 
 * @param {string} key
 */
const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
}

/**
 * 
 * @param {{string, any}}
 */
const setSessionStorage = ({ key, value }) => {
  return sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 
 * @param {string} key
 */
const removeSessionStorage = (key) => {
  return sessionStorage.removeItem(key)
}

export { getLocalStorage, setLocalStorage, getSessionStorage, setSessionStorage, removeLocalStorage, removeSessionStorage }