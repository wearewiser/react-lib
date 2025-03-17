"use client";
import { useState, useCallback } from "react";

export function useToggle(initial_value = false): [boolean, () => void] {
  const [value, setValue] = useState(initial_value);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [value, toggle];
}