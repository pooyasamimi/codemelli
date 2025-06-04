import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useMemo, useState } from "react";
import useData from "@/hooks/useData";
import Output from "./Output";

const GenerateCodeForm = () => {
  const { data, setActiveCity, activeProvince, setActiveProvince } = useData();

  const [provinceSearchValue, setProvinceSearchValue] = useState<string>("");
  const [citySearchValue, setCitySearchValue] = useState<string>("");

  // فیلتر استان‌ها بر اساس سرچ
  const filteredProvinces = useMemo(() => {
    if (provinceSearchValue.trim() === "")
      return data
        .map((item) => item.name)
        .sort((a, b) => a.localeCompare(b, "fa"));
    const filterProvinces = data
      .map((item) => item.name)
      .filter((province) => province.includes(provinceSearchValue.trim()));
    return filterProvinces.sort((a, b) => a.localeCompare(b, "fa"));
  }, [data, provinceSearchValue]);

  // فیلتر شهرها بر اساس سرچ
  const filteredcities = useMemo(() => {
    if (citySearchValue.trim() === "")
      return (
        data
          .find((item) => item.name === activeProvince)
          ?.cities.sort((a, b) => a.name.localeCompare(b.name, "fa")) || []
      );
    const filterCities =
      data
        .find((item) => item.name === activeProvince)
        ?.cities.filter((city) => city.name.includes(citySearchValue.trim())) ||
      [];
    return filterCities.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  }, [data, citySearchValue, activeProvince]);

  return (
    <form action={"#"} className="flex flex-col gap-7">
      <div className="flex justify-center gap-x-8 gap-y-3.5 flex-wrap md:flex-nowrap">
        <Select
          onValueChange={(value) => {
            setActiveProvince(value);
            setProvinceSearchValue("");
          }}
        >
          <SelectTrigger className="w-32 h-12 md:w-40 lg:w-48">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent className="w-32 md:w-40 lg:w-48">
            <div className="m-1">
              <Input
              value={'2'}
                type="search"
                placeholder="Search Province..."
                onChange={(e) => setProvinceSearchValue(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onTouchStart={e=>e.stopPropagation()}
              />
            </div>
            <SelectGroup>
              {filteredProvinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setActiveCity(value)}>
          <SelectTrigger className="w-32 h-12 md:w-40 lg:w-48">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent className="w-32 md:w-40 lg:w-48">
            <div className="m-1">
              <Input
                type="search"
                placeholder="Search State..."
                className=""
                onChange={(e) => setCitySearchValue(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
            <SelectGroup className="text-center">
              {activeProvince ? (
                filteredcities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))
              ) : (
                <span className="text-red-500">Please select province</span>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Output />
    </form>
  );
};

export default GenerateCodeForm;
