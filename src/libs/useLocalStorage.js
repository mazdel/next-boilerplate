"use client";
import { useState, useEffect } from "react";
// import { useSyncExternalStore } from "react";

/**
 * Custom react hook to manage localStorage
 * @param {string} key localStorage key
 * @param {string} defaultValue default value of the key
 * @returns {[any,function]}
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const oldKey = key;
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === oldKey) {
      setValue(newValue);
    }
  };

  const changeValue = (value) => {
    setValue(value);
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) {
      setValue(defaultValue);
      localStorage.setItem(key, defaultValue);
    } else {
      setValue(stored);
    }
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, key]);

  return [value, changeValue];
};
