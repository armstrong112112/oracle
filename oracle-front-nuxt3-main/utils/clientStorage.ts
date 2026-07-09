export const isClientSide = () => import.meta.client && typeof window !== "undefined";

export const getWindow = () => (isClientSide() ? window : null);

export const getDocument = () => (isClientSide() ? document : null);

export const getNavigator = () => (isClientSide() ? navigator : null);

export const getWindowLocation = () => getWindow()?.location ?? null;

export const getWindowLocationOrigin = () => getWindowLocation()?.origin ?? null;

export const getWindowLocationHref = () => getWindowLocation()?.href ?? null;

export const getLocalStorage = () => {
  if (!isClientSide()) {
    return null;
  }

  return window.localStorage;
};

export const getLocalStorageItem = (key: string): string | null => {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string): boolean => {
  const storage = getLocalStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
    return false;
  }
};

export const removeLocalStorageItem = (key: string): boolean => {
  const storage = getLocalStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

export const readLocalStorageJson = <T>(key: string, fallback: T | null = null): T | null => {
  const raw = getLocalStorageItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error parsing localStorage JSON for key "${key}":`, error);
    return fallback;
  }
};

export const writeLocalStorageJson = <T>(key: string, value: T): boolean => {
  try {
    return setLocalStorageItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error stringifying localStorage JSON for key "${key}":`, error);
    return false;
  }
};
