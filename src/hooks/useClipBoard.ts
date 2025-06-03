import { toast } from "./use-toast";
import useLocalStorage from "./useLocalStorage";

interface ClipBoardOut {
  copyToClipboard: (code: string) => Promise<void>;
}

const useClipBoard = (): ClipBoardOut => {
  const { saveToLocalStorage } = useLocalStorage();

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      saveToLocalStorage(code);
      toast({ description: "Codemelli copied to clipboard" });
    } catch (error) {
      console.log(error);
    }
  };

  return { copyToClipboard };
};

export default useClipBoard;
