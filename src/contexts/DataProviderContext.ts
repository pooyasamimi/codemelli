import { createContext } from "react";

interface Initial {
  data: Province[];
  activeProvince: string;
  activeCity: string;
  setData: (data: Province[]) => void;
  setActiveProvince: (province: string) => void;
  setActiveCity: (city: string) => void;
}

const initialValue: Initial = {
  data: [],
  activeProvince: "",
  activeCity: "",
  setData: () => null,
  setActiveProvince: () => null,
  setActiveCity: () => null,
};

const DataContext = createContext<Initial>(initialValue);

export default DataContext;
