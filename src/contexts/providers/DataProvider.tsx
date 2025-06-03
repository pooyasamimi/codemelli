import { useEffect, useState, type PropsWithChildren } from "react";
import DataContext from "../DataProviderContext";

function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Province[]>([]);
  const [activeProvince, setActiveProvince] = useState<string>("");
  const [activeCity, setActiveCity] = useState<string>("");

  //Load Data
  const loadData = async () => {
    try {
      const req = await fetch("/provinces.json");
      if (!req.ok) throw new Error("Failed...");
      const data: Province[] = await req.json();
      setData(data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        activeCity,
        setActiveCity,
        activeProvince,
        setActiveProvince,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
