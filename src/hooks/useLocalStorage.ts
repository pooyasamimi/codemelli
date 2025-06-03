import { useCallback } from "react";

interface LocalStorageOut {
  saveToLocalStorage: (code: string) => void;
  getCopiedCodes: () => string[];
}

const useLocalStorage = (): LocalStorageOut => {
  const saveToLocalStorage = (code: string) => {
    const savedCodes = JSON.parse(localStorage.getItem("copiedCodes") || "[]");
    if (!savedCodes.includes(code)) {
      savedCodes.push(code);
      localStorage.setItem("copiedCodes", JSON.stringify(savedCodes));
    }
  };

  const getCopiedCodes = useCallback((): string[] => {
    try {
      return JSON.parse(localStorage.getItem("copiedCodes") || "[]");
    } catch (error) {
      console.error("خطا در خواندن کدهای کپی‌شده از لوکال استوریج: ", error);
      return [];
    }
  }, []);
  return { saveToLocalStorage, getCopiedCodes };
};

export default useLocalStorage;
