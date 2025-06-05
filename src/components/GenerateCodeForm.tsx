import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import useData from "@/hooks/useData";
import Output from "./Output";

const GenerateCodeForm = () => {
  const {
    data,
    setActiveCity,
    activeProvince,
    setActiveProvince,
  }: {
    data: Province[];
    setActiveCity: (city: string) => void;
    activeProvince: string;
    setActiveProvince: (province: string) => void;
  } = useData();

  const [provinceSearchValue, setProvinceSearchValue] = useState<string>("");
  const [citySearchValue, setCitySearchValue] = useState<string>("");
  const [isProvincePopoverOpen, setIsProvincePopoverOpen] =
    useState<boolean>(false);
  const [isCityPopoverOpen, setIsCityPopoverOpen] = useState<boolean>(false);
  const [activeCity, setLocalActiveCity] = useState<string>("");

  const filteredProvinces = useMemo<string[]>(() => {
    const search = provinceSearchValue.trim();
    return data
      .map((item) => item.name)
      .filter((province) => province.includes(search))
      .sort((a, b) => a.localeCompare(b, "fa"));
  }, [data, provinceSearchValue]);

  const filteredcities = useMemo<City[]>(() => {
    const province = data.find((item) => item.name === activeProvince);
    const search = citySearchValue.trim();
    return (
      province?.cities
        .filter((city) => city.name.includes(search))
        .sort((a, b) => a.name.localeCompare(b.name, "fa")) || []
    );
  }, [data, citySearchValue, activeProvince]);

  return (
    <form action="#" className="flex flex-col gap-7">
      <div className="flex justify-center gap-x-8 gap-y-3.5 flex-wrap md:flex-nowrap">
        {/* Province */}
        <Popover
          open={isProvincePopoverOpen}
          onOpenChange={setIsProvincePopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-60 h-12 md:w-48">
              {activeProvince || "Select province"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-60 md:w-40 lg:w-48 p-2 max-h-[calc(100dvh-100px)] overflow-y-auto"
            side="bottom"
            avoidCollisions={false}
          >
            <Input
              type="search"
              placeholder="Search province"
              value={provinceSearchValue}
              onChange={(e) => setProvinceSearchValue(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="mb-2"
            />
            <div className="space-y-1">
              {filteredProvinces.map((province) => (
                <Button
                  key={province}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveProvince(province);
                    setProvinceSearchValue("");
                    setIsProvincePopoverOpen(false);
                    setLocalActiveCity("");
                  }}
                >
                  {province}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* City */}
        <Popover open={isCityPopoverOpen} onOpenChange={setIsCityPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-60 h-12 md:w-48 justify-start"
              disabled={!activeProvince}
            >
              {activeCity || "Select city"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-60 md:w-40 lg:w-48 p-2 max-h-[calc(100dvh-100px)] overflow-y-auto"
            side="bottom"
            avoidCollisions={false}
          >
            <Input
              type="search"
              placeholder="جستجوی شهر..."
              value={citySearchValue}
              onChange={(e) => setCitySearchValue(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="mb-2"
            />
            <div className="space-y-1">
              {filteredcities.map((city) => (
                <Button
                  key={city.code}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setLocalActiveCity(city.name);
                    setActiveCity(city.name);
                    setCitySearchValue("");
                    setIsCityPopoverOpen(false);
                  }}
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Output />
    </form>
  );
};

export default GenerateCodeForm;
