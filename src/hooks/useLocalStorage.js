"use client";
import { useState, useEffect } from "react";

/**
 * Custom react hook to manage localStorage
 * @param {string} key localStorage key
 * @param {string} defaultValue default value of the key
 * @returns {[any,function]}
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const changeValue = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) {
      setValue(defaultValue);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    } else {
      setValue(JSON.parse(stored));
    }
  }, [defaultValue, key]);

  return [value, changeValue];
};
