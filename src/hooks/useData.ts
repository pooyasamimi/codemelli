import DataContext from "@/contexts/DataProviderContext";
import { useContext } from "react";

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("use Data must be used within a DataProvider");

  return context;
};

export default useData;
